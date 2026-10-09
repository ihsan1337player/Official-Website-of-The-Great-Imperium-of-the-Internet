import { pgTable, serial, text, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod/v4";

export const lawsTable = pgTable("laws", {
  id: serial("id").primaryKey(),
  numeral: text("numeral").notNull(),
  content: text("content").notNull(),
  displayOrder: integer("display_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const insertLawSchema = createInsertSchema(lawsTable).omit({ id: true, createdAt: true });
export type InsertLaw = z.infer<typeof insertLawSchema>;
export type Law = typeof lawsTable.$inferSelect;
