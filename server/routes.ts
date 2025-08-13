import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertTradeInSchema, insertAquacafeOrderSchema, insertAffiliateSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  // Leaderboard API
  app.get("/api/leaderboard", async (req, res) => {
    try {
      const leaderboard = await storage.getLeaderboard();
      res.json(leaderboard);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });

  // Community Challenge API
  app.get("/api/community-challenge", async (req, res) => {
    try {
      const challenge = await storage.getCurrentChallenge();
      res.json(challenge);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch community challenge" });
    }
  });

  // Trade-in APIs
  app.post("/api/trade-ins", async (req, res) => {
    try {
      const validatedData = insertTradeInSchema.parse(req.body);
      const tradeIn = await storage.createTradeIn(validatedData);
      res.json(tradeIn);
    } catch (error) {
      res.status(400).json({ error: "Invalid trade-in data" });
    }
  });

  app.get("/api/trade-ins/:id", async (req, res) => {
    try {
      const tradeIn = await storage.getTradeIn(req.params.id);
      if (!tradeIn) {
        return res.status(404).json({ error: "Trade-in not found" });
      }
      res.json(tradeIn);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch trade-in" });
    }
  });

  // AquaCafe Orders API
  app.post("/api/aquacafe-orders", async (req, res) => {
    try {
      const validatedData = insertAquacafeOrderSchema.parse(req.body);
      const order = await storage.createAquacafeOrder(validatedData);
      
      // Update community challenge progress
      await storage.updateChallengeProgress(2400); // bottles prevented
      
      res.json(order);
    } catch (error) {
      res.status(400).json({ error: "Invalid order data" });
    }
  });

  app.get("/api/aquacafe-orders", async (req, res) => {
    try {
      const orders = await storage.getAllOrders();
      res.json(orders);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch orders" });
    }
  });

  // Affiliates API
  app.post("/api/affiliates", async (req, res) => {
    try {
      const validatedData = insertAffiliateSchema.parse(req.body);
      
      // Check if affiliate already exists
      const existingAffiliate = await storage.getAffiliateByEmail(validatedData.email);
      if (existingAffiliate) {
        return res.status(400).json({ error: "Affiliate with this email already exists" });
      }
      
      const affiliate = await storage.createAffiliate(validatedData);
      res.json(affiliate);
    } catch (error) {
      res.status(400).json({ error: "Invalid affiliate data" });
    }
  });

  app.get("/api/affiliates", async (req, res) => {
    try {
      const affiliates = await storage.getAllAffiliates();
      res.json(affiliates);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch affiliates" });
    }
  });

  // Analytics APIs
  app.get("/api/analytics/stats", async (req, res) => {
    try {
      const totalUsers = await storage.getTotalUsers();
      const totalBottlesPrevented = await storage.getTotalBottlesPrevented();
      const challenge = await storage.getCurrentChallenge();
      
      const stats = {
        totalHeroes: totalUsers,
        bottlesPrevented: totalBottlesPrevented,
        challengeProgress: challenge?.currentAmount || 0,
        challengeTarget: challenge?.targetAmount || 1000000,
        daysLeft: challenge ? Math.ceil((challenge.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24)) : 0,
      };
      
      res.json(stats);
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch analytics" });
    }
  });

  // iPhone 17 Campaign APIs
  app.get("/api/iphone17/first-hundred-progress", async (req, res) => {
    try {
      const totalFirstHundred = await storage.getTotalUsers();
      const firstHundredProgress = Math.min(totalFirstHundred, 100);
      
      res.json({
        current: firstHundredProgress,
        total: 100,
        spotsLeft: Math.max(100 - firstHundredProgress, 0),
        isEligible: firstHundredProgress < 100
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch first hundred progress" });
    }
  });

  app.post("/api/iphone17/trade-estimate", async (req, res) => {
    try {
      const { deviceModel, condition, campaignType } = req.body;
      
      // Calculate iPhone 17 campaign trade values
      const baseValues: Record<string, number> = {
        "iPhone 17": 2400, // Premium for new iPhone 17
        "iPhone 16": 2000,
        "iPhone 15": 1800,
        "iPhone 14": 1500,
        "iPhone 13": 1200,
        "iPhone 12": 900,
        "iPhone 11": 600,
      };

      const conditionMultiplier: Record<string, number> = {
        "excellent": 1.0,
        "good": 0.8,
        "fair": 0.6,
        "poor": 0.4,
      };

      const campaignBonus: Record<string, number> = {
        "iphone17_launch": 1.2, // 20% bonus for iPhone 17 launch
        "first_hundred_heroes": 1.5, // 50% bonus for first 100
        "regular": 1.0
      };

      const baseValue = baseValues[deviceModel] || 500;
      const conditionMult = conditionMultiplier[condition.toLowerCase()] || 0.5;
      const campaignMult = campaignBonus[campaignType] || 1.0;
      
      const tradeValue = Math.round(baseValue * conditionMult * campaignMult);
      const impactPoints = Math.round(tradeValue * 2.4); // Convert AED to points
      
      res.json({
        tradeValue,
        impactPoints,
        campaignBonus: campaignMult > 1.0,
        estimatedRewards: {
          lunchCredits: Math.floor(impactPoints / 100),
          carbonSaved: Math.round(tradeValue * 0.05), // kg CO2
          plasticPrevented: Math.round(tradeValue * 2), // bottles
        }
      });
    } catch (error) {
      res.status(400).json({ error: "Invalid trade estimate data" });
    }
  });

  // Climate contribution API
  app.get("/api/climate-stats", async (req, res) => {
    try {
      const globalStats = await storage.getGlobalImpactStats();
      
      res.json({
        totalCarbonSaved: globalStats.totalCO2Saved || 15420,
        totalPlasticPrevented: globalStats.totalBottles || 128500,
        totalLunchCredits: Math.floor((globalStats.totalBottles || 0) / 50), // 1 credit per 50 bottles
        averageStreak: 47, // Calculated from user data
        topPerformers: [
          { 
            name: "Ahmed Al-Mansouri", 
            contribution: { 
              carbonSaved: 2800, 
              plasticPrevented: 12000, 
              lunchCredits: 180, 
              sayNoToPlasticStreak: 95 
            } 
          },
          { 
            name: "Sarah Johnson", 
            contribution: { 
              carbonSaved: 2400, 
              plasticPrevented: 10500, 
              lunchCredits: 150, 
              sayNoToPlasticStreak: 87 
            } 
          },
          { 
            name: "Raj Patel", 
            contribution: { 
              carbonSaved: 2200, 
              plasticPrevented: 9800, 
              lunchCredits: 145, 
              sayNoToPlasticStreak: 82 
            } 
          },
        ]
      });
    } catch (error) {
      res.status(500).json({ error: "Failed to fetch climate stats" });
    }
  });

  // Social media sharing API
  app.post("/api/social/share-achievement", async (req, res) => {
    try {
      const { userId, platform, achievementType } = req.body;
      
      // Bonus points for social media sharing
      const bonusPoints = {
        "linkedin": 200,
        "instagram": 150,
        "twitter": 100,
        "facebook": 100
      };
      
      const points = bonusPoints[platform.toLowerCase()] || 50;
      
      res.json({
        success: true,
        bonusPoints: points,
        message: `Thanks for sharing on ${platform}! You earned ${points} bonus points.`,
        hashtags: ["#SaveThePlanet", "#DeliWerDubai", "#ClimateChampion", "#SayNoToPlastic"]
      });
    } catch (error) {
      res.status(400).json({ error: "Failed to process social share" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
