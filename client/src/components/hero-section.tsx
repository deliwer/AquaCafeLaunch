import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, Smartphone, Trophy, Target } from "lucide-react";
import ImpactSimulator from "./impact-simulator";

export default function HeroSection() {
  const [selectedDevice, setSelectedDevice] = useState("iPhone 13 Pro");
  const [timeLeft, setTimeLeft] = useState({
    days: 12,
    hours: 8,
    minutes: 23,
    seconds: 45
  });

  // iPhone 17 launch countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        } else if (prev.days > 0) {
          return { days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Dubai Skyline Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-hero-blue-900 to-gray-900"></div>
      <div className="absolute inset-0 hero-pattern opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-6xl mx-auto">
          {/* iPhone 17 Launch Countdown */}
          <Card className="mb-8 bg-gradient-to-r from-blue-900/30 to-purple-900/30 border-blue-500/50 backdrop-blur-sm">
            <CardContent className="p-6">
              <div className="flex items-center justify-center gap-4 mb-4">
                <Smartphone className="h-6 w-6 text-blue-400" />
                <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-4 py-1 text-sm animate-pulse">
                  iPhone 17 Launch Campaign
                </Badge>
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-white">
                Trade Your Old iPhone for the New iPhone 17
              </h2>
              
              {/* Countdown Timer */}
              <div className="flex justify-center gap-4 mb-4">
                {[
                  { label: "Days", value: timeLeft.days },
                  { label: "Hours", value: timeLeft.hours },
                  { label: "Minutes", value: timeLeft.minutes },
                  { label: "Seconds", value: timeLeft.seconds }
                ].map(({ label, value }) => (
                  <div key={label} className="text-center bg-black/30 rounded-lg p-3 min-w-[60px]">
                    <div className="text-2xl font-bold text-blue-400">{value.toString().padStart(2, '0')}</div>
                    <div className="text-xs text-gray-400">{label}</div>
                  </div>
                ))}
              </div>
              
              <p className="text-blue-200 text-sm max-w-2xl mx-auto">
                Limited time: Trade any iPhone and get up to AED 4,999 credit toward your iPhone 17 + AquaCafe Premium Water System
              </p>
            </CardContent>
          </Card>

          {/* Mission Title */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-emerald-500/20 to-blue-500/20 border border-emerald-500/30 rounded-full px-6 py-3 mb-6">
              <Trophy className="h-5 w-5 text-emerald-500 mr-2" />
              <span className="text-sm font-medium tracking-wide">DUBAI PLANET HEROES MISSION</span>
            </div>
            
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6">
              Professional <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 to-blue-500">Trade & Upgrade</span> Program
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
              Transform your business impact with Dubai's premium iPhone trade-in program. 
              <span className="text-emerald-400 font-semibold"> Start with AED 99</span> and 
              <span className="text-blue-400 font-semibold"> earn up to AED 4,999</span> in water filtration systems and professional rewards.
            </p>
          </div>
          
          {/* Impact Simulator */}
          <ImpactSimulator selectedDevice={selectedDevice} onDeviceChange={setSelectedDevice} />
          
          {/* Professional CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              onClick={() => {
                const element = document.getElementById('starter-kit-flow');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  console.error('starter-kit-flow element not found');
                }
              }}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg"
            >
              <Target className="h-5 w-5 mr-2" />
              Start AED 99 Program
            </Button>
            <Button 
              variant="outline" 
              onClick={() => {
                const element = document.getElementById('leaderboard');
                if (element) {
                  element.scrollIntoView({ behavior: 'smooth' });
                } else {
                  console.error('leaderboard element not found');
                }
              }}
              className="bg-slate-800/50 hover:bg-slate-700/50 border-2 border-emerald-500/50 hover:border-emerald-500 px-8 py-4 rounded-lg text-lg font-medium transition-all duration-300 backdrop-blur-sm"
            >
              <Trophy className="h-5 w-5 mr-2 text-emerald-500" />
              Join 12,847 Professionals
            </Button>
          </div>
          
          {/* Key Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mt-12 max-w-4xl mx-auto">
            {[
              {
                title: "Professional Rewards",
                description: "Earn serious points and unlock premium water systems for your office",
                icon: <Trophy className="h-6 w-6 text-emerald-500" />
              },
              {
                title: "Business Impact",
                description: "Track your environmental contribution with detailed analytics",
                icon: <Target className="h-6 w-6 text-blue-500" />
              },
              {
                title: "Premium Service",
                description: "Executive-level support with dedicated account management",
                icon: <Smartphone className="h-6 w-6 text-purple-500" />
              }
            ].map((benefit, index) => (
              <Card key={index} className="bg-slate-800/30 border-slate-700/50 backdrop-blur-sm hover:bg-slate-700/30 transition-colors">
                <CardContent className="p-6 text-center">
                  <div className="flex justify-center mb-3">{benefit.icon}</div>
                  <h3 className="text-lg font-semibold text-white mb-2">{benefit.title}</h3>
                  <p className="text-gray-400 text-sm">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
