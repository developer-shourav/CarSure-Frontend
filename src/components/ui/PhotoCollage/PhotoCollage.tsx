import { collageImages } from "@/constant";
import { WebsiteHeading } from "../WebsiteHeading/WebsiteHeading";
import SectionWrapper from "../wrapper/SectionWrapper";


export function PhotoCollage() {
  return (
    <section className="py-8 xl:py-10 w-full mx-auto">
      <SectionWrapper>
        <WebsiteHeading title="Our Car Gallery" />
        <div className=" grid grid-cols-4 gap-2 md:gap-4 auto-rows-[100px] md:auto-rows-[200px]">
          {collageImages?.map((img, index) => (
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
      </SectionWrapper>
    </section>
  );
}
