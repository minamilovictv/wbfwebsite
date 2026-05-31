import { defineField, defineType } from "sanity";

export const grantSchema = defineType({
  name: "grant",
  title: "Grants",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "financial", title: "Financial" },
    { name: "eligibility", title: "Eligibility" },
    { name: "timeline", title: "Timeline" },
    { name: "integration", title: "Integrations" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, group: "content" }),
    defineField({
      name: "type",
      type: "string",
      group: "content",
      options: {
        list: [
          { value: "mobility", title: "Mobility" },
          { value: "project", title: "Project Grant" },
          { value: "institution-building", title: "Institution Building" },
          { value: "research", title: "Research" },
          { value: "cultural", title: "Cultural" },
          { value: "youth", title: "Youth" },
          { value: "civil-society", title: "Civil Society" },
          { value: "environmental", title: "Environmental" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({
      name: "status",
      type: "string",
      group: "content",
      options: { list: ["open", "upcoming", "evaluation", "closed", "awarded"], layout: "radio" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "program", type: "reference", to: [{ type: "program" }], group: "content" }),
    defineField({ name: "shortDescription", type: "text", rows: 3, group: "content", validation: (r) => r.required().max(300) }),
    defineField({ name: "description", type: "text", group: "content" }),
    defineField({
      name: "objectives",
      type: "array",
      of: [{ type: "string" }],
      group: "content",
    }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, group: "content", fields: [
      defineField({ name: "alt", type: "string" }),
    ] }),

    // Financial
    defineField({ name: "totalBudget", type: "number", group: "financial", validation: (r) => r.required() }),
    defineField({ name: "minGrantAmount", type: "number", group: "financial" }),
    defineField({ name: "maxGrantAmount", type: "number", group: "financial", validation: (r) => r.required() }),
    defineField({ name: "currency", type: "string", options: { list: ["EUR", "USD"] }, initialValue: "EUR", group: "financial" }),
    defineField({ name: "coFinancingRequired", type: "boolean", initialValue: false, group: "financial" }),
    defineField({ name: "coFinancingRate", type: "number", group: "financial" }),

    // Eligibility
    defineField({
      name: "eligibleCountries",
      type: "array",
      of: [{ type: "string" }],
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
      group: "eligibility",
    }),
    defineField({
      name: "eligibleApplicants",
      type: "array",
      of: [{ type: "string" }],
      options: {
        list: [
          { value: "ngo", title: "NGO / CSO" },
          { value: "university", title: "University" },
          { value: "government-body", title: "Government Body" },
          { value: "individual", title: "Individual" },
          { value: "sme", title: "SME" },
          { value: "municipality", title: "Municipality" },
          { value: "research-institute", title: "Research Institute" },
          { value: "cultural-institution", title: "Cultural Institution" },
        ],
      },
      group: "eligibility",
    }),

    // Timeline
    defineField({ name: "deadline", type: "datetime", group: "timeline" }),
    defineField({ name: "resultsDate", type: "date", group: "timeline" }),
    defineField({ name: "projectStartDate", type: "date", group: "timeline" }),
    defineField({ name: "projectEndDate", type: "date", group: "timeline" }),

    // Application
    defineField({ name: "applicationUrl", type: "url", group: "integration" }),
    defineField({ name: "applicationFormId", type: "string", group: "integration", description: "Tally.so form ID" }),
    defineField({ name: "ogmsGrantId", type: "string", group: "integration", description: "OGMS internal grant ID" }),
    defineField({ name: "partnershipPlatformId", type: "string", group: "integration" }),

    // Documents
    defineField({
      name: "documents",
      type: "array",
      group: "content",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", type: "string" }),
          defineField({ name: "file", type: "file" }),
          defineField({ name: "type", type: "string", options: { list: ["guidelines", "form", "report", "budget-template", "policy", "other"] } }),
        ],
      }],
    }),

    // FAQs
    defineField({
      name: "faqs",
      type: "array",
      group: "content",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "question", type: "string", validation: (r) => r.required() }),
          defineField({ name: "answer", type: "text", rows: 3, validation: (r) => r.required() }),
        ],
      }],
    }),

    // Contacts
    defineField({
      name: "contacts",
      type: "array",
      of: [{ type: "reference", to: [{ type: "person" }] }],
      group: "content",
    }),

    // Tags & SEO
    defineField({ name: "tags", type: "array", of: [{ type: "string" }], group: "content" }),
    defineField({ name: "featured", type: "boolean", initialValue: false, group: "content" }),
    defineField({
      name: "seo",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({ name: "noIndex", type: "boolean", initialValue: false }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "status", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle: `Status: ${subtitle}`, media };
    },
  },
});
