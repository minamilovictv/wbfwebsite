import { defineField, defineType } from "sanity";

export const objectiveSchema = defineType({
  name: "objective",
  title: "Objectives (About page)",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "description",
      type: "text",
      rows: 2,
      description: "Optional short sentence shown under the title.",
    }),
    defineField({
      name: "icon",
      title: "Icon",
      type: "string",
      options: {
        list: [
          { value: "culture", title: "Culture" },
          { value: "science", title: "Science & Education" },
          { value: "sustainability", title: "Sustainable Development" },
          { value: "youth", title: "Youth" },
          { value: "crossborder", title: "Cross-border" },
          { value: "media", title: "Media" },
          { value: "environment", title: "Environment" },
          { value: "eu", title: "European Integration" },
          { value: "gender", title: "Gender Equality" },
        ],
      },
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "icon" } },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
