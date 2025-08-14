import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { 
  X, 
  ArrowRight, 
  ArrowLeft,
  Smartphone,
  Droplets,
  Trophy,
  Gift,
  MessageSquare,
  Truck,
  CheckCircle,
  Sparkles,
  Target
} from "lucide-react";
import aquaBotImage from "@assets/AquaBOT Aug 8, 2025, 04_06_16 PM_1755138840517.png";

interface TutorialStep {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  icon: any;
  image?: string;
  highlights: string[];
  action: {
    text: string;
    variant: "default" | "outline";
  };
}

const tutorialSteps: TutorialStep[] = [
  {
    id: 1,
    title: "Welcome to DeliWer",
    subtitle: "Dubai's Elite Planet Heroes Program",
    description: "Transform your old devices into premium water filtration systems while becoming an environmental champion.",
    icon: Sparkles,
    image: aquaBotImage,
    highlights: [
      "First 100 Heroes get lifetime double points",
      "Exclusive VIP rewards and recognition",
      "Direct impact on Dubai's sustainability goals"
    ],
    action: {
      text: "Begin Hero Journey",
      variant: "default"
    }
  },
  {
    id: 2,
    title: "Chat with AquaBot",
    subtitle: "AI-Powered Trade Assistant",
    description: "Tell AquaBot your iPhone model and condition. Get instant valuation and water credit calculation.",
    icon: MessageSquare,
    image: aquaBotImage,
    highlights: [
      "Instant device valuation in AED",
      "Real-time impact point calculation", 
      "Smart trade recommendations"
    ],
    action: {
      text: "Try AquaBot Now",
      variant: "default"
    }
  },
  {
    id: 3,
    title: "Schedule Free Pickup",
    subtitle: "Doorstep Collection Service",
    description: "Book a convenient time for our certified technicians to collect your device from your location in Dubai.",
    icon: Truck,
    highlights: [
      "100% secure device handling",
      "Same-day or next-day pickup",
      "Professional verification process"
    ],
    action: {
      text: "Book Pickup Slot",
      variant: "default"
    }
  },
  {
    id: 4,
    title: "Receive Premium Water",
    subtitle: "AquaCafe Filtration System",
    description: "Get your water filtration system delivered the same day or next, plus instant lunch credits for Dubai's best restaurants.",
    icon: Droplets,
    highlights: [
      "Professional installation included",
      "Restaurant partnership credits",
      "Ongoing maintenance support"
    ],
    action: {
      text: "View Water Plans",
      variant: "default"
    }
  },
  {
    id: 5,
    title: "Join the Leaderboard",
    subtitle: "Compete with Dubai's Elite",
    description: "Track your environmental impact, earn achievement badges, and climb the Planet Heroes leaderboard.",
    icon: Trophy,
    highlights: [
      "Real-time impact tracking",
      "Professional networking opportunities", 
      "Exclusive hero events and rewards"
    ],
    action: {
      text: "View Leaderboard",
      variant: "default"
    }
  },
  {
    id: 6,
    title: "You're Ready!",
    subtitle: "Start Your First Trade",
    description: "You now know how to turn your devices into premium water while making a real environmental impact in Dubai.",
    icon: CheckCircle,
    highlights: [
      "AED 99 starter kit available now",
      "20% hero discount on all packages",
      "Founding Hero benefits expire soon"
    ],
    action: {
      text: "Start Trading Now",
      variant: "default"
    }
  }
];

interface OnboardingTutorialProps {
  open: boolean;
  onClose: () => void;
  onComplete: () => void;
}

export default function OnboardingTutorial({ open, onClose, onComplete }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  const handleNext = () => {
    if (isAnimating) return;
    
    if (currentStep < tutorialSteps.length - 1) {
      setIsAnimating(true);
      setCurrentStep(currentStep + 1);
      setTimeout(() => setIsAnimating(false), 300);
    } else {
      onComplete();
      onClose();
    }
  };

  const handlePrev = () => {
    if (isAnimating) return;
    
    if (currentStep > 0) {
      setIsAnimating(true);
      setCurrentStep(currentStep - 1);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const handleSkip = () => {
    onComplete();
    onClose();
  };

  const currentStepData = tutorialSteps[currentStep];

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl bg-slate-900 border-slate-700 text-white p-0 overflow-hidden">
        <div className="relative">
          {/* Close Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={onClose}
            className="absolute top-4 right-4 z-10 text-slate-400 hover:text-white"
            data-testid="button-close-tutorial"
          >
            <X className="h-5 w-5" />
          </Button>

          {/* Progress Bar */}
          <div className="bg-slate-800 px-6 py-3">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-slate-300">
                Step {currentStep + 1} of {tutorialSteps.length}
              </span>
              <Button
                variant="ghost"
                size="sm"
                onClick={handleSkip}
                className="text-slate-400 hover:text-white text-sm"
                data-testid="button-skip-tutorial"
              >
                Skip Tutorial
              </Button>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <motion.div
                className="bg-gradient-to-r from-emerald-500 to-blue-500 h-2 rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep + 1) / tutorialSteps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>

          {/* Content */}
          <div className="p-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid lg:grid-cols-2 gap-8 items-center">
                  {/* Text Content */}
                  <div className="space-y-6">
                    <div>
                      <Badge variant="outline" className="bg-emerald-900/30 text-emerald-300 border-emerald-400/50 mb-3">
                        <currentStepData.icon className="h-4 w-4 mr-2" />
                        Tutorial Step
                      </Badge>
                      <h2 className="text-3xl font-bold text-white mb-2">
                        {currentStepData.title}
                      </h2>
                      <p className="text-emerald-400 font-semibold text-lg">
                        {currentStepData.subtitle}
                      </p>
                    </div>

                    <p className="text-slate-300 text-lg leading-relaxed">
                      {currentStepData.description}
                    </p>

                    {/* Highlights */}
                    <div className="space-y-3">
                      {currentStepData.highlights.map((highlight, index) => (
                        <motion.div
                          key={index}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.1 }}
                          className="flex items-start space-x-3"
                        >
                          <CheckCircle className="h-5 w-5 text-emerald-400 mt-0.5 flex-shrink-0" />
                          <span className="text-slate-200">{highlight}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA Button */}
                    <Button
                      variant={currentStepData.action.variant}
                      className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 px-6"
                      data-testid={`tutorial-action-${currentStep}`}
                    >
                      {currentStepData.action.text}
                      <ArrowRight className="h-4 w-4 ml-2" />
                    </Button>
                  </div>

                  {/* Visual Content */}
                  <div className="flex justify-center">
                    {currentStepData.image ? (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="relative"
                      >
                        <img
                          src={currentStepData.image}
                          alt={currentStepData.title}
                          className="max-w-full h-auto rounded-lg shadow-2xl"
                        />
                        <div className="absolute inset-0 bg-gradient-to-r from-emerald-600/20 to-blue-600/20 rounded-lg" />
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.4 }}
                        className="w-64 h-64 flex items-center justify-center"
                      >
                        <Card className="w-full h-full bg-gradient-to-br from-emerald-900/30 to-blue-900/30 border-emerald-500/30">
                          <CardContent className="flex items-center justify-center h-full">
                            <currentStepData.icon className="h-24 w-24 text-emerald-400" />
                          </CardContent>
                        </Card>
                      </motion.div>
                    )}
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="bg-slate-800 px-8 py-4 flex items-center justify-between">
            <Button
              variant="outline"
              onClick={handlePrev}
              disabled={currentStep === 0 || isAnimating}
              className="bg-slate-700 border-slate-600 text-slate-300 hover:bg-slate-600"
              data-testid="button-prev-step"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Previous
            </Button>

            <div className="flex space-x-2">
              {tutorialSteps.map((_, index) => (
                <button
                  key={index}
                  onClick={() => !isAnimating && setCurrentStep(index)}
                  className={`w-2 h-2 rounded-full transition-colors ${
                    index === currentStep 
                      ? "bg-emerald-500" 
                      : index < currentStep 
                        ? "bg-emerald-600/50"
                        : "bg-slate-600"
                  }`}
                  data-testid={`step-indicator-${index}`}
                />
              ))}
            </div>

            <Button
              onClick={handleNext}
              disabled={isAnimating}
              className="bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700"
              data-testid="button-next-step"
            >
              {currentStep === tutorialSteps.length - 1 ? "Get Started" : "Next"}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}