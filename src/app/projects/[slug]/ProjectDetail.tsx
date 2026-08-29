'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ChevronDown, Lock, Trophy, Wrench } from 'lucide-react';
import { categoryStyle, type Project } from '@/data/projects';
import { formatTeamSize } from '@/lib/utils';
import type { ResponsibilityToggle } from '@/data/projects';

interface ProjectDetailProps {
  project: Project;
}

const EMPHASIS_KEYWORDS = [
  'Git 컨벤션',
  'DDD 경계',
  'MediaPipe',
  'ONNX',
  '참여도',
  '익명 집계',
  '실시간 팁',
  'LiveKit Egress WebSocket',
  '링버퍼',
  '16kHz',
  'Whisper 전사',
  '무음 패딩',
  '락 점유 시간',
  '토큰 효율',
  '리포트 질의응답 챗봇',
  '전사 시간창',
  '짧게 유효한 URL',
  'OpenAPI 타입 자동 생성',
  'FSD',
  'Feature-Sliced Design',
  'MSW',
  'API 타입',
  '목 핸들러',
  'ESLint/Prettier',
  '쿠키 세션 인증',
  '온보딩',
  'AI 팀장',
  '그룹 생성',
  '초대 코드',
  '운영 로그',
  '학과생 이메일',
  'Google SMTP',
  '스터디룸 예약',
  '열쇠함 접근 정보',
  '관리자 페이지',
  'base64 이미지',
  '인라인 SVG',
  'CSRF',
  'Axios 인터셉터',
  'Spring Security',
  'Swagger UI',
  'DataTable',
  '파일 업로드',
  'URL 등록',
  'TanStack Query',
  'Zustand',
  'Sentry',
  'AI 기반 데이트 코스',
  'Mapbox',
  '지역락',
  '다이어리',
  '라우팅 가드',
  'React + Vite + TypeScript + Tailwind',
  'Node.js',
  'Azure Document Intelligence',
  'Gemini',
  'Redux Toolkit',
  'Axios 인터셉터',
  '401 응답 공통 처리',
  'Resume CRUD API',
];

const escapeRegExp = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

const renderHighlightedText = (
  text: string,
  keywords: string[],
  highlightClassName = 'font-semibold text-foreground'
): ReactNode[] => {
  const uniqueKeywords = [...new Set(keywords.filter(Boolean))].sort(
    (a, b) => b.length - a.length
  );
  const keywordPattern = uniqueKeywords.map(escapeRegExp).join('|');
  const metricPattern = String.raw`\d+(?:\.\d+)?(?:초|ms|KB|MB|%|개|시간|분)|\d{2,4}×\d{2,4}`;
  const pattern = keywordPattern
    ? new RegExp(`(${keywordPattern}|${metricPattern})`, 'g')
    : new RegExp(`(${metricPattern})`, 'g');
  const testPattern = keywordPattern
    ? new RegExp(`^(${keywordPattern}|${metricPattern})$`)
    : new RegExp(`^(${metricPattern})$`);

  return text.split(pattern).map((part, index) =>
    part && testPattern.test(part) ? (
      <strong key={`${part}-${index}`} className={highlightClassName}>
        {part}
      </strong>
    ) : (
      part
    )
  );
};

/** 담당 역할 그룹 토글. 제목만 보이다가 클릭하면 하위 항목이 펼쳐진다 */
function ResponsibilityGroupToggle({
  group,
  keywords,
}: {
  group: ResponsibilityToggle;
  keywords: string[];
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex w-full items-center justify-between gap-2 text-left"
      >
        <h3 className="font-semibold text-lg">{group.title}</h3>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-muted-foreground transition-transform ${
            open ? 'rotate-180' : ''
          }`}
          aria-hidden
        />
      </button>
      {open && (
        <ul className="mt-2 space-y-1.5">
          {group.items.map((item) => (
            <li key={item.title} className="flex gap-3 text-sm leading-relaxed text-muted-foreground">
              <span className="mt-1 text-primary">▸</span>
              <span className="flex-1">
                <span className="font-semibold text-foreground">{item.title}</span>
                {' — '}
                {renderHighlightedText(item.detail, keywords)}
              </span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const category = categoryStyle[project.category];
  const teamSize = formatTeamSize(project.teamSize);
  const activeLinks = project.links.filter((link) => link.href !== '#');
  const emphasisKeywords = [...project.techTags, project.name, ...EMPHASIS_KEYWORDS];

  // 퀵 네비가 상단 nav(64px) 아래에 sticky로 붙는 순간을 감지해 상단 rounded를 없앤다
  const [navStuck, setNavStuck] = useState(false);
  const navSentinelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const sentinel = navSentinelRef.current;
    if (!sentinel) return;
    const observer = new IntersectionObserver(
      ([entry]) => setNavStuck(!entry.isIntersecting),
      { rootMargin: '-65px 0px 0px 0px', threshold: 0 }
    );
    observer.observe(sentinel);
    return () => observer.disconnect();
  }, []);

  // 외부에서 상세 페이지로 바로 진입한 경우 back()이 사이트 밖으로 나가므로 목록으로 보낸다
  const handleBack = () => {
    const cameFromSite =
      document.referrer.startsWith(window.location.origin) && window.history.length > 1;
    if (cameFromSite) {
      router.back();
    } else {
      router.push('/projects');
    }
  };

  return (
    <div className="container mx-auto max-w-4xl px-4 py-16">
      {/* Back Button */}
      <motion.button
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        onClick={handleBack}
        className="mb-8 flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary"
      >
        <span className="text-xl">←</span>
        뒤로 가기
      </motion.button>

      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12"
      >
        <div className="mb-4 flex flex-wrap items-center gap-3">
          <h1 className="text-4xl font-bold md:text-5xl">{project.name}</h1>
          <span
            className={`rounded border px-3 py-1 text-sm font-medium ${category.badge}`}
          >
            {category.label}
          </span>
        </div>

        <div className="mb-4 flex flex-wrap gap-4 text-muted-foreground">
          <span>{project.period}</span>
          <span aria-hidden>•</span>
          <span>{project.role}</span>
          {teamSize && (
            <>
              <span aria-hidden>•</span>
              <span>{teamSize}</span>
            </>
          )}
        </div>

        {project.award && (
          <p className="mb-6 inline-flex items-center gap-2 rounded-lg border border-primary/25 bg-primary/5 px-4 py-2.5 text-sm font-semibold text-primary">
            <Trophy className="h-4 w-4 shrink-0" aria-hidden />
            {project.award}
          </p>
        )}

        <p className="text-xl leading-relaxed text-foreground">
          {project.summary}
        </p>
      </motion.div>

      {/* Quick nav: 채용 담당자가 원하는 섹션으로 바로 이동할 수 있게. 스크롤해도 계속 보이도록 sticky */}
      <div ref={navSentinelRef} />
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.05 }}
        className={`sticky top-16 z-40 mb-12 flex flex-wrap gap-2 rounded-b-lg border border-border bg-background/90 px-4 py-3 backdrop-blur-sm transition-[border-radius] duration-200 ${
          navStuck ? '' : 'rounded-t-lg'
        }`}
      >
        {[
          { id: 'tech-stack', label: '사용 기술' },
          { id: 'highlights', label: '주요 기능' },
          { id: 'responsibilities', label: '담당 역할' },
          ...(project.troubleshooting && project.troubleshooting.length > 0
            ? [{ id: 'troubleshooting', label: '트러블슈팅' }]
            : []),
        ].map((section) => (
          <a
            key={section.id}
            href={`#${section.id}`}
            className="rounded-full border border-border px-3.5 py-1.5 text-sm font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-primary"
          >
            {section.label}
          </a>
        ))}
      </motion.div>

      {/* Links */}
      {activeLinks.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex flex-wrap gap-4"
        >
          {activeLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-lg border border-border bg-background px-6 py-3 font-medium transition-all hover:border-primary/40 hover:bg-primary/5"
            >
              {link.label}
            </a>
          ))}
        </motion.div>
      )}

      {/* 저장소 비공개 안내 */}
      {project.notice && (
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-12 flex items-start gap-2 rounded-lg border border-border bg-muted/40 px-4 py-3 text-sm leading-relaxed text-muted-foreground"
        >
          <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />
          {project.notice}
        </motion.p>
      )}

      {/* Cover Image */}
      {project.image && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-10"
        >
          <div className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted/30">
            <Image
              src={project.image}
              alt={`${project.name} 이미지`}
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 768px"
              priority
            />
          </div>
        </motion.div>
      )}

      {/* Screenshots */}
      {project.images && project.images.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="mb-10 grid gap-4 sm:grid-cols-2"
        >
          {project.images.map((src, index) => (
            <div
              key={src}
              className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted/30"
            >
              <Image
                src={src}
                alt={`${project.name} 스크린샷 ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 100vw, 384px"
              />
            </div>
          ))}
        </motion.div>
      )}

      {/* Tech Stack */}
      <motion.section
        id="tech-stack"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mb-12 scroll-mt-32"
      >
        <h2 className="mb-6 text-2xl font-bold">사용 기술</h2>
        <div className="flex flex-wrap gap-3">
          {project.techTags.map((tech) => (
            <span
              key={tech}
              className="rounded-lg border border-primary/15 bg-primary/10 px-4 py-2 text-sm font-medium text-primary"
            >
              {tech}
            </span>
          ))}
        </div>

        {/* 기술 선택 이유 */}
        {project.techReasons && project.techReasons.length > 0 && (
          <div className="mt-6 space-y-3">
            {project.techReasons.map((item) => (
              <div
                key={item.tech}
                className="rounded-lg border border-border bg-muted/40 px-5 py-4"
              >
                <p className="text-sm leading-relaxed text-muted-foreground">
                  <span className="mr-2 font-semibold text-foreground">{item.tech}</span>
                  {item.reason}
                </p>
              </div>
            ))}
          </div>
        )}
      </motion.section>

      {/* Highlights */}
      <motion.section
        id="highlights"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="mb-12 scroll-mt-32"
      >
        <h2 className="mb-6 text-2xl font-bold">주요 기능</h2>
        <ul className="space-y-4 rounded-lg border border-border bg-muted/40 p-6">
          {project.highlights.map((highlight, index) => (
            <motion.li
              key={highlight}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + index * 0.1 }}
              className="flex gap-3"
            >
              <span className="mt-1 text-primary">▸</span>
              <span className="flex-1 leading-relaxed text-foreground">
                {renderHighlightedText(highlight, emphasisKeywords)}
              </span>
            </motion.li>
          ))}
        </ul>
      </motion.section>

      {/* Responsibilities */}
      <motion.section
        id="responsibilities"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="mb-12 scroll-mt-32"
      >
        <h2 className="mb-6 text-2xl font-bold">담당 역할</h2>
        <ul className="space-y-6 rounded-lg border border-border bg-muted/40 p-6">
          {project.responsibilities.map((responsibility, index) =>
            typeof responsibility === 'string' ? (
              <motion.li
                key={responsibility}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
                className="flex gap-3"
              >
                <span className="mt-1 text-primary">•</span>
                <span className="flex-1 leading-relaxed text-foreground">
                  {renderHighlightedText(responsibility, emphasisKeywords)}
                </span>
              </motion.li>
            ) : (
              <motion.li
                key={responsibility.title}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.4 + index * 0.1 }}
              >
                <ResponsibilityGroupToggle group={responsibility} keywords={emphasisKeywords} />
              </motion.li>
            )
          )}
        </ul>
      </motion.section>

      {/* Troubleshooting */}
      {project.troubleshooting && project.troubleshooting.length > 0 && (
        <motion.section
          id="troubleshooting"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mb-12 scroll-mt-32"
        >
          <h2 className="mb-6 text-2xl font-bold">트러블슈팅</h2>
          <div className="space-y-4">
            {project.troubleshooting.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 + index * 0.08 }}
                className="rounded-lg border border-border bg-muted/40 p-5"
              >
                <h3 className="mb-4 flex items-start gap-2 font-semibold text-lg">
                  <Wrench className="mt-0.5 h-4 w-4 shrink-0 text-primary" aria-hidden />
                  {item.title}
                </h3>
                <dl className="space-y-3">
                  {[
                    { label: '문제 인식', text: item.problem },
                    { label: '해결 방안', text: item.solution },
                    { label: '개선 성과', text: item.result },
                  ].map(({ label, text }) => (
                    <div key={label} className="flex flex-col gap-1 sm:flex-row sm:gap-3">
                      <dt className="shrink-0 sm:w-20">
                        <span className="inline-block rounded bg-primary/10 px-2 py-0.5 text-xs font-semibold text-primary">
                          {label}
                        </span>
                      </dt>
                      <dd className="flex-1 text-sm leading-relaxed text-muted-foreground">
                        {renderHighlightedText(text, emphasisKeywords)}
                      </dd>
                    </div>
                  ))}
                </dl>
              </motion.div>
            ))}
          </div>
        </motion.section>
      )}

      {/* Navigation */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="flex justify-center border-t border-border pt-12"
      >
        <Link
          href="/projects"
          className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-all hover:bg-primary/90"
        >
          모든 프로젝트 보기
        </Link>
      </motion.div>
    </div>
  );
}
