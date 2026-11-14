import { useEffect, useState } from 'react';
import { Link, useRouter } from '../lib/router';
import { Icon } from './Icon';

export const NAV = [
  { to: 'library', label: 'Explore Library' },
  { to: 'psych', label: 'Psych Nursing' },
  { to: 'lab', label: 'Clinical Judgment Lab' },
  { to: 'advanced', label: 'Advanced Practice' },
  { to: 'free', label: 'Free Resources' },
  { to: 'about', label: 'About' },
];

export function Logo({ light = false }: { light?: boolean }) {
  return (
    <span className="flex items-center gap-2.5">
      <span className={`relative flex h-9 w-9 items-center justify-center rounded-[11px] ${light ? 'bg-ivory text-ink' : 'bg-ink text-ivory'}`}>
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path d="M3 13h4l2-5 4 10 2-5h6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
        <span className="absolute -right-1 -top-1 h-3 w-3 rounded-full bg-coral ring-2 ring-ivory" />
      </span>
      <span className={`font-display text-[22px] font-semibold tracking-tight ${light ? 'text-ivory' : 'text-ink'}`}>
        Cleve<span className={light ? 'text-teal-mid' : 'text-teal'}>RN</span>urses
      </span>
    </span>
  );
}

export function Header() {
  const { route } = useRouter();
  const [open, setOpen] = useState(false);
  useEffect(() => setOpen(false), [route]);
  const active = (to: string) => route === to || (to === 'library' && route.startsWith('r-'));

  return (
    <header className="sticky top-0 z-40 border-b border-line/80 bg-ivory/90 backdrop-blur">
      <a href="#main" onClick={(e) => { e.preventDefault(); document.getElementById('main')?.focus(); }} className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:rounded-lg focus:bg-ink focus:px-4 focus:py-2 focus:text-ivory">Skip to content</a>
      <div className="wrap flex h-[68px] items-center gap-6">
        <Link to="" ariaLabel="CleveRNurses home"><Logo /></Link>
        <nav aria-label="Main" className="ml-auto hidden xl:block">
          <ul className="flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={`whitespace-nowrap rounded-full px-3 py-2 text-[14.5px] font-medium transition hover:bg-paper ${active(n.to) ? 'bg-paper text-ink ring-1 ring-line' : 'text-ink-soft'}`}>
                  {n.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link to="contact" className="btn-primary hidden !min-h-[40px] !px-4 !py-2 text-sm xl:inline-flex">Contact</Link>
        <button type="button" className="ml-auto flex h-11 w-11 items-center justify-center rounded-full ring-1 ring-line xl:hidden"
          aria-expanded={open} aria-controls="mobile-nav" aria-label={open ? 'Close menu' : 'Open menu'} onClick={() => setOpen(!open)}>
          <Icon name={open ? 'close' : 'menu'} />
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile" className="border-t border-line bg-ivory xl:hidden">
          <ul className="wrap flex flex-col py-3">
            {[...NAV, { to: 'contact', label: 'Contact' }].map((n) => (
              <li key={n.to}>
                <Link to={n.to} className={`block rounded-xl px-3 py-3 text-lg font-medium ${active(n.to) ? 'bg-paper' : ''}`}>{n.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      )}
    </header>
  );
}
