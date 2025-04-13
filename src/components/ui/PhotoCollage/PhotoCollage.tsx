
const images = [
  { src: "/gallery/car1.jpg", colSpan: "col-span-2" },
  { src: "/gallery/car2.jpg", colSpan: "col-span-1" },
  { src: "/gallery/car3.jpg", colSpan: "col-span-1" },
  { src: "/gallery/car4.jpg", colSpan: "col-span-1" },
  { src: "/gallery/car10.jpg", colSpan: "col-span-2" },
  { src: "/gallery/car5.jpg", colSpan: "col-span-1" },
  { src: "/gallery/car7.jpg", colSpan: "col-span-1" },
  { src: "/gallery/car9.jpg", colSpan: "col-span-1" },
  { src: "/gallery/car11.jpg", colSpan: "col-span-1" },
  { src: "/gallery/car8.jpg", colSpan: "col-span-2" },
];

export function PhotoCollage() {
  return (
    <section className="py-10 px-4 sm:px-8 md:px-12 mb-12 lg:mb-20">
      <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-10 dark:text-white">
        Our Car Gallery
      </h2>

      <div className=" pt-10 grid grid-cols-3 md:grid-cols-4 gap-4 auto-rows-[180px] md:auto-rows-[200px]">
        {images.map((img, index) => (
          <div
            key={index}
            className={`relative overflow-hidden rounded-2xl shadow-lg ${img.colSpan} row-span-1`}
          >
            <img
              src={img.src}
              loading="lazy" 
              alt={`Car ${index + 1}`}
              className="w-full h-full object-cover hover:scale-105 transition-all duration-300"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
