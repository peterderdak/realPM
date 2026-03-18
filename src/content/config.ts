import { defineCollection, z } from "astro:content";

const jobs = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    company: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    location: z.string(),
    remote: z.enum(["remote", "hybrid", "on-site"]),
    level: z.enum(["associate", "mid", "senior", "staff", "director"]),
    archetype: z.enum(["core-product", "growth", "platform", "internal-tools", "zero-to-one"]),
    stage: z.enum(["seed", "series-a", "series-b", "growth", "profitable-private", "public"]),
    applyUrl: z.string().url(),
    summary: z.string(),
    whyItMadeBoard: z.array(z.string()).min(1),
    outcomesOwned: z.array(z.string()).min(1),
    decisionRights: z.array(z.string()).min(1),
    discoveryModel: z.string(),
    teamTopology: z.string(),
    strategyScope: z.string(),
    unknowns: z.array(z.string()).default([]),
    reviewedAt: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
    confidence: z.enum(["low", "medium", "high"]),
    featured: z.boolean().default(false),
    draft: z.boolean().default(false),
    contentStatus: z.enum(["sample", "verified"]).default("sample"),
  }),
});

const editorialPages = defineCollection({
  type: "data",
  schema: z.object({
    title: z.string(),
    slug: z.string().regex(/^[a-z0-9-]+$/),
    description: z.string(),
    summary: z.string(),
    draft: z.boolean().default(false),
    sections: z
      .array(
        z.object({
          title: z.string(),
          body: z.string(),
        }),
      )
      .default([]),
  }),
});

export const collections = {
  jobs,
  "editorial-pages": editorialPages,
};
