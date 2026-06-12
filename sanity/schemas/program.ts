import { defineField, defineType } from "sanity";

const ICON_LIST = [
  { value: "globe", title: "Globe (Cultural)" },
  { value: "book", title: "Book (Education)" },
  { value: "leaf", title: "Leaf (Environment)" },
  { value: "users", title: "Users (Community)" },
  { value: "scale", title: "Scale (Governance)" },
  { value: "lightbulb", title: "Lightbulb (Innovation)" },
  { value: "heart", title: "Heart (Social)" },
  { value: "briefcase", title: "Briefcase (Business)" },
  { value: "graduation-cap", title: "Graduation Cap (Academic)" },
  { value: "shield", title: "Shield (Rights)" },
];

const COLOR_LIST = [
  { value: "brand", title: "Brand Blue" },
  { value: "emerald", title: "Emerald" },
  { value: "green", title: "Green" },
  { value: "teal", title: "Teal" },
  { value: "amber", title: "Amber" },
  { value: "rose", title: "Rose" },
  { value: "slate", title: "Slate" },
];

const STATUS_DOT_LIST = [
  { value: "amber", title: "Amber (Under Review)" },
  { value: "emerald", title: "Emerald (Active / Open)" },
  { value: "rose", title: "Rose (Closed)" },
  { value: "teal", title: "Teal (Upcoming)" },
  { value: "slate", title: "Slate (Neutral)" },
];

const TIMELINE_STATUS_LIST = [
  { value: "done", title: "Done" },
  { value: "active", title: "Active (current step)" },
  { value: "pending", title: "Pending" },
];

const CTA_VARIANT_LIST = [
  { value: "primary", title: "Primary (light pill)" },
  { value: "secondary", title: "Secondary (outline)" },
];

export const programSchema = defineType({
  name: "program",
  title: "Programs",
  type: "document",
  groups: [
    { name: "content", title: "Content" },
    { name: "hero", title: "Hero" },
    { name: "callInfo", title: "Call Info" },
    { name: "about", title: "About" },
    { name: "areas", title: "Areas & Eligibility" },
    { name: "stories", title: "Featured Stories" },
    { name: "subscribe", title: "Subscribe CTA" },
    { name: "settings", title: "Settings" },
    { name: "seo", title: "SEO" },
  ],
  fields: [
    // ─── Core ───────────────────────────────────────────────────────────
    defineField({ name: "title", type: "string", group: "content", validation: (r) => r.required() }),
    defineField({ name: "slug", type: "slug", options: { source: "title" }, group: "settings", validation: (r) => r.required() }),
    defineField({
      name: "pillar",
      type: "string",
      group: "settings",
      options: {
        list: [
          { value: "regional-cooperation", title: "Regional Cooperation" },
          { value: "youth-mobility", title: "Youth Mobility" },
          { value: "cultural-heritage", title: "Cultural Heritage" },
          { value: "economic-development", title: "Economic Development" },
          { value: "civil-society", title: "Civil Society" },
          { value: "environment", title: "Environment" },
          { value: "digitalization", title: "Digitalization" },
          { value: "science-research", title: "Science & Research" },
          { value: "governance", title: "Governance" },
        ],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "shortDescription", type: "text", rows: 3, group: "content", validation: (r) => r.required().max(300) }),
    defineField({ name: "description", type: "text", group: "content" }),
    defineField({ name: "coverImage", type: "image", options: { hotspot: true }, group: "content", fields: [
      defineField({ name: "alt", type: "string" }),
    ] }),
    defineField({
      name: "status",
      type: "string",
      group: "settings",
      options: { list: ["active", "upcoming", "closed", "archived"], layout: "radio" },
      initialValue: "active",
    }),
    defineField({ name: "totalBudget", type: "number", group: "settings" }),
    defineField({
      name: "currency",
      type: "string",
      options: { list: ["EUR", "USD"], layout: "radio" },
      initialValue: "EUR",
      group: "settings",
    }),
    defineField({
      name: "countries",
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
      group: "settings",
    }),
    defineField({ name: "startDate", type: "date", group: "settings" }),
    defineField({ name: "endDate", type: "date", group: "settings" }),

    // ─── Hero ───────────────────────────────────────────────────────────
    defineField({
      name: "hero",
      title: "Hero",
      type: "object",
      group: "hero",
      options: { collapsible: true, collapsed: false },
      fields: [
        defineField({
          name: "statusPill",
          title: "Status pill",
          type: "object",
          description: "Small pill above the title (e.g. 'Call No. 8 · Now Under Review'). Omit to hide.",
          fields: [
            defineField({ name: "text", type: "string", title: "Text" }),
            defineField({
              name: "dotColor",
              type: "string",
              title: "Dot color",
              options: { list: STATUS_DOT_LIST },
              initialValue: "amber",
            }),
          ],
        }),
        defineField({ name: "tagline", type: "text", rows: 3, title: "Tagline (under title)" }),
        defineField({ name: "footnote", type: "string", title: "Footnote (small grey line below tagline)" }),
        defineField({
          name: "ctas",
          title: "Call-to-action buttons",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "label", type: "string", validation: (r) => r.required() }),
              defineField({ name: "url", type: "url", validation: (r) => r.required() }),
              defineField({
                name: "variant",
                type: "string",
                options: { list: CTA_VARIANT_LIST },
                initialValue: "primary",
              }),
              defineField({ name: "external", type: "boolean", initialValue: true }),
            ],
            preview: { select: { title: "label", subtitle: "url" } },
          }],
        }),
        defineField({
          name: "metaFacts",
          title: "Meta facts strip",
          description: "Key facts shown across the bottom of the hero (e.g. Status / Applications / Max Grant).",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "key", type: "string", title: "Label" }),
              defineField({ name: "value", type: "string", title: "Value" }),
            ],
            preview: { select: { title: "key", subtitle: "value" } },
          }],
        }),
      ],
    }),

    // ─── Call info cards (Key facts / Timeline / Notify) ─────────────────
    defineField({
      name: "keyFacts",
      title: "Key Facts card",
      type: "object",
      group: "callInfo",
      fields: [
        defineField({ name: "heading", type: "string", initialValue: "Key Facts" }),
        defineField({
          name: "items",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "label", type: "string" }),
              defineField({ name: "value", type: "string" }),
            ],
            preview: { select: { title: "label", subtitle: "value" } },
          }],
        }),
      ],
    }),
    defineField({
      name: "timeline",
      title: "Timeline card",
      type: "object",
      group: "callInfo",
      fields: [
        defineField({ name: "heading", type: "string", initialValue: "Timeline" }),
        defineField({
          name: "steps",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "date", type: "string", title: "Date / period" }),
              defineField({ name: "description", type: "string" }),
              defineField({
                name: "status",
                type: "string",
                options: { list: TIMELINE_STATUS_LIST, layout: "radio" },
                initialValue: "pending",
              }),
            ],
            preview: { select: { title: "date", subtitle: "description" } },
          }],
        }),
      ],
    }),
    defineField({
      name: "notifySignup",
      title: "Notify signup card",
      type: "object",
      group: "callInfo",
      fields: [
        defineField({ name: "enabled", type: "boolean", initialValue: false }),
        defineField({ name: "overline", type: "string", description: "Small label above title" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "organizationPlaceholder", type: "string", initialValue: "Title of organization" }),
        defineField({ name: "emailPlaceholder", type: "string", initialValue: "Your email address" }),
        defineField({ name: "buttonLabel", type: "string", initialValue: "Notify Me" }),
      ],
    }),

    // ─── About section ──────────────────────────────────────────────────
    defineField({
      name: "about",
      title: "About the Program",
      type: "object",
      group: "about",
      fields: [
        defineField({ name: "overline", type: "string", initialValue: "01 / About the Program" }),
        defineField({ name: "title", type: "string", description: "Use {{highlight}} markers to color a phrase in brand. Example: 'Building {{regional cooperation}} from the ground up'" }),
        defineField({ name: "paragraphs", type: "array", of: [{ type: "text", rows: 3 }] }),
        defineField({ name: "outcomesHeading", type: "string", initialValue: "Expected Outcomes" }),
        defineField({ name: "outcomes", type: "array", of: [{ type: "text", rows: 2 }] }),
        defineField({
          name: "annualCycle",
          title: "Annual cycle badge",
          type: "object",
          fields: [
            defineField({ name: "enabled", type: "boolean", initialValue: false }),
            defineField({ name: "label", type: "string" }),
            defineField({ name: "sublabel", type: "string" }),
            defineField({ name: "leftText", type: "string" }),
            defineField({ name: "rightText", type: "string" }),
          ],
        }),
        defineField({
          name: "showWb6Coverage",
          type: "boolean",
          title: "Show WB6 region coverage card",
          initialValue: true,
        }),
      ],
    }),

    // ─── Areas of intervention + Eligibility ─────────────────────────────
    defineField({
      name: "interventionAreas",
      title: "Areas of Intervention",
      type: "object",
      group: "areas",
      fields: [
        defineField({ name: "overline", type: "string", initialValue: "02 / Areas of Intervention" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 2 }),
        defineField({
          name: "areas",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "icon", type: "string", options: { list: ICON_LIST }, initialValue: "globe" }),
              defineField({ name: "title", type: "string" }),
              defineField({ name: "description", type: "text", rows: 3 }),
              defineField({ name: "color", type: "string", options: { list: COLOR_LIST }, initialValue: "brand" }),
            ],
            preview: { select: { title: "title", subtitle: "description" } },
          }],
        }),
        defineField({
          name: "crossCuttingTags",
          type: "array",
          of: [{ type: "string" }],
          description: "Short cross-cutting tags with optional leading emoji (e.g. '🌿 Green Agenda').",
        }),
        defineField({
          name: "crossCuttingHeading",
          type: "string",
          initialValue: "Cross-Cutting Issues — at least 3 mandatory",
        }),
        defineField({
          name: "activityRulesHeading",
          type: "string",
          initialValue: "Key Activity Rules",
        }),
        defineField({
          name: "activityRules",
          type: "array",
          of: [{ type: "text", rows: 2 }],
        }),
      ],
    }),
    defineField({
      name: "eligibility",
      title: "Eligibility",
      type: "object",
      group: "areas",
      fields: [
        defineField({ name: "overline", type: "string", initialValue: "03 / Eligibility" }),
        defineField({ name: "title", type: "string", initialValue: "Who can apply?" }),
        defineField({ name: "intro", type: "text", rows: 2 }),
        defineField({
          name: "organizations",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "title", type: "string" }),
              defineField({ name: "description", type: "text", rows: 3 }),
            ],
            preview: { select: { title: "title", subtitle: "description" } },
          }],
        }),
        defineField({
          name: "partnershipNote",
          type: "string",
          initialValue: "Your partnership must include partners from at least 3 of these 6 contracting parties",
        }),
        defineField({
          name: "partnershipSubnote",
          type: "text",
          rows: 2,
        }),
        defineField({ name: "partnershipCtaLabel", type: "string" }),
        defineField({ name: "partnershipCtaUrl", type: "url" }),
      ],
    }),

    // ─── Featured stories ───────────────────────────────────────────────
    defineField({
      name: "featuredStories",
      title: "Featured stories / Grantee highlights",
      type: "object",
      group: "stories",
      fields: [
        defineField({ name: "overline", type: "string", initialValue: "04 / Grantee Highlights" }),
        defineField({ name: "title", type: "string" }),
        defineField({ name: "intro", type: "text", rows: 2 }),
        defineField({
          name: "stories",
          type: "array",
          of: [{
            type: "object",
            fields: [
              defineField({ name: "emoji", type: "string", description: "Single emoji shown as artwork" }),
              defineField({ name: "area", type: "string", description: "Area pill (top-left)" }),
              defineField({ name: "callTag", type: "string", description: "Call pill (bottom-left)" }),
              defineField({ name: "title", type: "string" }),
              defineField({ name: "description", type: "text", rows: 3 }),
              defineField({ name: "meta", type: "string", description: "Footer meta (countries, applicants, etc.)" }),
              defineField({ name: "link", type: "url" }),
              defineField({
                name: "gradient",
                type: "string",
                options: {
                  list: [
                    { value: "brand", title: "Brand blue" },
                    { value: "slate-brand", title: "Slate → Brand" },
                    { value: "emerald", title: "Emerald" },
                    { value: "teal", title: "Teal" },
                    { value: "amber", title: "Amber" },
                  ],
                },
                initialValue: "brand",
              }),
            ],
            preview: { select: { title: "title", subtitle: "area" } },
          }],
        }),
      ],
    }),

    // ─── Documents (kept) ───────────────────────────────────────────────
    defineField({
      name: "impactStats",
      type: "array",
      group: "content",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "label", type: "string" }),
          defineField({ name: "value", type: "string" }),
          defineField({ name: "unit", type: "string" }),
          defineField({ name: "description", type: "text", rows: 2 }),
        ],
      }],
    }),
    defineField({
      name: "documents",
      type: "array",
      group: "content",
      of: [{
        type: "object",
        fields: [
          defineField({ name: "title", type: "string", validation: (r) => r.required() }),
          defineField({ name: "subtitle", type: "string", description: "Optional small label under title" }),
          defineField({ name: "file", type: "file", validation: (r) => r.required() }),
          defineField({
            name: "type",
            type: "string",
            options: { list: ["guidelines", "form", "report", "budget-template", "policy", "other"] },
          }),
          defineField({ name: "language", type: "string", options: { list: ["en", "sr", "mk", "sq", "bs"] } }),
        ],
      }],
    }),
    defineField({
      name: "documentsHeading",
      title: "Documents heading",
      type: "string",
      initialValue: "Document Depository",
      group: "content",
    }),

    // ─── Subscribe CTA ──────────────────────────────────────────────────
    defineField({
      name: "subscribeCta",
      title: "Bottom Subscribe CTA",
      type: "object",
      group: "subscribe",
      fields: [
        defineField({ name: "enabled", type: "boolean", initialValue: false }),
        defineField({ name: "title", type: "string", initialValue: "Stay Informed" }),
        defineField({ name: "description", type: "text", rows: 3 }),
        defineField({ name: "emailPlaceholder", type: "string", initialValue: "your.email@organization.org" }),
        defineField({ name: "buttonLabel", type: "string", initialValue: "Notify Me" }),
      ],
    }),

    // ─── Standard meta ──────────────────────────────────────────────────
    defineField({
      name: "donors",
      type: "array",
      of: [{ type: "reference", to: [{ type: "partner" }] }],
      group: "settings",
    }),
    defineField({ name: "featured", type: "boolean", initialValue: false, group: "settings" }),
    defineField({ name: "order", type: "number", group: "settings" }),
    defineField({
      name: "showInNav",
      title: "Show in mega menu",
      type: "boolean",
      initialValue: true,
      group: "settings",
    }),
    defineField({
      name: "navGroup",
      title: "Mega menu group",
      type: "string",
      group: "settings",
      options: {
        list: [
          { value: "funding", title: "Funding Opportunities" },
          { value: "conferences", title: "Conferences & Networking" },
          { value: "capacity", title: "Capacity Building" },
        ],
        layout: "radio",
      },
      initialValue: "funding",
    }),
    defineField({
      name: "navOrder",
      title: "Mega menu order",
      type: "number",
      group: "settings",
      description: "Sort order within the mega menu group (lower first). Independent of the main programs list order.",
      initialValue: 1,
    }),
    defineField({
      name: "navStatus",
      title: "Mega menu status dot",
      type: "string",
      group: "settings",
      description: "Color of the dot next to the program name in the dropdown. Defaults to status when empty.",
      options: {
        list: [
          { value: "open", title: "Open — accepting applications" },
          { value: "review", title: "Under Review" },
          { value: "results", title: "Results Announced" },
          { value: "soon", title: "Coming Soon" },
        ],
      },
    }),
    defineField({
      name: "seo",
      type: "object",
      group: "seo",
      fields: [
        defineField({ name: "title", type: "string" }),
        defineField({ name: "description", type: "text", rows: 2 }),
        defineField({ name: "ogImage", type: "image" }),
        defineField({ name: "noIndex", type: "boolean", initialValue: false }),
      ],
    }),
  ],
  preview: {
    select: { title: "title", subtitle: "pillar", media: "coverImage" },
    prepare({ title, subtitle, media }) {
      return { title, subtitle, media };
    },
  },
  orderings: [
    { title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] },
    { title: "Title A–Z", name: "titleAsc", by: [{ field: "title", direction: "asc" }] },
  ],
});
