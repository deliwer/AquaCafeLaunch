import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const achievementLevels = [
  {
    level: 1,
    title: "ECO-AWAKENING",
    subtitle: "AquaCafe Starter Kit → Water Warrior Badge",
    status: "ACTIVE",
    color: "aqua-500",
    requirement: "Order AquaCafe"
  },
  {
    level: 2,
    title: "Hydration Hero",
    requirement: "30 days active",
    color: "gray-400"
  },
  {
    level: 3,
    title: "Sustainability Sage",
    requirement: "3 referrals",
    color: "gray-400"
  },
  {
    level: 4,
    title: "Carbon Crusher",
    requirement: "6 months",
    color: "gray-400"
  },
  {
    level: 5,
    title: "Planet Protector",
    requirement: "12 months",
    color: "gray-400"
  }
];

const instantRewards = [
  { icon: "⚡", title: "INSTANT PLANET POWER", value: "+2,400 Points", color: "achievement-gold" },
  { icon: "🏅", title: "ACHIEVEMENT", value: '"Water Warrior"', color: "achievement-green" },
  { icon: "🎁", title: "SURPRISE UNLOCK", value: "Premium Filter FREE", color: "achievement-purple" },
  { icon: "🔥", title: "STREAK BONUS", value: "30-Day Challenge", color: "orange-500" }
];

const impactStats = [
  { icon: "🚫", title: "Plastic Bottles PREVENTED", value: "2,400", status: "✅" },
  { icon: "🌱", title: "CO2 BLOCKED", value: "1.2 Tons", status: "✅" },
  { icon: "💰", title: "Family Savings ACTIVATED", value: "AED 3,600", status: "✅" },
  { icon: "🔒", title: "Clean Water SECURED", value: "12 Months", status: "✅" }
];

export default function AchievementSystem() {
  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">💥 INSTANT PLANET POWER UNLOCKS</h2>
            <p className="text-xl text-gray-300">The moment you order AquaCafe Starter Kit, unlock exclusive rewards</p>
          </div>
          
          {/* Achievement Unlock Showcase */}
          <div className="bg-gradient-to-br from-aqua-500/10 to-achievement-green/10 border border-aqua-500/30 rounded-3xl p-8 mb-12 achievement-glow">
            <div className="text-center mb-8">
              <div className="text-6xl mb-4 animate-bounce-gentle">🎉</div>
              <h3 className="text-3xl font-display font-bold mb-4">CONGRATULATIONS! YOU'VE UNLOCKED:</h3>
            </div>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {instantRewards.map((reward, index) => (
                <Card key={index} className={`bg-gray-800 border-${reward.color} card-hover`}>
                  <CardContent className="p-6 text-center">
                    <div className="text-4xl mb-3">{reward.icon}</div>
                    <div className={`font-bold text-${reward.color} mb-2 text-sm`}>{reward.title}</div>
                    <div className="text-white font-bold">{reward.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Impact Calculator */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🎯 YOUR INSTANT IMPACT</h3>
                
                <div className="space-y-4">
                  {impactStats.map((stat, index) => (
                    <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-4">
                      <div className="flex items-center space-x-3">
                        <span className="text-2xl">{stat.icon}</span>
                        <span>{stat.title}</span>
                      </div>
                      <div className="flex items-center space-x-2">
                        <div className="text-xl font-bold text-achievement-green">{stat.value}</div>
                        <div className="text-achievement-green">{stat.status}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            {/* Level Progression */}
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6">🚀 YOUR HERO JOURNEY</h3>
                
                <div className="space-y-6">
                  {/* Current Level */}
                  <div className="bg-gradient-to-r from-aqua-500/20 to-achievement-green/20 border border-aqua-500 rounded-lg p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-bold text-aqua-500">LEVEL 1: ECO-AWAKENING</span>
                      <span className="bg-aqua-500 text-gray-900 px-3 py-1 rounded-full text-sm font-bold">ACTIVE</span>
                    </div>
                    <div className="text-sm text-gray-300">AquaCafe Starter Kit → Water Warrior Badge</div>
                  </div>
                  
                  {/* Next Levels */}
                  <div className="space-y-3">
                    {achievementLevels.slice(1).map((level, index) => (
                      <div key={index} className="flex items-center justify-between bg-gray-700 rounded-lg p-3">
                        <span className="text-gray-300">Level {level.level}: {level.title}</span>
                        <span className="text-xs bg-gray-600 px-2 py-1 rounded">{level.requirement}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
