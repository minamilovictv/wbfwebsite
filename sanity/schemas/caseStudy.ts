import { defineField, defineType } from "sanity";

/**
 * Knowledge Hub — in-depth case studies of funded projects and practices.
 */
export const caseStudySchema = defineType({
  name: "caseStudy",
  title: "KH — Case Studies",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "organization", type: "string", description: "Lead organization" }),
    defineField({ name: "program", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "countries", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "theme",
      type: "string",
      options: {
        list: [
          { value: "culture", title: "Cultural Cooperation" },
          { value: "education", title: "Education & Youth" },
          { value: "environment", title: "Environment & Sustainability" },
          { value: "governance", title: "Governance & Advocacy" },
          { value: "social-inclusion", title: "Social Inclusion" },
        ],
      },
    }),
    defineField({
      name: "keyResults",
      title: "Key results",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "value", type: "string", description: "e.g. 400+" }),
            defineField({ name: "label", type: "string", description: "e.g. Participants" }),
          ],
          preview: { select: { title: "value", subtitle: "label" } },
        },
      ],
    }),
    defineField({
      name: "lessonsLearned",
      title: "Lessons learned",
      type: "array",
      of: [{ type: "text" }],
    }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "downloads", type: "array", of: [{ type: "reference", to: [{ type: "download" }] }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "order", type: "number", initialValue: 1 }),
  ],
  preview: { select: { title: "title", subtitle: "organization" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
