import { defineField, defineType } from "sanity";

export const newsSchema = defineType({
  name: "news",
  title: "News Articles",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "category",
      type: "string",
      options: { list: [
        { value: "announcement", title: "Announcement" },
        { value: "press-release", title: "Press Release" },
        { value: "publication", title: "Publication" },
        { value: "story", title: "Story" },
        { value: "event-recap", title: "Event Recap" },
        { value: "call-for-applications", title: "Open Call" },
      ] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "subtitle", type: "string", description: "Optional subtitle shown below title in the modal" }),
    defineField({ name: "excerpt", type: "text", rows: 3, validation: (r) => r.required().max(300) }),
    defineField({ name: "body", type: "text", description: "Main article body text" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
    defineField({
      name: "gallery",
      title: "Image Gallery",
      type: "array",
      description: "Additional images shown in a gallery carousel inside the modal",
      of: [{ type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" }), defineField({ name: "caption", type: "string" })] }],
    }),
    defineField({
      name: "videos",
      title: "Videos",
      type: "array",
      description: "YouTube or Vimeo video embeds",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", type: "string" }),
          defineField({ name: "url", type: "url", description: "YouTube or Vimeo URL" }),
        ],
        preview: { select: { title: "title", subtitle: "url" } },
      }],
    }),
    defineField({
      name: "links",
      title: "Related Links",
      type: "array",
      description: "External links shown at the bottom of the modal",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", type: "string", validation: (r) => r.required() }),
          defineField({ name: "url", type: "url", validation: (r) => r.required() }),
        ],
        preview: { select: { title: "label", subtitle: "url" } },
      }],
    }),
    defineField({ name: "author", type: "reference", to: [{ type: "person" }] }),
    defineField({ name: "publishedAt", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "program", type: "reference", to: [{ type: "program" }] }),
    defineField({ name: "grant", type: "reference", to: [{ type: "grant" }] }),
    defineField({ name: "project", type: "reference", to: [{ type: "project" }] }),
    defineField({ name: "countries", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "object", fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "description", type: "text", rows: 2 }),
    ] }),
  ],
  orderings: [{ title: "Published (newest first)", name: "publishedDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: {
    select: { title: "title", subtitle: "publishedAt", media: "coverImage" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
});
