'use client';

import { type ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, ChevronDown, Lock, Trophy, Wrench } from 'lucide-react';
import { categoryStyle, type Project } from '@/data/projects';
import { formatTeamSize } from '@/lib/utils';
import TeacatDiagrams from '@/components/TeacatDiagrams';
import ZaniDiagrams from '@/components/ZaniDiagrams';
import ArchitectureComparison from '@/components/diagrams/ArchitectureComparison';

interface ProjectDetailProps {
  project: Project;
}

/** 접이식 항목의 제목 줄. 담당 역할·기술 선택 이유·문제 해결 사례가 같은 모양으로 열리고 닫힌다 */
const SUMMARY_CLASS =
  'flex cursor-pointer list-none items-center justify-between gap-3 rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary [&::-webkit-details-marker]:hidden';

function Section({ id, title, children }: { id: string; title: string; children: ReactNode }) {
  return (
    <section id={id} aria-labelledby={`${id}-heading`} className="mb-14 scroll-mt-36">
      <h2 id={`${id}-heading`} className="mb-6 text-2xl font-bold">{title}</h2>
      {children}
    </section>
  );
}

function TextList({ items }: { items: string[] }) {
  return (
    <ul className="space-y-3">
      {items.map((item) => (
        <li key={item} className="flex gap-3 text-base leading-7">
          <span className="shrink-0 text-primary" aria-hidden>•</span>
          <span className="min-w-0 flex-1 break-words">{item}</span>
        </li>
      ))}
    </ul>
  );
}

function LabeledText({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="grid gap-1.5 sm:grid-cols-[7rem_minmax(0,1fr)] sm:gap-4">
      <dt className="font-semibold text-foreground">{label}</dt>
      <dd className="min-w-0 break-words text-base leading-7 text-muted-foreground">{children}</dd>
    </div>
  );
}

export default function ProjectDetail({ project }: ProjectDetailProps) {
  const router = useRouter();
  const category = categoryStyle[project.category];
  const teamSize = formatTeamSize(project.teamSize);
  const activeLinks = project.links.filter((link) => link.href !== '#');
  const ProjectDiagrams = project.id === 'teacat' ? TeacatDiagrams : project.id === 'zani' ? ZaniDiagrams : null;
  const hasDiagrams = !!ProjectDiagrams;

  const handleBack = () => {
    const cameFromSite = document.referrer.startsWith(`${window.location.origin}/`) && window.history.length > 1;
    if (cameFromSite) router.back();
    else router.push('/projects');
  };

  const sections = [
    ...(project.keyResults ? [{ id: 'key-results', label: '핵심 성과' }] : []),
    ...(hasDiagrams ? [{ id: 'architecture', label: '아키텍처' }] : []),
    { id: 'overview', label: '프로젝트 개요' },
    { id: 'responsibilities', label: '담당 역할' },
    { id: 'tech-stack', label: '기술·구현' },
    ...(project.troubleshooting?.length ? [{ id: 'troubleshooting', label: '문제 해결' }] : []),
    ...(!project.keyResults ? [{ id: 'outcomes', label: '성과' }] : []),
    { id: 'retrospective', label: '회고' },
  ];

  return (
    <div className={`container mx-auto px-4 py-12 md:py-16 ${hasDiagrams ? 'max-w-5xl' : 'max-w-4xl'}`}>
      <button type="button" onClick={handleBack} className="mb-8 flex items-center gap-2 text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-primary">
        <span className="text-xl" aria-hidden>←</span>뒤로 가기
      </button>

      {/* 커버 이미지를 오른쪽 열로 빼고, 왼쪽에 제목·요약·링크를 나란히 둔다 */}
      <motion.header
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-10 grid gap-8 md:grid-cols-[minmax(0,1fr)_minmax(0,22rem)] md:items-start"
      >
        <div>
          <div className="mb-4 flex flex-wrap items-center gap-3">
            <h1 className="text-4xl font-bold md:text-5xl">{project.name}</h1>
            <span className="text-sm font-medium text-muted-foreground">{category.label}</span>
          </div>
          <p className="mb-4 text-xl font-semibold leading-relaxed">{project.title}</p>
          <div className="mb-5 flex flex-wrap gap-x-4 gap-y-2 text-sm text-muted-foreground">
            <span>{project.period}</span>
            <span>{project.role}</span>
            {teamSize && <span>{teamSize}</span>}
          </div>
          {project.award && (
            <p className="mb-5 inline-flex items-start gap-2 text-sm font-semibold leading-relaxed text-primary">
              <Trophy className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{project.award}
            </p>
          )}
          {project.impact ? (
            <p className="text-base leading-7 text-muted-foreground">{project.impact.headline}</p>
          ) : (
            <p className="text-base leading-8 text-muted-foreground md:text-lg">{project.summary}</p>
          )}

          {activeLinks.length > 0 && (
            <div className="mt-6 flex flex-wrap gap-3">
              {activeLinks.map((link) => (
                <a key={link.label} href={link.href} target="_blank" rel="noopener noreferrer" className="border-b border-primary/30 pb-1 text-sm font-medium text-primary transition-colors hover:border-primary">
                  {link.label}<span className="sr-only"> (새 탭에서 열기)</span>
                </a>
              ))}
            </div>
          )}
          {project.notice && (
            <p className="mt-5 flex items-start gap-2 text-xs leading-6 text-muted-foreground">
              <Lock className="mt-0.5 h-4 w-4 shrink-0" aria-hidden />{project.notice}
            </p>
          )}
        </div>

        {project.image && (
          <div className="relative aspect-[16/9] overflow-hidden rounded-sm bg-muted/30 md:mt-2">
            <Image src={project.image} alt={`${project.name} 서비스 화면`} fill className="object-cover" sizes="(max-width: 768px) 100vw, 352px" priority />
          </div>
        )}

      </motion.header>

      <nav aria-label="프로젝트 상세 목차" className="sticky top-16 z-40 mb-10 flex gap-6 overflow-x-auto border-b border-border bg-background py-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {sections.map((section) => (
          <a key={section.id} href={`#${section.id}`} className="shrink-0 whitespace-nowrap text-sm font-medium text-muted-foreground transition-colors hover:text-primary focus-visible:outline focus-visible:outline-2 focus-visible:outline-primary">
            {section.label}
          </a>
        ))}
      </nav>

      {project.keyResults && (
        <Section id="key-results" title="핵심 성과">
          <dl className="grid grid-cols-3 gap-4 sm:gap-10">
            {project.keyResults.metrics.map((metric) => (
              <div key={metric.label} className="flex min-w-0 flex-col">
                <dt className="order-last mt-3 text-sm font-medium leading-6">
                  {metric.label}
                  <span className="mt-1 block text-xs font-normal leading-5 text-muted-foreground sm:text-sm sm:leading-6">{metric.description}</span>
                </dt>
                <dd className="whitespace-nowrap text-[32px] font-semibold leading-none tracking-tight tabular-nums sm:text-5xl">
                  {metric.value}<span className="ml-1 text-sm font-normal tracking-normal sm:text-2xl">{metric.unit}</span>
                </dd>
              </div>
            ))}
          </dl>
        </Section>
      )}

      {ProjectDiagrams && (
        <Section id="architecture" title="시스템 아키텍처">
          <ProjectDiagrams />
        </Section>
      )}

      {!!project.images?.length && (
        <div className="mb-12 grid gap-4 sm:grid-cols-2">
          {project.images.map((src, index) => (
            <div key={src} className="relative aspect-[16/9] overflow-hidden rounded-xl border border-border bg-muted/30">
              <Image src={src} alt={`${project.name} 스크린샷 ${index + 1}`} fill className="object-cover" sizes="(max-width: 640px) 100vw, 416px" />
            </div>
          ))}
        </div>
      )}

      <Section id="overview" title="프로젝트 개요">
        <div className="space-y-7">
          {[
            { title: '목표', items: project.overview.goal },
            { title: '배경', items: project.overview.background },
            { title: '주요 기능', items: project.highlights },
          ].map((item) => (
            <div key={item.title}>
              <h3 className="mb-3 text-base font-semibold">{item.title}</h3>
              <div className="text-muted-foreground"><TextList items={item.items} /></div>
            </div>
          ))}
        </div>
      </Section>

      <Section id="responsibilities" title="담당 역할">
        <p className="mb-2 font-semibold text-primary">{project.role}</p>
        <p className="mb-5 text-base leading-7 text-muted-foreground">{project.contribution.role}</p>
        <div className="divide-y divide-border border-y border-border">
          {project.responsibilities.map((responsibility) => typeof responsibility === 'string' ? (
            <p key={responsibility} className="py-4 text-base leading-7">{responsibility}</p>
          ) : (
            <details key={responsibility.title} className="group py-4">
              <summary className={`${SUMMARY_CLASS} font-semibold leading-7`}>
                {responsibility.title}<ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <ul className="mt-4 space-y-3 text-base leading-7 text-muted-foreground">
                {responsibility.items.map((item) => (
                  <li key={item.title}><strong className="font-semibold text-foreground">{item.title}</strong><p>{item.detail}</p></li>
                ))}
              </ul>
            </details>
          ))}
        </div>
      </Section>

      <Section id="tech-stack" title="기술 선택과 구현">
        {/* 기술 태그는 카드에서 이미 보여주므로 여기서는 이유·구현이 있는 기술만 나열한다.
            전부 펼치면 목록이 길어져서, 기술명만 보이고 눌러서 연다 */}
        <div className="divide-y divide-border border-y border-border">
          {project.techReasons?.map((item) => (
            <details key={item.tech} className="group py-4">
              <summary className={`${SUMMARY_CLASS} text-lg font-semibold leading-7 text-primary`}>
                {item.tech}<ChevronDown className="h-5 w-5 shrink-0 transition-transform group-open:rotate-180" aria-hidden />
              </summary>
              <dl className="mt-4 space-y-4">
                <LabeledText label="선택 이유">{item.reason}</LabeledText>
                <LabeledText label="구현 내용">{item.implementation}</LabeledText>
              </dl>
            </details>
          ))}
        </div>
      </Section>

      {!!project.troubleshooting?.length && (
        <Section id="troubleshooting" title="문제 해결 사례">
          <div className="divide-y divide-border border-y border-border">
            {project.troubleshooting.map((item, index) => (
              <details key={item.title} className="group">
                <summary className={`${SUMMARY_CLASS} py-5`}>
                  <h3 className="flex min-w-0 flex-col gap-2 text-lg font-semibold leading-7">
                    <span className="text-sm font-semibold text-primary">사례 {index + 1}{item.kind === 'design' ? ' · 설계 과제' : ''}</span>
                    <span className="flex items-start gap-2">
                      <Wrench className="mt-1 h-4 w-4 shrink-0 text-primary" aria-hidden />{item.title}
                    </span>
                  </h3>
                  <ChevronDown className="h-5 w-5 shrink-0 text-primary transition-transform group-open:rotate-180" aria-hidden />
                </summary>
                <div className="space-y-7 pb-6 pt-2">
                  <div>
                    <h4 className="mb-4 font-semibold">1. {item.kind === 'design' ? '문제 분석' : '오류 분석'}</h4>
                    <dl className="space-y-4">
                      <LabeledText label={item.kind === 'design' ? '설계 요구' : '문제 현상'}>{item.problem}</LabeledText>
                      <LabeledText label="원인">{item.cause}</LabeledText>
                      <LabeledText label="추가 확인 사항"><TextList items={item.checks} /></LabeledText>
                      {item.measurementNote && <LabeledText label="측정 기준">{item.measurementNote}</LabeledText>}
                    </dl>
                  </div>
                  <div>
                    <h4 className="mb-4 font-semibold">2. 개선 과정</h4>
                    <ol className="mb-4 flex flex-wrap items-center gap-x-2 gap-y-3" aria-label="개선 단계">
                      {item.steps.map((step, stepIndex) => (
                        <li key={step} className="flex max-w-full items-center gap-2">
                          <span className="text-sm leading-6 text-primary"><span className="mr-1.5 font-semibold">{stepIndex + 1}.</span>{step}</span>
                          {stepIndex < item.steps.length - 1 && <ArrowRight className="h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />}
                        </li>
                      ))}
                    </ol>
                    <p className="text-base leading-8 text-muted-foreground">{item.solution}</p>
                    {item.architectureChange && (
                      <div className="mt-8">
                        <ArchitectureComparison id={`${project.id}-case-${index + 1}-change`} title={item.title} change={item.architectureChange} />
                      </div>
                    )}
                  </div>
                  <div>
                    <h4 className="mb-4 font-semibold">3. {item.kind === 'design' ? '설계 요구와 구현 결과' : 'Before & After 비교'}</h4>
                    <div className="border-y border-border">
                      <table className="w-full table-fixed border-collapse text-left text-sm leading-6 sm:text-base sm:leading-7">
                        <caption className="sr-only">{project.name} · {item.title} 비교</caption>
                        <colgroup><col className="w-1/4" /><col /><col /></colgroup>
                        <thead className="bg-muted/60">
                          <tr>
                            <th scope="col" className="break-keep p-2.5 font-semibold [overflow-wrap:anywhere] sm:p-3">항목</th>
                            <th scope="col" className="break-keep p-2.5 font-semibold [overflow-wrap:anywhere] sm:p-3">{item.kind === 'design' ? '설계 전 요구' : 'Before'}</th>
                            <th scope="col" className="break-keep p-2.5 font-semibold text-primary [overflow-wrap:anywhere] sm:p-3">{item.kind === 'design' ? '구현 결과' : 'After'}</th>
                          </tr>
                        </thead>
                        <tbody>
                          {item.comparison.map((entry) => (
                            <tr key={entry.label} className="border-t border-border align-top">
                              <th scope="row" className="break-keep p-2.5 font-medium [overflow-wrap:anywhere] sm:p-3">{entry.label}</th>
                              <td className="break-keep p-2.5 text-muted-foreground [overflow-wrap:anywhere] sm:p-3">{entry.before}</td>
                              <td className="break-keep bg-primary/5 p-2.5 font-medium text-primary [overflow-wrap:anywhere] sm:p-3">{entry.after}</td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                  <div className="border-t border-border pt-5"><h4 className="mb-2 font-semibold text-primary">해결 결과</h4><p className="text-base leading-8">{item.result}</p></div>
                </div>
              </details>
            ))}
          </div>
        </Section>
      )}

      {!project.keyResults && <Section id="outcomes" title="프로젝트 성과 및 결과">
        <div>
          <TextList items={project.outcomes} />
          {project.award && <p className="mt-5 flex items-start gap-2 border-t border-primary/20 pt-5 font-semibold leading-7 text-primary"><Trophy className="mt-1 h-5 w-5 shrink-0" aria-hidden />{project.award}</p>}
        </div>
      </Section>}

      <Section id="retrospective" title="프로젝트 회고">
        <h3 className="mb-5 text-lg font-semibold">기술적 한계와 개선 방안</h3>
        <div className="divide-y divide-border border-t border-border">
          {project.retrospective.map((item) => (
            <dl key={item.limitation} className="space-y-4 py-6">
              <LabeledText label="한계·아쉬운 점">{item.limitation}</LabeledText>
              <LabeledText label="개선 방향">{item.improvement}</LabeledText>
            </dl>
          ))}
        </div>
        {(project.collaboration.wentWell || project.collaboration.toImprove) && (
          <>
            <h3 className="mb-5 mt-8 text-lg font-semibold">협업 시 좋았던 점, 개선할 점</h3>
            <dl className="space-y-5 border-t border-border py-6">
              <LabeledText label="좋았던 점">
                <span className="block min-h-7 whitespace-pre-line">{project.collaboration.wentWell}</span>
              </LabeledText>
              <LabeledText label="개선할 점">
                <span className="block min-h-7 whitespace-pre-line">{project.collaboration.toImprove}</span>
              </LabeledText>
            </dl>
          </>
        )}
      </Section>

      <div className="flex justify-center border-t border-border pt-10">
        <Link href="/projects" className="inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 font-semibold text-primary-foreground transition-colors hover:bg-primary/90">모든 프로젝트 보기</Link>
      </div>
    </div>
  );
}
