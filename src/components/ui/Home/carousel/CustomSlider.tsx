import React, { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
const carDetails = [
  {
    src: "/slider/car4.jpg",
    title: "Lamborghini Aventador",
    brand: "Lamborghini",
    topic: "Luxury",
    description:
      "A mid-engine V12 supercar known for its aggressive styling and powerful performance. Top speed over 217 mph, 0-62 mph in under 3 seconds.",
    carLink: "/cars/67fcee57ca89f6a53562ad7d",
  },
  {
    src: "/slider/car2.jpg",
    title: "Ferrari 488 GTB",
    brand: "Ferrari",
    topic: "Sports Car",
    description:
      "A twin-turbocharged V8 marvel delivering exhilarating speed and precise handling. 0-62 mph in 3 seconds, with a top speed of 205 mph.",
    carLink: "/cars/67fcefbfca89f6a53562ad8d",
  },
  {
    src: "/slider/car1.jpg",
    title: "McLaren 720S",
    brand: "McLaren",
    topic: "Performance",
    description:
      "A lightweight, carbon-fiber supercar with a potent twin-turbo V8. Reaches 0-62 mph in 2.9 seconds and boasts a top speed of 212 mph.",
    carLink: "/cars/67fced8aca89f6a53562ad75",
  },
  {
    src: "/slider/car5.jpg",
    title: "Porsche 911 Turbo S",
    brand: "Porsche",
    topic: "Sports Car",
    description:
      "An iconic flat-six turbocharged powerhouse offering incredible acceleration and all-weather capability. 0-62 mph in 2.7 seconds, top speed of 205 mph.",
    carLink: "/cars/67fcedc9ca89f6a53562ad79",
  },
];

export default function CustomSlider() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  const clearTimeoutRef = () =>
    timeoutRef.current && clearTimeout(timeoutRef.current);

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % carDetails.length);
  };

  const goToPrev = () => {
    setCurrentIndex(
      (prev) => (prev - 1 + carDetails.length) % carDetails.length
    );
  };

  useEffect(() => {
    const autoNext = () => {
      timeoutRef.current = setTimeout(goToNext, 3000);
    };

    autoNext();

    return () => {
      clearTimeoutRef();
    };
  }, [currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.changedTouches[0].screenX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    touchEndX.current = e.changedTouches[0].screenX;
    if (touchStartX.current - touchEndX.current > 50) goToNext();
    if (touchEndX.current - touchStartX.current > 50) goToPrev();
  };

  return (
    <div
      className="relative h-[65vh] lg:h-[80vh] xl:h-[76vh] xxl:h-[72vh] w-full overflow-hidden bg-black text-white"
      onMouseEnter={clearTimeoutRef}
      onMouseLeave={() => (timeoutRef.current = setTimeout(goToNext, 3000))}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      {/* --------Background images with gradient-------- */}
      {carDetails.map((car, index) => (
        <div
          key={car.title + "bg"}
          className={cn(
            "absolute inset-0 transition-opacity duration-1000 ease-in-out",
            index === currentIndex ? "opacity-100" : "opacity-0"
          )}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-transparent z-10"></div>
          <img
            src={car.src}
            className="h-full w-full object-cover"
            alt={car.title}
          />
        </div>
      ))}

      {/* ----------------Content Wrapper ----------------*/}
      <div className="relative max-w-[1233px] w-full mx-auto h-full px-4 md:px-6 lg:px-0">
        {/* --------Left Side Content--------*/}
        <div className="absolute top-[5%] md:top-[10%] w-full z-20">
          {carDetails.map((car, index) => (
            <div
              key={car.title + "content"}
              className={cn(
                "absolute top-0 left-0 transition-opacity duration-1000 ease-in-out",
                index === currentIndex ? "opacity-100" : "opacity-0"
              )}
            >
              <div className="tracking-[10px] font-bold">{car.brand}</div>
              <div className="text-[32px] lg:text-[40px] xl:text-5xl xxl:text-[50px] font-bold leading-tight">
                {car.title}
              </div>
              <div className="text-3xl lg:text-4xl xl:text-[40px] xxl:text-5xl font-bold text-red-500">
                {car.topic}
              </div>
              <p className="mt-4 text-sm md:text-[14px] lg:text-[16px] max-w-full md:max-w-md xl:max-w-xl pr-2">
                {car.description}
              </p>
              <Link
                to={car.carLink}
                className="mt-4 inline-block px-6 py-2 md:py-[10px] bg-red-600 rounded-md text-white font-medium hover:bg-red-700 transition-colors relative uppercase text-sm  md:text-[15px]"
              >
                Buy Now
              </Link>
            </div>
          ))}
        </div>

        {/* ----------------Right Side Content----------------*/}
        <div className="absolute bottom-6 right-2 md:right-6 flex items-end gap-4 lg:gap-36 z-20">
          {/* --------Slider Buttons--------*/}
          <div className="hidden md:flex gap-3 md:gap-6 items-center">
            <button
              onClick={goToPrev}
              className="w-10 h-10 rounded-full bg-white/30 hover:bg-white text-white hover:text-black font-bold flex items-center justify-center"
            >
              <ChevronLeft />
            </button>
            <button
              onClick={goToNext}
              className="w-10 h-10 rounded-full bg-white/30 hover:bg-white text-white hover:text-black font-bold flex items-center justify-center"
            >
              <ChevronRight />
            </button>
          </div>

          {/* Slider List Image with Title */}
          <div className="flex gap-2 md:gap-4 overflow-x-auto scrollbar-hide">
            {carDetails.map((car, index) => (
              <div
                key={index}
                className={`relative w-[70px] h-[85px] md:w-[100px] md:h-[140px] xl:w-[140px] xl:h-[220px] overflow-hidden rounded-2xl cursor-pointer border-2 border-[#00000056] hover:border-white  shadow-xl ${
                  index === currentIndex ? "border-white" : " "
                }`}
                onClick={() => setCurrentIndex(index)}
              >
                <img
                  src={car.src}
                  className="w-full h-full object-cover  rounded-2xl shadow-xl"
                  alt="thumb"
                />
                <div className="hidden md:block absolute bottom-2 left-1 md:left-2 md:right-2 text-[12px] xl:text-sm">
                  <div className="font-medium">
                    {car.title.slice(0, 10) + " ..."}
                  </div>
                  <div className="text-sm hidden md:block">
                    {car.description.slice(0, 15) + " ..."}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
