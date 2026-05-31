import { defineField, defineType } from "sanity";

export const programSchema = defineType({
  name: "program",
  title: "Programs",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, group: "settings", validation: (r) => r.required() }),
    defineField({
      name: "pillar",
      type: "string",
      group: "settings",
      options: {
        list: [
          { value: "regional-cooperation", title: "Regional Cooperation" },
          { value: "youth-mobility", title: "Youth Mobility" },
          { value: "cultural-heritage", title: "Cultural Heritage" },
          { value: "economic-development", title: "Economic Development" },
          { value: "civil-society", title: "Civil Society" },
          { value: "environment", title: "Environment" },
          { value: "digitalization", title: "Digitalization" },
          { value: "science-research", title: "Science & Research" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "shortDescription", type: "text", rows: 3, group: "content", validation: (r) => r.required().max(300) }),
    defineField({ name: "description", type: "text", group: "content" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, group: "content", fields: [
      defineField({ name: "alt", type: "string" }),
    ] }),
    defineField({
      name: "status",
      type: "string",
      group: "settings",
      options: { list: ["active", "upcoming", "closed", "archived"], layout: "radio" },
      initialValue: "active",
    }),
    defineField({ name: "totalBudget", type: "number", group: "settings" }),
    defineField({
      name: "currency",
      type: "string",
      options: { list: ["EUR", "USD"], layout: "radio" },
      initialValue: "EUR",
      group: "settings",
    }),
    defineField({
      name: "countries",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { value: "AL", title: "Albania" },
          { value: "BA", title: "Bosnia and Herzegovina" },
          { value: "XK", title: "Kosovo*" },
          { value: "MK", title: "North Macedonia" },
          { value: "ME", title: "Montenegro" },
          { value: "RS", title: "Serbia" },
        ],
      },
      group: "settings",
    }),
    defineField({ name: "startDate", type: "date", group: "settings" }),
    defineField({ name: "endDate", type: "date", group: "settings" }),
    defineField({
      name: "impactStats",
      type: "array",
      group: "content",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", type: "string" }),
          defineField({ name: "value", type: "string" }),
          defineField({ name: "unit", type: "string" }),
          defineField({ name: "description", type: "text", rows: 2 }),
        ],
      }],
    }),
    defineField({
      name: "documents",
      type: "array",
      group: "content",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", type: "string", validation: (r) => r.required() }),
          defineField({ name: "file", type: "file", validation: (r) => r.required() }),
          defineField({
            name: "type",
            type: "string",
            options: { list: ["guidelines", "form", "report", "budget-template", "policy", "other"] },
          }),
          defineField({ name: "language", type: "string", options: { list: ["en", "sr", "mk", "sq", "bs"] } }),
        ],
      }],
    }),
    defineField({
      name: "donors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partner" }] }],
      group: "settings",
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false, group: "settings" }),
    defineField({ name: "order", type: "number", group: "settings" }),
    defineField({
      name: "seo",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({ name: "ogImage", type: "image" }),
        defineField({ name: "noIndex", type: "boolean", initialValue: false }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "pillar", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Title A–Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
});
