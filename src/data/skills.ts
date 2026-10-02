/** 숙련도는 아래 프로젝트 경험에 따른 자기평가이며, 활용 단계로 표시한다. */
export interface Skill {
  name: string;
  level: 1 | 2 | 3 | 4;
  strength?: boolean;
  usage: string;
  projectIds: string[];
}

export interface SkillGroup {
  id: string;
  title: string;
  description: string;
  primary?: boolean;
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
    id: 'ai-integration', title: 'AI Application', primary: true,
    description: 'LLM·RAG·STT를 실제 서비스의 API와 데이터 파이프라인에 통합',
    skills: [
      { name: 'RAG · 컨텍스트 설계', level: 3, strength: true, usage: 'NetPlus에서 시청 시점을 제한한 자막 검색·근거 검증을 설계했습니다. ZANI에서는 목차·요약과 실제 전사를 연결한 2단계 검색, 관련 구간 선별과 요청 예산 관리로 AI 입력 데이터를 약 92.5~93% 줄였습니다.', projectIds: ['netplus', 'zani'] },
      { name: 'OpenAI API · LangSmith', level: 3, usage: 'NetPlus에서 답변 근거의 자막 ID·회차·시점을 검증하고, 근거가 부족하면 단정적인 답변을 완화했습니다. LangSmith로 검색부터 생성까지 한 trace로 연결해 품질 저하 사례를 추적했습니다.', projectIds: ['netplus'] },
      { name: 'Whisper · STT 파이프라인', level: 3, strength: true, usage: 'ZANI에서 LiveKit 음성을 수집하고 필요한 구간만 16kHz로 다운샘플·MP3 변환해 Whisper에 전달했습니다. 실시간 오디오 처리부터 전사·코칭·리포트까지 연결했습니다.', projectIds: ['zani'] },
    ],
  },
  {
    id: 'backend', title: 'Backend', primary: true,
    description: '인증·API·데이터 처리부터 스트리밍과 동시 요청 제어까지 설계',
    skills: [
      { name: 'Python · FastAPI · SSE', level: 3, strength: true, usage: 'NetPlus의 인증·질문·요약·인제스트 API를 설계했습니다. 질문 분기·검색·검증·응답 생성을 단계별로 연결하고, SSE로 진행 상태와 생성 토큰을 순서대로 스트리밍했습니다.', projectIds: ['netplus'] },
      { name: 'Java · Spring Boot', level: 3, strength: true, usage: 'ZANI의 리포트·챗봇 API와 오디오 링버퍼를 구현하고 변환 작업의 락 점유를 개선했습니다. 티캣에서는 좌석 조회 병목과 가상 대기실·이상거래 심사 API를 다뤘습니다.', projectIds: ['teacat', 'zani'] },
      { name: 'Node.js · Express', level: 3, usage: '티캣의 지갑·서명·트랜잭션 내부 API를 설계하고 인증·입력 검증·OpenAPI 문서를 연결했습니다. COMMIT에서는 프론트엔드와 콘텐츠 API를 함께 구현했습니다.', projectIds: ['teacat', 'commit-club', 'dreammap'] },
      { name: 'PHP · Laravel', level: 4, usage: '학과생 이메일 인증, 스터디룸 예약·관리자 기능을 개발했습니다. 실제 학과 운영에서 사용자 문의와 예약 예외를 반영해 개선했습니다.', projectIds: ['studyroom-reservation'] },
    ],
  },
  {
    id: 'database', title: 'Database',
    description: '벡터 검색·캐싱·대기열을 활용해 조회 비용과 동시성 개선',
    skills: [
      { name: 'Redis · Lua', level: 3, strength: true, usage: 'NetPlus에서 자막 청크 TTL 캐싱·사전 적재·DB 폴백을 구현했습니다. 티캣에서는 Sorted Set 대기열과 Lua로 정원 확인·만료 정리·입장 처리를 원자적으로 수행해 경합을 제어했습니다.', projectIds: ['teacat', 'netplus'] },
      { name: 'PostgreSQL · pgvector · SQLAlchemy', level: 3, strength: true, usage: 'NetPlus의 작품·회차·자막을 관계형 모델로 구성하고, 시청 시점 이전 자막만 pgvector 거리순으로 조회하도록 검색을 개선했습니다. 인용 근거 검증과 벡터 확장이 없는 환경의 대체 조회도 구현했습니다.', projectIds: ['netplus'] },
      { name: 'Caffeine', level: 3, usage: '티캣의 좌석맵에 1초 TTL 캐시를 적용하고 동일 키의 동시 로딩을 합쳐 반복 DB 조회와 커넥션 점유를 줄였습니다. 캐시된 좌석 정보와 응답 시각을 분리했습니다.', projectIds: ['teacat'] },
      { name: 'MySQL', level: 3, usage: '사용자·스터디룸·예약의 관계를 바탕으로 테이블과 저장·조회 로직을 구성하고, 예약 현황과 관리자 통계에 활용했습니다.', projectIds: ['studyroom-reservation'] },
      { name: 'MongoDB', level: 2, usage: '기존 Express 코드베이스에서 이력서 문서의 CRUD API 일부를 구현·수정하고 입력값 검증과 예외 처리를 보완했습니다.', projectIds: ['dreammap'] },
    ],
  },
  {
    id: 'frontend', title: 'Frontend',
    description: '프론트엔드 리드 경험을 바탕으로 사용자 흐름과 API 연동 구현',
    skills: [
      { name: 'React · Next.js', level: 3, strength: true, usage: '강의·리포트·관리자 화면과 공통 UI를 설계했습니다. ZANI에서 썸네일 변환·캐시·지연 로딩으로 LCP를 3.5초에서 1.4초로 개선했고, NetPlus의 시청 화면과 SSE 챗봇 패널을 API에 연결했습니다.', projectIds: ['zani', 'kakao-enterprise-pbl', 'netplus'] },
      { name: 'JavaScript · TypeScript', level: 3, usage: 'ES6+ 모듈과 비동기 요청을 활용해 서비스 화면을 구현합니다. API 요청·응답 타입과 OpenAPI 기반 타입 자동 생성으로 데이터 계약을 관리했습니다.', projectIds: ['zani', 'studypot'] },
      { name: 'Vue 3 · Pinia', level: 3, usage: 'StudyPot의 프론트엔드 리드로 FSD 레이어를 구성하고 그룹·온보딩·커리큘럼·회고 화면을 구현했습니다. MSW로 API 연동 전 개발을 진행했습니다.', projectIds: ['studypot'] },
      { name: 'TanStack Query · Zustand', level: 3, usage: '서버 데이터의 조회·캐싱·동기화와 UI·권한 상태를 분리했습니다. Loventure에서는 사용자 준비 상태를 단계별 라우팅 가드에 연결했습니다.', projectIds: ['kakao-enterprise-pbl', 'loventure'] },
      { name: 'Tailwind CSS', level: 3, usage: '여러 서비스에서 반응형 레이아웃과 공통 컴포넌트 스타일을 구성해 화면 간 스타일 기준을 맞췄습니다.', projectIds: ['loventure', 'commit-club'] },
    ],
  },
  {
    id: 'blockchain', title: 'Blockchain · Web3',
    description: '스마트 컨트랙트부터 지갑·서명·트랜잭션 처리까지 구현',
    skills: [
      { name: 'Solidity · OpenZeppelin · Hardhat', level: 3, usage: '티캣에서 양도 제한 티켓 SBT, 포인트 토큰, 포토카드 NFT와 Commit–Reveal 추첨을 구현했습니다. 권한·발행 한도·멱등성을 설계하고 체인 환경에 맞춰 컴파일·테스트를 구성했습니다.', projectIds: ['teacat'] },
      { name: 'ethers.js · 트랜잭션 처리', level: 3, usage: 'HD 지갑 파생과 서명을 내부 API에 연결했습니다. 전송 큐·논스 관리로 충돌을 제어하고, 재시도 중복 방지와 영수증·이벤트 검증으로 비동기 발행 상태를 동기화했습니다.', projectIds: ['teacat'] },
    ],
  },
  {
    id: 'performance-monitoring', title: 'Performance · Monitoring',
    description: '부하 측정과 지표·로그·오류 추적으로 병목을 찾아 개선',
    skills: [
      { name: 'k6 · nginx', level: 3, usage: '티캣의 좌석 폴링 부하를 재현해 DB·요청 스레드·CPU·프록시 병목을 구분했습니다. 캐시 적용 이후에도 남은 연결 문제를 추적하고 nginx upstream keepalive로 연결을 재사용했습니다.', projectIds: ['teacat'] },
      { name: 'Prometheus · Grafana · Micrometer', level: 3, usage: 'API p95·DB 커넥션 대기·런타임·블록체인 발행 상태를 계측하고 대시보드를 구성했습니다. EC2 자원에 맞춰 Docker Compose로 모니터링을 배포하고 메모리·보관 한도를 설정했습니다.', projectIds: ['teacat'] },
      { name: 'Loki · Alloy · Alertmanager · Sentry', level: 3, usage: '컨테이너 로그 수집·마스킹·보관 정책, 환경별 장애 알림과 중복 알림 억제를 구성했습니다. 프론트엔드·Spring 서버의 예외를 Sentry에 연결해 지표·로그와 함께 확인했습니다.', projectIds: ['teacat'] },
    ],
  },
];

export const toolGroups: { title: string; items: string[] }[] = [
  { title: '협업·품질', items: ['Git / GitHub / GitLab', 'Jira · Notion', 'Figma', 'ESLint / Prettier', 'MSW · Playwright'] },
  { title: '배포·운영', items: ['Docker / Docker Compose', 'EC2 · nginx', 'Vercel · Netlify · Render', 'Microsoft Clarity'] },
  { title: 'AI 개발 보조 도구', items: ['Claude / Claude Code', 'ChatGPT · Gemini', 'Cursor'] },
];
