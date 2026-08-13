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
  responsibilities: string[]; // what I specifically did
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
    title: '학생 집중도를 실시간으로 분석하고 맞춤 리포트를 만들어 주는 AI 강의 플랫폼',
    image: '/asset/zani.png',
    period: '2026.07 ~ 2026.08',
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
      'MR을 올리면 Git 컨벤션과 DDD 경계를 자동으로 검사하는, 리뷰가 자동화된 환경에서 협업했습니다.',
      '학생 카메라 영상은 서버로 보내지 않고 브라우저에서 MediaPipe와 ONNX로 참여도를 판정합니다. 집중이 떨어진 학생 비율이 익명 집계 기준 30%를 넘으면, 그 시점 강사 발화를 전사해 어떤 내용을 다시 설명하면 좋을지 실시간 팁으로 전달합니다.',
      '강사의 카메라·마이크·화면공유와 학생 마이크를 트랙별로 나눠 녹화하고, 누가 말했는지 구분한 전사를 만듭니다. 수업이 끝나면 강사는 구간별 참여도와 개선 피드백을, 학생은 놓친 구간의 복습 클립과 이해도 퀴즈를 받아볼 수 있습니다.',
      '리포트를 읽다가 궁금한 문장을 드래그하면, 그 시간대 수업 내용을 근거로 답해 주는 챗봇에 바로 질문할 수 있습니다.',
    ],
    responsibilities: [
      '팀 협업 자동화를 직접 만들었습니다. 브랜치명을 읽어 커밋에 티켓 번호를 자동으로 넣고 컨벤션을 검사하는 훅을 구축했고, 지라 이슈 상태 자동화와 JQL로 매일 아침 작업자별 할 일을 공지하는 봇도 만들었습니다.',
      '강사 음성을 LiveKit Egress WebSocket으로 받아 세션마다 최근 300초를 링버퍼에 쌓아 두고, 코칭이 트리거되면 그 구간만 16kHz로 다운샘플해 MP3로 인코딩한 뒤 Whisper 전사로 넘기는 실시간 오디오 파이프라인을 구현했습니다. 음소거로 생기는 시간축 오차를 무음 패딩으로 최대 0.5초 이내로 개선하고, 인코딩을 락 밖으로 분리해 락 점유 시간을 약 800ms에서 3ms로 단축했습니다.',
      '리포트 질의응답 챗봇을 만들었습니다. 드래그 위치를 전사 시간창으로 바꿔 답변 근거를 주입하는 API에 익명화와 빈도 제한, 토큰 사용량 로깅을 더했고, 드래그 후 질문할 수 있는 채팅 드로어와 인용 구간으로 바로 이동하는 UI까지 구현했습니다. 근거를 전사 전체 대신 드래그 시간대 주변 3개 구간으로 좁혀 주입량을 90% 이상 절감했고, 프롬프트를 LLM 본문 예산의 약 27% 수준까지 낮춰 토큰 효율을 개선했습니다.',
      '학생·강사 리포트 API와 리포트 플레이어(화자별 전사 타임라인, 복습 클립, 구간 이동)를 만들었습니다. 녹화 영상은 권한을 확인한 뒤 짧게 유효한 URL로 서빙해 무단 접근을 막았습니다.',
      '프론트엔드 초기 세팅을 맡아 Next.js에 DDD 4계층 구조를 잡고 Vitest, TanStack Query·Zustand, OpenAPI 타입 자동 생성을 구성했습니다. 12개 전체 화면 퍼블리싱과 공통 UI 컴포넌트도 담당했습니다.',
    ],
    techReasons: [
      {
        tech: 'LiveKit',
        reason: '강사 카메라·마이크·화면공유와 학생 마이크를 트랙 단위로 따로 받아 녹화(Egress)까지 해야 했는데, 이걸 모두 지원해서 선택했습니다.',
      },
      {
        tech: 'MediaPipe · ONNX (온디바이스 AI)',
        reason: '학생 얼굴 분석 데이터는 서버로 전송하지 않았습니다. 참여도 판정을 브라우저 안에서 처리하여 프라이버시 걱정과 서버 연산 비용이 함께 줄었습니다.',
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
          '내 강의실 페이지를 Lighthouse로 측정했을 때 LCP가 3.5초로 나타났고, Performance 점수도 81점에 머물렀습니다. 원인을 확인해 보니 녹화 영상에서 추출한 1280×720 PNG 이미지를 555×312 크기의 강의 카드에 그대로 사용하고 있었습니다. 썸네일 한 장의 크기가 0.5~1MB 정도였고, 강의가 많아질수록 내려받아야 하는 이미지도 함께 늘어나 페이지가 점점 느려졌습니다.',
        solution:
          '썸네일 URL이 요청마다 달라 Next.js 이미지 캐시를 활용하기 어려워 서버에서 이미지 자체를 줄이는 방식으로 변경했습니다. 원본 이미지를 화면 크기에 맞게 리사이즈하고 JPEG로 변환했으며, 변환한 이미지는 캐시해 이후 요청에서 다시 사용하도록 했습니다. 원본이 새로 생성되면 캐시도 함께 갱신되도록 처리하고, 첫 화면에 보이지 않는 썸네일은 지연 로딩하도록 변경했습니다.',
        result:
          'LCP를 3.5초에서 1.4초로 약 60% 줄여 권장 기준인 2.5초 이내로 개선했고, Lighthouse Performance 점수도 81점에서 96점으로 높였습니다. 썸네일 한 장의 용량은 0.5~1MB에서 수십 KB 수준으로 줄어 약 94%의 전송량을 줄였습니다. 기존 HMAC 서명 방식과 세션 구조는 그대로 유지했으며, 이미 생성된 강의도 별도의 변환 작업 없이 처음 조회될 때 자동으로 최적화되도록 구현했습니다.'
      },
      {
        title: '음소거 중에도 최근 5분의 음성 구간을 정확하게 유지하도록 개선',
        problem:
        '실시간 코칭에 활용하기 위해 강사의 최근 5분 음성을 서버 메모리에 링버퍼 형태로 저장했습니다. 처음에는 버퍼에 쌓인 오디오 데이터의 크기를 기준으로 최근 5분을 관리했지만, LiveKit에서는 음소거 상태일 때 오디오 프레임 자체가 전달되지 않았습니다. 이 때문에 음소거한 시간만큼 버퍼의 시간도 함께 멈추는 문제가 발생했습니다. 예를 들어 2분 동안 음소거하면 최근 5분을 조회했을 때 실제로는 최대 7분 전의 음성까지 포함될 수 있었습니다.',
        solution:
        '버퍼가 실제 시간의 흐름과 맞도록 음소거로 오디오가 들어오지 않는 구간에는 서버에서 무음 데이터를 채우도록 변경했습니다. 다만 네트워크 지연으로 프레임이 잠시 늦게 도착한 경우까지 무음으로 처리하면 실제 음성 사이에 불필요한 공백이 생길 수 있었습니다. 이를 방지하기 위해 0.5초 미만의 지연은 그대로 기다리고, 그보다 긴 공백만 무음 데이터로 채우도록 기준을 정했습니다. 또한 최근 5분의 음성을 MP3로 변환하는 동안 버퍼 접근이 막히는 문제도 함께 개선했습니다. 기존에는 약 800ms가 걸리는 MP3 변환까지 버퍼를 잠근 상태에서 처리했지만, 필요한 음성 데이터만 먼저 복사한 뒤 바로 잠금을 해제하고 MP3 변환은 별도로 진행하도록 변경했습니다.',
        result:
        '음소거 시간이 길어질수록 커지던 버퍼의 시간 오차를 최대 0.5초 이내로 줄였습니다. 또한 버퍼가 잠기는 시간을 MP3 변환까지 포함한 약 800ms에서 5분 분량의 음성 데이터 28.8MB를 복사하는 약 3ms로 줄여 99% 이상 단축했습니다. 이를 통해 MP3 변환 중에도 새로 들어오는 오디오를 지연 없이 계속 수신할 수 있도록 개선했습니다.'
      },
      {
        title: '챗봇이 참고하는 전사 범위를 질문한 구간으로 줄여 요청 크기 개선',
        problem:
        '리포트의 문장을 드래그해 질문할 수 있는 챗봇을 구현하면서 처음에는 수업 전체 전사를 LLM에 함께 전달했습니다. 하지만 3시간 수업 기준 전사 데이터만 약 180KB까지 커졌고, 요청 크기 제한을 넘는 문제가 발생했습니다. 질문과 관련 없는 내용까지 매번 전달하면서 불필요하게 많은 토큰을 사용하는 문제도 있었습니다.',
        solution:
        '전체 전사를 전달하는 대신 사용자가 드래그한 문장이 수업의 어느 시점에 해당하는지 찾아, 해당 구간과 앞뒤 한 구간의 전사만 DB에서 조회하도록 변경했습니다. 한 구간만 사용하면 문장이 구간 사이에서 끊겼을 때 필요한 설명이 빠질 수 있어 앞뒤 구간까지 포함했고, 최대 3개 구간만 LLM에 전달했습니다. 또한 사용자가 입력한 대화 내용이 아닌 서버에서 조회한 전사만 답변에 참고하도록 해 대화 내용을 임의로 조작해 답변에 영향을 주기 어렵게 했습니다. 외부 LLM에 데이터를 전달할 때는 화자 이름을 별칭으로 변경했고, 드래그한 문장과 연결되는 구간을 찾지 못한 경우에는 수업 전체 요약을 기준으로 답변하도록 처리했습니다.',
        result:
        'LLM에 전달하는 전사를 최대 40개 구간에서 3개 구간으로 줄여 데이터 전달량을 90% 이상 줄였습니다. 그 결과 프롬프트 크기가 LLM 요청 크기 한도의 약 27% 수준으로 줄면서 요청 크기 초과 문제를 해결했고, 질문과 관련된 내용만 전달해 토큰 사용량도 줄일 수 있었습니다. 또한 참여자 여부를 먼저 확인한 뒤 요청 횟수를 검사하도록 순서를 변경해 다른 사용자의 질문 횟수를 소모시키는 문제를 막았습니다. 호출별 토큰 사용량을 기록하고 짧은 시간에 요청이 반복되면 429 응답을 반환하도록 해 과도한 호출에도 대응했습니다.'
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
    award: '삼성 청년 SW·AI 아카데미(SSAFY) 1학기 프로젝트 최우수상',
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
      '프론트엔드 리드로 FE 구조 설계와 구현을 담당했습니다.',
      '미구현 도메인의 API 타입·함수·MSW 핸들러를 먼저 정리해 BE 연동 전에 UI와 로직 개발을 완주했고, 전체 개발 기간을 약 30% 단축했습니다.',
      'FSD 아키텍처의 레이어 구조를 설계하고 팀 전체 컨벤션으로 적용했습니다.',
      'ESLint/Prettier, PR·이슈 템플릿, 코드·커밋 컨벤션을 문서화하여 협업 방식을 표준화했습니다.',
      '쿠키 세션 인증, 그룹 생성·초대 코드 참여, 온보딩, 커리큘럼 투두, 회고·AI 팀장, 알림·운영 로그, 그룹 스페이스 등 핵심 화면을 구현했습니다.',
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
      'Blade',
      'MySQL',
      'Google SMTP',
      'Gabia',
    ],
    highlights: [
      '학과생 이메일 기반 회원가입·로그인과 비밀번호 찾기를 Google SMTP 메일 인증으로 구현했습니다.',
      '스터디룸 예약 생성·조회, 그룹 예약, 최대 4시간 예약 제한, 진행 중 예약 표시를 제공합니다.',
      '예약자에게만 열쇠함 접근 정보를 제공하고, 노출 시간을 10분으로 제한했습니다.',
      '유저·예약·알림·페널티를 관리하는 관리자 페이지와 페널티 가이드라인·알림을 운영합니다.',
      '기능 개선하기 버튼을 통해 사용자 피드백을 반영하고 기능을 지속적으로 개선하고 있습니다.'
    ],
    responsibilities: [
      'PM 겸 풀스택 개발자로 교수님과 이용 기준·물품 관리 수칙을 협의해 정의하고, 학과생 전용 인증 절차를 구현했습니다.',
      '예약·관리자·알림 기능을 구현했습니다.',
      '대면과 상주 인력에 의존하던 운영 방식을 디지털로 전환해 학과의 관리 자원 부담을 줄였습니다.',
      '비대해진 뷰의 유지보수성을 높이기 위해 리팩토링 범위를 정하고, base64 이미지와 인라인 SVG를 분리해 핵심 파일 크기를 82.7KB에서 8.3KB로 약 90% 줄였습니다.',
      '예약 중복, 인증되지 않은 접근, 비정상 요청에 대한 처리 로직을 QA 관점에서 점검·보완하고 운영 시나리오 기반으로 안정화했습니다.',
      '배포 이후 접수된 사용자 문의와 개선 요청을 수집·분석해 실제 이용 환경에 맞게 기능을 개선하고 있습니다.'
    ],
    techReasons: [
      {
        tech: 'Google SMTP',
        reason: '"학과생만 이용 가능해야 한다"는 요구사항을 학과생 이메일 인증(회원가입·비밀번호 찾기)으로 구현하기 위해 도입했습니다.',
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
        '무작정 코드를 분리하기보다 먼저 개선 기준을 정했습니다. Blade 파일은 150줄 이하로 관리하고, base64 이미지는 뷰에 직접 넣지 않으며, 반복해서 사용하는 SVG는 컴포넌트로 분리하도록 기준을 세웠습니다. 이후 base64 이미지는 정적 파일로 분리하고 반복되는 아이콘은 공통 컴포넌트로 변경했습니다. 여러 파일을 한 번에 수정해야 하는 부분은 정규식을 활용하되, 예상한 개수만큼 변경됐는지 확인하는 검증 과정을 추가해 기존 화면의 동작이 달라지지 않도록 했습니다.',
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
      '프론트엔드 개발 팀장으로 관리자 페이지 화면 설계와 데이터 관리 핵심 기능 구현을 담당했습니다.',
      'DataTable 기반 목록, 상세 모달, 파일 업로드·URL 등록 플로우 UI를 구현했습니다.',
      '서버 상태는 TanStack Query, UI·권한 상태는 Zustand로 분리해 상태 관리 책임을 나눴습니다.',
      'Axios 인스턴스를 구성하고 인증 쿠키 전송을 전제로 한 API 통신 레이어를 정리했습니다.',
      'Sentry를 도입해 운영 환경의 런타임 에러를 추적할 수 있는 기반을 마련했습니다.'
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
        '먼저 요청 과정을 확인해 일부 API 호출에서 CSRF 헤더가 빠지고 있는 것을 발견했습니다. 이를 해결하기 위해 Axios 인터셉터에서 요청마다 쿠키의 토큰 값을 읽어 헤더에 넣도록 수정했습니다. 이후에도 403이 발생하는 요청이 있어 Spring Security의 CSRF 처리 과정까지 확인했습니다. 그 결과 서버 내부에서 사용하는 원본 토큰과 클라이언트에 전달하는 XOR 처리 토큰의 흐름이 맞지 않아 검증 과정에서 실패하고 있음을 확인했습니다. XOR 처리를 비활성화하면 Swagger UI의 CSRF 기능이 정상적으로 동작하지 않았기 때문에 보안 설정을 우회하지 않고 기존 구조를 유지했습니다. 프론트엔드는 발급받은 쿠키 값을 요청 헤더에 전달하는 역할만 담당하고, 토큰 생성과 변환, 검증은 Spring Security의 기본 처리 방식에 맡기도록 수정했습니다.',
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
      'Feature-Sliced Design(FSD) 기반으로 auth, course, diary, mapbox, mypage 등 기능별 모듈 구조를 설계하고 구현했습니다.',
      'Zustand + TanStack Query 조합으로 권한 단계(ONBOARDING_REQUIRED, COUPLE_MATCHING_REQUIRED, ROCK_REQUIRED, COMPLETED)에 따른 라우팅 가드와 상태 플로우를 구성했습니다.',
      'Mapbox 연동, 코스 추천·저장·다이어리 작성/댓글/마이페이지 등 주요 화면과 UX를 모두 프론트엔드에서 구현했습니다.'
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
      '동아리장으로서 사이트 정보 구조와 콘텐츠를 기획하고, React + Vite + TypeScript + Tailwind 기반 프론트엔드를 구축했습니다.',
      'Node.js로 간단한 백엔드 API를 구현해 동아리 소개/스터디/프로젝트 데이터를 프론트와 연동했습니다.',
      'ESLint 및 npm 스크립트(dev/build/preview/lint) 구성을 통해 개발 및 코드 품질 관리 플로우를 정리했습니다.'
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
      'Frontend에서 Vite + React + TypeScript 기반 대시보드 UI, 이력서 업로드/분석/로드맵 페이지와 Redux Toolkit 상태(auth, resume, roadmap)를 설계하고 구현했습니다.',
      'Axios 인터셉터를 구성해 인증 토큰 자동 첨부 및 401 응답 공통 처리(세션 초기화/리다이렉트)로 인증 흐름을 정리했습니다.',
      'Backend에서는 기존 Express + MongoDB 코드베이스에서 이력서(Resume) CRUD API 일부를 구현/수정하고, 입력 검증 및 예외 처리 보완에 기여했습니다.'
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

