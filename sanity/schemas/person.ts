import { defineField, defineType } from "sanity";

export const personSchema = defineType({
  name: "person",
  title: "People",
  type: "document",
  fields: [
    defineField({ name: "fullName", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "fullName" } }),
    defineField({ name: "title", type: "string", description: "E.g. Dr., Prof., Ms." }),
    defineField({ name: "role", type: "string", validation: (r) => r.required() }),
    defineField({ name: "department", type: "string" }),
    defineField({ name: "bio", type: "text", rows: 5 }),
    defineField({ name: "photo", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
    defineField({ name: "email", type: "string" }),
    defineField({ name: "linkedin", type: "url" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "role", media: "photo" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
});
