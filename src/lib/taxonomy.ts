import type { Resource, TopicId } from '../data/types';
import { TOPICS, findSubcategory, topicById } from '../data/topics';

/**
 * Topic filter values:
 *   ''                → all topics
 *   '<topicId>'       → primary OR secondary category matches
 *   'sub:<subcatId>'  → resource is tagged with that subcategory
 */
export type TopicValue = string;

export const isSub = (v: TopicValue) => v.startsWith('sub:');

export function matchesTopic(r: Resource, v: TopicValue): boolean {
  if (!v) return true;
  if (isSub(v)) return (r.subcategories ?? []).includes(v.slice(4));
  return r.topic === v || (r.secondaryTopics ?? []).includes(v as TopicId);
}

export function topicLabel(v: TopicValue): string {
  if (!v) return 'All topics';
  if (isSub(v)) {
    const f = findSubcategory(v.slice(4));
    return f ? `${f.topic.name} › ${f.sub.name}` : 'Unknown topic';
  }
  return topicById(v)?.name ?? 'Unknown topic';
}

/** Parent topic for a value (the topic itself, or the parent of a subcategory). */
export function parentTopic(v: TopicValue) {
  if (!v) return undefined;
  return isSub(v) ? findSubcategory(v.slice(4))?.topic : topicById(v);
}

/** Text used by search: title, summary, classification, tags, key points. */
export function searchText(r: Resource): string {
  const subNames = (r.subcategories ?? []).map((id) => findSubcategory(id)?.sub.name ?? '');
  const topicNames = [r.topic, ...(r.secondaryTopics ?? [])].map((id) => topicById(id)?.name ?? '');
  return [
    r.title, r.summary, r.specialty, r.format, ...topicNames, ...subNames, ...(r.tags ?? []), ...r.keyPoints,
    r.etsy?.artworkTitle ?? '', r.etsy ? 'etsy printable' : '',
  ].join(' ').toLowerCase();
}

export function countFor(list: Resource[], v: TopicValue) {
  return list.filter((r) => matchesTopic(r, v)).length;
}

/** Related resources ranked by shared classification. */
export function related(r: Resource, list: Resource[], n = 3): Resource[] {
  const topics = new Set([r.topic, ...(r.secondaryTopics ?? [])]);
  const subs = new Set(r.subcategories ?? []);
  const tags = new Set((r.tags ?? []).map((t) => t.toLowerCase()));
  return list
    .filter((x) => x.slug !== r.slug)
    .map((x) => {
      let s = 0;
      if (x.topic === r.topic) s += 4;
      [x.topic, ...(x.secondaryTopics ?? [])].forEach((t) => { if (topics.has(t)) s += 2; });
      (x.subcategories ?? []).forEach((id) => { if (subs.has(id)) s += 3; });
      (x.tags ?? []).forEach((t) => { if (tags.has(t.toLowerCase())) s += 2; });
      if (x.format === r.format) s += 1;
      return { x, s };
    })
    .filter((o) => o.s > 0)
    .sort((a, b) => b.s - a.s)
    .slice(0, n)
    .map((o) => o.x);
}

export { TOPICS };
