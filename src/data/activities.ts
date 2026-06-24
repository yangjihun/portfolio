export type ActivityCategory = 'education' | 'leadership' | 'program';

export interface Activity {
  id: string;
  period: string;
  title: string;
  description: string;
  category: ActivityCategory;
  tags?: string[];
}

export const activities: Activity[] = [
  {
    id: 'ai-ssafy-15',
    period: '2026.01 ~ 진행 중',
    title: '삼성 청년 SW AI 아카데미 15기',
    description:
      'AI 기반 문제 해결 역량을 강화하며, 서비스 개발 관점에서 모델/데이터/제품을 연결하는 학습을 진행하고 있습니다.',
    category: 'program',
    tags: ['AI', 'Program'],
  },
  {
    id: 'commit-founder-lead',
    period: '2025.09 ~ 2026.02',
    title: '가천대학교 금융수학과 IT 동아리 COMMIT 개설 · 동아리장',
    description:
      '동아리 운영 체계 수립, 스터디/프로젝트 기획, 팀 협업 문화 정착을 주도했습니다.',
    category: 'leadership',
    tags: ['Leadership', 'Community'],
  },
  {
    id: 'kakao-enterprise-academy-7',
    period: '2025.09 ~ 2025.12',
    title: '가천대 카카오 엔터프라이즈 SW 아카데미 7기',
    description:
      '프로젝트 중심 커리큘럼을 통해 협업/개발 프로세스와 실무형 구현 경험을 강화했습니다.',
    category: 'program',
    tags: ['Program', 'Project'],
  },
  {
    id: 'xrpl-korea-ambassador',
    period: '2025.05 ~ 2025.07',
    title: 'XRPL Korea 앰배서더 개발팀',
    description: 'XRPL Korea 앰배서더 개발팀으로 활동하며 XRPL 기반 서비스 개발에 참여했습니다.',
    category: 'program',
    tags: ['Blockchain', 'XRPL'],
  },
  {
    id: 'gairos-blockchain-club',
    period: '2025.03 ~ 2025.08',
    title: '가천대학교 블록체인 학회 Gairos 학회원',
    description: '가천대학교 블록체인 학회 Gairos에서 학회원으로 활동했습니다.',
    category: 'leadership',
    tags: ['Blockchain', 'Community'],
  },
];


