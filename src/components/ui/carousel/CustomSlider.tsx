import React, { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ChevronLeft, ChevronRight } from "lucide-react";
const images = [
  {
    src: "/src/assets/slider/img1.jpg",
    title: "DESIGN SLIDER",
    author: "LUNDEV",
    topic: "ANIMAL",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    src: "/src/assets/slider/img2.jpg",
    title: "DESIGN SLIDER",
    author: "LUNDEV",
    topic: "ANIMAL",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    src: "/src/assets/slider/img3.jpg",
    title: "DESIGN SLIDER",
    author: "LUNDEV",
    topic: "ANIMAL",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
  },
  {
    src: "/src/assets/slider/img4.jpg",
    title: "DESIGN SLIDER",
    author: "LUNDEV",
    topic: "ANIMAL",
    description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
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
    setCurrentIndex((prev) => (prev + 1) % images.length);
  };

  const goToPrev = () => {
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  useEffect(() => {
    const autoNext = () => {
      timeoutRef.current = setTimeout(goToNext, 7000);
    };

    autoNext();

    return () => {
      clearTimeoutRef(); // call it, don't return it
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
      className="relative h-[90vh] lg:h-[80vh] w-full overflow-hidden bg-black text-white"
      onMouseEnter={clearTimeoutRef}
      onMouseLeave={() => (timeoutRef.current = setTimeout(goToNext, 7000))}
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      ref={containerRef}
    >
      {/* --------------Slider Left Side Section-------------- */}
      <div className="absolute inset-0 transition-all duration-500 ease-in-out p-4">
        {images.map((img, index) => (
          <div
            key={index}
            className={cn(
              "absolute inset-0 transition-opacity duration-1000 ease-in-out",
              index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
            )}
          >
            {/* ----------Image Covering the Section--------------- */}
            <img
              src={img.src}
              className="h-full w-full object-cover"
              alt={img.title}
            />

            {/* -----------content Which will show right side------------- */}
            <div className="absolute top-[5%] md:top-[10%] left-1/2 -translate-x-1/2 w-[80%] text-shadow-lg ">
              <div className="tracking-[10px] font-bold">{img.author}</div>
              <div className="text-[32px] lg:text-[40px] xl:text-5xl font-bold leading-tight">
                {img.title}
              </div>
              <div className="text-3xl lg:text-4xl xl:text-[40px] font-bold text-red-500">
                {img.topic}
              </div>
              <p className="mt-4 text-sm max-w-md xl:max-w-xl">{img.description}</p>
              <div className="mt-6 grid grid-cols-2 gap-4 w-[80%] lg:w-[260px]">
                <Button className="bg-red-500 text-white">BUY NOW</Button>
               
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ------------Slider Right Side Section-------------- */}
      <div className=" absolute bottom-6 left-1/2 -translate-x-1/2 w-full hidden lg:flex items-end justify-end gap-36 z-20 ">
        {/* -----------------Slider Buttons------------- */}
        <div className=" flex gap-6 items-center">
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

        {/* ------------Slider List Image with Title------------ */}
        <div className="flex gap-4 overflow-x-auto scrollbar-hide">
          {images.map((img, index) => (
            <div
              key={index}
              className="relative w-[100px] h-[180px] xl:w-[140px] xl:h-[220px] overflow-hidden rounded-2xl cursor-pointer"
              onClick={() => setCurrentIndex(index)}
            >
              <img
                src={img.src}
                className="w-full h-full object-cover"
                alt="thumb"
              />
              <div className="absolute bottom-2 left-2 right-2 text-[12px] xl:text-sm">
                <div className="font-medium">
                  {img.title.slice(0, 10) + " ..."}
                </div>
                <div className="text-sm">
                  {img.description.slice(0, 15) + " ..."}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
