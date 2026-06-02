import { defineField, defineType } from "sanity";

/**
 * Singleton — one document per dataset. Drives footer, contact info,
 * social links, and the homepage hero / metadata defaults.
 */
export const siteSettingsSchema = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", initialValue: "Western Balkans Fund" }),
    defineField({ name: "tagline", type: "string" }),
    defineField({ name: "missionStatement", type: "text", rows: 4 }),
    defineField({
      name: "contact",
      type: "object",
      fields: [
        defineField({ name: "address", type: "text", rows: 2 }),
        defineField({ name: "email", type: "string" }),
        defineField({ name: "phone", type: "string" }),
      ],
    }),
    defineField({
      name: "social",
      type: "object",
      fields: [
        defineField({ name: "facebook", type: "url" }),
        defineField({ name: "instagram", type: "url" }),
        defineField({ name: "linkedin", type: "url" }),
        defineField({ name: "twitter", type: "url" }),
        defineField({ name: "youtube", type: "url" }),
      ],
    }),
    defineField({
      name: "footerColumns",
      type: "array",
      of: [
        {
          type: "object",
          fields: [
            defineField({ name: "heading", type: "string" }),
            defineField({
              name: "links",
              type: "array",
              of: [
                {
                  type: "object",
                  fields: [
                    defineField({ name: "label", type: "string" }),
                    defineField({ name: "href", type: "string" }),
                    defineField({ name: "external", type: "boolean", initialValue: false }),
                  ],
                  preview: { select: { title: "label", subtitle: "href" } },
                },
              ],
            }),
          ],
          preview: { select: { title: "heading" } },
        },
      ],
    }),
    defineField({
      name: "euCoFundingNote",
      type: "string",
      initialValue: "Co-funded by the European Union · EU/WBF Joint Action Phase III",
    }),
  ],
  preview: { prepare: () => ({ title: "Site Settings" }) },
});
