import carSketch from "@/assets/skatch.png";
import { FaRegCircleCheck } from "react-icons/fa6";

export function CustomCarSection() {
  return (
    <section className="w-full px-4 py-12 md:py-20 bg-background text-foreground">
      <div className="max-w-6xl mx-auto flex flex-col-reverse md:flex-row items-center gap-10">
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
          <h2 className="text-2xl md:text-4xl font-bold mb-4">
            Build Your Dream Car from Sketch
          </h2>
          <p className="text-muted-foreground mb-6">
            Have a vision for your dream car? Share your sketch or concept and
            our expert team will bring it to life with precision and style. From
            design to delivery, we handle it all.
          </p>
          <ul className="space-y-2 mb-6">
            <li className="flex items-center gap-2">
              {" "}
              <FaRegCircleCheck className="font-bold text-green-600 text-xl" />{" "}
              <span>Hand-crafted design and engineering</span>
            </li>
            <li className="flex items-center gap-2">
              <FaRegCircleCheck className="font-bold text-green-600 text-xl" />{" "}
              <span>Real-time collaboration with our team</span>
            </li>
            <li className="flex items-center gap-2">
              <FaRegCircleCheck className="font-bold text-green-600 text-xl" />{" "}
              <span>Quality materials and cutting-edge tech</span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}
