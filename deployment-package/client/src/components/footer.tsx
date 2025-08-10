import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

export default function Footer() {
  const handleShare = (platform: string) => {
    const text = "I just became a Planet Hero and saved 2,400 plastic bottles! Can you beat my environmental impact score? 🌍⚡ #DubaiPlanetHeroes #AquaCafe";
    const url = window.location.href;
    
    if (platform === 'whatsapp') {
      window.open(`https://wa.me/?text=${encodeURIComponent(text + ' ' + url)}`, '_blank');
    } else if (platform === 'instagram') {
      // For Instagram, we'll copy to clipboard since direct sharing requires app integration
      navigator.clipboard.writeText(text);
      alert('Achievement text copied! Paste it in your Instagram story or post.');
    }
  };

  return (
    <footer className="bg-gray-900 border-t border-gray-800 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Achievement Sharing */}
          <div className="text-center mb-12">
            <h3 className="text-2xl font-bold mb-4">🎉 SHARE YOUR PLANET HERO ACHIEVEMENT</h3>
            <Card className="bg-gradient-to-r from-aqua-500/10 to-achievement-green/10 border-aqua-500/30 max-w-2xl mx-auto">
              <CardContent className="p-8">
                <div className="text-lg mb-4">
                  "I just became a Planet Hero and saved 2,400 plastic bottles! Can you beat my environmental impact score? 🌍⚡"
                </div>
                <div className="text-sm text-gray-400 mb-6">#DubaiPlanetHeroes #AquaCafe</div>
                <div className="flex gap-4 justify-center">
                  <Button 
                    onClick={() => handleShare('whatsapp')}
                    className="bg-green-600 hover:bg-green-700 px-6 py-2 rounded-full transition-colors"
                  >
                    Share on WhatsApp
                  </Button>
                  <Button 
                    onClick={() => handleShare('instagram')}
                    className="bg-pink-600 hover:bg-pink-700 px-6 py-2 rounded-full transition-colors"
                  >
                    Share on Instagram
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
          
          {/* Footer Links */}
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="text-2xl font-display font-bold text-aqua-500 mb-4">DeliWer</div>
              <p className="text-gray-400 text-sm">
                Dubai's first iPhone-to-water trade service. Join the planet heroes saving Dubai's environment one trade at a time.
              </p>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Planet Hero Program</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-aqua-500 transition-colors">How It Works</a></li>
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Achievement System</a></li>
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Leaderboard</a></li>
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Community Challenges</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">AquaCafe</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Starter Kit</a></li>
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Installation</a></li>
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Maintenance</a></li>
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Loyalty Rewards</a></li>
              </ul>
            </div>
            
            <div>
              <h4 className="font-bold mb-4">Partners</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Become Agent</a></li>
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Restaurant Partners</a></li>
                <li><a href="#" className="hover:text-aqua-500 transition-colors">AI Marketing Tools</a></li>
                <li><a href="#" className="hover:text-aqua-500 transition-colors">Support</a></li>
              </ul>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
            <div className="text-sm text-gray-400 mb-4 md:mb-0">
              © 2025 DeliWer. All rights reserved. Made with 💚 for Dubai's sustainable future.
            </div>
            <div className="text-sm text-gray-400">
              <span className="text-aqua-500 font-bold">12,847</span> Planet Heroes and counting!
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
