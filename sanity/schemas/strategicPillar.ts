import { defineField, defineType } from "sanity";

export const strategicPillarSchema = defineType({
  name: "strategicPillar",
  title: "Strategic Pillars",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "number", type: "string", description: "e.g. '01', '02'" }),
    defineField({
      name: "icon",
      type: "string",
      options: {
        list: [
          { value: "globe", title: "Globe" },
          { value: "users", title: "Users" },
          { value: "book", title: "Book" },
          { value: "leaf", title: "Leaf" },
          { value: "cpu", title: "Cpu" },
          { value: "target", title: "Target" },
          { value: "shield", title: "Shield" },
          { value: "lightbulb", title: "Lightbulb" },
        ],
      },
    }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "targets", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "title", subtitle: "number" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
