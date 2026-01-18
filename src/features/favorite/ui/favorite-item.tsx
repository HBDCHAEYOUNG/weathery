import { encodeDistrict } from "@/shared/lib/url-utils";
import useWeatherData from "@/features/weather/model/use-weather-data";
import { Link } from "react-router-dom";

//TODO: 즐겨찾기 삭제 기능 추가
function FavoriteItem({ district }: { district: string }) {
  const { nowcastData, forecastData } = useWeatherData({ 
    district, 
    numOfRows: 200 
  });

  const partsDistrict = district.split("-");
  
  return (
    <Link
      to={`/${encodeDistrict(district)}`}
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