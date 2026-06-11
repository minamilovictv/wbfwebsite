import { defineField, defineType } from "sanity";

export const partnerSchema = defineType({
  name: "partner",
  title: "Partners & Donors",
  type: "document",
  groups: [
    { name: "basic", title: "Basic Information", default: true },
    { name: "branding", title: "Branding" },
    { name: "links", title: "Links" },
    { name: "partnership", title: "Partnership Information" },
    { name: "impact", title: "Impact & Profile" },
    { name: "visibility", title: "Visibility" },
  ],
  fields: [
    // ── Basic Information ──────────────────────────────────────────────
    defineField({ name: "name", title: "Partner Name", type: "string", group: "basic", validation: (r) => r.required() }),
    defineField({ name: "shortName", title: "Short Name (optional)", type: "string", group: "basic" }),
    defineField({ name: "slug", type: "slug", options: { source: "name" }, group: "basic" }),
    defineField({
      name: "type",
      title: "Partner Category",
      type: "string",
      group: "basic",
      options: { list: [
        { value: "donor", title: "Donor" },
        { value: "strategic-partner", title: "Strategic Partner" },
        { value: "institutional-partner", title: "Institutional Partner" },
        { value: "programme-partner", title: "Programme Partner" },
        { value: "regional-partner", title: "Regional Partner" },
        { value: "implementing-partner", title: "Implementing Partner" },
        { value: "network-member", title: "Network Member" },
        { value: "observer", title: "Observer" },
      ] },
      validation: (r) => r.required(),
    }),
    defineField({ name: "description", title: "Description (short)", type: "text", rows: 3, group: "basic" }),
    defineField({ name: "longDescription", title: "Long Description", type: "text", rows: 8, group: "basic" }),
    defineField({ name: "country", type: "string", group: "basic" }),

    // ── Branding ───────────────────────────────────────────────────────
    defineField({
      name: "logo",
      type: "image",
      group: "branding",
      options: { hotspot: true },
      description:
        "Upload SVG or transparent PNG, ideally 800×400 px (2:1), with surrounding whitespace trimmed. Logos are always displayed uncropped at their original aspect ratio.",
    }),
    defineField({
      name: "altLogo",
      title: "Alternative Logo (optional)",
      type: "image",
      group: "branding",
      description: "E.g. a white/monochrome variant for dark backgrounds.",
    }),
    defineField({
      name: "partnerColor",
      title: "Partner Color (optional)",
      type: "string",
      group: "branding",
      description: "Brand hex color, e.g. #003399.",
    }),
    defineField({ name: "featured", title: "Featured Partner", type: "boolean", initialValue: false, group: "branding" }),

    // ── Links ──────────────────────────────────────────────────────────
    defineField({ name: "website", title: "Official Website", type: "url", group: "links" }),
    defineField({ name: "partnershipPageUrl", title: "Partnership Page URL (optional)", type: "url", group: "links" }),
    defineField({
      name: "externalResources",
      title: "External Resources (optional)",
      type: "array",
      group: "links",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", type: "string", validation: (r) => r.required() }),
          defineField({ name: "url", type: "url", validation: (r) => r.required() }),
        ],
      }],
    }),

    // ── Partnership Information ────────────────────────────────────────
    defineField({ name: "startYear", title: "Partnership Start Year", type: "number", group: "partnership" }),
    defineField({
      name: "status",
      title: "Partnership Status",
      type: "string",
      group: "partnership",
      options: { list: [
        { value: "active", title: "Active" },
        { value: "concluded", title: "Concluded" },
        { value: "paused", title: "Paused" },
      ] },
      initialValue: "active",
    }),
    defineField({ name: "isFundingPartner", title: "Funding Partner", type: "boolean", initialValue: false, group: "partnership" }),
    defineField({ name: "isImplementingPartner", title: "Implementing Partner", type: "boolean", initialValue: false, group: "partnership" }),
    defineField({ name: "isStrategicPartner", title: "Strategic Partner", type: "boolean", initialValue: false, group: "partnership" }),

    // ── Impact & Profile (all optional, used on the partner profile page) ──
    defineField({ name: "partnershipOverview", title: "Partnership Overview", type: "text", rows: 8, group: "impact" }),
    defineField({
      name: "keyAchievements",
      title: "Key Achievements",
      type: "array",
      of: [{ type: "string" }],
      group: "impact",
    }),
    defineField({
      name: "supportedProgrammes",
      title: "Supported Programmes",
      type: "array",
      of: [{ type: "reference", to: [{ type: "program" }] }],
      group: "impact",
    }),
    defineField({
      name: "supportedCalls",
      title: "Supported Calls for Proposals",
      type: "array",
      of: [{ type: "string" }],
      group: "impact",
    }),
    defineField({
      name: "supportedEvents",
      title: "Supported Events",
      type: "array",
      of: [{ type: "reference", to: [{ type: "event" }] }],
      group: "impact",
    }),
    defineField({
      name: "impactMetrics",
      title: "Impact Metrics",
      type: "array",
      group: "impact",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "value", type: "string", title: "Value", description: "e.g. “€1.2M”, “45 projects”", validation: (r) => r.required() }),
          defineField({ name: "label", type: "string", title: "Label", validation: (r) => r.required() }),
        ],
        preview: { select: { title: "value", subtitle: "label" } },
      }],
    }),
    defineField({ name: "beneficiaryInfo", title: "Beneficiary Information", type: "text", rows: 4, group: "impact" }),
    defineField({ name: "fundingInfo", title: "Funding Information", type: "text", rows: 4, group: "impact" }),
    defineField({
      name: "successStories",
      title: "Success Stories",
      type: "array",
      of: [{ type: "reference", to: [{ type: "story" }] }],
      group: "impact",
    }),
    defineField({
      name: "publications",
      title: "Publications",
      type: "array",
      group: "impact",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", type: "string", validation: (r) => r.required() }),
          defineField({ name: "url", type: "url" }),
        ],
      }],
    }),
    defineField({
      name: "downloads",
      title: "Downloads",
      type: "array",
      group: "impact",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", type: "string", validation: (r) => r.required() }),
          defineField({ name: "file", type: "file" }),
        ],
      }],
    }),

    // ── Visibility ─────────────────────────────────────────────────────
    defineField({
      name: "featuredOnHomepage",
      title: "Featured on Homepage",
      type: "boolean",
      initialValue: false,
      group: "visibility",
      description: "Show this partner in the homepage “Supported By” strip.",
    }),
    defineField({
      name: "featuredOnAboutPage",
      title: "Featured on About Page",
      type: "boolean",
      initialValue: false,
      group: "visibility",
      description: "Show this partner in the About page Partners section.",
    }),
    defineField({ name: "order", title: "Sort Order", type: "number", group: "visibility" }),
  ],
  preview: {
    select: { title: "name", subtitle: "type", media: "logo" },
    prepare({ title, subtitle, media }) { return { title, subtitle, media }; },
  },
  orderings: [
    { title: "Sort Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
  ],
});
