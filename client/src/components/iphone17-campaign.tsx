import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Award, Zap, Users, Leaf, Trophy, Star, Gift } from "lucide-react";

export default function IPhone17Campaign() {
  const [selectedPlan, setSelectedPlan] = useState<string>("premium");

  return (
    <section className="py-16 bg-gradient-to-br from-slate-900 via-blue-900 to-emerald-900">
      <div className="container mx-auto px-4">
        {/* Campaign Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-gradient-to-r from-blue-600 to-emerald-600 text-white px-6 py-2 text-lg">
            🚀 iPhone 17 Launch Campaign
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent">
            Trade Your iPhone. Save The Planet.
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Join Dubai's elite environmental champions. First 100 heroes get exclusive rewards.
          </p>
        </div>

        {/* First Hundred Heroes Progress */}
        <Card className="mb-12 bg-gradient-to-r from-amber-900/20 to-orange-900/20 border-amber-700/50">
          <CardHeader>
            <CardTitle className="flex items-center text-amber-400">
              <Trophy className="h-6 w-6 mr-2" />
              First 100 Planet Heroes - Limited Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-between mb-4">
              <span className="text-2xl font-bold text-amber-400">67 / 100 Heroes</span>
              <Badge variant="destructive" className="animate-pulse">33 Spots Left</Badge>
            </div>
            <Progress value={67} className="h-3 mb-4" />
            <div className="grid md:grid-cols-3 gap-4 text-sm">
              <div className="flex items-center">
                <Gift className="h-4 w-4 mr-2 text-amber-400" />
                <span>Free Kangen K8 Upgrade</span>
              </div>
              <div className="flex items-center">
                <Star className="h-4 w-4 mr-2 text-amber-400" />
                <span>Lifetime VIP Status</span>
              </div>
              <div className="flex items-center">
                <Award className="h-4 w-4 mr-2 text-amber-400" />
                <span>50 Free Lunch Credits</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* iPhone 17 Trade-in Options */}
        <Tabs value={selectedPlan} onValueChange={setSelectedPlan} className="mb-12">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800">
            <TabsTrigger value="standard" data-testid="tab-standard">Standard Hero</TabsTrigger>
            <TabsTrigger value="premium" data-testid="tab-premium">Premium Hero</TabsTrigger>
            <TabsTrigger value="elite" data-testid="tab-elite">Elite Champion</TabsTrigger>
          </TabsList>

          <TabsContent value="standard" className="mt-8">
            <Card className="bg-slate-800/50 border-slate-700">
              <CardHeader>
                <CardTitle className="flex items-center text-blue-400">
                  <Shield className="h-6 w-6 mr-2" />
                  Standard Hero Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-green-400">AED 1,200 Trade Value</div>
                <ul className="space-y-2">
                  <li className="flex items-center"><Leaf className="h-4 w-4 mr-2 text-green-400" />AquaCafe Home Filtration</li>
                  <li className="flex items-center"><Award className="h-4 w-4 mr-2 text-green-400" />2,400 Planet Points</li>
                  <li className="flex items-center"><Gift className="h-4 w-4 mr-2 text-green-400" />5 Lunch Credits (#SayNoToPlastic)</li>
                </ul>
                <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-select-standard">
                  Select Standard Hero
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="premium" className="mt-8">
            <Card className="bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border-emerald-600/50 relative">
              <Badge className="absolute -top-2 left-4 bg-emerald-600">Most Popular</Badge>
              <CardHeader>
                <CardTitle className="flex items-center text-emerald-400">
                  <Zap className="h-6 w-6 mr-2" />
                  Premium Hero Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-green-400">AED 1,800 Trade Value</div>
                <ul className="space-y-2">
                  <li className="flex items-center"><Leaf className="h-4 w-4 mr-2 text-green-400" />AquaCafe Premium + Kangen Water</li>
                  <li className="flex items-center"><Award className="h-4 w-4 mr-2 text-green-400" />4,800 Planet Points</li>
                  <li className="flex items-center"><Gift className="h-4 w-4 mr-2 text-green-400" />20 Lunch Credits</li>
                  <li className="flex items-center"><Users className="h-4 w-4 mr-2 text-green-400" />Social Media Bonus Multiplier</li>
                </ul>
                <Button className="w-full bg-emerald-600 hover:bg-emerald-700" data-testid="button-select-premium">
                  Select Premium Hero
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="elite" className="mt-8">
            <Card className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 border-purple-600/50">
              <CardHeader>
                <CardTitle className="flex items-center text-purple-400">
                  <Trophy className="h-6 w-6 mr-2" />
                  Elite Champion Package
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-3xl font-bold text-green-400">AED 2,400 Trade Value</div>
                <ul className="space-y-2">
                  <li className="flex items-center"><Leaf className="h-4 w-4 mr-2 text-green-400" />Kangen K8 Professional System</li>
                  <li className="flex items-center"><Award className="h-4 w-4 mr-2 text-green-400" />7,200 Planet Points</li>
                  <li className="flex items-center"><Gift className="h-4 w-4 mr-2 text-green-400" />50 Lunch Credits</li>
                  <li className="flex items-center"><Users className="h-4 w-4 mr-2 text-green-400" />Restaurant Partnership Access</li>
                  <li className="flex items-center"><Trophy className="h-4 w-4 mr-2 text-green-400" />Leaderboard VIP Status</li>
                </ul>
                <Button className="w-full bg-purple-600 hover:bg-purple-700" data-testid="button-select-elite">
                  Select Elite Champion
                </Button>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Climate Impact Calculator */}
        <Card className="mb-12 bg-gradient-to-r from-green-900/20 to-blue-900/20 border-green-600/50">
          <CardHeader>
            <CardTitle className="flex items-center text-green-400">
              <Leaf className="h-6 w-6 mr-2" />
              Your Climate Contribution Calculator
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-bold text-green-400">2,400</div>
                <div className="text-sm text-gray-400">Plastic Bottles Prevented</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-blue-400">120kg</div>
                <div className="text-sm text-gray-400">CO₂ Saved</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-purple-400">15</div>
                <div className="text-sm text-gray-400">Free Lunches Earned</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-amber-400">30</div>
                <div className="text-sm text-gray-400">Days #SayNoToPlastic</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Save Planet Challenge Bucket List */}
        <Card className="mb-12 bg-slate-800/50 border-slate-700">
          <CardHeader>
            <CardTitle className="flex items-center text-blue-400">
              <Award className="h-6 w-6 mr-2" />
              Save The Planet Challenge - Bucket List
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-3">
                <h4 className="font-semibold text-emerald-400">Environmental Challenges</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-sm">30-Day Plastic-Free Challenge</span>
                    <Badge variant="secondary">+500 Points</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-sm">Refer 5 Professional Colleagues</span>
                    <Badge variant="secondary">+1000 Points</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-sm">Share Climate Impact on LinkedIn</span>
                    <Badge variant="secondary">+200 Points</Badge>
                  </div>
                </div>
              </div>
              <div className="space-y-3">
                <h4 className="font-semibold text-purple-400">Professional Rewards</h4>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-sm">Business Lunch at Premium Partners</span>
                    <Badge className="bg-green-600">Free</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-sm">Executive Networking Events</span>
                    <Badge className="bg-purple-600">VIP Access</Badge>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-slate-700/50 rounded">
                    <span className="text-sm">Corporate Sustainability Certificate</span>
                    <Badge className="bg-blue-600">Digital NFT</Badge>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Social Media & Partnership CTA */}
        <div className="grid md:grid-cols-2 gap-8">
          <Card className="bg-gradient-to-r from-blue-900/30 to-cyan-900/30 border-blue-600/50">
            <CardHeader>
              <CardTitle className="text-blue-400">Share & Multiply Your Impact</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Share your environmental journey on social media and earn bonus points. Tag @DeliWerDubai #SaveThePlanet
              </p>
              <Button className="w-full bg-blue-600 hover:bg-blue-700" data-testid="button-share-social">
                Share Your Achievement
              </Button>
            </CardContent>
          </Card>

          <Card className="bg-gradient-to-r from-amber-900/30 to-orange-900/30 border-amber-600/50">
            <CardHeader>
              <CardTitle className="text-amber-400">Restaurant Partnership Program</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Join as an agent or restaurant partner. Earn 30% commission on trade-ins and boost your foot traffic.
              </p>
              <Button className="w-full bg-amber-600 hover:bg-amber-700" data-testid="button-join-partnership">
                Become a Partner
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}