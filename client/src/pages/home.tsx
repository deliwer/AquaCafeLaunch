import Navigation from "@/components/navigation";
import DubaiMissionDashboard from "@/components/dubai-mission-dashboard";
import ImpactSlotMachine from "@/components/impact-slot-machine";
import LiveActivityFeed from "@/components/live-activity-feed";
import AIHeroConcierge from "@/components/ai-hero-concierge";
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
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";
import { Droplets, Gift, Calculator, HandHeart, Sparkles, Target, Crown, Star, Zap } from "lucide-react";

export default function Home() {
  return (
    <div className="bg-slate-900 text-white font-sans overflow-x-hidden">
      <Navigation />
      
      {/* Hero Section with Dubai Mission Dashboard */}
      <section className="relative min-h-screen bg-gradient-to-br from-slate-900 via-purple-900/20 to-blue-900/20">
        <div className="absolute inset-0 opacity-30 bg-gradient-to-br from-purple-900/10 to-blue-900/10"></div>
        <div className="container mx-auto px-4 py-12 relative">
          <DubaiMissionDashboard />
        </div>
      </section>

      {/* Welcome Bonus Banner */}
      <section className="bg-gradient-to-r from-orange-600 to-red-600 py-4">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center space-x-2"
          >
            <Gift className="h-5 w-5 text-white" />
            <span className="text-white font-semibold">
              Welcome Bonus: Get Bakers Kitchen DH100 meal voucher with your trade-in! Limited time offer.
            </span>
          </motion.div>
        </div>
      </section>

      {/* Device Impact Simulator Section */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4 text-white">
                YOUR DEVICE <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">PLANET IMPACT SIMULATOR</span>
              </h2>
              <p className="text-xl text-slate-300">
                See your environmental superpowers in real-time
              </p>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              <ImpactSlotMachine />
              <IPhoneTradeCalculator />
            </div>
          </div>
        </div>
      </section>

      {/* Live Hero Leaderboard & Activity Feed */}
      <section className="py-16 bg-gradient-to-br from-purple-900/10 to-indigo-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <Badge variant="outline" className="bg-yellow-900/30 text-yellow-300 border-yellow-400/50 mb-4">
                <Crown className="h-4 w-4 mr-2" />
                LIVE HERO LEADERBOARD
              </Badge>
              <h2 className="text-3xl font-bold text-white mb-2">
                See where you'll rank among Dubai's environmental champions
              </h2>
            </motion.div>

            <div className="grid lg:grid-cols-2 gap-8">
              <Leaderboard />
              <LiveActivityFeed />
            </div>
          </div>
        </div>
      </section>

      {/* Founding Hero Exclusive Perks */}
      <section className="py-16 bg-gradient-to-r from-yellow-900/20 to-orange-900/20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                FOUNDING HERO EXCLUSIVE PERKS
              </h2>
              <Badge variant="outline" className="bg-red-900/30 text-red-300 border-red-400/50 mb-8">
                Limited to first 100 heroes only
              </Badge>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <Card className="bg-gradient-to-br from-yellow-900/30 to-orange-900/30 border-yellow-500/30">
                  <CardContent className="p-6 text-center">
                    <Zap className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Lifetime Double Points</h3>
                    <p className="text-yellow-200 text-sm">All future trades earn 2x points forever</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-500/30">
                  <CardContent className="p-6 text-center">
                    <Star className="h-12 w-12 text-purple-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Priority Access</h3>
                    <p className="text-purple-200 text-sm">First access to limited edition rewards</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border-emerald-500/30">
                  <CardContent className="p-6 text-center">
                    <Crown className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">Exclusive Badge</h3>
                    <p className="text-emerald-200 text-sm">Founding Hero status on all profiles</p>
                  </CardContent>
                </Card>
                
                <Card className="bg-gradient-to-br from-red-900/30 to-orange-900/30 border-red-500/30">
                  <CardContent className="p-6 text-center">
                    <Target className="h-12 w-12 text-red-400 mx-auto mb-4" />
                    <h3 className="text-xl font-bold text-white mb-2">VIP Support</h3>
                    <p className="text-red-200 text-sm">Dedicated hero support line</p>
                  </CardContent>
                </Card>
              </div>

              <Badge variant="outline" className="bg-red-900/30 text-red-300 border-red-400/50">
                Founding Hero status expires in 6 days
              </Badge>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Instant Planet Power Unlocks */}
      <section className="py-16 bg-gradient-to-br from-emerald-900/10 to-teal-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold text-white mb-4">
                INSTANT PLANET POWER UNLOCKS
              </h2>
              <p className="text-xl text-emerald-300">
                The moment you order AquaCafe Starter Kit, unlock exclusive rewards
              </p>
            </motion.div>

            <AchievementSystem />
          </div>
        </div>
      </section>

      {/* AI Hero Concierge */}
      <section className="py-16 bg-gradient-to-br from-indigo-900/10 to-purple-900/10">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <AIHeroConcierge />
          </div>
        </div>
      </section>

      {/* iPhone 17 Campaign */}
      <IPhone17Campaign />

      {/* Starter Kit Flow */}
      <StarterKitFlow />

      {/* Professional Tutorial */}
      <ProfessionalTutorial />

      {/* Climate Contribution */}
      <ClimateContribution />

      {/* Interactive Elements */}
      <InteractiveElements />

      {/* Product Showcase */}
      <ProductShowcase />

      {/* Partnership Program */}
      <PartnershipProgram />

      {/* Professional Services Navigation */}
      <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-12 text-white">
              Explore Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Professional Services</span>
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Droplets className="h-12 w-12 text-emerald-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2 text-white">AquaCafe Plans</h3>
                  <p className="text-gray-300 mb-4">Professional water filtration systems from AED 99</p>
                  <Button 
                    onClick={() => window.location.href = '/aquacafe-plans'}
                    className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                    data-testid="button-view-plans"
                  >
                    View Plans
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Gift className="h-12 w-12 text-purple-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2 text-white">Loyalty Rewards</h3>
                  <p className="text-gray-300 mb-4">Earn points and restaurant credits</p>
                  <Button 
                    onClick={() => window.location.href = '/loyalty-rewards'}
                    className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
                    data-testid="button-earn-rewards"
                  >
                    Earn Rewards
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <Calculator className="h-12 w-12 text-blue-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2 text-white">Impact Calculator</h3>
                  <p className="text-gray-300 mb-4">Calculate your environmental impact</p>
                  <Button 
                    onClick={() => window.location.href = '/impact-calculator'}
                    className="w-full bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
                    data-testid="button-calculate-impact"
                  >
                    Calculate Impact
                  </Button>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700 hover:scale-105 transition-all duration-300 group">
                <CardContent className="p-6 text-center">
                  <HandHeart className="h-12 w-12 text-pink-400 mx-auto mb-4 group-hover:scale-110 transition-transform" />
                  <h3 className="text-xl font-bold mb-2 text-white">Partnership</h3>
                  <p className="text-gray-300 mb-4">Join our affiliate program</p>
                  <Button 
                    onClick={() => window.location.href = '/partnership'}
                    className="w-full bg-gradient-to-r from-pink-600 to-rose-600 hover:from-pink-700 hover:to-rose-700"
                    data-testid="button-join-partnership"
                  >
                    Join Partnership
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}