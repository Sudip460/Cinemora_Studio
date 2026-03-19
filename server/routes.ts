import type { Express } from "express";
import type { Server } from "http";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

// Hardcoded projects data with iframe embeds
const projectsData = [
  {
    id: 1,
    title: "Neon City Drift",
    description: "High-energy automotive cinematic reel featuring underground racing scenes.",
    category: "reel",
    videoUrl: "https://drive.google.com/file/d/14yoViPlj5ZNIf2ttMzT2455PAuzEKNZX/preview", // Replace with actual YouTube embed URL
    thumbnailUrl: "/thumbnailss/reel1.png",
    tags: ["Automotive", "High Energy", "Music Sync"],
  },
  {
    id: 2,
    title: "Indus Battle Royale | The ULTIMATE Face Off!",
    description: "Epic showdown in Indus Battle Royale! Bengal and Punjab are facing off",
    category: "full-length",
    videoUrl: "https://www.youtube.com/embed/eHWZ4gYqRNw?si=fDl4XgV5Iiqszh95", // Replace with actual YouTube embed URL
    thumbnailUrl: "/thumbnailss/vid1.jpeg",
    tags: ["Fashion", "Lifestyle", "Trendy"],
  },
  {
    id: 3,
    title: "How to become RICH in your 20s (In Bengali)",
    description: "If you want to see yourself being successful and rich in 20 years, then this video is for you.",
    category: "full-length",
    videoUrl: "https://www.youtube.com/embed/lI9prf38pe8?si=kv6N3GiR7B42SiVu", // Replace with actual YouTube embed URL
    thumbnailUrl: "/thumbnailss/vid2.jpeg",
    tags: ["Documentary", "Cinematic", "Storytelling"],
  },
  {
    id: 4,
    title: "Tech Startup Launch",
    description: "Commercial ad spot for a new AI productivity tool.",
    category: "full-length",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_4", // Replace with actual YouTube embed URL
    thumbnailUrl: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1000&auto=format&fit=crop",
    tags: ["Commercial", "Corporate", "Clean"],
  },
  {
    id: 5,
    title: "Travel Vlog: Japan",
    description: "Dynamic travel vlog edit with smooth transitions and sound design.",
    category: "full-length",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_5", // Replace with actual YouTube embed URL
    thumbnailUrl: "https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?q=80&w=1000&auto=format&fit=crop",
    tags: ["Travel", "Vlog", "YouTube"],
  },
  {
    id: 6,
    title: "Gym Motivation",
    description: "Intense workout montage with glitch effects.",
    category: "reel",
    videoUrl: "https://www.youtube.com/embed/VIDEO_ID_6", // Replace with actual YouTube embed URL
    thumbnailUrl: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1000&auto=format&fit=crop",
    tags: ["Fitness", "Motivation", "Glitch"],
  },
  {
    id: 7,
    title: "YouTube Shorts Showcase",
    description: "Quick viral moment captured in YouTube Shorts format.",
    category: "reel",
    videoUrl: "https://drive.google.com/file/d/1uFfxom_j5vV1m5yN8Oq1wqsWy2Rirmpu/preview", // Replace with actual YouTube embed URL
    thumbnailUrl: "/thumbnailss/reel3.png",
    tags: ["YouTube", "Shorts", "Viral"],
  },
  // New Google Drive videos
  {
    id: 8,
    title: "Your Google Drive Video 1",
    description: "Description of your first Google Drive video.",
    category: "reel",
    videoUrl: "https://drive.google.com/file/d/YOUR_FILE_ID_1/preview", // Replace with actual Google Drive embed URL
    thumbnailUrl: "/thumbnailss/gdrive1.jpg", // Add thumbnail image
    tags: ["Custom", "Google Drive", "Reel"],
  },
  {
    id: 9,
    title: "Your Google Drive Video 2",
    description: "Description of your second Google Drive video.",
    category: "full-length",
    videoUrl: "https://drive.google.com/file/d/YOUR_FILE_ID_2/preview", // Replace with actual Google Drive embed URL
    thumbnailUrl: "/thumbnailss/gdrive2.jpg", // Add thumbnail image
    tags: ["Custom", "Google Drive", "Full Length"],
  },
  {
    id: 10,
    title: "Your Google Drive Video 3",
    description: "Description of your third Google Drive video.",
    category: "reel",
    videoUrl: "https://drive.google.com/file/d/YOUR_FILE_ID_3/preview", // Replace with actual Google Drive embed URL
    thumbnailUrl: "/thumbnailss/gdrive3.jpg", // Add thumbnail image
    tags: ["Custom", "Google Drive", "Reel"],
  },
];

// Hardcoded pricing data
const pricingData = [
  {
    id: 1,
    name: "Basic Reel",
    price: "₹500",
    description: "Perfect for quick social media updates.",
    category: "reel",
    features: ["Up to 60 seconds", "Advanced Color Grade", "Sound Design & SFX", "2 Revisions"],
    isPopular: false,
  },
  {
    id: 2,
    name: "Pro Reel",
    price: "₹1000",
    description: "High-end editing for viral content.",
    category: "reel",
    features: ["Up to 90 seconds", "Advanced customized Color Grade", "Sound Design & SFX", "Motion Graphics", "5 Revisions"],
    isPopular: true,
  },
  {
    id: 3,
    name: "YouTube Standard",
    price: "₹1500",
    description: "Essential editing for YouTubers.",
    category: "full-length",
    features: ["Up to 15 minutes", "Basic Color Grade", "Sound Design & SFX", "Background Music", "2 Revisions"],
    isPopular: false,
  },
  {
    id: 4,
    name: "Cinematic Documentary",
    price: "₹2000+",
    description: "Full production value for serious projects.",
    category: "full-length",
    features: ["Up to 30 minutes", "Cinematic Color Grading", "Advanced Sound Design", "Motion Graphics", "Unlimited Revisions"],
    isPopular: true,
  },
];

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  // Projects
  app.get(api.projects.list.path, async (req, res) => {
    const category = req.query.category as 'reel' | 'full-length' | undefined;
    const filteredProjects = category
      ? projectsData.filter(p => p.category === category)
      : projectsData;
    res.json(filteredProjects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const project = projectsData.find(p => p.id === id);
    if (!project) {
      return res.status(404).json({ message: 'Project not found' });
    }
    res.json(project);
  });

  // Pricing
  app.get(api.pricing.list.path, async (req, res) => {
    const category = req.query.category as 'reel' | 'full-length' | undefined;
    const filteredPricing = category
      ? pricingData.filter(p => p.category === category)
      : pricingData;
    res.json(filteredPricing);
  });

  // Contact
  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);

      // Create email transporter
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: process.env.EMAIL_USER || 'your-email@gmail.com',
          pass: process.env.EMAIL_PASS || 'your-app-password'
        }
      });

      // Email content
      const emailContent = `
New Project Inquiry from Cinemora Studio Website

Name: ${input.name}
Email: ${input.email}
Service: ${input.serviceType}
${input.servicePlan ? `Service Plan: ${input.servicePlan}` : ""}
Message:
${input.message}

---
This message was sent from the contact form on cinemora-studio.com
      `;

      // Send email to business email
      await transporter.sendMail({
        from: process.env.EMAIL_USER || 'your-email@gmail.com',
        to: 'cinemorastudio460@gmail.com',
        subject: `New Project Inquiry: ${input.serviceType} - ${input.name}`,
        text: emailContent
      });

      // Send email to Instagram (Instagram accepts emails at username@instagram.com)
      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER || 'your-email@gmail.com',
          to: 'cinemora_studio_@instagram.com',
          subject: `New Inquiry: ${input.name} - ${input.serviceType}`,
          text: `New project inquiry from ${input.name} (${input.email}):\n\n${input.message}`
        });
      } catch (instagramError) {
        console.log('Instagram email failed, but main email sent successfully');
      }

      res.status(201).json({ message: 'Message sent successfully!' });
    } catch (err) {
      console.error('Contact form error:', err);
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      res.status(500).json({ message: 'Failed to send message. Please try again.' });
    }
  });

  return httpServer;
}
