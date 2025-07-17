import { LucideShieldCheck, LucideWallet, Layers } from "lucide-react";
import { FaCar } from "react-icons/fa";
import SectionWrapper from "./wrapper/SectionWrapper";
import { WebsiteHeading } from "./WebsiteHeading/WebsiteHeading";

const features = [
  {
    title: "Secure Transactions",
    description:
      "Integrated with SurjoPay to ensure every payment is fast, secure, and seamless.",
    icon: <LucideShieldCheck className="size-10 text-red-600" />,
  },
  {
    title: "Wide Car Selection",
    description:
      "Explore a massive inventory of new and used cars from trusted dealers.",
    icon: <FaCar className="size-10 text-red-600" />,
  },
  {
    title: "Easy Financing",
    description:
      "Flexible payment and financing options tailored to your needs.",
    icon: <LucideWallet className="size-10 text-red-600" />,
  },
  {
    title: "Fastest Registration",
    description:
      "Get all papers done in one day. Complete registration and licensing.",
    icon: <Layers className="size-10 text-red-600" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full py-12 lg:py-16 xl:py-20 relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute -top-[500px] -left-[200px] w-[800px] h-[800px] rounded-full bg-red-600/5 dark:bg-red-600/10 blur-[100px] z-0"></div>
      <div className="absolute -bottom-[300px] -right-[200px] w-[600px] h-[600px] rounded-full bg-red-600/5 dark:bg-red-600/10 blur-[100px] z-0"></div>

      <SectionWrapper>
        <div className="relative z-10">
          <WebsiteHeading
            title="Why Choose CarSure?"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
            {features.map((feature, index) => (
              <div
                key={index}
                className="group relative bg-gradient-to-b from-white to-zinc-50 dark:from-zinc-900 dark:to-zinc-950 p-8 rounded-3xl shadow-xl border border-zinc-200 dark:border-zinc-800 hover:border-red-300 dark:hover:border-red-900 transition-all duration-300 hover:-translate-y-3"
              >
                {/* Animated hover element */}
                <div className="absolute inset-0 bg-gradient-to-br from-red-600 to-red-800 opacity-0 group-hover:opacity-5 dark:group-hover:opacity-10 rounded-3xl transition-opacity duration-500"></div>

                {/* Icon container with animated border */}
                <div className="relative mb-6">
                  <div className="absolute -inset-3 bg-red-600/10 dark:bg-red-900/20 rounded-full scale-0 group-hover:scale-100 transition-transform duration-500"></div>
                  <div className="relative w-16 h-16 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center">
                    {feature.icon}
                  </div>
                </div>

                <h3 className="text-xl font-bold text-black dark:text-white mb-3 group-hover:text-red-600 dark:group-hover:text-red-500 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {feature.description}
                </p>

               
              </div>
            ))}
          </div>

          {/* Stats section below features */}
          <div className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6 border-t border-zinc-200 dark:border-zinc-800 pt-10">
            {[
              { value: "10K+", label: "Happy Customers" },
              { value: "98%", label: "Satisfaction Rate" },
              { value: "24h", label: "Fastest Delivery" },
              { value: "200+", label: "Verified Dealers" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl font-bold bg-gradient-to-br from-red-600 to-red-800 bg-clip-text text-transparent">
                  {stat.value}
                </div>
                <p className="text-gray-700 dark:text-gray-400 mt-2">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>
      </SectionWrapper>
    </section>
  );
}
