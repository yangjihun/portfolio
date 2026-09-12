/** 숙련도는 아래 프로젝트 경험에 따른 자기평가이며, 활용 단계로 표시한다. */
export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4;
  usage: string;
  projectIds: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const LEVEL_LABELS: Record<Skill['level'], string> = {
  1: '기초 학습', 2: '기능 구현', 3: '설계·개선', 4: '운영·고도화',
};

export const LEVEL_DESCRIPTIONS: Record<Skill['level'], string> = {
  1: '기본 개념을 학습하고 예제를 구현',
  2: '프로젝트에서 기능을 구현하고 연동',
  3: '구조를 설계하고 원인을 분석해 개선',
  4: '실제 서비스 운영과 사용자 피드백 반영',
};

export const skillGroups: SkillGroup[] = [
  {
    id: 'backend', title: 'Backend',
    description: 'API 설계, 인증·예외 처리와 데이터 처리 흐름 구현',
    skills: [
      { name: 'Java · Spring Boot', level: 3, usage: 'ZANI의 리포트·챗봇 API와 최근 300초 오디오 링버퍼를 구현했습니다. 음소거 시간 보정과 MP3 변환의 락 점유를 개선했습니다.', projectIds: ['zani'] },
      { name: 'Python · FastAPI', level: 3, usage: 'NetPlus의 인증·질문·요약·인제스트 API를 구성하고, 질문 분기·자막 조회·시청 범위 검증·응답 생성을 단계별로 연결했습니다. 답변은 SSE로 진행 상태와 토큰을 순서대로 스트리밍했습니다.', projectIds: ['netplus'] },
      { name: 'PHP · Laravel', level: 4, usage: '학과생 이메일 인증, 스터디룸 예약·관리자 기능을 개발했습니다. 실제 학과 운영에서 사용자 문의와 예약 예외를 반영해 개선했습니다.', projectIds: ['studyroom-reservation'] },
      { name: 'Node.js · Express', level: 2, usage: 'DreamMap의 Resume CRUD API 일부와 입력 검증·예외 처리를 보완하고, COMMIT의 동아리 콘텐츠 API를 구현·연동했습니다.', projectIds: ['dreammap', 'commit-club'] },
    ],
  },
  {
    id: 'database', title: 'Database',
    description: '관계형 데이터 조회, 문서 데이터 처리와 캐싱',
    skills: [
      { name: 'MySQL', level: 3, usage: '사용자·스터디룸·예약의 관계를 바탕으로 테이블과 저장·조회 로직을 구성하고, 예약 현황과 관리자 통계에 활용했습니다.', projectIds: ['studyroom-reservation'] },
      { name: 'Redis', level: 3, usage: 'NetPlus의 에피소드별 자막 청크에 TTL 캐시와 사전 적재를 적용하고, 자막을 새로 등록하면 캐시를 비운 뒤 다시 적재했습니다. 캐시가 없으면 DB를 조회하고, 시청 시점 조건을 다시 확인했습니다.', projectIds: ['netplus'] },
      { name: 'PostgreSQL · pgvector · SQLAlchemy', level: 2, usage: '작품·에피소드·자막을 관계형 모델로 관리하고 회차 ID와 시청 시각을 조건으로 조회했습니다. pgvector 확장으로 자막 청크 유사도 정렬을 같은 DB 쿼리에서 처리하고, 인용 자막을 실제 DB 기록과 대조했습니다.', projectIds: ['netplus'] },
      { name: 'MongoDB', level: 2, usage: '기존 Express 코드베이스에서 이력서 문서의 CRUD API 일부를 구현·수정하고 입력값 검증과 예외 처리를 보완했습니다.', projectIds: ['dreammap'] },
    ],
  },
  {
    id: 'frontend', title: 'Frontend',
    description: '사용자 흐름, 타입·상태 관리와 화면 성능 개선',
    skills: [
      { name: 'JavaScript · TypeScript', level: 3, usage: 'ES6+ 모듈과 비동기 요청을 활용해 서비스 화면을 구현합니다. API 요청·응답 타입과 OpenAPI 기반 타입 자동 생성으로 데이터 계약을 관리했습니다.', projectIds: ['zani', 'studypot'] },
      { name: 'React · Next.js', level: 3, usage: '강의·리포트·관리자 화면과 공통 UI를 설계했습니다. ZANI에서 썸네일 변환·캐시·지연 로딩을 적용해 LCP를 3.5초에서 1.4초로 개선했습니다. NetPlus에서는 시청 화면과 SSE 응답을 순서대로 그리는 챗봇 패널, API 연동 계층을 구현했습니다.', projectIds: ['zani', 'kakao-enterprise-pbl', 'netplus'] },
      { name: 'Vue 3 · Pinia', level: 3, usage: 'StudyPot의 프론트엔드 리드로 FSD 레이어를 구성하고 그룹·온보딩·커리큘럼·회고 화면을 구현했습니다. MSW로 API 연동 전 개발을 진행했습니다.', projectIds: ['studypot'] },
      { name: 'TanStack Query · Zustand', level: 3, usage: '서버 데이터의 조회·캐싱·동기화와 UI·권한 상태를 분리했습니다. Loventure에서는 사용자 준비 상태를 단계별 라우팅 가드에 연결했습니다.', projectIds: ['kakao-enterprise-pbl', 'loventure'] },
      { name: 'Tailwind CSS', level: 3, usage: '여러 서비스에서 반응형 레이아웃과 공통 컴포넌트 스타일을 구성해 화면 간 스타일 기준을 맞췄습니다.', projectIds: ['loventure', 'commit-club'] },
    ],
  },
  {
    id: 'ai-integration', title: 'AI 연동',
    description: '모델 API와 서비스 데이터를 연결하고 근거·입력 범위 통제',
    skills: [
      { name: 'RAG · 컨텍스트 설계', level: 3, usage: 'ZANI에서 목차·요약과 실제 전사의 2단계 검색을 구현했습니다. 관련 구간 선별과 요청 예산 관리로 AI 입력 데이터를 약 92.5~93% 줄였습니다.', projectIds: ['zani'] },
      { name: 'OpenAI API · 응답 검증', level: 3, usage: 'NetPlus에서 작품 질문에 RAG를 연결하고, 실제 자막 ID·회차·시청 시점을 다시 검증했습니다. 근거가 부족하면 단정적인 답변을 완화하도록 처리하고, LangSmith로 검색 결과와 생성 응답을 한 trace로 묶어 품질 저하 사례를 추적했습니다.', projectIds: ['netplus'] },
      { name: 'Whisper · STT 파이프라인', level: 3, usage: 'LiveKit 음성을 수집해 필요한 구간만 16kHz로 다운샘플·MP3 변환한 뒤 Whisper에 전달했습니다. 전사 결과를 코칭과 리포트에 연결했습니다.', projectIds: ['zani'] },
    ],
  },
];

export const toolGroups: { title: string; items: string[] }[] = [
  { title: '협업·품질', items: ['Git / GitHub / GitLab', 'Jira · Notion', 'Figma', 'ESLint / Prettier', 'MSW · Playwright'] },
  { title: '배포·운영', items: ['Docker / Docker Compose', 'Vercel · Netlify · Render', 'Sentry', 'Microsoft Clarity'] },
  { title: 'AI 개발 보조 도구', items: ['Claude / Claude Code', 'ChatGPT · Gemini', 'Cursor'] },
];
