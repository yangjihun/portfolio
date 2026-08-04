import coreWebVitals from 'eslint-config-next/core-web-vitals';

// ESLint 9는 flat config만 지원하고 Next 16에서 `next lint`가 제거되어
// .eslintrc.json 대신 이 파일을 사용한다.
const config = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts'],
  },
  ...coreWebVitals,
];

export default config;
