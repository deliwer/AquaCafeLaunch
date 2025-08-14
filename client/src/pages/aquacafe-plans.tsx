import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Droplets, Award, CheckCircle, Star, Shield, Zap, Leaf } from "lucide-react";
import Navigation from "@/components/navigation";
import Footer from "@/components/footer";

export default function AquaCafePlans() {
  const [selectedPlan, setSelectedPlan] = useState("premium");

  const filtrationPlans = {
    basic: {
      name: "AquaCafe Basic",
      price: 99,
      originalPrice: 299,
      discount: "67% OFF",
      features: [
        "5-Stage Basic Filtration",
        "Removes Chlorine & Sediments",
        "Basic Installation Kit",
        "6 Month Filter Replacement",
        "Basic Customer Support",
        "1 Year Warranty"
      ],
      pointsEarned: 2400,
      level: "Water Guardian",
      color: "blue",
      recommended: false
    },
    premium: {
      name: "AquaCafe Premium",
      price: 299,
      originalPrice: 899,
      discount: "67% OFF",
      features: [
        "7-Stage Premium Filtration",
        "Alkaline Water Enhancement",
        "Professional Installation",
        "12 Month Filter Replacement",
        "24/7 Premium Support",
        "3 Year Extended Warranty",
        "Mobile App Monitoring",
        "Free Annual Maintenance"
      ],
      pointsEarned: 7200,
      level: "Eco Professional",
      color: "emerald",
      recommended: true
    },
    kangen: {
      name: "Kangen K8 Professional",
      price: 599,
      originalPrice: 2499,
      discount: "76% OFF",
      features: [
        "Medical-Grade Electrolysis",
        "8 Water Types Production",
        "Platinum-Titanium Plates",
        "Professional Installation",
        "Lifetime Maintenance",
        "VIP Customer Support",
        "5 Year Full Warranty",
        "Annual Professional Service",
        "Mobile App & Analytics",
        "White-Glove Service"
      ],
      pointsEarned: 15000,
      level: "Planet Executive",
      color: "purple",
      recommended: false
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <Navigation />
      
      <main className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="max-w-6xl mx-auto">
            {/* Header */}
            <div className="text-center mb-12">
              <Badge className="mb-4 bg-gradient-to-r from-emerald-600 to-blue-600 text-white px-6 py-2 text-lg">
                <Droplets className="h-4 w-4 mr-2" />
                AquaCafe Filtration Systems
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold mb-6 text-white">
                Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-400">Water Solution</span>
              </h1>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Professional-grade water filtration systems designed for Dubai's demanding water quality standards. 
                Join thousands of satisfied customers enjoying pure, healthy water.
              </p>
            </div>

            {/* Plan Selection */}
            <Tabs value={selectedPlan} onValueChange={setSelectedPlan} className="mb-12">
              <TabsList className="grid w-full grid-cols-3 bg-slate-800 h-14">
                <TabsTrigger value="basic" className="text-sm font-medium">Basic</TabsTrigger>
                <TabsTrigger value="premium" className="text-sm font-medium relative">
                  Premium
                  <Badge className="ml-2 bg-emerald-600 text-white text-xs">Popular</Badge>
                </TabsTrigger>
                <TabsTrigger value="kangen" className="text-sm font-medium">Professional</TabsTrigger>
              </TabsList>

              {Object.entries(filtrationPlans).map(([key, plan]) => (
                <TabsContent key={key} value={key} className="mt-8">
                  <Card className={`bg-gradient-to-br from-${plan.color}-900/20 to-slate-900/50 border-${plan.color}-500/50 backdrop-blur-sm ${plan.recommended ? 'ring-2 ring-emerald-500/50' : ''}`}>
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className={`text-3xl font-bold text-${plan.color}-400 mb-2 flex items-center`}>
                            {plan.name}
                            {plan.recommended && (
                              <Badge className="ml-3 bg-emerald-600 text-white">
                                <Star className="h-3 w-3 mr-1" />
                                Recommended
                              </Badge>
                            )}
                          </CardTitle>
                          <div className="flex items-center space-x-4">
                            <span className="text-4xl font-bold text-emerald-400">AED {plan.price}</span>
                            <div className="text-gray-400">
                              <span className="line-through text-xl">AED {plan.originalPrice}</span>
                              <Badge className="ml-2 bg-red-600 text-white">{plan.discount}</Badge>
                            </div>
                          </div>
                        </div>
                        <div className={`text-center p-4 bg-${plan.color}-900/30 rounded-lg`}>
                          <Award className={`h-8 w-8 text-${plan.color}-400 mx-auto mb-2`} />
                          <div className={`text-lg font-bold text-${plan.color}-400`}>+{plan.pointsEarned.toLocaleString()}</div>
                          <div className="text-sm text-gray-400">Planet Points</div>
                          <div className={`text-xs text-${plan.color}-400 mt-1`}>{plan.level}</div>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-6">
                      {/* Features */}
                      <div className="grid md:grid-cols-2 gap-4">
                        {plan.features.map((feature, index) => (
                          <div key={index} className="flex items-center space-x-3">
                            <CheckCircle className="h-5 w-5 text-emerald-400 flex-shrink-0" />
                            <span className="text-gray-300">{feature}</span>
                          </div>
                        ))}
                      </div>

                      {/* CTA */}
                      <div className="flex gap-4">
                        <Button className={`flex-1 bg-gradient-to-r from-${plan.color}-600 to-${plan.color}-700 hover:from-${plan.color}-700 hover:to-${plan.color}-800 text-white font-semibold py-4 text-lg`}>
                          <Droplets className="h-5 w-5 mr-2" />
                          Order {plan.name}
                        </Button>
                        <Button variant="outline" className="px-8 py-4 border-emerald-500/50 hover:border-emerald-500 text-emerald-400">
                          View Details
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>
              ))}
            </Tabs>

            {/* Benefits Section */}
            <div className="grid md:grid-cols-3 gap-8 mb-12">
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Shield className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Health Protection</h3>
                  <p className="text-gray-300">Remove 99.9% of contaminants, chlorine, and harmful bacteria for your family's health.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Zap className="h-12 w-12 text-blue-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Professional Installation</h3>
                  <p className="text-gray-300">Expert technicians ensure optimal performance with professional setup and testing.</p>
                </CardContent>
              </Card>
              
              <Card className="bg-slate-800/50 border-slate-700">
                <CardContent className="p-6 text-center">
                  <Leaf className="h-12 w-12 text-emerald-400 mx-auto mb-4" />
                  <h3 className="text-xl font-bold mb-2 text-white">Environmental Impact</h3>
                  <p className="text-gray-300">Reduce plastic waste by up to 2,400 bottles per year with sustainable filtration.</p>
                </CardContent>
              </Card>
            </div>

            {/* Guarantee */}
            <Card className="bg-gradient-to-r from-emerald-900/20 to-blue-900/20 border-emerald-500/50 text-center">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold mb-4 text-emerald-400">30-Day Money-Back Guarantee</h3>
                <p className="text-lg text-gray-300 mb-6">
                  Not satisfied with your water quality? Return your system within 30 days for a full refund. 
                  We're confident you'll love the difference.
                </p>
                <Button className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 px-8 py-3 text-lg font-semibold">
                  Start Your 30-Day Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}