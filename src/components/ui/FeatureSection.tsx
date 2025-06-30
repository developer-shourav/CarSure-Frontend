import { LucideShieldCheck, LucideWallet, Layers } from "lucide-react";
import { FaCar } from "react-icons/fa";
import SectionWrapper from "./wrapper/SectionWrapper";
import { WebsiteHeading } from "./WebsiteHeading/WebsiteHeading";

const features = [
  {
    title: "Secure Transactions",
    description:
      "Integrated with SurjoPay to ensure every payment is fast, secure, and seamless.",
    icon: <LucideShieldCheck className="size-12 lg:size-14 text-red-600" />,
  },
  {
    title: "Wide Car Selection",
    description:
      "Explore a massive inventory of new and used cars from trusted dealers.",
    icon: <FaCar className="size-12 lg:size-14 text-red-600" />,
  },
  {
    title: "Easy Financing",
    description:
      "Flexible payment and financing options tailored to your needs.",
    icon: <LucideWallet className="size-12 lg:size-14 text-red-600" />,
  },
  {
    title: "Fastest Registration",
    description: "Get all papers day form one day. Get register and license.",
    icon: <Layers className="size-12 lg:size-14 text-red-600" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full py-8 lg:py-10  xl:py-12 ">
      <SectionWrapper>
        <WebsiteHeading title="Why Choose CarSure?" />
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-100 dark:bg-zinc-900 p-6 rounded-2xl shadow hover:shadow-xl   dark:shadow-[#d4282859] transition dark:hover:shadow-lg"
            >
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
