import { db } from "./db";
import {
  projects,
  pricingPackages,
  contacts,
  type Project,
  type InsertProject,
  type PricingPackage,
  type InsertPricing,
  type Contact,
  type InsertContact,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(category?: 'reel' | 'full-length'): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
  getPricingPackages(category?: 'reel' | 'full-length'): Promise<PricingPackage[]>;
  createPricingPackage(pkg: InsertPricing): Promise<PricingPackage>;

  createContact(contact: InsertContact): Promise<Contact>;
}

export class DatabaseStorage implements IStorage {
  async getProjects(category?: 'reel' | 'full-length'): Promise<Project[]> {
    if (category) {
      return await db.select().from(projects).where(eq(projects.category, category));
    }
    return await db.select().from(projects);
  }

  async getProject(id: number): Promise<Project | undefined> {
    const [project] = await db.select().from(projects).where(eq(projects.id, id));
    return project;
  }

  async createProject(project: InsertProject): Promise<Project> {
    const [newProject] = await db.insert(projects).values(project).returning();
    return newProject;
  }

  async getPricingPackages(category?: 'reel' | 'full-length'): Promise<PricingPackage[]> {
    if (category) {
      return await db.select().from(pricingPackages).where(eq(pricingPackages.category, category));
    }
    return await db.select().from(pricingPackages);
  }

  async createPricingPackage(pkg: InsertPricing): Promise<PricingPackage> {
    const [newPkg] = await db.insert(pricingPackages).values(pkg).returning();
    return newPkg;
  }

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }
}

export const storage = new DatabaseStorage();
