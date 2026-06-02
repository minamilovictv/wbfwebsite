import { defineField, defineType } from "sanity";

export const milestoneSchema = defineType({
  name: "milestone",
  title: "Milestones",
  type: "document",
  fields: [
    defineField({ name: "year", type: "string", validation: (r) => r.required() }),
    defineField({ name: "event", type: "string", validation: (r) => r.required() }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: { select: { title: "year", subtitle: "event" } },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Year", name: "yearAsc", by: [{ field: "year", direction: "asc" }] },
  ],
});
