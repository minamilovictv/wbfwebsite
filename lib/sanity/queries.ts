// GROQ queries for all content types

const groq = String.raw;

// ─── Shared fragments ──────────────────────────────────────────────────────

const imageFragment = `_type, asset, alt, caption, hotspot`;
const slugFragment = `_type, current`;
const seoFragment = `title, description, ogImage { ${imageFragment} }, noIndex`;
const programMinFragment = `_id, title, slug { ${slugFragment} }, pillar, status`;
const grantMinFragment = `_id, title, slug { ${slugFragment} }, status, type, minGrantAmount, maxGrantAmount, currency, deadline`;

// ─── Programs ──────────────────────────────────────────────────────────────

export const programsListQuery = groq`
  *[_type == "program" && !(_id in path("drafts.**"))]
  | order(order asc, title asc) {
    _id, _updatedAt, title, slug { ${slugFragment} }, pillar,
    shortDescription, status, totalBudget, currency,
    coverImage { ${imageFragment} },
    countries, featured, order,
    "openCallsCount": count(*[_type == "grant" && references(^._id) && status == "open"]),
    "projectsCount": count(*[_type == "project" && references(^._id)])
  }
`;

export const programBySlugQuery = groq`
  *[_type == "program" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id, _createdAt, _updatedAt, title, slug { ${slugFragment} },
    pillar, shortDescription, description, status,
    totalBudget, currency, countries, startDate, endDate,
    coverImage { ${imageFragment} },
    hero,
    keyFacts,
    timeline,
    notifySignup,
    about,
    interventionAreas,
    eligibility,
    featuredStories,
    subscribeCta,
    documentsHeading,
    impactStats, documents[]{..., file{asset->{url}}},
    donors[]->{ _id, name, logo { ${imageFragment} }, website },
    seo { ${seoFragment} },
    "openGrants": *[_type == "grant" && references(^._id) && status in ["open","upcoming"]]
      | order(deadline asc) { ${grantMinFragment} },
    "projects": *[_type == "project" && references(^._id)]
      | order(_createdAt desc)[0..5] {
        _id, title, slug { ${slugFragment} }, status, countries,
        implementingOrganization, grantAmount, currency,
        coverImage { ${imageFragment} }
      },
    "news": *[_type == "news"
        && references(^._id)
        && !(_id in path("drafts.**"))]
      | order(publishedAt desc)[0..5] {
        _id, title, subtitle, slug { ${slugFragment} }, category,
        excerpt, body, publishedAt, countries, tags,
        coverImage { ${imageFragment} },
        gallery[]{ ${imageFragment} },
        videos[]{ _key, title, url },
        links[]{ _key, label, url },
        author->{ _id, fullName, role, photo { ${imageFragment} } }
      },
    "newsTotal": count(*[_type == "news"
        && references(^._id)
        && !(_id in path("drafts.**"))])
  }
`;

// ─── Grants ────────────────────────────────────────────────────────────────

export const grantsListQuery = groq`
  *[_type == "grant" && !(_id in path("drafts.**"))]
  | order(coalesce(deadline, "9999") asc, _createdAt desc) {
    _id, _updatedAt, title, slug { ${slugFragment} }, type, status,
    shortDescription, totalBudget, minGrantAmount, maxGrantAmount,
    currency, deadline, eligibleCountries, eligibleApplicants,
    coverImage { ${imageFragment} }, featured,
    program->{ ${programMinFragment} },
    tags
  }
`;

export const openGrantsQuery = groq`
  *[_type == "grant" && status in ["open","upcoming"] && !(_id in path("drafts.**"))]
  | order(deadline asc) {
    _id, title, slug { ${slugFragment} }, type, status,
    shortDescription, minGrantAmount, maxGrantAmount, currency,
    deadline, eligibleCountries, coverImage { ${imageFragment} },
    program->{ ${programMinFragment} }
  }
`;

export const grantBySlugQuery = groq`
  *[_type == "grant" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id, _createdAt, _updatedAt, title, slug { ${slugFragment} },
    type, status, shortDescription, description, objectives,
    coverImage { ${imageFragment} },
    totalBudget, minGrantAmount, maxGrantAmount, currency,
    coFinancingRequired, coFinancingRate,
    eligibleCountries, eligibleApplicants,
    deadline, resultsDate, projectStartDate, projectEndDate,
    applicationUrl, applicationFormId,
    documents[]{..., file{asset->{url}}},
    faqs, contacts[]->{_id, fullName, role, email, photo { ${imageFragment} }},
    program->{ _id, title, slug { ${slugFragment} }, pillar },
    ogmsGrantId, partnershipPlatformId, tags,
    seo { ${seoFragment} }
  }
`;

// ─── Projects ──────────────────────────────────────────────────────────────

export const projectsListQuery = groq`
  *[_type == "project" && !(_id in path("drafts.**"))]
  | order(_createdAt desc) {
    _id, _updatedAt, title, slug { ${slugFragment} }, status,
    shortDescription, countries, implementingOrganization,
    grantAmount, currency, startDate, endDate, featured,
    coverImage { ${imageFragment} },
    program->{ ${programMinFragment} },
    grant->{ _id, title, slug { ${slugFragment} } },
    tags
  }
`;

export const projectBySlugQuery = groq`
  *[_type == "project" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id, _createdAt, _updatedAt, title, slug { ${slugFragment} },
    status, shortDescription, description,
    coverImage { ${imageFragment} }, gallery[]{ ${imageFragment} },
    implementingOrganization, partnerOrganizations,
    countries, location, grantAmount, currency,
    startDate, endDate, beneficiaries, outcomes,
    documents[]{..., file{asset->{url}}}, videos,
    program->{ _id, title, slug { ${slugFragment} }, pillar },
    grant->{ _id, title, slug { ${slugFragment} }, type },
    ogmsProjectId, tags,
    seo { ${seoFragment} }
  }
`;

// ─── News ──────────────────────────────────────────────────────────────────

export const newsListQuery = groq`
  *[_type == "news" && !(_id in path("drafts.**"))]
  | order(publishedAt desc) {
    _id, _updatedAt, title, subtitle, slug { ${slugFragment} }, category,
    excerpt, body, publishedAt, featured, countries, tags,
    coverImage { ${imageFragment} },
    gallery[]{ ${imageFragment} },
    videos[]{ _key, title, url },
    links[]{ _key, label, url },
    author->{ _id, fullName, role, photo { ${imageFragment} } },
    programs[]->{ ${programMinFragment} }
  }
`;

export const newsBySlugQuery = groq`
  *[_type == "news" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id, _createdAt, _updatedAt, title, slug { ${slugFragment} },
    category, excerpt, body, publishedAt, countries, tags,
    coverImage { ${imageFragment} },
    author->{ _id, fullName, role, bio, photo { ${imageFragment} } },
    programs[]->{ _id, title, slug { ${slugFragment} } },
    grant->{ _id, title, slug { ${slugFragment} } },
    project->{ _id, title, slug { ${slugFragment} } },
    seo { ${seoFragment} }
  }
`;

// ─── Events ────────────────────────────────────────────────────────────────

export const eventsListQuery = groq`
  *[_type == "event" && !(_id in path("drafts.**"))]
  | order(startDate asc) {
    _id, _updatedAt, title, slug { ${slugFragment} }, type, mode,
    shortDescription, startDate, endDate, city, country,
    registrationUrl, registrationDeadline, capacity,
    coverImage { ${imageFragment} }, featured,
    program->{ ${programMinFragment} }
  }
`;

export const eventBySlugQuery = groq`
  *[_type == "event" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id, _createdAt, _updatedAt, title, slug { ${slugFragment} },
    type, mode, shortDescription, description,
    coverImage { ${imageFragment} },
    startDate, endDate, location, city, country,
    onlineLink, registrationUrl, registrationDeadline, capacity,
    speakers[]->{
      _id, fullName, title, role, bio,
      photo { ${imageFragment} }
    },
    agenda, documents[]{..., file{asset->{url}}}, tags,
    program->{ _id, title, slug { ${slugFragment} } },
    seo { ${seoFragment} }
  }
`;

// ─── Partners ──────────────────────────────────────────────────────────────

export const partnersQuery = groq`
  *[_type == "partner" && !(_id in path("drafts.**"))]
  | order(order asc, name asc) {
    _id, name, slug { ${slugFragment} }, type, website, country,
    logo { ${imageFragment} }, description, featured, order
  }
`;

// ─── People / Team ─────────────────────────────────────────────────────────

export const teamQuery = groq`
  *[_type == "person" && !(_id in path("drafts.**"))]
  | order(order asc, fullName asc) {
    _id, fullName, slug { ${slugFragment} }, title, role, department,
    bio, biography, country, email, linkedin, featured, order,
    photo { ${imageFragment} }
  }
`;

// ─── Home Page ─────────────────────────────────────────────────────────────

export const homePageQuery = groq`
  {
    "featuredPrograms": *[_type == "program" && featured == true && !(_id in path("drafts.**"))]
      | order(order asc)[0..2] {
        _id, title, slug { ${slugFragment} }, pillar, shortDescription,
        coverImage { ${imageFragment} }, status
      },
    "openGrants": *[_type == "grant" && status in ["open","upcoming"] && !(_id in path("drafts.**"))]
      | order(deadline asc)[0..3] {
        _id, title, slug { ${slugFragment} }, type, status,
        minGrantAmount, maxGrantAmount, currency, deadline,
        program->{ _id, title }
      },
    "latestNews": *[_type == "news" && !(_id in path("drafts.**"))]
      | order(publishedAt desc)[0..3] {
        _id, title, slug { ${slugFragment} }, category, excerpt,
        publishedAt, coverImage { ${imageFragment} }
      },
    "upcomingEvents": *[_type == "event" && startDate > now() && !(_id in path("drafts.**"))]
      | order(startDate asc)[0..3] {
        _id, title, slug { ${slugFragment} }, type, mode,
        startDate, city, country, coverImage { ${imageFragment} }
      },
    "partners": *[_type == "partner" && featured == true && !(_id in path("drafts.**"))]
      | order(order asc) {
        _id, name, slug { ${slugFragment} }, logo { ${imageFragment} }, website
      }
  }
`;

// ─── Mega Menu (programs grouped by navGroup) ─────────────────────────────
export const navProgramsQuery = groq`
  *[_type == "program"
      && !(_id in path("drafts.**"))
      && showInNav != false]
    | order(navGroup asc, order asc, title asc) {
      _id, title, "slug": slug.current, navGroup, status, navStatus
    }
`;

// ─── Generic pages ────────────────────────────────────────────────────────
export const pageBySlugQuery = groq`
  *[_type == "page" && slug.current == $slug && !(_id in path("drafts.**"))][0] {
    _id, title, slug { ${slugFragment} },
    hero { overline, title, description, variant, coverImage { ${imageFragment} } },
    body,
    seo { ${seoFragment} }
  }
`;

// ─── About / Impact supporting collections ────────────────────────────────
export const memberStatesQuery = groq`
  *[_type == "memberState" && !(_id in path("drafts.**"))]
    | order(order asc, name asc) {
      _id, name, code, flag, capital, population, languages,
      memberSince, focalPoint, focalPointEmail, description
    }
`;

export const milestonesQuery = groq`
  *[_type == "milestone" && defined(title) && !(_id in path("drafts.**"))]
    | order(order asc, date asc) {
      _id, title, date, description, ctaLabel, ctaUrl, order,
      image { ${imageFragment} }
    }
`;

// ─── About page (singleton + supporting collections) ──────────────────────
export const aboutPageQuery = groq`
{
  "content": *[_type == "aboutPage" && _id == "aboutPage"][0] {
    mandateBody, mandateFootnote, missionBody, valuesBody, objectivesIntro,
    grantsCtaLabel, grantsCtaUrl, beyondGrantsIntro, beyondGrantsItems,
    partnersIntro, partnersCtaLabel, partnersCtaUrl
  },
  "milestones": *[_type == "milestone" && defined(title) && !(_id in path("drafts.**"))]
    | order(order asc, date asc) {
      _id, title, date, description, ctaLabel, ctaUrl, order,
      image { ${imageFragment} }
    },
  "beneficiaries": *[_type == "beneficiaryCategory" && !(_id in path("drafts.**"))]
    | order(order asc, name asc) { _id, name, group, order },
  "objectives": *[_type == "objective" && !(_id in path("drafts.**"))]
    | order(order asc, title asc) { _id, title, description, icon, order },
  "grantProgrammes": *[_type == "grantProgramme" && !(_id in path("drafts.**"))]
    | order(order asc, name asc) { _id, name, description, url, order },
  "partners": *[_type == "partner" && !(_id in path("drafts.**"))]
    | order(order asc, name asc) {
      _id, name, slug { ${slugFragment} }, type, website, description,
      featured, order, logo { ${imageFragment} }
    }
}
`;

export const strategicPillarsQuery = groq`
  *[_type == "strategicPillar" && !(_id in path("drafts.**"))]
    | order(order asc) { _id, title, number, icon, description, targets }
`;

export const reportsQuery = groq`
  *[_type == "report" && !(_id in path("drafts.**"))]
    | order(coalesce(publishedAt, year) desc) {
      _id, title, year, type, language, summary,
      file { asset->{ url, size, mimeType } }, externalUrl
    }
`;

export const openJobsQuery = groq`
  *[_type == "jobOpening" && status == "open" && !(_id in path("drafts.**"))]
    | order(publishedAt desc) {
      _id, title, slug { ${slugFragment} }, type, location,
      deadline, summary, applicationUrl
    }
`;

export const awardsQuery = groq`
  *[_type == "award" && !(_id in path("drafts.**"))]
    | order(order asc, year desc) {
      _id, title, edition, category, winner, country, citation, year,
      photo { ${imageFragment} },
      relatedProgram->{ _id, title, slug { ${slugFragment} } }
    }
`;

export const storiesQuery = groq`
  *[_type == "story" && !(_id in path("drafts.**"))]
    | order(order asc, _createdAt desc) {
      _id, title, slug { ${slugFragment} }, area, callTag, emoji,
      summary, meta, link, gradient,
      coverImage { ${imageFragment} },
      countries,
      program->{ _id, title, slug { ${slugFragment} } }
    }
`;

// ─── Site settings singleton ──────────────────────────────────────────────
export const siteSettingsQuery = groq`
  *[_type == "siteSettings"][0] {
    title, tagline, missionStatement,
    contact, social, footerColumns, euCoFundingNote
  }
`;

// ─── Donors (partners filtered by type) ───────────────────────────────────
export const donorsQuery = groq`
  *[_type == "partner" && type == "donor" && !(_id in path("drafts.**"))]
    | order(order asc, name asc) {
      _id, name, slug { ${slugFragment} }, country, website,
      description, logo { ${imageFragment} }
    }
`;
