import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Long-form page copy lives as Markdown so Decap CMS can edit it with a rich-text field.
// One file per page under src/content/pages/. The page's slug is the filename.
const pages = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    image: z.string().optional(),
    imageAlt: z.string().optional(),
  }),
});

export const collections = { pages };
