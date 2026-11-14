import { Link } from '../lib/router';
import { Icon } from '../components/Icon';

/** Replace the inner placeholder with <img src="/alex.jpg" alt="Alexander Renteria, PMHNP-BC" /> */
export function FounderPhoto() {
  return (
    <div className="relative mx-auto w-full max-w-sm">
      <div className="absolute -left-4 -top-4 h-full w-full rounded-[2.5rem] bg-sun-tint" aria-hidden />
      <div className="relative flex aspect-[4/5] flex-col items-center justify-center gap-3 rounded-[2.5rem] bg-paper text-ink-mute ring-1 ring-line">
        <svg width="88" height="88" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.2" aria-hidden><circle cx="12" cy="8" r="4" /><path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" /></svg>
        <p className="text-sm">Founder photo placeholder</p>
      </div>
      <span className="absolute -bottom-4 right-6 rotate-[-4deg] rounded-full bg-ink px-4 py-2 font-display text-sm font-medium text-ivory">Hi, I’m Alex</span>
    </div>
  );
}

const JOURNEY = [
  { k: 'Bedside', v: 'Medical-surgical, step-down and critical care. Where the “why” behind every order started to matter.' },
  { k: 'Beyond the bedside', v: 'Case management: seeing the whole system around a patient, from admission to discharge and beyond.' },
  { k: 'Advanced practice', v: 'Board-certified Psychiatric Mental Health Nurse Practitioner.' },
  { k: 'What’s next', v: 'Exploring doctoral nursing education and leadership, and bringing CleveRNurses back for nurses at every stage.' },
];

export function AboutPage() {
  return (
    <>
      <section className="wrap grid items-center gap-14 pb-20 pt-14 lg:grid-cols-[1.2fr_.8fr] lg:pt-20">
        <div>
          <p className="eyebrow mb-4">About</p>
          <h1 className="text-[clamp(2.5rem,5.6vw,4.5rem)] font-semibold leading-[1]">Made by a nurse who gets it.</h1>
          <p className="mt-6 max-w-2xl text-xl text-ink-soft">
            CleveRNurses started with one belief: nurses should understand <em>why</em> something happens, not just memorize <em>what</em> happens.
          </p>
          <p className="mt-4 max-w-2xl text-lg text-ink-soft">
            I’ve worked in critical care, medical-surgical nursing, step-down care, case management and psychiatric mental health. That path taught me how foundational knowledge shows up in real patient care, and how often textbooks skip the reasoning that makes it stick.
          </p>
          <p className="mt-6 font-semibold">Alexander Renteria</p>
          <p className="text-teal">MSN, APRN, PMHNP-BC, PHN</p>
        </div>
        <FounderPhoto />
      </section>

      <section className="wrap pb-20">
        <h2 className="mb-8 text-3xl font-semibold">The path so far</h2>
        <ol className="grid gap-4 md:grid-cols-4">
          {JOURNEY.map((j, i) => (
            <li key={j.k} className="relative rounded-[1.75rem] bg-paper p-6 ring-1 ring-line">
              <span className="font-mono text-xs text-teal">{String(i + 1).padStart(2, '0')}</span>
              <h3 className="mt-2 text-xl font-semibold">{j.k}</h3>
              <p className="mt-2 text-sm text-ink-soft">{j.v}</p>
            </li>
          ))}
        </ol>
      </section>

      <section className="wrap grid gap-6 pb-10 md:grid-cols-3">
        {[
          ['Learn it.', 'Clear visuals that cut through walls of text.', 'bg-sun-tint'],
          ['Understand it.', 'The why behind every right answer, and every wrong one.', 'bg-teal-tint'],
          ['Apply it.', 'Practice that looks like real clinical decisions.', 'bg-lav-tint'],
        ].map(([t, d, bg]) => (
          <div key={t} className={`rounded-[2rem] ${bg} p-8`}>
            <p className="font-display text-3xl font-semibold">{t}</p>
            <p className="mt-2 text-ink-soft">{d}</p>
          </div>
        ))}
      </section>
      <section className="wrap">
        <p className="text-ink-soft">Educational content on this site is reviewed before publication and carries a review date. <Link to="contact" className="inline-flex items-center gap-1 font-semibold text-teal">Get in touch <Icon name="arrow" size={16} /></Link></p>
      </section>
    </>
  );
}
