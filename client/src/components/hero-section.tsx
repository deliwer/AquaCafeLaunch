import { useState } from "react";
import { Button } from "@/components/ui/button";
import ImpactSimulator from "./impact-simulator";

export default function HeroSection() {
  const [selectedDevice, setSelectedDevice] = useState("iPhone 13 Pro");

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-24">
      {/* Dubai Skyline Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-hero-blue-900 to-gray-900"></div>
      <div className="absolute inset-0 hero-pattern opacity-20"></div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Mission Title */}
          <div className="mb-8">
            <div className="inline-flex items-center bg-gradient-to-r from-aqua-500/20 to-achievement-green/20 border border-aqua-500/30 rounded-full px-6 py-3 mb-6">
              <span className="text-aqua-500 mr-2">🌟</span>
              <span className="text-sm font-medium">WELCOME TO MISSION: SAVE DUBAI 2030</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6">
              Dubai's First <span className="text-transparent bg-clip-text bg-gradient-to-r from-aqua-500 to-achievement-green">iPhone-to-Water</span> Trade Service
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 mb-8">
              Get <strong className="text-aqua-500">AED 1000+</strong> <strong className="text-achievement-gold">CASHBACK</strong> in filtered water systems + meal vouchers | Free pickup anywhere in Dubai with instant WhatsApp valuation.
            </p>
          </div>
          
          {/* Impact Simulator */}
          <ImpactSimulator selectedDevice={selectedDevice} onDeviceChange={setSelectedDevice} />
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="bg-gradient-to-r from-aqua-500 to-achievement-green hover:from-aqua-600 hover:to-achievement-green px-8 py-4 rounded-full text-lg font-bold transition-all duration-300 transform hover:scale-105 achievement-glow">
              ⚡ ACTIVATE HERO MODE
            </Button>
            <Button variant="outline" className="bg-gray-800 hover:bg-gray-700 border border-gray-600 px-8 py-4 rounded-full text-lg font-medium transition-colors">
              👥 JOIN 12,847 HEROES
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
