type Testimonial = {
    name: string;
    feedback: string;
    image: string;
    designation: string;
  };
  
  const testimonials: Testimonial[] = [
    {
      name: "Ayesha Rahman",
      feedback:
        "CarSure made buying my first car so easy! I loved the secure payment and the variety of options.",
      image: "/testimonials/ayesha.jpg",
      designation: "Marketing Manager",
    },
    {
      name: "Tanvir Alam",
      feedback:
        "Excellent service, great UI, and smooth financing. I’ll definitely recommend it to my friends!",
      image: "/testimonials/tanvir.jpg",
      designation: "Software Engineer",
    },
    {
      name: "Sadia Chowdhury",
      feedback:
        "Buying a car used to be stressful, but not anymore. CarSure changed the game!",
      image: "/testimonials/sadia.jpg",
      designation: "Business Owner",
    },
    {
      name: "Devid Salman",
      feedback:
        "I personally like CarSure. There Service is too good. They have nice super cars collection.",
      image: "/testimonials/don.jpg",
      designation: "Doctor",
    },
  ];
  
  export default function TestimonialSection() {
    return (
      <section className="py-16 bg-white dark:bg-zinc-950">
        <div className="max-w-6xl mx-auto px-6">
          <h2 className="text-3xl md:text-4xl font-bold text-center text-black dark:text-white mb-12">
            What Our Customers Say
          </h2>
          <div className="grid gap-4 md:grid-cols-3 lg:grid-cols-4">
            {testimonials.map((testimonial, index) => (
              <div
                key={index}
                className="bg-zinc-100 dark:bg-zinc-900 p-6 rounded-2xl shadow hover:shadow-xl transition"
              >
                <div className="flex items-center gap-4 mb-4">
                  <img
                    src={testimonial.image}
                    alt={testimonial.name}
                    className="w-14 h-14 rounded-full object-cover"
                  />
                  <div>
                    <h4 className="text-lg font-semibold text-black dark:text-white">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.designation}</p>
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300 italic">
                  “{testimonial.feedback}”
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  