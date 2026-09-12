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
      <p className="mb-4 text-base leading-7 text-muted-foreground">프로젝트 경험을 기준으로 정리한 숙련도와 활용 수준입니다.</p>
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
          <section key={group.id} id={`skills-${group.id}`} aria-labelledby={`skills-${group.id}-heading`} className="scroll-mt-24 border-t-2 border-primary/30 pt-5">
            <h3 id={`skills-${group.id}-heading`} className="mb-2 text-xl font-semibold text-primary">{group.title}</h3>
            <p className="mb-5 text-base leading-7 text-muted-foreground">{group.description}</p>
            <ul className="divide-y divide-border">
              {(compact ? group.skills.slice(0, 2) : group.skills).map(skill => (
                <li key={skill.name} className="py-5 first:pt-0 last:pb-0">
                  <h4 className="mb-2 font-semibold leading-7">{skill.name}</h4>
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
