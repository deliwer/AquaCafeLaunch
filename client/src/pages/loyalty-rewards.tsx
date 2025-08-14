import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Gift, Star, Trophy, Crown, Zap, Award, Heart, Utensils } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function LoyaltyRewards() {
  const [currentLevel, setCurrentLevel] = useState(2);
  const [currentPoints, setCurrentPoints] = useState(7200);

  const loyaltyLevels = [
    {
      level: 1,
      name: "Water Guardian",
      pointsRequired: 0,
      pointsToNext: 2400,
      icon: <Zap className="h-6 w-6" />,
      color: "blue",
      benefits: [
        "5 Restaurant Lunch Credits",
        "Basic Dashboard Access",
        "Monthly Water Quality Report",
        "Email Support"
      ]
    },
    {
      level: 2,
      name: "Eco Professional",
      pointsRequired: 2400,
      pointsToNext: 7200,
      icon: <Award className="h-6 w-6" />,
      color: "emerald",
      benefits: [
        "20 Restaurant Lunch Credits",
        "Professional Analytics Dashboard",
        "Priority Customer Support",
        "Quarterly Maintenance Check",
        "LinkedIn Bonus Multiplier"
      ]
    },
    {
      level: 3,
      name: "Planet Executive",
      pointsRequired: 7200,
      pointsToNext: 15000,
      icon: <Star className="h-6 w-6" />,
      color: "purple",
      benefits: [
        "50 Restaurant Lunch Credits",
        "VIP Restaurant Network Access",
        "Personal Account Manager",
        "White-Glove Service",
        "Executive Team Features"
      ]
    },
    {
      level: 4,
      name: "Climate CEO",
      pointsRequired: 15000,
      pointsToNext: 30000,
      icon: <Crown className="h-6 w-6" />,
      color: "yellow",
      benefits: [
        "100 Restaurant Lunch Credits",
        "CEO Dashboard & Analytics",
        "Exclusive Events Access",
        "Corporate Team Management",
        "Priority Installation"
      ]
    },
    {
      level: 5,
      name: "Dubai Legend",
      pointsRequired: 30000,
      pointsToNext: null,
      icon: <Trophy className="h-6 w-6" />,
      color: "pink",
      benefits: [
        "Unlimited Restaurant Credits",
        "Legend Status Recognition",
        "Exclusive Partnership Opportunities",
        "Annual VIP Events",
        "Platform Revenue Sharing"
      ]
    }
  ];

  const restaurantPartners = [
    { name: "Bakers Kitchen", location: "Dubai Marina", credits: "1 credit = AED 25 meal", category: "Healthy Cuisine" },
    { name: "Green Garden Cafe", location: "JBR", credits: "1 credit = AED 30 meal", category: "Organic Food" },
    { name: "Dubai Fresh", location: "Downtown", credits: "1 credit = AED 35 meal", category: "Farm to Table" },
    { name: "Aqua Bistro", location: "DIFC", credits: "1 credit = AED 40 meal", category: "Premium Dining" },
    { name: "Eco Eats", location: "Business Bay", credits: "1 credit = AED 28 meal", category: "Sustainable Dining" },
    { name: "Pure Kitchen", location: "Palm Jumeirah", credits: "1 credit = AED 45 meal", category: "Health Food" }
  ];

  const pointsEarningActivities = [
    { activity: "iPhone Trade-In", points: "2,400 - 7,200 points", icon: <Gift className="h-5 w-5" /> },
    { activity: "AquaCafe Purchase", points: "2,400 points", icon: <Zap className="h-5 w-5" /> },
    { activity: "Referral Program", points: "1,200 points per referral", icon: <Heart className="h-5 w-5" /> },
    { activity: "Social Media Share", points: "240 points", icon: <Star className="h-5 w-5" /> },
    { activity: "Monthly Challenge", points: "600 points", icon: <Trophy className="h-5 w-5" /> },
    { activity: "Restaurant Review", points: "120 points", icon: <Utensils className="h-5 w-5" /> }
  ];

  const currentLevelData = loyaltyLevels[currentLevel - 1];
  const nextLevelData = loyaltyLevels[currentLevel] || null;
  const progressPercentage = nextLevelData 
    ? ((currentPoints - currentLevelData.pointsRequired) / (nextLevelData.pointsRequired - currentLevelData.pointsRequired)) * 100
    : 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 text-lg">
                <Gift className="h-4 w-4 mr-2" />
                AquaCafe Loyalty Rewards
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Earn <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Real Rewards</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Every environmental action earns you valuable rewards. Trade iPhones, drink clean water, 
                and enjoy free meals at Dubai's best restaurants.
              </p>
            </div>

            {/* Current Status */}
            <Card className="mb-12 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/50">
              <CardContent className="p-8">
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <div className={`w-16 h-16 bg-gradient-to-r from-${currentLevelData.color}-600 to-${currentLevelData.color}-700 rounded-full flex items-center justify-center text-white`}>
                      {currentLevelData.icon}
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-white">{currentLevelData.name}</h2>
                      <p className="text-emerald-400 font-semibold">{currentPoints.toLocaleString()} Total Points</p>
                    </div>
                  </div>
                  <Badge className={`bg-${currentLevelData.color}-600 text-white px-4 py-2 text-lg`}>
                    Level {currentLevel}
                  </Badge>
                </div>

                {nextLevelData && (
                  <div className="space-y-4">
                    <div className="flex justify-between text-sm text-gray-300">
                      <span>Progress to {nextLevelData.name}</span>
                      <span>{currentPoints.toLocaleString()} / {nextLevelData.pointsRequired.toLocaleString()} points</span>
                    </div>
                    <Progress value={progressPercentage} className="h-3" />
                    <p className="text-center text-gray-400">
                      {(nextLevelData.pointsRequired - currentPoints).toLocaleString()} points to next level
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Loyalty Levels */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-white">Loyalty Level Benefits</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loyaltyLevels.map((level) => (
                  <Card 
                    key={level.level} 
                    className={`${level.level === currentLevel ? 'ring-2 ring-emerald-500 bg-emerald-900/20' : 'bg-slate-800/50'} border-slate-700 transition-all hover:scale-105`}
                  >
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className={`w-12 h-12 bg-gradient-to-r from-${level.color}-600 to-${level.color}-700 rounded-full flex items-center justify-center text-white`}>
                          {level.icon}
                        </div>
                        <Badge className={`bg-${level.color}-600 text-white`}>
                          Level {level.level}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white">{level.name}</CardTitle>
                      <p className="text-gray-400">{level.pointsRequired.toLocaleString()}+ points</p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {level.benefits.map((benefit, index) => (
                          <li key={index} className="flex items-center space-x-2">
                            <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                            <span className="text-gray-300 text-sm">{benefit}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* How to Earn Points */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-white">How to Earn Points</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {pointsEarningActivities.map((activity, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6 text-center">
                      <div className="w-12 h-12 bg-gradient-to-r from-emerald-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                        {activity.icon}
                      </div>
                      <h3 className="text-lg font-bold mb-2 text-white">{activity.activity}</h3>
                      <p className="text-emerald-400 font-semibold">{activity.points}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Restaurant Partners */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-white">Restaurant Network</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {restaurantPartners.map((restaurant, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700">
                    <CardContent className="p-6">
                      <div className="flex items-start justify-between mb-4">
                        <div>
                          <h3 className="text-lg font-bold text-white">{restaurant.name}</h3>
                          <p className="text-gray-400">{restaurant.location}</p>
                        </div>
                        <Badge className="bg-emerald-600 text-white">{restaurant.category}</Badge>
                      </div>
                      <p className="text-emerald-400 font-semibold mb-4">{restaurant.credits}</p>
                      <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700">
                        <Utensils className="h-4 w-4 mr-2" />
                        Redeem Credits
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* CTA */}
            <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/50 text-center">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-emerald-400">Start Earning Rewards Today</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Join thousands of Dubai professionals who are earning real rewards while making a positive environmental impact.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 px-8 py-3 text-lg font-semibold">
                    Start Your Journey
                  </Button>
                  <Button variant="outline" className="px-8 py-3 border-emerald-500/50 hover:border-emerald-500 text-emerald-400">
                    Learn More
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}