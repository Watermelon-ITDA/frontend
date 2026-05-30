import { HELP_TAG_META } from '@/lib/helpTags';
import type { HelpTag } from '@/types';

interface Props {
  tag: HelpTag;
  size?: 'sm' | 'md';
}

export function HelpTagBadge({ tag, size = 'md' }: Props) {
  const meta = HELP_TAG_META[tag];
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full font-medium ${
        size === 'sm' ? 'px-2 py-0.5 text-xs' : 'px-3 py-1 text-sm'
      }`}
      style={{ background: meta.bg, color: meta.color }}
    >
      <span>{meta.emoji}</span>
      <span>{meta.label}</span>
    </span>
  );
}
