import Hero from "@/components/ui/Hero";
import FeatureSection from "@/components/ui/FeatureSection";
import CarShowcase from "@/components/ui/CarShowcase";
import TestimonialSection from "@/components/ui/TestimonialSection";

export default function Home() {
  return (
    <main className="w-full">
      <Hero />
      <FeatureSection />
      <CarShowcase />
      <TestimonialSection />
    </main>
  );
}