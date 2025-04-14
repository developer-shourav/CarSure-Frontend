import FeatureSection from "@/components/ui/FeatureSection";
import CarShowcase from "@/components/ui/FeatureCars/CarShowcase";
import TestimonialSection from "@/components/ui/TestimonialSection";
import CustomSlider from "@/components/ui/carousel/CustomSlider";
import FaqSection from "@/components/ui/FAQ/FaqSection";
import { CustomCarSection } from "@/components/ui/CustomCarSection/CustomCarSection";
import { OurPartners } from "@/components/ui/OurPartners/OurPartners";
import { PhotoCollage } from "@/components/ui/PhotoCollage/PhotoCollage";

export default function Home() {
  return (
    <main className="w-full">
      <CustomSlider />
      <FeatureSection />
      <CarShowcase />
      <CustomCarSection />
      <OurPartners />
      <PhotoCollage />
      <TestimonialSection />
      <FaqSection />
    </main>
  );
}
