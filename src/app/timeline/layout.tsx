import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '활동 타임라인',
  description: '양지훈이 참여한 프로그램, 해커톤, 동아리 활동 전체 기록입니다.',
};

export default function TimelineLayout({ children }: { children: React.ReactNode }) {
  return children;
}
