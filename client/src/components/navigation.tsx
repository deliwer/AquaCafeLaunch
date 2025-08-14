import { Button } from "@/components/ui/button";

export default function Navigation() {
  return (
    <header className="fixed top-0 w-full bg-gray-900/95 backdrop-blur-sm border-b border-gray-800 z-50">
      <div className="container mx-auto px-4">
        {/* Welcome Bonus Banner */}
        <div className="bg-gradient-to-r from-achievement-gold to-yellow-500 text-gray-900 text-center py-2 text-sm font-medium">
          🎉 Welcome Bonus: Get Bakers Kitchen DH100 meal voucher with your trade-in! Limited time offer.
        </div>
        
        <nav className="flex items-center justify-between py-4">
          <div className="flex items-center space-x-8">
            <div className="text-2xl font-display font-bold text-aqua-500">
              DeliWer <span className="text-xs bg-achievement-purple px-2 py-1 rounded-full">HEROES</span>
            </div>
            <div className="hidden md:flex space-x-6">
              <a href="/aquacafe-plans" className="hover:text-emerald-400 transition-colors">
                AquaCafe Plans
              </a>
              <a href="/loyalty-rewards" className="hover:text-emerald-400 transition-colors">
                Loyalty Rewards
              </a>
              <a href="/impact-calculator" className="hover:text-emerald-400 transition-colors">
                Impact Calculator
              </a>
              <a href="/partnership" className="hover:text-emerald-400 transition-colors">
                Partnership
              </a>
              <a 
                href="#leaderboard"
                onClick={(e) => {
                  e.preventDefault();
                  if (window.location.pathname === '/') {
                    document.getElementById('leaderboard')?.scrollIntoView({ behavior: 'smooth' });
                  } else {
                    window.location.href = '/#leaderboard';
                  }
                }}
                className="hover:text-emerald-400 transition-colors"
              >
                Heroes
              </a>
            </div>
          </div>
          
          {/* User Hero Status */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 bg-gray-800 px-4 py-2 rounded-full">
              <div className="w-8 h-8 bg-gradient-to-r from-aqua-500 to-achievement-green rounded-full flex items-center justify-center">
                <span className="text-xs font-bold">L1</span>
              </div>
              <span className="text-sm">Join Heroes</span>
            </div>
            <Button 
              onClick={() => {
                if (window.location.pathname === '/') {
                  document.getElementById('starter-kit-flow')?.scrollIntoView({ behavior: 'smooth' });
                } else {
                  window.location.href = '/#starter-kit-flow';
                }
              }}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 px-6 py-2 rounded-full font-medium transition-all duration-300 shadow-lg"
            >
              Start Journey
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}
