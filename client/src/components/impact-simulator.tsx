import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface ImpactSimulatorProps {
  selectedDevice: string;
  onDeviceChange: (device: string) => void;
}

const deviceImpact = {
  "iPhone 15 Pro": { points: 2800, trade: 1800, bottles: 2800, co2: 1.4, protection: 20 },
  "iPhone 14 Pro": { points: 2600, trade: 1500, bottles: 2600, co2: 1.3, protection: 18 },
  "iPhone 13 Pro": { points: 2400, trade: 1200, bottles: 2400, co2: 1.2, protection: 18 },
  "iPhone 12 Pro": { points: 2200, trade: 900, bottles: 2200, co2: 1.1, protection: 16 },
  "iPhone 11": { points: 2000, trade: 600, bottles: 2000, co2: 1.0, protection: 14 },
};

export default function ImpactSimulator({ selectedDevice, onDeviceChange }: ImpactSimulatorProps) {
  const impact = deviceImpact[selectedDevice as keyof typeof deviceImpact] || deviceImpact["iPhone 13 Pro"];

  return (
    <div className="bg-gray-800/80 backdrop-blur-sm border border-gray-700 rounded-2xl p-8 mb-8 achievement-glow">
      <h3 className="text-2xl font-display font-bold mb-6">YOUR DEVICE → PLANET IMPACT SIMULATOR</h3>
      
      <div className="grid md:grid-cols-3 gap-6 items-center">
        {/* iPhone Selection */}
        <div className="text-center">
          <div className="bg-gray-700 rounded-xl p-6 mb-4">
            <div className="w-16 h-24 bg-gray-600 rounded-lg mx-auto mb-4 flex items-center justify-center text-4xl">
              📱
            </div>
            <Select value={selectedDevice} onValueChange={onDeviceChange}>
              <SelectTrigger className="bg-gray-600 text-white border-gray-500 w-full">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {Object.keys(deviceImpact).map((device) => (
                  <SelectItem key={device} value={device}>
                    {device}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <p className="text-sm text-gray-400">Your Device</p>
        </div>
        
        {/* Arrow & Power Up */}
        <div className="text-center">
          <div className="text-4xl mb-4 animate-pulse-slow">→</div>
          <div className="bg-gradient-to-r from-achievement-gold to-yellow-500 text-gray-900 px-4 py-2 rounded-full text-sm font-bold">
            LEVEL UP! 🚀
          </div>
        </div>
        
        {/* Impact Preview */}
        <div className="bg-gradient-to-br from-aqua-500/20 to-achievement-green/20 border border-aqua-500/30 rounded-xl p-6">
          <div className="text-center space-y-2">
            <div className="text-lg font-bold text-aqua-500">+{impact.points.toLocaleString()} Planet Points</div>
            <div className="text-sm text-achievement-green">+1 Water Guardian Badge</div>
            <div className="text-sm text-achievement-gold">+AED {impact.trade.toLocaleString()} Trade Value</div>
            <div className="text-sm text-achievement-purple">+{impact.protection} Months Family Protection</div>
          </div>
        </div>
      </div>
      
      {/* Power-Up Banner */}
      <div className="mt-6 bg-gradient-to-r from-red-500 to-orange-500 rounded-lg p-4 text-center animate-glow">
        <span className="font-bold">🔥 POWER-UP: Order now = DOUBLE POINTS!</span>
      </div>
    </div>
  );
}
