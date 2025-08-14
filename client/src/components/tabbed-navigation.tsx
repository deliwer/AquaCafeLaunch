import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Home, 
  Droplets, 
  Gift, 
  Calculator, 
  HandHeart, 
  Menu, 
  X,
  Sparkles,
  Target,
  Trophy
} from "lucide-react";

// Import page components
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

interface TabNavigationProps {
  className?: string;
}

export default function TabbedNavigation({ className = "" }: TabNavigationProps) {
  const [activeTab, setActiveTab] = useState("home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const tabs = [
    {
      id: "home",
      label: "Hero Dashboard",
      icon: Home,
      badge: "Live",
      badgeColor: "bg-green-900/30 text-green-300 border-green-400/50"
    },
    {
      id: "aquacafe",
      label: "AquaCafe Plans",
      icon: Droplets,
      badge: "From AED 99",
      badgeColor: "bg-blue-900/30 text-blue-300 border-blue-400/50"
    },
    {
      id: "rewards",
      label: "Loyalty Rewards",
      icon: Gift,
      badge: "Earn Credits",
      badgeColor: "bg-purple-900/30 text-purple-300 border-purple-400/50"
    },
    {
      id: "calculator",
      label: "Impact Calculator",
      icon: Calculator,
      badge: "AI Powered",
      badgeColor: "bg-emerald-900/30 text-emerald-300 border-emerald-400/50"
    },
    {
      id: "partnership",
      label: "Partnership",
      icon: HandHeart,
      badge: "Join Now",
      badgeColor: "bg-pink-900/30 text-pink-300 border-pink-400/50"
    }
  ];

  const renderHomeContent = () => (
    <div className="space-y-8">
      {/* Hero Mission Dashboard */}
      <DubaiMissionDashboard />
      
      {/* Welcome Bonus Banner */}
      <div className="bg-gradient-to-r from-orange-600 to-red-600 py-4 rounded-lg">
        <div className="text-center">
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
      </div>

      {/* Interactive Features */}
      <div className="grid lg:grid-cols-2 gap-8">
        <ImpactSlotMachine />
        <IPhoneTradeCalculator />
      </div>

      <div className="grid lg:grid-cols-2 gap-8">
        <Leaderboard />
        <LiveActivityFeed />
      </div>

      <AIHeroConcierge />
      
      {/* Founding Hero Exclusive Perks */}
      <Card className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border-yellow-500/30">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">
            FOUNDING HERO EXCLUSIVE PERKS
          </h2>
          <Badge variant="outline" className="bg-red-900/30 text-red-300 border-red-400/50 mb-6">
            Limited to first 100 heroes only
          </Badge>
          
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { icon: Sparkles, title: "Lifetime Double Points", desc: "All future trades earn 2x points forever" },
              { icon: Trophy, title: "Priority Access", desc: "First access to limited edition rewards" },
              { icon: Target, title: "Exclusive Badge", desc: "Founding Hero status on all profiles" },
              { icon: HandHeart, title: "VIP Support", desc: "Dedicated hero support line" }
            ].map((perk, index) => (
              <Card key={index} className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-4 text-center">
                  <perk.icon className="h-8 w-8 text-yellow-400 mx-auto mb-2" />
                  <h3 className="text-sm font-bold text-white mb-1">{perk.title}</h3>
                  <p className="text-xs text-slate-300">{perk.desc}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </CardContent>
      </Card>

      <AchievementSystem />
    </div>
  );

  const renderAquaCafeContent = () => (
    <div className="space-y-8">
      <StarterKitFlow />
      <ProductShowcase />
      <IPhone17Campaign />
    </div>
  );

  const renderRewardsContent = () => (
    <div className="space-y-8">
      <ClimateContribution />
      <AchievementSystem />
      <InteractiveElements />
    </div>
  );

  const renderCalculatorContent = () => (
    <div className="space-y-8">
      <IPhoneTradeCalculator />
      <ImpactSlotMachine />
      <ClimateContribution />
    </div>
  );

  const renderPartnershipContent = () => (
    <div className="space-y-8">
      <PartnershipProgram />
      <ProfessionalTutorial />
    </div>
  );

  const getTabContent = (tabId: string) => {
    switch (tabId) {
      case "home":
        return renderHomeContent();
      case "aquacafe":
        return renderAquaCafeContent();
      case "rewards":
        return renderRewardsContent();
      case "calculator":
        return renderCalculatorContent();
      case "partnership":
        return renderPartnershipContent();
      default:
        return renderHomeContent();
    }
  };

  return (
    <div className={`bg-slate-900 text-white ${className}`}>
      {/* Header */}
      <header className="bg-slate-800/50 border-b border-slate-700 sticky top-0 z-50 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {/* Logo */}
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-br from-emerald-500 to-blue-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">D</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">DeliWer</h1>
                <p className="text-xs text-emerald-400">Planet Heroes Trade Service</p>
              </div>
            </div>

            {/* Mobile Menu Button */}
            <Button
              variant="ghost"
              size="sm"
              className="md:hidden text-white"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              data-testid="button-mobile-menu"
            >
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>

            {/* Desktop Status */}
            <div className="hidden md:flex items-center space-x-4">
              <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-400/50">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2 animate-pulse"></div>
                Live Mission Active
              </Badge>
              <Badge variant="outline" className="bg-red-900/30 text-red-300 border-red-400/50">
                47 Founding Hero spots left
              </Badge>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        {/* Tab List */}
        <div className="border-b border-slate-700 bg-slate-800/30">
          <div className="container mx-auto px-4">
            <TabsList className="grid w-full grid-cols-5 bg-transparent h-auto p-0 gap-0">
              {tabs.map((tab) => (
                <TabsTrigger
                  key={tab.id}
                  value={tab.id}
                  className={`
                    flex flex-col items-center space-y-1 p-4 rounded-none border-b-2 transition-all duration-300
                    data-[state=active]:border-emerald-400 data-[state=active]:bg-emerald-900/20
                    data-[state=inactive]:border-transparent hover:bg-slate-700/30
                    text-slate-300 data-[state=active]:text-emerald-300
                  `}
                  data-testid={`tab-${tab.id}`}
                >
                  <tab.icon className="h-5 w-5" />
                  <span className="text-xs font-medium hidden sm:block">{tab.label}</span>
                  <Badge 
                    variant="outline" 
                    className={`text-xs px-2 py-0 h-auto hidden md:block ${tab.badgeColor}`}
                  >
                    {tab.badge}
                  </Badge>
                </TabsTrigger>
              ))}
            </TabsList>
          </div>
        </div>

        {/* Tab Content */}
        <div className="container mx-auto px-4 py-8">
          <AnimatePresence mode="wait">
            {tabs.map((tab) => (
              <TabsContent key={tab.id} value={tab.id} className="mt-0">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  {getTabContent(tab.id)}
                </motion.div>
              </TabsContent>
            ))}
          </AnimatePresence>
        </div>
      </Tabs>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 z-40 md:hidden"
            onClick={() => setIsMobileMenuOpen(false)}
          >
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              className="fixed right-0 top-0 h-full w-80 bg-slate-800 border-l border-slate-700 p-6"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-4">
                <div className="text-center">
                  <h2 className="text-xl font-bold text-white mb-2">DeliWer Navigation</h2>
                  <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-400/50">
                    Planet Heroes Mission Active
                  </Badge>
                </div>
                
                {tabs.map((tab) => (
                  <Button
                    key={tab.id}
                    variant={activeTab === tab.id ? "default" : "ghost"}
                    className="w-full justify-start space-x-3"
                    onClick={() => {
                      setActiveTab(tab.id);
                      setIsMobileMenuOpen(false);
                    }}
                    data-testid={`mobile-tab-${tab.id}`}
                  >
                    <tab.icon className="h-5 w-5" />
                    <span>{tab.label}</span>
                    <Badge variant="outline" className={`ml-auto ${tab.badgeColor}`}>
                      {tab.badge}
                    </Badge>
                  </Button>
                ))}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}