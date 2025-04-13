import { LucideShieldCheck, LucideWallet, Layers   } from "lucide-react";

const features = [
  {
    title: "Secure Transactions",
    description: "Integrated with SurjoPay to ensure every payment is fast, secure, and seamless.",
    icon: <LucideShieldCheck className="size-12 lg:size-16 text-red-600" />,
  },
  {
    title: "Wide Car Selection",
    description: "Explore a massive inventory of new and used cars from trusted dealers.",
    icon: <Layers  className="size-12 lg:size-16 text-red-600" />,
  },
  {
    title: "Easy Financing",
    description: "Flexible payment and financing options tailored to your needs.",
    icon: <LucideWallet className="size-12 lg:size-16 text-red-600" />,
  },
];

export default function FeatureSection() {
  return (
    <section className="w-full py-16 bg-white dark:bg-black">
      <div className="max-w-6xl mx-auto px-6">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-12">
          Why Choose CarSure?
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {features.map((feature, index) => (
            <div key={index} className="bg-gray-100 dark:bg-zinc-900 p-8 rounded-2xl shadow hover:shadow-xl transition">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-700 dark:text-gray-300">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}