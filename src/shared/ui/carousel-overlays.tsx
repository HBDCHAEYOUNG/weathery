import {
  CarouselNext,
  CarouselPrevious,
  useCarousel,
} from "@/shared/ui/_shadcn/carousel";

function CarouselOverlays() {
  const { canScrollPrev, canScrollNext } = useCarousel();

  return (
    <>
      {canScrollPrev && (
        <div className="absolute left-0 top-0 h-full w-20 bg-linear-to-r from-white via-white/80 to-transparent pointer-events-none z-5" />
      )}
      {canScrollNext && (
        <div className="absolute right-0 top-0 h-full w-20 bg-linear-to-l from-white via-white/80 to-transparent pointer-events-none z-5" />
      )}
      {canScrollPrev && <CarouselPrevious className="left-0 z-10" />}
      {canScrollNext && <CarouselNext className="right-0 z-10" />}
    </>
  );
}

export default CarouselOverlays;

