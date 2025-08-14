import { motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import RealTimeCountdown from "./real-time-countdown";
import { Target, Users, Calendar, Trophy, MapPin, Flag } from "lucide-react";

export default function DubaiMissionDashboard() {
  const { data: challenge } = useQuery({
    queryKey: ["/api/community-challenge"],
    refetchInterval: 30000, // Refresh every 30 seconds for real-time updates
  });

  const { data: stats } = useQuery({
    queryKey: ["/api/analytics/stats"],
    refetchInterval: 30000,
  });

  const progressPercentage = challenge ? Math.round(((challenge as any).currentAmount / (challenge as any).targetAmount) * 100) : 80;
  const bottlesLeft = challenge ? (challenge as any).targetAmount - (challenge as any).currentAmount : 200000;
  const daysLeft = challenge ? Math.ceil((new Date((challenge as any).endDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 23;

  return (
    <div className="space-y-6">
      {/* Mission Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center py-8 bg-gradient-to-r from-emerald-900/50 to-blue-900/50 rounded-2xl border border-emerald-400/50 backdrop-blur-sm"
      >
        <div className="flex items-center justify-center space-x-2 mb-4">
          <Flag className="h-8 w-8 text-emerald-400 drop-shadow-lg" />
          <h1 className="text-4xl font-bold text-white drop-shadow-2xl">WELCOME TO MISSION: SAVE DUBAI 2030</h1>
        </div>
        <p className="text-xl text-emerald-300 max-w-4xl mx-auto drop-shadow-lg font-medium">
          Join the exclusive Founding Heroes program. Get instant trade-in value, premium AquaCafe water system, 
          and become part of Dubai's biggest environmental mission.
        </p>
      </motion.div>

      {/* Hero CTA Section */}
      <Card className="bg-gradient-to-br from-orange-900/40 to-red-900/40 border-orange-500/50 backdrop-blur-sm">
        <CardContent className="p-8 text-center">
          <h2 className="text-3xl font-bold text-white mb-2 drop-shadow-xl">
            Trade Your Old iPhone for{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-red-400 drop-shadow-lg">
              AED 1,000+
            </span>{" "}
            in Premium Water
          </h2>
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400 mb-4 drop-shadow-lg">
            Become a Dubai Planet Hero
          </h3>
          
          <div className="flex items-center justify-center space-x-6 mb-6">
            <Badge variant="outline" className="bg-red-900/30 text-red-300 border-red-400/50">
              Only 47 Founding Hero spots left today
            </Badge>
          </div>

          <RealTimeCountdown 
            targetDate={new Date(Date.now() + 23 * 60 * 60 * 1000 + 47 * 60 * 1000 + 31 * 1000)}
            title="⏰ until double points end"
            variant="hero"
          />

          <p className="text-slate-200 mt-4 text-lg font-medium drop-shadow-lg">
            Limited spots available.
          </p>
        </CardContent>
      </Card>

      {/* Live Community Challenge */}
      <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-white flex items-center space-x-2">
            <Target className="h-6 w-6 text-purple-400" />
            <span>LIVE COMMUNITY CHALLENGE</span>
            <Badge variant="outline" className="bg-red-900/30 text-red-300 border-red-400/50">
              <Users className="h-3 w-3 mr-1" />
              Active
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">
              {(challenge as any)?.title || "1 MILLION BOTTLES PREVENTED BY RAMADAN"}
            </h3>
            <p className="text-purple-300">Join Dubai's biggest environmental mission</p>
          </div>

          {/* Progress Display */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-white font-semibold">Progress</span>
              <span className="text-purple-400 font-bold">{progressPercentage}% Complete</span>
            </div>
            
            <Progress 
              value={progressPercentage} 
              className="h-4 bg-slate-800/50"
            />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Calendar className="h-5 w-5 text-orange-400" />
                  <span className="text-2xl font-bold text-orange-400">{daysLeft}</span>
                </div>
                <p className="text-orange-300 text-sm">days left</p>
              </div>
              
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Target className="h-5 w-5 text-red-400" />
                  <span className="text-2xl font-bold text-red-400">{bottlesLeft.toLocaleString()}</span>
                </div>
                <p className="text-red-300 text-sm">bottles to go</p>
              </div>
              
              <div className="bg-slate-800/30 rounded-lg p-4 border border-slate-600/50">
                <div className="flex items-center justify-center space-x-2 mb-2">
                  <Users className="h-5 w-5 text-emerald-400" />
                  <span className="text-2xl font-bold text-emerald-400">{(stats as any)?.totalHeroes || '12,847'}</span>
                </div>
                <p className="text-emerald-300 text-sm">heroes joined</p>
              </div>
            </div>
          </div>

          {/* Mission CTAs */}
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-bold py-3 text-lg"
              data-testid="button-check-trade-value"
            >
              <Trophy className="h-5 w-5 mr-2" />
              CHECK YOUR TRADE-IN VALUE NOW
            </Button>
            <Button
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-bold py-3 text-lg"
              data-testid="button-join-heroes"
            >
              <Users className="h-5 w-5 mr-2" />
              JOIN {(stats as any)?.totalHeroes || '12,847'} HEROES
            </Button>
          </div>

          {/* Mission Location */}
          <div className="text-center">
            <div className="flex items-center justify-center space-x-2 text-slate-400">
              <MapPin className="h-4 w-4" />
              <span className="text-sm">Dubai Environmental Initiative 2030</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}