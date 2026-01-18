import FavoriteToggleButton from "@/features/favorite/ui/favorite-toggle-button";
import useWeatherData from "@/shared/hook/useWeatherData";

function WeatherHeader() {
  const { location } = useWeatherData();
  return (
    <div className="flex flex-col mb-12 mt-8 common-padding-x">
      <nav className="flex gap-2">
        <FavoriteToggleButton district={location || ""} className="ml-0" />
        <p className="font-bold text-3xl!">{location.split("-").slice(-2).join(" ")}</p>
      </nav>
    </div>
  );
}

export default WeatherHeader;

