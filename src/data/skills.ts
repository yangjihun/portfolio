/**
 * 소개 페이지 기술 스택 원본.
 * 가이드 기준: 스킬은 나열하지 않고 카테고리화 + 숙련도 시각화 + 활용 수준(무엇을 할 수 있는지)을 함께 적는다.
 * usage는 실제 프로젝트에서 한 일 기준으로만 작성한다.
 */

export interface Skill {
  name: string;
  /** 숙련도 1~5 (1 기초 · 2 초급 · 3 중급 · 4 상급 · 5 전문) */
  level: 1 | 2 | 3 | 4 | 5;
  /** 이 스킬로 실제 무엇을 했는지 — 프로젝트 근거 기반 한 줄 */
  usage?: string;
}

export interface SkillGroup {
  title: string;
  skills: Skill[];
}

export const LEVEL_LABELS: Record<Skill['level'], string> = {
  1: '기초',
  2: '초급',
  3: '중급',
  4: '상급',
  5: '전문',
};

export const skillGroups: SkillGroup[] = [
  {
    title: 'Frontend',
    skills: [
      {
        name: 'React / Next.js',
        level: 4,
        usage:
          'Next.js App Router 기반 서비스 2개(ZANI·Vibot)와 React SPA 3개에서 화면 설계, 공통 UI 컴포넌트, 퍼블리싱까지 프론트 전반을 구현',
      },
      {
        name: 'TypeScript',
        level: 4,
        usage:
          '전 프로젝트에 적용. OpenAPI 스키마 기반 타입 자동 생성으로 백엔드와의 API 계약을 코드로 관리',
      },
      {
        name: 'TanStack Query · Zustand',
        level: 4,
        usage:
          '서버 상태와 UI·권한 상태의 관리 책임을 분리하는 구조를 3개 프로젝트(ZANI·Vibot·Loventure)에서 설계',
      },
      {
        name: 'Vue 3',
        level: 3,
        usage:
          'FSD 아키텍처 기반 스터디 관리 플랫폼(StudyPot)의 FE 리드로 레이어 구조 설계와 핵심 화면 구현',
      },
      {
        name: 'Tailwind CSS',
        level: 4,
        usage: '대부분의 프로젝트에서 반응형 레이아웃과 공통 컴포넌트 스타일 시스템을 구축',
      },
    ],
  },
  {
    title: 'Backend',
    skills: [
      {
        name: 'Java / Spring Boot',
        level: 3,
        usage:
          '실시간 오디오 파이프라인(링버퍼·인코딩·Whisper 전사 연동)과 리포트·챗봇 API를 구현(ZANI)',
      },
      {
        name: 'PHP / Laravel',
        level: 3,
        usage: '학과 스터디룸 예약 시스템(RE:MIT)을 단독 구축해 실제 학과에서 운영·개선 중',
      },
      {
        name: 'Node.js / Express',
        level: 3,
        usage: '이력서 분석 서비스(DreamMap)의 CRUD API와 입력 검증·예외 처리 구현',
      },
      {
        name: 'MySQL',
        level: 3,
        usage: '예약 시스템(RE:MIT)과 강의 플랫폼(ZANI)의 스키마 설계와 운영',
      },
      {
        name: 'Python / FastAPI',
        level: 2,
        usage: '해커톤에서 타임라인 기반 RAG 시청 보조 챗봇 API를 구현',
      },
      { name: 'Redis', level: 2 },
      { name: 'MongoDB', level: 2 },
    ],
  },
];

/** 게이지 없이 나열만 하는 보조 도구 그룹 */
export const toolGroups: { title: string; items: string[] }[] = [
  {
    title: 'Tools',
    items: ['Git / GitHub / GitLab', 'Jira', 'Notion', 'Figma', 'ESLint / Prettier', 'MSW'],
  },
  {
    title: 'Deploy',
    items: ['Docker / Docker Compose', 'Vercel', 'Netlify', 'Render'],
  },
  {
    title: 'AI 에이전트',
    items: ['Claude / Claude Code', 'ChatGPT', 'Gemini', 'Cursor'],
  },
];
