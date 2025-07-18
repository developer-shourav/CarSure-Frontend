import { WebsiteHeading } from "../../WebsiteHeading/WebsiteHeading";
import SectionWrapper from "../../wrapper/SectionWrapper";

const brandLogos = [
  { name: "Tesla", src: "/brands/brand1.png" },
  { name: "Nishan", src: "/brands/brand2.png" },
  { name: "Ford", src: "/brands/brand4.png" },
  { name: "Ferary", src: "/brands/brand5.png" },
  { name: "Audi", src: "/brands/brand6.png" },
  { name: "BMW", src: "/brands/brand7.png" },
  { name: "Toyota", src: "/brands/brand3.png" },
  { name: "Mazda", src: "/brands/brand8.png" },
  { name: "Marsidis", src: "/brands/brand9.png" },
  { name: "Nishanx1", src: "/brands/brand10.png" },
  { name: "Suzuki", src: "/brands/brand11.png" },
  { name: "znina", src: "/brands/brand12.png" },
  { name: "Tesla2", src: "/brands/brand13.png" },
  { name: "Ford2", src: "/brands/brand16.png" },
  { name: "Ferary2", src: "/brands/brand17.png" },
  { name: "Nishan2", src: "/brands/brand14.png" },
  { name: "Audi2", src: "/brands/brand18.png" },
  { name: "BMW2", src: "/brands/brand19.png" },
  { name: "Mazda2", src: "/brands/brand20.png" },
  { name: "Nishanx2", src: "/brands/brand22.png" },
  { name: "Marsidis2", src: "/brands/brand21.png" },
];

export default function OurPartners() {
  return (
    <SectionWrapper>
      <section className="py-8 lg:py-10 xl:py-12 w-full mx-auto">
        <WebsiteHeading title="Our Partners" />

        <div className="our-partners-grid">
          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-7 gap-2 md:gap-4">
            {brandLogos.map((brand) => (
              <div
                key={brand.name}
                className="relative flex items-center justify-center p-2 md:p-5 transition-all hover:scale-115  duration-300 ease-in-out"
              >
                <img
                  src={brand.src}
                  alt={`${brand.name} Logo`}
                  loading="lazy"
                  className="h-18 md:h-20 lg:h-24 object-contain"
                />
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
}
