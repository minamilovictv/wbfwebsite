import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Projects",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({ name: "status", type: "string", options: { list: ["ongoing", "completed", "suspended"], layout: "radio" }, initialValue: "ongoing" }),
    defineField({ name: "grant", type: "reference", to: [{ type: "grant" }] }),
    defineField({ name: "program", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "shortDescription", type: "text", rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: "description", type: "text" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
    defineField({ name: "gallery", type: "array", of: [{ type: "image", fields: [defineField({ name: "alt", type: "string" })] }] }),
    defineField({ name: "implementingOrganization", type: "string", validation: (r) => r.required() }),
    defineField({ name: "partnerOrganizations", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "countries",
      type: "array",
      of: [{ type: "string" }],
      options: { list: [
        { value: "AL", title: "Albania" }, { value: "BA", title: "Bosnia and Herzegovina" },
        { value: "XK", title: "Kosovo*" }, { value: "MK", title: "North Macedonia" },
        { value: "ME", title: "Montenegro" }, { value: "RS", title: "Serbia" },
      ] },
    }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "grantAmount", type: "number", validation: (r) => r.required() }),
    defineField({ name: "currency", type: "string", options: { list: ["EUR", "USD"] }, initialValue: "EUR" }),
    defineField({ name: "startDate", type: "date", validation: (r) => r.required() }),
    defineField({ name: "endDate", type: "date" }),
    defineField({ name: "beneficiaries", type: "number" }),
    defineField({ name: "outcomes", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "ogmsProjectId", type: "string" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "object", fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "description", type: "text", rows: 2 }),
    ] }),
  ],
  preview: {
    select: { title: "title", subtitle: "implementingOrganization", media: "coverImage" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
});
