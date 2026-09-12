import { developerProfile } from '@/data/profile';

export default function DeveloperDirection() {
  const directions = [
    { title: '현재 깊이 다루는 기술', description: developerProfile.focus },
    { title: '단기 목표', description: developerProfile.shortTermGoal },
    { title: '중장기 목표', description: developerProfile.longTermGoal },
  ];
  return (
    // 세 항목을 각각 박스로 감싸면 다른 카드들과 구분이 안 돼서, 위쪽 선 하나로만 열을 나눈다
    <dl className="grid gap-8 text-left md:grid-cols-3">
      {directions.map(direction => (
        <div key={direction.title} className="border-t-2 border-primary/30 pt-4">
          <dt className="mb-2 font-semibold text-primary">{direction.title}</dt>
          <dd className="text-base leading-7 text-muted-foreground">{direction.description}</dd>
        </div>
      ))}
    </dl>
  );
}
