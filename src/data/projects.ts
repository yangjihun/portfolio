export type TechCategory = 'frontend' | 'backend' | 'fullstack' | 'infra' | 'ai' | 'other';

export interface ProjectLink {
  label: string;
  href: string;
}

export interface TroubleshootingItem {
  title: string;
  body: string;
}

export interface Project {
  id: string;            // slug / route key
  name: string;
  title: string;
  image?: string;        // e.g. "/projects/my-project.png" (place under /public)
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
  troubleshooting?: TroubleshootingItem[]; // 문제 상황과 해결 과정
}

/** "2025.10 ~ 운영중" 같은 period 문자열에서 시작 연월을 정렬용 숫자로 변환 */
const parseStartMonth = (period: string) => {
  const match = period.match(/(\d{4})\.(\d{2})/);
  if (!match) return 0;
  return Number(match[1]) * 12 + Number(match[2]);
};

/** 카드·목록·상세에서 공통으로 쓰는 카테고리 표기 */
export const categoryStyle: Record<TechCategory, { label: string; badge: string }> = {
  frontend:  { label: 'Frontend',  badge: 'bg-primary/10 text-primary border-primary/20' },
  backend:   { label: 'Backend',   badge: 'bg-primary/10 text-primary border-primary/20' },
  fullstack: { label: 'Fullstack', badge: 'bg-primary/10 text-primary border-primary/20' },
  infra:     { label: 'Infra',     badge: 'bg-primary/10 text-primary border-primary/20' },
  ai:        { label: 'AI',        badge: 'bg-primary/10 text-primary border-primary/20' },
  other:     { label: 'Other',     badge: 'bg-primary/5 text-primary/80 border-primary/15' },
};

export const projects: Project[] = [
  {
    id: 'zani',
    name: 'ZANI',
    title: '실시간 집중도 분석 및 개인화 리포트를 제공하는 AI 기반 강의 플랫폼',
    image: '/asset/zani.png',
    period: '2026.07 ~ 2026.08',
    role: 'Fullstack Developer',
    category: 'fullstack',
    summary:
      '실시간 집중도 분석 및 개인화 리포트를 제공하는 AI 기반 강의 플랫폼입니다. 학생 참여도를 브라우저 온디바이스 AI로 판정해 강사에게 실시간 코칭 팁을 주고, 수업 후에는 녹화·전사·참여도를 한 시간축에 겹친 리포트와 복습 클립을 만들어 줍니다. SSAFY 자율 프로젝트 5인 팀에서 풀스택을 담당했습니다.',
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
    highlights: [
      '학생 카메라 영상을 서버로 보내지 않고 브라우저(MediaPipe·ONNX)에서 참여도를 판정하며, 저참여 신호가 익명 집계로 30%를 넘으면 그 시점 강사 발화를 전사해 재설명 팁을 실시간으로 제공합니다.',
      '강사 카메라·마이크·화면공유와 학생별 마이크를 트랙별로 녹화해 화자 분리 전사를 만들고, 수업 후 강사에게는 구간별 참여도·개선 피드백을, 학생에게는 놓친 구간의 복습 클립과 이해도 퀴즈를 제공합니다.',
      '학습 리포트에서 궁금한 문장을 드래그하면 그 시간대 수업 내용을 근거로 답하는 질의응답 챗봇을 제공합니다.',
      'MR마다 Git 컨벤션·DDD 경계를 검사하고 Claude Code가 중복 구현을 검토해 댓글을 남기는 자동 리뷰 파이프라인 위에서 협업했습니다.',
    ],
    responsibilities: [
      '팀 협업 자동화를 구축했습니다 — 브랜치명 기반 커밋 티켓 번호 자동 삽입·컨벤션 검사 훅, 지라 이슈 상태 자동화와 JQL 기반 매일 아침 작업자별 할 일 공지, Claude Code 기반 MR 자동 리뷰 도구.',
      '강사 마이크를 LiveKit Egress WebSocket으로 수신해 세션별 최근 300초 링버퍼에 유지하고, 코칭 트리거 시 해당 구간만 16kHz 다운샘플·MP3 인코딩해 Whisper 전사로 넘기는 실시간 오디오 파이프라인을 구현했습니다.',
      '리포트 질의응답 챗봇을 개발했습니다 — 드래그 앵커를 전사 시간창으로 변환해 근거를 주입하는 백엔드 API(익명화·빈도 제한·토큰 사용량 로깅 포함)와 드래그 즉시 묻는 채팅 드로어·인용 구간 이동 UI까지 전 구간을 만들었습니다.',
      '학생·강사 리포트 API와 플레이어(화자 전사 타임라인·복습 클립·구간 이동), 권한 검증 단기 URL 미디어 서빙, 퀴즈 조회·채점, 리포트 완료 이메일 알림을 구현했습니다.',
      '프론트엔드 초기 세팅(Next.js DDD 4계층, Vitest, TanStack Query·Zustand, OpenAPI 타입 자동 생성)과 12개 전 화면 퍼블리싱·공통 UI 컴포넌트를 담당했습니다.',
    ],
    troubleshooting: [
      {
        title: '음소거 시 링버퍼 시간축 어긋남 — 무음 패딩과 락 분리',
        body: '실시간 코칭에 쓸 강사 음성 최근 300초를 세션별 고정 크기 원형 버퍼(raw PCM)에 유지했습니다. 그런데 LiveKit Egress는 음소거 중에는 프레임을 보내지 않아서, 바이트 수로 계산한 "최근 300초"가 음소거 2분 뒤에는 실제로는 7분 전 시점부터 시작하는 구간이 됐습니다. 예외가 나지 않고 조용히 어긋나는 문제라 추적도 어려웠습니다. 스케줄러가 경과 시간 대비 부족한 바이트를 주기적으로 무음으로 채워 버퍼를 벽시계에 맞췄고, 프레임 도착 지터까지 채우면 발화 중간에 공백이 끼어 전사 품질이 떨어지기 때문에 500ms 미만 어긋남은 채우지 않았습니다. 인코딩 성능 문제도 있었습니다. 5분 구간 MP3 인코딩에 약 800ms가 걸리는데, 이걸 버퍼 락 안에서 하면 초당 96KB로 들어오는 수신 스레드가 그동안 막힙니다. 락 안에서는 구간 복사와 시각 환산만 하고 인코딩은 락 밖으로 옮겨 락 유지 시간을 arraycopy 수준으로 줄였습니다. 버퍼가 세션당 수십 MB라 세션 슬롯에 상한을 두고, 상한을 넘긴 세션은 코칭만 빠진 채 수업·녹화는 정상 진행되게 했습니다.'
      },
      {
        title: '챗봇 근거를 전사 전체가 아닌 드래그 앵커 주변 시간창으로',
        body: '리포트를 드래그해 질문하는 챗봇에서 90분 수업의 전사 전체를 프롬프트에 넣으면 LLM 요청 크기 한도를 넘고 토큰이 낭비됐습니다. 드래그 위치를 리포트 구간에 매핑해 시간 앵커를 만들고, 앵커 주변 시간창의 전사만 DB에서 읽어 근거로 주입하도록 설계했습니다. 근거를 서버가 만들기 때문에 조작된 대화 이력으로 답변을 오염시키는 경로가 구조적으로 막히고, 화자 실명은 별칭으로 치환해 외부 LLM에 개인정보가 나가지 않게 했습니다. 앵커가 없는 드래그(전체 요약 문단)는 전 구간 요약으로 폴백시키고, 참여자 판정을 빈도 제한보다 먼저 수행해 비참여자가 남의 세션 한도를 깎는 악용을 차단했으며, 호출별 토큰 사용량 로깅과 429 빈도 제한으로 운영 안전장치를 붙였습니다.'
      }
    ],
    links: [
      { label: 'GitLab', href: 'https://lab.ssafy.com/s15-webmobile1-sub1/S15P11A105' }
    ]
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
      '프론트엔드 리드로 FE 구조 설계와 구현을 담당했습니다.',
      '미구현 도메인의 API 타입·함수·MSW 핸들러를 먼저 정리해 BE 연동 전에 UI와 로직 개발을 완주했고, 전체 개발 기간을 약 30% 단축했습니다.',
      'FSD 아키텍처의 레이어 구조를 설계하고 팀 전체 컨벤션으로 적용했습니다.',
      'ESLint/Prettier, PR·이슈 템플릿, 코드·커밋 컨벤션을 문서화하여 협업 방식을 표준화했습니다.',
      '쿠키 세션 인증, 그룹 생성·초대 코드 참여, 온보딩, 커리큘럼 투두, 회고·AI 팀장, 알림·운영 로그, 그룹 스페이스 등 핵심 화면을 구현했습니다.',
    ],
    troubleshooting: [],
    links: [
      { label: 'GitHub (FE)', href: 'https://github.com/StudyPot/StudyPot_FE' },
      { label: 'GitHub (BE)', href: 'https://github.com/StudyPot/StudyPot_BE' }
    ]
  },
  // {
  //   id: 'netplus',
  //   name: 'NetPlus',
  //   title: '타임라인 기반 OTT 시청 보조 RAG 챗봇 서비스',
  //   image: '/asset/netplus.png',
  //   period: '2026.02',
  //   role: 'Backend Developer',
  //   category: 'backend',
  //   summary:
  //     '영상 시청 중 놓친 맥락을 현재 시점까지의 자막을 근거로 복원하고, 요약과 Q&A를 제공하는 타임라인 기반 시청 보조 챗봇입니다.',
  //   techTags: [
  //     'Python',
  //     'FastAPI',
  //     'SQLAlchemy',
  //     'PostgreSQL',
  //     'Redis',
  //     'Docker Compose',
  //     'Render',
  //     'RAG'
  //   ],
  //   highlights: [
  //     '시청 시간(current_time_ms) 기준으로 현재 시점까지만 근거를 검색해 스포일러를 구조적으로 차단했습니다.',
  //     '질문 응답과 요약(20초, 1분, 3분)을 타임라인과 함께 제공해 근거 중심의 UX를 구성했습니다.',
  //     '일상 질문과 작품 질문을 의도 분류해 RAG 응답과 일반 대화를 분리했습니다.',
  //     '에피소드 선택 시 Redis 캐시 warmup을 수행하고, 채팅 히스토리 저장과 복원을 지원했습니다.',
  //     '관리자 인제스트로 작품, 에피소드, 자막, 영상 URL, 썸네일을 등록할 수 있는 관리 API를 구성했습니다.'
  //   ],
  //   responsibilities: [
  //     'FastAPI 기반으로 인증, 카탈로그, 인제스트, QA, 요약 API를 설계하고 프론트와 연동했습니다.',
  //     '일상 질문과 작품 질문을 구분하는 의도 분류 로직을 서버에서 구성해 RAG 호출 여부를 분기했습니다.',
  //     'Redis 캐시 키를 에피소드, 시점, 질문 해시 기준으로 설계하고 TTL 전략을 적용해 캐시 재사용률을 높였습니다.',
  //     '스트리밍 QA 엔드포인트를 구성해 응답 대기 시간을 줄이고 사용자 체감 지연을 개선했습니다.',
  //     'LangSmith로 retrieval 결과와 생성 응답을 추적해 품질 저하 케이스를 재현 가능하게 만들었습니다.',
  //     '자막과 메타데이터 인제스트 API를 통해 RAG 대상 데이터를 표준 포맷으로 적재하고 관리할 수 있게 했습니다.',
  //     '[S] RAG 응답이 평균 약 4초로 측정되어 성능 요구사항(3초대)을 만족하지 못했고, 답변 대기 시간이 길어 대화 흐름이 끊길 수 있었습니다.',
  //     '[T] 스포일러 차단과 답변 품질을 유지하면서 응답 시간을 3초대 이하로 낮추고, 체감 대기 시간을 줄이는 것이 목표였습니다.',
  //     '[A] 초기 MVP에서는 복잡도를 줄이기 위해 벡터DB를 제외했지만, PostgreSQL(pgvector) 기반 유사도 검색으로 retrieval 속도를 개선했고, Redis 캐시와 에피소드 warmup으로 반복 질의와 에피소드 단위 데이터를 재사용하도록 구성했습니다. 또한 스트리밍 QA 응답을 제공해 생성 과정의 대기 체감을 완화했습니다.',
  //     '[R] 평균 응답 시간을 2~3초대로 개선해 요구사항을 충족했고, 스트리밍으로 첫 토큰 응답이 빨라져 사용자가 느끼는 지연과 이탈 가능성을 줄였습니다.'
  //   ],
  //   links: [
  //     { label: 'GitHub', href: 'https://github.com/yangjihun/PrimerAI-Hackathon' }
  //   ]
  // },
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
    troubleshooting: [
      {
        title: '학과생 인증에 필요한 개인정보 확보',
        body: '"학과생만 이용 가능해야 한다"는 핵심 요구사항을 구현하려면 학생 이메일 정보가 필요했지만, 교수님께서 개인정보 제공을 우려하셔서 요구사항 충족이 막혀 있었습니다. 회원가입부터 로그인 인증, 서비스 접근 권한 확인까지 이메일이 쓰이는 흐름을 단계별로 정리하고, 말 대신 실제 화면을 볼 수 있는 프로토타입을 만들어 시연했습니다. 개인정보를 무분별하게 쓰는 것이 아니라 학과생 전용 서비스라는 요구사항을 위한 최소한의 정보임을 납득시켜 이메일 정보를 확보했고, 핵심 요구사항을 구현할 수 있었습니다.'
      },
      {
        title: 'Blade 뷰 비대화 — 정량 기준 수립 후 에셋 분리',
        body: '이미지가 base64로, 아이콘이 인라인 SVG로 뷰에 박혀 있어 파일이 비대하고 재사용이 불가능했습니다. 뷰 전체에 base64 5개와 인라인 SVG 54개가 흩어져 있었고 가장 큰 파일은 82.7KB였습니다. "Blade 150줄 이하, base64 인라인 금지, 반복 SVG는 컴포넌트화" 같은 정량 기준을 먼저 문서화한 뒤, 그 기준에 따라 에셋을 정적 파일로 추출하고 반복 아이콘을 컴포넌트로 치환했습니다. 정규식 치환에 교체 개수 검증을 붙여 동작 변경 없이 처리했고, 최대 파일 82.7KB → 8.3KB(-90%), 뷰 전체 base64 5개 → 0개, 인라인 SVG 54개 → 30개가 되었습니다.'
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
    troubleshooting: [
      {
        title: 'CSRF 403 Forbidden — RAW 토큰과 XOR 마스킹 토큰의 혼용',
        body: '로그인 후 /csrf로 토큰을 받아 쿠키의 XSRF-TOKEN을 헤더에 실어 보내는 구조였는데, 일부 POST·PUT·DELETE 요청에서 403 Forbidden이 계속 발생했습니다. 요청 흐름을 추적해 먼저 보호된 요청에 CSRF 헤더가 누락되고 있음을 찾아 Axios 인터셉터에서 매 요청마다 쿠키 값을 헤더에 담도록 수정했습니다. 그래도 남는 403은 백엔드의 Spring Security 설정까지 분석해 원인을 규명했습니다. XorCsrfTokenRequestAttributeHandler를 쓰면 서버에는 RAW 토큰이 저장되고 클라이언트에는 XOR 마스킹된 토큰이 전달돼야 하는데, 실제로는 쿠키에 RAW 토큰이 그대로 담겨 서버가 이를 마스킹된 값으로 보고 디마스킹하면서 검증에 실패하고 있었습니다. XOR 설정을 끄면 프론트 요청은 통과했지만 Swagger UI의 CSRF 동작이 깨져, 우회 대신 책임을 분리하는 방향으로 해결했습니다. 프론트엔드는 쿠키 값을 헤더로 복사하는 역할만 맡고 토큰 생성·마스킹·검증은 Spring Security 기본 흐름에 맡기도록 정리해, 프론트엔드·백엔드·Swagger UI가 동일한 CSRF 규칙을 따르게 만들고 403을 해소했습니다.'
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
  // {
  //   id: 'xrpl-eyes',
  //   name: 'XRPL EYES',
  //   title: 'XRPL 기반 서비스들의 UAW 대시보드',
  //   image: '/asset/xrpl.png',
  //   period: '2025.06 ~ 2025.07',
  //   role: 'Frontend Developer',
  //   category: 'frontend',
  //   summary:
  //     'XRPL 기반 서비스들의 실시간 UAW(Unique Active Wallet) 지표와 공지·요약 정보를 한눈에 볼 수 있는 대시보드 웹앱입니다.',
  //   techTags: [
  //     'React 18',
  //     'TypeScript',
  //     'Vite',
  //     'Tailwind CSS',
  //     'Framer Motion',
  //     'Recharts',
  //     'Radix UI',
  //     'React Router',
  //     'Axios',
  //     'MSW'
  //   ],
  //   highlights: [
  //     'XRPL 프로젝트별 실시간/1h/1d/7d UAW 추이와 전체 합산 UAW를 차트로 시각화합니다.',
  //     '프로젝트 리스트 테이블에서 증감률, 미니 스파크라인, 리뷰 레이블을 한 번에 확인할 수 있습니다.',
  //     '프로젝트 상세 모달에서 UAW 추이 차트와 최신 공지/뉴스 요약을 함께 보여줍니다.'
  //   ],
  //   responsibilities: [
  //     'UAW 차트, 프로젝트 리스트, 상세 모달/공지 카드를 포함한 대시보드 레이아웃을 설계하고 구현했습니다.',
  //     'Recharts와 Tailwind를 이용해 다양한 기간별 UAW 데이터를 차트·스파크라인·테이블로 일관되게 보여주도록 구성했습니다.',
  //     'MSW 기반 목 API 환경을 활용해 백엔드 준비 전에도 mock.html로 대시보드를 개발·테스트할 수 있도록 프론트엔드를 설계했습니다.'
  //   ],
  //   links: [
  //     { label: 'GitHub', href: 'https://github.com/yangjihun/xrpl-eyes' }
  //   ]
  // },
  // {
  //   id: 'sume',
  //   name: 'SuME',
  //   title: '회의 음성 요약 및 캘린더 연동 서비스',
  //   image: '/asset/sume.png',
  //   period: '2025.01 ~ 2025.02',
  //   role: 'Frontend Developer',
  //   category: 'frontend',
  //   summary:
  //     '회의 음성을 STT로 텍스트화하고 LLM으로 요약해서 회의록을 만들고, 요약된 내용을 기반으로 캘린더 일정까지 자동 등록하는 회의 생산성 웹앱입니다.',
  //   techTags: [
  //     'React',
  //     'Tailwind CSS',
  //     'React Router',
  //     'FullCalendar',
  //     'Fetch API'
  //   ],
  //   highlights: [
  //     '회의 음성을 업로드하면 STT 결과 텍스트와 LLM 요약 내용을 한 화면에서 확인할 수 있습니다.',
  //     '요약된 내용에서 회의 제목·설명·시작/종료 시간을 추출해 캘린더 일정으로 자동 반영합니다.',
  //     '로그인/회원가입을 통해 사용자별 회의와 일정을 분리 관리합니다.'
  //   ],
  //   responsibilities: [
  //     '메인 페이지에서 녹음/업로드 영역, 요약 결과 영역, 타이머, 녹음 리스트 등을 포함한 전체 레이아웃을 설계하고 구현했습니다.',
  //     'FullCalendar 기반 캘린더 및 일정 요약 화면, 로그인/회원가입 페이지, 인증이 필요한 라우트를 보호하는 ProtectedRoute를 구현했습니다.',
  //     'API.js로 백엔드와의 통신 로직을 분리하고, Fetch 기반으로 STT·요약·일정 API를 연동했습니다.'
  //   ],
  //   links: [
  //     { label: 'GitHub', href: 'https://github.com/yangjihun/SuME' }
  //   ]
  // },
  // {
  //   id: 'jobpt',
  //   name: 'JOB.PT',
  //   title: '논문·뉴스 트렌드 기반 직업/역량 추천 Streamlit 앱',
  //   image: '/asset/jobpt.png',
  //   period: '2024.11 ~ 2024.12',
  //   role: 'LLM Engineer & Team Leader',
  //   category: 'ai',
  //   summary:
  //     '입력한 관심 분야를 기반으로 RISS 논문·KBS/MBC/SBS 뉴스 트렌드를 수집/요약하고, LLM(Self-Consistency 3회 실행)으로 관련 직업 3개와 필요 역량을 추천하며 잡코리아 채용 링크까지 제공하는 진로 탐색 Streamlit 앱입니다.',
  //   techTags: [
  //     'Python',
  //     'Streamlit',
  //     'OpenAI API (gpt-4o-mini)'
  //   ],
  //   highlights: [
  //     'RISS 논문 크롤링 + 방송사 뉴스 크롤링을 결합해 “최신 트렌드/사회 이슈”를 동시에 반영합니다.',
  //     'LLM을 3회 독립 실행(Self-Consistency)한 뒤 결과를 투표/빈도 기반으로 집계해 상위 직업 3개를 선정합니다.',
  //     '직업별 필요 역량을 함께 제시하고, 잡코리아 공고 링크로 바로 이어지는 리서치 플로우를 제공합니다.'
  //   ],
  //   responsibilities: [
  //     'Self-Consistency 기반 추천 파이프라인을 설계/구현했습니다: 동일 입력에 대해 3회 생성 → 직업 후보 정규화(동의어/표기 통일) → 빈도/가중치 집계로 Top-3를 안정적으로 산출했습니다.',
  //     'LLM 프롬프트를 구조화(필드 고정, 출력 포맷 강제)하여 “직업명/필요역량/근거 키워드”가 일관된 형태로 나오도록 만들고, 파싱 실패/누락을 줄이는 가드레일을 추가했습니다.',
  //     '팀 리더로서 기능 분담(논문/뉴스/잡코리아 크롤러·UI·LLM 모듈), 일정 관리, 코드 리뷰 기준(모듈화/예외처리/상대경로 규칙) 정리 등 개발 프로세스를 주도했습니다.',
  //     '크롤링 결과(txt)와 LLM 입력/출력 흐름을 연결해, 수집 데이터가 추천 결과에 자연스럽게 반영되도록 데이터 전처리(중복 제거, 핵심 키워드 요약)를 정리했습니다.'
  //   ],
  //   links: [
  //     { label: 'GitHub', href: 'https://github.com/yangjihun/JOB.PT' }
  //   ]
  // }
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

