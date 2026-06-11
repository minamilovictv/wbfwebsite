import { defineField, defineType } from "sanity";

export const milestoneSchema = defineType({
  name: "milestone",
  title: "Milestones",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Event Title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "date",
      title: "Date",
      type: "string",
      description: "Shown on the card, e.g. “November 2015” or “2024–2025”.",
      validation: (r) => r.required(),
    }),
    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 3,
      description: "One short sentence describing the milestone.",
    }),
    defineField({
      name: "image",
      title: "Featured Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({
      name: "ctaLabel",
      title: "Link Label (optional)",
      type: "string",
      description: "e.g. “Read more”, “View report”.",
    }),
    defineField({
      name: "ctaUrl",
      title: "Link URL (optional)",
      type: "string",
      description: "Internal path (/news/...) or full external URL.",
    }),
    defineField({ name: "order", title: "Sort Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "date", media: "image" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
  orderings: [
    { title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
