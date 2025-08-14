import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Dice6, Sparkles, Award, Droplets, Leaf, Coins, TrendingUp } from "lucide-react";

interface SlotResult {
  bottles: number;
  aed: number;
  co2: number;
  level: string;
}

const slotSymbols = [
  { icon: "🍼", value: "bottles", multipliers: [1000, 1500, 2000, 2400, 3000] },
  { icon: "💰", value: "aed", multipliers: [800, 1000, 1200, 1400, 1600] },
  { icon: "🌱", value: "co2", multipliers: [0.8, 1.0, 1.2, 1.4, 1.6] },
  { icon: "🏆", value: "level", levels: ["Level 2", "Level 3", "Level 4", "Level 5", "Hero"] }
];

export default function ImpactSlotMachine() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<SlotResult>({
    bottles: 2400,
    aed: 1200,
    co2: 1.2,
    level: "Level 4"
  });
  const [showResult, setShowResult] = useState(true);

  const spin = () => {
    setSpinning(true);
    setShowResult(false);

    // Simulate slot machine spinning
    setTimeout(() => {
      const bottleIndex = Math.floor(Math.random() * slotSymbols[0].multipliers.length);
      const aedIndex = Math.floor(Math.random() * slotSymbols[1].multipliers.length);
      const co2Index = Math.floor(Math.random() * slotSymbols[2].multipliers.length);
      const levelIndex = Math.floor(Math.random() * slotSymbols[3].levels.length);

      setResult({
        bottles: slotSymbols[0].multipliers[bottleIndex] || 2400,
        aed: slotSymbols[1].multipliers[aedIndex] || 1200,
        co2: slotSymbols[2].multipliers[co2Index] || 1.2,
        level: slotSymbols[3].levels[levelIndex] || "Level 4"
      });
      
      setSpinning(false);
      setShowResult(true);
    }, 2000);
  };

  return (
    <Card className="bg-gradient-to-br from-purple-900/20 to-indigo-900/20 border-purple-500/30 backdrop-blur-sm">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-white flex items-center justify-center space-x-2">
          <Dice6 className="h-6 w-6 text-purple-400" />
          <span>IMPACT SLOT MACHINE</span>
          <Sparkles className="h-6 w-6 text-yellow-400" />
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Slot Machine Display */}
        <div className="grid grid-cols-4 gap-4 mb-6">
          {slotSymbols.map((symbol, index) => (
            <div key={index} className="relative">
              <div className="bg-slate-800/50 border-2 border-purple-400/30 rounded-lg h-24 flex items-center justify-center overflow-hidden">
                <AnimatePresence mode="wait">
                  {spinning ? (
                    <motion.div
                      key="spinning"
                      initial={{ y: -100 }}
                      animate={{ y: [0, -20, 0, -20, 0] }}
                      exit={{ y: 100 }}
                      transition={{ 
                        duration: 0.5, 
                        repeat: Infinity,
                        repeatType: "loop"
                      }}
                      className="text-4xl"
                    >
                      {symbol.icon}
                    </motion.div>
                  ) : (
                    <motion.div
                      key="result"
                      initial={{ y: -100 }}
                      animate={{ y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="text-4xl"
                    >
                      {symbol.icon}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          ))}
        </div>

        {/* Current Results */}
        {showResult && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="bg-gradient-to-r from-emerald-900/30 to-blue-900/30 rounded-lg p-6 border border-emerald-400/30"
          >
            <p className="text-emerald-300 text-sm mb-4 text-center">Your current spin shows:</p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              <div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Droplets className="h-5 w-5 text-blue-400" />
                  <span className="text-2xl font-bold text-blue-400">{result.bottles.toLocaleString()}</span>
                </div>
                <p className="text-blue-300 text-sm">bottles prevented</p>
              </div>
              <div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Coins className="h-5 w-5 text-yellow-400" />
                  <span className="text-2xl font-bold text-yellow-400">AED {result.aed.toLocaleString()}</span>
                </div>
                <p className="text-yellow-300 text-sm">trade value</p>
              </div>
              <div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Leaf className="h-5 w-5 text-green-400" />
                  <span className="text-2xl font-bold text-green-400">{result.co2}T</span>
                </div>
                <p className="text-green-300 text-sm">CO₂ saved</p>
              </div>
              <div>
                <div className="flex items-center justify-center space-x-1 mb-2">
                  <Award className="h-5 w-5 text-purple-400" />
                  <span className="text-2xl font-bold text-purple-400">{result.level}</span>
                </div>
                <p className="text-purple-300 text-sm">achieved!</p>
              </div>
            </div>
          </motion.div>
        )}

        {/* Spin Button */}
        <Button
          onClick={spin}
          disabled={spinning}
          className="w-full bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 text-white font-bold py-3 text-lg transition-all duration-300"
          data-testid="button-spin-impact"
        >
          {spinning ? (
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              className="flex items-center space-x-2"
            >
              <Dice6 className="h-5 w-5" />
              <span>SPINNING...</span>
            </motion.div>
          ) : (
            <div className="flex items-center space-x-2">
              <Dice6 className="h-5 w-5" />
              <span>🎰 SPIN FOR IMPACT</span>
            </div>
          )}
        </Button>

        <div className="text-center">
          <Badge variant="outline" className="text-purple-300 border-purple-400/50">
            <TrendingUp className="h-3 w-3 mr-1" />
            Interactive Impact Simulator
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}