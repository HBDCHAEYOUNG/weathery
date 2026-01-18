import type {
  WeatherRequestParams
} from "@/shared/model/weather.schema";
import getShortForecastBaseTime from "../lib/weather-utils/get-short-forecast-base-time";
import getUltraShortNowcastBaseTime from "../lib/weather-utils/get-ultra-short-nowcast-base-time";

const BASE_URL = "https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0";

const SERVICE_KEY = import.meta.env.VITE_WEATHER_SERVICE_KEY;

const {base_date: base_date_ultra_short_nowcast, base_time: base_time_ultra_short_nowcast} = getUltraShortNowcastBaseTime();
const {base_date: base_date_short_forecast, base_time: base_time_short_forecast} = getShortForecastBaseTime();


async function fetchWeatherApi(url: string) {
  const response = await fetch(url);

  if (!response.ok) throw new Error(`HTTP Error: ${response.status}`);

  const data = await response.json();
  const { header, body } = data.response;
  if (header.resultCode !== "00") throw new Error(header.resultMsg);

  return body;
}

// 초단기실황 조회
function getUltraShortNowcast(params: WeatherRequestParams) {
  const queryParams = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    numOfRows: String(params.numOfRows || 10),
    pageNo: String(params.pageNo || 1),
    dataType: params.dataType || "JSON",
    base_date: base_date_ultra_short_nowcast,
    base_time: base_time_ultra_short_nowcast,
    nx: String(params.nx),
    ny: String(params.ny),
  });

  return fetchWeatherApi(
    `${BASE_URL}/getUltraSrtNcst?${queryParams.toString()}`
  );
}

// 단기예보 조회
function getShortForecast(params: WeatherRequestParams) {
  const queryParams = new URLSearchParams({
    serviceKey: SERVICE_KEY,
    numOfRows: String(params.numOfRows || 10),
    pageNo: String(params.pageNo || 1),
    dataType: params.dataType || "JSON",
    base_date: base_date_short_forecast,
    base_time: base_time_short_forecast,
    nx: String(params.nx),
    ny: String(params.ny),
  });

  return fetchWeatherApi(`${BASE_URL}/getVilageFcst?${queryParams.toString()}`);
}

export {
  getShortForecast, getUltraShortNowcast
};
