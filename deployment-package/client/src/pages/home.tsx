import Navigation from "@/components/navigation";
import HeroSection from "@/components/hero-section";
import Leaderboard from "@/components/leaderboard";
import AchievementSystem from "@/components/achievement-system";
import InteractiveElements from "@/components/interactive-elements";
import ProductShowcase from "@/components/product-showcase";
import PartnershipProgram from "@/components/partnership-program";
import Footer from "@/components/footer";

export default function Home() {
  return (
    <div className="bg-gray-900 text-white font-sans">
      <Navigation />
      <HeroSection />
      <Leaderboard />
      <AchievementSystem />
      <InteractiveElements />
      <ProductShowcase />
      <PartnershipProgram />
      <Footer />
    </div>
  );
}
