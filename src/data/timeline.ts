export type TimelineCategory = 'education' | 'leadership' | 'program' | 'contest';

export interface TimelineItem {
  id: string;
  period: string;
  year: number;
  title: string;
  description: string;
  category: TimelineCategory;
  tags?: string[];
}

export const timelineItems: TimelineItem[] = [
  // 2026
  {
    id: 'sinagong-sqld-beta',
    period: '2026.06',
    year: 2026,
    title: '시나공 SQLD 우수 베타테스터 선정',
    description: '시나공 SQLD 교재 베타테스터로 활동하며 문제 검토 및 피드백을 제공했고, 우수 베타테스터로 선정되었습니다.',
    category: 'program',
    tags: ['SQLD', 'Beta'],
  },
  {
    id: 'ssafy-kakaotech-contest',
    period: '2026.05 ~ 2026.06',
    year: 2026,
    title: 'SSAFY x 카카오테크 부트캠프 해커톤',
    description: 'SSAFY와 카카오테크 부트캠프가 공동으로 진행한 해커톤에 참가했습니다.',
    category: 'contest',
    tags: ['스크럼 마스터', '기획'],
  },
  {
    id: 'ssafy-woori-ideathon',
    period: '2026.05 ~ 2026.06',
    year: 2026,
    title: 'SSAFY x 우리은행 아이디어톤',
    description: 'SSAFY와 우리은행이 공동으로 진행한 아이디어톤에 참가했습니다.',
    category: 'contest',
    tags: ['기획'],
  },
  {
    id: 'jocoding-openai-primer-contest',
    period: '2026.02',
    year: 2026,
    title: '조코딩 × OpenAI × Primer AI 해커톤',
    description: '조코딩, OpenAI, Primer AI가 공동으로 진행한 해커톤에 참가했습니다.',
    category: 'contest',
    tags: ['AI', 'Backend'],
  },
  {
    id: 'ai-ssafy-15',
    period: '2026.01 ~ 진행 중',
    year: 2026,
    title: '삼성 청년 SW·AI 아카데미 15기',
    description:
      'Java와 Vue.js, AI 기반 문제 해결 역량을 강화하며 학습을 진행하고 있습니다.',
    category: 'program',
    tags: ['Program'],
  },

  // 2025
  {
    id: 'commit-founder-lead',
    period: '2025.09 ~ 2026.02',
    year: 2025,
    title: '가천대학교 금융수학과 IT 동아리 COMMIT 개설 · 동아리장',
    description:
      '동아리 운영 체계 수립, 스터디/프로젝트 기획, 팀 협업 문화 정착을 주도했습니다.',
    category: 'leadership',
    tags: ['Leadership', 'Community'],
  },
  {
    id: 'kakao-enterprise-academy-7',
    period: '2025.09 ~ 2025.12',
    year: 2025,
    title: '가천대 카카오 엔터프라이즈 SW 아카데미 7기',
    description:
      '프로젝트 중심 커리큘럼을 통해 협업/개발 프로세스와 실무형 구현 경험을 강화했습니다.',
    category: 'program',
    tags: ['Program', 'Project'],
  },
  {
    id: 'zetachain-korea-contest',
    period: '2025.08',
    year: 2025,
    title: 'ZetaChain Korea 개발 해커톤',
    description: 'ZetaChain Korea 주관 블록체인 개발 해커톤에 참가했습니다.',
    category: 'contest',
    tags: ['Blockchain', 'Frontend'],
  },
  {
    id: 'xrpl-korea-ambassador',
    period: '2025.05 ~ 2025.07',
    year: 2025,
    title: 'XRPL Korea 앰배서더 개발팀',
    description:
      'XRPL Korea 앰배서더 개발팀으로 활동하며 XRPL 기반 서비스 개발에 참여했습니다.',
    category: 'program',
    tags: ['Blockchain', 'XRPL', 'Frontend'],
  },
  {
    id: 'gairos-blockchain-club',
    period: '2025.03 ~ 2025.08',
    year: 2025,
    title: '가천대학교 블록체인 학회 Gairos 학회원',
    description: '가천대학교 블록체인 학회 Gairos에서 학회원으로 활동했습니다.',
    category: 'leadership',
    tags: ['Blockchain', 'Community'],
  },
  {
    id: 'elixir-bigdata-contest',
    period: '2025.01 ~ 2025.02',
    year: 2025,
    title: '(주) 일릭서 빅데이터 분석 자동화 서비스 개발 해커톤',
    description: '(주) 일릭서 주관 빅데이터 분석 자동화 서비스 개발 해커톤에 참가했습니다.',
    category: 'contest',
    tags: ['Frontend'],
  },

  // 2024
  {
    id: 'gachon-p-project',
    period: '2024.11 ~ 2024.12',
    year: 2024,
    title: '가천대학교 P실무 프로젝트',
    description: '가천대학교 P실무 프로젝트에 참가했습니다.',
    category: 'program',
    tags: ['AI'],
  },
  {
    id: 'tourism-data-contest',
    period: '2024.04 ~ 2024.11',
    year: 2024,
    title: '2024 관광데이터 활용 공모전',
    description: '관광 데이터를 활용한 공모전에 참가했습니다.',
    category: 'contest',
    tags: ['Frontend'],
  },

  // 2023
  {
    id: 'military-ai-sw-js-course',
    period: '2023.03 ~ 2023.06',
    year: 2023,
    title: '군장병 AI·SW 역량강화 SW개발(JS) 중급과정 수료',
    description: '군 복무 중 AI·SW 역량강화 교육으로 SW개발(JS) 중급과정을 수료했습니다.',
    category: 'program',
    tags: ['JavaScript', 'Program'],
  },

  // 2020
  {
    id: 'gachon-finmath-student-council',
    period: '2020.03 ~ 2021.12',
    year: 2020,
    title: '가천대학교 금융수학과 학생회 활동',
    description: '가천대학교 금융수학과 학생회에서 활동했습니다.',
    category: 'leadership',
    tags: ['Community'],
  },
  {
    id: 'gachon-univ',
    period: '2020.03 ~ 2026.02',
    year: 2020,
    title: '가천대학교 금융수학과 전공 · 소프트웨어학과 복수전공',
    description: '금융 도메인 기반의 수학적 사고와 소프트웨어 개발 역량을 함께 쌓았습니다.',
    category: 'education',
    tags: ['Major', 'Double Major'],
  },
];

/** 딥 틸 테마 기준: 프로그램은 테마색(teal), 공모전은 보색 포인트(amber), 리더십은 인접색(sky) */
export const categoryStyle: Record<TimelineCategory, { label: string; badge: string; bar: string }> = {
  contest: { label: '공모전', badge: 'bg-amber-100 text-amber-800', bar: 'bg-amber-400' },
  program:   { label: '프로그램', badge: 'bg-teal-100 text-teal-800',   bar: 'bg-teal-400'   },
  leadership:{ label: '리더십',  badge: 'bg-sky-100 text-sky-800', bar: 'bg-sky-400'  },
  education: { label: '학력',    badge: 'bg-slate-100 text-slate-600', bar: 'bg-slate-400'  },
};
