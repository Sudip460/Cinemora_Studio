import { z } from 'zod';
import { insertContactSchema, Project, PricingPackage } from './schema';

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
        200: z.array(z.custom<Project>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/projects/:id',
      responses: {
        200: z.custom<Project>(),
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
        200: z.array(z.custom<PricingPackage>()),
      },
    },
  },
  contact: {
    submit: {
      method: 'POST' as const,
      path: '/api/contact',
      input: insertContactSchema,
      responses: {
        201: z.object({ message: z.string() }),
        400: errorSchemas.validation,
        500: errorSchemas.internal,
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

export type ContactInput = z.infer<typeof insertContactSchema>;
