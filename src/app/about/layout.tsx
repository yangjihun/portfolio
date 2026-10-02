import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '소개',
  description:
    'AI Backend 중심의 풀스택 개발자 양지훈을 소개합니다. AI·백엔드 주력 기술과 데이터·프론트엔드·블록체인·성능 및 모니터링 경험, 교육·수상 이력을 확인할 수 있습니다.',
};

export default function AboutLayout({ children }: { children: React.ReactNode }) {
  return children;
}
