import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Droplets, 
  UtensilsCrossed, 
  Share2, 
  Award, 
  TrendingUp,
  Target,
  Users
} from "lucide-react";

interface ClimateContribution {
  carbonSaved: number;
  plasticPrevented: number;
  lunchCredits: number;
  sayNoToPlasticStreak: number;
}

interface ClimateStats {
  totalCarbonSaved: number;
  totalPlasticPrevented: number;
  totalLunchCredits: number;
  averageStreak: number;
  topPerformers: Array<{
    name: string;
    contribution: ClimateContribution;
  }>;
}

export default function ClimateContribution() {
  const { data: stats, isLoading } = useQuery<ClimateStats>({
    queryKey: ["/api/climate-stats"],
    enabled: true,
  });

  if (isLoading) {
    return (
      <section className="py-16 bg-gradient-to-r from-green-900/20 to-blue-900/20">
        <div className="container mx-auto px-4">
          <div className="animate-pulse space-y-8">
            <div className="h-8 bg-slate-700 rounded w-1/3 mx-auto"></div>
            <div className="grid md:grid-cols-4 gap-6">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="h-24 bg-slate-700 rounded"></div>
              ))}
            </div>
          </div>
        </div>
      </section>
    );
  }

  const defaultStats: ClimateStats = {
    totalCarbonSaved: 15420,
    totalPlasticPrevented: 128500,
    totalLunchCredits: 3240,
    averageStreak: 47,
    topPerformers: [
      { name: "Ahmed Al-Mansouri", contribution: { carbonSaved: 2800, plasticPrevented: 12000, lunchCredits: 180, sayNoToPlasticStreak: 95 } },
      { name: "Sarah Johnson", contribution: { carbonSaved: 2400, plasticPrevented: 10500, lunchCredits: 150, sayNoToPlasticStreak: 87 } },
      { name: "Raj Patel", contribution: { carbonSaved: 2200, plasticPrevented: 9800, lunchCredits: 145, sayNoToPlasticStreak: 82 } },
    ]
  };

  const climateStats = stats || defaultStats;

  return (
    <section className="py-16 bg-gradient-to-r from-green-900/20 to-blue-900/20" data-testid="climate-contribution-section">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-green-600 text-white px-6 py-2">
            🌍 Climate Impact Dashboard
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-green-400 to-blue-400 bg-clip-text text-transparent">
            Dubai's Environmental Champions
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Track your climate contribution and compete with fellow professionals in making Dubai more sustainable.
          </p>
        </div>

        {/* Global Impact Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <Card className="bg-gradient-to-br from-green-800/30 to-emerald-800/30 border-green-600/50" data-testid="card-carbon-saved">
            <CardContent className="p-6 text-center">
              <Leaf className="h-12 w-12 mx-auto mb-4 text-green-400" />
              <div className="text-3xl font-bold text-green-400 mb-2">
                {climateStats.totalCarbonSaved.toLocaleString()}kg
              </div>
              <div className="text-sm text-gray-400">Total CO₂ Saved</div>
              <div className="text-xs text-green-300 mt-1">
                +12% from last month
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-blue-800/30 to-cyan-800/30 border-blue-600/50" data-testid="card-plastic-prevented">
            <CardContent className="p-6 text-center">
              <Droplets className="h-12 w-12 mx-auto mb-4 text-blue-400" />
              <div className="text-3xl font-bold text-blue-400 mb-2">
                {climateStats.totalPlasticPrevented.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Plastic Bottles Prevented</div>
              <div className="text-xs text-blue-300 mt-1">
                Equivalent to 42 tons of plastic
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-purple-800/30 to-pink-800/30 border-purple-600/50" data-testid="card-lunch-credits">
            <CardContent className="p-6 text-center">
              <UtensilsCrossed className="h-12 w-12 mx-auto mb-4 text-purple-400" />
              <div className="text-3xl font-bold text-purple-400 mb-2">
                {climateStats.totalLunchCredits.toLocaleString()}
              </div>
              <div className="text-sm text-gray-400">Free Lunches Earned</div>
              <div className="text-xs text-purple-300 mt-1">
                #SayNoToPlastic rewards
              </div>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-br from-amber-800/30 to-orange-800/30 border-amber-600/50" data-testid="card-average-streak">
            <CardContent className="p-6 text-center">
              <Target className="h-12 w-12 mx-auto mb-4 text-amber-400" />
              <div className="text-3xl font-bold text-amber-400 mb-2">
                {climateStats.averageStreak} days
              </div>
              <div className="text-sm text-gray-400">Average Eco Streak</div>
              <div className="text-xs text-amber-300 mt-1">
                Community commitment level
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Personal Impact Calculator */}
        <Card className="mb-12 bg-slate-800/50 border-slate-700" data-testid="personal-impact-calculator">
          <CardHeader>
            <CardTitle className="flex items-center text-green-400">
              <TrendingUp className="h-6 w-6 mr-2" />
              Your Personal Climate Contribution
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="space-y-6">
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Carbon Saved Progress</span>
                    <span className="text-sm text-green-400">2,400kg / 5,000kg target</span>
                  </div>
                  <Progress value={48} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">Plastic Prevention</span>
                    <span className="text-sm text-blue-400">12,000 / 20,000 bottles</span>
                  </div>
                  <Progress value={60} className="h-3" />
                </div>
                <div>
                  <div className="flex justify-between mb-2">
                    <span className="text-sm text-gray-400">#SayNoToPlastic Streak</span>
                    <span className="text-sm text-purple-400">87 days</span>
                  </div>
                  <Progress value={87} className="h-3" />
                </div>
              </div>
              <div className="space-y-4">
                <h4 className="font-semibold text-amber-400">Next Milestone Rewards</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                    <span className="text-sm">100-Day Plastic-Free Champion</span>
                    <Badge className="bg-amber-600">50 Lunch Credits</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                    <span className="text-sm">3,000kg Carbon Hero</span>
                    <Badge className="bg-green-600">VIP Status</Badge>
                  </div>
                  <div className="flex items-center justify-between p-3 bg-slate-700/50 rounded">
                    <span className="text-sm">Social Media Climate Ambassador</span>
                    <Badge className="bg-blue-600">Premium Rewards</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Top Performers Leaderboard */}
        <Card className="mb-12 bg-gradient-to-r from-amber-900/20 to-purple-900/20 border-amber-600/50" data-testid="top-performers-leaderboard">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-400">
              <Award className="h-6 w-6 mr-2" />
              Climate Champions Leaderboard
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {climateStats.topPerformers.map((performer, index) => (
                <div 
                  key={index} 
                  className="flex items-center justify-between p-4 bg-slate-700/30 rounded-lg"
                  data-testid={`performer-${index}`}
                >
                  <div className="flex items-center space-x-4">
                    <Badge 
                      className={`${
                        index === 0 ? 'bg-amber-600' : 
                        index === 1 ? 'bg-gray-400' : 'bg-amber-700'
                      } text-white`}
                    >
                      #{index + 1}
                    </Badge>
                    <div>
                      <div className="font-semibold">{performer.name}</div>
                      <div className="text-sm text-gray-400">
                        {performer.contribution.sayNoToPlasticStreak} day streak
                      </div>
                    </div>
                  </div>
                  <div className="text-right space-y-1">
                    <div className="text-green-400 font-semibold">
                      {performer.contribution.carbonSaved}kg CO₂
                    </div>
                    <div className="text-blue-400 text-sm">
                      {performer.contribution.plasticPrevented.toLocaleString()} bottles
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="grid md:grid-cols-3 gap-6">
          <Button 
            className="h-16 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700"
            data-testid="button-share-achievement"
          >
            <Share2 className="h-5 w-5 mr-2" />
            Share Your Achievement
          </Button>
          <Button 
            className="h-16 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700"
            data-testid="button-join-challenge"
          >
            <Users className="h-5 w-5 mr-2" />
            Join Next Challenge
          </Button>
          <Button 
            className="h-16 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
            data-testid="button-invite-colleagues"
          >
            <Award className="h-5 w-5 mr-2" />
            Invite Colleagues
          </Button>
        </div>
      </div>
    </section>
  );
}