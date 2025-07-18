import aiCar from "@/assets/intregrate-ai.jpg";
import { FaRegCircleCheck } from "react-icons/fa6";
import { WebsiteHeading } from "../../WebsiteHeading/WebsiteHeading";
import SectionWrapper from "../../wrapper/SectionWrapper";

export default function AiCarSection() {
  return (
    <section className="w-full py-8 lg:py-10  xl:py-12 mx-auto">
      <SectionWrapper>
        <div className="flex flex-col md:flex-row items-start justify-between gap-8">
          {/* -----------------Left Content -----------------*/}
          <div className="w-full md:w-1/2 md:-mt-10">
            <WebsiteHeading
              title="Upgrade Any Car with AI & Autopilot"
              className="text-left"
            />
            <p className="text-muted-foreground -mt-10 mb-3">
              Want smart features in your current car? We specialize in
              integrating advanced AI systems and autopilot technology into any
              vehicle—customized to fit your lifestyle and needs.
            </p>
            <ul className="space-y-2 mb-6">
              <li className="flex items-center gap-2">
                <FaRegCircleCheck className="font-bold text-green-600" />
                <span>Custom AI and autopilot solutions for any car model</span>
              </li>
              <li className="flex items-center gap-2">
                <FaRegCircleCheck className="font-bold text-green-600" />
                <span>Seamless integration with real-time diagnostics</span>
              </li>
              <li className="flex items-center gap-2">
                <FaRegCircleCheck className="font-bold text-green-600" />
                <span>Expert installation with safety and precision</span>
              </li>
            </ul>
          </div>

          {/* -----------------Right Content -----------------*/}
          <div className="w-full md:w-1/2">
            <img
              src={aiCar}
              loading="lazy"
              alt="Custom car from sketch"
              className="w-full rounded-2xl h-auto object-cover"
            />
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
