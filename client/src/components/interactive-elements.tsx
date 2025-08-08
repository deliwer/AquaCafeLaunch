import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const slotMachineItems = [
  { icon: "🍼", value: "2400", label: "BTLS" },
  { icon: "💰", value: "AED", label: "1200" },
  { icon: "🌱", value: "1.2T", label: "CO2" },
  { icon: "🏆", value: "LVL", label: "UP!" }
];

export default function InteractiveElements() {
  const [isSpinning, setIsSpinning] = useState(false);
  const [dubaiProgress] = useState(60);

  const handleSpin = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), 2000);
  };

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">🎰 SPIN YOUR IMPACT & SAVE DUBAI</h2>
            <p className="text-xl text-gray-300">Interactive tools to visualize your environmental superpowers</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Impact Slot Machine */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-8 text-center">
                <h3 className="text-2xl font-bold mb-6">🎰 IMPACT SLOT MACHINE</h3>
                
                <div className="bg-gray-800 rounded-xl p-6 mb-6">
                  <div className="grid grid-cols-4 gap-2 mb-4">
                    {slotMachineItems.map((item, index) => (
                      <div 
                        key={index} 
                        className={`bg-gray-700 rounded-lg p-4 text-center transition-transform duration-200 ${
                          isSpinning ? 'animate-bounce' : ''
                        }`}
                      >
                        <div className="text-3xl mb-2">{item.icon}</div>
                        <div className={`text-sm font-bold ${
                          index === 0 ? 'text-aqua-500' : 
                          index === 1 ? 'text-achievement-gold' :
                          index === 2 ? 'text-achievement-green' : 
                          'text-achievement-purple'
                        }`}>
                          {item.value}
                        </div>
                        <div className="text-xs text-gray-400">{item.label}</div>
                      </div>
                    ))}
                  </div>
                  <div className="text-lg font-bold text-achievement-gold">🎊 JACKPOT: All benefits unlocked!</div>
                </div>
                
                <Button 
                  onClick={handleSpin}
                  disabled={isSpinning}
                  className="bg-gradient-to-r from-achievement-gold to-yellow-500 hover:from-yellow-500 hover:to-achievement-gold text-gray-900 px-8 py-3 rounded-full font-bold text-lg transition-all duration-300 transform hover:scale-105"
                >
                  {isSpinning ? '🎰 SPINNING...' : '🎰 SPIN FOR IMPACT'}
                </Button>
              </CardContent>
            </Card>
            
            {/* Planet Rescue Progress */}
            <Card className="bg-gray-900 border-gray-700">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-6 text-center">🌍 PLANET RESCUE PROGRESS</h3>
                
                <div className="space-y-6">
                  {/* Dubai 2030 Goals */}
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span>DUBAI 2030 ENVIRONMENTAL GOALS</span>
                      <span className="text-aqua-500 font-bold">{dubaiProgress}% Complete</span>
                    </div>
                    <div className="bg-gray-700 rounded-full h-3">
                      <div 
                        className="bg-gradient-to-r from-aqua-500 to-achievement-green rounded-full h-3 transition-all duration-300" 
                        style={{ width: `${dubaiProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  
                  {/* Your Contribution */}
                  <Card className="bg-gray-800">
                    <CardContent className="p-4">
                      <div className="text-lg font-bold text-aqua-500 mb-4">YOUR ORDER CONTRIBUTION:</div>
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Clean water goal</span>
                          <span className="text-achievement-green font-bold">+0.003%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Carbon reduction</span>
                          <span className="text-achievement-green font-bold">+0.002%</span>
                        </div>
                        <div className="flex items-center justify-between">
                          <span className="text-sm">Plastic elimination</span>
                          <span className="text-achievement-green font-bold">+0.001%</span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  
                  <Button className="w-full bg-gradient-to-r from-aqua-500 to-achievement-green hover:from-aqua-600 hover:to-achievement-green px-6 py-3 rounded-full font-bold transition-all duration-300">
                    🚀 BOOST PROGRESS: ORDER AQUACAFE NOW
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
