import { HeroCollage } from '../components/HeroCollage';
import { TopicGrid } from '../components/TopicGrid';
import { Frameworks } from '../components/Frameworks';
import { LibraryBrowser } from '../components/LibraryBrowser';
import { JudgmentExercise } from '../components/JudgmentExercise';
import { Icon } from '../components/Icon';
import { SectionHead, Scribble, PulseLine } from '../components/ui';
import { Link } from '../lib/router';
import { PSYCH_COLLECTION } from '../data/psychCollection';
import { FounderPhoto } from './About';
import type { Audience } from '../data/types';

const PATHS: { aud: Audience; title: string; body: string; cta: string; bg: string; dot: string; art: JSX.Element }[] = [
  {
    aud: 'Student', title: 'Nursing Student', cta: 'Start Learning',
    body: 'Master the fundamentals, prepare for NCLEX, and strengthen clinical judgment.',
    bg: 'bg-sun-tint', dot: 'bg-sun',
    art: (
      <div className="relative h-28" aria-hidden>
        <span className="absolute left-0 top-4 h-20 w-16 rotate-[-10deg] rounded-xl bg-paper shadow-card ring-1 ring-ink/5 transition duration-500 group-hover:rotate-[-18deg]" />
        <span className="absolute left-8 top-2 h-20 w-16 rotate-[2deg] rounded-xl bg-sun shadow-card transition duration-500 group-hover:rotate-[6deg]" />
        <span className="absolute left-16 top-5 flex h-20 w-16 rotate-[12deg] items-center justify-center rounded-xl bg-ink font-display text-2xl text-sun shadow-card transition duration-500 group-hover:rotate-[20deg]">A+</span>
      </div>
    ),
  },
  {
    aud: 'Practicing RN', title: 'Practicing Nurse', cta: 'Explore Topics',
    body: 'Refresh your knowledge, explore specialties, and sharpen clinical reasoning.',
    bg: 'bg-coral-tint', dot: 'bg-coral',
    art: (
      <div className="relative flex h-28 items-center" aria-hidden>
        <PulseLine className="h-16 w-full text-coral-deep transition duration-500 group-hover:scale-x-110" />
      </div>
    ),
  },
  {
    aud: 'Advanced Practice', title: 'Advanced Practice Nurse', cta: 'Go Deeper',
    body: 'Dive deeper into assessment, clinical reasoning, pharmacology, and advanced practice concepts.',
    bg: 'bg-lav-tint', dot: 'bg-lav',
    art: (
      <div className="relative h-28" aria-hidden>
        {[0, 1, 2].map((i) => (
          <span key={i} className="absolute left-0 top-1/2 h-20 w-20 -translate-y-1/2 rounded-full border-2 border-lav-deep/40 transition-all duration-500 group-hover:border-lav-deep"
            style={{ left: `${i * 34}px`, opacity: 1 - i * 0.25 }} />
        ))}
        <span className="absolute left-[34px] top-1/2 flex h-20 w-20 -translate-y-1/2 items-center justify-center text-lav-deep"><Icon name="steth" size={34} /></span>
      </div>
    ),
  },
];

export function Home() {
  return (
    <>
      {/* HERO */}
      <section aria-labelledby="hero-title" className="wrap grid items-center gap-16 pb-28 pt-12 lg:grid-cols-[1.05fr_1fr] lg:pt-20">
        <div>
          <p className="eyebrow mb-6 flex items-center gap-2"><span className="h-2 w-2 rounded-full bg-coral" />Visual nursing education · by a nurse, for nurses</p>
          <h1 id="hero-title" className="text-[clamp(2.75rem,6.4vw,5.25rem)] font-semibold leading-[.98]">
            Nursing is complicated.{' '}
            <span className="relative inline-block whitespace-nowrap">
              Learning it
              <Scribble className="absolute -bottom-2 left-0 h-4 w-full text-sun" />
            </span>{' '}
            doesn’t have to be.
          </h1>
          <p className="mt-8 max-w-xl text-lg leading-relaxed text-ink-soft sm:text-xl">
            Visual nursing education that makes complex concepts click. Explore colorful infographics, clinical decision maps, and practical learning tools designed by a nurse, for nurses.
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Link to="library" className="btn-primary !px-7 !py-3.5 text-base">Explore the Library <Icon name="arrow" size={18} /></Link>
            <button type="button" onClick={() => document.getElementById('how-we-teach')?.scrollIntoView({ behavior: 'smooth', block: 'start' })} className="btn-secondary !px-7 !py-3.5 text-base">See How We Teach</button>
          </div>
          <p className="mt-10 font-display text-lg text-ink-mute">Learn it. <span className="text-ink">Understand it.</span> <span className="text-teal">Apply it.</span></p>
        </div>
        <HeroCollage />
      </section>

      {/* LEARNING PATHS */}
      <section aria-labelledby="paths-title" className="wrap pb-28">
        <SectionHead num="01" eyebrow="Learning paths" id="paths-title" title="Where are you in your nursing journey?" />
        <div className="grid gap-5 md:grid-cols-3">
          {PATHS.map((p) => (
            <Link key={p.aud} to="library" preset={{ audience: p.aud }}
              className={`group relative flex min-h-[340px] flex-col overflow-hidden rounded-[2rem] ${p.bg} p-7 transition duration-300 hover:-translate-y-1.5 hover:shadow-lift`}>
              {p.art}
              <h3 className="mt-6 text-[28px] font-semibold leading-tight">{p.title}</h3>
              <p className="mt-2 text-ink-soft">{p.body}</p>
              <span className="mt-auto inline-flex items-center gap-2 pt-6 font-semibold">
                <span className={`flex h-10 w-10 items-center justify-center rounded-full ${p.dot} transition group-hover:translate-x-1`}><Icon name="arrow" size={18} /></span>
                {p.cta}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* TOPICS */}
      <section aria-labelledby="topics-title" className="wrap pb-28">
        <SectionHead num="02" eyebrow="Explore nursing topics" id="topics-title" title="Big topics. Bite-sized learning." intro="Start with a body system or specialty. Every topic links straight into the library." />
        <TopicGrid />
      </section>

      {/* FRAMEWORKS */}
      <section id="how-we-teach" aria-labelledby="fw-title" className="scroll-mt-24 bg-paper py-28">
        <div className="wrap">
          <SectionHead num="03" eyebrow="Signature learning formats" id="fw-title"
            title={<>Not just memorization. <span className="text-teal">Actual understanding.</span></>}
            intro="Four formats built around one question: why? Why is this the priority, why are these conditions different, why does this intervention work, and why is that answer wrong?" />
          <Frameworks />
        </div>
      </section>

      {/* FEATURED LIBRARY */}
      <section aria-labelledby="lib-title" className="wrap py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead num="04" eyebrow="Featured library" id="lib-title" title="A growing collection of visual explainers" />
          <Link to="library" className="btn-secondary mb-10">Browse the full library <Icon name="arrow" size={18} /></Link>
        </div>
        <LibraryBrowser compact />
      </section>

      {/* FLAGSHIP */}
      <section aria-labelledby="flag-title" className="wrap pb-28">
        <div className="grid gap-10 overflow-hidden rounded-[2.5rem] bg-ink p-8 text-ivory sm:p-12 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <p className="eyebrow !text-lav">05 · First flagship collection</p>
            <h2 id="flag-title" className="mt-3 text-[clamp(2rem,4vw,3.25rem)] font-semibold leading-[1.05]">Psych NCLEX Decision Maps<sup className="text-lg">™</sup></h2>
            <p className="mt-4 max-w-md text-ivory/75">A visual collection to help nursing students understand psychiatric conditions, medication safety, therapeutic communication and clinical prioritization.</p>
            <p className="mt-4 inline-flex rounded-full bg-ivory/10 px-3 py-1.5 text-sm">In development · not yet available</p>
            <div className="mt-8"><Link to="psych" className="btn bg-lav text-ink hover:bg-ivory">See the collection plan <Icon name="arrow" size={18} /></Link></div>
          </div>
          <ol className="grid gap-2 sm:grid-cols-2">
            {PSYCH_COLLECTION.slice(0, 8).map((t) => (
              <li key={t.n} className="flex items-start gap-3 rounded-2xl bg-ivory/[.06] p-3.5 ring-1 ring-ivory/10">
                <span className="font-mono text-xs text-lav">{String(t.n).padStart(2, '0')}</span>
                <span className="text-sm font-medium leading-snug">{t.title}</span>
              </li>
            ))}
            <li className="flex items-center rounded-2xl p-3.5 text-sm text-ivory/60 sm:col-span-2">+ 4 more planned topics</li>
          </ol>
        </div>
      </section>

      {/* INTERACTIVE */}
      <section aria-labelledby="lab-title" className="wrap pb-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead num="06" eyebrow="Clinical Judgment Lab" id="lab-title" title="Which patient should the nurse assess first?" intro="Pick an answer. You’ll see why it’s right, why the others can wait, and the takeaway to remember." />
          <Link to="lab" className="btn-secondary mb-10">Open the Lab <Icon name="arrow" size={18} /></Link>
        </div>
        <JudgmentExercise />
      </section>

      {/* FOUNDER */}
      <section aria-labelledby="founder-title" className="wrap pb-12">
        <div className="grid items-center gap-12 md:grid-cols-[.8fr_1.2fr]">
          <FounderPhoto />
          <div>
            <p className="eyebrow">07 · About the founder</p>
            <h2 id="founder-title" className="mt-3 text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.05]">Made by a nurse who gets it.</h2>
            <p className="mt-5 text-lg text-ink-soft">
              I’m Alex. I’ve worked in critical care, medical-surgical nursing, step-down and case management, and I now practice in psychiatric mental health. CleveRNurses is where I connect foundational nursing knowledge with real patient care, and where reasoning matters more than memorizing.
            </p>
            <p className="mt-4 font-semibold">Alexander Renteria, MSN, APRN, PMHNP-BC, PHN</p>
            <Link to="about" className="btn-ghost mt-4 !px-0">Read the story <Icon name="arrow" size={18} /></Link>
          </div>
        </div>
      </section>
    </>
  );
}
