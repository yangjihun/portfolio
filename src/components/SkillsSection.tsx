import Link from 'next/link';
import { projects } from '@/data/projects';
import { LEVEL_DESCRIPTIONS, LEVEL_LABELS, skillGroups, type Skill } from '@/data/skills';

function SkillGauge({ skill }: { skill: Skill }) {
  return (
    <div className="flex flex-wrap items-center gap-2">
      <div className="flex gap-1" role="img" aria-label={`${skill.name} 활용 수준 ${skill.level}/4: ${LEVEL_LABELS[skill.level]}`}>
        {[1, 2, 3, 4].map(step => <span key={step} aria-hidden className={`h-2 w-5 rounded-sm ${step <= skill.level ? 'bg-primary' : 'bg-primary/15'}`} />)}
      </div>
      <span className="text-sm text-muted-foreground">{LEVEL_LABELS[skill.level]}</span>
    </div>
  );
}

export default function SkillsSection({ compact = false }: { compact?: boolean }) {
  return (
    <div>
      <p className="mb-3 text-base leading-7 text-muted-foreground">AI·백엔드를 주력으로, 데이터 처리와 프론트엔드까지 연결합니다. 블록체인과 성능·모니터링 경험도 함께 쌓고 있습니다.</p>
      <p className="mb-6 text-sm leading-6 text-muted-foreground"><span className="font-semibold text-primary">강점 기술</span>은 직접 설계하고 문제를 개선한 경험을 바탕으로 자신 있게 활용하는 기술입니다. 활용 수준은 아래 프로젝트 경험에 따른 자기평가입니다.</p>
      {compact ? (
        <p className="mb-6 text-sm leading-6 text-muted-foreground">기초 학습 → 기능 구현 → 설계·개선 → 운영·고도화</p>
      ) : (
        <ol className="mb-8 grid gap-x-6 gap-y-4 sm:grid-cols-2 lg:grid-cols-4">
          {([1, 2, 3, 4] as const).map(level => (
            <li key={level} className="border-l-2 border-primary/30 pl-3">
              <p className="mb-1 text-sm font-semibold text-primary">{level}. {LEVEL_LABELS[level]}</p>
              <p className="text-sm leading-6 text-muted-foreground">{LEVEL_DESCRIPTIONS[level]}</p>
            </li>
          ))}
        </ol>
      )}
      <div className="grid items-start gap-6 md:grid-cols-2">
        {skillGroups.map(group => (
          <section key={group.id} id={`skills-${group.id}`} aria-labelledby={`skills-${group.id}-heading`} className={`scroll-mt-24 border-t-2 pt-5 ${group.primary ? 'border-primary' : 'border-primary/30'}`}>
            <div className="mb-2 flex flex-wrap items-center gap-2">
              <h3 id={`skills-${group.id}-heading`} className="text-xl font-semibold text-primary">{group.title}</h3>
              {group.primary && <span className="rounded-full bg-primary px-2.5 py-1 text-xs font-semibold text-primary-foreground">주력 분야</span>}
            </div>
            <p className="mb-5 text-base leading-7 text-muted-foreground">{group.description}</p>
            <ul className="divide-y divide-border">
              {(compact ? group.skills.slice(0, 2) : group.skills).map(skill => (
                <li key={skill.name} className="py-5 first:pt-0 last:pb-0">
                  <div className="mb-2 flex flex-wrap items-center gap-x-2 gap-y-1">
                    <h4 className="font-semibold leading-7">{skill.name}</h4>
                    {skill.strength && <span className="rounded-full border border-primary/20 bg-primary/5 px-2 py-0.5 text-xs font-semibold text-primary">강점 기술</span>}
                  </div>
                  <SkillGauge skill={skill} />
                  <p className="mt-3 text-base leading-7 text-muted-foreground">{skill.usage}</p>
                  <div className="mt-3 flex flex-wrap gap-2" aria-label={`${skill.name} 활용 프로젝트`}>
                    {skill.projectIds.map(id => {
                      const project = projects.find(item => item.id === id);
                      if (!project) return null;
                      return <Link key={id} href={`/projects/${id}#tech-stack`} className="rounded-full border border-primary/20 bg-primary/5 px-3 py-1 text-sm font-medium text-primary transition-colors hover:bg-primary/10">{project.name}<span aria-hidden className="ml-1">↗</span><span className="sr-only"> 기술 활용 사례</span></Link>;
                    })}
                  </div>
                </li>
              ))}
            </ul>
            {compact && <Link href={`/about#skills-${group.id}`} className="mt-6 inline-flex text-sm font-semibold text-primary underline underline-offset-4">{group.title} 전체 활용 경험 보기</Link>}
          </section>
        ))}
      </div>
    </div>
  );
}
