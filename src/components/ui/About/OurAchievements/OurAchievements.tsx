import { WebsiteHeading } from "@/components/ui/WebsiteHeading/WebsiteHeading";
import SectionWrapper from "@/components/ui/wrapper/SectionWrapper";
import { Award, Trophy } from "lucide-react";

const achievements = [
  {
    image: "/achievements/award8.jpg",
    title: "Green Technology Award",
    description:
      "Awarded for promoting sustainable and eco-friendly solutions.",
    shape: "rectangular",
  },
  {
    image: "/achievements/award9.jpg",
    title: "Excellence in Design",
    description: "Celebrated for outstanding and user-centric design.",
    shape: "rectangular",
  },
  {
    image: "/achievements/award1.jpg",
    title: "Best Auto Tech 2024",
    description: "Awarded for excellence in automotive innovation.",
    shape: "square",
  },
  {
    image: "/achievements/award2.jpg",
    title: "Top Customer Choice",
    description: "Recognized by users for outstanding service and support.",
    shape: "square",
  },
  {
    image: "/achievements/award3.jpg",
    title: "Fastest Delivery Network",
    description: "Awarded for 24hr paperless registration and delivery.",
    shape: "square",
  },
  {
    image: "/achievements/award4.jpg",
    title: "Best Startup 2023",
    description: "Honored at the Bangladesh Auto Expo.",
    shape: "square",
  },
  {
    image: "/achievements/award5.jpg",
    title: "Innovation in Service",
    description: "Recognized for pioneering new service standards.",
    shape: "rectangular",
  },
  {
    image: "/achievements/award7.jpg",
    title: "Community Impact Award",
    description: "For making a significant positive impact on the community.",
    shape: "rectangular",
  },
];

const OurAchievements = () => {
  return (
      <SectionWrapper>
        <WebsiteHeading title="Our Achievements" />

        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4 lg:gap-5  mt-12">
          {achievements.map((item, index) => (
            <div
              key={index}
              className={`relative rounded-2xl shadow-md overflow-hidden group ${
                item.shape === "rectangular" ? "col-span-2" : "col-span-1"
              } ${
                item.shape === "square"
                  ? "aspect-w-1 aspect-h-1"
                  : "aspect-w-16 aspect-h-9"
              }`}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-black/50 flex flex-col items-center justify-end text-center p-4 lg:p-6 opacity-0 group-hover:opacity-100 transition-all duration-500 transform translate-y-full group-hover:translate-y-0">
                {item.shape === "rectangular" ? (
                  <Trophy className="size-10 lg:size-16 text-yellow-600 mb-2" />
                ) : (
                  <Award className="size-10 lg:size-16 text-yellow-600 mb-2" />
                )}

                <h4 className="text-lg font-semibold text-white mb-2">
                  {item.title}
                </h4>
                <p className="text-sm text-gray-200">{item.description}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>  );
};

export default OurAchievements;
