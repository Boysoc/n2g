import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const posts = defineCollection({
  loader: glob({
    pattern: '**/*.{md,mdx}',
    base: './src/content/posts',
    generateId: ({ entry, data }) => {
      const slug = typeof data.slug === 'string' ? data.slug.trim() : '';
      return slug || entry.replace(/\.(md|mdx)$/i, '');
    },
  }),
  schema: ({ image }) =>
    z.object({
      title: z.string().min(1),
      description: z.string().default(''),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      slug: z.string().trim().min(1).optional(),
      author: z.string().optional(),
      excerpt: z.string().optional(),
      cardImage: z.union([image(), z.string().trim().min(1)]).optional(),
      cardImageAlt: z.string().default(''),
      cardImageWidth: z.number().int().positive().optional(),
      cardImageHeight: z.number().int().positive().optional(),
      heroImage: z.union([image(), z.string().trim().min(1)]).optional(),
      heroImageAlt: z.string().default(''),
      heroImageWidth: z.number().int().positive().optional(),
      heroImageHeight: z.number().int().positive().optional(),
      ogImage: z.string().optional(),
      categories: z.array(z.string()).default([]),
      tags: z.array(z.string()).default([]),
      featured: z.boolean().default(false),
      draft: z.boolean().default(false),
    }),
});

export const collections = { posts };
