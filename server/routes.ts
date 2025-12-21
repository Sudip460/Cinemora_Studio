import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const category = req.query.category as 'reel' | 'full-length' | undefined;
    const projects = await storage.getProjects(category);
    res.json(projects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const project = await storage.getProject(Number(req.params.id));
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  // Pricing
  app.get(api.pricing.list.path, async (req, res) => {
    const category = req.query.category as 'reel' | 'full-length' | undefined;
    const pkgs = await storage.getPricingPackages(category);
    res.json(pkgs);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);
      const contact = await storage.createContact(input);
      res.status(201).json(contact);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingProjects = await storage.getProjects();
  if (existingProjects.length === 0) {
    // Seed Projects
    const projects = [
      {
        title: "Neon City Drift",
        description: "High-energy automotive cinematic reel featuring underground racing scenes.",
        category: "reel",
        videoUrl: "https://example.com/video1",
        thumbnailUrl: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?q=80&w=1000&auto=format&fit=crop",
        tags: ["Automotive", "High Energy", "Music Sync"],
      },
      {
        title: "Urban Fashion Week",
        description: "Fast-paced fashion montage for a streetwear brand launch.",
        category: "reel",
        videoUrl: "https://example.com/video2",
        thumbnailUrl: "https://images.unsplash.com/photo-1537832816519-689ad163238b?q=80&w=1000&auto=format&fit=crop",
        tags: ["Fashion", "Lifestyle", "Trendy"],
      },
      {
        title: "The Art of Coffee",
        description: "Documentary style short film about artisanal coffee roasting.",
        category: "full-length",
        videoUrl: "https://example.com/video3",
        thumbnailUrl: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1000&auto=format&fit=crop",
        tags: ["Documentary", "Cinematic", "Storytelling"],
      },
      {
        title: "Tech Startup Launch",
        description: "Commercial ad spot for a new AI productivity tool.",
        category: "full-length",
        videoUrl: "https://example.com/video4",
        thumbnailUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
        tags: ["Commercial", "Corporate", "Clean"],
      },
      {
        title: "Travel Vlog: Japan",
        description: "Dynamic travel vlog edit with smooth transitions and sound design.",
        category: "full-length",
        videoUrl: "https://example.com/video5",
        thumbnailUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
        tags: ["Travel", "Vlog", "YouTube"],
      },
       {
        title: "Gym Motivation",
        description: "Intense workout montage with glitch effects.",
        category: "reel",
        videoUrl: "https://example.com/video6",
        thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
        tags: ["Fitness", "Motivation", "Glitch"],
      },
    ];

    for (const p of projects) {
      // @ts-ignore
      await storage.createProject(p);
    }

    // Seed Pricing
    const packages = [
      {
        name: "Basic Reel",
        price: "$50",
        description: "Perfect for quick social media updates.",
        category: "reel",
        features: ["Up to 30 seconds", "Basic Color Correction", "Music Sync", "1 Revision"],
      },
      {
        name: "Pro Reel",
        price: "$100",
        description: "High-end editing for viral content.",
        category: "reel",
        features: ["Up to 60 seconds", "Advanced Color Grade", "Sound Design & SFX", "Motion Graphics", "3 Revisions", "is_popular"],
        isPopular: true,
      },
      {
        name: "YouTube Standard",
        price: "$200",
        description: "Essential editing for YouTubers.",
        category: "full-length",
        features: ["Up to 10 minutes", "Cut & Trim", "Basic Titles", "Background Music", "2 Revisions"],
      },
      {
        name: "Cinematic Documentary",
        price: "$500+",
        description: "Full production value for serious projects.",
        category: "full-length",
        features: ["Up to 30 minutes", "Cinematic Color Grading", "Advanced Sound Design", "Custom Transitions", "Unlimited Revisions", "is_popular"],
        isPopular: true,
      },
    ];

    for (const pkg of packages) {
      // @ts-ignore
      await storage.createPricingPackage(pkg);
    }
  }
}
