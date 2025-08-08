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
  type DroughtRegion,
  type InsertDroughtRegion,
  users, leaderboard, tradeIns, aquacafeOrders, affiliates, communityChallenge, droughtRegions
} from "@shared/schema";
import { db } from "./db";
import { eq, desc, sql } from "drizzle-orm";
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
  getLeaderboard(limit?: number, country?: string): Promise<LeaderboardEntry[]>;
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
  getAllAffiliates(country?: string): Promise<Affiliate[]>;
  getAffiliateByEmail(email: string): Promise<Affiliate | undefined>;
  updateAffiliateNFTRewards(id: string, rewards: { earned: number; distributed: number; communityImpact: number }): Promise<void>;

  // Community Challenge
  getCurrentChallenge(region?: string): Promise<CommunityChallenge | undefined>;
  updateChallengeProgress(amount: number): Promise<void>;

  // Drought Regions
  createDroughtRegion(region: InsertDroughtRegion): Promise<DroughtRegion>;
  getAllDroughtRegions(): Promise<DroughtRegion[]>;
  updateDroughtRegionMetrics(id: string, metrics: { bottlesSaved: number; co2Reduced: number; familiesHelped: number; communityEngagement: number }): Promise<void>;

  // Analytics
  getTotalUsers(country?: string): Promise<number>;
  getTotalBottlesPrevented(country?: string): Promise<number>;
  getGlobalImpactStats(): Promise<{
    totalUsers: number;
    totalBottles: number;
    totalCO2Saved: number;
    countriesActive: number;
    droughtRegionsHelped: number;
  }>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByEmail(email: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.email, email));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async updateUserPoints(id: string, points: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ heroPoints: points })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async updateUserLevel(id: string, level: number): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ heroLevel: level })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async addUserAchievement(id: string, achievement: string): Promise<User | undefined> {
    const [user] = await db
      .update(users)
      .set({ 
        achievements: sql`array_append(${users.achievements}, ${achievement})`
      })
      .where(eq(users.id, id))
      .returning();
    return user || undefined;
  }

  async getLeaderboard(limit: number = 10, country?: string): Promise<LeaderboardEntry[]> {
    let query = db.select().from(leaderboard);
    
    if (country) {
      query = query.innerJoin(users, eq(leaderboard.userId, users.id))
        .where(eq(users.country, country));
    }
    
    const entries = await query
      .orderBy(desc(leaderboard.points))
      .limit(limit);
    
    return entries.map(entry => 'leaderboard' in entry ? entry.leaderboard : entry);
  }

  async updateLeaderboardEntry(userId: string, data: Partial<LeaderboardEntry>): Promise<void> {
    await db
      .insert(leaderboard)
      .values({ 
        userId, 
        familyName: data.familyName || "",
        points: data.points || 0,
        level: data.level || 1,
        ...data 
      })
      .onConflictDoUpdate({
        target: leaderboard.userId,
        set: { ...data, updatedAt: new Date() }
      });
  }

  async createTradeIn(insertTradeIn: InsertTradeIn): Promise<TradeIn> {
    const tradeValue = this.calculateTradeValue(insertTradeIn.deviceModel, insertTradeIn.deviceCondition);
    const impactPoints = this.calculateImpactPoints(insertTradeIn.deviceModel);

    const [tradeIn] = await db
      .insert(tradeIns)
      .values({
        ...insertTradeIn,
        tradeValue,
        impactPoints,
        status: "pending",
      })
      .returning();

    return tradeIn;
  }

  private calculateTradeValue(model: string, condition: string): number {
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
    const [tradeIn] = await db.select().from(tradeIns).where(eq(tradeIns.id, id));
    return tradeIn || undefined;
  }

  async updateTradeInStatus(id: string, status: string): Promise<TradeIn | undefined> {
    const [tradeIn] = await db
      .update(tradeIns)
      .set({ status })
      .where(eq(tradeIns.id, id))
      .returning();
    return tradeIn || undefined;
  }

  async createAquacafeOrder(insertOrder: InsertAquacafeOrder): Promise<AquacafeOrder> {
    const [order] = await db
      .insert(aquacafeOrders)
      .values({
        ...insertOrder,
        orderTotal: 99,
        status: "pending",
        instantRewards: {
          points: 2400,
          badges: ["Water Warrior"],
          bonuses: ["Premium Filter FREE", "30-Day Challenge Active"],
        },
      })
      .returning();

    return order;
  }

  async getAquacafeOrder(id: string): Promise<AquacafeOrder | undefined> {
    const [order] = await db.select().from(aquacafeOrders).where(eq(aquacafeOrders.id, id));
    return order || undefined;
  }

  async getAllOrders(): Promise<AquacafeOrder[]> {
    return await db.select().from(aquacafeOrders);
  }

  async createAffiliate(insertAffiliate: InsertAffiliate): Promise<Affiliate> {
    const [affiliate] = await db
      .insert(affiliates)
      .values({
        ...insertAffiliate,
        commissionRate: 30,
        totalEarnings: 0,
        totalSales: 0,
        nftRewards: { earned: 0, distributed: 0, communityImpact: 0 },
        communitySize: 0,
        isActive: true,
      })
      .returning();

    return affiliate;
  }

  async getAllAffiliates(country?: string): Promise<Affiliate[]> {
    let query = db.select().from(affiliates);
    
    if (country) {
      query = query.where(eq(affiliates.country, country));
    }
    
    return await query;
  }

  async getAffiliateByEmail(email: string): Promise<Affiliate | undefined> {
    const [affiliate] = await db.select().from(affiliates).where(eq(affiliates.email, email));
    return affiliate || undefined;
  }

  async updateAffiliateNFTRewards(id: string, rewards: { earned: number; distributed: number; communityImpact: number }): Promise<void> {
    await db
      .update(affiliates)
      .set({ nftRewards: rewards })
      .where(eq(affiliates.id, id));
  }

  async getCurrentChallenge(region?: string): Promise<CommunityChallenge | undefined> {
    let query = db.select().from(communityChallenge).where(eq(communityChallenge.isActive, true));
    
    if (region) {
      query = query.where(eq(communityChallenge.region, region));
    }
    
    const [challenge] = await query.limit(1);
    return challenge || undefined;
  }

  async updateChallengeProgress(amount: number): Promise<void> {
    const challenge = await this.getCurrentChallenge();
    if (challenge) {
      await db
        .update(communityChallenge)
        .set({ currentAmount: challenge.currentAmount + amount })
        .where(eq(communityChallenge.id, challenge.id));
    }
  }

  async createDroughtRegion(insertRegion: InsertDroughtRegion): Promise<DroughtRegion> {
    const [region] = await db
      .insert(droughtRegions)
      .values({
        ...insertRegion,
        localPartners: 0,
        aquacafeUnits: 0,
        impactMetrics: { bottlesSaved: 0, co2Reduced: 0, familiesHelped: 0, communityEngagement: 0 },
        isActive: true,
      })
      .returning();

    return region;
  }

  async getAllDroughtRegions(): Promise<DroughtRegion[]> {
    return await db.select().from(droughtRegions).where(eq(droughtRegions.isActive, true));
  }

  async updateDroughtRegionMetrics(id: string, metrics: { bottlesSaved: number; co2Reduced: number; familiesHelped: number; communityEngagement: number }): Promise<void> {
    await db
      .update(droughtRegions)
      .set({ impactMetrics: metrics })
      .where(eq(droughtRegions.id, id));
  }

  async getTotalUsers(country?: string): Promise<number> {
    let query = db.select({ count: sql<number>`count(*)` }).from(users);
    
    if (country) {
      query = query.where(eq(users.country, country));
    }
    
    const [result] = await query;
    return result?.count || 0;
  }

  async getTotalBottlesPrevented(country?: string): Promise<number> {
    let query = db.select({ total: sql<number>`sum(${leaderboard.bottlesPrevented})` }).from(leaderboard);
    
    if (country) {
      query = query.innerJoin(users, eq(leaderboard.userId, users.id))
        .where(eq(users.country, country));
    }
    
    const [result] = await query;
    return result?.total || 0;
  }

  async getGlobalImpactStats(): Promise<{
    totalUsers: number;
    totalBottles: number;
    totalCO2Saved: number;
    countriesActive: number;
    droughtRegionsHelped: number;
  }> {
    const [usersResult] = await db.select({ count: sql<number>`count(*)` }).from(users);
    const [bottlesResult] = await db.select({ total: sql<number>`sum(${leaderboard.bottlesPrevented})` }).from(leaderboard);
    const [co2Result] = await db.select({ total: sql<number>`sum(${leaderboard.co2Saved})` }).from(leaderboard);
    const [countriesResult] = await db.select({ count: sql<number>`count(distinct ${users.country})` }).from(users);
    const [droughtRegionsResult] = await db.select({ count: sql<number>`count(*)` }).from(droughtRegions).where(eq(droughtRegions.isActive, true));

    return {
      totalUsers: usersResult?.count || 0,
      totalBottles: bottlesResult?.total || 0,
      totalCO2Saved: co2Result?.total || 0,
      countriesActive: countriesResult?.count || 0,
      droughtRegionsHelped: droughtRegionsResult?.count || 0,
    };
  }
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

// Use DatabaseStorage for production deployment
export const storage = new DatabaseStorage();
