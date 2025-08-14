import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Leaf, Droplets, Recycle, TreePine, Award, Calculator } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function ImpactCalculator() {
  const [deviceType, setDeviceType] = useState("iphone14");
  const [deviceCondition, setDeviceCondition] = useState("good");
  const [monthlyBottles, setMonthlyBottles] = useState([50]);
  const [familySize, setFamilySize] = useState([4]);

  const deviceValues = {
    iphone14: { base: 1800, excellent: 1.2, good: 1.0, fair: 0.7, poor: 0.4 },
    iphone13: { base: 1400, excellent: 1.2, good: 1.0, fair: 0.7, poor: 0.4 },
    iphone12: { base: 1000, excellent: 1.2, good: 1.0, fair: 0.7, poor: 0.4 },
    iphone11: { base: 800, excellent: 1.2, good: 1.0, fair: 0.7, poor: 0.4 },
    iphoneX: { base: 600, excellent: 1.2, good: 1.0, fair: 0.7, poor: 0.4 }
  };

  const calculateImpact = () => {
    const device = deviceValues[deviceType as keyof typeof deviceValues];
    const tradeValue = device.base * device[deviceCondition as keyof typeof device];
    const bottles = monthlyBottles[0] * familySize[0] * 12; // Annual bottles
    const carbonSaved = bottles * 0.08; // kg CO2 per bottle
    const plasticPrevented = bottles * 0.025; // kg plastic per bottle
    const treesEquivalent = carbonSaved / 22; // kg CO2 absorbed per tree annually
    const pointsEarned = Math.floor(tradeValue * 4); // 4 points per AED

    return {
      tradeValue,
      bottles,
      carbonSaved,
      plasticPrevented,
      treesEquivalent,
      pointsEarned
    };
  };

  const impact = calculateImpact();

  const impactCategories = [
    {
      title: "Plastic Bottles Prevented",
      value: impact.bottles.toLocaleString(),
      unit: "bottles/year",
      icon: <Droplets className="h-8 w-8" />,
      color: "blue",
      description: "By using AquaCafe filtration instead of bottled water"
    },
    {
      title: "Carbon Footprint Reduced",
      value: impact.carbonSaved.toFixed(1),
      unit: "kg CO₂/year",
      icon: <Leaf className="h-8 w-8" />,
      color: "emerald",
      description: "Equivalent to removing a car from roads for 3 days"
    },
    {
      title: "Plastic Waste Prevented",
      value: impact.plasticPrevented.toFixed(1),
      unit: "kg plastic/year",
      icon: <Recycle className="h-8 w-8" />,
      color: "purple",
      description: "Preventing microplastics from entering our oceans"
    },
    {
      title: "Trees Worth of CO₂",
      value: impact.treesEquivalent.toFixed(1),
      unit: "trees equivalent",
      icon: <TreePine className="h-8 w-8" />,
      color: "green",
      description: "Annual CO₂ absorption equivalent"
    }
  ];

  const globalImpactStats = [
    { label: "Dubai Families Served", value: "12,847", change: "+18% this month" },
    { label: "Total Bottles Prevented", value: "2.4M", change: "+25% this month" },
    { label: "Carbon Saved (tonnes)", value: "192", change: "+22% this month" },
    { label: "Plastic Prevented (tonnes)", value: "60", change: "+20% this month" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 text-lg">
                <Calculator className="h-4 w-4 mr-2" />
                Environmental Impact Calculator
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Planet Impact</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                See the real environmental impact of trading your iPhone for an AquaCafe water filtration system. 
                Every device trade creates measurable positive change.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Calculator Inputs */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Calculator className="h-6 w-6 mr-2 text-emerald-400" />
                    Your Impact Calculator
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Device Selection */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      iPhone Model for Trade-In
                    </label>
                    <Select value={deviceType} onValueChange={setDeviceType}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select your iPhone" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="iphone14">iPhone 14 Series</SelectItem>
                        <SelectItem value="iphone13">iPhone 13 Series</SelectItem>
                        <SelectItem value="iphone12">iPhone 12 Series</SelectItem>
                        <SelectItem value="iphone11">iPhone 11 Series</SelectItem>
                        <SelectItem value="iphoneX">iPhone X Series</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Device Condition */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Device Condition
                    </label>
                    <Select value={deviceCondition} onValueChange={setDeviceCondition}>
                      <SelectTrigger className="bg-slate-700 border-slate-600">
                        <SelectValue placeholder="Select condition" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="excellent">Excellent - Like new</SelectItem>
                        <SelectItem value="good">Good - Minor wear</SelectItem>
                        <SelectItem value="fair">Fair - Visible wear</SelectItem>
                        <SelectItem value="poor">Poor - Heavy wear</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Family Size */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Family Size: {familySize[0]} people
                    </label>
                    <Slider
                      value={familySize}
                      onValueChange={setFamilySize}
                      max={8}
                      min={1}
                      step={1}
                      className="mt-2"
                    />
                  </div>

                  {/* Monthly Bottles */}
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Monthly Water Bottles per Person: {monthlyBottles[0]} bottles
                    </label>
                    <Slider
                      value={monthlyBottles}
                      onValueChange={setMonthlyBottles}
                      max={150}
                      min={10}
                      step={5}
                      className="mt-2"
                    />
                  </div>

                  {/* Trade Value */}
                  <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/50">
                    <CardContent className="p-4 text-center">
                      <div className="text-2xl font-bold text-emerald-400 mb-2">
                        AED {impact.tradeValue.toLocaleString()}
                      </div>
                      <div className="text-sm text-gray-300">Estimated Trade Value</div>
                      <div className="text-emerald-400 font-semibold mt-1">
                        +{impact.pointsEarned.toLocaleString()} Planet Points
                      </div>
                    </CardContent>
                  </Card>
                </CardContent>
              </Card>

              {/* Impact Results */}
              <Card className="bg-slate-800/50 border-slate-700">
                <CardHeader>
                  <CardTitle className="text-2xl text-white flex items-center">
                    <Award className="h-6 w-6 mr-2 text-emerald-400" />
                    Your Annual Environmental Impact
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {impactCategories.map((category, index) => (
                    <Card key={index} className={`bg-gradient-to-r from-${category.color}-900/20 to-${category.color}-800/20 border-${category.color}-500/30`}>
                      <CardContent className="p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className={`text-${category.color}-400`}>
                              {category.icon}
                            </div>
                            <div>
                              <div className="font-bold text-white">{category.title}</div>
                              <div className="text-sm text-gray-400">{category.description}</div>
                            </div>
                          </div>
                          <div className="text-right">
                            <div className={`text-2xl font-bold text-${category.color}-400`}>
                              {category.value}
                            </div>
                            <div className="text-sm text-gray-400">{category.unit}</div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Global Impact Statistics */}
            <div className="mb-12">
              <h2 className="text-3xl font-bold text-center mb-8 text-white">Community Impact Statistics</h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                {globalImpactStats.map((stat, index) => (
                  <Card key={index} className="bg-slate-800/50 border-slate-700 text-center">
                    <CardContent className="p-6">
                      <div className="text-3xl font-bold text-emerald-400 mb-2">{stat.value}</div>
                      <div className="text-white font-semibold mb-1">{stat.label}</div>
                      <div className="text-sm text-emerald-400">{stat.change}</div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/50 text-center">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-emerald-400">Ready to Make Your Impact?</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Your iPhone trade-in can prevent {impact.bottles.toLocaleString()} plastic bottles from polluting our environment 
                  while providing your family with clean, healthy water.
                </p>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={() => window.location.href = '/'}
                    className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 px-8 py-3 text-lg font-semibold"
                  >
                    Start Your Trade-In
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => window.location.href = '/aquacafe-plans'}
                    className="px-8 py-3 border-emerald-500/50 hover:border-emerald-500 text-emerald-400"
                  >
                    View AquaCafe Plans
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}