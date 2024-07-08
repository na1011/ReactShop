import globals from 'globals';
import pluginJs from '@eslint/js';
import tseslint from '@typescript-eslint/eslint-plugin';
import tseslintParser from '@typescript-eslint/parser';
import pluginReactConfig from 'eslint-plugin-react/configs/recommended.js';
import prettierConfig from 'eslint-config-prettier';
import prettierPlugin from 'eslint-plugin-prettier';


export default [
  {
    // 적용할 파일 패턴 설정
    files: ['**/*.{js,mjs,cjs,ts,jsx,tsx}'],
    languageOptions: {
      // TypeScript 파서 설정
      parser: tseslintParser,
      parserOptions: {
        ecmaFeatures: {
          jsx: true, // JSX 지원 설정
        },
        ecmaVersion: 2020, // 최신 ECMAScript 버전 지원
        sourceType: 'module', // 모듈 형식의 코드 지원
      },
      globals: globals.browser, // 브라우저 환경 설정
    },
    plugins: {
      prettier: prettierPlugin, // Prettier 플러그인 추가
    },
    rules: {
      'prettier/prettier': 'error', // Prettier 규칙을 ESLint 규칙으로 추가하고, 오류 수준을 설정
    },
  },
  pluginJs.configs.recommended, // 기본 ESLint 규칙 추가
  tseslint.configs.recommended, // TypeScript-specific ESLint 규칙 추가
  pluginReactConfig, // React-specific ESLint 규칙 추가
  prettierConfig, // Prettier와 충돌하는 ESLint 규칙 비활성화
];