import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Home from "@/pages/home";
import AquaCafePlans from "@/pages/aquacafe-plans";
import LoyaltyRewards from "@/pages/loyalty-rewards";
import ImpactCalculator from "@/pages/impact-calculator";
import Partnership from "@/pages/partnership";
import NotFound from "@/pages/not-found";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/aquacafe-plans" component={AquaCafePlans} />
      <Route path="/loyalty-rewards" component={LoyaltyRewards} />
      <Route path="/impact-calculator" component={ImpactCalculator} />
      <Route path="/partnership" component={Partnership} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <div className="min-h-screen bg-background">
          <Toaster />
          <Router />
        </div>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;
