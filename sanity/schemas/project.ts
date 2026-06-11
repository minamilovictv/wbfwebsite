import { defineField, defineType } from "sanity";

export const projectSchema = defineType({
  name: "project",
  title: "Grantees / Projects",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Grantee / Project Title", type: "string", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" } }),
    defineField({
      name: "status",
      title: "Status",
      type: "string",
      options: {
        list: [
          { value: "ongoing", title: "Ongoing" },
          { value: "completed", title: "Completed" },
          { value: "suspended", title: "Suspended" },
        ],
        layout: "radio",
      },
      initialValue: "ongoing",
    }),
    defineField({
      name: "granteeType",
      title: "Grantee Type",
      type: "string",
      options: {
        list: [
          { value: "organization", title: "Organization" },
          { value: "individual", title: "Individual" },
        ],
        layout: "radio",
      },
      initialValue: "organization",
    }),
    defineField({ name: "grant", type: "reference", to: [{ type: "grant" }] }),
    defineField({ name: "program", title: "Program", type: "reference", to: [{ type: "program" }] }),
    defineField({
      name: "shortDescription",
      title: "Short Description",
      type: "text",
      rows: 3,
      description: "Two sentences — shown on the grantee card and at the top of the profile page.",
      validation: (r) => r.required().max(300),
    }),
    defineField({ name: "description", title: "Full Project Description", type: "text" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, fields: [defineField({ name: "alt", type: "string" })] }),
    defineField({ name: "gallery", type: "array", of: [{ type: "image", fields: [defineField({ name: "alt", type: "string" })] }] }),
    defineField({ name: "implementingOrganization", title: "Lead Organisation / Grantee", type: "string", validation: (r) => r.required() }),
    defineField({ name: "partnerOrganizations", type: "array", of: [{ type: "string" }] }),
    defineField({
      name: "countries",
      title: "Contracting Parties",
      type: "array",
      of: [{ type: "string" }],
      options: { list: [
        { value: "AL", title: "Albania" }, { value: "BA", title: "Bosnia and Herzegovina" },
        { value: "XK", title: "Kosovo*" }, { value: "MK", title: "North Macedonia" },
        { value: "ME", title: "Montenegro" }, { value: "RS", title: "Serbia" },
      ] },
    }),
    defineField({ name: "location", type: "string" }),
    defineField({ name: "grantAmount", title: "Grant Amount", type: "number", validation: (r) => r.required() }),
    defineField({ name: "currency", type: "string", options: { list: ["EUR", "USD"] }, initialValue: "EUR" }),
    defineField({ name: "startDate", title: "Period of Implementation — Start", type: "date", validation: (r) => r.required() }),
    defineField({ name: "endDate", title: "Period of Implementation — End", type: "date" }),
    defineField({
      name: "areasOfIntervention",
      title: "Areas of Intervention",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { value: "education-research", title: "Education & Scientific Research" },
          { value: "cultural-cooperation", title: "Cultural Cooperation" },
          { value: "sustainable-development", title: "Sustainable Development" },
        ],
      },
      description: "Multiple selections allowed. New options can be added to this list in the schema.",
    }),
    defineField({ name: "beneficiaries", type: "number" }),
    defineField({
      name: "outcomes",
      title: "Key Results",
      type: "array",
      of: [{ type: "string" }],
      description: "Shown as the “Key Results” checklist on the profile page.",
    }),
    defineField({
      name: "deliverables",
      title: "Deliverables",
      type: "array",
      description: "Documents, images, and videos produced by the project. The section is hidden when empty.",
      of: [
        {
          type: "object",
          name: "deliverableDocument",
          title: "Document",
          fields: [
            defineField({ name: "title", type: "string", validation: (r) => r.required() }),
            defineField({ name: "file", type: "file" }),
          ],
          preview: { select: { title: "title" }, prepare: ({ title }) => ({ title, subtitle: "Document" }) },
        },
        {
          type: "object",
          name: "deliverableImage",
          title: "Image",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "image", type: "image", options: { hotspot: true }, validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title", media: "image" }, prepare: ({ title, media }) => ({ title: title ?? "Image", subtitle: "Image", media }) },
        },
        {
          type: "object",
          name: "deliverableVideo",
          title: "Video",
          fields: [
            defineField({ name: "title", type: "string" }),
            defineField({ name: "url", title: "Video URL", type: "url", description: "YouTube or Vimeo link.", validation: (r) => r.required() }),
          ],
          preview: { select: { title: "title" }, prepare: ({ title }) => ({ title: title ?? "Video", subtitle: "Video" }) },
        },
      ],
    }),
    defineField({
      name: "relatedNews",
      title: "Related News",
      type: "array",
      of: [{ type: "reference", to: [{ type: "news" }] }],
      description:
        "Optional manual additions. News articles whose “Project” field points at this grantee appear automatically.",
    }),
    defineField({ name: "ogmsProjectId", type: "string" }),
    defineField({ name: "tags", type: "array", of: [{ type: "string" }] }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({ name: "seo", type: "object", fields: [
      defineField({ name: "title", type: "string" }),
      defineField({ name: "description", type: "text", rows: 2 }),
    ] }),
  ],
  preview: {
    select: { title: "title", subtitle: "implementingOrganization", media: "coverImage" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
});
