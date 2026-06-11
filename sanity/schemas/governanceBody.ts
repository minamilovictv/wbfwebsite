import { defineField, defineType } from "sanity";

export const governanceBodySchema = defineType({
  name: "governanceBody",
  title: "Governance Bodies",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "role",
      title: "Role Tagline",
      type: "string",
      description: "Short label, e.g. “Supreme decision-making body”.",
    }),
    defineField({
      name: "description",
      type: "text",
      rows: 5,
      description: "Separate paragraphs with a blank line.",
    }),
    defineField({
      name: "responsibilitiesHeading",
      title: "Responsibilities Heading",
      type: "string",
      description: "e.g. “The Conference approves”, “Key responsibilities include”.",
    }),
    defineField({
      name: "responsibilities",
      title: "Responsibilities",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "icon",
      title: "Icon (optional)",
      type: "string",
      options: {
        list: [
          { value: "ministers", title: "Conference of Ministers" },
          { value: "council", title: "Council of Senior Officials" },
          { value: "director", title: "Executive Director" },
          { value: "secretariat", title: "Secretariat" },
        ],
      },
    }),
    defineField({
      name: "image",
      title: "Representative Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
      description: "Shown beside the text — e.g. group photo, meeting photo, portrait, or team photo.",
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "title", subtitle: "role", media: "image" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
