import { z } from "zod";

// Contact form validation schema
export const insertContactSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  contactNo: z.string()
    .min(10, "Contact number must be at least 10 digits")
    .max(15, "Contact number must not exceed 15 digits")
    .regex(/^[0-9+\s\-()]*$/, "Contact number can only contain digits, spaces, dashes, parentheses, and +"),
  message: z.string().min(1, "Message is required"),
  serviceType: z.enum(["reel", "full-length", "other"]).optional(),
  serviceOption: z.string().optional(),
});

export type InsertContact = z.infer<typeof insertContactSchema>;

// Project and service types for frontend (hardcoded data)
export interface Project {
  id: number;
  title: string;
  description: string;
  category: 'reel' | 'full-length';
  videoUrl: string;
  thumbnailUrl: string;
  tags: string[];
}

export interface ServicePackage {
  id: number;
  name: string;
  description: string;
  category: 'reel' | 'full-length';
  features: string[];
}
