import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '프로젝트',
  description:
    '프론트엔드부터 백엔드까지, 양지훈이 진행한 프로젝트 목록과 상세 내용입니다.',
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
