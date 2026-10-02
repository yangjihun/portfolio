import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { developerProfile } from "@/data/profile";

// 배포 도메인이 정해지면 NEXT_PUBLIC_SITE_URL로 주입한다 (OG 이미지 절대경로 변환에 사용)
const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `양지훈 | ${developerProfile.role}`,
    template: "%s | 양지훈",
  },
  description: "AI Backend 중심의 풀스택 개발자 양지훈의 포트폴리오입니다. RAG·STT 서비스 통합부터 API·캐싱·성능 개선, 블록체인과 모니터링까지 프로젝트 경험을 소개합니다.",
  openGraph: {
    type: "website",
    locale: "ko_KR",
    siteName: "양지훈 포트폴리오",
    title: `양지훈 | ${developerProfile.role}`,
    description: developerProfile.headline,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="scroll-smooth">
      <body className="bg-background text-foreground">
        <Navigation />
        <main className="min-h-screen">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
