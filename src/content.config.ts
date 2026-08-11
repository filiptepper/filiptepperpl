import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const locationSchema = z.object({
    id: z.string(),
    title: z.string(),
    lat: z.number(),
    lng: z.number(),
    imageSrc: z.string().optional(),
    imageAlt: z.string().optional(),
    caption: z.string().optional(),
    aspect: z.enum(['landscape', 'portrait', 'grid-2up-1', 'grid-2up-2']).default('landscape'),
    isPlaceOnly: z.boolean().default(false),
    note: z.string().optional(),
    badgeColor: z.string().optional(),
});

const travel = defineCollection({
    loader: glob({ pattern: '**/[^_]*.json', base: "./src/content/travel" }),
    schema: z.object({
        title: z.string(),
        description: z.string(),
        subtitle: z.string(),
        date: z.string(),
        badge: z.string(),
        center: z.tuple([z.number(), z.number()]),
        zoom: z.number().default(10),
        locations: z.array(locationSchema),
    }),
});

export const collections = { travel };
