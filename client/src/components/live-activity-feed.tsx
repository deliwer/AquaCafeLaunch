import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Activity, Trophy, Award, Zap, Users, TrendingUp } from "lucide-react";

interface ActivityItem {
  id: string;
  user: {
    name: string;
    initials: string;
    level?: string;
  };
  action: string;
  achievement?: string;
  value?: string;
  timeAgo: string;
  type: "hero" | "badge" | "milestone" | "trade";
}

const mockActivities: ActivityItem[] = [
  {
    id: "1",
    user: { name: "Sarah M.", initials: "SM", level: "Level 2" },
    action: "🎉 Sarah M. just became Level 2 Hero!",
    timeAgo: "2 min ago",
    type: "hero"
  },
  {
    id: "2", 
    user: { name: "Ahmed K.", initials: "AK" },
    action: "🏅 Ahmed K. earned \"Water Warrior\" badge",
    achievement: "Water Warrior",
    timeAgo: "5 min ago",
    type: "badge"
  },
  {
    id: "3",
    user: { name: "Fatima A.", initials: "FA" },
    action: "⚡ Fatima A. prevented 500 bottles today",
    value: "500 bottles",
    timeAgo: "8 min ago",
    type: "milestone"
  },
  {
    id: "4",
    user: { name: "Omar H.", initials: "OH" },
    action: "💰 Omar H. completed iPhone 15 Pro trade",
    value: "AED 1,800",
    timeAgo: "12 min ago",
    type: "trade"
  },
  {
    id: "5",
    user: { name: "Layla S.", initials: "LS" },
    action: "🌟 Layla S. joined First 100 Heroes program",
    timeAgo: "15 min ago",
    type: "hero"
  }
];

export default function LiveActivityFeed() {
  const [activities, setActivities] = useState<ActivityItem[]>(mockActivities);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % activities.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [activities.length]);

  const getIcon = (type: ActivityItem['type']) => {
    switch (type) {
      case "hero":
        return <Trophy className="h-4 w-4 text-yellow-400" />;
      case "badge":
        return <Award className="h-4 w-4 text-purple-400" />;
      case "milestone":
        return <Zap className="h-4 w-4 text-blue-400" />;
      case "trade":
        return <TrendingUp className="h-4 w-4 text-green-400" />;
      default:
        return <Activity className="h-4 w-4 text-gray-400" />;
    }
  };

  const getBadgeColor = (type: ActivityItem['type']) => {
    switch (type) {
      case "hero":
        return "bg-yellow-900/30 text-yellow-300 border-yellow-400/50";
      case "badge":
        return "bg-purple-900/30 text-purple-300 border-purple-400/50";
      case "milestone":
        return "bg-blue-900/30 text-blue-300 border-blue-400/50";
      case "trade":
        return "bg-green-900/30 text-green-300 border-green-400/50";
      default:
        return "bg-gray-900/30 text-gray-300 border-gray-400/50";
    }
  };

  return (
    <Card className="bg-gradient-to-br from-slate-900/50 to-slate-800/50 border-slate-600/50 backdrop-blur-sm">
      <CardHeader className="pb-4">
        <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
          <Activity className="h-5 w-5 text-emerald-400" />
          <span>LIVE: Planet Heroes in Action</span>
          <Badge variant="outline" className="bg-emerald-900/30 text-emerald-300 border-emerald-400/50">
            <Users className="h-3 w-3 mr-1" />
            Live
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Live Activity Display */}
        <div className="min-h-[200px] space-y-3">
          <AnimatePresence mode="wait">
            {activities.slice(0, 4).map((activity, index) => (
              <motion.div
                key={activity.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 20 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="flex items-start space-x-3 p-3 rounded-lg bg-slate-800/30 border border-slate-600/30 hover:bg-slate-700/30 transition-colors"
              >
                <Avatar className="h-8 w-8 flex-shrink-0">
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-blue-500 text-white text-xs font-bold">
                    {activity.user.initials}
                  </AvatarFallback>
                </Avatar>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    {getIcon(activity.type)}
                    <p className="text-sm text-white truncate">
                      {activity.action}
                    </p>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-400">{activity.timeAgo}</span>
                    <Badge variant="outline" className={`text-xs ${getBadgeColor(activity.type)}`}>
                      {activity.achievement || activity.value || activity.type}
                    </Badge>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Call to Action */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="text-center p-4 bg-gradient-to-r from-emerald-900/20 to-blue-900/20 rounded-lg border border-emerald-400/30"
        >
          <p className="text-emerald-300 font-semibold mb-2">🚀 YOU could be next! Start your hero journey</p>
          <div className="flex flex-col sm:flex-row gap-2 justify-center">
            <Badge variant="outline" className="bg-emerald-900/30 text-emerald-300 border-emerald-400/50">
              🔒 Secure
            </Badge>
            <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-400/50">
              ⚡ Instant
            </Badge>
            <Badge variant="outline" className="bg-purple-900/30 text-purple-300 border-purple-400/50">
              🌍 Environmental Impact Guaranteed
            </Badge>
          </div>
        </motion.div>
      </CardContent>
    </Card>
  );
}