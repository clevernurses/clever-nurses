import { useState } from 'react';
import { LibraryBrowser } from '../components/LibraryBrowser';
import { JudgmentExercise } from '../components/JudgmentExercise';
import { Frameworks } from '../components/Frameworks';
import { Thumbnail } from '../components/Thumbnail';
import { Artwork, artworkUrl } from '../components/Artwork';
import { ResourceCard } from '../components/ResourceCard';
import { Icon } from '../components/Icon';
import { AccessPill, Notice, SectionHead, StatusPill } from '../components/ui';
import { RESOURCES, resourceBySlug } from '../data/resources';
import { findSubcategory, topicById } from '../data/topics';
import { related } from '../lib/taxonomy';
import type { Resource } from '../data/types';
import { PSYCH_COLLECTION } from '../data/psychCollection';
import { CJMM_STEPS } from '../data/questions';
import { Link } from '../lib/router';

function PageHero({ eyebrow, title, intro, children }: { eyebrow: string; title: React.ReactNode; intro: React.ReactNode; children?: React.ReactNode }) {
  return (
    <section className="wrap pb-14 pt-14 lg:pt-20">
      <p className="eyebrow mb-4">{eyebrow}</p>
      <h1 className="max-w-4xl text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[1]">{title}</h1>
      <p className="mt-6 max-w-2xl text-lg text-ink-soft sm:text-xl">{intro}</p>
      {children}
    </section>
  );
}

/* ---------------- Library ---------------- */
export function LibraryPage() {
  return (
    <>
      <PageHero eyebrow="Explore Library" title="The visual nursing library" intro="Original CleveRNurses infographics and new visual explainers. Search, or filter by topic, audience, difficulty, format and access. Explanations carry their review status; printables are sold on Etsy." />
      <section className="wrap"><LibraryBrowser /></section>
    </>
  );
}

/* ---------------- Resource detail (template) ---------------- */
export function ResourcePage({ slug }: { slug: string }) {
  const r = resourceBySlug(slug);
  if (!r) return <NotFound />;
  const rel = related(r, RESOURCES, 3);
  const primary = topicById(r.topic);
  const secondary = (r.secondaryTopics ?? []).map((id) => topicById(id)).filter(Boolean);
  const subs = (r.subcategories ?? []).map((id) => findSubcategory(id)).filter(Boolean);
  return (
    <>
      <section className="wrap pb-16 pt-10">
        <Link to="library" className="btn-ghost !px-0"><span className="rotate-180"><Icon name="arrow" size={18} /></span> Back to library</Link>
        <div className="mt-6 grid gap-10 lg:grid-cols-[1.15fr_1fr]">
          <div className="rounded-[2rem] bg-paper p-4 shadow-card ring-1 ring-line">
            {r.artwork ? <Artwork r={r} size="large" /> : <Thumbnail r={r} size="large" />}
            <p className="mt-3 text-center text-xs text-ink-mute">
              {r.artwork
                ? (artworkUrl(r) ? 'Original CleveRNurses infographic · preview' : `Original CleveRNurses infographic · image file pending (${r.artwork.file})`)
                : 'Preview layout · the final illustrated infographic replaces this after review'}
            </p>
          </div>
          <div>
            <div className="flex flex-wrap gap-2">
              <StatusPill status={r.status} /><AccessPill access={r.access} etsy={!!r.etsy} />
              {r.etsy && <span className="chip bg-coral-tint text-coral-deep">Printable on Etsy</span>}
            </div>
            <nav aria-label="Classification" className="eyebrow mt-6 flex flex-wrap items-center gap-x-1.5">
              <Link to="library" preset={{ topic: r.topic }} className="hover:text-ink">{primary?.name}</Link>
              {subs[0] && <><span aria-hidden>›</span><span>{subs[0]!.sub.name}</span></>}
              <span aria-hidden>·</span><span>{r.specialty}</span>
            </nav>
            <h1 className="mt-2 text-[clamp(2.25rem,4.6vw,3.5rem)] font-semibold leading-[1.02]">{r.title}</h1>
            <p className="mt-4 text-lg text-ink-soft">{r.summary}</p>
            <dl className="mt-6 grid grid-cols-3 gap-3 text-sm">
              {[['Format', r.format], ['Level', r.difficulty], ['For', r.audience.join(', ')]].map(([k, v]) => (
                <div key={k} className="rounded-2xl bg-paper p-3 ring-1 ring-line"><dt className="eyebrow !text-[10px]">{k}</dt><dd className="mt-1 font-semibold">{v}</dd></div>
              ))}
            </dl>
            {(secondary.length > 0 || (r.tags?.length ?? 0) > 0) && (
              <div className="mt-5 space-y-2.5 text-sm">
                {secondary.length > 0 && (
                  <p className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-ink-mute">Also in</span>
                    {secondary.map((t) => <Link key={t!.id} to="library" preset={{ topic: t!.id }} className="chip bg-paper text-ink ring-1 ring-line hover:ring-ink/40">{t!.name}</Link>)}
                  </p>
                )}
                {(r.tags?.length ?? 0) > 0 && (
                  <p className="flex flex-wrap items-center gap-1.5"><span className="mr-1 text-ink-mute">Tags</span>
                    {r.tags!.map((t) => <Link key={t} to="library" preset={{ query: t }} className="chip bg-ivory text-ink-soft hover:text-ink">{t}</Link>)}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="wrap grid gap-10 lg:grid-cols-[1.15fr_1fr]">
        <div className="space-y-12">
          <div>
            <h2 className="text-3xl font-semibold">Key learning points</h2>
            <ol className="mt-5 space-y-3">
              {r.keyPoints.map((k, i) => (
                <li key={k} className="flex gap-4 rounded-2xl bg-paper p-4 ring-1 ring-line">
                  <span className="font-mono text-sm text-teal">{String(i + 1).padStart(2, '0')}</span><span>{k}</span>
                </li>
              ))}
            </ol>
          </div>
          {r.considerations && r.considerations.length > 0 && (
            <div>
              <h2 className="text-3xl font-semibold">Clinical considerations</h2>
              <ul className="mt-5 space-y-3">
                {r.considerations.map((c) => (
                  <li key={c} className="flex gap-3"><span className="mt-2 h-2 w-2 shrink-0 rounded-full bg-coral" aria-hidden /><span className="text-ink-soft">{c}</span></li>
                ))}
              </ul>
            </div>
          )}
          {r.pearl && (
            <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-ink p-5 text-ivory">
              <span className="chip bg-sun text-ink">Clinical pearl</span>
              <p className="font-display text-lg font-medium">{r.pearl}</p>
            </div>
          )}
          {r.slug === 'which-patient-first' && (
            <div><Link to="lab" className="btn-primary">Practice in the Clinical Judgment Lab <Icon name="arrow" size={18} /></Link></div>
          )}
        </div>

        <aside className="space-y-4">
          {r.etsy && <EtsyPanel r={r} />}
          <div className="rounded-2xl bg-paper p-5 ring-1 ring-line">
            <h2 className="text-xl font-semibold">References</h2>
            {r.references.length ? <ul className="mt-2 list-disc pl-5 text-sm">{r.references.map((x) => <li key={x}>{x}</li>)}</ul>
              : <p className="mt-2 text-sm text-ink-soft">To be added during clinical review. No references are listed until they have been checked against their sources.</p>}
          </div>
          <div className="rounded-2xl bg-paper p-5 ring-1 ring-line">
            <h2 className="text-xl font-semibold">Review status</h2>
            <p className="mt-2 text-sm text-ink-soft">{r.reviewedOn ? `Clinically reviewed ${r.reviewedOn}.` : 'Not yet clinically reviewed. The explanation on this page is sample content and should not be used for clinical decisions.'}</p>
          </div>
          <Notice>Educational content only. It simplifies complex topics for learning and does not replace clinical judgment, facility policy or a full assessment.</Notice>
        </aside>
      </section>

      {rel.length > 0 && (
        <section className="wrap pt-20">
          <h2 className="mb-6 text-3xl font-semibold">Related resources</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{rel.map((x) => <ResourceCard key={x.slug} r={x} />)}</div>
        </section>
      )}
    </>
  );
}

/** Quiet, contextual Etsy links. Purchases happen on Etsy; nothing is downloadable here. */
function EtsyPanel({ r }: { r: Resource }) {
  const e = r.etsy!;
  const ext = { target: '_blank', rel: 'noopener noreferrer' } as const;
  return (
    <div className="rounded-2xl bg-coral-tint/60 p-5 ring-1 ring-coral/20">
      <p className="eyebrow !text-coral-deep">Available on Etsy</p>
      <h2 className="mt-1 text-xl font-semibold">Get the printable</h2>
      {e.artworkTitle && e.artworkTitle !== r.title && <p className="mt-1 text-sm text-ink-soft">Artwork title: “{e.artworkTitle}”</p>}
      {e.listingSummary && <p className="mt-2 text-sm text-ink-soft">{e.listingSummary}</p>}
      <div className="mt-4 flex flex-col gap-2">
        {e.digital && (
          <a href={e.digital.url} {...ext} className="flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-paper px-4 py-2.5 text-sm font-semibold ring-1 ring-line transition hover:ring-ink/40">
            <span><span className="block">Digital download</span><span className="block text-xs font-normal text-ink-mute">Paid · delivered by Etsy</span></span>
            <span aria-hidden>↗</span><span className="sr-only">(opens Etsy in a new tab)</span>
          </a>
        )}
        {e.print && (
          <a href={e.print.url} {...ext} className="flex min-h-[44px] items-center justify-between gap-3 rounded-xl bg-paper px-4 py-2.5 text-sm font-semibold ring-1 ring-line transition hover:ring-ink/40">
            <span><span className="block">Physical print</span><span className="block text-xs font-normal text-ink-mute">Sizes and options on Etsy</span></span>
            <span aria-hidden>↗</span><span className="sr-only">(opens Etsy in a new tab)</span>
          </a>
        )}
        {e.collection && (
          <a href={e.collection.url} {...ext} className="mt-1 inline-flex items-center gap-1 self-start text-sm font-semibold text-coral-deep underline-offset-4 hover:underline">
            Explore the collection: {e.collection.name} ↗
          </a>
        )}
      </div>
      <p className="mt-4 text-xs text-ink-soft">The explanation on this page is free to read. The printable artwork is a paid download or print sold through Etsy.</p>
    </div>
  );
}

/* ---------------- Psych Nursing ---------------- */
export function PsychPage() {
  const psychSamples = RESOURCES.filter((r) => r.collection === 'psych-decision-maps');
  return (
    <>
      <PageHero eyebrow="Psych Nursing · flagship collection" title={<>Psych NCLEX<br />Decision Maps<sup className="text-2xl">™</sup></>}
        intro="A visual learning collection to help nursing students understand psychiatric conditions, medication safety, therapeutic communication and clinical prioritization. Written by a board-certified psychiatric nurse practitioner.">
        <div className="mt-8 flex flex-wrap gap-3">
          <span className="chip bg-sun-tint px-3 py-1.5 text-sm text-sun-deep">In development · not yet available</span>
          <span className="chip bg-paper px-3 py-1.5 text-sm text-ink-soft ring-1 ring-line">Working name</span>
        </div>
      </PageHero>

      <section className="wrap pb-20">
        <div className="mb-6 flex flex-wrap items-end justify-between gap-4">
          <h2 className="text-3xl font-semibold">The first 12 maps</h2>
          <p className="text-sm text-ink-soft">1 outline in progress · 11 planned</p>
        </div>
        <ol className="grid gap-px overflow-hidden rounded-[2rem] bg-line ring-1 ring-line sm:grid-cols-2 lg:grid-cols-3">
          {PSYCH_COLLECTION.map((t) => (
            <li key={t.n} className={`flex flex-col gap-3 p-6 ${t.status === 'outline' ? 'bg-lav-tint' : 'bg-paper'}`}>
              <div className="flex items-center justify-between">
                <span className="font-display text-4xl font-semibold text-lav-deep/30">{String(t.n).padStart(2, '0')}</span>
                {t.status === 'outline'
                  ? <span className="chip bg-sun-tint text-sun-deep">Outline drafted · not finalized</span>
                  : <span className="chip bg-ivory text-ink-mute ring-1 ring-line">Planned</span>}
              </div>
              <h3 className="text-xl font-semibold leading-snug">{t.title}</h3>
              <p className="text-sm text-ink-soft">{t.focus}</p>
              <p className="mt-auto font-mono text-[11px] uppercase tracking-wider text-ink-mute">{t.format}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap grid gap-8 pb-20 lg:grid-cols-2">
        <div className="rounded-[2rem] bg-paper p-8 ring-1 ring-line">
          <h2 className="text-2xl font-semibold">How the maps will be built</h2>
          <ol className="mt-5 space-y-4">
            {[
              ['Outline', 'Learning goals, NCLEX test plan alignment, key cues.'],
              ['Draft & illustrate', 'Visual layout using one of the four CleveRNurses formats.'],
              ['Clinical review', 'Checked against current guidelines, FDA labeling and nursing standards. Real references are attached.'],
              ['Publish', 'Released with a review date and scheduled for re-review.'],
            ].map(([k, v], i) => (
              <li key={k} className="flex gap-4">
                <span className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm ${i === 0 ? 'bg-lav text-ink' : 'bg-ivory ring-1 ring-line'}`}>{i + 1}</span>
                <span><strong className="block">{k}</strong><span className="text-sm text-ink-soft">{v}</span></span>
              </li>
            ))}
          </ol>
        </div>
        <div className="space-y-4">
          <Notice tone="lav">
            <strong className="text-ink">About suicide risk content.</strong> The Suicide Risk Stratification map is a teaching aid that explains concepts. Its simplified categories are <strong className="text-ink">not</strong> a validated, stand-alone assessment tool. Real risk assessment uses validated instruments, clinical judgment and your facility’s protocols.
          </Notice>
          <Notice tone="line">If you or someone you know is struggling, call or text <strong className="text-ink">988</strong> in the US to reach the Suicide &amp; Crisis Lifeline.</Notice>
          <Notice tone="line">Want to know when the first maps are released? <Link to="contact" className="font-semibold text-teal underline">Send a note</Link> and I’ll reach out. A newsletter is planned.</Notice>
        </div>
      </section>

      <section className="wrap">
        <h2 className="mb-6 text-3xl font-semibold">Related samples in the library</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{psychSamples.map((r) => <ResourceCard key={r.slug} r={r} />)}</div>
      </section>
    </>
  );
}

/* ---------------- Clinical Judgment Lab ---------------- */
export function LabPage() {
  return (
    <>
      <PageHero eyebrow="Clinical Judgment Lab" title="Practice the thinking, not just the answer." intro="Short prioritization exercises with full rationales: why the right answer is right, why the others can wait, and the one thing to remember." />
      <section className="wrap pb-16">
        <ol className="flex flex-wrap gap-2" aria-label="Clinical judgment steps">
          {CJMM_STEPS.map((s, i) => (
            <li key={s} className="flex items-center gap-2 rounded-full bg-paper py-2 pl-2 pr-4 text-sm font-medium ring-1 ring-line">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-sun-tint font-mono text-xs">{i + 1}</span>{s}
            </li>
          ))}
        </ol>
        <p className="mt-3 text-sm text-ink-mute">Organized around the six clinical judgment steps used in NCSBN’s Clinical Judgment Measurement Model. CleveRNurses is not affiliated with or endorsed by NCSBN.</p>
      </section>
      <section className="wrap"><JudgmentExercise /></section>
      <section className="wrap pt-20">
        <SectionHead eyebrow="The four lenses" title="Same question, four ways to understand it" />
        <Frameworks />
      </section>
    </>
  );
}

/* ---------------- Advanced Practice ---------------- */
export function AdvancedPage() {
  const ap = RESOURCES.filter((r) => r.audience.includes('Advanced Practice'));
  const tracks = [
    { t: 'Advanced Assessment & Diagnostic Reasoning', d: 'Building differentials, can’t-miss diagnoses, focused exams.', icon: 'compass' as const },
    { t: 'Advanced Pharmacology', d: 'Mechanisms, monitoring and safety at the prescriber level.', icon: 'pill' as const },
    { t: 'Psychiatric Advanced Practice', d: 'Psychiatric assessment, diagnostic reasoning, psychopharmacology.', icon: 'mind' as const },
    { t: 'Professional & Doctoral Nursing', d: 'Evidence-based practice, quality improvement, leadership. A growing area as I explore doctoral education.', icon: 'book' as const },
  ];
  return (
    <>
      <PageHero eyebrow="Advanced Practice" title="Beyond the bedside." intro="For NPs, CNSs, CNMs, CRNAs and doctoral nursing students. Organized by clinical relevance, and clear about scope: content is labeled by audience, and prescriber-level material is marked as such." />
      <section className="wrap grid gap-4 pb-20 sm:grid-cols-2">
        {tracks.map((x) => (
          <div key={x.t} className="flex gap-5 rounded-[2rem] bg-paper p-7 ring-1 ring-line">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-lav-tint text-lav-deep"><Icon name={x.icon} /></span>
            <div>
              <h2 className="text-2xl font-semibold leading-tight">{x.t}</h2>
              <p className="mt-2 text-ink-soft">{x.d}</p>
              <p className="mt-3 font-mono text-[11px] uppercase tracking-wider text-ink-mute">Coming soon</p>
            </div>
          </div>
        ))}
      </section>
      <section className="wrap">
        <h2 className="mb-6 text-3xl font-semibold">Samples for advanced practice</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">{ap.map((r) => <ResourceCard key={r.slug} r={r} />)}</div>
      </section>
    </>
  );
}

/* ---------------- Free Resources ---------------- */
export function FreePage() {
  const free = RESOURCES.filter((r) => r.access === 'free' && !r.etsy);
  return (
    <>
      <PageHero eyebrow="Free Resources" title="Free, printable, and made to be shared." intro="These will be downloadable once each one has passed clinical review. For now you can preview the layouts and key takeaways." />
      <section className="wrap">
        <Notice><strong className="text-ink">Downloads aren’t live yet.</strong> Files are published only after clinical review, so nothing here is downloadable today.</Notice>
        <ul className="mt-8 divide-y divide-line overflow-hidden rounded-[2rem] bg-paper ring-1 ring-line">
          {free.map((r) => (
            <li key={r.slug} className="grid items-center gap-4 p-4 sm:grid-cols-[120px_1fr_auto] sm:p-5">
              <div className="w-[120px]"><Thumbnail r={r} /></div>
              <div>
                <p className="eyebrow !text-[10.5px]">{r.format} · {r.difficulty}</p>
                <h2 className="mt-1 text-xl font-semibold">{r.title}</h2>
                <p className="text-sm text-ink-soft">{r.summary}</p>
              </div>
              <div className="flex flex-wrap items-center gap-3">
                <span className="inline-flex items-center gap-1.5 text-sm text-ink-mute"><Icon name="download" size={16} />PDF after review</span>
                <Link to={`r-${r.slug}`} className="btn-secondary !min-h-[40px] !py-2 text-sm">Preview</Link>
              </div>
            </li>
          ))}
        </ul>
      </section>
    </>
  );
}

/* ---------------- Contact ---------------- */
export function ContactPage() {
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', reason: 'General question', message: '' });
  return (
    <>
      <PageHero eyebrow="Contact" title="Say hello." intro="Questions, collaboration ideas, guest content, school or institutional use. I read every message." />
      <section className="wrap grid gap-10 lg:grid-cols-[1.3fr_1fr]">
        {sent ? (
          <div role="status" className="rounded-[2rem] bg-sun-tint p-8">
            <p className="font-display text-2xl font-semibold">Thanks, {form.name || 'friend'}!</p>
            <p className="mt-2 text-ink-soft">This preview isn’t connected to email yet, so your message was <strong>not sent</strong>. Once a form service is connected (see the roadmap), submissions will arrive by email.</p>
            <button type="button" className="btn-secondary mt-6" onClick={() => setSent(false)}>Back to the form</button>
          </div>
        ) : (
          <form className="grid gap-5 rounded-[2rem] bg-paper p-6 ring-1 ring-line sm:p-8" onSubmit={(e) => { e.preventDefault(); setSent(true); }}>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block"><span className="mb-1.5 block text-sm font-semibold">Name</span>
                <input required className="field" autoComplete="name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></label>
              <label className="block"><span className="mb-1.5 block text-sm font-semibold">Email</span>
                <input required type="email" className="field" autoComplete="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} /></label>
            </div>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold">What’s this about?</span>
              <select className="field" value={form.reason} onChange={(e) => setForm({ ...form, reason: e.target.value })}>
                {['General question', 'Collaboration', 'School or institutional use', 'Content correction', 'Media'].map((o) => <option key={o}>{o}</option>)}
              </select></label>
            <label className="block"><span className="mb-1.5 block text-sm font-semibold">Message</span>
              <textarea required rows={6} className="field py-3" value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} /></label>
            <div className="flex flex-wrap items-center gap-4">
              <button type="submit" className="btn-primary">Send message</button>
              <p className="text-xs text-ink-mute">Preview form · not yet connected to email.</p>
            </div>
          </form>
        )}
        <aside className="space-y-4">
          <Notice tone="line"><strong className="text-ink">Spotted a clinical error?</strong> Choose “Content correction.” Accuracy matters more than anything else here.</Notice>
          <Notice tone="line">CleveRNurses can’t give personal medical advice. For urgent concerns, contact your provider or emergency services. In the US, call or text <strong className="text-ink">988</strong> for the Suicide &amp; Crisis Lifeline.</Notice>
        </aside>
      </section>
    </>
  );
}

export function NotFound() {
  return (
    <PageHero eyebrow="404" title="This page took a break." intro="It may have moved, or it hasn’t been written yet.">
      <div className="mt-8"><Link to="" className="btn-primary">Back home</Link></div>
    </PageHero>
  );
}
