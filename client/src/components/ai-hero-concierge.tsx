import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Bot, Send, Phone, ShoppingCart, Lightbulb, Sparkles } from "lucide-react";

const iPhoneModels = [
  "iPhone 15 Pro Max",
  "iPhone 15 Pro", 
  "iPhone 15",
  "iPhone 14 Pro Max"
];

interface ChatMessage {
  id: string;
  type: "ai" | "user";
  message: string;
  timestamp: Date;
}

export default function AIHeroConcierge() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: "1",
      type: "ai",
      message: "👋 Welcome, future Planet Hero! I'm here to help you transform your old iPhone into environmental superpowers. What iPhone model do you want to trade?",
      timestamp: new Date()
    }
  ]);

  const handleModelSelect = (model: string) => {
    setSelectedModel(model);
    const userMessage: ChatMessage = {
      id: Date.now().toString(),
      type: "user",
      message: model,
      timestamp: new Date()
    };
    
    const aiResponse: ChatMessage = {
      id: (Date.now() + 1).toString(),
      type: "ai",
      message: `Excellent choice! The ${model} has great trade-in value. Based on current rates, you could get AED 1,400-2,000 depending on condition. Would you like me to calculate your exact trade value?`,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage, aiResponse]);
  };

  return (
    <Card className="bg-gradient-to-br from-indigo-900/20 to-purple-900/20 border-indigo-500/30 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-white flex items-center space-x-2">
          <Bot className="h-6 w-6 text-indigo-400" />
          <span>AI Hero Concierge</span>
          <Badge variant="outline" className="bg-green-900/30 text-green-300 border-green-400/50">
            <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
            Online & Ready
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* AI Avatar and Status */}
        <div className="flex items-center space-x-3 p-3 bg-slate-800/30 rounded-lg border border-indigo-400/30">
          <Avatar className="h-12 w-12">
            <AvatarFallback className="bg-gradient-to-br from-indigo-500 to-purple-500 text-white">
              <Bot className="h-6 w-6" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h4 className="text-white font-semibold">DeliWer AI Hero Concierge</h4>
            <p className="text-indigo-300 text-sm">Online & Ready to Help</p>
          </div>
        </div>

        {/* Chat Interface */}
        <div className="space-y-3 max-h-80 overflow-y-auto">
          <AnimatePresence>
            {messages.map((message) => (
              <motion.div
                key={message.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`max-w-[80%] p-3 rounded-lg ${
                  message.type === 'user' 
                    ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white' 
                    : 'bg-slate-800/50 border border-slate-600/50 text-slate-100'
                }`}>
                  <p className="text-sm">{message.message}</p>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* iPhone Model Selection */}
        {!selectedModel && (
          <div className="grid grid-cols-2 gap-2">
            {iPhoneModels.map((model) => (
              <Button
                key={model}
                onClick={() => handleModelSelect(model)}
                variant="outline"
                className="text-xs p-2 h-auto border-indigo-400/50 text-indigo-300 hover:bg-indigo-900/30"
                data-testid={`button-select-${model.replace(/\s+/g, '-').toLowerCase()}`}
              >
                {model}
              </Button>
            ))}
          </div>
        )}

        {/* Pro Tip */}
        <div className="bg-gradient-to-r from-yellow-900/20 to-orange-900/20 border border-yellow-400/30 rounded-lg p-3">
          <div className="flex items-center space-x-2 mb-2">
            <Lightbulb className="h-4 w-4 text-yellow-400" />
            <span className="text-yellow-300 text-sm font-semibold">💡 Pro tip:</span>
          </div>
          <p className="text-yellow-200 text-sm">
            Mention your phone's condition for more accurate valuation!
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex space-x-2">
          <Button
            className="flex-1 bg-gradient-to-r from-emerald-600 to-blue-600 hover:from-emerald-700 hover:to-blue-700 text-white"
            data-testid="button-book-pickup"
          >
            <Phone className="h-4 w-4 mr-2" />
            Book Pickup
          </Button>
          <Button
            className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white"
            data-testid="button-order-aquacafe"
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Order AquaCafe Kit
          </Button>
        </div>

        {/* Features Badge */}
        <div className="flex justify-center">
          <Badge variant="outline" className="text-indigo-300 border-indigo-400/50">
            <Sparkles className="h-3 w-3 mr-1" />
            AI-Powered Instant Valuation
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}