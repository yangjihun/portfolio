import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: '연락처',
  description:
    '프로젝트 협업, 채용 제안, 기술 문의는 이메일·GitHub·LinkedIn·블로그로 연락주세요.',
};

export default function ContactLayout({ children }: { children: React.ReactNode }) {
  return children;
}
