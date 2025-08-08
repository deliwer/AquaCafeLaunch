import { useState, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

export default function ProductShowcase() {
  const [timeLeft, setTimeLeft] = useState({ hours: 8, minutes: 23, seconds: 45 });
  const [isOrderFormOpen, setIsOrderFormOpen] = useState(false);
  const [orderForm, setOrderForm] = useState({
    customerName: "",
    customerPhone: "",
    customerAddress: ""
  });
  
  const { toast } = useToast();

  // Countdown timer
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const orderMutation = useMutation({
    mutationFn: async (data: typeof orderForm) => {
      const response = await apiRequest("POST", "/api/aquacafe-orders", data);
      return response.json();
    },
    onSuccess: (data) => {
      toast({
        title: "🎉 CONGRATULATIONS! YOU'VE UNLOCKED:",
        description: `Achievement: Water Warrior | +${data.instantRewards.points} Planet Points | Premium Filter FREE!`,
      });
      setIsOrderFormOpen(false);
      setOrderForm({ customerName: "", customerPhone: "", customerAddress: "" });
    },
    onError: () => {
      toast({
        title: "Order Failed",
        description: "Please try again or contact support.",
        variant: "destructive",
      });
    }
  });

  const handleOrderSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!orderForm.customerName || !orderForm.customerPhone || !orderForm.customerAddress) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields.",
        variant: "destructive",
      });
      return;
    }
    orderMutation.mutate(orderForm);
  };

  return (
    <section className="py-20 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-display font-bold mb-4">💧 AQUACAFE STARTER KIT</h2>
            <p className="text-xl text-gray-300">Transform your home into an eco-fortress with Dubai's premium water filtration system</p>
          </div>
          
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Product Images */}
            <div className="space-y-6">
              <img 
                src="https://images.unsplash.com/photo-1563906267088-b029e7101114?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=600" 
                alt="AquaCafe water filtration system" 
                className="rounded-xl shadow-lg w-full h-auto" 
              />
              
              <div className="grid grid-cols-3 gap-4">
                <img 
                  src="https://images.unsplash.com/photo-1582719471137-c3967ffb1c42?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200" 
                  alt="Water filter technology" 
                  className="rounded-lg shadow w-full h-32 object-cover" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200" 
                  alt="Family using water system" 
                  className="rounded-lg shadow w-full h-32 object-cover" 
                />
                <img 
                  src="https://images.unsplash.com/photo-1607472586893-edb57bdc0e39?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=300&h=200" 
                  alt="Professional installation" 
                  className="rounded-lg shadow w-full h-32 object-cover" 
                />
              </div>
            </div>
            
            {/* Product Details */}
            <div className="space-y-6">
              {/* Pricing & Value */}
              <Card className="bg-gradient-to-br from-aqua-500/10 to-achievement-green/10 border-aqua-500/30">
                <CardContent className="p-8">
                  <div className="text-center mb-6">
                    <div className="text-6xl font-display font-bold text-aqua-500 mb-2">AED 99</div>
                    <div className="text-lg text-gray-300 line-through">Starter Kit (Normally AED 399)</div>
                    <div className="text-sm text-achievement-gold font-bold">75% OFF Launch Special!</div>
                  </div>
                  
                  {/* Value Proposition */}
                  <div className="space-y-3">
                    {[
                      "7-Stage Premium Filtration",
                      "Free Professional Installation",
                      "Lifetime Maintenance Support",
                      "Bakers Kitchen DH100 Voucher",
                      "Planet Hero Status Instant Unlock"
                    ].map((feature, index) => (
                      <div key={index} className="flex items-center space-x-3">
                        <span className="text-achievement-green">✓</span>
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
              
              {/* Urgency Timer */}
              <Card className="bg-gradient-to-r from-red-500/20 to-orange-500/20 border-red-500/30">
                <CardContent className="p-6 text-center">
                  <div className="text-lg font-bold text-red-400 mb-2">⚠️ CLIMATE CRISIS COUNTDOWN</div>
                  <div className="text-3xl font-display font-bold text-white mb-2">
                    {String(timeLeft.hours).padStart(2, '0')}:{String(timeLeft.minutes).padStart(2, '0')}:{String(timeLeft.seconds).padStart(2, '0')}
                  </div>
                  <div className="text-sm text-gray-300">Time remaining for 75% OFF</div>
                </CardContent>
              </Card>
              
              {/* CTA */}
              <Button 
                onClick={() => setIsOrderFormOpen(true)}
                className="w-full bg-gradient-to-r from-aqua-500 to-achievement-green hover:from-aqua-600 hover:to-achievement-green px-8 py-4 rounded-full text-xl font-bold transition-all duration-300 transform hover:scale-105 achievement-glow"
              >
                🚀 SAVE THE PLANET NOW - ORDER AQUACAFE
              </Button>
              
              {/* Social Proof */}
              <div className="text-center text-sm text-gray-400">
                <span className="text-achievement-green font-bold">127 families</span> ordered today • 
                <span className="text-red-400 font-bold"> Only 23</span> starter kits left this month
              </div>
            </div>
          </div>

          {/* Order Form Modal */}
          {isOrderFormOpen && (
            <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
              <Card className="bg-gray-900 border-gray-700 max-w-md w-full">
                <CardContent className="p-6">
                  <div className="flex justify-between items-center mb-6">
                    <h3 className="text-2xl font-bold">🚀 ACTIVATE HERO MODE</h3>
                    <Button 
                      onClick={() => setIsOrderFormOpen(false)}
                      variant="ghost"
                      size="sm"
                    >
                      ✕
                    </Button>
                  </div>
                  
                  <form onSubmit={handleOrderSubmit} className="space-y-4">
                    <div>
                      <Label htmlFor="name">Hero Name *</Label>
                      <Input
                        id="name"
                        value={orderForm.customerName}
                        onChange={(e) => setOrderForm(prev => ({ ...prev, customerName: e.target.value }))}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="phone">WhatsApp Number *</Label>
                      <Input
                        id="phone"
                        value={orderForm.customerPhone}
                        onChange={(e) => setOrderForm(prev => ({ ...prev, customerPhone: e.target.value }))}
                        placeholder="+971 50 123 4567"
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="address">Dubai Address *</Label>
                      <Input
                        id="address"
                        value={orderForm.customerAddress}
                        onChange={(e) => setOrderForm(prev => ({ ...prev, customerAddress: e.target.value }))}
                        placeholder="Complete address for installation"
                        required
                      />
                    </div>
                    
                    <Button 
                      type="submit" 
                      disabled={orderMutation.isPending}
                      className="w-full bg-gradient-to-r from-aqua-500 to-achievement-green hover:from-aqua-600 hover:to-achievement-green"
                    >
                      {orderMutation.isPending ? "ACTIVATING..." : "🎯 CONFIRM MISSION - AED 99"}
                    </Button>
                  </form>
                  
                  <div className="mt-4 text-xs text-gray-400 text-center">
                    Free installation • 30-day money-back guarantee
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
