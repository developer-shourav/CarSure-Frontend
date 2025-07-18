import { testimonials } from "@/constant";
import { WebsiteHeading } from "../../WebsiteHeading/WebsiteHeading";
import SectionWrapper from "../../wrapper/SectionWrapper";
import { Star, StarHalf, Quote } from "lucide-react";

export default function TestimonialSection() {
  return (
    <section className="py-8 lg:py-10  xl:py-12 w-full mx-auto">
      <SectionWrapper>
        <div className="text-center mb-16">
          <WebsiteHeading title="Client Experiences" />
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
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
                className="relative bg-white dark:bg-zinc-900 p-8 rounded-3xl border border-zinc-200 dark:border-zinc-800 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-2 group overflow-hidden"
              >
                {/* Decorative elements */}
                <div className="absolute top-0 right-0 w-24 h-24 bg-red-600/5 dark:bg-red-600/10 rounded-bl-full transition-all duration-500 group-hover:bg-red-600/15 dark:group-hover:bg-red-600/20" />

                <div className="absolute top-6 right-6 text-red-600/20 dark:text-red-600/30">
                  <Quote size={36} />
                </div>

                <div className="relative z-10">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="relative">
                      <img
                        src={testimonial.image}
                        loading="lazy"
                        alt={testimonial.name}
                        className="w-16 h-16 rounded-full object-cover border-2 border-white dark:border-zinc-800 shadow-lg"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-red-600 rounded-full flex items-center justify-center">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="white"
                          className="w-3 h-3"
                        >
                          <path
                            fillRule="evenodd"
                            d="M8.603 3.799A4.49 4.49 0 0112 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 013.498 1.307 4.491 4.491 0 011.307 3.497A4.49 4.49 0 0121.75 12a4.49 4.49 0 01-1.549 3.397 4.491 4.491 0 01-1.307 3.497 4.491 4.491 0 01-3.497 1.307A4.49 4.49 0 0112 21.75a4.49 4.49 0 01-3.397-1.549 4.49 4.49 0 01-3.498-1.306 4.491 4.491 0 01-1.307-3.498A4.49 4.49 0 012.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 011.307-3.497 4.49 4.49 0 013.497-1.307zm7.007 6.387a.75.75 0 10-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 00-1.06 1.06l2.25 2.25a.75.75 0 001.14-.094l3.75-5.25z"
                            clipRule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>

                    <div>
                      <h4 className="text-lg font-bold text-black dark:text-white">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-red-600 dark:text-red-500 font-medium">
                        {testimonial.designation}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 mb-5">
                    {stars.map((starType, idx) =>
                      starType === "full" ? (
                        <Star
                          key={idx}
                          size={16}
                          className="text-red-600 fill-red-500 dark:fill-red-600/90 dark:text-red-700"
                        />
                      ) : starType === "half" ? (
                        <StarHalf
                          key={idx}
                          size={16}
                          className="text-red-600 fill-red-500 dark:fill-red-600/90 dark:text-red-700"
                        />
                      ) : (
                        <Star
                          key={idx}
                          size={16}
                          className="text-zinc-300 dark:text-zinc-700"
                        />
                      )
                    )}
                    <span className="ml-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                      {testimonial.rating}
                    </span>
                  </div>

                  <p className="text-gray-700 dark:text-gray-300 text-base leading-relaxed relative pl-6 before:content-[''] before:absolute before:left-0 before:top-0 before:w-1 before:h-full before:bg-red-600 before:rounded-full">
                    {testimonial.feedback}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

      </SectionWrapper>
    </section>
  );
}
