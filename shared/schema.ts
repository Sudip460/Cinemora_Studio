import { z } from "zod";

// Contact form validation schema
export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  message: z.string().min(1, "Message is required"),
  serviceType: z.enum(["reel", "full-length", "other"]).optional(),
});

export type InsertContact = z.infer<typeof insertContactSchema>;

// Project and pricing types for frontend (hardcoded data)
export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'reel' | 'full-length';
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
}

export interface PricingPackage {
  id: number;
  name: string;
  price: string;
  description: string;
  category: 'reel' | 'full-length';
  features: string[];
  isPopular: boolean;
}
