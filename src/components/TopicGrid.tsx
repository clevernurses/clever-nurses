import { useMemo, useState } from 'react';
import { TOPICS } from '../data/topics';
import { RESOURCES } from '../data/resources';
import { ACCENT } from '../lib/accent';
import { useRouter } from '../lib/router';
import { Icon } from './Icon';

export function TopicGrid() {
  const { go } = useRouter();
  const [q, setQ] = useState('');
  const [all, setAll] = useState(false);
  const counts = useMemo(() => {
    const m: Record<string, number> = {};
    RESOURCES.forEach((r) => { [r.topic, ...(r.secondaryTopics ?? [])].forEach((t) => { m[t] = (m[t] ?? 0) + 1; }); });
    return m;
  }, []);

  const query = q.trim().toLowerCase();
  const list = TOPICS.filter((t) => (query ? (t.name + ' ' + t.blurb).toLowerCase().includes(query) : all || t.featured));

  return (
    <div>
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center">
        <label className="relative block w-full sm:max-w-sm">
          <span className="sr-only">Search topics</span>
          <Icon name="search" className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-ink-mute" />
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={`Search ${TOPICS.length} topics`} className="field !rounded-full !pl-12" />
        </label>
        {!query && (
          <button type="button" onClick={() => setAll(!all)} aria-expanded={all} className="btn-secondary sm:ml-auto">
            {all ? 'Show featured topics' : `View all ${TOPICS.length} topics`}
          </button>
        )}
      </div>

      <ul className="grid grid-cols-2 gap-x-6 gap-y-2 md:grid-cols-3 lg:grid-cols-4" aria-live="polite">
        {list.map((t) => {
          const a = ACCENT[t.accent];
          const n = counts[t.id] ?? 0;
          return (
            <li key={t.id}>
              <button type="button" onClick={() => go('library', { topic: t.id })}
                className="group flex w-full items-center gap-4 border-b border-line py-4 text-left transition hover:border-ink">
                <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${a.tint} ${a.deep} transition duration-300 group-hover:rotate-[-8deg] group-hover:scale-110`}>
                  <Icon name={t.icon} size={24} />
                </span>
                <span className="min-w-0">
                  <span className="block font-display text-[17px] font-semibold leading-tight">{t.name}</span>
                  <span className="block truncate text-sm text-ink-mute">{n > 0 ? `${n} resource${n > 1 ? 's' : ''} · ${t.blurb}` : `Coming soon · ${t.blurb}`}</span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {list.length === 0 && <p className="py-6 text-ink-soft">No topics match “{q}”.</p>}
    </div>
  );
}
