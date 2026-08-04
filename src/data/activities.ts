import { timelineItems, type TimelineItem } from './timeline';

export type Activity = TimelineItem;

/**
 * 홈에서 요약해 보여줄 활동. 원본은 timeline.ts 한 곳에만 두고
 * 여기서는 노출할 항목과 순서만 정의한다.
 */
const FEATURED_ACTIVITY_IDS = [
  'ai-ssafy-15',
  'commit-founder-lead',
  'kakao-enterprise-academy-7',
  'xrpl-korea-ambassador',
  'gairos-blockchain-club',
];

export const activities: Activity[] = FEATURED_ACTIVITY_IDS.map((id) => {
  const item = timelineItems.find((entry) => entry.id === id);
  if (!item) {
    throw new Error(`activities: timeline.ts에 '${id}' 항목이 없습니다.`);
  }
  return item;
});
