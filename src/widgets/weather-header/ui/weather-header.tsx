import { useParams } from "react-router-dom";
import FavoriteToggleButton from "@/features/favorite/ui/favorite-toggle-button";
import useWeatherData from "@/features/weather/model/use-weather-data";

function WeatherHeader() {
  const { district } = useParams();
  const { location } = useWeatherData();

  return (
    <div className="flex flex-col mb-12 mt-8 common-padding-x">
      <nav className="flex gap-2">
        <FavoriteToggleButton district={district || ""} className="ml-0" />
        <p className="font-bold text-3xl!">{location}</p>
      </nav>
    </div>
  );
}

export default WeatherHeader;

