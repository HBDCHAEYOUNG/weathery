import dayjs from "dayjs";
import type { ParsedNowcast, ParsedWeather } from "@/features/weather/model/use-weather-data";

interface CurrentWeatherProps {
  nowcastData: ParsedNowcast | null;
  forecastData: ParsedWeather | null;
}

function CurrentWeather({ nowcastData, forecastData }: CurrentWeatherProps) {
  const date = dayjs().format("MM.DD");

  return (
    <div className="flex flex-col justify-center items-center gap-2">
      <p className="border border-gray-300 rounded-full px-4 py-1 font-bold">
        현재 {date}
      </p>

      <div className="flex items-end relative mt-6">
        <h1 className="text-7xl! font-bold relative z-10">
          {Math.round(nowcastData?.currentTemp || 0)}°C
        </h1>
        <p className="text-8xl absolute -left-12 opacity-80 animate-scale-subtle">
          {forecastData?.weatherIcon}
        </p>
      </div>

      <p className="text-xl font-bold">{forecastData?.status}</p>

      <div className="flex gap-1 items-center text-sm">
        최고 <b className="text-lg">{forecastData?.maxTemp}°</b>
        <span className="text-gray-300"> • </span>
        최저 <b className="text-lg">{forecastData?.minTemp}°</b>
      </div>
    </div>
  );
}

export default CurrentWeather;

