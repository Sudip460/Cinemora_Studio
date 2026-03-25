import { api } from "@shared/routes";
import nodemailer from "nodemailer";
import { z } from "zod";

export default async function handler(req: any, res: any) {
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ message: "Method not allowed" });
  }

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
      // Ignore Instagram mailbox failures when the primary mailbox succeeds.
    }

    return res.status(201).json({ message: "Message sent successfully!" });
  } catch (err) {
    if (err instanceof z.ZodError) {
      return res.status(400).json({
        message: err.errors[0].message,
        field: err.errors[0].path.join("."),
      });
    }

    console.error("Contact form error:", err);
    return res.status(500).json({ message: "Failed to send message. Please try again." });
  }
}
