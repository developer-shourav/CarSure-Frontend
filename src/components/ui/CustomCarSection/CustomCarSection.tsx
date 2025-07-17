import carSketch from "@/assets/skatch.png";
import { FaRegCircleCheck } from "react-icons/fa6";
import { WebsiteHeading } from "../WebsiteHeading/WebsiteHeading";
import SectionWrapper from "../wrapper/SectionWrapper";

export function CustomCarSection() {
  return (
    <section className="w-full py-8 lg:py-10  xl:py-12 mx-auto">
      <SectionWrapper>
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8">
          {/* -----------------Left Image -----------------*/}
          <div className="w-full md:w-1/2">
            <img
              src={carSketch}
              loading="lazy"
              alt="Custom car from sketch"
              className="w-full h-auto object-cover"
            />
          </div>

          {/* -----------------Right Content -----------------*/}
          <div className="w-full md:w-1/2">
            <WebsiteHeading
              title=" Build Your Dream Car from Sketch"
              className="text-left"
            />
            <p className="text-muted-foreground -mt-10 mb-3">
              Have a vision for your dream car? Share your sketch or concept and
              our expert team will bring it to life with precision and style.
              From design to delivery, we handle it all.
            </p>
            <ul className="space-y-2 mb-6 ">
              <li className="flex items-center gap-2">
                {" "}
                <FaRegCircleCheck className="font-bold text-green-600 " />{" "}
                <span>Hand-crafted design and engineering</span>
              </li>
              <li className="flex items-center gap-2">
                <FaRegCircleCheck className="font-bold text-green-600" />{" "}
                <span>Real-time collaboration with our team</span>
              </li>
              <li className="flex items-center gap-2">
                <FaRegCircleCheck className="font-bold text-green-600" />{" "}
                <span>Quality materials and cutting-edge tech</span>
              </li>
            </ul>
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
