
import aboutImg from "@/assets/aboutUs.jpg";
import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";

const About = () => {
  return (
    <SectionWrapper>
      <section className="bg-white dark:bg-zinc-950 mt-[78px] lg:mt-[165px]">
        <WebsiteHeading title="About Us" />
        {/* -----------------Image Left, Text Right -----------------*/}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10  items-center pb-10">
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
              At CarSure, we blend technology with trust to deliver an
              outstanding car buying and selling experience. Whether you're
              browsing our inventory or booking a test drive, we're with you
              every step of the way.
            </p>
            <p className="text-muted-foreground mb-6">
              With a strong track record and an expert team, we've helped
              thousands of happy customers find the right vehicle — reliably and
              affordably.
            </p>
          </div>
        </div>

        {/* -----------------Achievements Section----------------- */}
        <div className="mt-20 px-5 lg:px-10">
          <WebsiteHeading title="Our Achievements" />
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
            {[
              {
                label: "Years Experience",
                value: "10+ ",
              },
              {
                label: "Happy Clients",
                value: "100+ ",
              },
              {
                label: "Projects Completed",
                value: "200+",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="bg-zinc-100 dark:bg-zinc-900 py-8 lg:py-10  xl:py-12 px-6 rounded-2xl shadow hover:shadow-lg transition"
              >
                <div className="text-4xl font-bold mb-4 text-red-500">{item.value}</div>
                <p className="text-xl font-semibold text-zinc-800 dark:text-white">
                  {item.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SectionWrapper>
  );
};

export default About;
