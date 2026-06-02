// ─── Shared Primitives ─────────────────────────────────────────────────────

export interface SanityImage {
  _type: "image";
  asset: { _ref: string; _type: "reference" };
  alt?: string;
  caption?: string;
  hotspot?: { x: number; y: number; height: number; width: number };
}

export interface Slug {
  _type: "slug";
  current: string;
}

export interface LocaleString {
  en: string;
  sr?: string;
  mk?: string;
  sq?: string;
  bs?: string;
  me?: string;
}

export interface SEOMeta {
  title?: string;
  description?: string;
  ogImage?: SanityImage;
  noIndex?: boolean;
}

export type Status = "active" | "upcoming" | "closed" | "archived";
export type Language = "en" | "sr" | "mk" | "sq" | "bs" | "me";

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  perPage: number;
  totalPages: number;
}

// ─── Countries / Member States ─────────────────────────────────────────────

export type CountryCode = "AL" | "BA" | "XK" | "MK" | "ME" | "RS";

export interface Country {
  _id: string;
  code: CountryCode;
  name: string;
  flag: string;
  region?: string;
  memberSince?: string;
  nationalFocalPoint?: string;
  nationalFocalPointEmail?: string;
}

// ─── Programs ──────────────────────────────────────────────────────────────

export type ProgramPillar =
  | "regional-cooperation"
  | "youth-mobility"
  | "cultural-heritage"
  | "economic-development"
  | "civil-society"
  | "environment"
  | "digitalization"
  | "science-research"
  | "governance";

export type ProgramIcon =
  | "globe"
  | "book"
  | "leaf"
  | "users"
  | "scale"
  | "lightbulb"
  | "heart"
  | "briefcase"
  | "graduation-cap"
  | "shield";

export type ProgramColor =
  | "brand"
  | "emerald"
  | "green"
  | "teal"
  | "amber"
  | "rose"
  | "slate";

export type TimelineStepStatus = "done" | "active" | "pending";
export type CtaVariant = "primary" | "secondary";
export type StoryGradient = "brand" | "slate-brand" | "emerald" | "teal" | "amber";
export type StatusDotColor = "amber" | "emerald" | "rose" | "teal" | "slate";

export interface ProgramHero {
  statusPill?: { text?: string; dotColor?: StatusDotColor };
  tagline?: string;
  footnote?: string;
  ctas?: { _key?: string; label: string; url: string; variant?: CtaVariant; external?: boolean }[];
  metaFacts?: { _key?: string; key: string; value: string }[];
}

export interface ProgramKeyFacts {
  heading?: string;
  items?: { _key?: string; label: string; value: string }[];
}

export interface ProgramTimeline {
  heading?: string;
  steps?: { _key?: string; date: string; description: string; status?: TimelineStepStatus }[];
}

export interface ProgramNotifySignup {
  enabled?: boolean;
  overline?: string;
  title?: string;
  description?: string;
  organizationPlaceholder?: string;
  emailPlaceholder?: string;
  buttonLabel?: string;
}

export interface ProgramAbout {
  overline?: string;
  title?: string;
  paragraphs?: string[];
  outcomesHeading?: string;
  outcomes?: string[];
  annualCycle?: {
    enabled?: boolean;
    label?: string;
    sublabel?: string;
    leftText?: string;
    rightText?: string;
  };
  showWb6Coverage?: boolean;
}

export interface ProgramInterventionAreas {
  overline?: string;
  title?: string;
  intro?: string;
  areas?: {
    _key?: string;
    icon?: ProgramIcon;
    title: string;
    description: string;
    color?: ProgramColor;
  }[];
  crossCuttingTags?: string[];
  crossCuttingHeading?: string;
  activityRulesHeading?: string;
  activityRules?: string[];
}

export interface ProgramEligibility {
  overline?: string;
  title?: string;
  intro?: string;
  organizations?: { _key?: string; title: string; description: string }[];
  partnershipNote?: string;
  partnershipSubnote?: string;
  partnershipCtaLabel?: string;
  partnershipCtaUrl?: string;
}

export interface ProgramFeaturedStories {
  overline?: string;
  title?: string;
  intro?: string;
  stories?: {
    _key?: string;
    emoji?: string;
    area?: string;
    callTag?: string;
    title: string;
    description: string;
    meta?: string;
    link?: string;
    gradient?: StoryGradient;
  }[];
}

export interface ProgramSubscribeCta {
  enabled?: boolean;
  title?: string;
  description?: string;
  emailPlaceholder?: string;
  buttonLabel?: string;
}

export interface Program {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  pillar: ProgramPillar;
  shortDescription: string;
  description: string; // rich text / portable text
  coverImage?: SanityImage;
  status: Status;
  totalBudget?: number;
  currency: "EUR" | "USD";
  openCallsCount?: number;
  projectsCount?: number;
  countries: CountryCode[];
  startDate?: string;
  endDate?: string;
  donors?: Donor[];
  relatedGrants?: Grant[];
  impactStats?: ImpactStat[];
  documents?: Document[];
  documentsHeading?: string;
  hero?: ProgramHero;
  keyFacts?: ProgramKeyFacts;
  timeline?: ProgramTimeline;
  notifySignup?: ProgramNotifySignup;
  about?: ProgramAbout;
  interventionAreas?: ProgramInterventionAreas;
  eligibility?: ProgramEligibility;
  featuredStories?: ProgramFeaturedStories;
  subscribeCta?: ProgramSubscribeCta;
  news?: NewsArticle[];
  newsTotal?: number;
  seo?: SEOMeta;
  featured?: boolean;
  order?: number;
}

// ─── Grants ────────────────────────────────────────────────────────────────

export type GrantType =
  | "mobility"
  | "project"
  | "institution-building"
  | "research"
  | "cultural"
  | "youth"
  | "civil-society"
  | "environmental";

export type GrantStatus = "open" | "upcoming" | "evaluation" | "closed" | "awarded";

export type EligibleApplicant =
  | "ngo"
  | "university"
  | "government-body"
  | "individual"
  | "sme"
  | "municipality"
  | "research-institute"
  | "cultural-institution";

export interface Grant {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  type: GrantType;
  status: GrantStatus;
  program?: Program;
  shortDescription: string;
  description: string;
  objectives?: string[];
  coverImage?: SanityImage;
  totalBudget: number;
  minGrantAmount: number;
  maxGrantAmount: number;
  currency: "EUR" | "USD";
  coFinancingRequired?: boolean;
  coFinancingRate?: number;
  eligibleCountries: CountryCode[];
  eligibleApplicants: EligibleApplicant[];
  deadline?: string;
  resultsDate?: string;
  projectStartDate?: string;
  projectEndDate?: string;
  applicationUrl?: string;
  applicationFormId?: string; // Tally form ID
  documents?: Document[];
  faqs?: FAQ[];
  contacts?: ContactPerson[];
  ogmsGrantId?: string; // OGMS integration reference
  partnershipPlatformId?: string;
  tags?: string[];
  seo?: SEOMeta;
  featured?: boolean;
}

// ─── Projects ──────────────────────────────────────────────────────────────

export type ProjectStatus = "ongoing" | "completed" | "suspended";

export interface Project {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  status: ProjectStatus;
  grant?: Grant;
  program?: Program;
  shortDescription: string;
  description: string;
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  implementingOrganization: string;
  partnerOrganizations?: string[];
  countries: CountryCode[];
  location?: string;
  grantAmount: number;
  currency: "EUR" | "USD";
  startDate: string;
  endDate?: string;
  beneficiaries?: number;
  outcomes?: string[];
  documents?: Document[];
  videos?: { title: string; url: string }[];
  ogmsProjectId?: string;
  tags?: string[];
  seo?: SEOMeta;
  featured?: boolean;
}

// ─── News & Media ──────────────────────────────────────────────────────────

export type NewsCategory =
  | "announcement"
  | "press-release"
  | "publication"
  | "story"
  | "event-recap"
  | "call-for-applications";

export interface NewsVideo {
  _key: string;
  title?: string;
  url: string;
}

export interface NewsLink {
  _key: string;
  label: string;
  url: string;
}

export interface NewsArticle {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  subtitle?: string;
  slug: Slug;
  category: NewsCategory;
  excerpt: string;
  body?: string;
  coverImage?: SanityImage;
  gallery?: SanityImage[];
  videos?: NewsVideo[];
  links?: NewsLink[];
  author?: Author;
  publishedAt: string;
  programs?: Program[];
  grant?: Grant;
  project?: Project;
  countries?: CountryCode[];
  tags?: string[];
  featured?: boolean;
  seo?: SEOMeta;
}

// ─── Events ────────────────────────────────────────────────────────────────

export type EventType =
  | "conference"
  | "workshop"
  | "webinar"
  | "info-session"
  | "networking"
  | "awards"
  | "training";

export type EventMode = "in-person" | "online" | "hybrid";

export interface WBFEvent {
  _id: string;
  _createdAt: string;
  _updatedAt: string;
  title: string;
  slug: Slug;
  type: EventType;
  mode: EventMode;
  shortDescription: string;
  description: string;
  coverImage?: SanityImage;
  startDate: string;
  endDate?: string;
  location?: string;
  city?: string;
  country?: CountryCode;
  onlineLink?: string;
  registrationUrl?: string;
  registrationDeadline?: string;
  capacity?: number;
  program?: Program;
  grant?: Grant;
  speakers?: Speaker[];
  agenda?: AgendaItem[];
  documents?: Document[];
  tags?: string[];
  featured?: boolean;
  seo?: SEOMeta;
}

// ─── Partners / Donors ─────────────────────────────────────────────────────

export type PartnerType =
  | "donor"
  | "implementing-partner"
  | "strategic-partner"
  | "network-member"
  | "observer";

export interface Partner {
  _id: string;
  name: string;
  slug: Slug;
  type: PartnerType;
  logo: SanityImage;
  website?: string;
  country?: string;
  description?: string;
  programs?: Program[];
  featured?: boolean;
  order?: number;
}

export interface Donor extends Partner {
  type: "donor";
  totalContribution?: number;
}

// ─── People ────────────────────────────────────────────────────────────────

export interface Person {
  _id: string;
  fullName: string;
  slug?: Slug;
  title?: string;
  role: string;
  department?: string;
  bio?: string;
  photo?: SanityImage;
  email?: string;
  linkedin?: string;
  country?: CountryCode;
  featured?: boolean;
  order?: number;
}

export type Author = Pick<Person, "_id" | "fullName" | "photo" | "role">;
export type Speaker = Pick<Person, "_id" | "fullName" | "photo" | "role" | "title">;
export type ContactPerson = Pick<Person, "_id" | "fullName" | "photo" | "role" | "email">;

// ─── Supporting Types ──────────────────────────────────────────────────────

export interface Document {
  _key: string;
  title: string;
  subtitle?: string;
  file: { asset: { _ref: string; url?: string } };
  type?: "guidelines" | "form" | "report" | "budget-template" | "policy" | "other";
  language?: Language;
  size?: string;
}

export interface FAQ {
  _key: string;
  question: string;
  answer: string;
}

export interface ImpactStat {
  _key: string;
  label: string;
  value: string;
  unit?: string;
  icon?: string;
  description?: string;
}

export interface AgendaItem {
  _key: string;
  time: string;
  title: string;
  description?: string;
  speaker?: string;
  location?: string;
  type?: "session" | "break" | "networking" | "keynote";
}

// ─── API Integration ───────────────────────────────────────────────────────

/** OGMS (Open Grant Management System) types */
export interface OGMSGrant {
  id: string;
  title: string;
  status: string;
  deadline: string;
  budget: number;
  currency: string;
  programId: string;
  eligibility: string[];
  applicationUrl: string;
  createdAt: string;
  updatedAt: string;
}

export interface OGMSApplication {
  id: string;
  grantId: string;
  applicantId: string;
  status: "submitted" | "under-review" | "approved" | "rejected" | "revision-requested";
  submittedAt: string;
  updatedAt: string;
}

export interface OGMSProject {
  id: string;
  applicationId: string;
  title: string;
  grantee: string;
  amount: number;
  startDate: string;
  endDate: string;
  status: string;
  reportingDue?: string;
}

/** Partnership Platform types */
export interface PartnershipOrganization {
  id: string;
  name: string;
  type: string;
  country: string;
  sector: string;
  verified: boolean;
  registeredAt: string;
}

export interface PartnershipCall {
  id: string;
  title: string;
  description: string;
  initiatorId: string;
  status: "open" | "closed";
  deadline: string;
  countries: string[];
  sectors: string[];
}

// ─── Navigation ────────────────────────────────────────────────────────────

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
  badge?: string;
  icon?: string;
  description?: string;
  external?: boolean;
}

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

// ─── Filters & Search ──────────────────────────────────────────────────────

export interface GrantFilters {
  type?: GrantType;
  status?: GrantStatus;
  country?: CountryCode;
  applicant?: EligibleApplicant;
  minAmount?: number;
  maxAmount?: number;
  program?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

export interface ProjectFilters {
  status?: ProjectStatus;
  country?: CountryCode;
  program?: string;
  grant?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

export interface NewsFilters {
  category?: NewsCategory;
  country?: CountryCode;
  program?: string;
  search?: string;
  page?: number;
  perPage?: number;
}

// ─── Mega menu ─────────────────────────────────────────────────────────────

export type NavGroup = "funding" | "capacity";
export type NavStatusKey = "open" | "review" | "results" | "soon";

export interface NavProgram {
  _id: string;
  title: string;
  slug: string;
  navGroup?: NavGroup;
  status?: Status;
  navStatus?: NavStatusKey;
}

// ─── Generic CMS page ──────────────────────────────────────────────────────

export interface PageHeroBlock {
  overline?: string;
  title?: string;
  description?: string;
  variant?: "default" | "compact";
  coverImage?: SanityImage;
}

export type PageBodyBlock =
  | { _type: "block"; _key: string; children?: { text?: string }[]; style?: string }
  | {
      _type: "statsGrid";
      _key: string;
      heading?: string;
      stats?: { _key?: string; value: string; label: string; sub?: string }[];
    }
  | {
      _type: "cardsGrid";
      _key: string;
      heading?: string;
      intro?: string;
      cards?: { _key?: string; icon?: string; title: string; description?: string; href?: string }[];
    }
  | {
      _type: "callout";
      _key: string;
      title?: string;
      description?: string;
      ctaLabel?: string;
      ctaHref?: string;
      variant?: "dark" | "light";
    };

export interface CMSPage {
  _id: string;
  title: string;
  slug: Slug;
  hero?: PageHeroBlock;
  body?: PageBodyBlock[];
  seo?: SEOMeta;
}

// ─── About / Impact supporting types ───────────────────────────────────────

export interface MemberState {
  _id: string;
  name: string;
  code: CountryCode;
  flag?: string;
  capital?: string;
  population?: string;
  languages?: string;
  memberSince?: string;
  focalPoint?: string;
  focalPointEmail?: string;
  description?: string;
}

export interface Milestone {
  _id: string;
  year: string;
  event: string;
}

export interface StrategicPillar {
  _id: string;
  title: string;
  number?: string;
  icon?: string;
  description?: string;
  targets?: string[];
}

export interface Report {
  _id: string;
  title: string;
  year: string;
  type:
    | "annual-report"
    | "financial-statement"
    | "audit"
    | "joint-action"
    | "statute"
    | "other";
  language?: Language;
  summary?: string;
  file?: { asset?: { url?: string; size?: number; mimeType?: string } };
  externalUrl?: string;
}

export interface JobOpening {
  _id: string;
  title: string;
  slug: Slug;
  type?: "full-time" | "part-time" | "consultant" | "internship";
  location?: string;
  deadline?: string;
  summary?: string;
  applicationUrl?: string;
}

export interface Award {
  _id: string;
  title: string;
  edition?: string;
  category?: string;
  winner?: string;
  country?: CountryCode;
  citation?: string;
  year?: string;
  photo?: SanityImage;
  relatedProgram?: { _id: string; title: string; slug: Slug };
}

export interface Story {
  _id: string;
  title: string;
  slug: Slug;
  area?: string;
  callTag?: string;
  emoji?: string;
  summary?: string;
  meta?: string;
  link?: string;
  gradient?: "brand" | "slate-brand" | "emerald" | "teal" | "amber";
  coverImage?: SanityImage;
  countries?: string[];
  program?: { _id: string; title: string; slug: Slug };
}

// Donor type is declared earlier in this file (extends Partner).

// ─── Site settings singleton ──────────────────────────────────────────────

export interface SiteSettings {
  title?: string;
  tagline?: string;
  missionStatement?: string;
  contact?: { address?: string; email?: string; phone?: string };
  social?: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
    youtube?: string;
  };
  footerColumns?: {
    _key?: string;
    heading?: string;
    links?: { _key?: string; label: string; href: string; external?: boolean }[];
  }[];
  euCoFundingNote?: string;
}
