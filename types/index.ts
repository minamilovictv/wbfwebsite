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
  | "science-research";

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
  /** @deprecated Use `programs` (array). Will be removed in Phase B. */
  program?: Program;
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
