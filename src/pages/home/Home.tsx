import FeatureSection from "@/components/ui/FeatureSection";
import CarShowcase from "@/components/ui/FeatureCars/CarShowcase";
import TestimonialSection from "@/components/ui/TestimonialSection";
import CustomSlider from "@/components/ui/carousel/CustomSlider";
import FaqSection from "@/components/ui/FAQ/FaqSection";
import { CustomCarSection } from "@/components/ui/CustomCarSection/CustomCarSection";
import { OurPartners } from "@/components/ui/OurPartners/OurPartners";
import { PhotoCollage } from "@/components/ui/PhotoCollage/PhotoCollage";
import { AiCarSection } from "@/components/ui/AiCarSection/AiCarSection";

export default function Home() {
  return (
    <main className="w-full mt-[62px] lg:mt-[116px]">
      <CustomSlider />
      <FeatureSection />
      <CarShowcase />
      <CustomCarSection />
      <AiCarSection />
      <OurPartners />
      <PhotoCollage />
      <TestimonialSection />
      <FaqSection />
    </main>
  );
}
