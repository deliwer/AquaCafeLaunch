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

  const httpServer = createServer(app);
  return httpServer;
}
