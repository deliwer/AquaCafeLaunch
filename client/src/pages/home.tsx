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
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Droplets, Gift, Calculator, HandHeart } from "lucide-react";

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
      
      {/* Quick Navigation to Dedicated Pages */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Professional Services</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Droplets className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">AquaCafe Plans</h3>
                  <p className="text-gray-300 mb-4">Professional water filtration systems from AED 99</p>
                  <Button 
                    onClick={() => window.location.href = '/aquacafe-plans'}
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                  >
                    View Plans
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Gift className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Loyalty Rewards</h3>
                  <p className="text-gray-300 mb-4">Earn points and restaurant credits</p>
                  <Button 
                    onClick={() => window.location.href = '/loyalty-rewards'}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                  >
                    Earn Rewards
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Impact Calculator</h3>
                  <p className="text-gray-300 mb-4">Calculate your environmental impact</p>
                  <Button 
                    onClick={() => window.location.href = '/impact-calculator'}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                  >
                    Calculate Impact
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-all duration-300">
                <CardContent className="p-6 text-center">
                  <HandHeart className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Partnership</h3>
                  <p className="text-gray-300 mb-4">Join our affiliate and restaurant network</p>
                  <Button 
                    onClick={() => window.location.href = '/partnership'}
                    className="w-full bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700"
                  >
                    Become Partner
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
      
      <PartnershipProgram />
      <Footer />
    </div>
  );
}
