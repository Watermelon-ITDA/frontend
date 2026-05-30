import type { HelpTag } from '@/types';

export const HELP_TAG_META: Record<
  HelpTag,
  { label: string; emoji: string; color: string; bg: string }
> = {
  direction: {
    label: '길안내',
    emoji: '🗺',
    color: '#E05A47',
    bg: '#FFF0EE',
  },
  photo: {
    label: '사진 촬영',
    emoji: '📸',
    color: '#E05A47',
    bg: '#FFF0EE',
  },
  food: {
    label: '맛집 추천',
    emoji: '🍜',
    color: '#E05A47',
    bg: '#FFF0EE',
  },
  comm: {
    label: '소통 지원',
    emoji: '💬',
    color: '#E05A47',
    bg: '#FFF0EE',
  },
  emergency: {
    label: '긴급상황',
    emoji: '🆘',
    color: '#fff',
    bg: '#E05A47',
  },
};
