import { WebsiteHeading } from "../WebsiteHeading/WebsiteHeading";
import SectionWrapper from "../wrapper/SectionWrapper";

const brandLogos = [
  { name: "Tesla", src: "/brands/brand1.png" },
  { name: "Nishan", src: "/brands/brand2.png" },
  { name: "Toyota", src: "/brands/brand3.png" },
  { name: "Ford", src: "/brands/brand4.png" },
  { name: "Ferary", src: "/brands/brand5.png" },
  { name: "Audi", src: "/brands/brand6.png" },
  { name: "BMW", src: "/brands/brand7.png" },
  { name: "Mazda", src: "/brands/brand8.png" },
  { name: "Marsidis", src: "/brands/brand9.png" },
  { name: "Nishanx1", src: "/brands/brand10.png" },
  { name: "Suzuki", src: "/brands/brand11.png" },
  { name: "znina", src: "/brands/brand12.png" },
];

export function OurPartners() {
  return (
    <SectionWrapper>
      <section className="py-8  md:py-16 mb-20 lg:mb-30">
        <WebsiteHeading title="Our Partners" />

        <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 gap-y-8 place-items-center ">
          {brandLogos.map((brand) => (
            <div
              key={brand.name}
              className="transition-all grayscale hover:grayscale-0"
            >
              <img
                src={brand.src}
                alt={`${brand.name} Logo`}
                loading="lazy"
                className="h-12 md:h-16 lg:h-20 object-contain"
              />
            </div>
          ))}
        </div>
      </section>
    </SectionWrapper>
  );
}
