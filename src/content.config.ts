// src/content.config.ts
// هذا هو الملف الصحيح، ويستخدم glob loader
import { defineCollection, reference, z } from 'astro:content';
import { glob } from 'astro/loaders';

const artists = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/artists" }),
  schema: z.object({
    name: z.string(),
    stage_name: z.string(),
    genre: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
  }),
});

const albums = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/albums" }),
  schema: z.object({
    name: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }),
    publishDate: z.date(), // e.g. 2024-09-17
    tracks: z.array(z.string()),
    artist: reference('artists'),
  }),
});

// تعريف جديد لـ Articles Collection
const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: "./src/data/articles" }), // استخدام glob loader والمسار الصحيح
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    publishDate: z.date(),
    author: z.string(),
    image: z.object({
      src: z.string(),
      alt: z.string(),
    }).optional(),
    tags: z.array(z.string()).optional(),
  }),
});

// تصدير جميع الـ collections
export const collections = {artists, albums, articles};