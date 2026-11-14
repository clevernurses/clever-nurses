import { useState, type KeyboardEvent } from 'react';
import { Icon } from './Icon';

type FwId = 'priority' | 'diff' | 'cause' | 'wrong';

const FRAMEWORKS: { id: FwId; n: string; name: string; line: string; tint: string; fill: string; teaches: string }[] = [
  { id: 'priority', n: '01', name: 'Prioritization Maps', line: 'What matters most, and what is the safest next action?', tint: 'bg-sun-tint', fill: 'bg-sun', teaches: 'A repeatable ladder (airway, breathing, circulation, safety) so priority questions stop feeling like guesswork.' },
  { id: 'diff', n: '02', name: 'Diagnosis Differentiation Maps', line: 'Similar symptoms. Different conditions.', tint: 'bg-lav-tint', fill: 'bg-lav', teaches: 'Side-by-side comparisons that isolate the one or two features that actually tell conditions apart.' },
  { id: 'cause', n: '03', name: 'Cause → Effect → Intervention', line: 'Why it happens, what you see, what you do.', tint: 'bg-coral-tint', fill: 'bg-coral', teaches: 'A chain that links the disease process to the signs, and the signs to the nursing actions, so interventions make sense.' },
  { id: 'wrong', n: '04', name: 'Why This Answer Is Wrong', line: 'Reasonable-sounding answers, explained.', tint: 'bg-teal-tint', fill: 'bg-teal-mid', teaches: 'Every distractor gets its own explanation: unsafe, less effective, out of scope, or not therapeutic.' },
];

export function Frameworks() {
  const [active, setActive] = useState<FwId>('priority');
  const idx = FRAMEWORKS.findIndex((f) => f.id === active);
  const fw = FRAMEWORKS[idx];

  const onKey = (e: KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    const nextIdx = (idx + (e.key === 'ArrowRight' ? 1 : FRAMEWORKS.length - 1)) % FRAMEWORKS.length;
    setActive(FRAMEWORKS[nextIdx].id);
    document.getElementById(`fw-tab-${FRAMEWORKS[nextIdx].id}`)?.focus();
  };

  return (
    <div>
      <div role="tablist" aria-label="CleveRNurses learning frameworks" onKeyDown={onKey} className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {FRAMEWORKS.map((f) => {
          const on = f.id === active;
          return (
            <button key={f.id} id={`fw-tab-${f.id}`} role="tab" aria-selected={on} aria-controls="fw-panel" tabIndex={on ? 0 : -1}
              onClick={() => setActive(f.id)}
              className={`group rounded-3xl p-5 text-left transition ${on ? `${f.tint} ring-2 ring-ink` : 'bg-paper ring-1 ring-line hover:-translate-y-0.5 hover:ring-ink/30'}`}>
              <MiniGraphic id={f.id} fill={f.fill} />
              <span className="mt-4 block font-mono text-xs text-ink-mute">{f.n}</span>
              <span className="mt-1 block font-display text-lg font-semibold leading-tight">{f.name}</span>
              <span className="mt-1 block text-sm text-ink-soft">{f.line}</span>
            </button>
          );
        })}
      </div>

      <div id="fw-panel" role="tabpanel" aria-labelledby={`fw-tab-${active}`} className="mt-6 grid gap-8 rounded-[2rem] bg-paper p-6 shadow-card ring-1 ring-line sm:p-10 lg:grid-cols-[1fr_1.4fr]">
        <div>
          <p className="eyebrow">Framework {fw.n}</p>
          <h3 className="mt-2 text-3xl font-semibold">{fw.name}</h3>
          <p className="mt-3 text-ink-soft">{fw.teaches}</p>
          <p className="mt-6 inline-flex items-center gap-2 rounded-full bg-ivory px-3 py-1.5 text-sm font-medium ring-1 ring-line">
            <Icon name="spark" size={16} className="text-teal" /> Try the example →
          </p>
          <p className="mt-6 text-xs text-ink-mute">Demonstration content · pending clinical review.</p>
        </div>
        <div key={active} className="animate-fadeUp">
          {active === 'priority' && <PriorityDemo />}
          {active === 'diff' && <DiffDemo />}
          {active === 'cause' && <CauseDemo />}
          {active === 'wrong' && <WrongDemo />}
        </div>
      </div>
    </div>
  );
}

function MiniGraphic({ id, fill }: { id: FwId; fill: string }) {
  const base = 'h-16 rounded-2xl bg-paper/70 p-2.5 ring-1 ring-ink/5';
  if (id === 'priority') return (
    <div className={`${base} flex flex-col justify-between`}>
      {[100, 75, 55, 35].map((w, i) => <span key={w} className={`h-2 rounded-full ${i === 0 ? fill : 'bg-ink/15'}`} style={{ width: `${w}%` }} />)}
    </div>
  );
  if (id === 'diff') return (
    <div className={`${base} grid grid-cols-2 gap-1.5`}>
      <span className={`rounded-md ${fill}`} /><span className="rounded-md bg-ink" />
      <span className="rounded-md bg-ink/10" /><span className="rounded-md bg-ink/10" />
    </div>
  );
  if (id === 'cause') return (
    <div className={`${base} flex items-center gap-1`}>
      <span className="h-6 flex-1 rounded-md bg-ink/15" /><span className="text-ink/40">→</span>
      <span className="h-6 flex-1 rounded-md bg-ink/15" /><span className="text-ink/40">→</span>
      <span className={`h-6 flex-1 rounded-md ${fill}`} />
    </div>
  );
  return (
    <div className={`${base} flex flex-col justify-between`}>
      <span className="flex items-center gap-1.5"><span className="font-mono text-[10px] text-teal">✓</span><span className={`h-2 w-3/4 rounded-full ${fill}`} /></span>
      <span className="flex items-center gap-1.5"><span className="font-mono text-[10px] text-coral-deep">✕</span><span className="h-2 w-2/3 rounded-full bg-ink/15" /></span>
      <span className="flex items-center gap-1.5"><span className="font-mono text-[10px] text-coral-deep">✕</span><span className="h-2 w-1/2 rounded-full bg-ink/15" /></span>
    </div>
  );
}

function PriorityDemo() {
  const steps = [
    { tag: 'Airway', who: 'Client with new stridor after extubation' },
    { tag: 'Breathing', who: 'Client with SpO₂ falling and RR 30' },
    { tag: 'Circulation', who: 'Client with BP 82/50 and cool, clammy skin' },
    { tag: 'Safety', who: 'Confused client trying to climb out of bed' },
  ];
  const [shown, setShown] = useState(1);
  return (
    <div>
      <p className="mb-4 font-medium">Four clients need you at once. Reveal the order, one rung at a time.</p>
      <ol className="space-y-2.5">
        {steps.map((s, i) => (
          <li key={s.tag} className={`flex items-center gap-4 rounded-2xl p-3.5 transition ${i < shown ? 'bg-sun-tint' : 'bg-ivory text-transparent'}`}
            style={{ marginLeft: `${i * 4}%` }} aria-hidden={i >= shown}>
            <span className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-full font-mono text-sm ${i < shown ? 'bg-ink text-ivory' : 'bg-line text-ink-mute'}`}>{i + 1}</span>
            <span className={i < shown ? '' : 'select-none'}>
              <span className="block font-display font-semibold">{i < shown ? s.tag : 'Hidden'}</span>
              <span className="block text-sm">{i < shown ? s.who : '·'}</span>
            </span>
          </li>
        ))}
      </ol>
      <div className="mt-4 flex gap-3" aria-live="polite">
        {shown < steps.length
          ? <button type="button" className="btn-primary" onClick={() => setShown(shown + 1)}>Reveal next priority</button>
          : <button type="button" className="btn-secondary" onClick={() => setShown(1)}>Start over</button>}
        <span className="sr-only">{shown} of {steps.length} priorities shown</span>
      </div>
      <p className="mt-4 text-sm text-ink-soft">Real cases need full assessment. The ladder helps break ties when everything looks urgent.</p>
    </div>
  );
}

function DiffDemo() {
  const rows = [
    { k: 'Duration', a: 'At least 1 week, or any length if hospitalized', b: 'At least 4 consecutive days' },
    { k: 'Functioning', a: 'Marked impairment', b: 'A noticeable change, but not marked impairment' },
    { k: 'Psychosis', a: 'May be present', b: 'Absent. If present, the episode is mania.' },
    { k: 'Hospitalization', a: 'May be needed', b: 'Not needed. If it is, the episode is mania.' },
  ];
  const [k, setK] = useState(rows[0].k);
  const row = rows.find((r) => r.k === k)!;
  return (
    <div>
      <p className="mb-4 font-medium">Mania vs. hypomania share symptoms. Pick a feature to see what separates them.</p>
      <div role="group" aria-label="Compare by feature" className="mb-5 flex flex-wrap gap-2">
        {rows.map((r) => (
          <button key={r.k} type="button" aria-pressed={r.k === k} onClick={() => setK(r.k)}
            className={`min-h-[44px] rounded-full px-4 text-sm font-semibold transition ${r.k === k ? 'bg-ink text-ivory' : 'bg-ivory ring-1 ring-line hover:ring-ink/40'}`}>{r.k}</button>
        ))}
      </div>
      <div className="grid gap-3 sm:grid-cols-2" aria-live="polite">
        <div className="rounded-2xl bg-lav-tint p-5">
          <p className="font-display text-xl font-semibold text-lav-deep">Mania</p>
          <p className="mt-2 text-[15px]">{row.a}</p>
        </div>
        <div className="rounded-2xl bg-ink p-5 text-ivory">
          <p className="font-display text-xl font-semibold">Hypomania</p>
          <p className="mt-2 text-[15px] text-ivory/85">{row.b}</p>
        </div>
      </div>
      <p className="mt-4 text-sm text-ink-soft">Simplified from DSM-5-TR criteria for teaching. Diagnosis needs a full clinical assessment.</p>
    </div>
  );
}

function CauseDemo() {
  const chain = [
    { k: 'Cause', t: 'Left ventricle can’t pump forward well', why: 'Damage (for example, from MI or long-standing hypertension) weakens the ventricle, so less blood moves forward with each beat.' },
    { k: 'Effect', t: 'Blood backs up into the lungs', why: 'Pressure rises in the pulmonary circulation and fluid moves into the lung tissue.' },
    { k: 'Signs', t: 'Dyspnea, orthopnea, crackles', why: 'Fluid in the lungs makes breathing harder, especially lying flat, and you can hear it as crackles.' },
    { k: 'Intervene', t: 'Sit upright · O₂ & diuretics as ordered · daily weights', why: 'Each action targets the backup: positioning eases breathing, diuretics remove fluid, and weights track it.' },
  ];
  const [i, setI] = useState(0);
  return (
    <div>
      <p className="mb-4 font-medium">Left-sided heart failure, as a chain. Select any link to see the why.</p>
      <div role="group" aria-label="Cause and effect chain" className="grid gap-2 sm:grid-cols-4">
        {chain.map((c, n) => (
          <button key={c.k} type="button" aria-pressed={n === i} onClick={() => setI(n)}
            className={`relative min-h-[96px] rounded-2xl p-3.5 text-left transition ${n === i ? 'bg-coral-tint ring-2 ring-ink' : 'bg-ivory ring-1 ring-line hover:ring-ink/40'}`}>
            <span className="font-mono text-[11px] uppercase tracking-wider text-ink-mute">{c.k}</span>
            <span className="mt-1 block text-sm font-semibold leading-snug">{c.t}</span>
            {n < chain.length - 1 && <span aria-hidden className="absolute -right-2.5 top-1/2 z-10 hidden -translate-y-1/2 rounded-full bg-paper px-0.5 text-ink/50 sm:block">→</span>}
          </button>
        ))}
      </div>
      <div className="mt-4 rounded-2xl bg-paper p-5 ring-1 ring-line" aria-live="polite">
        <p className="eyebrow">Why · {chain[i].k}</p>
        <p className="mt-1 text-[15px]">{chain[i].why}</p>
      </div>
    </div>
  );
}

function WrongDemo() {
  const opts = [
    { t: '“Are you thinking about killing yourself?”', ok: true, why: 'Therapeutic. It asks directly and clearly about suicide. Asking does not increase risk, and it opens the door to a safety assessment.' },
    { t: '“Don’t talk like that. You have so much to live for.”', ok: false, why: 'False reassurance. It dismisses the client’s feelings and shuts the conversation down.' },
    { t: '“Why would you say something like that?”', ok: false, why: '“Why” questions can sound judgmental and put the client on the defensive.' },
    { t: '“Let’s talk about something more positive.”', ok: false, why: 'Changing the subject misses a possible safety cue.' },
  ];
  const [open, setOpen] = useState<number[]>([]);
  return (
    <div>
      <p className="mb-1 font-medium">A client says: <em>“I don’t think I’ll be around much longer.”</em></p>
      <p className="mb-4 text-sm text-ink-soft">Tap each response to see why it works, or why it doesn’t.</p>
      <ul className="space-y-2.5">
        {opts.map((o, n) => {
          const on = open.includes(n);
          return (
            <li key={o.t}>
              <button type="button" aria-expanded={on} onClick={() => setOpen(on ? open.filter((x) => x !== n) : [...open, n])}
                className={`w-full rounded-2xl p-4 text-left transition ${on ? (o.ok ? 'bg-teal-tint' : 'bg-coral-tint') : 'bg-ivory ring-1 ring-line hover:ring-ink/40'}`}>
                <span className="flex items-start gap-3">
                  <span className={`mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full font-mono text-sm ${on ? (o.ok ? 'bg-teal text-ivory' : 'bg-coral-deep text-ivory') : 'bg-paper ring-1 ring-line'}`}>{on ? (o.ok ? '✓' : '✕') : '?'}</span>
                  <span>
                    <span className="block font-semibold">{o.t}</span>
                    {on && <span className="mt-1 block text-sm text-ink-soft">{o.why}</span>}
                  </span>
                </span>
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
