import FeatureSection from "@/components/ui/Home/FeatureSection/FeatureSection";
import CarShowcase from "@/components/ui/Home/FeatureCars/CarShowcase";
import TestimonialSection from "@/components/ui/Home/TestimonialSection/TestimonialSection";
import CustomSlider from "@/components/ui/Home/carousel/CustomSlider";
import FaqSection from "@/components/ui/Home/FAQ/FaqSection";
import CustomCarSection  from "@/components/ui/Home/CustomCarSection/CustomCarSection";
import OurPartners  from "@/components/ui/Home/OurPartners/OurPartners";
import PhotoCollage from "@/components/ui/Home/PhotoCollage/PhotoCollage";
import AiCarSection from "@/components/ui/Home/AiCarSection/AiCarSection";


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
