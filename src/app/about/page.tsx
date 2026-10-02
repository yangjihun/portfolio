'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import SkillsSection from '@/components/SkillsSection';
import DeveloperDirection from '@/components/DeveloperDirection';
import { developerProfile, ssafyEducation } from '@/data/profile';
import { Trophy } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import { projectsByRecency } from '@/data/projects';
import { toolGroups } from '@/data/skills';

export default function AboutPage() {
  const educations = [
    ssafyEducation,
    {
      name: '가천대 카카오 엔터프라이즈 SW 아카데미 7기',
      period: '2025.09 ~ 2025.12',
      details: [
        '프로젝트 중심 커리큘럼으로 협업 프로세스와 실무형 구현 경험 강화',
        '기업실무형 프로젝트 Vibot(B2B 챗봇 관리자 페이지, FE 팀장), 현장미러형 프로젝트 Loventure 수행',
      ],
    },
    {
      name: '가천대학교 금융수학과 전공 · 소프트웨어학과 복수전공',
      period: '2020.03 ~ 2026.02',
      details: ['금융 도메인의 수학적 사고와 소프트웨어 개발 역량을 함께 학습'],
    },
  ];

  const awards = [
    ...projectsByRecency.flatMap(project => project.award ? [{
      name: project.award,
      date: project.period.split('~').at(-1)?.trim() ?? project.period,
      note: '삼성 청년 SW·AI 아카데미 · ' + project.title,
      href: '/projects/' + project.id,
    }] : []),
    {
      name: '시나공 SQLD 우수 베타테스터 선정',
      date: '2026.06',
      note: '서브쿼리·그룹 함수·윈도우 함수 문제 검토 및 피드백 12건 전달',
      href: undefined,
    },
  ];

  const certificates = [
    { name: '정보처리기사', date: '2025.09.11' },
    { name: 'SQLD', date: '2026.06.19' },
    { name: 'Samsung SW 역량 테스트 A형', date: '2026.02.19' },
    { name: 'TOEIC Speaking IM3', date: '2025.12.14' },
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
        <div>
          <h2 className="mb-4 text-2xl font-bold">양지훈 (Yang Jihun)</h2>
          <p className="mb-4 font-semibold text-primary">{developerProfile.role}</p>
          <p className="mb-4 text-xl font-semibold leading-8">{developerProfile.headline}</p>
          <p className="text-base leading-8 text-muted-foreground">{developerProfile.value}</p>
          <p className="mt-4 text-base leading-8 text-muted-foreground">{developerProfile.experience}</p>
        </div>
        <div className="mt-5"><DeveloperDirection /></div>
      </motion.section>

      {/* Tech Stack Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 id="skills" className="mb-6 scroll-mt-24 text-2xl font-bold">기술 스킬</h2>
        <SkillsSection />

        {/* 보조 도구 */}
        <div className="mt-6 grid gap-6 md:grid-cols-3">
          {toolGroups.map((group) => (
            <div key={group.title} className="border-t-2 border-primary/30 pt-4">
              <h4 className="mb-3 text-base font-semibold text-primary">{group.title}</h4>
              <ul className="list-disc space-y-1.5 pl-4 marker:text-primary/50">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-foreground">
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Certificate Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="mb-8 text-2xl font-bold">수상 · 자격증</h2>
        <div className="divide-y divide-border border-y border-border">
          {awards.map((award) => (
            <div
              key={award.name}
              className="flex flex-wrap items-start justify-between gap-3 py-5"
            >
              <div>
                <span className="flex items-start gap-2 font-semibold text-foreground">
                  <Trophy className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {award.href ? <Link href={award.href} className="underline-offset-4 hover:underline">{award.name}</Link> : award.name}
                </span>
                <p className="mt-2 pl-6 text-base leading-7 text-muted-foreground">{award.note}</p>
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">{award.date}</span>
            </div>
          ))}
          {certificates.map((cert) => (
            <div
              key={cert.name}
              className="flex flex-wrap items-start justify-between gap-3 py-4"
            >
              <span className="font-semibold text-foreground">{cert.name}</span>
              <span className="shrink-0 text-sm text-muted-foreground">{cert.date}</span>
            </div>
          ))}
        </div>
      </motion.section>

      {/* Education Section */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="mb-20"
      >
        <h2 className="mb-8 text-2xl font-bold">교육 · 이력</h2>
        <div className="divide-y divide-border border-y border-border">
          {educations.map((edu) => (
            <div
              key={edu.name}
              className="py-6"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="font-semibold text-foreground">{edu.name}</span>
                <span className="shrink-0 text-sm text-muted-foreground">{edu.period}</span>
              </div>
              <ul className="mt-4 space-y-3">
                {edu.details.map((detail) => (
                  <li key={detail} className="text-base leading-7 text-muted-foreground">
                    • {detail}
                  </li>
                ))}
              </ul>
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
        <h2 className="mb-8 text-2xl font-bold">프로젝트 타임라인</h2>
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
              <h3 className="mb-2 text-xl font-semibold"><Link href={`/projects/${item.id}`} className="hover:text-primary">{item.name}</Link></h3>
              <p className="mb-2 text-foreground">{item.title}</p>
              <p className="text-sm text-muted-foreground">{item.tech}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>
    </div>
  );
}

