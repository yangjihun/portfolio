export type TechCategory = 'frontend' | 'backend' | 'fullstack' | 'infra' | 'ai' | 'other';

export interface ProjectLink {
  label: string;
  href: string;
}

/** 문제 인식 → 해결 방안(선택 이유 포함) → 개선 성과 구조로 작성한다 */
export interface TroubleshootingItem {
  title: string;
  problem: string;   // 문제 인식: 어떤 문제가 왜 발생했는지
  solution: string;  // 해결 방안: 어떻게 해결했고, 왜 그 방법을 선택했는지
  result: string;    // 개선 성과: 수치·근거 중심의 결과
}

/** 어떤 기술을 왜 사용했는지 — 상세 페이지 '사용 기술' 섹션에 함께 노출 */
export interface TechReason {
  tech: string;
  reason: string;
}

/** 담당 역할 안에 하위 항목을 토글로 묶어 보여줄 때 사용 (토글 안에 토글) */
export interface ResponsibilityToggleItem {
  title: string;  // 접힌 상태에서 보이는 요약 라벨
  detail: string; // 펼쳤을 때 보이는 상세 문장
}

export interface ResponsibilityToggle {
  title: string; // 바깥 토글의 제목
  items: ResponsibilityToggleItem[]; // 안쪽 토글들
}

export interface Project {
  id: string;            // slug / route key
  name: string;
  title: string;
  image?: string;        // 커버 이미지. e.g. "/asset/my-project.png" (public 아래 배치)
  images?: string[];     // 추가 스크린샷 갤러리 (상세 페이지 커버 아래 2열 그리드로 노출)
  period: string;        // e.g. "2025.07 ~ 2025.08"
  role: string;          // e.g. "Frontend Developer", "Fullstack Developer"
  summary: string;       // 1~2 sentence summary in Korean
  techTags: string[];    // short tech stack tags
  category: TechCategory; // main category
  highlights: string[];  // what this project does / 특징
  responsibilities: (string | ResponsibilityToggle)[]; // what I specifically did
  links: ProjectLink[];  // GitHub, Demo, etc. can be "#" placeholder if unknown
  award?: string;         // 수상 내역
  notice?: string;        // 저장소 비공개 사유 등 안내 문구
  techReasons?: TechReason[]; // 핵심 기술의 선택 이유 (근거가 있는 것만)
  troubleshooting?: TroubleshootingItem[]; // 문제 상황과 해결 과정
}

/** "2025.10 ~ 운영중" 같은 period 문자열에서 시작 연월을 정렬용 숫자로 변환 */
const parseStartMonth = (period: string) => {
  const match = period.match(/(\d{4})\.(\d{2})/);
  if (!match) return 0;
  return Number(match[1]) * 12 + Number(match[2]);
};

/** 카드·목록·상세에서 공통으로 쓰는 카테고리 표기.
 *  딥 틸 테마에 맞춰 틸 인접색(sky·emerald)과 보색 포인트(amber·rose)로 구분한다. timeline.ts 배지와 같은 시스템 */
export const categoryStyle: Record<TechCategory, { label: string; badge: string }> = {
  frontend:  { label: 'Frontend',  badge: 'bg-sky-100 text-sky-800 border-sky-300' },
  backend:   { label: 'Backend',   badge: 'bg-emerald-100 text-emerald-800 border-emerald-300' },
  fullstack: { label: 'Fullstack', badge: 'bg-amber-100 text-amber-800 border-amber-300' },
  infra:     { label: 'Infra',     badge: 'bg-orange-100 text-orange-800 border-orange-300' },
  ai:        { label: 'AI',        badge: 'bg-rose-100 text-rose-800 border-rose-300' },
  other:     { label: 'Other',     badge: 'bg-slate-100 text-slate-600 border-slate-300' },
};

export const projects: Project[] = [
  {
    id: 'zani',
    name: 'ZANI',
    title: '학생 집중도를 실시간으로 분석하고 맞춤 리포트를 제공하는 AI 강의 플랫폼',
    image: '/asset/zani.png',
    period: '2026.07 ~ 2026.08',
    award: '삼성 청년 SW·AI 아카데미 2학기 공통 프로젝트 최우수상',
    role: 'Fullstack Developer',
    category: 'fullstack',
    summary:
      '학생이 수업에 얼마나 집중하고 있는지 브라우저 안의 AI로 판정해 강사에게 실시간 코칭 팁을 주고, 수업이 끝나면 녹화·전사·참여도를 같은 시간축에 정리한 리포트와 복습 클립을 만들어 주는 강의 플랫폼입니다. 삼성 청년 SW·AI 아카데미(SSAFY)에서 5인 팀으로 개발했고 풀스택을 맡았습니다.',
    techTags: [
      'Next.js',
      'TypeScript',
      'Spring Boot',
      'Java 21',
      'MySQL',
      'Redis',
      'LiveKit',
      'Whisper · LLM',
    ],
    notice: '대외비 정책에 따라 저장소와 상세 코드는 공개하지 않습니다.',
    highlights: [
      '학생 카메라 영상을 기반으로 수업 참여도를 판정',
      '집중이 떨어진 학생 비율이 집계 기준을 넘으면, 그 시점 강사 발화를 전사해 어떤 내용을 다시 설명하면 좋을지 실시간 팁 제공.',
      '수업이 끝나면 강사는 구간별 참여도와 개선 피드백을, 학생은 놓친 구간의 복습 클립과 이해도 퀴즈를 제공',
      '요약 리포트에서 궁금한 문장을 드래그하면 챗봇이 그 시간대 수업 내용을 근거로 답변을 제공',
    ],
    responsibilities: [
      {
        title: '팀 협업 자동화 구축',
        items: [
          {
            title: '브랜치명 기반 커밋 자동화 훅',
            detail: '브랜치명을 읽어 커밋에 티켓 번호를 자동으로 넣고 컨벤션을 검사하는 훅 구축',
          },
          {
            title: '지라 자동화 봇',
            detail: '지라 이슈 상태 자동화와 JQL로 매일 아침 작업자별 할 일을 공지하는 봇 구현',
          },
        ],
      },
      {
        title: '실시간 오디오 파이프라인 구현',
        items: [
          {
            title: '오디오 링버퍼 수집',
            detail: '강사 음성을 LiveKit Egress WebSocket으로 받아 세션마다 최근 300초를 링버퍼에 저장',
          },
          {
            title: '다운샘플·전사 연동',
            detail: '코칭이 트리거되면 그 구간만 16kHz로 다운샘플해 MP3로 인코딩한 뒤 Whisper 전사로 넘기는 파이프라인 구현',
          },
        ],
      },
      {
        title: '리포트 질의응답 챗봇 구현',
        items: [
          {
            title: '답변 근거 주입 API',
            detail: '드래그 위치를 전사 시간창으로 바꿔 답변 근거를 주입하는 API에 익명화와 빈도 제한, 토큰 사용량 로깅 추가',
          },
          {
            title: '채팅 드로어 UI',
            detail: '드래그 후 질문할 수 있는 채팅 드로어와 인용 구간으로 바로 이동하는 UI까지 구현',
          },
        ],
      },
      {
        title: '리포트 API·플레이어 구현',
        items: [
          {
            title: '리포트 API·플레이어',
            detail: '학생·강사 리포트 API와 리포트 플레이어(화자별 전사 타임라인, 복습 클립, 구간 이동) 구현',
          },
          {
            title: '영상 접근 제어',
            detail: '녹화 영상은 권한을 확인한 뒤 짧게 유효한 URL로 서빙해 무단 접근 차단',
          },
        ],
      },
      {
        title: '프론트엔드 초기 세팅 및 퍼블리싱',
        items: [
          {
            title: '프론트엔드 아키텍처 세팅',
            detail: 'Next.js에 DDD 4계층 구조를 잡고 Vitest, TanStack Query·Zustand, OpenAPI 타입 자동 생성 구성',
          },
          {
            title: '화면 퍼블리싱',
            detail: '12개 전체 화면 퍼블리싱과 공통 UI 컴포넌트 담당',
          },
        ],
      },
    ],
    techReasons: [
      {
        tech: 'LiveKit',
        reason: '강사 카메라·마이크·화면공유와 학생 마이크를 트랙 단위로 따로 받아 녹화(Egress)까지 해야 했는데, 이걸 모두 지원해서 선택했습니다.',
      },
      {
        tech: 'Whisper · LLM',
        reason: '그 시간대 수업 내용을 근거로 답하는 기능이 서비스의 핵심이라, Whisper로 화자를 구분해 전사하고 그 결과를 LLM에 근거로 넘겨주는 파이프라인을 구축했습니다.',
      },
    ],
    troubleshooting: [
      {
        title: '강의 썸네일 용량을 줄여 목록 페이지 로딩 속도 개선',
        problem:
          '내 강의실 페이지의 LCP가 3.5초, Performance 점수가 81점에 머물렀습니다. 555×312 카드에 녹화 영상에서 추출한 1280×720 PNG 썸네일을 그대로 넣고 있어 이미지 전송량이 컸습니다.',
        solution:
          '썸네일 URL이 요청마다 달라 Next.js 이미지 캐시를 쓰기 어려웠습니다. 그래서 서버에서 원본을 카드 크기에 맞게 줄이고 JPEG로 변환했습니다. 변환한 이미지는 캐시해 다시 쓰고, 원본이 바뀌면 캐시도 함께 갱신했습니다. 첫 화면 밖 썸네일은 지연 로딩으로 바꿨습니다.',
        result:
          'LCP는 3.5초에서 1.4초로, Lighthouse Performance 점수는 81점에서 96점으로 개선했습니다. 썸네일 용량도 0.5~1MB에서 수십 KB 수준으로 줄여 전송량을 약 94% 줄였습니다.'
      },
      {
        title: '음소거 중에도 최근 5분의 음성 구간을 정확하게 유지하도록 개선',
        problem:
        '실시간 코칭을 위해 강사의 최근 5분 음성을 링버퍼에 저장했습니다. 하지만 LiveKit에서는 음소거 중 오디오 프레임이 오지 않아, 실제 최근 5분이 아니라 음성이 들어온 시간만 따진 최근 5분이 조회됐습니다.',
        solution:
        '버퍼 시간이 실제 시간과 맞도록 0.5초 이상 오디오가 비면 서버에서 무음 데이터를 채웠습니다. 짧은 네트워크 지연은 기다리고, 긴 공백만 보정해 불필요한 무음 삽입을 줄였습니다. MP3 변환은 필요한 음성만 먼저 복사한 뒤 락 밖에서 진행했습니다.',
        result:
        '버퍼 시간 오차를 최대 0.5초 이내로 줄였습니다. 버퍼 락 점유 시간도 약 800ms에서 3ms로 줄여, MP3 변환 중에도 새 오디오를 지연 없이 받을 수 있게 했습니다.'
      },
      {
        title: '챗봇이 참고하는 전사 범위를 질문한 구간으로 줄여 요청 크기 개선',
        problem:
        '리포트 문장을 드래그해 질문하는 챗봇에서 처음에는 수업 전체 전사를 LLM에 보냈습니다. 3시간 수업 기준 전사 데이터가 약 180KB까지 커져 요청 크기 제한을 넘었고, 질문과 관련 없는 내용에도 토큰을 쓰고 있었습니다.',
        solution:
        '드래그한 문장의 시간대를 찾아 해당 구간과 앞뒤 한 구간만 DB에서 조회했습니다. 문장이 구간 사이에서 끊길 수 있어 앞뒤 구간은 포함하되, LLM에는 최대 3개 구간만 보냈습니다. 사용자 입력이 아니라 서버 전사만 근거로 써서 답변 조작 가능성도 낮췄습니다.',
        result:
        'LLM에 보내는 전사를 최대 40개 구간에서 3개 구간으로 줄여 데이터 전달량을 90% 이상 줄였습니다. 프롬프트 크기도 요청 한도의 약 27% 수준으로 낮춰 요청 크기 초과 문제를 해결했습니다.'
      },
    ],
    links: []
  },
  {
    id: 'studypot',
    name: 'StudyPot',
    title: 'AI 팀장이 운영을 보조하는 스터디 그룹 관리 플랫폼',
    image: '/asset/studypot.png',
    period: '2026.05 ~ 2026.06',
    role: 'Frontend Lead (기획 · FE 설계)',
    category: 'frontend',
    award: '삼성 청년 SW·AI 아카데미 1학기 관통 프로젝트 최우수상',
    summary:
      '스터디장에게 몰리는 운영 부담과 팀원 간 의사결정·합의 병목을 줄이기 위해, AI 팀장이 커리큘럼·회고·규칙 운영을 대신 챙겨주는 스터디 관리 플랫폼입니다.',
    techTags: [
      'Vue 3',
      'TypeScript',
      'Vite',
      'Tailwind CSS',
      'FSD',
      'MSW',
      'Netlify'
    ],
    highlights: [
      '그룹 생성과 초대 코드 참여부터 온보딩(스터디 목표·세부 키워드 설정)까지 스터디 개설 흐름을 하나로 연결했습니다.',
      '커리큘럼 Todo, 회고, AI 팀장 답변(마크다운 렌더링) 등 스터디 운영을 AI가 관리하도록 구성했습니다.',
      '그룹 규칙과 위반 관리, 알림·운영 로그, 그룹 스페이스(게시판·마이페이지)까지 운영에 필요한 기능을 갖췄습니다.',
      'FSD(pages/entities/features/shared/widgets) 레이어로 도메인 경계를 설계해 팀원 간 작업 충돌을 줄였습니다.',
    ],
    responsibilities: [
      {
        title: 'FE 구조·컨벤션 설계',
        items: [
          {
            title: 'FE 구조 설계·구현 총괄',
            detail: '프론트엔드 리드로 FE 구조 설계와 구현 담당',
          },
          {
            title: 'FSD 레이어 구조 설계·적용',
            detail: 'FSD 아키텍처의 레이어 구조 설계 및 팀 전체 컨벤션 적용',
          },
          {
            title: '협업 컨벤션 문서화',
            detail: 'ESLint/Prettier, PR·이슈 템플릿, 코드·커밋 컨벤션을 문서화해 협업 방식 표준화',
          },
        ],
      },
      {
        title: 'MSW 기반 선행 개발로 일정 단축',
        items: [
          {
            title: 'MSW 기반 선행 개발',
            detail: '미구현 도메인의 API 타입·함수·MSW 핸들러를 먼저 정리해 BE 연동 전에 UI와 로직 개발 완주',
          },
          {
            title: '개발 기간 단축 성과',
            detail: '이 선행 작업으로 전체 개발 기간 약 30% 단축',
          },
        ],
      },
      {
        title: '핵심 화면 구현',
        items: [
          {
            title: '쿠키 세션 인증',
            detail: '쿠키 세션 인증 화면 구현',
          },
          {
            title: '그룹 생성·초대 코드 참여',
            detail: '그룹 생성과 초대 코드 참여 화면 구현',
          },
          {
            title: '온보딩',
            detail: '온보딩 화면 구현',
          },
          {
            title: '커리큘럼 투두',
            detail: '커리큘럼 투두 화면 구현',
          },
          {
            title: '회고·AI 팀장',
            detail: '회고와 AI 팀장 화면 구현',
          },
          {
            title: '알림·운영 로그',
            detail: '알림과 운영 로그 화면 구현',
          },
          {
            title: '그룹 스페이스',
            detail: '그룹 스페이스 화면 구현',
          },
        ],
      },
    ],
    techReasons: [
      {
        tech: 'MSW',
        reason: '백엔드 연동 전에 UI와 로직 개발을 완주하기 위해 미구현 도메인의 API 타입·목 핸들러를 먼저 구성했고, 이 선행 작업으로 전체 개발 기간을 약 30% 단축했습니다.',
      },
      {
        tech: 'FSD (Feature-Sliced Design)',
        reason: '팀원이 같은 코드베이스에서 병렬 작업할 때 충돌을 줄이기 위해 pages/entities/features/shared/widgets 레이어로 도메인 경계를 나눴습니다.',
      },
    ],
    troubleshooting: [],
    links: [
      { label: 'GitHub (FE)', href: 'https://github.com/StudyPot/StudyPot_FE' },
      { label: 'GitHub (BE)', href: 'https://github.com/StudyPot/StudyPot_BE' }
    ]
  },
  {
    id: 'studyroom-reservation',
    name: 'RE:MIT',
    title: '학과 스터디룸 예약 관리 시스템',
    image: '/asset/remit.png',
    period: '2025.10 ~ 운영 중',
    role: 'PM · Fullstack Developer',
    category: 'fullstack',
    summary:
      '학과 사무실에서 수동으로 관리하던 스터디룸 예약을 웹 서비스로 전환한 예약 시스템입니다. 배포 이후 사용자 문의와 개선 요청을 반영하며 실제 학과에서 운영 중입니다.',
    techTags: [
      'PHP',
      'Laravel',
      'Microsoft Clarity',
      'MySQL',
      'Blade',
      'Google SMTP',
      'Gabia',
    ],
    highlights: [
      '학과생 이메일 기반 회원가입·로그인과 비밀번호 찾기를 Google SMTP 메일 인증으로 구현했습니다.',
      '스터디룸 예약 생성·조회, 그룹 예약, 최대 4시간 예약 제한, 진행 중 예약 표시를 제공합니다.',
      '예약자에게만 열쇠함 접근 정보를 제공하고, 노출 시간을 10분으로 제한했습니다.',
      '유저·예약·알림·페널티를 관리하는 관리자 페이지와 페널티 가이드라인·알림을 운영합니다.',
      '자체 관리자 통계와 Microsoft Clarity를 결합해 실제 예약 지표와 사용자 행동을 함께 확인하는 운영 모니터링 체계를 구축했습니다.',
      '기능 개선하기 버튼을 통해 사용자 피드백을 반영하고 기능을 지속적으로 개선하고 있습니다.'
    ],
    responsibilities: [
      {
        title: '이용 기준 협의 및 인증 절차 구현',
        items: [
          {
            title: '이용 기준·물품 관리 수칙 협의',
            detail: 'PM 겸 풀스택 개발자로 교수님과 이용 기준·물품 관리 수칙 협의 및 정의',
          },
          {
            title: '학과생 전용 인증 절차 구현',
            detail: '학과생 전용 인증 절차 구현',
          },
        ],
      },
      {
        title: '기능 구현 및 안정화',
        items: [
          {
            title: '예약·관리자·알림 기능 구현',
            detail: '예약·관리자·알림 기능 구현',
          },
          {
            title: 'QA 기반 예외 처리 안정화',
            detail: '예약 중복, 인증되지 않은 접근, 비정상 요청에 대한 처리 로직을 QA 관점에서 점검·보완, 운영 시나리오 기반으로 안정화',
          },
        ],
      },
      {
        title: '뷰 리팩토링으로 파일 크기 개선',
        items: [
          {
            title: '리팩토링 범위 설정',
            detail: '비대해진 뷰의 유지보수성을 높이기 위한 리팩토링 범위 설정',
          },
          {
            title: '이미지·SVG 분리 성과',
            detail: 'base64 이미지와 인라인 SVG를 분리해 핵심 파일 크기를 82.7KB에서 8.3KB로 약 90% 감소',
          },
        ],
      },
      {
        title: '서비스 운영·개선',
        items: [
          {
            title: '운영 방식 디지털 전환',
            detail: '대면과 상주 인력에 의존하던 운영 방식을 디지털로 전환해 학과의 관리 자원 부담 감소',
          },
          {
            title: '사용자 피드백 기반 개선',
            detail: '배포 이후 접수된 사용자 문의와 개선 요청을 수집·분석해 실제 이용 환경에 맞게 기능 개선 중',
          },
          {
            title: '운영 모니터링 체계 구축',
            detail: '회원·예약·취소·재이용 지표를 제공하는 자체 관리자 통계와 Clarity의 히트맵·세션 기록을 함께 구성하고, 운영 환경에서만 수집되도록 분리해 민감 정보 마스킹 적용',
          },
        ],
      },
    ],
    techReasons: [
      {
        tech: 'Google SMTP',
        reason: '"학과생만 이용 가능해야 한다"는 요구사항을 학과생 이메일 인증(회원가입·비밀번호 찾기)으로 구현하기 위해 도입했습니다.',
      },
      {
        tech: 'Microsoft Clarity',
        reason: '자체 통계는 실제 회원·예약 KPI를, Clarity는 클릭·스크롤·이탈 흐름을 담당하도록 분석 목적을 분리했습니다. 운영 환경에서만 추적하고 민감 정보는 마스킹해 서비스 개선에 필요한 행동 데이터만 확인하도록 구성했습니다.',
      },
    ],
    troubleshooting: [
      {
        title: '프로토타입을 활용해 학과생 인증에 필요한 정보 확보',
        problem:
        '학과생만 이용할 수 있는 서비스를 구현하려면 학생 이메일을 활용한 인증이 필요했습니다. 하지만 교수님께서 개인정보 제공에 대한 우려를 가지고 계셔서 이메일 정보를 받을 수 없었고, 학과생 여부를 확인해야 한다는 핵심 요구사항을 구현하기 어려운 상황이었습니다.',
        solution:
        '단순히 이메일 정보가 필요하다고 요청하는 대신, 회원가입부터 로그인, 학과생 여부 확인까지 이메일이 실제로 어떻게 사용되는지 과정을 정리했습니다. 또한 설명만으로는 서비스 구조를 전달하기 어렵다고 판단해 회원가입과 로그인 화면을 직접 구현한 프로토타입을 만들고 시연했습니다. 이를 통해 이메일이 다른 목적으로 사용되는 것이 아니라 학과생 여부를 확인하기 위한 최소한의 정보라는 점을 설명했습니다.',
        result:
        '프로토타입을 통해 개인정보의 사용 목적과 범위를 구체적으로 설명하면서 교수님의 동의를 얻어 학생 이메일 정보를 제공받을 수 있었습니다. 이를 바탕으로 학과생만 가입하고 서비스를 이용할 수 있는 인증 기능을 구현했고, 서비스의 핵심 요구사항을 충족해 실제 학과 운영까지 이어갈 수 있었습니다.'
      },
      {
        title: '비대해진 Blade 뷰를 기준에 따라 분리해 유지보수성 개선',
        problem:
        'Blade 뷰 내부에 이미지가 base64 형태로 포함되고 아이콘도 SVG 코드가 직접 작성되어 있어 파일 크기가 커지고 같은 요소를 여러 화면에서 재사용하기 어려웠습니다. 전체 뷰를 확인한 결과 base64 이미지 5개와 인라인 SVG 54개가 사용되고 있었으며, 가장 큰 파일은 82.7KB까지 증가한 상태였습니다.',
        solution:
        '먼저 개선 기준을 정했습니다. Blade 파일은 150줄 이하로 관리하고, 반복해서 사용하는 SVG는 컴포넌트로 분리하도록 기준을 세웠습니다. 이후 base64 이미지는 정적 파일로 분리하고 반복되는 아이콘은 공통 컴포넌트로 변경했습니다. 여러 파일을 한 번에 수정해야 하는 부분은 정규식을 활용하되, 예상한 개수만큼 변경됐는지 확인하는 검증 과정을 추가해 기존 화면의 동작이 달라지지 않도록 했습니다.',
        result:
        '가장 큰 Blade 파일의 크기를 82.7KB에서 8.3KB로 약 90% 줄였습니다. 뷰 내부의 base64 이미지는 5개에서 모두 제거했고, 인라인 SVG도 54개에서 30개로 줄였습니다. 반복되는 에셋을 별도로 관리할 수 있게 되면서 파일 구조가 단순해졌고, 같은 아이콘을 여러 화면에서 재사용할 수 있도록 개선했습니다.'
      }
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/Re-mit/Remit' }
    ]
  },
  {
    id: 'kakao-enterprise-pbl',
    name: 'Vibot',
    title: '사내 문서 기반 AI 챗봇 운영 관리자 페이지',
    image: '/asset/vibot.png',
    period: '2025.10 ~ 2025.12',
    role: 'Frontend Lead',
    category: 'frontend',
    notice: '기업 연계 프로젝트로 진행되어, 대외비 정책에 따라 저장소와 상세 코드는 공개하지 않습니다.',
    summary:
      '관리자가 문서·URL 데이터를 업로드·분류하고, 수집·학습 상태를 모니터링하며 챗봇 응답을 검증하는 B2B 챗봇 운영 관리자 페이지입니다. 카카오엔터프라이즈 SW 아카데미의 기업실무형 프로젝트로 진행했습니다.',
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
      '문서 파일 업로드와 URL 등록으로 챗봇이 학습할 데이터를 관리자가 직접 적재할 수 있습니다.',
      '카테고리 기반 데이터 분류와 DataTable 목록·상세 조회로 적재된 문서를 관리합니다.',
      '데이터 수집·처리 상태를 확인해 학습이 어디까지 진행됐는지 추적할 수 있는 모니터링 UI를 구성했습니다.',
      '쿠키 기반 인증 환경에서 CSRF에 대응하고, Sentry로 운영 중 발생하는 런타임 에러를 추적합니다.'
    ],
    responsibilities: [
      {
        title: '관리자 페이지 설계·구현',
        items: [
          {
            title: '관리자 페이지 설계·구현 총괄',
            detail: '프론트엔드 개발 팀장으로 관리자 페이지 화면 설계와 데이터 관리 핵심 기능 구현 담당',
          },
          {
            title: '데이터 관리 UI 구현',
            detail: 'DataTable 기반 목록, 상세 모달, 파일 업로드·URL 등록 플로우 UI 구현',
          },
        ],
      },
      {
        title: '프론트엔드 인프라 구성',
        items: [
          {
            title: '상태 관리 책임 분리',
            detail: '서버 상태는 TanStack Query, UI·권한 상태는 Zustand로 나눠 상태 관리 책임 분리',
          },
          {
            title: 'API 통신 레이어 정리',
            detail: 'Axios 인스턴스 구성 및 인증 쿠키 전송을 전제로 한 API 통신 레이어 정리',
          },
          {
            title: 'Sentry 기반 에러 추적 도입',
            detail: 'Sentry를 도입해 운영 환경의 런타임 에러 추적 기반 마련',
          },
        ],
      },
    ],
    techReasons: [
      {
        tech: 'TanStack Query · Zustand',
        reason: '서버 데이터 캐싱·동기화는 TanStack Query에, UI·권한 상태는 Zustand에 맡겨 상태 관리 책임을 분리하기 위해 조합했습니다.',
      },
      {
        tech: 'Sentry',
        reason: '관리자가 상시 사용하는 운영 도구 특성상, 배포 이후 발생하는 런타임 에러를 추적할 수단이 필요해 도입했습니다.',
      },
    ],
    troubleshooting: [
      {
        title: 'CSRF 토큰 처리 방식의 차이로 발생한 403 오류 해결',
        problem:
        '로그인 후 서버에서 CSRF 토큰을 발급받고, 쿠키의 XSRF-TOKEN 값을 요청 헤더에 담아 전송하도록 구현했습니다. 하지만 일부 POST, PUT, DELETE 요청에서 CSRF 검증에 실패하며 403 Forbidden이 반복해서 발생했습니다.',
        solution:
        '요청 과정을 확인해 일부 API 호출에서 CSRF 헤더가 누락되는 문제를 발견하고, Axios 인터셉터에서 쿠키의 토큰 값을 요청마다 헤더에 넣도록 수정했습니다. 이후에도 403이 발생해 Spring Security의 CSRF 처리 과정을 확인했고, 원본 토큰과 XOR 처리 토큰의 흐름이 맞지 않아 검증에 실패하고 있음을 파악했습니다. Swagger UI와 기존 보안 설정을 유지하기 위해 우회하지 않고, 프론트엔드는 쿠키 값을 헤더에 전달하고 토큰 생성과 검증은 Spring Security의 기본 처리 방식에 맡기도록 정리했습니다.',
        result:
        '프론트엔드와 백엔드의 CSRF 토큰 처리 방식을 일치시켜 반복적으로 발생하던 403 오류를 해결했습니다. 또한 Swagger UI를 위해 별도의 예외를 두거나 CSRF 기능을 비활성화하지 않고도 동일한 보안 설정을 유지할 수 있도록 했습니다. 인증 오류로 API 연동과 기능 테스트가 계속 지연되던 문제도 해결해 이후 개발 일정을 원활하게 진행할 수 있었습니다.'
      }
    ],
    links: []
  },
  {
    id: 'loventure',
    name: 'Loventure',
    title: 'AI 기반 데이트 코스 추천 서비스',
    image: '/asset/loventure.png',
    period: '2025.09 ~ 2025.10',
    role: 'Frontend Developer',
    category: 'frontend',
    summary:
      'AI가 커플의 취향과 실시간 컨디션을 분석해서 서울 지역 맞춤형 데이트 코스를 추천해주고, 지도·다이어리·지역락 시스템으로 경험을 확장한 웹 서비스입니다. 카카오엔터프라이즈 SW 아카데미의 현장미러형 프로젝트로 진행했습니다.',
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
      {
        title: '프론트엔드 아키텍처 설계',
        items: [
          {
            title: 'FSD 기반 모듈 구조 설계',
            detail: 'Feature-Sliced Design(FSD) 기반으로 auth, course, diary, mapbox, mypage 등 기능별 모듈 구조 설계 및 구현',
          },
          {
            title: '권한 단계별 라우팅 가드 구성',
            detail: 'Zustand + TanStack Query 조합으로 권한 단계(ONBOARDING_REQUIRED, COUPLE_MATCHING_REQUIRED, ROCK_REQUIRED, COMPLETED)에 따른 라우팅 가드와 상태 플로우 구성',
          },
        ],
      },
      {
        title: '주요 화면·UX 구현',
        items: [
          {
            title: 'Mapbox 연동',
            detail: 'Mapbox 연동 구현',
          },
          {
            title: '코스 추천·저장',
            detail: '코스 추천·저장 화면 구현',
          },
          {
            title: '다이어리 작성·댓글',
            detail: '다이어리 작성/댓글 화면 구현',
          },
          {
            title: '마이페이지',
            detail: '마이페이지 화면 구현',
          },
        ],
      },
    ],
    techReasons: [
      {
        tech: 'Mapbox GL JS',
        reason: '데이트 코스라는 도메인 특성상 시작점 선택과 추천 경로·마커·거리/시간 시각화가 핵심 UX라서 지도 렌더링 자유도가 높은 Mapbox를 사용했습니다.',
      },
      {
        tech: 'Zustand + TanStack Query',
        reason: '온보딩 → 커플 매칭 → 지역 해금 → 완료로 이어지는 권한 단계별 라우팅 가드를 만들기 위해, 서버 상태와 클라이언트 권한 상태를 분리해 관리했습니다.',
      },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/PitterPetter/PitterPetter_FE' },
      { label: 'Demo', href: 'https://loventure.us' }
    ]
  },
  {
    id: 'commit-club',
    name: 'COMMIT',
    title: '금융수학과 IT 동아리 COMMIT 공식 홈페이지',
    image: '/asset/fm-commit.png',
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
      {
        title: '동아리 사이트 기획 및 프론트엔드 구축',
        items: [
          {
            title: '사이트 기획',
            detail: '동아리장으로서 사이트 정보 구조와 콘텐츠 기획',
          },
          {
            title: '프론트엔드 구축',
            detail: 'React + Vite + TypeScript + Tailwind 기반 프론트엔드 구축',
          },
        ],
      },
      {
        title: '백엔드 구현 및 품질 관리',
        items: [
          {
            title: '백엔드 API 구현·연동',
            detail: 'Node.js로 간단한 백엔드 API를 구현해 동아리 소개/스터디/프로젝트 데이터를 프론트와 연동',
          },
          {
            title: '코드 품질 관리 플로우 정리',
            detail: 'ESLint 및 npm 스크립트(dev/build/preview/lint) 구성을 통해 개발 및 코드 품질 관리 플로우 정리',
          },
        ],
      },
    ],
    links: [
      { label: 'GitHub', href: 'https://github.com/yangjihun/FM-COMMIT' },
      { label: 'Demo', href: 'https://fm-commit.com/' }
    ]
  },
  {
    id: 'dreammap',
    name: 'DreamMap',
    title: '이력서 분석 및 로드맵 제안 서비스',
    image: '/asset/dreammap.png',
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
      {
        title: '대시보드 UI 및 상태 관리 구현',
        items: [
          {
            title: 'UI·페이지 구현',
            detail: 'Vite + React + TypeScript 기반 대시보드 UI와 이력서 업로드/분석/로드맵 페이지 구현',
          },
          {
            title: '상태 관리 설계',
            detail: 'Redux Toolkit 상태(auth, resume, roadmap) 설계',
          },
        ],
      },
      {
        title: 'Axios 인증 흐름 정리',
        items: [
          {
            title: '인증 토큰 자동 첨부',
            detail: 'Axios 인터셉터를 구성해 인증 토큰을 요청마다 자동으로 첨부',
          },
          {
            title: '401 응답 공통 처리',
            detail: '401 응답을 공통 처리해 세션 초기화 및 로그인 페이지로 리다이렉트',
          },
        ],
      },
      {
        title: 'Resume CRUD API 구현 및 보완',
        items: [
          {
            title: 'CRUD API 구현·수정',
            detail: '기존 Express + MongoDB 코드베이스에서 이력서(Resume) CRUD API 일부 구현·수정',
          },
          {
            title: '입력 검증·예외 처리 보완',
            detail: '입력 검증 및 예외 처리 보완에 기여',
          },
        ],
      },
    ],
    links: [
      { label: 'GitHub (FE)', href: 'https://github.com/yangjihun/DreamMap-fe' },
      { label: 'GitHub (BE)', href: 'https://github.com/yangjihun/DreamMap-be' }
    ]
  },
];

/** 시작일 기준 최신순. 배열 순서를 직접 관리하지 않아도 되도록 파생시킨다 */
export const projectsByRecency: Project[] = [...projects].sort(
  (a, b) => parseStartMonth(b.period) - parseStartMonth(a.period)
);

/** 대표 프로젝트. 여기 적힌 순서대로 홈·프로젝트 페이지 상단에 노출된다 */
const FEATURED_PROJECT_IDS = ['zani', 'studypot', 'studyroom-reservation', 'kakao-enterprise-pbl', 'loventure'];

export const isFeaturedProject = (id: string) => FEATURED_PROJECT_IDS.includes(id);

export const featuredProjects: Project[] = FEATURED_PROJECT_IDS.map((id) => {
  const project = projects.find((entry) => entry.id === id);
  if (!project) {
    throw new Error(`featuredProjects: '${id}' 프로젝트를 찾을 수 없습니다.`);
  }
  return project;
});

/** 대표 프로젝트를 제외한 나머지 (최신순) */
export const otherProjects: Project[] = projectsByRecency.filter(
  (project) => !isFeaturedProject(project.id)
);

