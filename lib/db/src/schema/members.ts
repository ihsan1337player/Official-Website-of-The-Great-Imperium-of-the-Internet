import { pgTable, text, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const membersTable = pgTable("members", {
  userId: text("user_id").primaryKey(),
  username: text("username").notNull(),
  avatarUrl: text("avatar_url"),
  rank: text("rank").notNull().default("Group Recruit"),
  isAdmin: boolean("is_admin").notNull().default(false),
  isHeadAdmin: boolean("is_head_admin").notNull().default(false),
  isBanned: boolean("is_banned").notNull().default(false),
  bannedAt: timestamp("banned_at", { withTimezone: true }),
  joinedAt: timestamp("joined_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertMemberSchema = createInsertSchema(membersTable).omit({ joinedAt: true });
export type InsertMember = z.infer<typeof insertMemberSchema>;
export type Member = typeof membersTable.$inferSelect;
