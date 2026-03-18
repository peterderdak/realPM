import { getCollection, type CollectionEntry } from "astro:content";

export type EditorialPageEntry = CollectionEntry<"editorial-pages">;
export type EditorialPageSlug = "what-makes-a-pm-role-real" | "for-employers" | "methodology";

export async function getEditorialPage(slug: EditorialPageSlug) {
  const pages = await getCollection("editorial-pages", ({ data }) => !data.draft);
  const page = pages.find((entry) => entry.data.slug === slug);

  if (!page) {
    throw new Error(`Missing editorial page content for "${slug}".`);
  }

  return page;
}
