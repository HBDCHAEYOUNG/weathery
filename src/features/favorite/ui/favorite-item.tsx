import { encodeDistrict } from "@/shared/lib/url-utils";
import useWeatherData from "@/features/weather/model/use-weather-data";
import { Link } from "react-router-dom";
import CircleButton from "@/shared/ui/button/circle-button";
import { useFavoritesStore } from "@/shared/store/favorites.store";

function FavoriteItem({ district, editMode }: { district: string, editMode: boolean }) {
  const { nowcastData, forecastData } = useWeatherData({ 
    district, 
    numOfRows: 200 
  });
  const { removeFavorite } = useFavoritesStore();

  const partsDistrict = district.split("-");
  
  const handleDelete = () => {
    removeFavorite(district);
  };
  
  return (
    <div className="relative">
      <Link
        to={`/${encodeDistrict(district)}`}
        className="flex gap-2 justify-between items-center border border-gray-300 p-4 rounded-md relative hover:shadow-md"
      >
        <div className="flex flex-col justify-between h-full">
          <h1 className="font-semibold text-lg! mb-auto">
            {partsDistrict.slice(-1)}
          </h1>
          <small className="text-gray-500 font-semibold">
            대한민국 {partsDistrict.slice(0, -1).join(" ")}
          </small>
        </div>

        <div className="flex flex-col items-center gap-2 md:flex-row">
          <div className="flex items-center gap-2 md:mr-40">
            <span className="text-4xl">{forecastData?.weatherIcon || ""}</span>
            <p className="text-2xl font-bold">
              {nowcastData?.currentTemp
                ? `${Math.round(nowcastData.currentTemp)}°`
                : "-"}
            </p>
          </div>

          <small className="text-gray-500 font-semibold md:text-xl">
            최고 {forecastData?.maxTemp ? `${Math.round(forecastData.maxTemp)}°` : "-"} / 최저{" "}
            {forecastData?.minTemp ? `${Math.round(forecastData.minTemp)}°` : "-"}
          </small>
        </div>
      </Link>
      
      {editMode && (
        <div className="group absolute inset-0 bg-black/20 rounded-md z-10 flex items-center justify-center hover:shadow-md">
          <CircleButton onClick={handleDelete} className="z-20 cursor-pointer group-hover:scale-110 transition-all duration-300">
            ✕
          </CircleButton>
        </div>
      )}
    </div>
  );
}

export default FavoriteItem;