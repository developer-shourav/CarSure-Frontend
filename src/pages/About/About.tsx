import AboutTopBanner from "@/components/ui/About/AboutTopBanner/AboutTopBanner";
import OurAchievements from "@/components/ui/About/OurAchievements/OurAchievements";
import OurHeroTeam from "@/components/ui/About/OurHeroTeam/OurHeroTeam";
import PublicPageWrapper from "@/components/ui/wrapper/PublicPageWrapper";

const About = () => {
  return (
    <PublicPageWrapper>
      <AboutTopBanner />
      <OurHeroTeam />
      <OurAchievements />
    </PublicPageWrapper>
  );
};

export default About;
