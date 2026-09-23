import { db } from "./db";
import {
  projects,
  contacts,
  type Project,
  type InsertProject,
  type Contact,
  type InsertContact,
} from "@shared/schema";
import { eq } from "drizzle-orm";

export interface IStorage {
  getProjects(category?: 'reel' | 'full-length'): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  createProject(project: InsertProject): Promise<Project>;
  
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

  async createContact(contact: InsertContact): Promise<Contact> {
    const [newContact] = await db.insert(contacts).values(contact).returning();
    return newContact;
  }
}

export const storage = new DatabaseStorage();
