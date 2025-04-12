import FeatureSection from "@/components/ui/FeatureSection";
import CarShowcase from "@/components/ui/CarShowcase";
import TestimonialSection from "@/components/ui/TestimonialSection";
import CustomSlider from "@/components/ui/carousel/CustomSlider";

export default function Home() {
  return (
    <main className="w-full">
      <CustomSlider />
      <FeatureSection />
      <CarShowcase />
      <TestimonialSection />
    </main>
  );
}
