export type TechCategory = 'frontend' | 'backend' | 'fullstack' | 'infra' | 'ai' | 'other';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface Project {
  id: string;            // slug / route key
  name: string;
  title: string;
  period: string;        // e.g. "2025.07 ~ 2025.08"
  role: string;          // e.g. "Frontend Developer", "Fullstack Developer"
  summary: string;       // 1~2 sentence summary in Korean
  techTags: string[];    // short tech stack tags
  category: TechCategory; // main category
  highlights: string[];  // what this project does / 특징
  responsibilities: string[]; // what I specifically did
  links: ProjectLink[];  // GitHub, Demo, etc. can be "#" placeholder if unknown
}

export const projects: Project[] = [
  {
    id: 'studyroom-reservation',
    name: 'RE:MIT',
    title: '금융수학과 스터디룸 예약 시스템',
    period: '2025.10 ~ 2025.12',
    role: 'Fullstack Developer (QA)',
    category: 'fullstack',
    summary:
      '내부망 환경에서 학과생 전용 스터디룸 예약과 열쇠함 접근을 관리하기 위해 구현한 웹 기반 예약 시스템입니다.',
    techTags: [
      'PHP',
      'Laravel',
      'MySQL',
      'Google SMTP'
    ],
    highlights: [
      '학과생 이메일 기반 회원가입 및 로그인 기능을 제공했습니다.',
      '스터디룸 예약 생성 및 조회 기능을 구현했습니다.',
      '예약자에게 열쇠함 접근 정보를 제공하는 흐름을 구성했습니다.',
      'GC Free WiFi 내부망 환경에서만 접속 가능하도록 접근을 제한했습니다.'
    ],
    responsibilities: [
      '팀 프로젝트에서 QA 및 예외 처리 전반을 담당했습니다.',
      '예약 중복, 인증되지 않은 접근, 비정상 요청에 대한 처리 로직을 점검하고 보완했습니다.',
      '운영 환경을 가정한 테스트 시나리오를 기반으로 서비스 안정화 작업을 수행했습니다.'
    ],
    links: [
      { label: 'Service', href: '#' }
    ]
  },
  {
    id: 'timetable-recommender',
    name: 'G-Pyeong',
    title: 'AI 기반 시간표 추천 서비스',
    period: '2025.12 ~ 2026.01',
    role: 'Frontend Developer',
    category: 'frontend',
    summary:
      '사용자 선호 조건을 기준으로 룰 기반 추천 로직을 적용해 시간표 후보를 점수화하고 추천하는 토이 프로젝트입니다.',
    techTags: [
      'React',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Axios'
    ],
    highlights: [
      '공강, 연강, 특정 요일 선호 등 사용자 조건을 입력받았습니다.',
      '조건별 가중치를 적용해 시간표 후보를 점수화했습니다.',
      '점수가 높은 시간표 순으로 추천 결과를 제공했습니다.'
    ],
    responsibilities: [
      '프론트엔드 전반을 구현했습니다.',
      '사용자 입력부터 추천 결과 출력까지의 화면 흐름을 구성했습니다.',
      '추천 결과를 직관적으로 확인할 수 있도록 UI를 설계했습니다.'
    ],
    links: [
      { label: 'Demo', href: '#' }
    ]
  },
  {
    id: 'vitamin-7-admin',
    name: 'Vitamin-7',
    title: 'AI Chatbot 운영 관리자 페이지',
    period: '2025.10 ~ 2025.12',
    role: 'Frontend Developer',
    category: 'frontend',
    summary:
      '관리자가 문서 및 URL 데이터를 업로드·분류하고, 수집·학습 상태를 모니터링하며 챗봇 응답을 검증할 수 있도록 구현한 B2B 챗봇 운영 관리자 페이지입니다.',
    techTags: [
      'Next.js',
      'React',
      'TypeScript',
      'Zustand',
      'TanStack Query',
      'Axios',
      'Tailwind CSS',
      'Radix UI',
      'Sentry',
      'Vercel'
    ],
    highlights: [
      '문서 파일 업로드 및 URL 등록 기능을 제공했습니다.',
      '카테고리 기반 데이터 분류와 데이터 목록/상세 조회 기능을 구현했습니다.',
      '데이터 수집·처리 상태를 확인할 수 있는 관리자 UI를 구성했습니다.',
      '쿠키 기반 인증 환경에서 CSRF 대응과 에러 모니터링을 적용했습니다.'
    ],
    responsibilities: [
      '관리자 페이지 화면 설계와 데이터 관리 핵심 기능을 구현했습니다.',
      'DataTable 기반 목록, 상세 모달, 업로드/등록 플로우 UI를 구현했습니다.',
      '서버 상태는 TanStack Query, UI 및 권한 상태는 Zustand로 분리해 상태를 관리했습니다.',
      'Axios 인스턴스를 구성하고 인증 쿠키 전송을 전제로 한 API 통신 레이어를 정리했습니다.',
      'CSRF 토큰 전달 방식 불일치로 발생한 403 이슈를 원인 단위로 분리하고 해결 방향을 조율했습니다.',
      'Sentry를 도입해 운영 환경에서의 런타임 에러 추적 기반을 마련했습니다.'
    ],
    links: [
      { label: 'Service', href: '#' }
    ]
  },
  {
    id: 'loventure',
    name: 'Loventure',
    title: 'AI 기반 데이트 코스 추천 서비스',
    period: '2025.09 ~ 2025.10',
    role: 'Frontend Developer',
    category: 'frontend',
    summary:
      'AI가 커플의 취향과 실시간 컨디션을 분석해서 서울 지역 맞춤형 데이트 코스를 추천해주고, 지도·다이어리·지역락 시스템으로 경험을 확장한 웹 서비스입니다.',
    techTags: [
      'React 19',
      'TypeScript',
      'Vite',
      'TanStack Query',
      'Zustand',
      'React Router',
      'Tailwind CSS',
      'MUI',
      'Mapbox GL JS',
      'Axios',
      'MSW'
    ],
    highlights: [
      '온보딩 취향 정보와 데이트 시간·컨디션·음주 여부·불호 음식 등의 옵션을 결합해 AI 기반 데이트 코스를 추천합니다.',
      'Mapbox 지도를 활용해 시작점을 선택하고, 추천 코스를 경로·마커·거리/시간 정보와 함께 시각화합니다.',
      '커플 룸·커플 매칭, 서울 25개 구를 단계적으로 해금하는 지역락, 다녀온 코스를 기록하는 다이어리까지 하나의 플로우로 제공합니다.'
    ],
    responsibilities: [
      'Feature-Sliced Design(FSD) 기반으로 auth, course, diary, mapbox, mypage 등 기능별 모듈 구조를 설계하고 구현했습니다.',
      'Zustand + TanStack Query 조합으로 권한 단계(ONBOARDING_REQUIRED, COUPLE_MATCHING_REQUIRED, ROCK_REQUIRED, COMPLETED)에 따른 라우팅 가드와 상태 플로우를 구성했습니다.',
      'Mapbox 연동, 코스 추천·저장·다이어리 작성/댓글/마이페이지 등 주요 화면과 UX를 모두 프론트엔드에서 구현했습니다.'
    ],
    links: [
      { label: 'GitHub (FE)', href: '#' },
      { label: 'Demo', href: '#' }
    ]
  },
  {
    id: 'commit-club',
    name: 'COMMIT',
    title: '금융수학과 IT 동아리 COMMIT 공식 홈페이지',
    period: '2025.08 ~ 진행중',
    role: 'Fullstack Developer',
    category: 'fullstack',
    summary:
      'IT 동아리 COMMIT의 소개, 스터디 진행 상황, 프로젝트 포트폴리오를 한 곳에서 관리하는 공식 홈페이지를 직접 기획하고 풀스택으로 구현한 프로젝트입니다.',
    techTags: [
      'React 19',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'React Router',
      'Node.js',
      'ESLint'
    ],
    highlights: [
      '동아리 소개, 운영 방향, 활동 현황을 외부/신입이 쉽게 이해할 수 있도록 구조화했습니다.',
      '스터디 주차별 자료와 프로젝트 정보를 정리해서 한눈에 볼 수 있는 페이지를 제공합니다.',
      'Node.js 기반 API로 동아리 관련 데이터를 관리할 수 있는 풀스택 구조를 설계했습니다.'
    ],
    responsibilities: [
      '동아리장으로서 사이트 정보 구조와 콘텐츠를 기획하고, React + Vite + TypeScript + Tailwind 기반 프론트엔드를 구축했습니다.',
      'Node.js로 간단한 백엔드 API를 구현해 동아리 소개/스터디/프로젝트 데이터를 프론트와 연동했습니다.',
      'ESLint 및 npm 스크립트(dev/build/preview/lint) 구성을 통해 개발 및 코드 품질 관리 플로우를 정리했습니다.'
    ],
    links: [
      { label: 'GitHub', href: '#' },
      { label: 'Demo', href: '#' }
    ]
  },
  {
    id: 'dreammap',
    name: 'DreamMap',
    title: '이력서 분석 및 로드맵 제안 서비스',
    period: '2025.07 ~ 2025.08',
    role: 'Fullstack Developer',
    category: 'fullstack',
    summary:
      '이력서를 업로드하면 AI가 점수·리뷰·리라이팅을 제공하고, 지원자의 상황에 맞춘 커리어 로드맵까지 제안하는 이력서 분석 웹 서비스입니다.',
    techTags: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Redux Toolkit',
      'React Router',
      'Axios',
      'Node.js 20',
      'Express 5',
      'MongoDB',
      'Gemini',
      'Azure Document Intelligence'
    ],
    highlights: [
      '사용자가 PDF 또는 텍스트 형태로 이력서를 업로드하면, Azure Document Intelligence로 텍스트를 추출하고 Gemini로 점수·리뷰·리라이팅을 수행합니다.',
      '이력서 버전별 분석 결과를 한 화면에서 관리하고, 즐겨찾기·상세 보기·버전 관리 기능을 제공합니다.',
      '사용자 프로필과 이력서를 바탕으로 학습·취업 로드맵을 생성하고, 달성 여부를 체크리스트/타임라인 형태로 시각화합니다.'
    ],
    responsibilities: [
      'Frontend에서 Vite + React + TypeScript 기반 대시보드 UI, 이력서 업로드/분석/로드맵 페이지와 Redux Toolkit 상태(auth, resume, roadmap)를 설계하고 구현했습니다.',
      'Axios 인터셉터로 JWT를 자동 주입하고 401 응답 시 세션 초기화 및 로그인 페이지 리다이렉트를 처리하는 인증 플로우를 구축했습니다.',
      'Backend에서 Express + MongoDB 기반 API를 설계하고, Azure Document Intelligence · Gemini 2.5 Flash 연동 및 JWT 인증/인가 로직을 구현했습니다.'
    ],
    links: [
      { label: 'GitHub (FE)', href: '#' },
      { label: 'GitHub (BE)', href: '#' },
      { label: 'Demo', href: '#' }
    ]
  },
  {
    id: 'xrpl-eyes',
    name: 'XRPL EYES',
    title: 'XRPL 기반 서비스들의 UAW 대시보드',
    period: '2025.06 ~ 2025.07',
    role: 'Frontend Developer',
    category: 'frontend',
    summary:
      'XRPL 기반 서비스들의 실시간 UAW(Unique Active Wallet) 지표와 공지·요약 정보를 한눈에 볼 수 있는 대시보드 웹앱입니다.',
    techTags: [
      'React 18',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'Framer Motion',
      'Recharts',
      'Radix UI',
      'React Router',
      'Axios',
      'MSW'
    ],
    highlights: [
      'XRPL 프로젝트별 실시간/1h/1d/7d UAW 추이와 전체 합산 UAW를 차트로 시각화합니다.',
      '프로젝트 리스트 테이블에서 증감률, 미니 스파크라인, 리뷰 레이블을 한 번에 확인할 수 있습니다.',
      '프로젝트 상세 모달에서 UAW 추이 차트와 최신 공지/뉴스 요약을 함께 보여줍니다.'
    ],
    responsibilities: [
      'UAW 차트, 프로젝트 리스트, 상세 모달/공지 카드를 포함한 대시보드 레이아웃을 설계하고 구현했습니다.',
      'Recharts와 Tailwind를 이용해 다양한 기간별 UAW 데이터를 차트·스파크라인·테이블로 일관되게 보여주도록 구성했습니다.',
      'MSW 기반 목 API 환경을 활용해 백엔드 준비 전에도 mock.html로 대시보드를 개발·테스트할 수 있도록 프론트엔드를 설계했습니다.'
    ],
    links: [
      { label: 'GitHub (FE)', href: '#' },
      { label: 'Demo', href: '#' }
    ]
  },
  {
    id: 'sume',
    name: 'SuME',
    title: '회의 음성 요약 및 캘린더 연동 서비스',
    period: '2025.01 ~ 2025.02',
    role: 'Frontend Developer',
    category: 'frontend',
    summary:
      '회의 음성을 STT로 텍스트화하고 LLM으로 요약해서 회의록을 만들고, 요약된 내용을 기반으로 캘린더 일정까지 자동 등록하는 회의 생산성 웹앱입니다.',
    techTags: [
      'React',
      'Tailwind CSS',
      'React Router',
      'FullCalendar',
      'Fetch API'
    ],
    highlights: [
      '회의 음성을 업로드하면 STT 결과 텍스트와 LLM 요약 내용을 한 화면에서 확인할 수 있습니다.',
      '요약된 내용에서 회의 제목·설명·시작/종료 시간을 추출해 캘린더 일정으로 자동 반영합니다.',
      '로그인/회원가입을 통해 사용자별 회의와 일정을 분리 관리합니다.'
    ],
    responsibilities: [
      '메인 페이지에서 녹음/업로드 영역, 요약 결과 영역, 타이머, 녹음 리스트 등을 포함한 전체 레이아웃을 설계하고 구현했습니다.',
      'FullCalendar 기반 캘린더 및 일정 요약 화면, 로그인/회원가입 페이지, 인증이 필요한 라우트를 보호하는 ProtectedRoute를 구현했습니다.',
      'API.js로 백엔드와의 통신 로직을 분리하고, Fetch 기반으로 STT·요약·일정 API를 연동했습니다.'
    ],
    links: [
      { label: 'Demo', href: 'https://www.sume-ai.kro.kr' },
      { label: 'GitHub', href: '#' }
    ]
  }
];

