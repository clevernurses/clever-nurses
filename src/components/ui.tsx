import type { ReactNode } from 'react';
import type { Resource } from '../data/types';
import { STATUS_LABEL } from '../data/resources';
import { Icon } from './Icon';

export function SectionHead({ num, eyebrow, title, intro, align = 'left', id }: { num?: string; eyebrow: string; title: ReactNode; intro?: ReactNode; align?: 'left' | 'center'; id?: string }) {
  return (
    <div className={`mb-10 max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className="eyebrow mb-3">{num && <span className="mr-2 text-teal">{num}</span>}{eyebrow}</p>
      <h2 id={id} className="text-[clamp(2rem,4.2vw,3.25rem)] font-semibold leading-[1.05]">{title}</h2>
      {intro && <p className="mt-4 text-lg text-ink-soft">{intro}</p>}
    </div>
  );
}

export function StatusPill({ status }: { status: Resource['status'] }) {
  const tone = status === 'published' ? 'bg-teal-tint text-teal' : status === 'planned' ? 'bg-line/70 text-ink-soft' : 'bg-sun-tint text-sun-deep';
  return <span className={`chip ${tone}`}><span className="h-1.5 w-1.5 rounded-full bg-current" />{STATUS_LABEL[status]}</span>;
}

/** For Etsy-backed items, "free" means the explanation is free to read; the printable is paid. */
export function AccessPill({ access, etsy = false }: { access: Resource['access']; etsy?: boolean }) {
  return access === 'free'
    ? <span className="chip bg-teal-tint text-teal">{etsy ? 'Free to read' : 'Free'}</span>
    : <span className="chip bg-ink text-ivory"><Icon name="lock" size={12} strokeWidth={2.4} />Premium · planned</span>;
}

export function Notice({ children, tone = 'sun' }: { children: ReactNode; tone?: 'sun' | 'lav' | 'line' }) {
  const bg = tone === 'sun' ? 'bg-sun-tint' : tone === 'lav' ? 'bg-lav-tint' : 'bg-paper ring-1 ring-line';
  return <div className={`rounded-2xl ${bg} px-5 py-4 text-sm leading-relaxed text-ink-soft`}>{children}</div>;
}

/** Hand-drawn style underline accent. Decorative only. */
export function Scribble({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 220 18" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path d="M3 13C40 4 80 15 120 8s80-4 97 2" fill="none" stroke="currentColor" strokeWidth="5" strokeLinecap="round" />
    </svg>
  );
}

/** EKG-style line used as a quiet divider and brand motif. */
export function PulseLine({ className = '' }: { className?: string }) {
  return (
    <svg viewBox="0 0 600 40" preserveAspectRatio="none" aria-hidden="true" className={className}>
      <path d="M0 24h220l12-16 14 30 12-36 14 22h328" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
