import { useEffect, useRef, useState } from 'react';
import { QUESTIONS } from '../data/questions';
import { Icon } from './Icon';

export function JudgmentExercise({ compact = false }: { compact?: boolean }) {
  const [qi, setQi] = useState(0);
  const [picked, setPicked] = useState<string | null>(null);
  const [checked, setChecked] = useState(false);
  const feedbackRef = useRef<HTMLDivElement>(null);
  const q = QUESTIONS[qi];
  const correct = checked && picked === q.correctId;

  useEffect(() => {
    if (checked) feedbackRef.current?.focus();
  }, [checked]);

  const next = () => {
    setQi((qi + 1) % QUESTIONS.length);
    setPicked(null);
    setChecked(false);
  };

  return (
    <div className="overflow-hidden rounded-[2rem] bg-paper shadow-card ring-1 ring-line">
      <div className="flex flex-wrap items-center gap-3 border-b border-line bg-ivory/60 px-5 py-3 sm:px-8">
        <span className="chip bg-sun-tint text-sun-deep">Demonstration · pending clinical review</span>
        <span className="font-mono text-xs text-ink-mute">Question {qi + 1} of {QUESTIONS.length}</span>
        <span className="ml-auto text-xs text-ink-mute">Original practice item · not an NCLEX question</span>
      </div>

      <div className={`grid gap-8 p-5 sm:p-8 ${compact ? '' : 'lg:grid-cols-[1.1fr_1fr]'}`}>
        <form onSubmit={(e) => { e.preventDefault(); if (picked) setChecked(true); }}>
          <fieldset>
            <legend className="mb-5">
              <span className="eyebrow block">{q.setting}</span>
              <span className="mt-2 block font-display text-2xl font-semibold leading-snug sm:text-[28px]">{q.stem}</span>
            </legend>
            <div className="grid gap-3">
              {q.options.map((o) => {
                const isPicked = picked === o.id;
                const isCorrect = checked && o.id === q.correctId;
                const isWrongPick = checked && isPicked && !isCorrect;
                const tone = isCorrect ? 'ring-2 ring-teal bg-teal-tint' : isWrongPick ? 'ring-2 ring-coral bg-coral-tint' : isPicked ? 'ring-2 ring-ink bg-ivory' : 'ring-1 ring-line hover:ring-ink/40 bg-paper';
                return (
                  <label key={o.id} className={`flex cursor-pointer items-start gap-4 rounded-2xl p-4 transition ${tone} ${checked ? 'cursor-default' : ''}`}>
                    <input type="radio" name={q.id} value={o.id} checked={isPicked} disabled={checked}
                      onChange={() => setPicked(o.id)} className="peer sr-only" />
                    <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full font-mono text-sm font-medium uppercase ring-1 ring-ink/20 peer-focus-visible:ring-4 peer-focus-visible:ring-teal ${isPicked ? 'bg-ink text-ivory' : 'bg-paper'}`}>
                      {isCorrect ? <Icon name="check" size={16} strokeWidth={3} /> : o.id}
                    </span>
                    <span>
                      <span className="block font-semibold">{o.label}</span>
                      <span className="block text-[15px] text-ink-soft">{o.detail}</span>
                    </span>
                  </label>
                );
              })}
            </div>
          </fieldset>
          <div className="mt-5 flex flex-wrap gap-3">
            {!checked ? (
              <button type="submit" disabled={!picked} className="btn-primary disabled:cursor-not-allowed disabled:opacity-40">Check my answer</button>
            ) : (
              <button type="button" onClick={next} className="btn-primary">Try another question <Icon name="arrow" size={18} /></button>
            )}
          </div>
        </form>

        <div ref={feedbackRef} tabIndex={-1} aria-live="polite" className="outline-none">
          {!checked ? (
            <div className="flex h-full flex-col justify-center rounded-3xl border-2 border-dashed border-line p-6 text-ink-soft">
              <p className="font-display text-xl font-semibold text-ink">Think it through first</p>
              <ul className="mt-3 space-y-2 text-[15px]">
                <li>• Which finding is <strong>new or unexpected</strong>?</li>
                <li>• Which one threatens <strong>airway, breathing, circulation or safety</strong>?</li>
                <li>• What happens if this client <strong>waits</strong>?</li>
              </ul>
            </div>
          ) : (
            <div className="animate-fadeUp space-y-4">
              <div className={`rounded-2xl p-5 ${correct ? 'bg-teal-tint' : 'bg-coral-tint'}`}>
                <p className={`font-display text-2xl font-semibold ${correct ? 'text-teal' : 'text-coral-deep'}`}>
                  {correct ? 'Correct.' : `Not quite. The priority is ${q.correctId.toUpperCase()}.`}
                </p>
                <p className="mt-1 font-medium">{q.verdict}</p>
              </div>
              <div>
                <p className="eyebrow mb-1">Clinical reasoning</p>
                <p className="text-[15px] text-ink-soft">{q.rationale}</p>
              </div>
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl bg-ivory p-4 ring-1 ring-line">
                  <p className="eyebrow mb-1">Recognize cues</p>
                  <p className="text-sm">{q.cues}</p>
                </div>
                <div className="rounded-2xl bg-ivory p-4 ring-1 ring-line">
                  <p className="eyebrow mb-1">Take action</p>
                  <p className="text-sm">{q.action}</p>
                </div>
              </div>
              <div>
                <p className="eyebrow mb-2">Why the others can wait</p>
                <ul className="space-y-2">
                  {q.options.filter((o) => o.id !== q.correctId).map((o) => (
                    <li key={o.id} className="flex gap-3 text-sm">
                      <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-ivory font-mono text-xs uppercase ring-1 ring-line">{o.id}</span>
                      <span className="text-ink-soft">{q.whyNot[o.id]}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="flex flex-wrap items-center gap-3 rounded-2xl bg-ink p-4 text-ivory">
                <span className="chip bg-sun text-ink">{q.priority}</span>
                <p className="font-display text-lg font-medium">{q.takeaway}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
