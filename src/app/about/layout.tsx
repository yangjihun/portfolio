import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description:
    '풀스택 개발자 양지훈의 개발 가치관과 성장 목표, Backend·Database·Frontend·AI 연동 활용 경험, 교육·수상 이력을 소개합니다.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
