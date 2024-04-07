import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  setupFiles: ['jest-webextension-mock'],
  clearMocks: true,
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testRegex: ['^.+\\.test.tsx?$'],
  moduleDirectories: ['node_modules', '<rootDir>/src/', '<rootDir>/tests/unit/'],
  moduleNameMapper: {
    '@/contents/(.*)$': '<rootDir>/src/contents/$1',
    '@/tests/(.*)$': '<rootDir>/tests/$1',
    'data-base64:~/../(.*)$': '<rootDir>/$1',
  },
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/jest-setup.ts'],
  transform: {
    '^.+\\.ts?$': ['ts-jest', { isolatedModules: true, useESM: true }],
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: { jsx: 'react-jsx' } }],
    '^.+\\.(css|styl|less|sass|scss|png|jpg|gif|ttf|woff|woff2)$': 'jest-transform-stub',
  },
};

export default config;
