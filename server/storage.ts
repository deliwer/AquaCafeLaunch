import {
  type User,
  type InsertUser,
  type TradeIn,
  type InsertTradeIn,
  type AquacafeOrder,
  type InsertAquacafeOrder,
  type Affiliate,
  type InsertAffiliate,
  type LeaderboardEntry,
  type CommunityChallenge,
} from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  // Users
  getUser(id: string): Promise<User | undefined>;
  getUserByEmail(email: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUserPoints(id: string, points: number): Promise<User | undefined>;
  updateUserLevel(id: string, level: number): Promise<User | undefined>;
  addUserAchievement(id: string, achievement: string): Promise<User | undefined>;

  // Leaderboard
  getLeaderboard(limit?: number): Promise<LeaderboardEntry[]>;
  updateLeaderboardEntry(userId: string, data: Partial<LeaderboardEntry>): Promise<void>;

  // Trade-ins
  createTradeIn(tradeIn: InsertTradeIn): Promise<TradeIn>;
  getTradeIn(id: string): Promise<TradeIn | undefined>;
  updateTradeInStatus(id: string, status: string): Promise<TradeIn | undefined>;

  // AquaCafe Orders
  createAquacafeOrder(order: InsertAquacafeOrder): Promise<AquacafeOrder>;
  getAquacafeOrder(id: string): Promise<AquacafeOrder | undefined>;
  getAllOrders(): Promise<AquacafeOrder[]>;

  // Affiliates
  createAffiliate(affiliate: InsertAffiliate): Promise<Affiliate>;
  getAllAffiliates(): Promise<Affiliate[]>;
  getAffiliateByEmail(email: string): Promise<Affiliate | undefined>;

  // Community Challenge
  getCurrentChallenge(): Promise<CommunityChallenge | undefined>;
  updateChallengeProgress(amount: number): Promise<void>;

  // Analytics
  getTotalUsers(): Promise<number>;
  getTotalBottlesPrevented(): Promise<number>;
}

export class MemStorage implements IStorage {
  private users: Map<string, User>;
  private leaderboard: Map<string, LeaderboardEntry>;
  private tradeIns: Map<string, TradeIn>;
  private aquacafeOrders: Map<string, AquacafeOrder>;
  private affiliates: Map<string, Affiliate>;
  private challenges: Map<string, CommunityChallenge>;

  constructor() {
    this.users = new Map();
    this.leaderboard = new Map();
    this.tradeIns = new Map();
    this.aquacafeOrders = new Map();
    this.affiliates = new Map();
    this.challenges = new Map();

    // Initialize sample data for demo
    this.initializeSampleData();
  }

  private initializeSampleData() {
    // Sample leaderboard entries
    const sampleEntries = [
      {
        id: randomUUID(),
        userId: "user-1",
        familyName: "Al-Maktoum Family",
        points: 47200,
        level: 5,
        referrals: 12,
        bottlesPrevented: 15000,
        co2Saved: 7500,
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        userId: "user-2",
        familyName: "Singh Family",
        points: 43800,
        level: 4,
        referrals: 9,
        bottlesPrevented: 12000,
        co2Saved: 6000,
        updatedAt: new Date(),
      },
      {
        id: randomUUID(),
        userId: "user-3",
        familyName: "Johnson Family",
        points: 41200,
        level: 3,
        referrals: 7,
        bottlesPrevented: 10000,
        co2Saved: 5000,
        updatedAt: new Date(),
      },
    ];

    sampleEntries.forEach((entry) => {
      this.leaderboard.set(entry.id, entry);
    });

    // Current community challenge
    const currentChallenge: CommunityChallenge = {
      id: randomUUID(),
      title: "1 MILLION BOTTLES PREVENTED BY RAMADAN",
      description: "Join Dubai's biggest environmental mission",
      targetAmount: 1000000,
      currentAmount: 800000,
      endDate: new Date(Date.now() + 23 * 24 * 60 * 60 * 1000), // 23 days from now
      isActive: true,
      createdAt: new Date(),
    };

    this.challenges.set(currentChallenge.id, currentChallenge);
  }

  async getUser(id: string): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find((user) => user.email === email);
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = randomUUID();
    const user: User = {
      ...insertUser,
      id,
      heroLevel: 1,
      heroPoints: 0,
      achievements: [],
      createdAt: new Date(),
    };
    this.users.set(id, user);
    return user;
  }

  async updateUserPoints(id: string, points: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      user.heroPoints = points;
      this.users.set(id, user);
    }
    return user;
  }

  async updateUserLevel(id: string, level: number): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      user.heroLevel = level;
      this.users.set(id, user);
    }
    return user;
  }

  async addUserAchievement(id: string, achievement: string): Promise<User | undefined> {
    const user = this.users.get(id);
    if (user) {
      user.achievements = [...(user.achievements || []), achievement];
      this.users.set(id, user);
    }
    return user;
  }

  async getLeaderboard(limit: number = 10): Promise<LeaderboardEntry[]> {
    const entries = Array.from(this.leaderboard.values());
    return entries
      .sort((a, b) => b.points - a.points)
      .slice(0, limit);
  }

  async updateLeaderboardEntry(userId: string, data: Partial<LeaderboardEntry>): Promise<void> {
    const existingEntry = Array.from(this.leaderboard.values()).find(
      (entry) => entry.userId === userId
    );

    if (existingEntry) {
      const updated = { ...existingEntry, ...data, updatedAt: new Date() };
      this.leaderboard.set(existingEntry.id, updated);
    }
  }

  async createTradeIn(insertTradeIn: InsertTradeIn): Promise<TradeIn> {
    const id = randomUUID();
    const tradeValue = this.calculateTradeValue(insertTradeIn.deviceModel, insertTradeIn.deviceCondition);
    const impactPoints = this.calculateImpactPoints(insertTradeIn.deviceModel);

    const tradeIn: TradeIn = {
      ...insertTradeIn,
      id,
      tradeValue,
      impactPoints,
      status: "pending",
      createdAt: new Date(),
    };

    this.tradeIns.set(id, tradeIn);
    return tradeIn;
  }

  private calculateTradeValue(model: string, condition: string): number {
    // Base values for different iPhone models
    const baseValues: Record<string, number> = {
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

    const baseValue = baseValues[model] || 500;
    const multiplier = conditionMultiplier[condition.toLowerCase()] || 0.5;

    return Math.round(baseValue * multiplier);
  }

  private calculateImpactPoints(model: string): number {
    // Impact points based on device model
    const pointsMap: Record<string, number> = {
      "iPhone 15": 2800,
      "iPhone 14": 2600,
      "iPhone 13": 2400,
      "iPhone 12": 2200,
      "iPhone 11": 2000,
    };

    return pointsMap[model] || 1500;
  }

  async getTradeIn(id: string): Promise<TradeIn | undefined> {
    return this.tradeIns.get(id);
  }

  async updateTradeInStatus(id: string, status: string): Promise<TradeIn | undefined> {
    const tradeIn = this.tradeIns.get(id);
    if (tradeIn) {
      tradeIn.status = status;
      this.tradeIns.set(id, tradeIn);
    }
    return tradeIn;
  }

  async createAquacafeOrder(insertOrder: InsertAquacafeOrder): Promise<AquacafeOrder> {
    const id = randomUUID();
    const order: AquacafeOrder = {
      ...insertOrder,
      id,
      orderTotal: 99,
      status: "pending",
      instantRewards: {
        points: 2400,
        badges: ["Water Warrior"],
        bonuses: ["Premium Filter FREE", "30-Day Challenge Active"],
      },
      createdAt: new Date(),
    };

    this.aquacafeOrders.set(id, order);
    return order;
  }

  async getAquacafeOrder(id: string): Promise<AquacafeOrder | undefined> {
    return this.aquacafeOrders.get(id);
  }

  async getAllOrders(): Promise<AquacafeOrder[]> {
    return Array.from(this.aquacafeOrders.values());
  }

  async createAffiliate(insertAffiliate: InsertAffiliate): Promise<Affiliate> {
    const id = randomUUID();
    const affiliate: Affiliate = {
      ...insertAffiliate,
      id,
      commissionRate: 30,
      totalEarnings: 0,
      totalSales: 0,
      isActive: true,
      createdAt: new Date(),
    };

    this.affiliates.set(id, affiliate);
    return affiliate;
  }

  async getAllAffiliates(): Promise<Affiliate[]> {
    return Array.from(this.affiliates.values());
  }

  async getAffiliateByEmail(email: string): Promise<Affiliate | undefined> {
    return Array.from(this.affiliates.values()).find((affiliate) => affiliate.email === email);
  }

  async getCurrentChallenge(): Promise<CommunityChallenge | undefined> {
    return Array.from(this.challenges.values()).find((challenge) => challenge.isActive);
  }

  async updateChallengeProgress(amount: number): Promise<void> {
    const challenge = await this.getCurrentChallenge();
    if (challenge) {
      challenge.currentAmount += amount;
      this.challenges.set(challenge.id, challenge);
    }
  }

  async getTotalUsers(): Promise<number> {
    return this.users.size;
  }

  async getTotalBottlesPrevented(): Promise<number> {
    const entries = Array.from(this.leaderboard.values());
    return entries.reduce((total, entry) => total + entry.bottlesPrevented, 0);
  }
}

export const storage = new MemStorage();
