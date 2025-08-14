import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

interface CountdownTimerProps {
  targetDate: Date;
  onComplete?: () => void;
  title?: string;
  variant?: "hero" | "compact" | "inline";
}

export default function RealTimeCountdown({ 
  targetDate, 
  onComplete, 
  title = "Double Points End In", 
  variant = "hero" 
}: CountdownTimerProps) {
  const [timeLeft, setTimeLeft] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0
  });

  useEffect(() => {
    const timer = setInterval(() => {
      const now = new Date().getTime();
      const target = targetDate.getTime();
      const difference = target - now;

      if (difference > 0) {
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ hours, minutes, seconds });
      } else {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        onComplete?.();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  if (variant === "compact") {
    return (
      <div className="flex items-center space-x-2 text-sm text-orange-400">
        <Clock className="h-4 w-4" />
        <span>{formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}</span>
      </div>
    );
  }

  if (variant === "inline") {
    return (
      <span className="text-orange-400 font-mono">
        {formatNumber(timeLeft.hours)}:{formatNumber(timeLeft.minutes)}:{formatNumber(timeLeft.seconds)}
      </span>
    );
  }

  return (
    <div className="bg-gradient-to-r from-red-900/20 to-orange-900/20 border border-red-500/30 rounded-xl p-6 backdrop-blur-sm">
      <div className="flex items-center justify-center space-x-2 mb-4">
        <Clock className="h-5 w-5 text-orange-400" />
        <span className="text-orange-200 font-medium">{title}</span>
      </div>
      
      <div className="flex justify-center space-x-4">
        <AnimatePresence mode="wait">
          <div className="flex space-x-4">
            <motion.div
              key={timeLeft.hours}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-b from-orange-500 to-red-600 rounded-lg p-3 min-w-[60px]">
                <span className="text-2xl font-bold text-white font-mono">{formatNumber(timeLeft.hours)}</span>
              </div>
              <span className="text-xs text-orange-300 mt-1 block">Hours</span>
            </motion.div>
            
            <div className="self-center text-orange-400 text-2xl font-bold">:</div>
            
            <motion.div
              key={timeLeft.minutes}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-b from-orange-500 to-red-600 rounded-lg p-3 min-w-[60px]">
                <span className="text-2xl font-bold text-white font-mono">{formatNumber(timeLeft.minutes)}</span>
              </div>
              <span className="text-xs text-orange-300 mt-1 block">Minutes</span>
            </motion.div>
            
            <div className="self-center text-orange-400 text-2xl font-bold">:</div>
            
            <motion.div
              key={timeLeft.seconds}
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="text-center"
            >
              <div className="bg-gradient-to-b from-orange-500 to-red-600 rounded-lg p-3 min-w-[60px]">
                <span className="text-2xl font-bold text-white font-mono">{formatNumber(timeLeft.seconds)}</span>
              </div>
              <span className="text-xs text-orange-300 mt-1 block">Seconds</span>
            </motion.div>
          </div>
        </AnimatePresence>
      </div>
    </div>
  );
}