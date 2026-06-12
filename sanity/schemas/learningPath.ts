import { defineField, defineType } from "sanity";

/**
 * Knowledge Hub — structured learning paths (academy-style course tracks).
 */
export const learningPathSchema = defineType({
  name: "learningPath",
  title: "KH — Learning Paths",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({
      name: "level",
      type: "string",
      options: {
        list: [
          { value: "beginner", title: "Beginner" },
          { value: "intermediate", title: "Intermediate" },
          { value: "advanced", title: "Advanced" },
        ],
        layout: "radio",
      },
      initialValue: "beginner",
    }),
    defineField({
      name: "icon",
      type: "string",
      description: "Icon key rendered on the card (e.g. compass, file-text, users, presentation, target, layers)",
    }),
    defineField({
      name: "color",
      type: "string",
      options: {
        list: [
          { value: "brand", title: "Brand Blue" },
          { value: "teal", title: "Teal" },
          { value: "emerald", title: "Emerald" },
          { value: "amber", title: "Amber" },
          { value: "rose", title: "Rose" },
        ],
      },
      initialValue: "brand",
    }),
    defineField({ name: "estimatedDuration", type: "string", description: "e.g. 4 hours, 6 modules" }),
    defineField({
      name: "modules",
      title: "Modules",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "description", type: "text", rows: 2 }),
            defineField({ name: "duration", type: "string", description: "e.g. 30 min" }),
          ],
          preview: { select: { title: "title", subtitle: "duration" } },
        },
      ],
    }),
    defineField({
      name: "resources",
      title: "Linked resources",
      type: "array",
      of: [{ type: "reference", to: [{ type: "resource" }] }],
    }),
    defineField({
      name: "audience",
      type: "string",
      description: "Who this path is for (e.g. First-time applicants, Grantee project managers)",
    }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number", initialValue: 1 }),
  ],
  preview: { select: { title: "title", subtitle: "level" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
