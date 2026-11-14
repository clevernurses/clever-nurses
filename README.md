# clever-nurses
Clever Nurses builds practical, evidence-based tools and resources for nurses and nurse practitioners.

---

## Website (v2)

React + TypeScript + Tailwind CSS (Vite). Editorial Minimalism (60%) + Playful Learning Studio (25%) + Modern Visual Library (15%).

## Run it

```bash
npm install
npm run dev      # local preview
npm run build    # type-check + production build to dist/
```

`npm run build` makes a normal multi-file site in `dist/` (what Netlify deploys; see `netlify.toml`). `SINGLEFILE=1 npm run build` bundles everything into one HTML file for a portable preview.

## Structure

```
src/
  data/            ← all educational content lives here, not in pages
    types.ts         content model (Resource, Topic, Format, Audience, status, access…)
    resources.ts     library items (title, slug, topic, specialty, audience, difficulty,
                     format, summary, keyPoints, status, access, references, reviewedOn)
    topics.ts        22 topic categories with icon + accent color
    psychCollection.ts  Psych NCLEX Decision Maps™ plan (12 topics, honest status)
    questions.ts     Clinical Judgment Lab items (demo, pending review)
  components/      reusable UI: Header, Footer, ResourceCard, Thumbnail, LibraryBrowser,
                   TopicGrid, Frameworks, JudgmentExercise, HeroCollage, ui.tsx
  pages/           Home, Library, Resource detail, Psych, Lab, Advanced, Free, About,
                   Contact, Design System
  lib/             hash router, accent color map
tailwind.config.js ← design tokens (colors, fonts, radii, shadows, motion)
```

## Add a new resource

1. Add an object to `src/data/resources.ts`.
2. Set `status` (`draft` → `in-review` → `published`), `access` (`free` / `premium`), and after review fill `references` and `reviewedOn` (ISO date).
3. It appears automatically in search, filters, its topic count, related items and (if free) Free Resources. Its page is at `#r-<slug>`.

Thumbnails are generated from `format` + `thumb` labels until real artwork exists. To use final art, add a `thumbnail` image field and render an `<img>` in `Thumbnail.tsx` when present.

## Honest placeholders in this build

- All library items are samples (`draft`); no references or review dates are shown as complete.
- Clinical Judgment Lab items are labeled demonstration content pending clinical review, and not NCLEX questions.
- Psych NCLEX Decision Maps™: 1 outline in progress, 11 planned. Nothing is for sale.
- The contact form is not connected and says so on submit. There is no newsletter signup yet.
- Downloads are not live. Founder photo is a placeholder (`FounderPhoto` in `pages/About.tsx`).

---

# Roadmap: what each future feature needs

Build these in order: CMS → email → shop → memberships → progress → institutional.

## 1. Content management
- **Option A (recommended): a headless CMS** such as Sanity or Contentful, using the same fields as `Resource` in `types.ts`. Add a required "clinical review" step (reviewer, date, references) before an item can be set to `published`.
- **Option B (simplest): Markdown/MDX files in the repo** with frontmatter matching `Resource`, edited through a Git-based CMS such as Decap or TinaCMS.
- **Either way:**
  - Move to a framework with real URLs for SEO, such as Next.js or Astro (`/library/lithium-toxicity` instead of `#r-…`).
  - Generate per-page meta tags, a sitemap, and `LearningResource` schema.org data.
  - Use an image CDN for infographic files.

## 2. Email subscriptions
- **Provider:** ConvertKit (Kit), Beehiiv, or Mailchimp, embedded through their form API or a serverless function.
- **Signup flow:** double opt-in, plus a privacy policy page.
- **Segments:** tag by audience (Student / RN / APRN) and interest (e.g. Psych), so release announcements for the Psych collection can be targeted.

## 3. Digital product sales
- **Short term:** link out to Etsy or a Shopify / Lemon Squeezy / Gumroad product page from each `premium` resource. No payment code on the site.
- **Later:** use Stripe Checkout (hosted) with signed, expiring download links served from storage (S3 or R2) through a serverless function.
- **Requirements:** a refund policy, sales tax handled by the platform, and license terms (personal vs. classroom use).

## 4. Memberships / premium library
- **Services needed:**
  - Auth: Clerk, Auth0, or Supabase Auth.
  - Subscription billing: Stripe Billing.
  - Gated content: the CMS marks items `premium`, and the server checks entitlement before serving full content or downloads.
- **Scope:** don't build an LMS. A gated library plus the Lab is enough for v1.

## 5. Learning progress
- **Requires:** accounts (from step 4) and a small database (Supabase or Postgres).
- **Tables:**
  - `attempts`: user, question, answer, correct, timestamp.
  - `bookmarks`.
  - `completed_resources`.
- **Features:** a simple "your progress" page with streaks and topics practiced.
- **Privacy:** avoid storing anything beyond study activity.

## 6. Institutional licensing
- **Start manually:** a contact-form inquiry → a quote → invoice → a licensed PDF bundle or a seat-based access code.
- **Later:**
  - Organization accounts with seat management, and possibly SSO.
  - Usage reports for faculty.
  - A license agreement reviewed by an attorney.
- **Credibility first:** publish your clinical review process and an editorial policy page.

## Before launch (any phase)
- Clinically review each item and attach real references. Show the review date.
- Accessibility audit (axe and manual keyboard / screen-reader pass) against WCAG 2.2 AA.
- Add analytics that respect privacy, such as Plausible.
- Add Terms, Privacy, and Educational Disclaimer pages.
