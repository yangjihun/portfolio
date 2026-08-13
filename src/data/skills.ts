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
          'Next.js App Router 기반 서비스 2개와 React SPA 3개에서 주요 화면, 공통 UI 컴포넌트, 반응형 레이아웃 개발',
      },
      {
        name: 'TypeScript',
        level: 4,
        usage:
          '대부분의 프로젝트에 적용. OpenAPI 스키마 기반 API 타입 자동 생성으로 요청 및 응답 타입 관리',
      },
      {
        name: 'TanStack Query · Zustand',
        level: 4,
        usage:
          'TanStack Query를 활용한 API 데이터 및 캐시 관리, Zustand를 활용한 로그인, 권한, UI 상태 관리',
      },
      {
        name: 'Vue 3',
        level: 3,
        usage:
          'FSD 구조를 적용한 스터디 관리 플랫폼의 프론트엔드 개발을 맡아 레이어 구조 구성 및 주요 화면 개발',
      },
      {
        name: 'Tailwind CSS',
        level: 4,
        usage: '다수 프로젝트에서 반응형 레이아웃 구현 및 반복 UI의 공통 스타일 구성',
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
          '실시간 강의 서비스의 최근 5분 음성 링버퍼, MP3 변환, Whisper 전사 연동 및 리포트, 챗봇 API 개발',
      },
      {
        name: 'PHP / Laravel',
        level: 3,
        usage: '학과 스터디룸 예약 서비스의 회원가입, 인증, 예약, 관리자 기능 개발 및 실제 학과 서비스 운영',
      },
      {
        name: 'Node.js / Express',
        level: 3,
        usage: '이력서 분석 서비스의 CRUD API, 입력값 검증 및 예외 처리 개발과 동아리 홈페이지의 회원 인증, 사용자 및 관리자 기능 개발',
      },
      {
        name: 'MySQL',
        level: 3,
        usage: '스터디룸 예약 서비스와 실시간 강의 서비스의 DB 테이블 설계, 조회 및 데이터 저장 로직 구현',
      },
      {
        name: 'Python / FastAPI',
        level: 2,
        usage: '해커톤에서 영상의 특정 시점과 관련된 내용을 찾아 답변하는 타임라인 기반 RAG 챗봇 API 개발',
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
