import type { Config } from '@jest/types';

const config: Config.InitialOptions = {
  preset: 'ts-jest',
  setupFiles: ['jest-webextension-mock'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleDirectories: ['node_modules', '<rootDir>/src/', '<rootDir>/tests/unit/'],
  moduleNameMapper: { '@/(.*)$': '<rootDir>/src/$1' },
  testEnvironment: 'jest-environment-jsdom',
  setupFilesAfterEnv: ['<rootDir>/tests/unit/utils/jest-setup.ts'],
  transform: {
    '^.+\\.ts?$': ['ts-jest', { isolatedModules: true, useESM: true }],
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: { jsx: 'react-jsx' } }],
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
};

export default config;
