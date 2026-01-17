import { parseShortForecastData, parseUltraShortNowcastData } from "@/shared/lib/weather-utils/prase-forecast-data";
import useGeocodeQuery from "@/shared/model/geocode.query";
import { useShortForecastQuery, useUltraShortNowcastQuery } from "@/shared/model/weather.query";
import type { ForecastResponse, WeatherResponse } from "@/shared/model/weather.schema";
import { Link, useNavigate } from "react-router-dom";

//TODO: 즐겨찾기 삭제 기능 추가
function FavoriteItem({ district }: { district: string }) {
  const navigate = useNavigate();

  const { data: geocodeData } = useGeocodeQuery(district || "");

  const { data: ultraShortNowcastResponse } = useUltraShortNowcastQuery({
    nx: geocodeData?.nx || 0,
    ny: geocodeData?.ny || 0,
  }) as { data: WeatherResponse };

  const { data: shortForecastResponse } = useShortForecastQuery({
    nx: geocodeData?.nx || 0,
    ny: geocodeData?.ny || 0,
    numOfRows: 1000,
  }) as { data: ForecastResponse };

  const nowcastData = parseUltraShortNowcastData(ultraShortNowcastResponse);
  const forecastData = parseShortForecastData(shortForecastResponse);

  const partsDistrict = district.split("-");

  const handleDistrictClick = (district: string) => {
    navigate(`/${district}`);
  };

  return (
    <Link
      to={`/${district}`}
      onClick={() => handleDistrictClick(district)}
      className="flex gap-2 justify-between items-center border border-gray-300 p-4 rounded-md relative hover:shadow-md"
    >
      {/* <button
        className="absolute top-2 right-4 bg-transparent text-xl cursor-pointer hover:text-red-500"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          removeFavorite(district);
        }}
      >
        ✕
      </button> */}
      <div className="flex flex-col justify-between h-full">
        <h1 className="font-semibold text-lg! mb-auto">
          {partsDistrict.slice(-1)}
        </h1>
        <small className="text-gray-500 font-semibold">
          대한민국 {partsDistrict.slice(0, -1).join(" ")}
        </small>
      </div>

      <div className="flex flex-col items-center gap-2">
        <div className="flex items-center gap-2">
          <span className="text-4xl">{forecastData?.weatherIcon || ""}</span>
          <p className="text-2xl font-bold">
            {nowcastData?.currentTemp
              ? `${Math.round(nowcastData.currentTemp)}°`
              : "-"}
          </p>
        </div>

        <small className="text-gray-500 font-semibold">
          최고 {forecastData?.maxTemp ? `${Math.round(forecastData.maxTemp)}°` : "-"} / 최저{" "}
          {forecastData?.minTemp ? `${Math.round(forecastData.minTemp)}°` : "-"}
        </small>
      </div>
    </Link>
  );
}

export default FavoriteItem;