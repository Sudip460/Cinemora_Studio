import { pgTable, text, serial, integer, boolean, jsonb } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'reel' or 'full-length'
  videoUrl: text("video_url").notNull(),
  thumbnailUrl: text("thumbnail_url").notNull(),
  tags: text("tags").array(),
});

export const pricingPackages = pgTable("pricing_packages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: text("price").notNull(),
  description: text("description").notNull(),
  category: text("category").notNull(), // 'reel' or 'full-length'
  features: text("features").array().notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  message: text("message").notNull(),
  serviceType: text("service_type"), // 'reel' or 'full-length' or 'other'
});

export const insertProjectSchema = createInsertSchema(projects).omit({ id: true });
export const insertPricingSchema = createInsertSchema(pricingPackages).omit({ id: true });
export const insertContactSchema = createInsertSchema(contacts).omit({ id: true });

export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
export type PricingPackage = typeof pricingPackages.$inferSelect;
export type InsertPricing = z.infer<typeof insertPricingSchema>;
export type Contact = typeof contacts.$inferSelect;
export type InsertContact = z.infer<typeof insertContactSchema>;
