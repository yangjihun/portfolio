'use client';

import { motion } from 'framer-motion';
import SectionTitle from '@/components/SectionTitle';
import { projectsByRecency } from '@/data/projects';

export default function AboutPage() {
  const techStacks = {
    frontend: [
      'React / Next.js',
      'JavaScript',
      'TypeScript',
      'Tailwind CSS',
      'Zustand / Redux Toolkit',
      'TanStack Query',
      'Vite'
    ],
    backend: [
      'Node.js / Express',
      'FastAPI',
      'PHP / Laravel',
      'Python',
      'Java',
      'MongoDB',
      'MySQL'
    ],
    tools: [
      'Git / GitHub',
      'Jira',
      'Notion',
      'Figma',
      'ESLint / Prettier',
      'MSW'
    ],
    deploy: [
      'Docker / Docker Compose',
      'Render',
      'Netlify',
      'Vercel'
    ],
    other: [
      'ChatGPT',
      'Cursor',
      'Gemini',
      'Claude'
    ]
  };

  const certificates = [
    { name: 'SQLD', date: '2026.06.19', note: '시나공 SQLD 우수 베타테스터 선정' },
    { name: 'Samsung SW 역량 테스트 A형', date: '2026.02.19' },
    { name: 'TOEIC Speaking IM3', date: '2025.12.14' },
    { name: '정보처리기사 필기', date: '2025.08.13' },
  ];

  const timeline = projectsByRecency.map((project) => ({
    id: project.id,
    period: project.period,
    name: project.name,
    title: project.title,
    tech: project.techTags.join(', '),
  }));

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      <SectionTitle>소개</SectionTitle>

      {/* Bio Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-20"
      >
        <div className="rounded-lg border border-border bg-muted/40 p-8">
          <h3 className="mb-4 text-2xl font-bold">양지훈 (Yang Jihun)</h3>
          <div className="space-y-4 leading-relaxed text-foreground">
            <p>
              안녕하세요! 추진력과 커뮤니케이션으로 서비스를 안정적으로 완성하는 풀스택 개발자 양지훈입니다.
            </p>
            <p>
              프론트엔드부터 백엔드까지 흐름을 연결해 사용자에게 전달되는 가치를 끝까지 만들어내는 것을 좋아합니다.
            </p>
            <p>
              제품 관점에서 문제를 정의하고, 구현·개선까지 이어지도록 구조를 잡는 데 관심이 많으며 백엔드와 AI 활용까지 꾸준히 확장하고 있습니다.
            </p>
            <p>
              IT 동아리 COMMIT 동아리장 경험을 바탕으로, 팀의 목표를 정리하고 일정과 품질을 맞추는 협업을 리딩해왔습니다.
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
          <div className="rounded-lg border border-border bg-muted/40 p-6">
            <h4 className="mb-4 text-lg font-semibold text-primary">
              Frontend
            </h4>
            <ul className="space-y-2">
              {techStacks.frontend.map((tech) => (
                <li key={tech} className="text-foreground">
                  • {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-6">
            <h4 className="mb-4 text-lg font-semibold text-primary">
              Backend
            </h4>
            <ul className="space-y-2">
              {techStacks.backend.map((tech) => (
                <li key={tech} className="text-foreground">
                  • {tech}
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-lg border border-border bg-muted/40 p-6">
            <h4 className="mb-4 text-lg font-semibold text-primary">
              Tools
            </h4>
            <ul className="space-y-2">
              {techStacks.tools.map((tech) => (
                <li key={tech} className="text-foreground">
                  • {tech}
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-muted/40 p-6">
            <h4 className="mb-4 text-lg font-semibold text-primary">Deploy</h4>
            <ul className="space-y-2">
              {techStacks.deploy.map((tech) => (
                <li key={tech} className="text-foreground">• {tech}</li>
              ))}
            </ul>
          </div>
          <div className="rounded-lg border border-border bg-muted/40 p-6">
            <h4 className="mb-4 text-lg font-semibold text-primary">
              AI 에이전트
            </h4>
            <ul className="space-y-2">
              {techStacks.other.map((tech) => (
                <li key={tech} className="text-foreground">
                  • {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Certificate Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h3 className="mb-8 text-2xl font-bold">자격증</h3>
        <div className="space-y-3">
          {certificates.map((cert) => (
            <div
              key={cert.name}
              className="flex items-start justify-between rounded-lg border border-border bg-muted/40 px-6 py-4"
            >
              <div>
                <span className="font-semibold text-foreground">{cert.name}</span>
                {cert.note && (
                  <span className="ml-3 text-sm text-muted-foreground">{cert.note}</span>
                )}
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">{cert.date}</span>
            </div>
          ))}
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
        <div className="relative border-l-2 border-primary/30 pl-6 space-y-6">
          {timeline.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="relative"
            >
              <div className="absolute -left-[33px] top-0 h-4 w-4 rounded-full border-2 border-primary/40 bg-background" />
              <div className="mb-1 text-sm text-muted-foreground">{item.period}</div>
              <h4 className="mb-2 text-xl font-semibold">{item.name}</h4>
              <p className="mb-2 text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.tech}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

