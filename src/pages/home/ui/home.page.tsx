import CurrentWeather from "@/widgets/current-weather/ui/current-weather";
import HourlyForecast from "@/widgets/hourly-forecast/ui/hourly-forecast";
import WeatherHeader from "@/widgets/weather-header/ui/weather-header";
import useWeatherData from "@/features/weather/model/use-weather-data";

function HomePage() {
  const { nowcastData, forecastData, todayTemps, tomorrowTemps } = useWeatherData();

  return (
    <div className="w-screen min-w-[320px] max-w-[800px] mx-auto">
      <WeatherHeader />
      
      <CurrentWeather 
        nowcastData={nowcastData} 
        forecastData={forecastData} 
      />

      <HourlyForecast 
        todayTemps={todayTemps} 
        tomorrowTemps={tomorrowTemps} 
      />
    </div>
  );
}

export default HomePage;
