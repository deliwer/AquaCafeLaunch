import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import IPhone17Campaign from "@/components/iphone17-campaign";
import IPhoneTradeCalculator from "@/components/iphone-trade-calculator";
import StarterKitFlow from "@/components/starter-kit-flow";
import ProfessionalTutorial from "@/components/professional-tutorial";
import ClimateContribution from "@/components/climate-contribution";
import Leaderboard from "@/components/leaderboard";
import AchievementSystem from "@/components/achievement-system";
import InteractiveElements from "@/components/interactive-elements";
import ProductShowcase from "@/components/product-showcase";
import PartnershipProgram from "@/components/partnership-program";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-slate-900 text-white font-sans">
      <Navigation />
      <HeroSection />
      <IPhone17Campaign />
      <IPhoneTradeCalculator />
      <StarterKitFlow />
      <ProfessionalTutorial />
      <ClimateContribution />
      <Leaderboard />
      <AchievementSystem />
      <InteractiveElements />
      <ProductShowcase />
      <PartnershipProgram />
      <Footer />
    </div>
  );
}
