import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description:
    '풀스택 개발자 양지훈의 기술 스택, 자격증, 프로젝트 타임라인을 정리한 소개 페이지입니다.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
