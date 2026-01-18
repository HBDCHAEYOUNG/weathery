import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import useCurrentLocation from "@/shared/hook/useCurrentLocation";
import {
  parseShortForecastData,
  parseUltraShortNowcastData,
} from "@/shared/lib/weather-utils/prase-forecast-data";
import {
  useGeocodeQuery,
  useReverseGeocodeQuery,
} from "@/shared/model/geocode.query";
import type {
  ForecastResponse,
  WeatherResponse,
} from "@/shared/model/weather.schema";
import {
  useShortForecastQuery,
  useUltraShortNowcastQuery,
} from "@/shared/model/weather.query";

export interface ParsedNowcast {
  currentTemp: number;
}

export interface ParsedWeather {
  minTemp: number;
  maxTemp: number;
  hourlyTemps: Array<{ date: string; time: string; temp: number; icon?: string }>;
  weatherIcon: string;
  status: string;
}

export interface UseWeatherDataReturn {
  location: string;
  nowcastData: ParsedNowcast | null;
  forecastData: ParsedWeather | null;
  todayTemps: Array<{ date: string; time: string; temp: number; icon?: string }>;
  tomorrowTemps: Array<{ date: string; time: string; temp: number; icon?: string }>;
}

interface UseWeatherDataOptions {
  district?: string;
  numOfRows?: number;
}

function useWeatherData(options?: UseWeatherDataOptions): UseWeatherDataReturn {
  const { district: districtFromParams } = useParams();
  const { coordinates } = useCurrentLocation();

  const today = dayjs().format("YYYYMMDD");
  const tomorrow = dayjs().add(1, "day").format("YYYYMMDD");

  // district가 옵션으로 전달되면 그것을 사용, 없으면 현재 위치 또는 params 사용
  const district = options?.district || districtFromParams;
  
  const { data: currentLocation } = useReverseGeocodeQuery(
    coordinates?.lng || 0,
    coordinates?.lat || 0,
  );

  // 위치 결정: district가 있으면 그것을 우선, 없으면 현재 위치
  const geocodeQueryInput = district || currentLocation || "";
  const location = district? district : currentLocation?.split(" ").join("-") || ""

  const { data: geocodeData } = useGeocodeQuery(geocodeQueryInput);

  const { data: ultraShortNowcastResponse } = useUltraShortNowcastQuery({
    nx: geocodeData?.nx || 0,
    ny: geocodeData?.ny || 0,
  }) as { data: WeatherResponse };
  
  const { data: shortForecastResponse } = useShortForecastQuery({
    nx: geocodeData?.nx || 0,
    ny: geocodeData?.ny || 0,
    numOfRows: options?.numOfRows || 450,
  }) as { data: ForecastResponse };

  const nowcastData = parseUltraShortNowcastData(ultraShortNowcastResponse);
  const forecastData = parseShortForecastData(shortForecastResponse);

  const todayTemps =
    forecastData?.hourlyTemps?.filter((hour) => hour.date === today) || [];
  const tomorrowTemps =
    forecastData?.hourlyTemps?.filter((hour) => hour.date === tomorrow) || [];

  return {
    location,
    nowcastData,
    forecastData,
    todayTemps,
    tomorrowTemps,
  };
}

export default useWeatherData;

