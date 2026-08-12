# 양지훈 포트폴리오

Next.js + TypeScript + Tailwind CSS로 제작된 개발자 포트폴리오 웹사이트입니다.

## 기술 스택

- **Framework**: Next.js 16 (App Router)
- **Language**: TypeScript
- **UI**: React 19
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion

## 시작하기

```bash
# 의존성 설치
npm install

# 개발 서버 실행
npm run dev

# 프로덕션 빌드
npm run build

# 프로덕션 서버 실행
npm start
```

## 환경 변수

| 이름 | 설명 | 기본값 |
| --- | --- | --- |
| `NEXT_PUBLIC_SITE_URL` | OG 이미지 등 절대 URL 생성에 사용하는 배포 도메인 | `http://localhost:3000` |

## 구조

```
src/
├── app/           # 라우트 (홈 / 소개 / 프로젝트 / 활동 / 연락처)
├── components/    # 공통 UI 컴포넌트
├── data/          # 콘텐츠 원본 (projects / timeline / activities)
└── lib/           # 유틸리티
```

콘텐츠는 모두 `src/data`의 정적 배열이 원본입니다.

- `projects.ts` — 프로젝트. 목록·상세 페이지가 자동 생성되고, 카테고리 배지 스타일(`categoryStyle`)과 최신순 정렬(`projectsByRecency`)도 이 파일에서 파생됩니다.
- `skills.ts` — 소개 페이지 기술 스택 원본. 스킬별 숙련도(1~5)와 활용 수준 설명을 관리합니다.
- `timeline.ts` — 프로그램/해커톤/동아리 등 활동 원본.
- `activities.ts` — 홈에 노출할 활동을 `timeline.ts`에서 id로 골라옵니다. 활동 내용 자체는 `timeline.ts`만 수정하면 됩니다.

> Tailwind가 `src/data`의 클래스 문자열도 스캔하도록 `tailwind.config.ts`의 `content`에 해당 경로가 포함되어 있습니다.

## 프로젝트 추가하기

`src/data/projects.ts` 배열에 객체를 추가하면 목록·상세 페이지, 홈의 주요 프로젝트, 소개 페이지 타임라인에 자동 반영됩니다. 배열 순서는 정렬에 영향을 주지 않고 `period`의 시작 연월을 기준으로 정렬됩니다.

```typescript
{
  id: 'project-slug',
  name: '프로젝트 이름',
  title: '한 줄 설명',
  image: '/asset/project-slug.png',   // public/asset 아래에 파일 배치
  images: ['/asset/project-slug-1.png'], // (선택) 상세 페이지 스크린샷 갤러리
  period: '2025.01 ~ 2025.02',
  role: 'Frontend Developer',
  category: 'frontend',
  summary: '프로젝트 요약',
  techTags: ['React', 'TypeScript'],
  highlights: ['특징 1', '특징 2'],
  responsibilities: ['역할 1', '역할 2'],
  techReasons: [                       // (선택) 어떤 기술을 왜 사용했는지
    { tech: 'React', reason: '선택 이유' }
  ],
  troubleshooting: [                   // (선택) 문제 인식 → 해결 방안 → 개선 성과
    { title: '제목', problem: '문제 인식', solution: '해결 방안', result: '개선 성과' }
  ],
  links: [
    { label: 'GitHub', href: 'https://github.com/...' }
  ]
}
```
