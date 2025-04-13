import { WebsiteHeading } from "../WebsiteHeading/WebsiteHeading";

const brandLogos = [
  { name: "Tesla", src: "/public/brands/brand1.png" },
  { name: "Nishan", src: "/public/brands/brand2.png" },
  { name: "Toyota", src: "/public/brands/brand3.png" },
  { name: "Ford", src: "/public/brands/brand4.png" },
  { name: "Ferary", src: "/public/brands/brand5.png" },
  { name: "Audi", src: "/public/brands/brand6.png" },
  { name: "BMW", src: "/public/brands/brand7.png" },
  { name: "Mazda", src: "/public/brands/brand8.png" },
  { name: "Marsidis", src: "/public/brands/brand9.png" },
  { name: "Nishanx1", src: "/public/brands/brand10.png" },
  { name: "Suzuki", src: "/public/brands/brand11.png" },
  { name: "znina", src: "/public/brands/brand12.png" },
 
];

export function OurPartners() {
  return (
    <section className="py-8 sm:py-10 md:py-16">
      <WebsiteHeading title="Our Partners" />

      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 gap-y-8 place-items-center ">
        {brandLogos.map((brand) => (
          <div key={brand.name} className="transition-all grayscale hover:grayscale-0">
            <img
              src={brand.src}
              alt={`${brand.name} Logo`}
              className="h-12 md:h-16 lg:h-20 object-contain"
            />
          </div>
        ))}
      </div>
    </section>
  );
}
