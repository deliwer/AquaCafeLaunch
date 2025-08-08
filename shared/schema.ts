import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  heroLevel: integer("hero_level").default(1),
  heroPoints: integer("hero_points").default(0),
  heroType: text("hero_type"), // Water Guardian, Eco Warrior, Family Protector, Planet Saver
  achievements: jsonb("achievements").$type<string[]>().default([]),
  createdAt: timestamp("created_at").defaultNow(),
});

export const leaderboard = pgTable("leaderboard", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id).notNull(),
  familyName: text("family_name").notNull(),
  points: integer("points").notNull(),
  level: integer("level").notNull(),
  referrals: integer("referrals").default(0),
  bottlesPrevented: integer("bottles_prevented").default(0),
  co2Saved: integer("co2_saved").default(0), // in kg
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const tradeIns = pgTable("trade_ins", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  deviceModel: text("device_model").notNull(),
  deviceCondition: text("device_condition").notNull(),
  tradeValue: integer("trade_value").notNull(), // in AED
  status: text("status").default("pending"), // pending, confirmed, completed
  impactPoints: integer("impact_points").default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const aquacafeOrders = pgTable("aquacafe_orders", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  userId: varchar("user_id").references(() => users.id),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerAddress: text("customer_address").notNull(),
  tradeInId: varchar("trade_in_id").references(() => tradeIns.id),
  orderTotal: integer("order_total").default(99), // AED 99
  status: text("status").default("pending"),
  instantRewards: jsonb("instant_rewards").$type<{
    points: number;
    badges: string[];
    bonuses: string[];
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const affiliates = pgTable("affiliates", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  type: text("type").notNull(), // agent, restaurant
  commissionRate: integer("commission_rate").default(30), // percentage
  totalEarnings: integer("total_earnings").default(0),
  totalSales: integer("total_sales").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const communityChallenge = pgTable("community_challenge", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  targetAmount: integer("target_amount").notNull(),
  currentAmount: integer("current_amount").default(0),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  heroType: true,
});

export const insertTradeInSchema = createInsertSchema(tradeIns).pick({
  deviceModel: true,
  deviceCondition: true,
  userId: true,
});

export const insertAquacafeOrderSchema = createInsertSchema(aquacafeOrders).pick({
  customerName: true,
  customerPhone: true,
  customerAddress: true,
  tradeInId: true,
});

export const insertAffiliateSchema = createInsertSchema(affiliates).pick({
  name: true,
  email: true,
  phone: true,
  type: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertTradeIn = z.infer<typeof insertTradeInSchema>;
export type TradeIn = typeof tradeIns.$inferSelect;

export type InsertAquacafeOrder = z.infer<typeof insertAquacafeOrderSchema>;
export type AquacafeOrder = typeof aquacafeOrders.$inferSelect;

export type InsertAffiliate = z.infer<typeof insertAffiliateSchema>;
export type Affiliate = typeof affiliates.$inferSelect;

export type LeaderboardEntry = typeof leaderboard.$inferSelect;
export type CommunityChallenge = typeof communityChallenge.$inferSelect;
