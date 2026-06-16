# Western Balkans Fund — website

Static HTML site for [westernbalkansfund.org](https://westernbalkansfund.org).

## Structure

All pages live under [`html/`](./html). Each file is fully self-contained: HTML, CSS in a `<style>` block, and any JavaScript inline. No build step, no dependencies, no framework.

```
html/
├── index.html                    Home
├── about.html                    About WBF
├── about-governance.html         Governance
├── about-team.html               Our Team
├── about-accountability.html     Accountability / reports
├── about-careers.html            Careers
├── about-strategic-plan.html     Strategic Plan 2024–2028
├── about-member-states.html      The six Contracting Parties
├── our-programs.html             Programmes overview hub
├── programs.html                 All programmes (filterable)
├── ggi.html                      GGI Grants detail page
├── projects.html                 Funded projects
├── news.html                     News & announcements
├── events.html                   Events & activities
├── impact.html                   Our Impact overview
├── impact-stories.html           Grantee Stories
├── impact-awards.html            WBF Champion Awards
├── partners.html                 Donors & Partners
├── knowledge-hub.html            Resources for applicants & grantees
├── contact.html                  Contact form & office info
└── 404.html                      Not-found page
```

## CSV-driven content

Several pages are populated from published Google Sheet CSVs (no rebuild needed when content changes). Each one has a `CSV_URL` constant at the top of its `<script>` block — paste your "File → Share → Publish to web → CSV" URL there.

While `CSV_URL` is blank, each page falls back to a sample dataset so it renders out of the box.

Pages with a CSV source:

- `news.html` — articles
- `events.html` — events
- `projects.html` — funded projects
- `programs.html` — programme portfolio
- `impact-stories.html` — grantee stories
- `impact-awards.html` — champion awards
- `about-team.html` — secretariat members
- `about-accountability.html` — reports library
- `about-careers.html` — open positions

## Deploying

Any static host works — drop the contents of `html/` (or the whole folder) into:

- GitHub Pages — Settings → Pages → "Deploy from a branch" → `main` / `/html`
- Netlify / Cloudflare Pages — point the publish directory at `html/`
- Or just upload the folder to any web server

Open `html/index.html` locally in a browser to preview.

## Brand

- **Navy** `#1A3668` (primary brand)
- **Deep navy** `#0f2044` (footer + accents)
- **Teal** `#5eead4` / `#0d6e62` (highlights)
- **Gold** `#fbbf24` / `#b45309` (awards page)
- Serif: Georgia / Times New Roman · Sans: system stack
