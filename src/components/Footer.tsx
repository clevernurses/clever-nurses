import { Link } from '../lib/router';
import { Logo, NAV } from './Header';
import { PulseLine } from './ui';

const SOCIAL = [
  { href: 'https://www.instagram.com/clevernurses/', label: 'Instagram' },
  { href: 'https://www.facebook.com/askclevernurses', label: 'Facebook' },
  { href: 'https://www.pinterest.com/clevernurses/', label: 'Pinterest' },
  { href: 'https://www.linkedin.com/company/askclevernurses/', label: 'LinkedIn' },
  { href: 'https://www.etsy.com/shop/CleveRNurses', label: 'Etsy' },
];

export function Footer() {
  return (
    <footer className="mt-24 bg-ink text-ivory/80">
      <PulseLine className="h-8 w-full text-teal-mid/50" />
      <div className="wrap grid gap-10 py-14 md:grid-cols-[1.4fr_1fr_1fr_1.4fr]">
        <div>
          <Logo light />
          <p className="mt-4 max-w-xs text-sm">Visual nursing education. Learn it. Understand it. Apply it.</p>
        </div>
        <nav aria-label="Footer">
          <p className="mb-3 font-semibold text-ivory">Explore</p>
          <ul className="space-y-2 text-sm">
            {NAV.map((n) => <li key={n.to}><Link to={n.to} className="hover:text-ivory">{n.label}</Link></li>)}
            <li><Link to="design-system" className="hover:text-ivory">Design system</Link></li>
          </ul>
        </nav>
        <div>
          <p className="mb-3 font-semibold text-ivory">Follow</p>
          <ul className="space-y-2 text-sm">
            {SOCIAL.map((s) => <li key={s.label}><a href={s.href} className="hover:text-ivory" rel="noopener noreferrer" target="_blank">{s.label}</a></li>)}
          </ul>
        </div>
        <div className="space-y-3 text-sm">
          <p className="font-semibold text-ivory">Educational use</p>
          <p>CleveRNurses content is for education only. It does not replace clinical judgment, facility policy or professional advice. Not affiliated with or endorsed by NCSBN.</p>
          <p>In crisis? In the US, call or text <strong className="text-ivory">988</strong> (Suicide &amp; Crisis Lifeline).</p>
        </div>
      </div>
      <div className="border-t border-ivory/10">
        <p className="wrap py-5 text-xs">© {new Date().getFullYear()} CleveRNurses · Alexander Renteria, MSN, APRN, PMHNP-BC, PHN</p>
      </div>
    </footer>
  );
}
