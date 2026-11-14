import { useEffect, useId, useMemo, useRef, useState } from 'react';
import { RESOURCES } from '../data/resources';
import { TOPICS } from '../data/topics';
import { ACCENT } from '../lib/accent';
import { countFor, topicLabel, type TopicValue } from '../lib/taxonomy';
import { Icon } from './Icon';

/**
 * Searchable topic selector. Keeps the look of the other filter fields, keeps the original
 * topic order, and tucks subcategories behind a small expand toggle so the list stays short
 * on mobile.
 */
export function TopicPicker({ value, onChange }: { value: TopicValue; onChange: (v: TopicValue) => void }) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState('');
  const [expanded, setExpanded] = useState<string[]>([]);
  const wrap = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const search = useRef<HTMLInputElement>(null);
  const panelId = useId();

  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    TOPICS.forEach((t) => {
      m[t.id] = countFor(RESOURCES, t.id);
      t.subcategories?.forEach((s) => { m[`sub:${s.id}`] = countFor(RESOURCES, `sub:${s.id}`); });
    });
    return m;
  }, []);

  useEffect(() => {
    if (!open) return;
    // On small screens, bring the picker to the top so the list has room.
    if (window.innerWidth < 640) wrap.current?.scrollIntoView({ block: 'start', behavior: 'smooth' });
    search.current?.focus({ preventScroll: true });
    const onDown = (e: MouseEvent) => { if (!wrap.current?.contains(e.target as Node)) setOpen(false); };
    document.addEventListener('mousedown', onDown);
    return () => document.removeEventListener('mousedown', onDown);
  }, [open]);

  // Open on the selected item's parent so people can see where they are.
  useEffect(() => {
    if (open && value.startsWith('sub:')) {
      const parent = TOPICS.find((t) => t.subcategories?.some((s) => `sub:${s.id}` === value));
      if (parent && !expanded.includes(parent.id)) setExpanded((e) => [...e, parent.id]);
    }
  }, [open, value, expanded]);

  const close = () => { setOpen(false); setQ(''); trigger.current?.focus(); };
  const pick = (v: TopicValue) => { onChange(v); close(); };

  const query = q.trim().toLowerCase();
  const rows = TOPICS.map((t) => {
    const subs = t.subcategories ?? [];
    const topicHit = !query || (t.name + ' ' + t.blurb).toLowerCase().includes(query);
    const subHits = query ? subs.filter((s) => s.name.toLowerCase().includes(query)) : subs;
    const show = topicHit || subHits.length > 0;
    const manual = expanded.includes(t.id);
    if (!query) return { t, show, subs, isOpen: manual };
    if (subHits.length > 0) return { t, show, subs: manual ? subs : subHits, isOpen: true };
    return { t, show, subs, isOpen: manual };
  }).filter((r) => r.show);

  const firstAdded = rows.findIndex((r) => r.t.added);

  return (
    <div ref={wrap} className="relative scroll-mt-24" onKeyDown={(e) => { if (e.key === 'Escape' && open) { e.stopPropagation(); close(); } }}>
      <span className="eyebrow mb-1.5 block !text-[10.5px]" id={`${panelId}-label`}>Topic</span>
      <button ref={trigger} type="button" aria-haspopup="dialog" aria-expanded={open} aria-controls={panelId}
        aria-labelledby={`${panelId}-label ${panelId}-value`} onClick={() => setOpen(!open)}
        className="field flex items-center justify-between gap-2 text-left">
        <span id={`${panelId}-value`} className={`truncate ${value ? '' : 'text-ink'}`}>{value ? topicLabel(value).replace(/^.* › /, '') : 'All'}</span>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`shrink-0 transition ${open ? 'rotate-180' : ''}`}><path d="M6 9l6 6 6-6" /></svg>
      </button>

      {open && (
        <div id={panelId} role="dialog" aria-label="Choose a topic"
          className="absolute left-0 top-full z-30 mt-2 w-[min(23rem,calc(100vw-2.5rem))] animate-fadeUp overflow-hidden rounded-2xl bg-paper shadow-lift ring-1 ring-line">
          <div className="border-b border-line p-2.5">
            <label className="relative block">
              <span className="sr-only">Find a topic</span>
              <Icon name="search" size={18} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-mute" />
              <input ref={search} type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Find a topic or subtopic…"
                className="field !min-h-[40px] !rounded-xl !border-transparent !bg-ivory !pl-9 text-sm" />
            </label>
          </div>
          <ul className="max-h-[min(60vh,26rem)] overflow-y-auto overscroll-contain p-1.5" aria-label="Topics">
            {!query && (
              <li>
                <Row label="All topics" count={RESOURCES.length} selected={!value} onPick={() => pick('')} />
              </li>
            )}
            {rows.map((r, i) => {
              const a = ACCENT[r.t.accent];
              const hasSubs = (r.t.subcategories?.length ?? 0) > 0;
              return (
                <li key={r.t.id}>
                  {i === firstAdded && !query && (
                    <p className="mx-2.5 mb-1 mt-3 border-t border-line pt-3 font-mono text-[10px] uppercase tracking-[.14em] text-ink-mute">New categories</p>
                  )}
                  <div className="flex items-center">
                    <Row label={r.t.name} count={counts[r.t.id]} selected={value === r.t.id} dot={a.fill} onPick={() => pick(r.t.id)} />
                    {hasSubs && (
                      <button type="button" aria-expanded={r.isOpen} aria-label={`${r.isOpen ? 'Hide' : 'Show'} ${r.t.name} subtopics`}
                        onClick={() => setExpanded((e) => (e.includes(r.t.id) ? e.filter((x) => x !== r.t.id) : [...e, r.t.id]))}
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-mute hover:bg-ivory hover:text-ink">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true" className={`transition ${r.isOpen ? 'rotate-90' : ''}`}><path d="M9 6l6 6-6 6" /></svg>
                      </button>
                    )}
                  </div>
                  {r.isOpen && (
                    <ul className="mb-1 ml-5 border-l border-line pl-2">
                      {r.subs.map((s) => (
                        <li key={s.id}><Row small label={s.name} count={counts[`sub:${s.id}`]} selected={value === `sub:${s.id}`} onPick={() => pick(`sub:${s.id}`)} /></li>
                      ))}
                    </ul>
                  )}
                </li>
              );
            })}
            {rows.length === 0 && <li className="px-3 py-6 text-center text-sm text-ink-soft">No topics match “{q}”.</li>}
          </ul>
        </div>
      )}
    </div>
  );
}

function Row({ label, count, selected, onPick, dot, small }: { label: string; count: number; selected: boolean; onPick: () => void; dot?: string; small?: boolean }) {
  return (
    <button type="button" aria-pressed={selected} onClick={onPick}
      className={`flex min-h-[40px] w-full flex-1 items-center gap-2.5 rounded-lg px-2.5 text-left transition hover:bg-ivory ${selected ? 'bg-ivory font-semibold' : ''} ${small ? 'text-[13.5px]' : 'text-[14.5px]'}`}>
      {dot && <span className={`h-2 w-2 shrink-0 rounded-full ${dot}`} aria-hidden="true" />}
      <span className="flex-1 truncate">{label}</span>
      {count > 0
        ? <span className="font-mono text-[11px] text-ink-mute">{count}</span>
        : <span className="font-mono text-[10px] uppercase tracking-wider text-ink-mute/80">soon</span>}
      {selected && <Icon name="check" size={15} strokeWidth={2.6} className="text-teal" />}
    </button>
  );
}
