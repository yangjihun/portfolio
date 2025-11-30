# 양지훈 포트폴리오

Next.js 15 + TypeScript + Tailwind CSS로 제작된 개발자 포트폴리오 웹사이트입니다.

## 기술 스택

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animation**: Framer Motion
- **Deployment**: Static Export

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

## 프로젝트 추가하기

새로운 프로젝트를 추가하려면 `src/data/projects.ts` 파일에 프로젝트 객체를 추가하기만 하면 됩니다.

```typescript
{
  id: 'project-slug',
  name: '프로젝트 이름',
  period: '2025.01 ~ 2025.02',
  role: 'Frontend Developer',
  category: 'frontend',
  summary: '프로젝트 한 줄 요약',
  techTags: ['React', 'TypeScript'],
  highlights: ['특징 1', '특징 2'],
  responsibilities: ['역할 1', '역할 2'],
  links: [
    { label: 'GitHub', href: 'https://github.com/...' }
  ]
}
```

추가한 프로젝트는 자동으로 프로젝트 목록 페이지와 상세 페이지에 반영됩니다.

