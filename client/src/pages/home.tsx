import Navigation from "@/components/navigation";
import DubaiMissionDashboard from "@/components/dubai-mission-dashboard";
import ImpactSlotMachine from "@/components/impact-slot-machine";
import LiveActivityFeed from "@/components/live-activity-feed";
import AIHeroConcierge from "@/components/ai-hero-concierge";
import IPhoneTradeCalculator from "@/components/iphone-trade-calculator";
import StarterKitFlow from "@/components/starter-kit-flow";
import ClimateContribution from "@/components/climate-contribution";
import Leaderboard from "@/components/leaderboard";
import AchievementSystem from "@/components/achievement-system";
import ProductShowcase from "@/components/product-showcase";
import Footer from "@/components/footer";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Droplets, Gift, Calculator, HandHeart, Crown, Sparkles, Trophy, Target, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-900 text-white font-sans">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-2 px-4 text-center">
        <p className="text-white text-sm font-medium">
          🎁 Welcome Bonus: Get Bakers Kitchen DH100 meal voucher with your trade-in! Limited time offer.
        </p>
      </div>
      
      <Navigation />
      
      {/* Main Mission Dashboard */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          <DubaiMissionDashboard />
        </div>
      </section>

      {/* Interactive Device Impact Simulator */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                YOUR DEVICE → <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">PLANET IMPACT SIMULATOR</span>
              </h2>
              <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-400/50 text-sm">
                <Sparkles className="h-3 w-3 mr-1" />
                Interactive Experience
              </Badge>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <IPhoneTradeCalculator />
              <ImpactSlotMachine />
            </div>
          </div>
        </div>
      </section>

      {/* Instant Planet Power Unlocks */}
      <section className="py-16 bg-gradient-to-r from-emerald-900/20 to-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
              💥 INSTANT PLANET POWER UNLOCKS
            </h2>
            <p className="text-xl text-emerald-300 mb-12">
              The moment you order AquaCafe Starter Kit, unlock exclusive rewards
            </p>
            
            <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 border border-emerald-400/30 rounded-2xl p-8 backdrop-blur-sm mb-8">
              <p className="text-slate-300 mb-6">Complete your iPhone trade-in to unlock amazing rewards!</p>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="bg-gradient-to-br from-emerald-500 to-blue-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-emerald-400 text-sm font-medium">INSTANT PLANET POWER</p>
                  <p className="text-white text-xl font-bold">+2,400 Points</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-purple-500 to-pink-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Trophy className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-purple-400 text-sm font-medium">ACHIEVEMENT</p>
                  <p className="text-white text-xl font-bold">"Water Warrior"</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-yellow-500 to-orange-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Gift className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-yellow-400 text-sm font-medium">SURPRISE UNLOCK</p>
                  <p className="text-white text-xl font-bold">Premium Filter FREE</p>
                </div>
                
                <div className="text-center">
                  <div className="bg-gradient-to-br from-red-500 to-pink-500 w-16 h-16 rounded-xl flex items-center justify-center mx-auto mb-3">
                    <Target className="h-8 w-8 text-white" />
                  </div>
                  <p className="text-red-400 text-sm font-medium">STREAK BONUS</p>
                  <p className="text-white text-xl font-bold">30-Day Challenge</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Leaderboard and Activity */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                🏆 <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-400">LIVE HERO LEADERBOARD</span>
              </h2>
              <p className="text-xl text-slate-300">See where you'll rank among Dubai's environmental champions</p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8">
              <Leaderboard />
              <LiveActivityFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Founding Hero Exclusive Perks */}
      <section className="py-16 bg-gradient-to-br from-yellow-900/20 to-orange-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                <Crown className="inline-block h-10 w-10 text-yellow-400 mr-3" />
                FOUNDING HERO EXCLUSIVE PERKS
              </h2>
              <Badge variant="outline" className="bg-red-900/30 text-red-300 border-red-400/50 text-lg py-2 px-4">
                Limited to first 100 heroes only
              </Badge>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-400/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-yellow-400 mb-3">🔥 Lifetime Double Points</h3>
                  <p className="text-yellow-200">All future trades earn 2x points forever</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-400/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-purple-400 mb-3">⭐ Priority Access</h3>
                  <p className="text-purple-200">First access to limited edition rewards</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border-emerald-400/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-emerald-400 mb-3">👑 Exclusive Badge</h3>
                  <p className="text-emerald-200">Founding Hero status on all profiles</p>
                </CardContent>
              </Card>
              
              <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-400/50">
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold text-red-400 mb-3">⏰ Limited Time</h3>
                  <p className="text-red-200">Founding Hero status expires in 6 days</p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* AI Hero Concierge */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                🤖 AI HERO CONCIERGE
              </h2>
              <p className="text-xl text-slate-300">Get instant trade-in valuation and start your hero journey</p>
            </div>
            <AIHeroConcierge />
          </div>
        </div>
      </section>

      {/* Enhanced Starter Kit Flow */}
      <StarterKitFlow />

      {/* Climate Impact Dashboard */}
      <ClimateContribution />

      {/* Achievement System */}
      <AchievementSystem />

      {/* Product Showcase */}
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
