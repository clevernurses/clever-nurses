import type { Resource } from '../data/types';
import { ACCENT } from '../lib/accent';

/**
 * Generated mini-infographic used as a thumbnail until real artwork exists.
 * Layout varies by educational format so each format is recognizable at a glance.
 * Replace with <img> of the final infographic once uploaded (see Resource.thumbnail in roadmap).
 */
export function Thumbnail({ r, size = 'card' }: { r: Resource; size?: 'card' | 'large' }) {
  const a = ACCENT[r.accent];
  const big = size === 'large';
  const txt = big ? 'text-sm' : 'text-[11px]';
  const [p1, p2, p3, p4] = r.thumb;

  const Node = ({ children, strong }: { children: React.ReactNode; strong?: boolean }) => (
    <div className={`rounded-lg px-2 py-1.5 font-semibold leading-tight ${txt} ${strong ? `${a.fill} text-ink` : 'bg-paper text-ink'} ring-1 ring-ink/10`}>{children}</div>
  );

  let body: React.ReactNode;
  switch (r.format) {
    case 'Decision Map':
    case 'Prioritization Map':
      body = (
        <div className="flex flex-col items-stretch gap-1.5">
          {r.thumb.map((t, i) => (
            <div key={t} className="flex items-center gap-2">
              <span className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${i === 0 ? a.fill : 'bg-paper ring-1 ring-ink/15'} font-mono text-[10px] font-medium`}>{i + 1}</span>
              <div className="flex-1"><Node strong={i === 0}>{t}</Node></div>
            </div>
          ))}
        </div>
      );
      break;
    case 'Differentiation Map': {
      const [left, right] = r.title.split(/ vs\.? /i);
      body = (
        <div className="grid grid-cols-2 gap-1.5">
          <div className={`rounded-lg ${a.fill} px-2 py-1 text-center font-display font-semibold ${txt}`}>{left}</div>
          <div className="rounded-lg bg-ink px-2 py-1 text-center font-display font-semibold text-ivory">
            <span className={txt}>{(right ?? '').replace(/[.:].*$/, '')}</span>
          </div>
          <Node>{p1}</Node><Node>{p2}</Node><Node>{p3}</Node><Node>{p4}</Node>
        </div>
      );
      break;
    }
    case 'Cause → Effect Map':
      body = (
        <div className="grid grid-cols-2 gap-x-4 gap-y-2">
          {r.thumb.map((t, i) => (
            <div key={t} className="relative">
              <Node strong={i === 3}>{t}</Node>
              {i % 2 === 0 && <span aria-hidden className="absolute -right-3.5 top-1/2 -translate-y-1/2 text-ink/40">→</span>}
            </div>
          ))}
        </div>
      );
      break;
    case 'Why It’s Wrong Map':
      body = (
        <div className="flex flex-col gap-1.5">
          {r.thumb.map((t, i) => (
            <div key={t} className={`flex items-center gap-2 rounded-lg px-2 py-1.5 ${i < 2 ? 'bg-teal-tint' : 'bg-coral-tint'} ${txt} font-semibold`}>
              <span aria-hidden className={`font-mono ${i < 2 ? 'text-teal' : 'text-coral-deep'}`}>{i < 2 ? '✓' : '✕'}</span>{t}
            </div>
          ))}
        </div>
      );
      break;
    case 'Medication Safety':
      body = (
        <div className="flex flex-col gap-2">
          <div className="flex h-3 overflow-hidden rounded-full ring-1 ring-ink/10">
            <span className="w-1/3 bg-sky-tint" /><span className={`w-1/3 ${a.fill}`} /><span className="w-1/3 bg-coral" />
          </div>
          <div className={`flex justify-between font-mono text-[9px] uppercase tracking-wider text-ink-soft ${big ? 'text-[11px]' : ''}`}>
            <span>low</span><span>target</span><span>toxic</span>
          </div>
          <div className="grid grid-cols-2 gap-1.5"><Node>{p1}</Node><Node>{p2}</Node><Node>{p3}</Node><Node strong>{p4}</Node></div>
        </div>
      );
      break;
    case 'Clinical Reasoning':
      body = (
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between gap-1">
            {[p1, p2, p3].map((t) => (
              <span key={t} className={`flex aspect-square flex-1 items-center justify-center rounded-full bg-paper text-center font-display font-semibold ring-1 ring-ink/15 ${big ? 'text-base' : 'text-xs'}`}>{t}</span>
            ))}
          </div>
          <Node strong>{p4}</Node>
        </div>
      );
      break;
    default:
      body = <div className="grid grid-cols-2 gap-1.5"><Node strong>{p1}</Node><Node>{p2}</Node><Node>{p3}</Node><Node>{p4}</Node></div>;
  }

  return (
    <div className={`relative flex flex-col overflow-hidden rounded-2xl ${a.tint} ${big ? 'p-8' : 'aspect-[5/4] p-3.5'}`} aria-hidden="true">
      <div className="mb-2.5 flex items-center justify-between gap-2">
        <span className={`font-mono uppercase tracking-[.12em] text-ink-soft ${big ? 'text-[11px]' : 'text-[9px]'}`}>{r.format}</span>
        <span className={`h-2 w-2 rounded-full ${a.fill}`} />
      </div>
      <p className={`mb-2.5 font-display font-semibold leading-tight text-ink ${big ? 'text-2xl' : 'text-[15px]'}`}>{r.title}</p>
      <div className={big ? 'mt-8 [&_div]:text-base' : 'mt-auto'}>{body}</div>
    </div>
  );
}
