import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  ShoppingCart, 
  Star, 
  Zap, 
  Trophy, 
  Gift, 
  CreditCard, 
  Phone,
  Droplets,
  Award,
  Users,
  Target,
  TrendingUp
} from "lucide-react";

export default function StarterKitFlow() {
  const [currentStep, setCurrentStep] = useState("entry");
  const [selectedKit, setSelectedKit] = useState("starter");
  const [userProgress, setUserProgress] = useState(0);

  const kits = {
    starter: {
      name: "Professional Starter",
      price: 99,
      originalPrice: 399,
      discount: "75% OFF",
      features: [
        "7-Stage Premium Filtration",
        "2,400 Planet Points",
        "5 Restaurant Lunch Credits",
        "Professional Dashboard Access",
        "24/7 Premium Support"
      ],
      pointsEarned: 2400,
      level: "Entry Professional",
      color: "emerald"
    },
    premium: {
      name: "Executive Premium",
      price: 299,
      originalPrice: 1299,
      discount: "77% OFF",
      features: [
        "Kangen Water Technology",
        "7,200 Planet Points",
        "20 Restaurant Lunch Credits",
        "Executive Dashboard + Analytics",
        "Priority Installation Service",
        "Social Media Bonus Multiplier"
      ],
      pointsEarned: 7200,
      level: "Executive Professional",
      color: "blue"
    },
    elite: {
      name: "CEO Elite Package",
      price: 599,
      originalPrice: 2499,
      discount: "76% OFF",
      features: [
        "Kangen K8 Professional System",
        "15,000 Planet Points",
        "50 Restaurant Lunch Credits",
        "CEO Dashboard + Team Analytics",
        "White-glove Installation",
        "Personal Account Manager",
        "VIP Restaurant Network Access"
      ],
      pointsEarned: 15000,
      level: "CEO Champion",
      color: "purple"
    }
  };

  const pointsProgression = [
    { points: 2400, level: "Water Guardian", rewards: "5 lunch credits, basic dashboard" },
    { points: 7200, level: "Eco Professional", rewards: "20 lunch credits, analytics dashboard" },
    { points: 15000, level: "Planet Executive", rewards: "50 lunch credits, VIP access" },
    { points: 30000, level: "Climate CEO", rewards: "100 lunch credits, personal manager" },
    { points: 50000, level: "Dubai Legend", rewards: "Unlimited access, exclusive events" }
  ];

  if (currentStep === "entry") {
    return (
      <section id="starter-kit-flow" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 text-lg">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Professional Entry Program
              </Badge>
              <h2 className="text-4xl md:text-5xl font-bold mb-4 text-white">
                Start Your Journey with <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">AED 99</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Join Dubai's elite environmental professionals. Every journey begins with a single step.
              </p>
            </div>

            {/* Kit Selection */}
            <Tabs value={selectedKit} onValueChange={setSelectedKit} className="mb-12">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800 h-12">
                <TabsTrigger value="starter" className="text-sm font-medium">Starter</TabsTrigger>
                <TabsTrigger value="premium" className="text-sm font-medium">Premium</TabsTrigger>
                <TabsTrigger value="elite" className="text-sm font-medium">Elite</TabsTrigger>
              </TabsList>

              {Object.entries(kits).map(([key, kit]) => (
                <TabsContent key={key} value={key} className="mt-8">
                  <Card className={`bg-gradient-to-br from-${kit.color}-900/20 to-slate-900/50 border-${kit.color}-500/50 backdrop-blur-sm`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className={`text-2xl font-bold text-${kit.color}-400 mb-2`}>
                            {kit.name}
                          </CardTitle>
                          <Badge className={`bg-${kit.color}-600 text-white`}>{kit.level}</Badge>
                        </div>
                        <div className="text-right">
                          <div className="text-3xl font-bold text-white">AED {kit.price}</div>
                          <div className="text-sm text-gray-400 line-through">AED {kit.originalPrice}</div>
                          <Badge variant="destructive" className="animate-pulse">{kit.discount}</Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid md:grid-cols-2 gap-8">
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-white">What You Get:</h4>
                          <ul className="space-y-3">
                            {kit.features.map((feature, index) => (
                              <li key={index} className="flex items-center text-gray-300">
                                <Zap className={`h-4 w-4 mr-3 text-${kit.color}-500`} />
                                {feature}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="text-lg font-semibold mb-4 text-white">Immediate Rewards:</h4>
                          <div className="space-y-4">
                            <div className={`bg-${kit.color}-600/20 rounded-lg p-4 border border-${kit.color}-500/30`}>
                              <div className="flex items-center justify-between">
                                <div className="flex items-center">
                                  <Trophy className={`h-5 w-5 mr-2 text-${kit.color}-400`} />
                                  <span className="text-white font-medium">Planet Points</span>
                                </div>
                                <span className={`text-xl font-bold text-${kit.color}-400`}>
                                  +{kit.pointsEarned.toLocaleString()}
                                </span>
                              </div>
                            </div>
                            
                            <Button 
                              className={`w-full bg-gradient-to-r from-${kit.color}-600 to-${kit.color}-700 hover:from-${kit.color}-700 hover:to-${kit.color}-800 text-white font-semibold py-3`}
                              onClick={() => {
                                setCurrentStep("checkout");
                                document.getElementById('professional-tutorial')?.scrollIntoView({ behavior: 'smooth' });
                              }}
                            >
                              <CreditCard className="h-4 w-4 mr-2" />
                              Start with {kit.name}
                            </Button>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Points Progression Guide */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="h-6 w-6 mr-2 text-emerald-500" />
                  Your Professional Journey
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {pointsProgression.map((stage, index) => (
                    <div key={index} className="flex items-center gap-4 p-4 rounded-lg bg-slate-700/30 hover:bg-slate-700/50 transition-colors">
                      <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-emerald-600 to-blue-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-sm">{index + 1}</span>
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="text-lg font-semibold text-white">{stage.level}</h4>
                          <Badge className="bg-emerald-600 text-white text-xs">
                            {stage.points.toLocaleString()} pts
                          </Badge>
                        </div>
                        <p className="text-gray-400 text-sm">{stage.rewards}</p>
                      </div>
                      <Target className="h-5 w-5 text-emerald-500" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="text-2xl text-center text-white">
                Complete Your Professional Registration
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <Label htmlFor="name" className="text-white">Full Name</Label>
                  <Input id="name" placeholder="Enter your full name" className="bg-slate-700 border-slate-600 text-white" />
                </div>
                <div>
                  <Label htmlFor="phone" className="text-white">Phone Number</Label>
                  <Input id="phone" placeholder="+971 XX XXX XXXX" className="bg-slate-700 border-slate-600 text-white" />
                </div>
              </div>
              
              <div>
                <Label htmlFor="address" className="text-white">Professional Address</Label>
                <Input id="address" placeholder="Your business or home address in Dubai" className="bg-slate-700 border-slate-600 text-white" />
              </div>

              <div>
                <Label htmlFor="profession" className="text-white">Professional Category</Label>
                <Select>
                  <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                    <SelectValue placeholder="Select your professional category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="executive">Executive/Manager</SelectItem>
                    <SelectItem value="entrepreneur">Entrepreneur</SelectItem>
                    <SelectItem value="consultant">Consultant</SelectItem>
                    <SelectItem value="healthcare">Healthcare Professional</SelectItem>
                    <SelectItem value="finance">Finance Professional</SelectItem>
                    <SelectItem value="education">Education Professional</SelectItem>
                    <SelectItem value="other">Other Professional</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <Button 
                onClick={() => document.getElementById('partnership-program')?.scrollIntoView({ behavior: 'smooth' })}
                className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3"
              >
                <Award className="h-4 w-4 mr-2" />
                Complete Registration & Start Earning Points
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}