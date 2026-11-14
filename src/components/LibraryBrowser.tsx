import { useEffect, useMemo, useState } from 'react';
import { RESOURCES } from '../data/resources';
import { AUDIENCES, DIFFICULTIES, FORMATS, type Audience, type Difficulty, type Format } from '../data/types';
import { countFor, matchesTopic, parentTopic, searchText, topicLabel } from '../lib/taxonomy';
import { TopicPicker } from './TopicPicker';
import { useRouter } from '../lib/router';
import { ResourceCard } from './ResourceCard';
import { Icon } from './Icon';

type Filters = { q: string; topic: string; audience: Audience | ''; difficulty: Difficulty | ''; format: Format | ''; access: 'free' | 'premium' | 'etsy' | '' };
const EMPTY: Filters = { q: '', topic: '', audience: '', difficulty: '', format: '', access: '' };

export function LibraryBrowser({ compact = false }: { compact?: boolean }) {
  const { preset, clearPreset } = useRouter();
  const [f, setF] = useState<Filters>(EMPTY);

  // Apply a preset passed from another page (e.g. a learning-path card or topic tile).
  useEffect(() => {
    if (preset && !compact) {
      setF({ ...EMPTY, audience: preset.audience ?? '', topic: preset.topic ?? '', q: preset.query ?? '' });
      clearPreset();
    }
  }, [preset, compact, clearPreset]);

  const results = useMemo(() => {
    const q = f.q.trim().toLowerCase();
    // Full library leads with the original CleveRNurses infographics; the order is otherwise unchanged.
    const ordered = compact ? RESOURCES : [...RESOURCES].sort((a, b) => Number(!!b.etsy) - Number(!!a.etsy));
    return ordered.filter((r) => {
      if (!matchesTopic(r, f.topic)) return false;
      if (f.audience && !r.audience.includes(f.audience)) return false;
      if (f.difficulty && r.difficulty !== f.difficulty) return false;
      if (f.format && r.format !== f.format) return false;
      if (f.access === 'etsy' ? !r.etsy : f.access && r.access !== f.access) return false;
      if (!q) return true;
      const hay = searchText(r);
      return q.split(/\s+/).every((w) => hay.includes(w));
    });
  }, [f, compact]);

  const shown = compact ? results.slice(0, 6) : results;
  const activeCount = Object.entries(f).filter(([k, v]) => k !== 'q' && v).length;
  const set = <K extends keyof Filters>(k: K, v: Filters[K]) => setF((p) => ({ ...p, [k]: v }));
  const compactFormats: Format[] = ['Decision Map', 'Differentiation Map', 'Medication Safety', 'Prioritization Map', 'Clinical Reasoning'];

  return (
    <div>
      <div className={`flex flex-col gap-4 ${compact ? 'md:flex-row md:items-center' : ''}`}>
        <label className="relative block flex-1">
          <span className="sr-only">Search the library</span>
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute" />
          <input type="search" value={f.q} onChange={(e) => set('q', e.target.value)} placeholder="Search topics, conditions, medications…"
            className="field !min-h-[52px] !rounded-full !pl-12 shadow-card" />
        </label>

        {compact ? (
          <div role="group" aria-label="Filter by format" className="flex flex-wrap gap-2">
            {(['', ...compactFormats] as (Format | '')[]).map((x) => (
              <button key={x || 'all'} type="button" aria-pressed={f.format === x} onClick={() => set('format', x)}
                className={`min-h-[40px] rounded-full px-3.5 text-sm font-semibold transition ${f.format === x ? 'bg-ink text-ivory' : 'bg-paper ring-1 ring-line hover:ring-ink/40'}`}>
                {x || 'All'}
              </button>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3 md:grid-cols-5">
            <TopicPicker value={f.topic} onChange={(v) => set('topic', v)} />
            <Select label="Audience" value={f.audience} onChange={(v) => set('audience', v as Audience | '')} options={AUDIENCES.map((a) => [a, a])} />
            <Select label="Difficulty" value={f.difficulty} onChange={(v) => set('difficulty', v as Difficulty | '')} options={DIFFICULTIES.map((d) => [d, d])} />
            <Select label="Format" value={f.format} onChange={(v) => set('format', v as Format | '')} options={FORMATS.map((d) => [d, d])} />
            <Select label="Access" value={f.access} onChange={(v) => set('access', v as Filters['access'])} options={[['free', 'Free'], ['premium', 'Premium (planned)'], ['etsy', 'Printable on Etsy']]} />
          </div>
        )}
      </div>

      <div className="mb-6 mt-5 flex flex-wrap items-center gap-3 text-sm text-ink-soft" aria-live="polite">
        <span><strong className="text-ink">{results.length}</strong> {results.length === 1 ? 'resource' : 'resources'}{f.topic && <> in <strong className="text-ink">{topicLabel(f.topic)}</strong></>}{f.q && <> matching “{f.q}”</>}</span>
        {(activeCount > 0 || f.q) && (
          <button type="button" onClick={() => setF(EMPTY)} className="btn-ghost !min-h-[36px] !py-1 text-sm">Clear all</button>
        )}
      </div>

      {shown.length > 0 ? (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {shown.map((r) => <ResourceCard key={r.slug} r={r} />)}
        </div>
      ) : (
        <EmptyState topic={f.topic} filtered={activeCount > 1 || !!f.q} onClear={() => setF(EMPTY)} onTopicOnly={() => setF({ ...EMPTY, topic: f.topic })} onPickTopic={(t) => setF({ ...EMPTY, topic: t })} />
      )}
    </div>
  );
}

function Select({ label, value, onChange, options }: { label: string; value: string; onChange: (v: string) => void; options: [string, string][] }) {
  return (
    <label className="block">
      <span className="eyebrow mb-1.5 block !text-[10.5px]">{label}</span>
      <select value={value} onChange={(e) => onChange(e.target.value)} className="field cursor-pointer appearance-none bg-[length:16px] bg-[right_12px_center] bg-no-repeat pr-9"
        style={{ backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='%231C2333' stroke-width='2'%3E%3Cpath d='M6 9l6 6 6-6'/%3E%3C/svg%3E\")" }}>
        <option value="">All</option>
        {options.map(([v, l]) => <option key={v} value={v}>{l}</option>)}
      </select>
    </label>
  );
}

/** Empty state: "coming soon" when a category has no content yet, otherwise a no-match message. */
function EmptyState({ topic, filtered, onClear, onTopicOnly, onPickTopic }: { topic: string; filtered: boolean; onClear: () => void; onTopicOnly: () => void; onPickTopic: (t: string) => void }) {
  const empty = topic && countFor(RESOURCES, topic) === 0;
  const parent = parentTopic(topic);
  if (empty) {
    return (
      <div className="rounded-3xl border-2 border-dashed border-line p-8 text-center sm:p-12">
        <p className="eyebrow">Coming soon</p>
        <p className="mt-2 font-display text-2xl font-semibold">{topicLabel(topic)}</p>
        <p className="mx-auto mt-2 max-w-lg text-ink-soft">
          Visual explainers for this topic are on the list but haven’t been published yet. The category stays here so it’s ready when they are.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          {parent && topic !== parent.id && countFor(RESOURCES, parent.id) > 0 && (
            <button type="button" onClick={() => onPickTopic(parent.id)} className="btn-primary">See all {parent.name} ({countFor(RESOURCES, parent.id)})</button>
          )}
          <button type="button" onClick={onClear} className="btn-secondary">Browse everything</button>
        </div>
      </div>
    );
  }
  return (
    <div className="rounded-3xl border-2 border-dashed border-line p-10 text-center">
      <p className="font-display text-2xl font-semibold">Nothing matches this combination</p>
      <p className="mt-2 text-ink-soft">Try removing a filter or broadening the search.</p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        {topic && filtered && <button type="button" onClick={onTopicOnly} className="btn-secondary">Keep topic, clear the rest</button>}
        <button type="button" onClick={onClear} className="btn-secondary">Clear all filters</button>
      </div>
    </div>
  );
}
