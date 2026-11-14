/** Overlapping "real resource" cards for the hero. Decorative previews, labeled as samples. */
export function HeroCollage() {
  return (
    <div className="relative mx-auto grid w-full max-w-[560px] gap-4 pb-6 sm:block sm:h-[610px] sm:pb-0" aria-label="Sample CleveRNurses learning cards" role="img">
      {/* EKG card */}
      <div className="hero-card rotate-[-1.5deg] sm:left-0 sm:top-0 sm:w-[60%] sm:rotate-[-4deg] [animation-delay:-1s]">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-ink-mute">Rhythm basics</p>
        <p className="mt-1 font-display text-xl font-semibold">Normal Sinus Rhythm</p>
        <svg viewBox="0 0 260 60" className="my-3 h-12 w-full text-coral" aria-hidden="true">
          <defs><pattern id="g" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M10 0H0V10" fill="none" stroke="#F3D9CF" strokeWidth=".8" /></pattern></defs>
          <rect width="260" height="60" fill="url(#g)" rx="6" />
          <path d="M0 38h18c4 0 6-6 10-6s6 6 10 6h6l4 6 6-36 6 40 4-10h14c6 0 8-8 16-8s10 8 16 8h20c4 0 6-6 10-6s6 6 10 6h6l4 6 6-36 6 40 4-10h14c6 0 8-8 16-8s10 8 16 8h20" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinejoin="round" />
        </svg>
        <dl className="grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 text-[12px]">
          <dt className="text-ink-mute">Rate</dt><dd className="font-semibold">60–100</dd>
          <dt className="text-ink-mute">Rhythm</dt><dd className="font-semibold">Regular</dd>
          <dt className="text-ink-mute">P waves</dt><dd className="font-semibold">1 before each QRS</dd>
          <dt className="text-ink-mute">PR</dt><dd className="font-semibold">0.12–0.20 s</dd>
          <dt className="text-ink-mute">QRS</dt><dd className="font-semibold">&lt; 0.12 s</dd>
        </dl>
      </div>

      {/* Psych decision map */}
      <div className="hero-card rotate-[1deg] bg-lav-tint sm:right-0 sm:top-[96px] sm:w-[52%] sm:rotate-[3deg] [animation-delay:-3s]">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-lav-deep">Psych decision map</p>
        <p className="mt-1 font-display text-lg font-semibold leading-tight">Escalating agitation: least restrictive first</p>
        <ol className="mt-3 space-y-1.5 text-[12px] font-semibold">
          <li className="rounded-lg bg-paper px-2.5 py-1.5">1 · Calm, verbal de-escalation</li>
          <li className="ml-3 rounded-lg bg-paper px-2.5 py-1.5">2 · Reduce stimuli, offer choices</li>
          <li className="ml-6 rounded-lg bg-paper px-2.5 py-1.5">3 · PRN medication as ordered</li>
          <li className="ml-9 rounded-lg bg-lav px-2.5 py-1.5">4 · Restraint only as a last resort</li>
        </ol>
      </div>

      {/* Medication safety */}
      <div className="hero-card rotate-[-1deg] bg-teal-tint sm:left-[3%] sm:top-[300px] sm:w-[52%] sm:rotate-[2deg] [animation-delay:-5s]">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-teal">Medication safety</p>
        <p className="mt-1 font-display text-lg font-semibold">Lithium: know the tremor</p>
        <div className="mt-3 flex h-2.5 overflow-hidden rounded-full"><span className="w-1/3 bg-sky-tint" /><span className="w-1/3 bg-teal-mid" /><span className="w-1/3 bg-coral" /></div>
        <div className="mt-3 grid grid-cols-2 gap-2 text-[12px]">
          <div className="rounded-lg bg-paper p-2"><span className="block font-semibold">Fine tremor</span><span className="text-ink-soft">common side effect</span></div>
          <div className="rounded-lg bg-coral-tint p-2"><span className="block font-semibold">Coarse + confusion</span><span className="text-ink-soft">hold &amp; notify</span></div>
        </div>
      </div>

      {/* Prioritization flowchart */}
      <div className="hero-card rotate-[1.5deg] bg-sun-tint sm:-bottom-4 sm:right-0 sm:w-[47%] sm:rotate-[-3deg] [animation-delay:-2s]">
        <p className="font-mono text-[10px] uppercase tracking-[.14em] text-sun-deep">Prioritization</p>
        <p className="mt-1 font-display text-lg font-semibold">Who do I see first?</p>
        <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[12px] font-bold">
          {['A', 'B', 'C', 'Safety'].map((x, i) => (
            <span key={x} className="flex items-center gap-1.5">
              <span className={`rounded-full px-2.5 py-1 ${i === 0 ? 'bg-ink text-ivory' : 'bg-paper'}`}>{x}</span>
              {i < 3 && <span className="text-ink/40">→</span>}
            </span>
          ))}
        </div>
        <p className="mt-2.5 text-[12px] text-ink-soft">Acute beats chronic. Unexpected beats expected.</p>
      </div>
      <p className="text-center text-xs text-ink-mute sm:absolute sm:-bottom-10 sm:left-0 sm:right-0">Sample cards · content in development</p>
    </div>
  );
}
