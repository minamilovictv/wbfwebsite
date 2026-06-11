import { defineField, defineType } from "sanity";

export const partnerSchema = defineType({
  name: "partner",
  title: "Partners & Donors",
  type: "document",
  fields: [
    defineField({ name: "name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "name" } }),
    defineField({ name: "type", type: "string", options: { list: [
      { value: "donor", title: "Donor" },
      { value: "implementing-partner", title: "Implementing Partner" },
      { value: "strategic-partner", title: "Strategic Partner" },
      { value: "network-member", title: "Network Member" },
      { value: "observer", title: "Observer" },
    ] }, validation: (r) => r.required() }),
    defineField({ name: "logo", type: "image", options: { hotspot: true } }),
    defineField({ name: "website", type: "url" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "description", type: "text", rows: 3 }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "type", media: "logo" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
});
