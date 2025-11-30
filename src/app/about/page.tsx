'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';

export default function AboutPage() {
  const techStacks = {
    frontend: [
      'React / Next.js',
      'TypeScript',
      'Tailwind CSS',
      'Zustand / Redux Toolkit',
      'TanStack Query',
      'Framer Motion',
      'React Router',
    ],
    backend: [
      'Node.js / Express',
      'MongoDB',
      'JWT Authentication',
      'RESTful API',
    ],
    tools: [
      'Git / GitHub',
      'Vite',
      'MSW (Mock Service Worker)',
      'ESLint / Prettier',
      'Figma',
    ],
    interests: [
      'AI / LLM 통합',
      '블록체인 / Web3',
      '클라우드 인프라',
      'UX/UI 디자인',
    ],
  };

  const timeline = [
    {
      period: '2025.09 ~ 2025.10',
      title: 'Loventure',
      description: 'AI 기반 데이트 코스 추천 서비스 프론트엔드 개발',
      tech: 'React 19, TypeScript, Zustand, TanStack Query',
    },
    {
      period: '2025.09 ~ 진행중',
      title: 'COMMIT 동아리 공식 홈페이지',
      description: 'IT 동아리 홈페이지 풀스택 개발 및 동아리장 역할',
      tech: 'React, Node.js, TypeScript',
    },
    {
      period: '2025.07 ~ 2025.08',
      title: 'DreamMap',
      description: 'AI 이력서 분석 및 로드맵 제안 서비스 풀스택 개발',
      tech: 'React, Express, MongoDB, Gemini API',
    },
    {
      period: '2025.06 ~ 2025.07',
      title: 'xrpl-eyes',
      description: 'XRPL 기반 UAW 대시보드 프론트엔드 개발',
      tech: 'React, TypeScript, Recharts, Framer Motion',
    },
    {
      period: '2025.01 ~ 2025.02',
      title: 'SuME (Summary Meeting)',
      description: '회의 음성 요약 및 캘린더 연동 서비스 프론트엔드 개발',
      tech: 'React, Tailwind CSS, FullCalendar',
    },
  ];

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <SectionTitle>소개</SectionTitle>

      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-8">
          <h3 className="mb-4 text-2xl font-bold">양지훈 (Yang Jihun)</h3>
          <div className="space-y-4 leading-relaxed text-gray-300">
            <p>
              안녕하세요! 웹 프론트엔드 개발을 중심으로 풀스택 개발까지 경험하고 있는
              개발자 양지훈입니다.
            </p>
            <p>
              사용자 경험을 최우선으로 생각하며, 깔끔하고 직관적인 UI/UX를
              구현하는 것을 좋아합니다. React와 TypeScript를 주력으로 사용하며,
              Next.js, Tailwind CSS 등 모던 웹 기술 스택에 능숙합니다.
            </p>
            <p>
              프론트엔드뿐만 아니라 Node.js를 활용한 백엔드 개발과 AI, 블록체인,
              클라우드 인프라 등 다양한 기술 영역에 관심을 가지고 있으며, 꾸준히
              학습하고 있습니다.
            </p>
            <p>
              IT 동아리 COMMIT의 동아리장으로 활동하며 팀 프로젝트를 주도하고,
              다양한 협업 경험을 쌓아가고 있습니다.
            </p>
          </div>
        </div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h3 className="mb-8 text-2xl font-bold">기술 스택</h3>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h4 className="mb-4 text-lg font-semibold text-blue-400">
              Frontend
            </h4>
            <ul className="space-y-2">
              {techStacks.frontend.map((tech) => (
                <li key={tech} className="text-gray-300">
                  • {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h4 className="mb-4 text-lg font-semibold text-green-400">
              Backend
            </h4>
            <ul className="space-y-2">
              {techStacks.backend.map((tech) => (
                <li key={tech} className="text-gray-300">
                  • {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h4 className="mb-4 text-lg font-semibold text-purple-400">
              Tools & Others
            </h4>
            <ul className="space-y-2">
              {techStacks.tools.map((tech) => (
                <li key={tech} className="text-gray-300">
                  • {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-gray-800 bg-gray-900/50 p-6">
            <h4 className="mb-4 text-lg font-semibold text-pink-400">
              관심 분야
            </h4>
            <ul className="space-y-2">
              {techStacks.interests.map((tech) => (
                <li key={tech} className="text-gray-300">
                  • {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Timeline Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h3 className="mb-8 text-2xl font-bold">프로젝트 타임라인</h3>
        <div className="space-y-6">
          {timeline.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative border-l-2 border-gray-700 pl-6"
            >
              <div className="absolute -left-[9px] top-0 h-4 w-4 rounded-full border-2 border-gray-700 bg-background" />
              <div className="mb-1 text-sm text-gray-400">{item.period}</div>
              <h4 className="mb-2 text-xl font-semibold">{item.title}</h4>
              <p className="mb-2 text-gray-300">{item.description}</p>
              <p className="text-sm text-gray-500">{item.tech}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

