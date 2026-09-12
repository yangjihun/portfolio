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
  kind?: 'design';   // 실제 장애 기록과 구분하는 설계 과제
  cause: string;
  checks: string[];
  steps: string[];
  comparison: { label: string; before: string; after: string }[];
  measurementNote?: string;
}

/** 어떤 기술을 왜 사용했는지 — 상세 페이지 '사용 기술' 섹션에 함께 노출 */
export interface TechReason {
  tech: string;
  reason: string;
  implementation: string;
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
  teamSize: number;      // 참여 인원(본인 포함). 확인 전이면 0으로 두고, 0은 UI에 표시하지 않는다
  summary: string;       // 1~2 sentence summary in Korean
  preview: { features: string; problemSolving: string }; // 카드의 주요 기능과 해결 근거
  techTags: string[];    // short tech stack tags
  category: TechCategory; // main category
  highlights: string[];  // what this project does / 특징
  responsibilities: (string | ResponsibilityToggle)[]; // what I specifically did
  overview: { goal: string; background: string };
  teamRoles: { role: string; detail: string }[];
  contribution: { role: string; core: string[]; impact: string };
  outcomes: string[];
  retrospective: { limitation: string; improvement: string }[];
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
    "id": "zani",
    "preview": {
      "features": "실시간 참여도 분석, 강의 전사·리포트, 문장 기반 질의응답",
      "problemSolving": "긴 전사를 2단계로 검색하고 요청 크기를 제한해 AI 입력 데이터를 약 93% 줄였습니다."
    },
    "name": "ZANI",
    "title": "학생 집중도를 실시간으로 분석하고 맞춤 리포트를 제공하는 AI 강의 플랫폼",
    "image": "/asset/zani.png",
    "period": "2026.07 ~ 2026.08",
    "award": "ZANI · SSAFY 최우수상",
    "role": "Fullstack Developer · Frontend / AI",
    "teamSize": 5,
    "category": "fullstack",
    "summary": "학생이 수업에 얼마나 집중하고 있는지 브라우저 안의 AI로 판정해 강사에게 실시간 코칭 팁을 주고, 수업이 끝나면 녹화·전사·참여도를 같은 시간축에 정리한 리포트와 복습 클립을 만들어 주는 강의 플랫폼입니다.",
    "techTags": [
      "Next.js",
      "React",
      "TypeScript",
      "TanStack Query",
      "Zustand",
      "Spring Boot",
      "Java 21",
      "MySQL",
      "Redis",
      "LiveKit",
      "Whisper · LLM",
      "RAG"
    ],
    "notice": "대외비 정책에 따라 저장소와 상세 코드는 공개하지 않습니다.",
    "highlights": [
      "학생 카메라 영상을 기반으로 수업 참여도를 판정",
      "집중이 떨어진 학생 비율이 집계 기준을 넘으면, 그 시점 강사 발화를 전사해 어떤 내용을 다시 설명하면 좋을지 실시간 팁 제공.",
      "수업이 끝나면 강사는 구간별 참여도와 개선 피드백을, 학생은 놓친 구간의 복습 클립과 이해도 퀴즈를 제공",
      "요약 리포트에서 궁금한 문장을 드래그하면 챗봇이 그 시간대 수업 내용을 근거로 답변을 제공"
    ],
    "responsibilities": [
      {
        "title": "팀 협업 자동화 구축",
        "items": [
          {
            "title": "브랜치명 기반 커밋 자동화 훅",
            "detail": "브랜치명을 읽어 커밋에 티켓 번호를 자동으로 넣고 컨벤션을 검사하는 훅 구축"
          },
          {
            "title": "지라 자동화 봇",
            "detail": "지라 이슈 상태 자동화와 JQL로 매일 아침 작업자별 할 일을 공지하는 봇 구현"
          }
        ]
      },
      {
        "title": "실시간 오디오 파이프라인 구현",
        "items": [
          {
            "title": "오디오 링버퍼 수집",
            "detail": "강사 음성을 LiveKit Egress WebSocket으로 받아 세션마다 최근 300초를 링버퍼에 저장"
          },
          {
            "title": "다운샘플·전사 연동",
            "detail": "코칭이 트리거되면 그 구간만 16kHz로 다운샘플해 MP3로 인코딩한 뒤 Whisper 전사로 넘기는 파이프라인 구현"
          }
        ]
      },
      {
        "title": "리포트 질의응답 챗봇 구현",
        "items": [
          {
            "title": "답변 근거 주입 API",
            "detail": "드래그 위치를 전사 시간창으로 바꿔 답변 근거를 주입하는 API에 익명화와 빈도 제한, 토큰 사용량 로깅 추가"
          },
          {
            "title": "채팅 드로어 UI",
            "detail": "드래그 후 질문할 수 있는 채팅 드로어와 인용 구간으로 바로 이동하는 UI까지 구현"
          }
        ]
      },
      {
        "title": "리포트 API·플레이어 구현",
        "items": [
          {
            "title": "리포트 API·플레이어",
            "detail": "학생·강사 리포트 API와 리포트 플레이어(화자별 전사 타임라인, 복습 클립, 구간 이동) 구현"
          },
          {
            "title": "영상 접근 제어",
            "detail": "녹화 영상은 권한을 확인한 뒤 짧게 유효한 URL로 서빙해 무단 접근 차단"
          }
        ]
      },
      {
        "title": "프론트엔드 초기 세팅 및 퍼블리싱",
        "items": [
          {
            "title": "프론트엔드 아키텍처 세팅",
            "detail": "Next.js에 DDD 4계층 구조를 잡고 Vitest, TanStack Query·Zustand, OpenAPI 타입 자동 생성 구성"
          },
          {
            "title": "화면 퍼블리싱",
            "detail": "12개 전체 화면 퍼블리싱과 공통 UI 컴포넌트 담당"
          }
        ]
      }
    ],
    "techReasons": [
      {
        "tech": "Next.js · React · TypeScript",
        "reason": "강의 플레이어, 전사, 채팅처럼 상호작용이 많은 화면을 모듈로 나누고 API 데이터 구조를 타입으로 관리하기 위해 사용했습니다.",
        "implementation": "DDD 4계층 구조, 공통 UI, 리포트 플레이어와 채팅 드로어를 구성하고 OpenAPI 기반 타입 생성을 연결했습니다."
      },
      {
        "tech": "TanStack Query · Zustand",
        "reason": "강의·리포트 서버 데이터의 수명과 화면 내부 상태의 수명을 분리하기 위해 선택했습니다.",
        "implementation": "서버 데이터 조회·동기화와 UI 상태 관리를 구분해 학습 화면에 연동했습니다."
      },
      {
        "tech": "LiveKit · Whisper",
        "reason": "강의 트랙 수집·녹화와 시점별 음성 전사가 필요했습니다.",
        "implementation": "최근 300초 음성을 링버퍼에 저장하고 필요한 구간을 16kHz로 다운샘플·MP3 변환해 전사했습니다. 음소거 중에는 무음을 보충했습니다."
      },
      {
        "tech": "LLM · RAG",
        "reason": "긴 강의에서 질문에 필요한 근거만 전달하고, 실제 강의 내용을 바탕으로 답하도록 구성하기 위해 적용했습니다.",
        "implementation": "목차·요약 검색 → 실제 전사 추출 → 요청 크기 검증 → 답변 생성 → 실제 전사 인용으로 처리했습니다."
      }
    ],
    "troubleshooting": [
      {
        "title": "긴 강의 전사를 2단계로 검색해 AI 입력 데이터 축소",
        "problem": "약 3시간 강의의 전체 전사가 약 180KB까지 커졌습니다. 선택 문장 주변만 전달하는 초기 대응으로는 멀리 떨어진 구간을 묻는 질문에 대응하기 어려웠습니다.",
        "cause": "전체 전사 전달은 요청 크기를 키우고, 선택 지점 중심의 고정된 검색 범위는 질문에 필요한 다른 구간을 제외했습니다.",
        "checks": [
          "선택 지점 주변 전사도 구간 길이에 따라 요청 예산을 초과할 수 있었습니다.",
          "모델이 만든 인용문 대신 실제 전사와 인용 범위를 검증할 필요가 있었습니다."
        ],
        "steps": [
          "전체 전사 크기 분석",
          "목차·구간 요약 구조화",
          "관련 구간 최대 3개 검색",
          "실제 전사 추출",
          "30분 상한·요청 예산 적용",
          "입력 데이터 재측정"
        ],
        "solution": "목차·요약으로 관련 구간을 찾고 실제 전사를 추가하는 2단계 검색을 적용했습니다. 선택 지점 주변에는 30분 상한을 두고, 최종 요청이 예산을 넘으면 대화 이력과 구간 요약을 단계적으로 축소했습니다. 인용문은 서버의 실제 전사에서 추출했습니다.",
        "comparison": [
          {
            "label": "AI 입력 데이터",
            "before": "전체 전사 약 180KB",
            "after": "약 92.5~93% 감소"
          },
          {
            "label": "검색 범위",
            "before": "선택 문장 주변",
            "after": "선택 지점 + 관련 구간 최대 3개"
          },
          {
            "label": "요청 크기 관리",
            "before": "구간 길이에 따라 초과 가능",
            "after": "최종 크기 검사·단계적 축소"
          },
          {
            "label": "인용 근거",
            "before": "모델 출력에 의존할 수 있음",
            "after": "서버 실제 전사와 범위 검증"
          }
        ],
        "result": "AI 입력 데이터와 요청 크기를 줄이고, 선택 지점 밖의 관련 전사까지 답변 근거로 활용하는 구조를 구현했습니다.",
        "measurementNote": "입력 데이터 감소율은 제공된 프로젝트 기록 기준입니다. 검색 정확도와 모델 답변 품질은 별도 정량 성과로 제시하지 않았습니다."
      },
      {
        "title": "강의 썸네일 용량을 줄여 목록 페이지 로딩 속도 개선",
        "problem": "내 강의실 페이지의 LCP가 3.5초, Performance 점수가 81점에 머물렀습니다. 555×312 카드에 녹화 영상에서 추출한 1280×720 PNG 썸네일을 그대로 넣고 있어 이미지 전송량이 컸습니다.",
        "solution": "썸네일 URL이 요청마다 달라 Next.js 이미지 캐시를 쓰기 어려웠습니다. 그래서 서버에서 원본을 카드 크기에 맞게 줄이고 JPEG로 변환했습니다. 변환한 이미지는 캐시해 다시 쓰고, 원본이 바뀌면 캐시도 함께 갱신했습니다. 첫 화면 밖 썸네일은 지연 로딩으로 바꿨습니다.",
        "result": "LCP는 3.5초에서 1.4초로, Lighthouse Performance 점수는 81점에서 96점으로 개선했습니다. 썸네일 용량도 0.5~1MB에서 수십 KB 수준으로 줄여 전송량을 약 94% 줄였습니다.",
        "cause": "555×312 카드에 1280×720 PNG를 그대로 사용했고, 요청마다 달라지는 URL 때문에 이미지 캐시 재사용이 어려웠습니다.",
        "checks": [
          "원본 변경 시 캐시 갱신과 첫 화면 밖 이미지의 로딩 시점을 함께 점검했습니다."
        ],
        "steps": [
          "LCP·이미지 요청 분석",
          "카드 크기로 리사이즈",
          "JPEG 변환·캐시",
          "화면 밖 이미지 지연 로딩",
          "Lighthouse 재측정"
        ],
        "comparison": [
          {
            "label": "LCP",
            "before": "3.5초",
            "after": "1.4초"
          },
          {
            "label": "Lighthouse Performance",
            "before": "81점",
            "after": "96점"
          },
          {
            "label": "썸네일 전송량",
            "before": "0.5~1MB",
            "after": "수십 KB · 약 94% 감소"
          }
        ]
      },
      {
        "title": "음소거 중에도 최근 5분의 음성 구간을 정확하게 유지하도록 개선",
        "problem": "실시간 코칭을 위해 강사의 최근 5분 음성을 링버퍼에 저장했습니다. 하지만 LiveKit에서는 음소거 중 오디오 프레임이 오지 않아, 실제 최근 5분이 아니라 음성이 들어온 시간만 따진 최근 5분이 조회됐습니다.",
        "solution": "버퍼 시간이 실제 시간과 맞도록 0.5초 이상 오디오가 비면 서버에서 무음 데이터를 채웠습니다. 짧은 네트워크 지연은 기다리고, 긴 공백만 보정해 불필요한 무음 삽입을 줄였습니다. MP3 변환은 필요한 음성만 먼저 복사한 뒤 락 밖에서 진행했습니다.",
        "result": "버퍼 시간 오차를 최대 0.5초 이내로 줄였습니다. 버퍼 락 점유 시간도 약 800ms에서 3ms로 줄여, MP3 변환 중에도 새 오디오를 지연 없이 받을 수 있게 했습니다.",
        "cause": "음소거 중 오디오 프레임이 오지 않아 버퍼가 실제 경과 시간 대신 수신한 음성 길이만 누적했습니다.",
        "checks": [
          "짧은 네트워크 지연을 음소거로 오인하지 않도록 0.5초 기준을 적용했습니다.",
          "MP3 인코딩 중 락이 오디오 수집을 막는지도 확인했습니다."
        ],
        "steps": [
          "음소거 재현",
          "수신 시간·실제 시간 비교",
          "긴 공백에 무음 삽입",
          "인코딩을 락 밖으로 분리",
          "시간 오차·락 점유 확인"
        ],
        "comparison": [
          {
            "label": "버퍼 시간 기준",
            "before": "수신한 음성 길이",
            "after": "실제 시간 · 오차 최대 0.5초"
          },
          {
            "label": "락 점유 시간",
            "before": "약 800ms",
            "after": "약 3ms"
          }
        ]
      }
    ],
    "links": [],
    "overview": {
      "goal": "실시간 수업 참여도를 파악하고, 강의 음성·전사 데이터를 활용해 학습자가 놓친 내용을 복습하고 질문할 수 있는 학습 환경을 구현했습니다.",
      "background": "긴 온라인 강의에서는 필요한 내용을 다시 찾기 어렵습니다. 전체 전사를 AI에 전달하면 요청이 커지고, 선택 문장 주변만 전달하면 다른 구간에 있는 답을 찾기 어려웠습니다."
    },
    "teamRoles": [
      {
        "role": "Frontend",
        "detail": "강의·리포트 화면과 전사, 복습, 질의응답 인터랙션 구현"
      },
      {
        "role": "Backend",
        "detail": "사용자·강의·전사 데이터 관리, 실시간 오디오 처리 및 API 개발"
      },
      {
        "role": "AI",
        "detail": "참여도 분석, STT 전사, 강의 요약 및 질의응답 기능 개발"
      },
      {
        "role": "본인 · Fullstack",
        "detail": "프론트엔드 화면 구조, 리포트 API·플레이어, 오디오 파이프라인, RAG 질의응답 개발"
      }
    ],
    "contribution": {
      "role": "강의 화면부터 리포트 API와 AI 입력 데이터 처리까지 연결해 전사·복습·질의응답을 하나의 학습 흐름으로 구현했습니다.",
      "core": [
        "Next.js에 DDD 4계층 구조를 구성하고 12개 화면과 공통 UI를 구현했습니다. TanStack Query·Zustand와 OpenAPI 타입 자동 생성으로 서버 데이터와 화면 상태를 분리했습니다.",
        "목차·구간 요약으로 관련 구간을 최대 3개 선별한 뒤 실제 전사를 가져오는 2단계 검색을 설계했습니다. 선택 지점 주변 전사는 최대 30분으로 제한했습니다.",
        "요청 크기 예산을 넘으면 대화 이력과 구간 요약을 순서대로 축소하고, 인용은 서버에 저장된 실제 전사에서 추출·검증했습니다.",
        "LiveKit 음소거 구간을 무음 데이터로 보정하고, 썸네일 크기·포맷·로딩 방식을 개선했습니다."
      ],
      "impact": "긴 강의의 AI 입력 데이터를 약 92.5~93% 줄이면서 선택 지점 밖의 관련 내용도 검색할 수 있도록 했습니다. 사용자가 인용 구간으로 이동해 답변 근거를 확인할 수 있게 했습니다."
    },
    "outcomes": [
      "AI 입력 데이터 약 92.5~93% 감소 및 관련 구간 2단계 검색 구현",
      "LCP 3.5초 → 1.4초, Lighthouse Performance 81점 → 96점",
      "오디오 버퍼 시간 오차 최대 0.5초, 락 점유 약 800ms → 3ms",
      "실제 전사 인용과 구간 이동으로 답변 근거를 확인하는 학습 흐름 구현"
    ],
    "retrospective": [
      {
        "limitation": "입력 데이터 크기 개선만으로 검색 결과의 정확도와 답변 품질을 설명하기는 어렵습니다.",
        "improvement": "질문·정답 평가셋을 구성하고 Retrieval Recall@K, Faithfulness, 응답 시간, Token Usage를 함께 비교할 계획입니다."
      },
      {
        "limitation": "화면 성능의 개선 전후 기록을 장기적인 사용자 환경 변화와 연결할 필요가 있습니다.",
        "improvement": "개발 단계부터 Web Vitals를 수집하고 강의 수·기기·네트워크 조건별 LCP를 추적할 계획입니다."
      }
    ]
  },
  {
    "id": "studypot",
    "preview": {
      "features": "그룹 생성·참여, AI 커리큘럼·회고와 스터디 운영 관리",
      "problemSolving": "API 계약과 MSW로 연동 대기를 줄이고 프론트엔드를 선행 개발해 전체 개발 기간을 약 30% 단축했습니다."
    },
    "name": "StudyPot",
    "title": "AI 팀장이 운영을 보조하는 스터디 그룹 관리 플랫폼",
    "image": "/asset/studypot.png",
    "period": "2026.01 ~ 2026.06",
    "role": "Frontend Lead (기획 · FE 설계)",
    "teamSize": 2,
    "category": "frontend",
    "award": "StudyPot · SSAFY 최우수상",
    "summary": "스터디장에게 몰리는 운영 부담과 팀원 간 의사결정·합의 병목을 줄이기 위해, AI 팀장이 커리큘럼·회고·규칙 운영을 대신 챙겨주는 스터디 관리 플랫폼입니다.",
    "techTags": [
      "Vue 3",
      "TypeScript",
      "Vite",
      "Pinia",
      "Tailwind CSS",
      "FSD",
      "Axios",
      "MSW",
      "Playwright",
      "Netlify"
    ],
    "highlights": [
      "그룹 생성과 초대 코드 참여부터 온보딩(스터디 목표·세부 키워드 설정)까지 스터디 개설 흐름을 하나로 연결했습니다.",
      "커리큘럼 Todo, 회고, AI 팀장 답변(마크다운 렌더링) 등 스터디 운영을 AI가 관리하도록 구성했습니다.",
      "그룹 규칙과 위반 관리, 알림·운영 로그, 그룹 스페이스(게시판·마이페이지)까지 운영에 필요한 기능을 갖췄습니다.",
      "FSD(pages/entities/features/shared/widgets) 레이어로 도메인 경계를 설계해 팀원 간 작업 충돌을 줄였습니다."
    ],
    "responsibilities": [
      {
        "title": "FE 구조·컨벤션 설계",
        "items": [
          {
            "title": "FE 구조 설계·구현 총괄",
            "detail": "프론트엔드 리드로 FE 구조 설계와 구현 담당"
          },
          {
            "title": "FSD 레이어 구조 설계·적용",
            "detail": "FSD 아키텍처의 레이어 구조 설계 및 팀 전체 컨벤션 적용"
          },
          {
            "title": "협업 컨벤션 문서화",
            "detail": "ESLint/Prettier, PR·이슈 템플릿, 코드·커밋 컨벤션을 문서화해 협업 방식 표준화"
          }
        ]
      },
      {
        "title": "MSW 기반 선행 개발로 일정 단축",
        "items": [
          {
            "title": "MSW 기반 선행 개발",
            "detail": "미구현 도메인의 API 타입·함수·MSW 핸들러를 먼저 정리해 BE 연동 전에 UI와 로직 개발 완주"
          },
          {
            "title": "개발 기간 단축 성과",
            "detail": "이 선행 작업으로 전체 개발 기간 약 30% 단축"
          }
        ]
      },
      {
        "title": "핵심 화면 구현",
        "items": [
          {
            "title": "쿠키 세션 인증",
            "detail": "쿠키 세션 인증 화면 구현"
          },
          {
            "title": "그룹 생성·초대 코드 참여",
            "detail": "그룹 생성과 초대 코드 참여 화면 구현"
          },
          {
            "title": "온보딩",
            "detail": "온보딩 화면 구현"
          },
          {
            "title": "커리큘럼 투두",
            "detail": "커리큘럼 투두 화면 구현"
          },
          {
            "title": "회고·AI 팀장",
            "detail": "회고와 AI 팀장 화면 구현"
          },
          {
            "title": "알림·운영 로그",
            "detail": "알림과 운영 로그 화면 구현"
          },
          {
            "title": "그룹 스페이스",
            "detail": "그룹 스페이스 화면 구현"
          }
        ]
      }
    ],
    "techReasons": [
      {
        "tech": "Vue 3 · TypeScript",
        "reason": "스터디 운영 흐름을 컴포넌트로 나누고 API 계약을 타입으로 표현하기 위해 사용했습니다.",
        "implementation": "그룹·온보딩·커리큘럼·회고 화면과 쿠키 세션 기반 인증 연동을 구현했습니다."
      },
      {
        "tech": "FSD",
        "reason": "인증, 그룹, 스터디 운영 기능의 경계와 의존 방향을 명확하게 관리하기 위해 적용했습니다.",
        "implementation": "pages, widgets, features, entities, shared 레이어로 코드를 배치하고 팀 컨벤션에 반영했습니다."
      },
      {
        "tech": "MSW",
        "reason": "백엔드 API가 완성되기 전에 실제 요청 형태로 화면과 로직을 개발하기 위해 사용했습니다.",
        "implementation": "API 타입·함수와 목 핸들러를 먼저 구성해 연동 대기 없이 프론트엔드를 구현했습니다."
      },
      {
        "tech": "Pinia · Axios",
        "reason": "공유 상태와 API 요청 처리를 화면 코드에서 구분하기 위해 사용했습니다.",
        "implementation": "Vue의 공유 상태와 HTTP 요청 계층을 구성하고 인증·그룹 운영 API를 연결했습니다."
      }
    ],
    "troubleshooting": [
      {
        "title": "API 계약과 MSW로 백엔드 연동 대기 해소",
        "problem": "2인 팀에서 프론트엔드가 미구현 API를 기다리면 화면 개발과 기능 검증까지 순차적으로 밀리는 병목이 있었습니다.",
        "cause": "화면과 사용자 흐름이 서버 응답 형태에 의존해 실제 API 없이는 기능을 이어서 구현하기 어려웠습니다.",
        "checks": [
          "목 응답이 실제 API 계약과 달라지지 않도록 요청·응답 타입과 함수를 함께 정리해야 했습니다."
        ],
        "steps": [
          "미구현 도메인 정리",
          "API 계약 합의",
          "요청·응답 타입 작성",
          "MSW 핸들러 구성",
          "UI·로직 선행 개발",
          "실제 API 연동"
        ],
        "solution": "미구현 도메인의 API 타입과 호출 함수, MSW 핸들러를 먼저 정리했습니다. 같은 요청 경로로 목 응답을 받아 UI와 로직 개발을 진행한 뒤 실제 서버에 연동했습니다.",
        "comparison": [
          {
            "label": "개발 흐름",
            "before": "API 구현 후 화면 연동",
            "after": "API 계약 기반 병렬 개발"
          },
          {
            "label": "개발 중 응답",
            "before": "미구현 API 응답 대기",
            "after": "MSW 핸들러로 선행 검증"
          },
          {
            "label": "개발 기간",
            "before": "기존 진행 방식 기준",
            "after": "약 30% 단축"
          }
        ],
        "result": "프론트엔드 UI와 로직 개발을 백엔드 연동 전에 마치고, 2인 팀에서 전체 개발 기간을 약 30% 줄였습니다.",
        "measurementNote": "개발 기간 단축률은 기존 프로젝트 기록 기준이며, 별도의 작업 시간 측정 로그는 제시하지 않습니다."
      }
    ],
    "links": [
      {
        "label": "GitHub (FE)",
        "href": "https://github.com/StudyPot/StudyPot_FE"
      },
      {
        "label": "GitHub (BE)",
        "href": "https://github.com/StudyPot/StudyPot_BE"
      }
    ],
    "overview": {
      "goal": "스터디장에게 집중되는 운영 업무와 팀원 간 의사결정 부담을 줄이는 스터디 관리 플랫폼을 구현했습니다.",
      "background": "일정·커리큘럼 관리, 참여 확인, 회고와 규칙 운영이 메신저와 수작업에 흩어져 있으면 운영 부담이 스터디장에게 집중됩니다."
    },
    "teamRoles": [
      {
        "role": "Frontend Lead · 본인, 1명",
        "detail": "서비스 기획과 Vue 기반 프론트엔드 구조·화면, API 연동"
      },
      {
        "role": "Backend, 1명",
        "detail": "Spring 기반 API, 인증·인가 및 MySQL 데이터 처리 담당"
      }
    ],
    "contribution": {
      "role": "2인 팀에서 서비스 기획과 프론트엔드 설계·구현 전반을 맡고, API 계약을 먼저 정리해 백엔드 개발과 병렬로 진행했습니다.",
      "core": [
        "Vue 3·TypeScript 기반으로 FSD 레이어와 기능별 경계를 구성했습니다.",
        "미구현 도메인의 API 타입·함수·MSW 핸들러를 먼저 작성해 UI와 로직 개발을 진행했습니다.",
        "쿠키 세션 인증, 그룹 생성·초대 코드 참여, 온보딩, 커리큘럼 Todo, 회고와 AI 팀장 화면을 구현했습니다.",
        "코드·커밋 컨벤션과 PR·이슈 템플릿을 정리해 2인 팀의 작업 기준을 맞췄습니다."
      ],
      "impact": "백엔드 구현을 기다리는 구간을 줄이고 프론트엔드 개발을 선행했습니다. 기존 프로젝트 기록 기준 전체 개발 기간을 약 30% 단축했습니다."
    },
    "outcomes": [
      "2인 팀에서 서비스 기획과 프론트엔드 구조·핵심 화면 구현 주도",
      "API 타입·MSW 기반 선행 개발로 전체 개발 기간 약 30% 단축",
      "그룹 생성부터 커리큘럼·회고·규칙 관리까지 스터디 운영 흐름 구현"
    ],
    "retrospective": [
      {
        "limitation": "목 API로 정상 흐름을 확인해도 실제 서버의 쿠키·권한·예외 처리는 별도로 검증해야 합니다.",
        "improvement": "API 계약 변경 시 목 핸들러도 함께 갱신하고 로그인 → 그룹 참여 → 운영 기능까지 Playwright 시나리오로 확장할 계획입니다."
      },
      {
        "limitation": "기능 완성만으로 스터디장의 실제 운영 부담이 얼마나 줄었는지 설명하기 어렵습니다.",
        "improvement": "그룹 개설 완료율과 운영 기능 사용 흐름을 측정해 사용자 행동을 기준으로 개선 우선순위를 정할 계획입니다."
      }
    ]
  },
  {
    "id": "netplus",
    "preview": {
      "features": "시청 시점 기반 질의응답·요약과 실제 자막 근거 제공",
      "problemSolving": "질문 분기와 pgvector 정렬, Redis 자막 캐싱으로 응답 시간을 약 4~5초에서 2~3초로 줄이고, SSE 스트리밍으로 첫 답변까지의 대기를 더 줄였습니다."
    },
    "name": "NetPlus",
    "title": "스포일러를 줄이는 타임라인 기반 OTT 시청 보조 RAG 챗봇",
    "image": "/asset/netplus.png",
    "period": "2026.02",
    "role": "Backend Developer · AI Backend / Frontend",
    "teamSize": 2,
    "category": "backend",
    "summary": "현재 회차와 시청 시간까지의 자막을 근거로 놓친 맥락과 인물 관계를 설명하는 OTT 시청 보조 챗봇입니다. 질문 분기와 pgvector 정렬, Redis 자막 캐싱으로 응답 시간을 줄이고, 서버에서 근거의 회차·시점을 다시 검증합니다. 답변은 SSE로 진행 상태와 생성 토큰을 순서대로 전달합니다.",
    "techTags": [
      "Python",
      "FastAPI",
      "SSE",
      "Redis",
      "RAG",
      "SQLAlchemy",
      "PostgreSQL",
      "pgvector",
      "Docker Compose",
      "OpenAI API",
      "LangSmith",
      "Render",
      "React"
    ],
    "overview": {
      "goal": "사용자가 현재까지 시청한 내용을 바탕으로 질문에 답하고, 놓친 맥락을 타임라인과 자막 근거로 복구할 수 있도록 구현했습니다.",
      "background": "이어보기나 잠깐의 주의 분산으로 대사를 놓치면 되감기가 필요합니다. 외부 검색이나 일반 챗봇을 사용하면 아직 보지 않은 내용이 답변에 포함될 위험이 있습니다."
    },
    "highlights": [
      "현재 에피소드와 current_time_ms를 기준으로 작품 질의응답 및 RAG 검색",
      "20초·1분·3분 프리셋과 일반·인물 중심·갈등 중심 모드의 요약, 질문별 기준 시점·자막 근거 제공",
      "일상 질문과 작품 질문 분기, 질문 스타일 반영 및 채팅 기록 저장·복원",
      "SSE 스트리밍으로 질문 분석·근거 검색·답변 생성 진행 상태와 생성 토큰을 순서대로 전달",
      "에피소드 선택 시 Redis 자막 청크 사전 적재와 TTL 캐싱",
      "작품·에피소드·자막·영상 URL·썸네일을 등록하고 삭제하는 관리자 인제스트 API"
    ],
    "responsibilities": [
      {
        "title": "API와 데이터 처리",
        "items": [
          {
            "title": "FastAPI REST API",
            "detail": "인증, 카탈로그, 인제스트, 질의응답, 요약, 채팅 기록 API를 설계하고 프론트엔드와 연동"
          },
          {
            "title": "인증",
            "detail": "회원가입·로그인 API와 JWT 발급, PBKDF2 기반 비밀번호 해싱 처리"
          },
          {
            "title": "PostgreSQL · SQLAlchemy",
            "detail": "작품·에피소드·자막 등 관계형 데이터 조회와 처리"
          },
          {
            "title": "인제스트 API",
            "detail": "작품·에피소드·자막 일괄 등록과 영상·썸네일 업로드 서명 발급, 등록 후 자막 청크 생성과 캐시 갱신"
          },
          {
            "title": "개발 환경",
            "detail": "Docker Compose로 API·PostgreSQL 실행 환경 구성"
          }
        ]
      },
      {
        "title": "RAG 검색·검증과 캐싱",
        "items": [
          {
            "title": "질문 분기",
            "detail": "규칙 기반으로 일반 질문과 작품 질문을 나눠 작품 질문에 RAG 실행"
          },
          {
            "title": "pgvector 유사도 검색",
            "detail": "별도 벡터 DB 없이 PostgreSQL pgvector 확장으로 현재 시점 이전 자막 청크를 코사인 거리순으로 조회하고, 확장이 없는 환경에서는 Redis 캐시·최근 자막 조회로 자동 대체"
          },
          {
            "title": "시청 범위 검증",
            "detail": "회차와 현재 시점으로 검색 범위를 제한하고 실제 자막 근거를 서버에서 재검증"
          },
          {
            "title": "Redis 자막 캐싱",
            "detail": "에피소드별 자막 청크 TTL 캐싱, 선택 시 사전 적재 및 캐시가 없을 때 DB 조회"
          }
        ]
      },
      {
        "title": "응답 전달과 품질 관찰",
        "items": [
          {
            "title": "SSE 스트리밍",
            "detail": "질의응답을 SSE로 전달해 질문 분석·근거 검색·답변 생성 진행 상태와 생성 토큰을 먼저 보내고, 완료 시 근거가 포함된 최종 응답 전달"
          },
          {
            "title": "LangSmith 추적",
            "detail": "OpenAI 클라이언트를 LangSmith로 감싸고 질의응답·요약 파이프라인을 하나의 trace로 묶어 검색 결과와 생성 응답을 단계별로 추적"
          },
          {
            "title": "응답 스타일 제어",
            "detail": "톤·길이 스타일 옵션을 프롬프트 지시로 반영하고, 일상 대화는 자막·검색을 언급하지 않도록 분리"
          }
        ]
      },
      {
        "title": "시청 화면 프론트엔드",
        "items": [
          {
            "title": "시청 화면·챗봇 패널",
            "detail": "React·TypeScript(Vite)로 시청 화면과 챗봇 패널을 구현하고, SSE 이벤트를 읽어 진행 상태와 생성 토큰을 순서대로 표시"
          },
          {
            "title": "API 연동 계층",
            "detail": "요청·응답 타입과 API 클라이언트를 한곳에 정리해 인증·카탈로그·질의응답·요약·인제스트 호출 관리"
          },
          {
            "title": "관리자 화면·사이드바",
            "detail": "작품·에피소드·자막을 등록하는 관리자 화면과 에피소드 탐색 사이드바 구현, 반응형 레이아웃 적용"
          }
        ]
      }
    ],
    "teamRoles": [
      {
        "role": "Frontend",
        "detail": "로그인·회원가입·탐색·요금제 화면과 요약 패널, 공용 UI 컴포넌트 구현"
      },
      {
        "role": "Backend / AI · 본인",
        "detail": "FastAPI API 서버, RAG 검색·검증·캐싱·스트리밍, 시청 화면·챗봇 패널"
      }
    ],
    "contribution": {
      "role": "질문 수신부터 검색 범위 설정, 데이터 조회, 근거 검증, AI 응답 스트리밍까지 이어지는 백엔드 흐름을 담당했고, 시청 화면과 챗봇 패널, API 연동 계층도 직접 구현해 스트리밍 응답이 화면까지 이어지게 했습니다.",
      "core": [
        "사용자 질문에 에피소드와 현재 시청 시간을 결합하고, 일반 질문은 작품 검색 흐름에서 분리했습니다.",
        "자막 청크 유사도 정렬을 PostgreSQL pgvector 쿼리로 옮기고, 회차·시간을 제한한 뒤 반환 근거의 실제 자막 ID·회차·시점을 다시 확인했습니다.",
        "에피소드별 자막 청크를 Redis에 저장하고 에피소드 선택 시 미리 적재했습니다. 캐시가 없으면 DB 조회로 이어지게 했습니다.",
        "질의응답을 SSE로 전달해 진행 상태와 생성 토큰을 먼저 보내고, LangSmith로 검색·생성 단계를 추적할 수 있게 했습니다.",
        "시청 화면·챗봇 패널과 API 연동 계층을 구현해 SSE 이벤트가 순서대로 화면에 반영되게 했습니다.",
        "근거가 없을 때는 단정적인 답변을 완화하고 확인 가능한 자막이 부족하다는 응답으로 처리했습니다."
      ],
      "impact": "반복 자막 조회와 불필요한 RAG 실행을 줄여 응답 시간을 약 4~5초에서 2~3초로 단축했고, SSE 스트리밍으로 첫 토큰이 먼저 도착해 체감 대기도 줄였습니다. 시청 이후 자막이나 다른 회차의 자막이 응답 근거에 포함될 위험을 줄였습니다."
    },
    "techReasons": [
      {
        "tech": "FastAPI · Python",
        "reason": "API와 Python 기반 AI 처리 로직을 같은 환경에서 구성하기 위해 사용했습니다.",
        "implementation": "질의응답·요약·채팅 기록 API를 제공하고 질문 분기, 검색, 응답 검증의 책임을 분리했습니다. 질의응답은 StreamingResponse 기반 SSE 엔드포인트로도 제공했습니다."
      },
      {
        "tech": "PostgreSQL · pgvector · SQLAlchemy",
        "reason": "작품·에피소드·자막처럼 관계가 명확하고 시점 조건으로 조회해야 하는 데이터를 관리하면서, 별도 벡터 DB 없이 유사도 정렬까지 같은 DB에서 처리하기 위해 사용했습니다.",
        "implementation": "자막 청크의 임베딩 컬럼을 vector 타입으로 바꾸고 ivfflat 코사인 인덱스를 추가해, 에피소드 ID와 시청 시각 조건에 맞는 청크를 거리순으로 가져오도록 했습니다. 인용 자막 ID는 실제 DB 데이터와 대조했습니다."
      },
      {
        "tech": "Redis",
        "reason": "같은 에피소드의 자막 청크가 반복 조회되는 비용을 줄이기 위해 사용했습니다.",
        "implementation": "에피소드별 청크 TTL 캐시(기본 30분)와 선택 시 사전 적재를 구현하고, 자막을 새로 등록하면 캐시를 비운 뒤 다시 적재했습니다. 캐시가 없으면 DB를 조회했습니다."
      },
      {
        "tech": "RAG · OpenAI API",
        "reason": "일반적인 모델 지식보다 현재 시점까지 확인 가능한 자막을 근거로 답하도록 구성하기 위해 적용했습니다.",
        "implementation": "작품 질문에 검색을 수행하고 실제 자막 근거를 조합해 응답을 생성했습니다. 반환 근거의 회차·시각을 다시 검증하고, 답변 생성은 스트리밍으로 받아 토큰 단위로 전달했습니다."
      },
      {
        "tech": "SSE (Server-Sent Events)",
        "reason": "생성이 끝날 때까지 빈 화면을 보여주는 대신, 진행 상태와 답변을 도착하는 대로 보여주기 위해 사용했습니다.",
        "implementation": "워커 스레드가 파이프라인을 실행하면서 status·token·done·error 이벤트를 큐에 넣고, StreamingResponse가 text/event-stream으로 흘려보내도록 구성했습니다. 프록시 버퍼링을 막는 헤더도 함께 설정했습니다."
      },
      {
        "tech": "LangSmith",
        "reason": "응답 품질이 떨어졌을 때 검색과 생성 중 어느 단계가 원인인지 재현해 확인하기 위해 사용했습니다.",
        "implementation": "OpenAI 클라이언트를 wrap_openai로 감싸고 질의응답·요약 파이프라인에 traceable을 적용해 입력, 검색 결과, 생성 응답을 한 trace로 묶었습니다."
      },
      {
        "tech": "Docker Compose",
        "reason": "API와 관계형 DB의 로컬 실행 조건을 맞추기 위해 사용했습니다.",
        "implementation": "API·PostgreSQL 서비스를 정의하고 DB 준비 후 마이그레이션과 API 서버가 실행되도록 구성했습니다."
      }
    ],
    "troubleshooting": [
      {
        "title": "질문 분기·pgvector 정렬·캐싱·스트리밍으로 응답 지연 개선",
        "problem": "챗봇 응답에 약 4~5초가 걸려 3초대 응답이라는 성능 요구를 넘겼습니다. 같은 에피소드의 자막을 매 요청마다 다시 조회했고, 검색이 필요 없는 일상 질문에도 RAG가 실행될 수 있었습니다. 답변이 끝날 때까지 화면에 아무것도 보이지 않아 대화 흐름도 끊겼습니다.",
        "cause": "자막 청크를 모두 애플리케이션으로 가져와 점수를 매기는 구조라 조회와 정렬 비용이 매 요청에 들어갔고, 질문 유형과 상관없이 같은 경로를 탔습니다. 응답도 생성이 끝난 뒤 한 번에 내려줬습니다.",
        "checks": [
          "캐시에서 가져온 자막도 현재 시청 시점 이후의 정보를 포함하지 않도록 검증해야 했습니다.",
          "캐시가 없거나 비활성화된 경우에도 DB 조회로 요청을 처리해야 했습니다.",
          "pgvector 확장이 없는 환경에서도 같은 요청이 동작해야 했습니다."
        ],
        "steps": [
          "API 응답 흐름 분석",
          "일반·작품 질문 분기",
          "pgvector 거리순 정렬",
          "자막 청크 Redis 캐싱",
          "에피소드 선택 시 사전 적재",
          "SSE 스트리밍 전환",
          "시청 범위 재검증",
          "응답 시간 비교"
        ],
        "solution": "작품 질문에만 RAG를 수행하도록 분기하고, 자막 청크 유사도 정렬을 PostgreSQL pgvector 쿼리로 옮겨 현재 시점 이전 청크만 거리순으로 가져오게 했습니다. 에피소드별 자막 청크에는 TTL 캐시와 선택 시 사전 적재를 적용했고, 확장이 없는 환경에서는 캐시와 최근 자막 조회로 자동 대체되게 했습니다. 마지막으로 질의응답을 SSE로 바꿔 진행 상태와 생성 토큰을 먼저 보내되, 근거의 회차·시점 검증은 그대로 유지했습니다.",
        "comparison": [
          {
            "label": "응답 시간",
            "before": "약 4~5초",
            "after": "약 2~3초"
          },
          {
            "label": "응답 시간 단축률",
            "before": "기준",
            "after": "약 40~50%"
          },
          {
            "label": "RAG 실행",
            "before": "불필요한 실행 가능",
            "after": "작품 질문에 실행"
          },
          {
            "label": "유사도 정렬",
            "before": "전체 청크를 가져와 애플리케이션에서 점수 계산",
            "after": "pgvector 쿼리에서 거리순 조회"
          },
          {
            "label": "자막 조회",
            "before": "동일 데이터 반복 조회",
            "after": "Redis 캐싱·사전 적재"
          },
          {
            "label": "응답 전달",
            "before": "생성 완료 후 일괄 전달",
            "after": "SSE로 진행 상태·토큰 순차 전달"
          },
          {
            "label": "답변 근거",
            "before": "검색 결과 활용",
            "after": "실제 자막의 회차·시각 재검증"
          }
        ],
        "result": "응답 시간을 약 40~50% 줄여 3초대 요구를 맞추고, 첫 토큰이 먼저 도착해 체감 대기도 줄였습니다. 현재 시점까지의 자막을 근거로 설명하는 흐름은 그대로 유지했습니다.",
        "measurementNote": "응답 시간과 단축률은 제공된 프로젝트 기록의 근사치입니다. p95 지연 시간, 캐시 적중률, DB 조회 시간, 첫 토큰 도착 시간은 별도로 측정하지 않았습니다."
      }
    ],
    "outcomes": [
      "응답 시간 약 4~5초 → 2~3초, 약 40~50% 단축",
      "작품 질문에 한정한 RAG 실행, pgvector 유사도 정렬과 Redis 자막 청크 캐싱 구현",
      "SSE 스트리밍으로 진행 상태와 답변을 순차 전달해 첫 응답까지의 체감 대기 단축",
      "회차·시청 시각 검증 및 실제 자막 기반 인용으로 스포일러 위험 감소",
      "LangSmith로 질의응답·요약 파이프라인의 검색·생성 단계 추적 구성",
      "인증·요약·채팅 기록·인제스트를 포함한 시청 보조 백엔드 API 구성"
    ],
    "retrospective": [
      {
        "limitation": "전체 응답 시간만으로는 캐시, DB, 모델 호출이 각각 차지하는 비용을 구분하기 어렵습니다.",
        "improvement": "API p95, Redis Cache Hit Ratio, DB Query Time을 수집하고 Prometheus·Grafana로 구간별 지연을 비교할 계획입니다."
      },
      {
        "limitation": "자막 청크 임베딩이 문자 기반의 경량 벡터라, 표현이 다른 비슷한 의미의 질문은 어휘 일치 점수에 의존합니다.",
        "improvement": "OpenAI text-embedding-3-small 같은 다국어 임베딩 모델로 자막 청크를 다시 임베딩하고 pgvector 인덱스를 HNSW로 바꾼 뒤, 같은 질문 세트로 검색 정확도와 지연을 비교할 계획입니다."
      },
      {
        "limitation": "규칙 기반 질문 분기는 복합적인 문장을 오분류할 수 있습니다.",
        "improvement": "작품·일상 질문 평가셋을 만들고 규칙 기반 방식과 경량 분류 모델의 정확도·지연·비용을 비교할 계획입니다."
      },
      {
        "limitation": "현재 시점 이후의 자막을 제외하더라도 모델의 사전 지식에서 스포일러가 나오는 경우까지 완전히 보장할 수는 없습니다.",
        "improvement": "회차 경계·근거 부족·미래 내용 유도 질문을 별도 평가 시나리오로 관리하고 답변과 인용을 함께 검증할 계획입니다."
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/yangjihun/PrimerAI-Hackathon"
      }
    ]
  },
  {
    "id": "studyroom-reservation",
    "preview": {
      "features": "학과생 인증, 스터디룸 예약·취소와 관리자 통계",
      "problemSolving": "유지보수가 어려운 Blade 뷰에서 이미지·SVG를 분리해 파일 크기를 82.7KB에서 8.3KB로 줄였습니다."
    },
    "name": "RE:MIT",
    "title": "학과 스터디룸 예약 관리 시스템",
    "image": "/asset/remit.png",
    "period": "2025.10 ~ 운영 중",
    "role": "PM · Fullstack Developer",
    "teamSize": 5,
    "category": "fullstack",
    "summary": "학과 사무실에서 수동으로 관리하던 스터디룸 예약을 웹 서비스로 전환한 예약 시스템입니다. 배포 이후 사용자 문의와 개선 요청을 반영하며 실제 학과에서 운영 중입니다.",
    "techTags": [
      "PHP",
      "Laravel",
      "Microsoft Clarity",
      "MySQL",
      "Blade",
      "Google SMTP",
      "Gabia"
    ],
    "highlights": [
      "학과생 이메일 기반 회원가입·로그인과 비밀번호 찾기를 Google SMTP 메일 인증으로 구현했습니다.",
      "스터디룸 예약 생성·조회, 그룹 예약, 최대 4시간 예약 제한, 진행 중 예약 표시를 제공합니다.",
      "예약자에게만 열쇠함 접근 정보를 제공하고, 노출 시간을 10분으로 제한했습니다.",
      "유저·예약·알림·페널티를 관리하는 관리자 페이지와 페널티 가이드라인·알림을 운영합니다.",
      "자체 관리자 통계와 Microsoft Clarity를 결합해 실제 예약 지표와 사용자 행동을 함께 확인하는 운영 모니터링 체계를 구축했습니다.",
      "기능 개선하기 버튼을 통해 사용자 피드백을 반영하고 기능을 지속적으로 개선하고 있습니다."
    ],
    "responsibilities": [
      {
        "title": "이용 기준 협의 및 인증 절차 구현",
        "items": [
          {
            "title": "이용 기준·물품 관리 수칙 협의",
            "detail": "PM 겸 풀스택 개발자로 교수님과 이용 기준·물품 관리 수칙 협의 및 정의"
          },
          {
            "title": "학과생 전용 인증 절차 구현",
            "detail": "학과생 전용 인증 절차 구현"
          }
        ]
      },
      {
        "title": "기능 구현 및 안정화",
        "items": [
          {
            "title": "예약·관리자·알림 기능 구현",
            "detail": "예약·관리자·알림 기능 구현"
          },
          {
            "title": "QA 기반 예외 처리 안정화",
            "detail": "예약 중복, 인증되지 않은 접근, 비정상 요청에 대한 처리 로직을 QA 관점에서 점검·보완, 운영 시나리오 기반으로 안정화"
          }
        ]
      },
      {
        "title": "뷰 리팩토링으로 파일 크기 개선",
        "items": [
          {
            "title": "리팩토링 범위 설정",
            "detail": "비대해진 뷰의 유지보수성을 높이기 위한 리팩토링 범위 설정"
          },
          {
            "title": "이미지·SVG 분리 성과",
            "detail": "base64 이미지와 인라인 SVG를 분리해 핵심 파일 크기를 82.7KB에서 8.3KB로 약 90% 감소"
          }
        ]
      },
      {
        "title": "서비스 운영·개선",
        "items": [
          {
            "title": "운영 방식 디지털 전환",
            "detail": "대면과 상주 인력에 의존하던 운영 방식을 디지털로 전환해 학과의 관리 자원 부담 감소"
          },
          {
            "title": "사용자 피드백 기반 개선",
            "detail": "배포 이후 접수된 사용자 문의와 개선 요청을 수집·분석해 실제 이용 환경에 맞게 기능 개선 중"
          },
          {
            "title": "운영 모니터링 체계 구축",
            "detail": "회원·예약·취소·재이용 지표를 제공하는 자체 관리자 통계와 Clarity의 히트맵·세션 기록을 함께 구성하고, 운영 환경에서만 수집되도록 분리해 민감 정보 마스킹 적용"
          }
        ]
      }
    ],
    "techReasons": [
      {
        "tech": "Laravel · PHP · Blade",
        "reason": "인증·라우팅·DB 처리와 서버 렌더링 화면을 하나의 MVC 구조에서 구현하기 위해 사용했습니다.",
        "implementation": "가입·인증·예약·관리자 기능을 개발하고 Blade 뷰에서 정적 에셋과 반복 UI를 분리했습니다."
      },
      {
        "tech": "MySQL",
        "reason": "사용자·스터디룸·예약 간 관계와 이용 기록을 관리하기 위해 사용했습니다.",
        "implementation": "예약 생성·조회·취소와 관리자 통계에 필요한 관계형 데이터를 처리했습니다."
      },
      {
        "tech": "Google SMTP",
        "reason": "학과 이메일 목록과의 일치 여부뿐 아니라 실제 이메일 소유 여부도 확인해야 했습니다.",
        "implementation": "학과생 이메일 대조 후 인증 메일을 보내 가입·비밀번호 찾기 흐름을 구성했습니다."
      },
      {
        "tech": "Microsoft Clarity",
        "reason": "예약 건수와 같은 결과 지표만으로 설명하기 어려운 클릭·이탈 흐름을 살펴보기 위해 사용했습니다.",
        "implementation": "자체 회원·예약 통계와 히트맵·세션 기록을 함께 확인하고, 운영 환경에서만 수집하며 민감 정보를 마스킹했습니다."
      }
    ],
    "troubleshooting": [
      {
        "title": "프로토타입을 활용해 학과생 인증에 필요한 정보 확보",
        "problem": "학과생만 이용할 수 있는 서비스를 구현하려면 학생 이메일을 활용한 인증이 필요했습니다. 하지만 교수님께서 개인정보 제공에 대한 우려를 가지고 계셔서 이메일 정보를 받을 수 없었고, 학과생 여부를 확인해야 한다는 핵심 요구사항을 구현하기 어려운 상황이었습니다.",
        "solution": "단순히 이메일 정보가 필요하다고 요청하는 대신, 회원가입부터 로그인, 학과생 여부 확인까지 이메일이 실제로 어떻게 사용되는지 과정을 정리했습니다. 또한 설명만으로는 서비스 구조를 전달하기 어렵다고 판단해 회원가입과 로그인 화면을 직접 구현한 프로토타입을 만들고 시연했습니다. 이를 통해 이메일이 다른 목적으로 사용되는 것이 아니라 학과생 여부를 확인하기 위한 최소한의 정보라는 점을 설명했습니다.",
        "result": "프로토타입을 통해 개인정보의 사용 목적과 범위를 구체적으로 설명하면서 교수님의 동의를 얻어 학생 이메일 정보를 제공받을 수 있었습니다. 이를 바탕으로 학과생만 가입하고 서비스를 이용할 수 있는 인증 기능을 구현했고, 서비스의 핵심 요구사항을 충족해 실제 학과 운영까지 이어갈 수 있었습니다.",
        "cause": "학과생 인증에 필요한 이메일의 사용 목적과 범위가 충분히 공유되지 않아 개인정보 활용에 대한 합의가 어려웠습니다.",
        "checks": [
          "별도 증빙 없이 가입하려는 학생 요구와 학과생만 이용해야 한다는 운영 기준을 함께 충족해야 했습니다."
        ],
        "steps": [
          "이해관계자 요구 확인",
          "이메일 사용 범위 정리",
          "가입 흐름 문서화",
          "프로토타입 시연",
          "활용 동의·인증 기준 확정",
          "인증 구현"
        ],
        "comparison": [
          {
            "label": "인증 방식",
            "before": "미정",
            "after": "이메일 대조 + SMTP"
          },
          {
            "label": "이메일 활용",
            "before": "사용 범위에 대한 우려",
            "after": "목적·범위 합의"
          },
          {
            "label": "운영 방식",
            "before": "학과 사무실 수작업",
            "after": "실제 학과 웹 서비스"
          }
        ]
      },
      {
        "title": "비대해진 Blade 뷰를 기준에 따라 분리해 유지보수성 개선",
        "problem": "Blade 뷰 내부에 이미지가 base64 형태로 포함되고 아이콘도 SVG 코드가 직접 작성되어 있어 파일 크기가 커지고 같은 요소를 여러 화면에서 재사용하기 어려웠습니다. 전체 뷰를 확인한 결과 base64 이미지 5개와 인라인 SVG 54개가 사용되고 있었으며, 가장 큰 파일은 82.7KB까지 증가한 상태였습니다.",
        "solution": "먼저 개선 기준을 정했습니다. Blade 파일은 150줄 이하로 관리하고, 반복해서 사용하는 SVG는 컴포넌트로 분리하도록 기준을 세웠습니다. 이후 base64 이미지는 정적 파일로 분리하고 반복되는 아이콘은 공통 컴포넌트로 변경했습니다. 여러 파일을 한 번에 수정해야 하는 부분은 정규식을 활용하되, 예상한 개수만큼 변경됐는지 확인하는 검증 과정을 추가해 기존 화면의 동작이 달라지지 않도록 했습니다.",
        "result": "가장 큰 Blade 파일의 크기를 82.7KB에서 8.3KB로 약 90% 줄였습니다. 뷰 내부의 base64 이미지는 5개에서 모두 제거했고, 인라인 SVG도 54개에서 30개로 줄였습니다. 반복되는 에셋을 별도로 관리할 수 있게 되면서 파일 구조가 단순해졌고, 같은 아이콘을 여러 화면에서 재사용할 수 있도록 개선했습니다.",
        "cause": "Base64 이미지와 반복 SVG 코드를 뷰에 직접 포함해 화면과 에셋의 관리 책임이 섞였습니다.",
        "checks": [
          "정규식으로 여러 파일을 수정할 때 예상 변경 개수와 실제 화면 동작을 함께 확인했습니다."
        ],
        "steps": [
          "뷰 크기·인라인 에셋 분석",
          "분리 기준 수립",
          "이미지 정적 파일화",
          "SVG 공통 컴포넌트화",
          "화면·변경 개수 확인",
          "파일 크기 재측정"
        ],
        "comparison": [
          {
            "label": "가장 큰 Blade 파일",
            "before": "82.7KB",
            "after": "8.3KB · 약 90% 감소"
          },
          {
            "label": "뷰 내부 Base64 이미지",
            "before": "5개",
            "after": "0개"
          },
          {
            "label": "인라인 SVG",
            "before": "54개",
            "after": "30개"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/Re-mit/Remit"
      }
    ],
    "overview": {
      "goal": "수작업으로 운영하던 가천대학교 금융수학과 스터디룸 예약과 학과생 인증을 웹 서비스로 전환했습니다.",
      "background": "예약 처리·학과생 여부 확인·열쇠 관리가 대면 업무와 상주 인력에 의존해 학생과 관리자 모두에게 반복적인 운영 부담이 발생했습니다."
    },
    "teamRoles": [
      {
        "role": "PM / Fullstack · 본인",
        "detail": "요구사항 정리와 일정 관리, 예약·관리자 기능 개발, 운영 개선"
      },
      {
        "role": "팀원 · 전체 5인 구성",
        "detail": "화면과 기능 단위로 프론트엔드·백엔드 구현을 분담"
      }
    ],
    "contribution": {
      "role": "서로 다른 이해관계자의 요구를 인증·예약 기능으로 구체화하고, 배포 이후 개선까지 맡았습니다.",
      "core": [
        "교수님의 학과생 전용 이용 요구와 학생의 간편 가입 요구를 이메일 대조 + SMTP 인증으로 연결했습니다.",
        "이메일 사용 목적·범위를 문서화하고 회원가입 프로토타입을 직접 시연해 학과의 이메일 활용 동의를 확보했습니다.",
        "예약·관리자·알림 기능을 구현하고 중복 예약과 인증되지 않은 접근 등 운영 예외를 점검했습니다.",
        "Base64 이미지·SVG를 뷰에서 분리하고, 자체 예약 통계와 Clarity를 구성해 이용 현황과 사용자 행동을 확인했습니다."
      ],
      "impact": "인증 기준을 확정해 실제 학과 운영으로 연결했습니다. 가장 큰 Blade 파일을 82.7KB에서 8.3KB로 줄이고 사용자 문의와 예약 지표를 바탕으로 개선하는 기반을 마련했습니다."
    },
    "outcomes": [
      "가천대학교 금융수학과에서 실제 스터디룸 예약·관리 서비스 운영",
      "학과생 여부와 이메일 소유 여부를 함께 확인하는 가입 기준 구현",
      "Blade 파일 82.7KB → 8.3KB, 약 90% 감소",
      "자체 예약 통계와 Clarity를 활용한 운영 모니터링 및 사용자 피드백 반영"
    ],
    "retrospective": [
      {
        "limitation": "초기에는 기능 구현에 집중해 뷰와 정적 에셋을 충분히 분리하지 못했습니다.",
        "improvement": "새 기능을 개발할 때부터 Layout·Component·Asset의 책임과 파일 관리 기준을 적용할 계획입니다."
      },
      {
        "limitation": "사용자 행동을 확인했지만 UI 개선 전후의 예약 완료율을 체계적으로 비교하지 못했습니다.",
        "improvement": "배포 시점부터 가입·예약 완료율을 수집해 문제 발견 → UI 개선 → 지표 재측정으로 이어갈 계획입니다."
      }
    ]
  },
  {
    "id": "kakao-enterprise-pbl",
    "preview": {
      "features": "문서·URL 등록, 카테고리 분류와 학습 상태 모니터링",
      "problemSolving": "반복되는 403을 CSRF 헤더와 RAW/XOR 토큰 처리까지 추적해 보안 보호를 유지하며 해결했습니다."
    },
    "name": "Vibot",
    "title": "사내 문서 기반 AI 챗봇 운영 관리자 페이지",
    "image": "/asset/vibot.png",
    "period": "2025.10 ~ 2025.12",
    "role": "Frontend Lead",
    "teamSize": 7,
    "category": "frontend",
    "notice": "기업 연계 프로젝트로 진행되어, 대외비 정책에 따라 저장소와 상세 코드는 공개하지 않습니다.",
    "summary": "관리자가 문서·URL 데이터를 업로드·분류하고, 수집·학습 상태를 모니터링하며 챗봇 응답을 검증하는 B2B 챗봇 운영 관리자 페이지입니다. 카카오엔터프라이즈 SW 아카데미의 기업실무형 프로젝트로 진행했습니다.",
    "techTags": [
      "Next.js",
      "React",
      "TypeScript",
      "Zustand",
      "TanStack Query",
      "Axios",
      "Tailwind CSS",
      "Radix UI",
      "Sentry",
      "Vercel"
    ],
    "highlights": [
      "문서 파일 업로드와 URL 등록으로 챗봇이 학습할 데이터를 관리자가 직접 적재할 수 있습니다.",
      "카테고리 기반 데이터 분류와 DataTable 목록·상세 조회로 적재된 문서를 관리합니다.",
      "데이터 수집·처리 상태를 확인해 학습이 어디까지 진행됐는지 추적할 수 있는 모니터링 UI를 구성했습니다.",
      "쿠키 기반 인증 환경에서 CSRF에 대응하고, Sentry로 운영 중 발생하는 런타임 에러를 추적합니다."
    ],
    "responsibilities": [
      {
        "title": "관리자 페이지 설계·구현",
        "items": [
          {
            "title": "관리자 페이지 설계·구현 총괄",
            "detail": "프론트엔드 개발 팀장으로 관리자 페이지 화면 설계와 데이터 관리 핵심 기능 구현 담당"
          },
          {
            "title": "데이터 관리 UI 구현",
            "detail": "DataTable 기반 목록, 상세 모달, 파일 업로드·URL 등록 플로우 UI 구현"
          }
        ]
      },
      {
        "title": "프론트엔드 인프라 구성",
        "items": [
          {
            "title": "상태 관리 책임 분리",
            "detail": "서버 상태는 TanStack Query, UI·권한 상태는 Zustand로 나눠 상태 관리 책임 분리"
          },
          {
            "title": "API 통신 레이어 정리",
            "detail": "Axios 인스턴스 구성 및 인증 쿠키 전송을 전제로 한 API 통신 레이어 정리"
          },
          {
            "title": "Sentry 기반 에러 추적 도입",
            "detail": "Sentry를 도입해 운영 환경의 런타임 에러 추적 기반 마련"
          }
        ]
      }
    ],
    "techReasons": [
      {
        "tech": "Next.js · React · TypeScript",
        "reason": "관리자 화면을 재사용 가능한 컴포넌트로 구성하고 데이터 구조를 타입으로 관리하기 위해 사용했습니다.",
        "implementation": "문서 목록·상세·업로드·URL 등록 및 처리 상태 모니터링 화면을 구현했습니다."
      },
      {
        "tech": "TanStack Query · Zustand",
        "reason": "서버 데이터의 캐싱·동기화와 화면·권한 상태를 구분하기 위해 사용했습니다.",
        "implementation": "API 데이터는 Query로, UI·권한 상태는 Zustand로 관리했습니다."
      },
      {
        "tech": "Axios",
        "reason": "쿠키 인증과 CSRF 헤더를 여러 API에서 일관되게 처리하기 위해 사용했습니다.",
        "implementation": "공통 인스턴스와 요청 인터셉터에서 쿠키 전송 및 CSRF 토큰 헤더 첨부를 정리했습니다."
      },
      {
        "tech": "Sentry",
        "reason": "배포 후 발생하는 관리자 화면의 런타임 에러를 추적하기 위해 도입했습니다.",
        "implementation": "운영 환경의 프론트엔드 오류를 수집하는 기반을 연결했습니다."
      }
    ],
    "troubleshooting": [
      {
        "title": "CSRF 토큰 처리 방식의 차이로 발생한 403 오류 해결",
        "problem": "로그인 후 서버에서 CSRF 토큰을 발급받고, 쿠키의 XSRF-TOKEN 값을 요청 헤더에 담아 전송하도록 구현했습니다. 하지만 일부 POST, PUT, DELETE 요청에서 CSRF 검증에 실패하며 403 Forbidden이 반복해서 발생했습니다.",
        "solution": "요청 과정을 확인해 일부 API 호출에서 CSRF 헤더가 누락되는 문제를 발견하고, Axios 인터셉터에서 쿠키의 토큰 값을 요청마다 헤더에 넣도록 수정했습니다. 이후에도 403이 발생해 Spring Security의 CSRF 처리 과정을 확인했고, 원본 토큰과 XOR 처리 토큰의 흐름이 맞지 않아 검증에 실패하고 있음을 파악했습니다. Swagger UI와 기존 보안 설정을 유지하기 위해 우회하지 않고, 프론트엔드는 쿠키 값을 헤더에 전달하고 토큰 생성과 검증은 Spring Security의 기본 처리 방식에 맡기도록 정리했습니다.",
        "result": "프론트엔드와 백엔드의 CSRF 토큰 처리 방식을 일치시켜 반복적으로 발생하던 403 오류를 해결했습니다. 또한 Swagger UI를 위해 별도의 예외를 두거나 CSRF 기능을 비활성화하지 않고도 동일한 보안 설정을 유지할 수 있도록 했습니다. 인증 오류로 API 연동과 기능 테스트가 계속 지연되던 문제도 해결해 이후 개발 일정을 원활하게 진행할 수 있었습니다.",
        "cause": "일부 요청에 CSRF 헤더가 누락됐고, 인터셉터 보완 이후에도 클라이언트와 서버의 RAW 토큰·XOR 토큰 처리 흐름이 맞지 않았습니다.",
        "checks": [
          "헤더 첨부만으로 해결되지 않아 Spring Security 검증 과정까지 확인했습니다.",
          "Swagger UI와 기존 CSRF 보호를 유지하면서 동일한 보안 설정으로 동작해야 했습니다."
        ],
        "steps": [
          "Network 요청 확인",
          "헤더 누락 발견",
          "Axios 인터셉터 보완",
          "403 재현",
          "Spring Security RAW/XOR 확인",
          "토큰 처리 일치",
          "보호 API 검증"
        ],
        "comparison": [
          {
            "label": "CSRF 토큰 전달",
            "before": "일부 요청에 헤더 누락",
            "after": "Axios 공통 처리"
          },
          {
            "label": "원인 분석 범위",
            "before": "프론트엔드 요청",
            "after": "프론트엔드 + Spring Security"
          },
          {
            "label": "POST·PUT·DELETE 요청",
            "before": "반복되는 403",
            "after": "정상 API 요청"
          },
          {
            "label": "보안 정책",
            "before": "CSRF 검증 적용",
            "after": "CSRF 보호·Swagger 설정 유지"
          }
        ]
      }
    ],
    "links": [],
    "overview": {
      "goal": "관리자가 사내 문서 기반 챗봇의 학습 데이터를 적재·분류하고 처리 상태와 답변을 검증하는 운영 화면을 구축했습니다.",
      "background": "기업용 챗봇을 운영하려면 문서·URL 등록뿐 아니라 데이터 처리 상태, 접근 권한, 배포 후 오류를 한 흐름에서 관리해야 합니다."
    },
    "teamRoles": [
      {
        "role": "Frontend Lead · 본인",
        "detail": "관리자 페이지 화면 설계, 데이터 관리 기능, 프론트엔드 공통 구조"
      },
      {
        "role": "Frontend",
        "detail": "관리자 화면 및 사용자 인터랙션 구현"
      },
      {
        "role": "Backend / AI",
        "detail": "인증·권한 API, 문서 수집·처리와 챗봇 응답 기능 연동"
      }
    ],
    "contribution": {
      "role": "7인 팀에서 프론트엔드 리드로 관리자 페이지 설계와 데이터 관리 핵심 기능을 담당했습니다.",
      "core": [
        "DataTable 목록·상세 모달, 파일 업로드·URL 등록과 카테고리 분류 화면을 구현했습니다.",
        "서버 데이터는 TanStack Query, UI·권한 상태는 Zustand로 나누고 Axios 통신 계층을 구성했습니다.",
        "반복되는 403 오류를 요청 헤더부터 Spring Security의 RAW/XOR 토큰 처리까지 추적했습니다.",
        "Sentry를 도입해 배포 후 런타임 에러를 추적할 수 있는 기반을 마련했습니다."
      ],
      "impact": "관리자가 학습 데이터의 적재와 처리 상태를 확인할 수 있는 운영 흐름을 구현했습니다. CSRF 보호를 유지하며 API 요청을 정상화해 연동과 기능 검증을 이어갈 수 있게 했습니다."
    },
    "outcomes": [
      "문서 업로드·URL 등록·분류·처리 상태 확인을 연결하는 관리자 페이지 구현",
      "서버 데이터와 UI·권한 상태의 관리 책임 분리",
      "CSRF 보호를 유지하면서 반복적인 403 오류 해결",
      "Sentry 기반 배포 후 런타임 에러 추적 기반 마련"
    ],
    "retrospective": [
      {
        "limitation": "인증·CSRF처럼 여러 요청이 공유하는 기능은 요청별 수동 확인만으로 회귀를 막기 어렵습니다.",
        "improvement": "로그인 → 문서 등록 → 수정·삭제와 Swagger 요청을 회귀 시나리오로 묶고 토큰 처리 방식도 API 계약에 기록할 계획입니다."
      },
      {
        "limitation": "에러 수집만으로는 어떤 작업에서 사용자가 막혔는지 설명하기 어려울 수 있습니다.",
        "improvement": "업로드·분류·응답 검증 등 작업 단계와 오류를 연결해 실패율과 복구 흐름을 함께 확인할 계획입니다."
      }
    ]
  },
  {
    "id": "loventure",
    "preview": {
      "features": "커플 맞춤 코스 추천, 지도 경로 확인과 다이어리 기록",
      "problemSolving": "로그인만으로 구분할 수 없는 선행 조건을 네 가지 권한 상태로 나누고 라우팅 가드에 연결했습니다."
    },
    "name": "Loventure",
    "title": "AI 기반 데이트 코스 추천 서비스",
    "image": "/asset/loventure.png",
    "period": "2025.09 ~ 2025.10",
    "role": "Frontend Developer",
    "teamSize": 8,
    "category": "frontend",
    "summary": "AI가 커플의 취향과 실시간 컨디션을 분석해서 서울 지역 맞춤형 데이트 코스를 추천해주고, 지도·다이어리·지역락 시스템으로 경험을 확장한 웹 서비스입니다. 카카오엔터프라이즈 SW 아카데미의 현장미러형 프로젝트로 진행했습니다.",
    "techTags": [
      "React 19",
      "TypeScript",
      "Vite",
      "TanStack Query",
      "Zustand",
      "React Router",
      "Tailwind CSS",
      "MUI",
      "Mapbox GL JS",
      "Axios",
      "MSW"
    ],
    "highlights": [
      "온보딩 취향 정보와 데이트 시간·컨디션·음주 여부·불호 음식 등의 옵션을 결합해 AI 기반 데이트 코스를 추천합니다.",
      "Mapbox 지도를 활용해 시작점을 선택하고, 추천 코스를 경로·마커·거리/시간 정보와 함께 시각화합니다.",
      "커플 룸·커플 매칭, 서울 25개 구를 단계적으로 해금하는 지역락, 다녀온 코스를 기록하는 다이어리까지 하나의 플로우로 제공합니다."
    ],
    "responsibilities": [
      {
        "title": "프론트엔드 아키텍처 설계",
        "items": [
          {
            "title": "FSD 기반 모듈 구조 설계",
            "detail": "Feature-Sliced Design(FSD) 기반으로 auth, course, diary, mapbox, mypage 등 기능별 모듈 구조 설계 및 구현"
          },
          {
            "title": "권한 단계별 라우팅 가드 구성",
            "detail": "Zustand + TanStack Query 조합으로 권한 단계(ONBOARDING_REQUIRED, COUPLE_MATCHING_REQUIRED, ROCK_REQUIRED, COMPLETED)에 따른 라우팅 가드와 상태 플로우 구성"
          }
        ]
      },
      {
        "title": "주요 화면·UX 구현",
        "items": [
          {
            "title": "Mapbox 연동",
            "detail": "Mapbox 연동 구현"
          },
          {
            "title": "코스 추천·저장",
            "detail": "코스 추천·저장 화면 구현"
          },
          {
            "title": "다이어리 작성·댓글",
            "detail": "다이어리 작성/댓글 화면 구현"
          },
          {
            "title": "마이페이지",
            "detail": "마이페이지 화면 구현"
          }
        ]
      }
    ],
    "techReasons": [
      {
        "tech": "React · TypeScript · FSD",
        "reason": "인증·지도·코스·다이어리 기능을 경계가 분명한 모듈로 관리하기 위해 사용했습니다.",
        "implementation": "기능별 모듈과 주요 페이지를 구성하고 API 응답을 타입으로 연결했습니다."
      },
      {
        "tech": "Mapbox GL JS",
        "reason": "데이트 코스는 장소 목록과 함께 시작점·이동 경로를 지도에서 확인해야 합니다.",
        "implementation": "시작점 선택, 추천 코스 경로·마커와 거리·시간 정보를 시각화했습니다."
      },
      {
        "tech": "Zustand · TanStack Query · React Router",
        "reason": "서버 데이터와 클라이언트 권한 상태를 구분하면서 단계별 진입 조건을 관리하기 위해 사용했습니다.",
        "implementation": "ONBOARDING_REQUIRED, COUPLE_MATCHING_REQUIRED, ROCK_REQUIRED, COMPLETED 상태를 라우팅 가드와 연결했습니다."
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/PitterPetter/PitterPetter_FE"
      },
      {
        "label": "Demo",
        "href": "https://loventure.us"
      }
    ],
    "overview": {
      "goal": "커플의 취향과 당일 컨디션에 맞는 서울 데이트 코스를 추천하고, 지도 탐색부터 경험 기록까지 이어지는 서비스를 구현했습니다.",
      "background": "데이트 장소를 따로 검색하면 두 사람의 취향·시간·이동 경로를 함께 고려하기 어렵습니다. 온보딩 정보와 당일 조건을 하나의 추천 흐름으로 연결할 필요가 있었습니다."
    },
    "teamRoles": [
      {
        "role": "Frontend · 본인",
        "detail": "FSD 모듈 구조, 권한 단계 라우팅, 지도·코스·다이어리·마이페이지 화면"
      },
      {
        "role": "Frontend",
        "detail": "서비스 화면과 사용자 인터랙션 구현"
      },
      {
        "role": "Backend / AI",
        "detail": "사용자·커플·코스 데이터 API와 맞춤 추천 기능 구현"
      }
    ],
    "contribution": {
      "role": "8인 팀에서 프론트엔드 개발자로 기능별 모듈과 사용자 권한 흐름을 설계하고 주요 화면을 구현했습니다.",
      "core": [
        "auth·course·diary·mapbox·mypage를 FSD 기준으로 분리했습니다.",
        "온보딩 필요 → 커플 매칭 필요 → 지역 선택 필요 → 완료 상태에 맞춰 라우팅 가드를 구성했습니다.",
        "Mapbox에서 시작점과 추천 경로·마커·거리·시간을 보여주는 지도 인터랙션을 구현했습니다.",
        "코스 추천·저장, 다이어리 작성·댓글, 마이페이지를 연결했습니다."
      ],
      "impact": "사용자의 준비 상태에 맞는 화면 이동과 추천 → 지도 확인 → 저장 → 다이어리 기록 흐름을 구현했습니다."
    },
    "troubleshooting": [
      {
        "kind": "design",
        "title": "사용자 준비 상태에 따른 단계별 라우팅 설계",
        "problem": "추천 화면에 진입하려면 취향 입력, 커플 매칭, 지역 선택이 먼저 필요했습니다. 로그인 여부 하나만으로는 다음에 보여줄 화면을 결정할 수 없었습니다.",
        "cause": "서비스 진입 조건이 인증뿐 아니라 사용자 준비 단계에도 의존했습니다.",
        "checks": [
          "각 단계 완료 후 서버 상태와 클라이언트의 화면 이동 기준이 일치해야 합니다."
        ],
        "steps": [
          "진입 조건 정리",
          "권한 상태 정의",
          "서버·클라이언트 상태 분리",
          "라우팅 가드 구성",
          "단계별 화면 연결"
        ],
        "solution": "사용자 준비 단계를 네 가지 상태로 구분하고, 상태에 맞는 페이지로 이동하도록 가드를 구성했습니다. 기능별 모듈 경계를 유지하며 지도·추천·저장 흐름을 연결했습니다.",
        "comparison": [
          {
            "label": "진입 조건",
            "before": "로그인 여부만으로 판단 불가",
            "after": "네 가지 준비 상태로 판단"
          },
          {
            "label": "다음 화면 결정",
            "before": "선행 조건을 별도로 확인해야 함",
            "after": "권한 상태에 맞는 라우팅 가드"
          }
        ],
        "result": "온보딩부터 코스 추천까지 사용자 상태에 맞게 진행하는 프론트엔드 흐름을 구현했습니다."
      }
    ],
    "outcomes": [
      "서울 지역 맞춤 데이트 코스의 시작점·경로·거리·시간 시각화",
      "사용자 준비 상태에 따른 네 단계 라우팅 가드 구현",
      "코스 추천·저장과 다이어리·댓글·마이페이지 연결"
    ],
    "retrospective": [
      {
        "limitation": "다단계 라우팅은 새로고침이나 직접 URL 진입 시에도 서버 상태와 일치해야 합니다.",
        "improvement": "단계별 직접 진입·재로그인·뒤로 가기를 E2E 시나리오로 구성할 계획입니다."
      },
      {
        "limitation": "지도 화면의 완성도와 실제 추천 만족도는 서로 다른 기준으로 검증해야 합니다.",
        "improvement": "지도 로딩 시간과 코스 저장률을 분리해 측정하고 경로 확인에서 저장까지의 이탈을 분석할 계획입니다."
      }
    ]
  },
  {
    "id": "commit-club",
    "preview": {
      "features": "동아리 소개, 주차별 스터디 자료와 프로젝트 포트폴리오",
      "problemSolving": "정보 유형에 맞게 페이지와 데이터 구조를 나누고 React 화면에 Node.js 콘텐츠 API를 연결했습니다."
    },
    "name": "COMMIT",
    "title": "금융수학과 IT 동아리 COMMIT 공식 홈페이지",
    "image": "/asset/fm-commit.png",
    "period": "2025.08 ~ 진행중",
    "role": "Fullstack Developer",
    "teamSize": 1,
    "category": "fullstack",
    "summary": "IT 동아리 COMMIT의 소개, 스터디 진행 상황, 프로젝트 포트폴리오를 한 곳에서 관리하는 공식 홈페이지를 직접 기획하고 풀스택으로 구현한 프로젝트입니다.",
    "techTags": [
      "React 19",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "React Router",
      "Node.js",
      "ESLint"
    ],
    "highlights": [
      "동아리 소개, 운영 방향, 활동 현황을 외부/신입이 쉽게 이해할 수 있도록 구조화했습니다.",
      "스터디 주차별 자료와 프로젝트 정보를 정리해서 한눈에 볼 수 있는 페이지를 제공합니다.",
      "Node.js 기반 API로 동아리 관련 데이터를 관리할 수 있는 풀스택 구조를 설계했습니다."
    ],
    "responsibilities": [
      {
        "title": "동아리 사이트 기획 및 프론트엔드 구축",
        "items": [
          {
            "title": "사이트 기획",
            "detail": "동아리장으로서 사이트 정보 구조와 콘텐츠 기획"
          },
          {
            "title": "프론트엔드 구축",
            "detail": "React + Vite + TypeScript + Tailwind 기반 프론트엔드 구축"
          }
        ]
      },
      {
        "title": "백엔드 구현 및 품질 관리",
        "items": [
          {
            "title": "백엔드 API 구현·연동",
            "detail": "Node.js로 간단한 백엔드 API를 구현해 동아리 소개/스터디/프로젝트 데이터를 프론트와 연동"
          },
          {
            "title": "코드 품질 관리 플로우 정리",
            "detail": "ESLint 및 npm 스크립트(dev/build/preview/lint) 구성을 통해 개발 및 코드 품질 관리 플로우 정리"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "GitHub",
        "href": "https://github.com/yangjihun/FM-COMMIT"
      },
      {
        "label": "Demo",
        "href": "https://fm-commit.com/"
      }
    ],
    "overview": {
      "goal": "금융수학과 IT 동아리 COMMIT의 소개, 스터디 자료와 프로젝트를 한곳에서 확인하는 공식 홈페이지를 구축했습니다.",
      "background": "신입과 외부 방문자가 동아리 운영 방향과 실제 활동을 이해하려면 소개·스터디 진행 상황·프로젝트 결과가 연결된 정보 구조가 필요했습니다."
    },
    "teamRoles": [
      {
        "role": "개인 프로젝트 · 본인, 1명",
        "detail": "콘텐츠 기획, React 프론트엔드, Node.js API와 데이터 연동"
      }
    ],
    "contribution": {
      "role": "동아리 운영 경험을 바탕으로 필요한 정보를 정리하고 프론트엔드부터 API까지 직접 구현했습니다.",
      "core": [
        "동아리 소개·운영 방향·활동 현황을 사이트의 정보 구조로 정리했습니다.",
        "스터디 주차별 자료와 프로젝트 포트폴리오 화면을 구현했습니다.",
        "React·TypeScript UI와 Node.js API를 연결해 동아리 데이터를 제공하는 구조를 만들었습니다.",
        "ESLint와 개발·빌드 스크립트를 정리했습니다."
      ],
      "impact": "방문자가 동아리 소개와 실제 활동을 같은 사이트에서 확인하고, 운영자가 스터디·프로젝트 정보를 관리할 수 있는 기반을 마련했습니다."
    },
    "techReasons": [
      {
        "tech": "React · TypeScript · Vite",
        "reason": "소개·스터디·프로젝트의 반복 UI를 컴포넌트로 구성하고 콘텐츠 구조를 타입으로 관리하기 위해 사용했습니다.",
        "implementation": "동아리 소개와 활동 페이지를 구성하고 React Router로 연결했습니다."
      },
      {
        "tech": "Tailwind CSS",
        "reason": "페이지별 콘텐츠가 달라도 스타일 기준을 일관되게 유지하기 위해 사용했습니다.",
        "implementation": "소개·스터디·프로젝트 화면의 레이아웃과 공통 스타일을 구성했습니다."
      },
      {
        "tech": "Node.js",
        "reason": "동아리 관련 데이터를 화면에 제공하는 API가 필요했습니다.",
        "implementation": "소개·스터디·프로젝트 데이터 API를 구현해 프론트엔드와 연동했습니다."
      }
    ],
    "troubleshooting": [
      {
        "kind": "design",
        "title": "동아리 활동을 탐색할 수 있는 정보 구조 설계",
        "problem": "동아리 소개만으로는 실제로 어떤 스터디와 프로젝트가 진행되는지 전달하기 어려워, 활동 기록까지 함께 확인할 수 있어야 했습니다.",
        "cause": "소개, 주차별 자료, 프로젝트 결과는 목적과 데이터 형태가 달라 각각의 표시 구조가 필요했습니다.",
        "checks": [
          "활동이 추가될 때마다 소개 화면 전체를 다시 구성하지 않고 정보를 확장할 수 있어야 합니다."
        ],
        "steps": [
          "방문자 정보 요구 정리",
          "소개·스터디·프로젝트 구분",
          "페이지 구조 설계",
          "Node.js API 구현",
          "프론트엔드 연결"
        ],
        "solution": "소개·스터디·프로젝트를 구분한 페이지와 데이터 구조를 만들고, Node.js API에서 관련 정보를 제공하도록 연결했습니다.",
        "comparison": [
          {
            "label": "전달할 정보",
            "before": "소개 외에 활동 근거도 필요",
            "after": "주차별 스터디·프로젝트 페이지"
          },
          {
            "label": "콘텐츠 제공",
            "before": "유형별 데이터 구조 필요",
            "after": "React 화면 + Node.js API 연동"
          }
        ],
        "result": "공식 홈페이지에서 동아리의 운영 방향과 활동 결과를 함께 확인할 수 있게 했습니다."
      }
    ],
    "outcomes": [
      "동아리 COMMIT 공식 홈페이지 기획·풀스택 구현",
      "주차별 스터디 자료와 프로젝트 포트폴리오를 확인하는 페이지 제공",
      "소개·스터디·프로젝트 데이터 API와 프론트엔드 연동"
    ],
    "retrospective": [
      {
        "limitation": "동아리 활동 기록은 개발 완료 이후에도 계속 추가·수정되는 콘텐츠입니다.",
        "improvement": "운영자가 자주 바꾸는 항목을 기준으로 입력 검증과 콘텐츠 관리 절차를 정리할 계획입니다."
      },
      {
        "limitation": "여러 기수의 활동이 쌓이면 단순 목록만으로 원하는 자료를 찾기 어려워질 수 있습니다.",
        "improvement": "자료량과 실제 탐색 흐름을 확인한 뒤 기수·활동 유형에 따른 분류와 탐색 기능을 확장할 계획입니다."
      }
    ]
  },
  {
    "id": "dreammap",
    "preview": {
      "features": "이력서 업로드·AI 분석, 버전 관리와 커리어 로드맵",
      "problemSolving": "여러 화면의 인증 처리를 Axios 인터셉터로 모아 토큰 첨부와 401 이후 세션 초기화·화면 이동을 통일했습니다."
    },
    "name": "DreamMap",
    "title": "이력서 분석 및 로드맵 제안 서비스",
    "image": "/asset/dreammap.png",
    "period": "2025.07 ~ 2025.08",
    "role": "Fullstack Developer",
    "teamSize": 4,
    "category": "fullstack",
    "summary": "이력서를 업로드하면 AI가 점수·리뷰·리라이팅을 제공하고, 지원자의 상황에 맞춘 커리어 로드맵까지 제안하는 이력서 분석 웹 서비스입니다.",
    "techTags": [
      "React 18",
      "TypeScript",
      "Vite",
      "Tailwind CSS",
      "Redux Toolkit",
      "React Router",
      "Axios",
      "Node.js 20",
      "Express 5",
      "MongoDB",
      "Gemini",
      "Azure Document Intelligence"
    ],
    "highlights": [
      "사용자가 PDF 또는 텍스트 형태로 이력서를 업로드하면, Azure Document Intelligence로 텍스트를 추출하고 Gemini로 점수·리뷰·리라이팅을 수행합니다.",
      "이력서 버전별 분석 결과를 한 화면에서 관리하고, 즐겨찾기·상세 보기·버전 관리 기능을 제공합니다.",
      "사용자 프로필과 이력서를 바탕으로 학습·취업 로드맵을 생성하고, 달성 여부를 체크리스트/타임라인 형태로 시각화합니다."
    ],
    "responsibilities": [
      {
        "title": "대시보드 UI 및 상태 관리 구현",
        "items": [
          {
            "title": "UI·페이지 구현",
            "detail": "Vite + React + TypeScript 기반 대시보드 UI와 이력서 업로드/분석/로드맵 페이지 구현"
          },
          {
            "title": "상태 관리 설계",
            "detail": "Redux Toolkit 상태(auth, resume, roadmap) 설계"
          }
        ]
      },
      {
        "title": "Axios 인증 흐름 정리",
        "items": [
          {
            "title": "인증 토큰 자동 첨부",
            "detail": "Axios 인터셉터를 구성해 인증 토큰을 요청마다 자동으로 첨부"
          },
          {
            "title": "401 응답 공통 처리",
            "detail": "401 응답을 공통 처리해 세션 초기화 및 로그인 페이지로 리다이렉트"
          }
        ]
      },
      {
        "title": "Resume CRUD API 구현 및 보완",
        "items": [
          {
            "title": "CRUD API 구현·수정",
            "detail": "기존 Express + MongoDB 코드베이스에서 이력서(Resume) CRUD API 일부 구현·수정"
          },
          {
            "title": "입력 검증·예외 처리 보완",
            "detail": "입력 검증 및 예외 처리 보완에 기여"
          }
        ]
      }
    ],
    "links": [
      {
        "label": "GitHub (FE)",
        "href": "https://github.com/yangjihun/DreamMap-fe"
      },
      {
        "label": "GitHub (BE)",
        "href": "https://github.com/yangjihun/DreamMap-be"
      }
    ],
    "overview": {
      "goal": "이력서 업로드부터 AI 분석·리라이팅, 개인별 커리어 로드맵 관리까지 연결하는 서비스를 구현했습니다.",
      "background": "이력서 피드백을 받아도 수정본과 이전 분석을 함께 관리하거나 다음 학습 행동으로 연결하기 어렵습니다. 버전별 분석과 실행 가능한 로드맵을 한 화면에서 관리할 필요가 있었습니다."
    },
    "teamRoles": [
      {
        "role": "Fullstack · 본인",
        "detail": "대시보드·업로드·분석·로드맵 UI, 상태·인증 처리, Resume API 일부"
      },
      {
        "role": "팀원 · 전체 4인 구성",
        "detail": "화면·서버·AI 기능을 분담하고 문서 추출·분석 및 데이터 처리 흐름 연동"
      }
    ],
    "contribution": {
      "role": "대시보드 프론트엔드를 구현하고 기존 Express·MongoDB 코드베이스에서 이력서 API 일부와 예외 처리를 보완했습니다.",
      "core": [
        "이력서 업로드·분석 결과·로드맵 페이지를 구현했습니다.",
        "Redux Toolkit의 auth·resume·roadmap 상태를 설계했습니다.",
        "Axios 인터셉터로 인증 토큰 첨부와 401 응답 시 세션 초기화·로그인 이동을 공통 처리했습니다.",
        "Resume CRUD API 일부를 구현·수정하고 입력 검증과 예외 처리를 보완했습니다."
      ],
      "impact": "문서 업로드·분석 결과·커리어 로드맵을 하나의 대시보드에서 관리하는 흐름을 구현하고, 인증 실패를 공통 처리하도록 정리했습니다."
    },
    "techReasons": [
      {
        "tech": "React · TypeScript · Redux Toolkit",
        "reason": "인증, 이력서 버전, 로드맵처럼 여러 화면에서 공유하는 데이터를 구분해 관리하기 위해 사용했습니다.",
        "implementation": "대시보드 페이지와 auth·resume·roadmap 상태를 구성했습니다."
      },
      {
        "tech": "Axios",
        "reason": "API마다 인증 토큰과 세션 만료 처리를 반복하지 않도록 사용했습니다.",
        "implementation": "요청 인터셉터에서 토큰을 첨부하고 401 응답은 세션 초기화와 로그인 이동으로 처리했습니다."
      },
      {
        "tech": "Express · MongoDB",
        "reason": "기존 Node.js API와 이력서 데이터 구조를 유지하며 기능을 확장하기 위해 사용했습니다.",
        "implementation": "Resume CRUD API 일부 구현·수정과 입력 검증·예외 처리에 기여했습니다."
      },
      {
        "tech": "Azure Document Intelligence · Gemini",
        "reason": "PDF의 텍스트 추출과 추출한 이력서의 분석·리라이팅 역할을 분리한 서비스 구조입니다.",
        "implementation": "서비스에서 문서를 텍스트로 추출한 뒤 점수·리뷰·리라이팅·로드맵을 생성합니다. 본인은 해당 결과를 보여주는 화면과 상태·API 연동을 담당했습니다."
      }
    ],
    "troubleshooting": [
      {
        "kind": "design",
        "title": "인증 토큰과 세션 만료를 공통 요청 계층으로 통합",
        "problem": "이력서·로드맵 등 보호 API를 사용하는 여러 화면에서 토큰 전송과 세션 만료 후 처리가 일관되게 동작해야 했습니다.",
        "cause": "요청별로 인증 처리를 작성하면 같은 책임이 여러 화면에 분산됩니다.",
        "checks": [
          "401 이후 Redux 인증 상태와 로그인 화면 이동을 함께 처리해야 합니다."
        ],
        "steps": [
          "보호 API 요청 흐름 정리",
          "Axios 인터셉터 구성",
          "인증 토큰 자동 첨부",
          "401 공통 처리",
          "세션 초기화·로그인 이동 연결"
        ],
        "solution": "Axios 요청 인터셉터에서 토큰을 자동 첨부하고, 401 응답을 공통 처리해 세션을 초기화한 뒤 로그인 페이지로 이동하도록 구성했습니다.",
        "comparison": [
          {
            "label": "토큰 전송",
            "before": "API마다 공통 인증 처리가 필요",
            "after": "요청 인터셉터에서 자동 첨부"
          },
          {
            "label": "세션 만료",
            "before": "상태·화면 이동의 일관성 필요",
            "after": "401 → 세션 초기화 → 로그인 이동"
          }
        ],
        "result": "이력서와 로드맵 화면에서 공통된 인증 요청·만료 처리 흐름을 사용할 수 있게 했습니다."
      }
    ],
    "outcomes": [
      "이력서 업로드·버전별 분석·로드맵 대시보드 구현",
      "auth·resume·roadmap 도메인별 Redux 상태 구성",
      "Axios 토큰 전송·401 응답 공통 처리",
      "이력서 CRUD 일부와 입력 검증·예외 처리 보완"
    ],
    "retrospective": [
      {
        "limitation": "문서 텍스트 추출 결과와 AI 분석 결과를 같은 기준으로 평가하기는 어렵습니다.",
        "improvement": "추출 누락 여부와 리뷰의 유용성을 구분한 평가 항목을 정의하고 업로드·분석 실패 상태를 함께 검증할 계획입니다."
      },
      {
        "limitation": "세션 만료와 진행 중인 문서 작업이 겹칠 때 사용자 흐름을 더 세밀하게 다룰 필요가 있습니다.",
        "improvement": "분석 도중 401·네트워크 오류·재로그인을 시나리오로 검증하고 작업 복구 정책을 정리할 계획입니다."
      }
    ]
  }
];

/** 시작일 기준 최신순. 배열 순서를 직접 관리하지 않아도 되도록 파생시킨다 */
export const projectsByRecency: Project[] = [...projects].sort(
  (a, b) => parseStartMonth(b.period) - parseStartMonth(a.period)
);

/** 대표 프로젝트. 여기 적힌 순서대로 홈·프로젝트 페이지 상단에 노출된다 */
const FEATURED_PROJECT_IDS = ['zani', 'netplus', 'studypot', 'studyroom-reservation', 'kakao-enterprise-pbl', 'loventure'];

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
