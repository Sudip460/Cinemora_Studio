import { z } from 'zod';
import { insertProjectSchema, insertPricingSchema, insertContactSchema, projects, pricingPackages, contacts } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  projects: {
    list: {
      method: 'GET' as const,
      path: '/api/projects',
      input: z.object({
        category: z.enum(['reel', 'full-length']).optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof projects.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/projects/:id',
      responses: {
        200: z.custom<typeof projects.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    }
  },
  pricing: {
    list: {
      method: 'GET' as const,
      path: '/api/pricing',
       input: z.object({
        category: z.enum(['reel', 'full-length']).optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof pricingPackages.$inferSelect>()),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactSchema,
      responses: {
        201: z.custom<typeof contacts.$inferSelect>(),
        400: errorSchemas.validation,
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}

export type ProjectInput = z.infer<typeof insertProjectSchema>;
export type PricingInput = z.infer<typeof insertPricingSchema>;
export type ContactInput = z.infer<typeof insertContactSchema>;
