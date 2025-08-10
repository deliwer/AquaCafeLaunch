import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function PartnershipProgram() {
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const [signupForm, setSignupForm] = useState({
    name: "",
    email: "",
    phone: "",
    type: ""
  });
  
  const { toast } = useToast();

  const signupMutation = useMutation({
    mutationFn: async (data: typeof signupForm) => {
      const response = await apiRequest("POST", "/api/affiliates", data);
      return response.json();
    },
    onSuccess: () => {
      toast({
        title: "🎉 Welcome to the Planet Hero Alliance!",
        description: "Your partnership application has been submitted. You'll receive onboarding details via email within 24 hours.",
      });
      setIsSignupOpen(false);
      setSignupForm({ name: "", email: "", phone: "", type: "" });
    },
    onError: (error: any) => {
      toast({
        title: "Signup Failed",
        description: error.message || "Please try again or contact support.",
        variant: "destructive",
      });
    }
  });

  const handleSignupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!signupForm.name || !signupForm.email || !signupForm.type) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    signupMutation.mutate(signupForm);
  };

  return (
    <section className="py-20 bg-gray-800">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">🤝 JOIN THE PLANET HERO ALLIANCE</h2>
            <p className="text-xl text-gray-300">Become a certified partner and start earning immediately from AED 99 AquaCafe sales</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-8">
            {/* Affiliate Agent Program */}
            <Card className="bg-gray-900 border-gray-700 card-hover">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-achievement-gold to-yellow-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💼</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Affiliate Agent Program</h3>
                  <p className="text-gray-400">Build your own community network and earn commission on every trade-in</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>Earn <strong className="text-achievement-gold">30%</strong> commission on every iPhone trade-in</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>Access to exclusive AquaCafe pricing & inventory</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>Marketing support & training materials</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>Build your own community network</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>AI marketing automation tools</span>
                  </div>
                </div>
                
                {/* Earning Preview */}
                <Card className="bg-gradient-to-r from-achievement-gold/20 to-yellow-500/20 border-achievement-gold/30 mb-6">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-300 mb-1">Your potential monthly earnings:</div>
                    <div className="text-2xl font-bold text-achievement-gold">AED 2,970+</div>
                    <div className="text-xs text-gray-400">Based on 10 sales/month at AED 99 each</div>
                  </CardContent>
                </Card>
                
                <Button 
                  onClick={() => {
                    setSignupForm(prev => ({ ...prev, type: "agent" }));
                    setIsSignupOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-achievement-gold to-yellow-500 hover:from-yellow-500 hover:to-achievement-gold text-gray-900 px-6 py-3 rounded-full font-bold transition-all duration-300"
                >
                  🚀 BECOME AN AGENT
                </Button>
              </CardContent>
            </Card>
            
            {/* Restaurant Collection Partner */}
            <Card className="bg-gray-900 border-gray-700 card-hover">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-aqua-500 to-achievement-green rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🏪</span>
                  </div>
                  <h3 className="text-2xl font-bold mb-2">Restaurant Collection Partner</h3>
                  <p className="text-gray-400">Become a certified AquaCafe collection point and reward customers</p>
                </div>
                
                <div className="space-y-4 mb-8">
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>Become a certified AquaCafe collection point</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>Offer loyalty points for every trade-in</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>Increase foot traffic & customer engagement</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>Access to exclusive member offers</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <span className="text-achievement-green text-xl">✔</span>
                    <span>Co-branded marketing materials</span>
                  </div>
                </div>
                
                {/* Benefits Preview */}
                <Card className="bg-gradient-to-r from-aqua-500/20 to-achievement-green/20 border-aqua-500/30 mb-6">
                  <CardContent className="p-4 text-center">
                    <div className="text-sm text-gray-300 mb-1">Average partner benefits:</div>
                    <div className="text-2xl font-bold text-aqua-500">+40% Traffic</div>
                    <div className="text-xs text-gray-400">Increased customer visits & loyalty</div>
                  </CardContent>
                </Card>
                
                <Button 
                  onClick={() => {
                    setSignupForm(prev => ({ ...prev, type: "restaurant" }));
                    setIsSignupOpen(true);
                  }}
                  className="w-full bg-gradient-to-r from-aqua-500 to-achievement-green hover:from-aqua-600 hover:to-achievement-green px-6 py-3 rounded-full font-bold transition-all duration-300"
                >
                  🤝 PARTNER WITH US
                </Button>
              </CardContent>
            </Card>
          </div>
          
          {/* Contact Info */}
          <div className="text-center mt-12 space-y-4">
            <div className="text-lg text-gray-300">Ready to start earning immediately?</div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+971523946311" 
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full transition-colors inline-flex items-center space-x-2"
              >
                <span>📞</span>
                <span>+971 52 394 6311</span>
              </a>
              <a 
                href="mailto:partners@deliwer.com" 
                className="bg-gray-700 hover:bg-gray-600 px-6 py-3 rounded-full transition-colors inline-flex items-center space-x-2"
              >
                <span>✉</span>
                <span>partners@deliwer.com</span>
              </a>
            </div>
          </div>

          {/* Partnership Signup Modal */}
          {isSignupOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="bg-gray-900 border-gray-700 max-w-md w-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">🤝 Join Planet Hero Alliance</h3>
                    <Button 
                      onClick={() => setIsSignupOpen(false)}
                      variant="ghost"
                      size="sm"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <form onSubmit={handleSignupSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="partner-name">Full Name / Business Name *</Label>
                      <Input
                        id="partner-name"
                        value={signupForm.name}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your name or business name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="partner-email">Email Address *</Label>
                      <Input
                        id="partner-email"
                        type="email"
                        value={signupForm.email}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, email: e.target.value }))}
                        placeholder="your@email.com"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="partner-phone">Phone Number</Label>
                      <Input
                        id="partner-phone"
                        value={signupForm.phone}
                        onChange={(e) => setSignupForm(prev => ({ ...prev, phone: e.target.value }))}
                        placeholder="+971 50 123 4567"
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="partner-type">Partnership Type *</Label>
                      <Select value={signupForm.type} onValueChange={(value) => setSignupForm(prev => ({ ...prev, type: value }))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select partnership type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="agent">Affiliate Agent</SelectItem>
                          <SelectItem value="restaurant">Restaurant Partner</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={signupMutation.isPending}
                      className="w-full bg-gradient-to-r from-aqua-500 to-achievement-green hover:from-aqua-600 hover:to-achievement-green"
                    >
                      {signupMutation.isPending ? "SUBMITTING..." : "🚀 JOIN ALLIANCE"}
                    </Button>
                  </form>
                  
                  <div className="mt-4 text-xs text-gray-400 text-center">
                    You'll receive onboarding details within 24 hours
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
