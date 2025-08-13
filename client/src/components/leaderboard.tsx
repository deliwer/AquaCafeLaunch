import { useQuery } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Button } from "@/components/ui/button";

export default function Leaderboard() {
  const { data: leaderboard, isLoading } = useQuery({
    queryKey: ["/api/leaderboard"],
  });

  const { data: challenge, isLoading: challengeLoading } = useQuery({
    queryKey: ["/api/community-challenge"],
  });

  const { data: analytics } = useQuery({
    queryKey: ["/api/analytics/stats"],
  });

  if (isLoading || challengeLoading) {
    return (
      <section className="py-20 bg-gray-800">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            <Skeleton className="h-12 w-96 mx-auto mb-12" />
            <div className="grid lg:grid-cols-2 gap-8">
              <Skeleton className="h-96" />
              <Skeleton className="h-96" />
            </div>
          </div>
        </div>
      </section>
    );
  }

  const challengeProgress = challenge ? Math.round((challenge.currentAmount / challenge.targetAmount) * 100) : 80;

  return (
    <section id="leaderboard" className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">🏆 DUBAI ENVIRONMENTAL CHAMPIONS</h2>
            <p className="text-xl text-gray-300">Real-time leaderboard of planet heroes making impact</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Leaderboard */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">🏆 TOP PLANET HEROES THIS MONTH</h3>
                
                <div className="space-y-4">
                  {leaderboard?.map((entry: any, index: number) => {
                    const medals = ["🥇", "🥈", "🥉"];
                    const medal = medals[index] || "⭐";
                    
                    return (
                      <div key={entry.id} className="flex items-center justify-between bg-gray-800 rounded-lg p-4">
                        <div className="flex items-center space-x-4">
                          <span className="text-2xl">{medal}</span>
                          <div>
                            <div className="font-semibold">{entry.familyName}</div>
                            <div className="text-sm text-gray-400">
                              Level {entry.level} • {entry.level === 5 ? 'Planet Protector' : 
                                                   entry.level === 4 ? 'Carbon Crusher' :
                                                   entry.level === 3 ? 'Sustainability Sage' : 
                                                   entry.level === 2 ? 'Hydration Hero' : 'Eco-Awakening'}
                            </div>
                          </div>
                        </div>
                        <div className="text-right">
                          <div className={`font-bold ${index === 0 ? 'text-achievement-gold' : 
                                                      index === 1 ? 'text-gray-300' : 
                                                      index === 2 ? 'text-orange-400' : 'text-gray-400'}`}>
                            {entry.points.toLocaleString()} Points
                          </div>
                          <div className="text-xs text-gray-400">{entry.referrals} referrals</div>
                        </div>
                      </div>
                    );
                  })}
                  
                  <div className="bg-gradient-to-r from-aqua-500/20 to-achievement-green/20 border border-aqua-500/30 rounded-lg p-4 text-center">
                    <div className="font-bold text-aqua-500">⭐ YOU COULD BE HERE!</div>
                    <Button className="mt-2 bg-aqua-500 hover:bg-aqua-600 px-6 py-2 rounded-full text-sm font-medium transition-colors">
                      START NOW
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Live Community Challenge */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">🔥 LIVE COMMUNITY CHALLENGE</h3>
                
                <div className="text-center mb-8">
                  <div className="text-3xl font-display font-bold text-aqua-500 mb-2">
                    {challenge?.title || "1 MILLION BOTTLES PREVENTED BY RAMADAN"}
                  </div>
                  <div className="text-gray-400">Join Dubai's biggest environmental mission</div>
                </div>
                
                {/* Progress Bar */}
                <div className="mb-6">
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span className="text-aqua-500 font-bold">{challengeProgress}% Complete</span>
                  </div>
                  <div className="bg-gray-700 rounded-full h-4">
                    <div 
                      className="progress-bar rounded-full h-4 transition-all duration-300" 
                      style={{ width: `${challengeProgress}%` }}
                    ></div>
                  </div>
                </div>
                
                {/* Challenge Stats */}
                <div className="grid grid-cols-2 gap-4 mb-8">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-orange-500">⏰ {analytics?.daysLeft || 23}</div>
                    <div className="text-sm text-gray-400">days left</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-red-500">🎯 {((challenge?.targetAmount - challenge?.currentAmount) / 1000).toFixed(0)}K</div>
                    <div className="text-sm text-gray-400">bottles to go</div>
                  </div>
                </div>
                
                {/* Live Activity Feed */}
                <Card className="bg-gray-800">
                  <CardContent className="p-4">
                    <div className="text-sm font-medium mb-3 text-red-500">🔴 LIVE: Planet Heroes in Action</div>
                    <div className="space-y-2 text-sm">
                      <div className="text-gray-300">🎉 Sarah M. just became Level 2!</div>
                      <div className="text-gray-300">🏅 Ahmed K. earned "Water Warrior"</div>
                      <div className="text-gray-300">⚡ Fatima A. prevented 500 bottles</div>
                      <div className="font-medium text-aqua-500">🚀 YOU could be next! Join the mission</div>
                    </div>
                  </CardContent>
                </Card>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
