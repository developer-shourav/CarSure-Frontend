import { CountUpStats } from "../../CountUpStats";
import { WebsiteHeading } from "../../WebsiteHeading/WebsiteHeading";
import SectionWrapper from "../../wrapper/SectionWrapper";
import aboutImg from "@/assets/aboutUs.jpg";

const AboutTopBanner = () => {
  return (
    <SectionWrapper>
      <WebsiteHeading title="About Us" />

      {/* -----------------Image Left, Text Right -----------------*/}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center pb-10">
        {/* --------Image-------- */}
        <div>
          <img
            src={aboutImg}
            alt="About CarSure"
            className="w-full rounded-2xl"
          />
        </div>

        {/* --------Text Content ---------*/}
        <div>
          <h4 className="text-4xl font-bold text-zinc-900 dark:text-white mb-4">
            Car<span className="text-red-600">Sure</span>
          </h4>
          <p className="text-muted-foreground mb-6">
            At CarSure, we blend technology with trust to deliver an outstanding
            car buying and selling experience. Whether you're browsing our
            inventory or booking a test drive, we're with you every step of the
            way.
          </p>
          <p className="text-muted-foreground mb-6">
            With a strong track record and an expert team, we've helped
            thousands of happy customers find the right vehicle — reliably and
            affordably.
          </p>
          <p className="text-muted-foreground mb-6">
            Our platform is built to give you control and confidence. From
            comparing car models to securing financing or checking registration
            status — everything is transparent, fast, and secure under one roof.
          </p>
          <p className="text-muted-foreground mb-6">
            As we grow across Bangladesh, our focus remains the same: quality
            vehicles, trusted dealers, and a customer-first support team ready
            to assist you at any moment.
          </p>
        </div>
      </div>

      {/* -----------------Achievements Section----------------- */}
      <div className="mt-20 px-5 lg:px-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 ">
          {[
            { value: "10K+", label: "Happy Customers" },
            { value: "98%", label: "Satisfaction Rate" },
            { value: "24h", label: "Fastest Delivery" },
            { value: "200+", label: "Verified Dealers" },
          ].map((stat, index) => (
            <CountUpStats key={index} value={stat.value} label={stat.label} />
          ))}
        </div>
      </div>
    </SectionWrapper>
  );
};

export default AboutTopBanner;
