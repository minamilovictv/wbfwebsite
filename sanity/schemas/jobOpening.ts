import { defineField, defineType } from "sanity";

export const jobOpeningSchema = defineType({
  name: "jobOpening",
  title: "Job Openings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "type",
      type: "string",
      options: {
        list: [
          { value: "full-time", title: "Full-time" },
          { value: "part-time", title: "Part-time" },
          { value: "consultant", title: "Consultant" },
          { value: "internship", title: "Internship" },
        ],
      },
    }),
    defineField({ name: "location", type: "string", description: "e.g. Tirana, Albania / Remote" }),
    defineField({ name: "deadline", type: "date" }),
    defineField({ name: "summary", type: "text", rows: 3 }),
    defineField({ name: "description", type: "array", of: [{ type: "block" }] }),
    defineField({ name: "applicationUrl", type: "url" }),
    defineField({
      name: "status",
      type: "string",
      options: {
        list: [
          { value: "open", title: "Open" },
          { value: "closed", title: "Closed" },
        ],
      },
      initialValue: "open",
    }),
    defineField({ name: "publishedAt", type: "datetime" }),
  ],
  preview: { select: { title: "title", subtitle: "location" } },
  orderings: [
    { title: "Newest first", name: "newest", by: [{ field: "publishedAt", direction: "desc" }] },
  ],
});
