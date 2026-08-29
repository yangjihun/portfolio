export type TimelineCategory = 'education' | 'leadership' | 'program' | 'contest';

export interface TimelineLink {
  label: string;
  href: string;
}

export interface TimelineItem {
  id: string;
  period: string;
  year: number;
  title: string;
  description: string;
  category: TimelineCategory;
  tags?: string[];

  /* --- 아래는 전부 선택 항목. 채워 넣은 것만 활동 타임라인 카드에 나온다 --- */

  /** 주최·소속 기관. e.g. "SSAFY x 카카오테크 부트캠프" */
  host?: string;
  /** 활동에서 맡은 역할. e.g. "스크럼 마스터", "동아리장", "프론트엔드" */
  role?: string;
  /** 참여 인원(본인 포함). 0이거나 비워 두면 표시하지 않는다 */
  teamSize?: number;
  /** 수상·선정 내역. 트로피 배지로 강조된다 */
  award?: string;
  /** 구체적으로 무엇을 했는지. 한 칸 띄워 이어 붙여 description 아래 본문 문단으로 나온다 */
  details?: string[];
  /** 관련 링크(레포, 발표자료, 후기 등) */
  links?: TimelineLink[];
}

/* 항목을 상세하게 적을 때 참고할 형태:
 *
 * {
 *   id: 'example-activity',
 *   period: '2026.05 ~ 2026.06',
 *   year: 2026,
 *   title: '활동 이름',
 *   description: '한두 문장 요약.',
 *   category: 'contest',
 *   tags: ['기획'],
 *   host: '주최 기관',
 *   role: '스크럼 마스터',
 *   teamSize: 6,
 *   award: '대상',
 *   details: [
 *     '무엇을 맡아 어떻게 했는지 한 줄.',
 *     '결과가 있으면 수치와 함께 한 줄.',
 *   ],
 *   links: [{ label: 'GitHub', href: 'https://...' }],
 * }
 */

export const timelineItems: TimelineItem[] = [
  // 2026
  {
    id: 'sinagong-sqld-beta',
    period: '2026.06',
    year: 2026,
    title: '시나공 SQLD 우수 베타테스터 선정',
    description: '시나공 SQLD 교재 베타테스터로 참여해 문제를 검토했습니다.',
    category: 'program',
    tags: ['SQLD', 'Beta'],
    details: [
      '서브쿼리·그룹 함수·윈도우 함수 파트를 맡았고, 검토 결과 피드백 12건을 정리해 전달했습니다.',
    ],
  },
  {
    id: 'ssafy-kakaotech-contest',
    period: '2026.05 ~ 2026.06',
    year: 2026,
    title: 'SSAFY x 카카오테크 부트캠프 해커톤',
    description: '건축 인허가를 검토하는 공무원의 업무를 보조하는 AI 웹 서비스를 기획했습니다.',
    category: 'contest',
    tags: ['기획'],
    role: '스크럼 마스터',
    teamSize: 7,
    details: [
      '스크럼 마스터를 맡아 주 단위 계획을 세우고 스크럼을 진행했습니다.',
    ],
  },
  {
    id: 'ssafy-woori-ideathon',
    period: '2026.05 ~ 2026.06',
    year: 2026,
    title: 'SSAFY x 우리은행 아이디어톤',
    description: 'ARS에 AI를 도입해 상담원 연결 전에 고객의 민원을 듣고 정리해 전달하는 서비스를 기획했습니다.',
    category: 'contest',
    tags: ['기획'],
    teamSize: 3,
  },
  {
    id: 'jocoding-openai-primer-contest',
    period: '2026.02',
    year: 2026,
    title: '조코딩 × OpenAI × Primer AI 해커톤',
    description: 'OTT 시청 중 놓친 맥락을 설명하고 요약해 주는 타임라인 기반 시청 보조 챗봇을 개발했습니다.',
    category: 'contest',
    tags: ['AI', 'Backend'],
    teamSize: 2,
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
    details: [
      'Samsung SW 역량 테스트 A형 취득하고 프로젝트 최우수상 2회 수상했습니다.',
    ],
  },

  // 2025
  {
    id: 'commit-founder-lead',
    period: '2025.09 ~ 2026.02',
    year: 2025,
    title: '가천대학교 금융수학과 IT 동아리 COMMIT 개설 · 동아리장',
    description:
      '금융수학과에 IT 동아리를 만들고 동아리장으로 운영을 맡았습니다.',
    category: 'leadership',
    tags: ['Leadership', 'Community'],
    details: [
      '동아리 운영 체계를 세우고 동아리 활동을 기획하여 한 학기 동안 동아리원을 약 2배 늘렸습니다.',
    ],
  },
  {
    id: 'kakao-enterprise-academy-7',
    period: '2025.09 ~ 2025.12',
    year: 2025,
    title: '가천대 카카오 엔터프라이즈 SW 아카데미 7기',
    description:
      '현장 미러형과 기업 실무형, 두 차례의 프로젝트를 진행했습니다.',
    category: 'program',
    tags: ['Program', 'Project'],
    details: [
      'AI 기반 커플 맞춤 데이트 코스 추천 서비스와 RAG 챗봇 운영 관리자 페이지를 개발했습니다.',
    ],
  },
  {
    id: 'zetachain-korea-contest',
    period: '2025.08',
    year: 2025,
    title: 'ZetaChain Korea 개발 해커톤',
    description: '멀티 체인 환경에서 자산별 리스크를 관리하는 시스템을 개발했습니다.',
    category: 'contest',
    tags: ['Blockchain', 'Frontend'],
    teamSize: 4,
  },
  {
    id: 'xrpl-korea-ambassador',
    period: '2025.05 ~ 2025.07',
    year: 2025,
    title: 'XRPL Korea 앰배서더 개발팀',
    description:
      'XRPL 기반 서비스의 UAW를 보여주는 Web2.5 대시보드를 개발했습니다.',
    category: 'program',
    tags: ['Blockchain', 'XRPL', 'Frontend'],
    teamSize: 4,
  },
  {
    id: 'gairos-blockchain-club',
    period: '2025.03 ~ 2025.08',
    year: 2025,
    title: '가천대학교 블록체인 학회 Gairos 학회원',
    description: '가천대학교 블록체인 학회 Gairos에서 학회원으로 활동하며 블록체인의 구조와 동작 원리를 학습했습니다.',
    category: 'leadership',
    tags: ['Blockchain', 'Community'],
    details: [
      '로닌 브릿지 해킹 사건을 리서치해 학회에서 구두로 발표했습니다.',
    ],
  },
  {
    id: 'elixir-bigdata-contest',
    period: '2025.01 ~ 2025.02',
    year: 2025,
    title: '(주) 일릭서 빅데이터 분석 자동화 서비스 개발 해커톤',
    description: 'AI가 회의 내용을 요약해 정리하고 회의 일정을 자동으로 관리하는 서비스를 개발했습니다.',
    category: 'contest',
    tags: ['Frontend'],
    teamSize: 4,
  },

  // 2024
  {
    id: 'gachon-p-project',
    period: '2024.11 ~ 2024.12',
    year: 2024,
    title: '가천대학교 P실무 프로젝트',
    description: '트렌드를 분석해 관련 직업과 필요 역량을 추천하는 Streamlit 서비스를 개발했습니다.',
    category: 'program',
    tags: ['AI'],
    teamSize: 5,
  },
  {
    id: 'tourism-data-contest',
    period: '2024.04 ~ 2024.11',
    year: 2024,
    title: '2024 관광데이터 활용 공모전',
    description: '관광 데이터를 활용해 여행 일정을 만들고 공유하는 서비스를 개발했습니다.',
    category: 'contest',
    tags: ['Frontend'],
    teamSize: 4,
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
    details: [
      'JavaScript 기본 문법과 DOM 조작, 비동기 처리를 익혔습니다.',
    ],
  },

  // 2020
  {
    id: 'gachon-finmath-student-council',
    period: '2020.03 ~ 2021.12',
    year: 2020,
    title: '가천대학교 금융수학과 과대표 · 학생회 활동',
    description: '금융수학과 과대표와 학생회로 활동하며 학과 행사와 학생 복지를 맡았습니다.',
    category: 'leadership',
    tags: ['Community'],
    details: [
      '코로나로 대면 행사가 어려운 기간에 비대면 행사를 기획해 학과생들의 참여를 이끌어냈습니다.',
    ],
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
