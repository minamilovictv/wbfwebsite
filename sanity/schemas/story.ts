import { defineField, defineType } from "sanity";

/**
 * Grantee stories surfaced on /impact/stories and referenced from
 * program.featuredStories.
 */
export const storySchema = defineType({
  name: "story",
  title: "Grantee Stories",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "area", type: "string", description: "e.g. Cultural Cooperation" }),
    defineField({ name: "callTag", type: "string", description: "e.g. GGI Grants · Call 7" }),
    defineField({ name: "emoji", type: "string" }),
    defineField({ name: "summary", type: "text", rows: 4 }),
    defineField({ name: "meta", type: "string", description: "Footer meta (countries, beneficiaries...)" }),
    defineField({ name: "link", type: "url" }),
    defineField({
      name: "gradient",
      type: "string",
      options: {
        list: [
          { value: "brand", title: "Brand" },
          { value: "slate-brand", title: "Slate → Brand" },
          { value: "emerald", title: "Emerald" },
          { value: "teal", title: "Teal" },
          { value: "amber", title: "Amber" },
        ],
      },
      initialValue: "brand",
    }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "program", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "countries", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "area" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
