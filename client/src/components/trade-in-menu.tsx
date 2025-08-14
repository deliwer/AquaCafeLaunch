import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Laptop, 
  Tablet, 
  Watch, 
  Headphones, 
  Camera,
  Plus,
  ArrowRight,
  Zap,
  Gift
} from "lucide-react";

interface TradeInDevice {
  id: string;
  category: string;
  icon: any;
  name: string;
  estimatedValue: string;
  impactPoints: number;
  popular?: boolean;
  new?: boolean;
}

const devices: TradeInDevice[] = [
  {
    id: "iphone",
    category: "Smartphones",
    icon: Smartphone,
    name: "iPhone (All Models)",
    estimatedValue: "AED 500 - 3,200",
    impactPoints: 2500,
    popular: true
  },
  {
    id: "android",
    category: "Smartphones", 
    icon: Smartphone,
    name: "Samsung & Android",
    estimatedValue: "AED 200 - 1,800",
    impactPoints: 2000
  },
  {
    id: "macbook",
    category: "Laptops",
    icon: Laptop,
    name: "MacBook Series",
    estimatedValue: "AED 1,200 - 8,500",
    impactPoints: 5000,
    new: true
  },
  {
    id: "laptop",
    category: "Laptops",
    icon: Laptop,
    name: "Windows Laptops",
    estimatedValue: "AED 400 - 4,000",
    impactPoints: 3500
  },
  {
    id: "ipad",
    category: "Tablets",
    icon: Tablet,
    name: "iPad (All Models)",
    estimatedValue: "AED 300 - 2,500",
    impactPoints: 1800
  },
  {
    id: "tablet",
    category: "Tablets",
    icon: Tablet,
    name: "Android Tablets",
    estimatedValue: "AED 150 - 1,200",
    impactPoints: 1500
  },
  {
    id: "apple-watch",
    category: "Wearables",
    icon: Watch,
    name: "Apple Watch",
    estimatedValue: "AED 200 - 1,500",
    impactPoints: 800
  },
  {
    id: "airpods",
    category: "Audio",
    icon: Headphones,
    name: "AirPods & Headphones",
    estimatedValue: "AED 100 - 800",
    impactPoints: 500
  },
  {
    id: "camera",
    category: "Electronics",
    icon: Camera,
    name: "Digital Cameras",
    estimatedValue: "AED 300 - 4,500",
    impactPoints: 2200
  }
];

export default function TradeInMenu() {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [selectedDevice, setSelectedDevice] = useState<TradeInDevice | null>(null);

  const categories = ["all", "Smartphones", "Laptops", "Tablets", "Wearables", "Audio", "Electronics"];
  
  const filteredDevices = selectedCategory === "all" 
    ? devices 
    : devices.filter(device => device.category === selectedCategory);

  const handleDeviceSelect = (device: TradeInDevice) => {
    setSelectedDevice(device);
  };

  return (
    <div className="bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 rounded-lg">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-white mb-2">
            Trade-In Your Device
          </h2>
          <p className="text-slate-300 mb-4">
            Turn your old tech into planet-saving water credits
          </p>
          <Badge variant="outline" className="bg-emerald-900/30 text-emerald-300 border-emerald-400/50">
            <Zap className="h-4 w-4 mr-1" />
            Instant Valuation Available
          </Badge>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => setSelectedCategory(category)}
              className={`
                ${selectedCategory === category 
                  ? "bg-emerald-600 text-white" 
                  : "bg-slate-800 text-slate-300 border-slate-600 hover:bg-slate-700"
                }
              `}
              data-testid={`filter-${category}`}
            >
              {category === "all" ? "All Devices" : category}
            </Button>
          ))}
        </div>

        {/* Device Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
          <AnimatePresence>
            {filteredDevices.map((device, index) => (
              <motion.div
                key={device.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card 
                  className={`
                    bg-slate-800/50 border-slate-700 hover:border-emerald-500/50 
                    transition-all duration-300 cursor-pointer group
                    ${selectedDevice?.id === device.id ? "border-emerald-500 bg-emerald-900/10" : ""}
                  `}
                  onClick={() => handleDeviceSelect(device)}
                  data-testid={`device-${device.id}`}
                >
                  <CardHeader className="pb-3">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center space-x-3">
                        <div className="p-2 bg-emerald-900/30 rounded-lg">
                          <device.icon className="h-6 w-6 text-emerald-400" />
                        </div>
                        <div>
                          <CardTitle className="text-white text-lg">{device.name}</CardTitle>
                          <p className="text-slate-400 text-sm">{device.category}</p>
                        </div>
                      </div>
                      
                      <div className="flex flex-col items-end space-y-1">
                        {device.popular && (
                          <Badge variant="outline" className="bg-orange-900/30 text-orange-300 border-orange-400/50 text-xs">
                            Popular
                          </Badge>
                        )}
                        {device.new && (
                          <Badge variant="outline" className="bg-blue-900/30 text-blue-300 border-blue-400/50 text-xs">
                            New
                          </Badge>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  
                  <CardContent>
                    <div className="space-y-3">
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 text-sm">Estimated Value:</span>
                        <span className="text-emerald-400 font-bold">{device.estimatedValue}</span>
                      </div>
                      
                      <div className="flex justify-between items-center">
                        <span className="text-slate-300 text-sm">Impact Points:</span>
                        <span className="text-blue-400 font-bold">{device.impactPoints.toLocaleString()}</span>
                      </div>
                      
                      <Button 
                        className="w-full bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 group-hover:scale-105 transition-transform"
                        size="sm"
                        data-testid={`get-quote-${device.id}`}
                      >
                        Get Instant Quote
                        <ArrowRight className="h-4 w-4 ml-2" />
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Quick Actions */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="bg-gradient-to-r from-purple-900/20 to-pink-900/20 border-purple-500/30">
            <CardContent className="p-6 text-center">
              <Gift className="h-12 w-12 text-purple-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Trade Multiple Devices</h3>
              <p className="text-purple-200 text-sm mb-4">Get bonus points for bulk trade-ins</p>
              <Button 
                variant="outline" 
                className="bg-purple-900/30 text-purple-300 border-purple-400/50 hover:bg-purple-800/40"
                data-testid="button-bulk-trade"
              >
                <Plus className="h-4 w-4 mr-2" />
                Add More Devices
              </Button>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-r from-orange-900/20 to-red-900/20 border-orange-500/30">
            <CardContent className="p-6 text-center">
              <Zap className="h-12 w-12 text-orange-400 mx-auto mb-4" />
              <h3 className="text-xl font-bold text-white mb-2">Schedule Pickup</h3>
              <p className="text-orange-200 text-sm mb-4">Free doorstep collection service</p>
              <Button 
                variant="outline"
                className="bg-orange-900/30 text-orange-300 border-orange-400/50 hover:bg-orange-800/40"
                data-testid="button-schedule-pickup"
              >
                Book Free Pickup
                <ArrowRight className="h-4 w-4 ml-2" />
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Selected Device Details */}
        <AnimatePresence>
          {selectedDevice && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="mt-8"
            >
              <Card className="bg-emerald-900/10 border-emerald-500/30">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-xl font-bold text-white">
                      Selected: {selectedDevice.name}
                    </h3>
                    <Button
                      onClick={() => setSelectedDevice(null)}
                      variant="ghost"
                      size="sm"
                      className="text-slate-400 hover:text-white"
                    >
                      ×
                    </Button>
                  </div>
                  
                  <div className="grid md:grid-cols-3 gap-4">
                    <div className="text-center">
                      <p className="text-slate-300 text-sm mb-1">Estimated Value</p>
                      <p className="text-emerald-400 text-2xl font-bold">{selectedDevice.estimatedValue}</p>
                    </div>
                    <div className="text-center">
                      <p className="text-slate-300 text-sm mb-1">Impact Points</p>
                      <p className="text-blue-400 text-2xl font-bold">{selectedDevice.impactPoints.toLocaleString()}</p>
                    </div>
                    <div className="text-center">
                      <Button 
                        className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
                        data-testid="button-start-trade"
                      >
                        Start Trade Process
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}