import dayjs from "dayjs";

/**
 * 초단기실황 API에 사용할 수 있는 Base_time을 계산합니다.
 * 
 * Base_time: 0000, 0100, 0200, ..., 2300 (1일 24회, 매 시간 정각)
 * API 제공 시간(~이후): 00:10, 01:10, 02:10, ..., 23:10
 * 
 * @returns { base_date: string, base_time: string } - YYYYMMDD 형식의 날짜와 HHmm 형식의 시간
 */
function getUltraShortNowcastBaseTime() {
  const now = dayjs();
  const API_DELAY_MINUTES = 10;
  
  // 현재 시간에서 10분을 뺀 시간의 정각을 계산
  const availableTime = now.subtract(API_DELAY_MINUTES, "minute");
  const hour = availableTime.hour();
  
  // 현재 시간이 00:10 이전이라면 전날의 23:00 Base_time 사용
  if (now.hour() === 0 && now.minute() < 10) {
    return {
      base_date: now.subtract(1, "day").format("YYYYMMDD"),
      base_time: "2300",
    };
  }
  
  // 사용 가능한 가장 최근의 Base_time 반환
  return {
    base_date: now.format("YYYYMMDD"),
    base_time: `${hour.toString().padStart(2, "0")}00`,
  };
}

export default getUltraShortNowcastBaseTime;