import FeatureSection from "@/components/ui/FeatureSection";
import CarShowcase from "@/components/ui/CarShowcase";
import TestimonialSection from "@/components/ui/TestimonialSection";
import CustomSlider from "@/components/ui/carousel/CustomSlider";
import FaqSection from "@/components/ui/FAQ/FaqSection";

export default function Home() {
  return (
    <main className="w-full">
      <CustomSlider />
      <FeatureSection />
      <CarShowcase />
      <TestimonialSection />
      <FaqSection/>
    </main>
  );
}
