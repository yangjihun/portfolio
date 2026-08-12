'use client';

import { motion } from 'framer-motion';
import { Trophy } from 'lucide-react';
import SectionTitle from '@/components/SectionTitle';
import { projectsByRecency } from '@/data/projects';
import { skillGroups, toolGroups, LEVEL_LABELS, type Skill } from '@/data/skills';

/** 숙련도 5단계 게이지. 채워지는 칸은 스크롤 진입 시 왼쪽부터 차오른다 */
function SkillGauge({ level }: { level: Skill['level'] }) {
  return (
    <div className="flex shrink-0 items-center gap-2">
      <div className="flex gap-1" role="img" aria-label={`숙련도 ${level}/5 (${LEVEL_LABELS[level]})`}>
        {([1, 2, 3, 4, 5] as const).map((n) =>
          n <= level ? (
            <motion.span
              key={n}
              initial={{ scaleX: 0, opacity: 0 }}
              whileInView={{ scaleX: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.15 + n * 0.06, duration: 0.25 }}
              style={{ originX: 0 }}
              className="h-2 w-4 rounded-sm bg-primary"
            />
          ) : (
            <span key={n} className="h-2 w-4 rounded-sm bg-primary/15" />
          )
        )}
      </div>
      <span className="w-8 text-xs text-muted-foreground">{LEVEL_LABELS[level]}</span>
    </div>
  );
}

export default function AboutPage() {
  const educations = [
    {
      name: '삼성 청년 SW·AI 아카데미(SSAFY) 15기',
      period: '2026.01 ~ 진행 중',
      details: [
        'Java 알고리즘과 Vue.js 기반 웹 풀스택, AI 활용 문제 해결 학습',
        '팀 프로젝트 수행: 스터디 관리 플랫폼 StudyPot(1학기 최우수상), AI 강의 플랫폼 ZANI',
      ],
    },
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
    {
      name: '삼성 청년 SW·AI 아카데미(SSAFY) 1학기 프로젝트 최우수상',
      date: '2026.06',
      note: 'AI 팀장이 운영을 보조하는 스터디 관리 플랫폼 StudyPot',
    },
    {
      name: '시나공 SQLD 우수 베타테스터 선정',
      date: '2026.06',
      note: 'SQLD 교재 문제 검토 및 피드백 제공',
    },
  ];

  const certificates = [
    { name: 'SQLD', date: '2026.06.19' },
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

        {/* 주요 스킬: 숙련도 + 활용 수준 */}
        <div className="mb-6 grid gap-6 md:grid-cols-2">
          {skillGroups.map((group) => (
            <div key={group.title} className="rounded-lg border border-border bg-muted/40 p-6">
              <h4 className="mb-5 text-lg font-semibold text-primary">{group.title}</h4>
              <ul className="space-y-5">
                {group.skills.map((skill) => (
                  <li key={skill.name}>
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <span className="font-medium text-foreground">{skill.name}</span>
                      <SkillGauge level={skill.level} />
                    </div>
                    {skill.usage && (
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                        {skill.usage}
                      </p>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 보조 도구 */}
        <div className="grid gap-6 md:grid-cols-3">
          {toolGroups.map((group) => (
            <div key={group.title} className="rounded-lg border border-border bg-muted/40 p-6">
              <h4 className="mb-4 text-lg font-semibold text-primary">{group.title}</h4>
              <ul className="space-y-2">
                {group.items.map((item) => (
                  <li key={item} className="text-sm text-foreground">
                    • {item}
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
        <h3 className="mb-8 text-2xl font-bold">수상 · 자격증</h3>
        <div className="space-y-3">
          {awards.map((award) => (
            <div
              key={award.name}
              className="flex items-start justify-between gap-4 rounded-lg border border-primary/25 bg-primary/5 px-6 py-4"
            >
              <div>
                <span className="flex items-start gap-2 font-semibold text-foreground">
                  <Trophy className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {award.name}
                </span>
                <p className="mt-1 pl-6 text-sm text-muted-foreground">{award.note}</p>
              </div>
              <span className="shrink-0 text-sm text-muted-foreground">{award.date}</span>
            </div>
          ))}
          {certificates.map((cert) => (
            <div
              key={cert.name}
              className="flex items-start justify-between gap-4 rounded-lg border border-border bg-muted/40 px-6 py-4"
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
        <h3 className="mb-8 text-2xl font-bold">교육</h3>
        <div className="space-y-3">
          {educations.map((edu) => (
            <div
              key={edu.name}
              className="rounded-lg border border-border bg-muted/40 px-6 py-5"
            >
              <div className="flex flex-wrap items-start justify-between gap-2">
                <span className="font-semibold text-foreground">{edu.name}</span>
                <span className="shrink-0 text-sm text-muted-foreground">{edu.period}</span>
              </div>
              <ul className="mt-2 space-y-1">
                {edu.details.map((detail) => (
                  <li key={detail} className="text-sm leading-relaxed text-muted-foreground">
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

