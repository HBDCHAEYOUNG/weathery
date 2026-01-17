import type { ForecastResponse, WeatherResponse } from "@/shared/model/weather.schema";
import dayjs from "dayjs";

interface ParsedWeather {
  minTemp: number;
  maxTemp: number;
  hourlyTemps: Array<{ time: string; temp: number }>;
  weatherIcon: string;
  status: string;
}

interface ParsedNowcast {
  currentTemp: number;
}

/**
 * 하늘 상태 코드를 문자열로 변환
 */
function getSkyStatus(code: string): string {
  const skyMap: Record<string, string> = {
    '1': '맑음',
    '3': '구름많음',
    '4': '흐림'
  };
  return skyMap[code] || '알 수 없음';
}

/**
 * 강수 형태 코드를 문자열로 변환
 */
function getPrecipitationType(code: string): string {
  const ptyMap: Record<string, string> = {
    '0': '없음',
    '1': '비',
    '2': '비/눈',
    '3': '눈',
    '4': '소나기',
    '5': '빗방울',
    '6': '빗방울눈날림',
    '7': '눈날림'
  };
  return ptyMap[code] || '없음';
}

/**
 * 날씨 아이콘 결정 (강수형태 우선, 없으면 하늘상태)
 */
function getWeatherIcon(ptyCode: string, skyCode: string): string {
  if (ptyCode !== '0') {
    const ptyIcons: Record<string, string> = {
      '1': '🌧️',
      '2': '🌨️',
      '3': '❄️',
      '4': '🌦️',
      '5': '🌧️',
      '6': '🌨️',
      '7': '❄️'
    };
    return ptyIcons[ptyCode] || '☁️';
  }
  
  const skyIcons: Record<string, string> = {
    '1': '☀️',
    '3': '⛅',
    '4': '☁️'
  };
  return skyIcons[skyCode] || '☁️';
}

/**
 * 초단기실황 API 응답을 파싱하여 현재 기온을 반환
 * T1H → 현재 기온
 */
function parseUltraShortNowcastData(response: WeatherResponse | null | undefined): ParsedNowcast | null {
  if (!response || !response.items || !response.items.item || response.items.item.length === 0) {
    return null;
  }

  const items = response.items.item;
  
  // T1H 카테고리로 현재 기온 가져오기
  const tempItem = items.find(item => item.category === 'T1H');
  const currentTemp = tempItem ? parseFloat(tempItem.obsrValue) : 0;
  
  return {
    currentTemp
  };
}

/**
 * 단기예보 API 응답을 파싱하여 UI에 표시할 날씨 정보를 반환
 * TMN / TMX → 오늘 최저·최고 기온
 * TMP → 시간별 기온
 */
function parseShortForecastData(response: ForecastResponse | null | undefined): ParsedWeather | null {
  if (!response || !response.items || !response.items.item || response.items.item.length === 0) {
    return null;
  }

  const items = response.items.item;
  const now = dayjs();
  const today = now.format('YYYYMMDD');
  
  // 현재 시간에 가장 가까운 예보 시간 찾기 (SKY, PTY 등 다른 카테고리용)
  const getNearestForecastTime = () => {
    const forecastItems = items
      .filter(item => item.category === 'TMP' && item.fcstDate === today)
      .sort((a, b) => {
        const timeA = dayjs(`${a.fcstDate}${a.fcstTime}`, 'YYYYMMDDHHmm');
        const timeB = dayjs(`${b.fcstDate}${b.fcstTime}`, 'YYYYMMDDHHmm');
        const diffA = Math.abs(timeA.diff(now));
        const diffB = Math.abs(timeB.diff(now));
        return diffA - diffB;
      });
    
    return forecastItems[0];
  };

  const nearestForecast = getNearestForecastTime();
  
  // 현재 시간에 가장 가까운 예보의 데이터 가져오기
  const getValueByCategory = (category: string): string => {
    if (!nearestForecast) return '0';
    const item = items.find(
      item => 
        item.category === category && 
        item.fcstDate === nearestForecast.fcstDate &&
        item.fcstTime === nearestForecast.fcstTime
    );
    return item ? item.fcstValue : '0';
  };

  // TMN, TMX는 오늘 날짜의 항목 중에서 찾기 (시간대 무관)
  const getMinMaxTemp = (category: 'TMN' | 'TMX'): number => {
    const item = items.find(
      item => item.category === category && item.fcstDate === today
    );
    return item ? parseFloat(item.fcstValue) : 0;
  };

  // 시간별 기온 배열 생성 (TMP 카테고리, 오늘 날짜)
  const hourlyTemps = items
    .filter(item => item.category === 'TMP' && item.fcstDate === today)
    .map(item => ({
      time: item.fcstTime,
      temp: parseFloat(item.fcstValue)
    }))
    .sort((a, b) => a.time.localeCompare(b.time));

  const minTemp = getMinMaxTemp('TMN');
  const maxTemp = getMinMaxTemp('TMX');
  const skyCode = getValueByCategory('SKY');
  const ptyCode = getValueByCategory('PTY');
  
  // 강수형태 우선, 없으면 하늘상태
  const status = ptyCode !== '0' 
    ? getPrecipitationType(ptyCode) 
    : getSkyStatus(skyCode);
  
  return {
    minTemp,
    maxTemp,
    hourlyTemps,
    weatherIcon: getWeatherIcon(ptyCode, skyCode),
    status
  };
}

export { parseUltraShortNowcastData, parseShortForecastData };