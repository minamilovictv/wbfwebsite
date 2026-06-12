import { defineField, defineType } from "sanity";

/**
 * Knowledge Hub — library resources (guides, toolkits, videos, articles…).
 */
export const resourceSchema = defineType({
  name: "resource",
  title: "KH — Resources",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, validation: (r) => r.required() }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({
      name: "type",
      title: "Resource type",
      type: "string",
      options: {
        list: [
          { value: "guide", title: "Guide" },
          { value: "toolkit", title: "Toolkit" },
          { value: "template", title: "Template" },
          { value: "video", title: "Video" },
          { value: "webinar", title: "Webinar Recording" },
          { value: "article", title: "Article" },
          { value: "report", title: "Report" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "topic",
      type: "string",
      options: {
        list: [
          { value: "applying", title: "Applying for Funding" },
          { value: "project-management", title: "Project Management" },
          { value: "reporting", title: "Reporting & Compliance" },
          { value: "communications", title: "Communications & Visibility" },
          { value: "partnerships", title: "Regional Partnerships" },
          { value: "policy", title: "Policy & Research" },
        ],
      },
    }),
    defineField({
      name: "level",
      type: "string",
      options: {
        list: [
          { value: "beginner", title: "Beginner" },
          { value: "intermediate", title: "Intermediate" },
          { value: "advanced", title: "Advanced" },
        ],
      },
    }),
    defineField({ name: "body", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "externalUrl", type: "url", description: "External link (video, article…)" }),
    defineField({
      name: "download",
      type: "reference",
      to: [{ type: "download" }],
      description: "Attached downloadable file, if any",
    }),
    defineField({ name: "duration", type: "string", description: "Reading/watch time, e.g. 10 min read" }),
    defineField({
      name: "language",
      type: "string",
      options: { list: ["en", "sr", "mk", "sq", "bs"] },
      initialValue: "en",
    }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true } }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "publishedAt", type: "datetime" }),
    defineField({ name: "order", type: "number", initialValue: 1 }),
  ],
  preview: { select: { title: "title", subtitle: "type" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Published (newest first)", name: "pubDesc", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
