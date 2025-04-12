import { Button } from "@/components/ui/button";
import { ThemeToggle } from "../ThemeToggle";

export default function Hero() {
  return (
    <section className="w-full min-h-[80vh] flex items-center justify-center bg-gradient-to-r from-red-600 via-black to-red-800 text-white px-6">
      <div className="max-w-6xl text-center space-y-6">
        <h1 className="text-5xl md:text-6xl font-bold leading-tight">
          Find Your Perfect Ride with <span className="text-red-400">CarSure</span>
        </h1>
        <p className="text-lg md:text-xl text-gray-300">
          Discover, Compare & Shop Cars Seamlessly with us.
        </p>
        <div className="flex flex-wrap justify-center gap-4 mt-6">
          <Button className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 text-lg rounded-xl shadow-md transition">
            Browse Cars
          </Button>
          <Button variant="outline" className="border-white text-white hover:bg-white hover:text-black px-6 py-3 text-lg rounded-xl transition">
            Learn More
          </Button>
          <ThemeToggle/>
        </div>
      </div>
    </section>
  );
}