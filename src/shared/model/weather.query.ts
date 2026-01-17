import {
  getShortForecast,
  getUltraShortNowcast
} from "@/shared/api/weather.api";
import type {
  WeatherRequestParams
} from "@/shared/model/weather.schema";
import { useQuery } from "@tanstack/react-query";

// 초단기실황 조회 훅
function useUltraShortNowcastQuery(params: WeatherRequestParams) {
  const query = useQuery({
    queryKey: ["weather", "ultraShortNowcast", params],
    queryFn: () => getUltraShortNowcast(params),
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  if (query.error) {
    console.error("초단기실황 조회 에러:", query.error.message);
  }
  return query;
}

// 단기예보 조회 훅
function useShortForecastQuery(params: WeatherRequestParams) {
  const query = useQuery({
    queryKey: ["weather", "shortForecast", params],
    queryFn: () => getShortForecast(params),
  });

  if (query.error) {
    console.error("단기예보 조회 에러:", query.error.message);
  }

  return query;
}

export {
  useShortForecastQuery, useUltraShortNowcastQuery
};

