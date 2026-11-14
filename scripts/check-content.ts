// Content integrity check: run with `npm run check:content`.
import { RESOURCES } from '../src/data/resources';
import { TOPICS, findSubcategory, topicById } from '../src/data/topics';

const errors: string[] = [];
const slugs = new Set<string>();
const subIds = new Set<string>();
TOPICS.forEach((t) => t.subcategories?.forEach((s) => { if (subIds.has(s.id)) errors.push(`duplicate subcategory id ${s.id}`); subIds.add(s.id); }));

for (const r of RESOURCES) {
  if (slugs.has(r.slug)) errors.push(`duplicate slug ${r.slug}`);
  slugs.add(r.slug);
  if (!topicById(r.topic)) errors.push(`${r.slug}: unknown primary topic ${r.topic}`);
  (r.secondaryTopics ?? []).forEach((t) => { if (!topicById(t)) errors.push(`${r.slug}: unknown secondary ${t}`); if (t === r.topic) errors.push(`${r.slug}: secondary repeats primary`); });
  (r.subcategories ?? []).forEach((s) => { if (!findSubcategory(s)) errors.push(`${r.slug}: unknown subcategory ${s}`); });
  if (r.etsy) {
    [r.etsy.digital?.url, r.etsy.print?.url, r.etsy.collection?.url].filter(Boolean).forEach((u) => {
      if (!/^https:\/\/www\.etsy\.com\/listing\/\d+\/[a-z0-9-]+$/.test(u!)) errors.push(`${r.slug}: bad Etsy URL ${u}`);
    });
    if (!r.etsy.digital && !r.etsy.print) errors.push(`${r.slug}: etsy entry with no listing`);
  }
  if (r.status === 'published' && (!r.references.length || !r.reviewedOn)) errors.push(`${r.slug}: published without references/review date`);
}
const etsyCount = RESOURCES.filter((r) => r.etsy).length;
console.log(`${RESOURCES.length} resources (${etsyCount} with Etsy listings), ${TOPICS.length} topics, ${subIds.size} subcategories`);
TOPICS.forEach((t) => {
  const n = RESOURCES.filter((r) => r.topic === t.id || r.secondaryTopics?.includes(t.id)).length;
  console.log(`  ${t.name.padEnd(30)} ${String(n).padStart(2)}`);
});
if (errors.length) { console.error(errors.join('\n')); process.exit(1); }
console.log('OK');
