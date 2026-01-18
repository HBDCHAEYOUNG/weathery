import dayjs from "dayjs";

/**
 * 단기예보 API에 사용할 수 있는 Base_time을 계산합니다.
 * 최저/최고 기온(TMN, TMX)은 0200 Base_time에 제공됩니다.
 * 
 * Base_time: 0200, 0500, 0800, 1100, 1400, 1700, 2000, 2300 (1일 8회)
 * API 제공 시간(~이후): 02:10, 05:10, 08:10, 11:10, 14:10, 17:10, 20:10, 23:10
 * 최저/최고 기온 제공 시간: 02:10 이후
 * 
 * @returns { base_date: string, base_time: string } - YYYYMMDD 형식의 날짜와 HHmm 형식의 시간
 */
function getShortForecastBaseTime() {
  const now = dayjs();
  const BASE_TIME = "0200"; // 최저/최고 기온은 0200 Base_time 고정
  const API_DELAY_MINUTES = 10;
  
  // 0200 Base_time의 API 제공 시간 계산 (02:10)
  const apiAvailableTime = now
    .hour(2)
    .minute(0)
    .second(0)
    .millisecond(0)
    .add(API_DELAY_MINUTES, "minute");
  
  // 현재 시간이 02:10 이후라면 오늘 날짜의 0200 Base_time 사용
  if (now.isAfter(apiAvailableTime) || now.isSame(apiAvailableTime, "minute")) {
    return {
      base_date: now.format("YYYYMMDD"),
      base_time: BASE_TIME,
    };
  }
  
  // 현재 시간이 02:10 이전이라면 전날의 2300 Base_time 사용
  // (전날 23:10 이후에 제공된 데이터 사용)
  return {
    base_date: now.subtract(1, "day").format("YYYYMMDD"),
    base_time: "2300",
  };
}

export default getShortForecastBaseTime;