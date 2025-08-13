import { sql, relations } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  username: text("username").notNull().unique(),
  email: text("email").notNull().unique(),
  country: text("country").notNull().default("AE"), // ISO country code
  city: text("city").notNull().default("Dubai"),
  heroLevel: integer("hero_level").default(1),
  heroPoints: integer("hero_points").default(0),
  heroType: text("hero_type"), // Water Guardian, Eco Warrior, Family Protector, Planet Saver
  achievements: jsonb("achievements").$type<string[]>().default([]),
  nftWallet: text("nft_wallet"), // For NFT-based rewards
  isFirstHundredHero: boolean("is_first_hundred_hero").default(false),
  climateContribution: jsonb("climate_contribution").$type<{
    carbonSaved: number; // kg CO2
    plasticPrevented: number; // bottles
    lunchCredits: number; // free lunches earned
    sayNoToPlasticStreak: number; // consecutive days
  }>().default({ carbonSaved: 0, plasticPrevented: 0, lunchCredits: 0, sayNoToPlasticStreak: 0 }),
  socialMediaShares: integer("social_media_shares").default(0),
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
  campaignType: text("campaign_type").default("regular"), // regular, iphone17_launch, first_hundred_heroes
  kangenUpgrade: boolean("kangen_upgrade").default(false), // K8 Kangen Water upgrade
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
  country: text("country").notNull().default("AE"), // ISO country code
  city: text("city").notNull().default("Dubai"),
  type: text("type").notNull(), // agent, restaurant, community_leader, drought_region_partner
  commissionRate: integer("commission_rate").default(30), // percentage
  totalEarnings: integer("total_earnings").default(0),
  totalSales: integer("total_sales").default(0),
  nftRewards: jsonb("nft_rewards").$type<{
    earned: number;
    distributed: number;
    communityImpact: number;
  }>().default({ earned: 0, distributed: 0, communityImpact: 0 }),
  communitySize: integer("community_size").default(0),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

export const communityChallenge = pgTable("community_challenge", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  title: text("title").notNull(),
  description: text("description"),
  region: text("region").default("global"), // global, drought_regions, specific_country
  targetAmount: integer("target_amount").notNull(),
  currentAmount: integer("current_amount").default(0),
  endDate: timestamp("end_date").notNull(),
  isActive: boolean("is_active").default(true),
  urgencyLevel: integer("urgency_level").default(1), // 1-5 scale for drought/climate urgency
  challengeType: text("challenge_type").default("general"), // general, iphone17_launch, first_hundred_heroes, save_planet_bucket
  rewards: jsonb("rewards").$type<{
    heroPoints: number;
    badges: string[];
    lunchCredits: number;
    kangenUpgrade: boolean;
    socialMediaBonus: number;
  }>(),
  createdAt: timestamp("created_at").defaultNow(),
});

// Add new table for regional drought awareness
export const droughtRegions = pgTable("drought_regions", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  country: text("country").notNull(),
  region: text("region").notNull(),
  severityLevel: integer("severity_level").notNull(), // 1-5 scale
  populationAffected: integer("population_affected").notNull(),
  waterScarcityIndex: integer("water_scarcity_index").notNull(), // 1-100
  localPartners: integer("local_partners").default(0),
  aquacafeUnits: integer("aquacafe_units").default(0),
  impactMetrics: jsonb("impact_metrics").$type<{
    bottlesSaved: number;
    co2Reduced: number;
    familiesHelped: number;
    communityEngagement: number;
  }>().default({ bottlesSaved: 0, co2Reduced: 0, familiesHelped: 0, communityEngagement: 0 }),
  isActive: boolean("is_active").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const usersRelations = relations(users, ({ many }) => ({
  tradeIns: many(tradeIns),
  aquacafeOrders: many(aquacafeOrders),
}));

export const affiliatesRelations = relations(affiliates, ({ many }) => ({
  // Relations can be added for referrals, community members etc.
}));

export const tradeInsRelations = relations(tradeIns, ({ one }) => ({
  user: one(users, {
    fields: [tradeIns.userId],
    references: [users.id],
  }),
}));

export const aquacafeOrdersRelations = relations(aquacafeOrders, ({ one }) => ({
  user: one(users, {
    fields: [aquacafeOrders.userId],
    references: [users.id],
  }),
  tradeIn: one(tradeIns, {
    fields: [aquacafeOrders.tradeInId],
    references: [tradeIns.id],
  }),
}));

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  email: true,
  country: true,
  city: true,
  heroType: true,
  nftWallet: true,
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
  country: true,
  city: true,
  type: true,
});

export const insertDroughtRegionSchema = createInsertSchema(droughtRegions).pick({
  country: true,
  region: true,
  severityLevel: true,
  populationAffected: true,
  waterScarcityIndex: true,
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
export type DroughtRegion = typeof droughtRegions.$inferSelect;
export type InsertDroughtRegion = z.infer<typeof insertDroughtRegionSchema>;
