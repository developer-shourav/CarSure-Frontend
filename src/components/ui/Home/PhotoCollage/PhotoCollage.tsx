import { collageImages } from "@/constant";
import SectionWrapper from "../../wrapper/SectionWrapper";
import { WebsiteHeading } from "../../WebsiteHeading/WebsiteHeading";



export default function PhotoCollage() {
  return (
    <section className="py-8 lg:py-10  xl:py-12 w-full mx-auto">
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
