import type { Express } from "express";
import type { Server } from "http";
import { pricingData, projectsData } from "@shared/data";
import { api } from "@shared/routes";
import { z } from "zod";
import nodemailer from "nodemailer";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  app.get(api.projects.list.path, async (req, res) => {
    const category = req.query.category as "reel" | "full-length" | undefined;
    const filteredProjects = category
      ? projectsData.filter((project) => project.category === category)
      : projectsData;

    res.json(filteredProjects);
  });

  app.get(api.projects.get.path, async (req, res) => {
    const id = Number(req.params.id);
    const project = projectsData.find((entry) => entry.id === id);

    if (!project) {
      return res.status(404).json({ message: "Project not found" });
    }

    res.json(project);
  });

  app.get(api.pricing.list.path, async (req, res) => {
    const category = req.query.category as "reel" | "full-length" | undefined;
    const filteredPricing = category
      ? pricingData.filter((item) => item.category === category)
      : pricingData;

    res.json(filteredPricing);
  });

  app.post(api.contact.submit.path, async (req, res) => {
    try {
      const input = api.contact.submit.input.parse(req.body);

      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER || "your-email@gmail.com",
          pass: process.env.EMAIL_PASS || "your-app-password",
        },
      });

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

      await transporter.sendMail({
        from: process.env.EMAIL_USER || "your-email@gmail.com",
        to: "cinemorastudio460@gmail.com",
        subject: `New Project Inquiry: ${input.serviceType} - ${input.name}`,
        text: emailContent,
      });

      try {
        await transporter.sendMail({
          from: process.env.EMAIL_USER || "your-email@gmail.com",
          to: "cinemora_studio_@instagram.com",
          subject: `New Inquiry: ${input.name} - ${input.serviceType}`,
          text: `New project inquiry from ${input.name} (${input.email}):\n\n${input.message}`,
        });
      } catch {
        console.log("Instagram email failed, but main email sent successfully");
      }

      res.status(201).json({ message: "Message sent successfully!" });
    } catch (err) {
      console.error("Contact form error:", err);

      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join("."),
        });
      }

      res.status(500).json({ message: "Failed to send message. Please try again." });
    }
  });

  return httpServer;
}
