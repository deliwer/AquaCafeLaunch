import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Progress } from "@/components/ui/progress";
import { 
  Calculator, 
  Smartphone, 
  Zap, 
  Trophy, 
  Gift, 
  TrendingUp,
  Award,
  Target,
  DollarSign
} from "lucide-react";
import { apiRequest } from "@/lib/queryClient";

export default function IPhoneTradeCalculator() {
  const [selectedDevice, setSelectedDevice] = useState("");
  const [condition, setCondition] = useState("");
  const [campaignType, setCampaignType] = useState("iphone17_launch");
  const [tradeEstimate, setTradeEstimate] = useState<any>(null);

  const estimateMutation = useMutation({
    mutationFn: async (data: { deviceModel: string; condition: string; campaignType: string }) => {
      const response = await apiRequest("POST", "/api/iphone17/trade-estimate", data);
      return response.json();
    },
    onSuccess: (data) => {
      setTradeEstimate(data);
    }
  });

  const handleCalculate = () => {
    if (selectedDevice && condition) {
      estimateMutation.mutate({
        deviceModel: selectedDevice,
        condition,
        campaignType
      });
    }
  };

  const iPhoneModels = [
    { value: "iPhone 17", label: "iPhone 17", premium: true },
    { value: "iPhone 16", label: "iPhone 16 Pro Max" },
    { value: "iPhone 16", label: "iPhone 16 Pro" },
    { value: "iPhone 16", label: "iPhone 16" },
    { value: "iPhone 15", label: "iPhone 15 Pro Max" },
    { value: "iPhone 15", label: "iPhone 15 Pro" },
    { value: "iPhone 15", label: "iPhone 15" },
    { value: "iPhone 14", label: "iPhone 14 Pro Max" },
    { value: "iPhone 14", label: "iPhone 14 Pro" },
    { value: "iPhone 14", label: "iPhone 14" },
    { value: "iPhone 13", label: "iPhone 13 Pro Max" },
    { value: "iPhone 13", label: "iPhone 13 Pro" },
    { value: "iPhone 13", label: "iPhone 13" },
    { value: "iPhone 12", label: "iPhone 12 Pro Max" },
    { value: "iPhone 12", label: "iPhone 12 Pro" },
    { value: "iPhone 12", label: "iPhone 12" },
    { value: "iPhone 11", label: "iPhone 11 Pro Max" },
    { value: "iPhone 11", label: "iPhone 11 Pro" },
    { value: "iPhone 11", label: "iPhone 11" }
  ];

  const conditionOptions = [
    { value: "excellent", label: "Excellent - Like new, no scratches", multiplier: "100%" },
    { value: "good", label: "Good - Minor wear, fully functional", multiplier: "80%" },
    { value: "fair", label: "Fair - Visible wear, works perfectly", multiplier: "60%" },
    { value: "poor", label: "Poor - Heavy wear, some issues", multiplier: "40%" }
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900/20 to-emerald-900/20">
      <div className="container mx-auto px-4">
        <div className="max-w-5xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 text-lg">
              <Calculator className="h-4 w-4 mr-2" />
              Professional Trade Calculator
            </Badge>
            <h2 className="text-4xl font-bold text-white mb-4">
              Maximize Your iPhone 17 Trade Value
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Calculate your exact trade value and see how to convert it into premium water systems + points. 
              Get up to AED 4,999 credit with our 20% hero discount.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Calculator */}
            <Card className="bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <Smartphone className="h-6 w-6 mr-2 text-blue-500" />
                  Trade Value Calculator
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Select Your iPhone Model
                  </label>
                  <Select value={selectedDevice} onValueChange={setSelectedDevice}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Choose your iPhone model" />
                    </SelectTrigger>
                    <SelectContent>
                      {iPhoneModels.map((model, index) => (
                        <SelectItem key={index} value={model.value}>
                          <div className="flex items-center gap-2">
                            {model.label}
                            {model.premium && <Badge className="bg-gold-600 text-white text-xs">Premium</Badge>}
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Device Condition
                  </label>
                  <Select value={condition} onValueChange={setCondition}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue placeholder="Select condition" />
                    </SelectTrigger>
                    <SelectContent>
                      {conditionOptions.map((option) => (
                        <SelectItem key={option.value} value={option.value}>
                          <div className="flex flex-col items-start">
                            <div className="font-medium">{option.label}</div>
                            <div className="text-xs text-gray-400">Value: {option.multiplier}</div>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-300 mb-2 block">
                    Campaign Type
                  </label>
                  <Select value={campaignType} onValueChange={setCampaignType}>
                    <SelectTrigger className="bg-slate-700 border-slate-600 text-white">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="first_hundred_heroes">
                        <div className="flex items-center gap-2">
                          <Trophy className="h-4 w-4 text-gold-500" />
                          First 100 Heroes (+50% bonus)
                        </div>
                      </SelectItem>
                      <SelectItem value="iphone17_launch">
                        <div className="flex items-center gap-2">
                          <Zap className="h-4 w-4 text-blue-500" />
                          iPhone 17 Launch (+20% bonus)
                        </div>
                      </SelectItem>
                      <SelectItem value="regular">Regular Trade-in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button 
                  onClick={handleCalculate}
                  disabled={!selectedDevice || !condition || estimateMutation.isPending}
                  className="w-full bg-gradient-to-r from-blue-600 to-emerald-600 hover:from-blue-700 hover:to-emerald-700 text-white font-semibold py-3"
                >
                  <Calculator className="h-4 w-4 mr-2" />
                  {estimateMutation.isPending ? "Calculating..." : "Calculate Trade Value"}
                </Button>
              </CardContent>
            </Card>

            {/* Results */}
            <Card className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border-emerald-500/50 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="flex items-center text-white">
                  <TrendingUp className="h-6 w-6 mr-2 text-emerald-500" />
                  Your Professional Trade Package
                </CardTitle>
              </CardHeader>
              <CardContent>
                {tradeEstimate ? (
                  <div className="space-y-6">
                    {/* Trade Value */}
                    <div className="text-center p-6 bg-emerald-600/20 rounded-lg border border-emerald-500/30">
                      <div className="text-4xl font-bold text-emerald-400 mb-2">
                        AED {tradeEstimate.tradeValue?.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">Base Trade Value</div>
                      {tradeEstimate.campaignBonus && (
                        <Badge className="mt-2 bg-emerald-600 text-white">
                          Campaign Bonus Applied!
                        </Badge>
                      )}
                    </div>

                    {/* 20% Hero Discount */}
                    <div className="p-4 bg-blue-600/20 rounded-lg border border-blue-500/30">
                      <h4 className="text-lg font-semibold text-blue-400 mb-2">
                        Hero Discount (20% OFF)
                      </h4>
                      <div className="text-2xl font-bold text-white">
                        Final Value: AED {Math.round(tradeEstimate.tradeValue * 0.8)?.toLocaleString()}
                      </div>
                    </div>

                    {/* Conversion Options */}
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-white mb-3">Convert To:</h4>
                      
                      {/* Water Systems */}
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Gift className="h-5 w-5 mr-2 text-cyan-500" />
                            <span className="font-medium text-white">Premium Water System</span>
                          </div>
                          <span className="text-cyan-400 font-bold">
                            {Math.floor(tradeEstimate.tradeValue / 299)} units
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          AquaCafe Premium + Kangen Technology
                        </p>
                      </div>

                      {/* Points */}
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center">
                            <Trophy className="h-5 w-5 mr-2 text-emerald-500" />
                            <span className="font-medium text-white">Planet Points</span>
                          </div>
                          <span className="text-emerald-400 font-bold">
                            {tradeEstimate.impactPoints?.toLocaleString()}
                          </span>
                        </div>
                        <p className="text-gray-400 text-sm">
                          Use for restaurant credits and upgrades
                        </p>
                      </div>

                      {/* Environmental Impact */}
                      <div className="p-4 bg-slate-700/30 rounded-lg">
                        <h5 className="font-medium text-white mb-2">Environmental Impact:</h5>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <div>
                            <div className="text-green-400 font-semibold">
                              {tradeEstimate.estimatedRewards?.carbonSaved} kg CO₂
                            </div>
                            <div className="text-gray-400">Carbon Saved</div>
                          </div>
                          <div>
                            <div className="text-blue-400 font-semibold">
                              {tradeEstimate.estimatedRewards?.plasticPrevented} bottles
                            </div>
                            <div className="text-gray-400">Plastic Prevented</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Button className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white font-semibold py-3">
                      <Award className="h-4 w-4 mr-2" />
                      Proceed with Trade
                    </Button>
                  </div>
                ) : (
                  <div className="text-center py-12">
                    <Target className="h-16 w-16 text-gray-500 mx-auto mb-4" />
                    <p className="text-gray-400">
                      Select your iPhone model and condition to see your professional trade package
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Conversion Guide */}
          <Card className="mt-12 bg-slate-800/50 border-slate-700/50 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center text-white">
                <DollarSign className="h-6 w-6 mr-2 text-gold-500" />
                Professional Conversion Guide (AED 99 - AED 4,999)
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-4 gap-6">
                {[
                  {
                    range: "AED 99-299",
                    level: "Entry Professional",
                    system: "AquaCafe Basic",
                    points: "2,400 pts",
                    color: "emerald"
                  },
                  {
                    range: "AED 300-899",
                    level: "Executive Professional", 
                    system: "AquaCafe Premium",
                    points: "7,200 pts",
                    color: "blue"
                  },
                  {
                    range: "AED 900-1,999",
                    level: "Senior Executive",
                    system: "Kangen K8 Basic",
                    points: "15,000 pts",
                    color: "purple"
                  },
                  {
                    range: "AED 2,000-4,999",
                    level: "CEO Champion",
                    system: "Kangen K8 Professional",
                    points: "25,000+ pts",
                    color: "gold"
                  }
                ].map((tier, index) => (
                  <div key={index} className={`p-4 bg-gradient-to-br from-${tier.color}-600/20 to-${tier.color}-800/20 border border-${tier.color}-500/30 rounded-lg`}>
                    <h4 className={`font-bold text-${tier.color}-400 mb-2`}>{tier.range}</h4>
                    <div className="space-y-1 text-sm">
                      <div className="text-white font-medium">{tier.level}</div>
                      <div className="text-gray-300">{tier.system}</div>
                      <div className={`text-${tier.color}-400 font-semibold`}>{tier.points}</div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}