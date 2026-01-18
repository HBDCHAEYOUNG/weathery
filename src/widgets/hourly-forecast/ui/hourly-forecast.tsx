import { cn } from "@/shared/lib/utils";
import CarouselOverlays from "@/shared/ui/carousel-overlays";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/shared/ui/_shadcn/carousel";

interface HourlyForecastProps {
  todayTemps: Array<{ date: string; time: string; temp: number; icon?: string }>;
  tomorrowTemps: Array<{ date: string; time: string; temp: number; icon?: string }>;
}

function HourlyForecast({ todayTemps, tomorrowTemps }: HourlyForecastProps) {
  return (
    <div className="mt-8 w-full relative overflow-hidden common-padding-x">
      <div className="flex items-start gap-3">
        <span className="bg-gray-800 text-white px-2 rounded-full text-xs font-medium">
          오늘
        </span>

        <Carousel
          opts={{
            align: "start",
            loop: false,
            slidesToScroll: "auto",
          }}
          className="w-full flex-1 relative overflow-hidden"
        >
          <CarouselContent className="px-14 -ml-16">
            {todayTemps.map((hour) => {
              const hourNum = parseInt(hour.time.slice(0, 2));
              const displayTime = `${hourNum}시`;

              return (
                <CarouselItem
                  key={`${hour.date}-${hour.time}`}
                  className="px-2 basis-auto shrink-0 border-r border-gray-300"
                >
                  <div className="flex flex-col items-center gap-1.5 w-8">
                    <span className="text-sm font-medium">{displayTime}</span>
                    <div className="text-2xl">{hour.icon}</div>
                    <span className="text-sm font-bold">{hour.temp}°</span>
                  </div>
                </CarouselItem>
              );
            })}

            {tomorrowTemps.length > 0 &&
              tomorrowTemps.map((hour, index) => {
                const hourNum = parseInt(hour.time.slice(0, 2));
                const displayTime = index === 0 ? "내일" : `${hourNum}시`;
                const isTomorrowLabel = index === 0;

                return (
                  <CarouselItem
                    key={`${hour.date}-${hour.time}`}
                    className="px-2 basis-auto shrink-0 border-r border-gray-300"
                  >
                    <div className="flex flex-col items-center gap-1.5 w-8">
                      <span
                        className={cn(
                          "text-sm font-medium",
                          isTomorrowLabel &&
                            "bg-purple-500 text-xs text-white px-1 rounded-full",
                        )}
                      >
                        {displayTime}
                      </span>
                      <div className="text-2xl">{hour.icon}</div>
                      <span className="text-sm font-bold">{hour.temp}°</span>
                    </div>
                  </CarouselItem>
                );
              })}
          </CarouselContent>
          <CarouselOverlays />
        </Carousel>
      </div>
    </div>
  );
}

export default HourlyForecast;

