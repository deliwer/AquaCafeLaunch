import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Play, 
  ChevronRight, 
  ChevronLeft, 
  CheckCircle, 
  Award, 
  Target, 
  TrendingUp, 
  Users, 
  Gift,
  Smartphone,
  Droplets,
  DollarSign,
  Star
} from "lucide-react";

export default function ProfessionalTutorial() {
  const [currentStep, setCurrentStep] = useState(0);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const tutorialSteps = [
    {
      title: "Welcome to Dubai Planet Heroes",
      content: "Join Dubai's most exclusive environmental professionals program. Transform your iPhone trades into premium water systems and serious business rewards.",
      icon: <Award className="h-8 w-8 text-emerald-500" />,
      action: "Get Started",
      points: 500
    },
    {
      title: "Professional Entry: AED 99 Starter Kit",
      content: "Every professional journey starts here. Your AED 99 investment unlocks the entire platform and immediately earns you 2,400 Planet Points plus premium water filtration.",
      icon: <Target className="h-8 w-8 text-blue-500" />,
      action: "Order Starter Kit",
      points: 2400
    },
    {
      title: "iPhone Trade-In Mastery",
      content: "Learn how to maximize your trade values: iPhone 17 = AED 2,400, iPhone 16 = AED 2,000. Each trade unlocks water system upgrades and multiplies your point earnings.",
      icon: <Smartphone className="h-8 w-8 text-purple-500" />,
      action: "Calculate Trade Value",
      points: 1000
    },
    {
      title: "Points to Premium Systems",
      content: "Convert points strategically: 10,000 pts = Kangen K8 upgrade, 25,000 pts = Professional installation service. Plan your point accumulation for maximum value.",
      icon: <Droplets className="h-8 w-8 text-cyan-500" />,
      action: "View Conversion Rates",
      points: 1500
    },
    {
      title: "Restaurant Partnership Network",
      content: "Unlock lunch credits at Dubai's premium restaurants. Each 100 points = 1 credit. Share on LinkedIn for bonus multipliers and exclusive dining access.",
      icon: <Gift className="h-8 w-8 text-amber-500" />,
      action: "Explore Restaurants",
      points: 2000
    },
    {
      title: "Professional Leaderboards",
      content: "Compete with Dubai's environmental leaders. Monthly competitions, quarterly awards, and annual recognition ceremonies for top performers.",
      icon: <TrendingUp className="h-8 w-8 text-green-500" />,
      action: "Join Competition",
      points: 3000
    },
    {
      title: "Revenue Generation Strategies",
      content: "Advanced earning methods: Refer executives (+5,000 pts), Host corporate events (+10,000 pts), Lead sustainability initiatives (custom rewards).",
      icon: <DollarSign className="h-8 w-8 text-gold-500" />,
      action: "View Opportunities",
      points: 5000
    },
    {
      title: "Multiplayer & Team Building",
      content: "Create corporate teams, compete in group challenges, and multiply earnings through collaborative environmental impact. Perfect for companies and professional networks.",
      icon: <Users className="h-8 w-8 text-indigo-500" />,
      action: "Create Team",
      points: 7500
    }
  ];

  const handleNext = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setCompletedSteps([...completedSteps, currentStep]);
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleComplete = () => {
    setCompletedSteps([...completedSteps, currentStep]);
  };

  const currentTutorial = tutorialSteps[currentStep];
  const progressPercentage = ((currentStep + 1) / tutorialSteps.length) * 100;
  const totalPointsEarned = tutorialSteps
    .filter((_, index) => completedSteps.includes(index))
    .reduce((total, step) => total + step.points, 0);

  return (
    <section id="professional-tutorial" className="py-16 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 text-lg">
              <Play className="h-4 w-4 mr-2" />
              Professional Onboarding
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Master Your Professional Journey
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Complete this 8-step professional tutorial to unlock advanced features and maximize your environmental impact.
            </p>
          </div>

          {/* Progress Overview */}
          <Card className="mb-8 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">Tutorial Progress</h3>
                  <p className="text-gray-400">Step {currentStep + 1} of {tutorialSteps.length}</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-emerald-400">
                    {totalPointsEarned.toLocaleString()} Points
                  </div>
                  <p className="text-gray-400 text-sm">Tutorial Rewards Earned</p>
                </div>
              </div>
              <Progress value={progressPercentage} className="h-2" />
            </CardContent>
          </Card>

          {/* Current Tutorial Step */}
          <Card className="mb-8 bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  {currentTutorial.icon}
                  <div>
                    <CardTitle className="text-2xl text-white">
                      {currentTutorial.title}
                    </CardTitle>
                    <Badge className="mt-2 bg-emerald-600 text-white">
                      +{currentTutorial.points} Points
                    </Badge>
                  </div>
                </div>
                {completedSteps.includes(currentStep) && (
                  <CheckCircle className="h-8 w-8 text-green-500" />
                )}
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              <p className="text-lg text-gray-300 leading-relaxed">
                {currentTutorial.content}
              </p>

              {/* Action Buttons */}
              <div className="flex justify-between items-center">
                <Button
                  variant="outline"
                  onClick={handlePrev}
                  disabled={currentStep === 0}
                  className="bg-slate-700 border-slate-600 text-white hover:bg-slate-600"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>

                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      handleComplete();
                      if (currentStep === 1) {
                        document.getElementById('starter-kit-flow')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (currentStep === 2) {
                        document.getElementById('trade-calculator')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (currentStep === 4) {
                        document.getElementById('partnership-program')?.scrollIntoView({ behavior: 'smooth' });
                      } else if (currentStep === 5) {
                        document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    disabled={completedSteps.includes(currentStep)}
                    className="bg-emerald-600 hover:bg-emerald-700 text-white"
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    {currentTutorial.action}
                  </Button>

                  <Button
                    onClick={handleNext}
                    disabled={currentStep === tutorialSteps.length - 1}
                    className="bg-blue-600 hover:bg-blue-700 text-white"
                  >
                    Next Step
                    <ChevronRight className="h-4 w-4 ml-2" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Revenue Generation Enhancement Suggestions */}
          <Card className="bg-gradient-to-br from-amber-900/20 to-orange-900/20 border-amber-700/50">
            <CardHeader>
              <CardTitle className="flex items-center text-amber-400">
                <Star className="h-6 w-6 mr-2" />
                Advanced Revenue Enhancement Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Corporate Programs</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Executive team challenges (+25,000 pts per team)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Office sustainability consulting (custom rates)
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      Corporate water system installations
                    </li>
                  </ul>
                </div>
                
                <div className="space-y-4">
                  <h4 className="text-lg font-semibold text-white">Multiplayer Features</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Professional network competitions
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Industry leaderboard rankings
                    </li>
                    <li className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-blue-500" />
                      Collaborative impact goals
                    </li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-6 p-4 bg-amber-600/20 rounded-lg border border-amber-500/30">
                <p className="text-amber-200 text-center font-medium">
                  Complete the tutorial to unlock these advanced features and start building your professional environmental legacy.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}