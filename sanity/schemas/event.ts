import { defineField, defineType } from "sanity";

export const eventSchema = defineType({
  name: "event",
  title: "Events",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "type", type: "string", options: { list: ["conference","workshop","webinar","info-session","networking","awards","training"] }, validation: (r) => r.required() }),
    defineField({ name: "mode", type: "string", options: { list: ["in-person","online","hybrid"], layout: "radio" }, initialValue: "in-person" }),
    defineField({ name: "shortDescription", type: "text", rows: 2 }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
    defineField({ name: "startDate", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "endDate", type: "datetime" }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "city", type: "string" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "onlineLink", type: "url" }),
    defineField({ name: "registrationUrl", type: "url" }),
    defineField({ name: "registrationDeadline", type: "datetime" }),
    defineField({ name: "capacity", type: "number" }),
    defineField({ name: "program", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "speakers", type: "array", of: [{ type: "reference", to: [{ type: "person" }] }] }),
    defineField({
      name: "agenda",
      type: "array",
      of: [{ type: "object", fields: [
        defineField({ name: "time", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({ name: "speaker", type: "string" }),
        defineField({ name: "type", type: "string", options: { list: ["session","break","networking","keynote"] } }),
      ] }],
    }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "object", fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "description", type: "text", rows: 2 }),
    ] }),
  ],
  orderings: [{ title: "Date (upcoming first)", name: "dateAsc", by: [{ field: "startDate", direction: "asc" }] }],
  preview: {
    select: { title: "title", subtitle: "startDate", media: "coverImage" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
});
