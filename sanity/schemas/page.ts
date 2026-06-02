import { defineField, defineType } from "sanity";

/**
 * Generic CMS page used for "About" and "Impact" sub-routes.
 * Slug examples: "about", "about/governance", "impact", "impact/awards".
 */
export const pageSchema = defineType({
  name: "page",
  title: "Pages",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      description: "URL path without the leading slash, e.g. 'about/governance'.",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "hero",
      type: "object",
      fields: [
        defineField({ name: "overline", type: "string" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({
          name: "variant",
          type: "string",
          options: {
            list: [
              { value: "default", title: "Default" },
              { value: "compact", title: "Compact" },
            ],
          },
          initialValue: "compact",
        }),
        defineField({
          name: "coverImage",
          type: "image",
          options: { hotspot: true },
          fields: [defineField({ name: "alt", type: "string" })],
        }),
      ],
    }),
    defineField({
      name: "body",
      title: "Body (rich text)",
      type: "array",
      description:
        "Main page content. Use rich text for narrative, or add structured section blocks below.",
      of: [
        { type: "block" },
        {
          type: "object",
          name: "statsGrid",
          title: "Stats grid",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({
              name: "stats",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "value", type: "string" }),
                    defineField({ name: "label", type: "string" }),
                    defineField({ name: "sub", type: "string" }),
                  ],
                  preview: { select: { title: "value", subtitle: "label" } },
                },
              ],
            }),
          ],
        },
        {
          type: "object",
          name: "cardsGrid",
          title: "Cards grid",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({ name: "intro", type: "text", rows: 2 }),
            defineField({
              name: "cards",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "icon", type: "string", description: "Lucide icon name (e.g. shield, target, globe, users)" }),
                    defineField({ name: "title", type: "string" }),
                    defineField({ name: "description", type: "text", rows: 2 }),
                    defineField({ name: "href", type: "string", description: "Optional link" }),
                  ],
                  preview: { select: { title: "title", subtitle: "description" } },
                },
              ],
            }),
          ],
        },
        {
          type: "object",
          name: "callout",
          title: "Callout band",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "description", type: "text", rows: 3 }),
            defineField({ name: "ctaLabel", type: "string" }),
            defineField({ name: "ctaHref", type: "string" }),
            defineField({
              name: "variant",
              type: "string",
              options: {
                list: [
                  { value: "dark", title: "Dark (brand-950)" },
                  { value: "light", title: "Light (slate-50)" },
                ],
              },
              initialValue: "dark",
            }),
          ],
        },
      ],
    }),
    defineField({
      name: "seo",
      type: "object",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({ name: "noIndex", type: "boolean", initialValue: false }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "slug.current" },
  },
});
