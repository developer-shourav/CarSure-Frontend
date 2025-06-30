import { testimonials } from "@/constant";
import { WebsiteHeading } from "./WebsiteHeading/WebsiteHeading";
import SectionWrapper from "./wrapper/SectionWrapper";
import { Star, StarHalf } from "lucide-react";

export default function TestimonialSection() {
  return (
    <section className="py-8 lg:py-10  xl:py-12 w-full mx-auto">
      <SectionWrapper>
        <WebsiteHeading title="What Our Customers Say" />
        <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
          {testimonials.map((testimonial, index) => {
            // Build star rating array
            const stars = [];
            const fullStars = Math.floor(testimonial.rating);
            const hasHalfStar = testimonial.rating % 1 !== 0;
            for (let i = 0; i < 5; i++) {
              if (i < fullStars) {
                stars.push("full");
              } else if (i === fullStars && hasHalfStar) {
                stars.push("half");
              } else {
                stars.push("empty");
              }
            }

            return (
              <div
                key={index}
                className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl shadow hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    loading="lazy"
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-black dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-0.5 mb-3">
                  {stars.map((starType, idx) =>
                    starType === "full" ? (
                      <Star
                        key={idx}
                        size={14}
                        className="text-yellow-600 fill-yellow-500"
                      />
                    ) : starType === "half" ? (
                      <StarHalf
                        key={idx}
                        size={14}
                        className="text-yellow-600 fill-yellow-500"
                      />
                    ) : (
                      <Star key={idx} size={14} className="text-gray-400" />
                    )
                  )}
                </div>

                <p className="text-gray-700 dark:text-gray-300 italic">
                  “{testimonial.feedback}”
                </p>
              </div>
            );
          })}
        </div>
      </SectionWrapper>
    </section>
  );
}
