import { WebsiteHeading } from "./WebsiteHeading/WebsiteHeading";
import SectionWrapper from "./wrapper/SectionWrapper";

type Car = {
  name: string;
  image: string;
  price: string;
};

const mockCars: Car[] = [
  {
    name: "Tesla Model S",
    image: "/cars/tesla-model-s.jpg",
    price: "$69,420",
  },
  {
    name: "Toyota Corolla",
    image: "/cars/toyota-corolla.jpg",
    price: "$19,990",
  },
  {
    name: "BMW M4",
    image: "/cars/bmw-m4.jpg",
    price: "$74,999",
  },
  {
    name: "Tesla Model S",
    image: "/cars/tesla-model-s.jpg",
    price: "$69,420",
  },
];

export default function CarShowcase() {
  return (
    <section className="w-full py-16 bg-zinc-50 dark:bg-zinc-950 mb-12 lg:mb-20">
      <SectionWrapper>
        <WebsiteHeading title="Popular Cars" />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4 lg:gap-5">
          {mockCars.map((car, i) => (
            <div
              key={i}
              className="bg-white dark:bg-zinc-900 rounded-2xl overflow-hidden shadow hover:shadow-xl transition"
            >
              <img
                src={car.image}
                alt={car.name}
                loading="lazy"
                className="w-full h-52 object-cover"
              />
              <div className="p-5">
                <h3 className="text-xl font-semibold text-black dark:text-white mb-2">
                  {car.name}
                </h3>
                <p className="text-red-600 font-bold text-lg">{car.price}</p>
              </div>
            </div>
          ))}
        </div>
      </SectionWrapper>
    </section>
  );
}
