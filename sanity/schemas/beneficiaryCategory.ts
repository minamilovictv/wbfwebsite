import { defineField, defineType } from "sanity";

export const beneficiaryCategorySchema = defineType({
  name: "beneficiaryCategory",
  title: "Beneficiary Categories (About page)",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "group",
      title: "Group",
      type: "string",
      options: {
        list: [
          { value: "civil-society", title: "Civil Society & Non-Profit" },
          { value: "public-sector", title: "Public & Local Government" },
          { value: "business", title: "Business & Economy" },
          { value: "education", title: "Education & Research" },
          { value: "culture", title: "Culture & Arts" },
          { value: "community", title: "Sports & Community" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: { select: { title: "name", subtitle: "group" } },
  orderings: [
    { title: "Display Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
