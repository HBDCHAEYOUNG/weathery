import dayjs from "dayjs";

/**
 * 단기예보 API에 사용할 수 있는 Base_time을 계산합니다.
 * 
 * Base_time: 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
 * API 제공 시간(~이후): 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
 * 
 * @returns { base_date: string, base_time: string } - YYYYMMDD 형식의 날짜와 HHmm 형식의 시간
 */
function getShortForecastBaseTime() {
  const now = dayjs();
  const BASE_TIMES = ["0200", "0500", "0800", "1100", "1400", "1700", "2000", "2300"];
  const API_DELAY_MINUTES = 10;
  
  const isApiAvailable = (baseTime: string): boolean => {
    const hour = parseInt(baseTime.substring(0, 2));
    const apiAvailableTime = now
      .hour(hour)
      .minute(0)
      .second(0)
      .millisecond(0)
      .add(API_DELAY_MINUTES, "minute");
    
    return now.isAfter(apiAvailableTime) || now.isSame(apiAvailableTime, "minute");
  };
  
  // 역순으로 확인하여 가장 최근의 사용 가능한 Base_time 찾기
  for (let i = BASE_TIMES.length - 1; i >= 0; i--) {
    if (isApiAvailable(BASE_TIMES[i])) {
      return {
        base_date: now.format("YYYYMMDD"),
        base_time: BASE_TIMES[i],
      };
    }
  }
  
  // 현재 시간이 02:10 이전이라면 전날의 2300 Base_time 사용
  return {
    base_date: now.subtract(1, "day").format("YYYYMMDD"),
    base_time: "2300",
  };
}

export default getShortForecastBaseTime;