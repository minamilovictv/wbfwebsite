import { defineField, defineType } from "sanity";

export const personSchema = defineType({
  name: "person",
  title: "People",
  type: "document",
  fields: [
    defineField({ name: "fullName", title: "Name", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "fullName" } }),
    defineField({ name: "title", type: "string", description: "E.g. Dr., Prof., Ms." }),
    defineField({ name: "role", title: "Position / Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "department", type: "string" }),
    defineField({
      name: "biography",
      title: "Biography (rich text)",
      type: "array",
      of: [
        {
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "Heading", value: "h4" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullet", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: {
            decorators: [
              { title: "Bold", value: "strong" },
              { title: "Italic", value: "em" },
              { title: "Underline", value: "underline" },
            ],
            annotations: [
              {
                name: "link",
                type: "object",
                title: "Link",
                fields: [defineField({ name: "href", type: "url", title: "URL" })],
              },
            ],
          },
        },
      ],
      description: "Full biography shown in the profile popup on the Team page.",
    }),
    defineField({
      name: "bio",
      title: "Short Bio (legacy)",
      type: "text",
      rows: 5,
      description: "Plain-text fallback, shown only when no rich Biography is set above.",
    }),
    defineField({
      name: "photo",
      title: "Profile Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", type: "string" })],
    }),
    defineField({ name: "email", title: "Email Address", type: "string" }),
    defineField({ name: "linkedin", title: "LinkedIn URL", type: "url" }),
    defineField({ name: "country", type: "string" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "order", title: "Display Order", type: "number" }),
  ],
  preview: {
    select: { title: "fullName", subtitle: "role", media: "photo" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
});
