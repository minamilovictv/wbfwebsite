import { defineField, defineType } from "sanity";

export const memberStateSchema = defineType({
  name: "memberState",
  title: "Member States",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "code",
      type: "string",
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
      validation: (r) => r.required(),
    }),
    defineField({ name: "flag", type: "string", description: "Emoji flag" }),
    defineField({ name: "capital", type: "string" }),
    defineField({ name: "population", type: "string" }),
    defineField({ name: "languages", type: "string" }),
    defineField({ name: "memberSince", type: "string" }),
    defineField({ name: "focalPoint", type: "string" }),
    defineField({ name: "focalPointEmail", type: "string" }),
    defineField({ name: "description", type: "text", rows: 4 }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "capital" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
