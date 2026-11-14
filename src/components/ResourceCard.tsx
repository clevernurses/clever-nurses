import type { Resource } from '../data/types';
import { Link } from '../lib/router';
import { Thumbnail } from './Thumbnail';
import { Artwork } from './Artwork';
import { AccessPill } from './ui';
import { Icon } from './Icon';

export function ResourceCard({ r }: { r: Resource }) {
  return (
    <article className="group relative flex flex-col rounded-xl3 bg-paper p-3 shadow-card ring-1 ring-line transition duration-300 hover:-translate-y-1 hover:shadow-lift">
      <div className="transition duration-300 group-hover:rotate-[-.6deg]">{r.artwork ? <Artwork r={r} /> : <Thumbnail r={r} />}</div>
      <div className="flex flex-1 flex-col gap-2 px-2 pb-2 pt-4">
        <p className="eyebrow !text-[11px]">{r.specialty} · {r.difficulty}</p>
        <h3 className="text-xl font-semibold leading-snug">
          <Link to={`r-${r.slug}`} className="after:absolute after:inset-0 after:rounded-xl3 focus-visible:outline-none group-focus-within:underline">
            {r.title}
          </Link>
        </h3>
        <p className="line-clamp-2 text-sm text-ink-soft">{r.summary}</p>
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-3">
          <span className="chip bg-ivory text-ink-soft ring-1 ring-line">{r.format}</span>
          <AccessPill access={r.access} etsy={!!r.etsy} />
          {r.etsy && <span className="chip bg-coral-tint text-coral-deep">Printable on Etsy</span>}
          <span className="ml-auto inline-flex items-center gap-1 text-sm font-semibold text-teal">
            View <Icon name="arrow" size={16} className="transition group-hover:translate-x-1" />
          </span>
        </div>
      </div>
    </article>
  );
}
