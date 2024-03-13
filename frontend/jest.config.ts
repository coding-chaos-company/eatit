import { createRequire } from 'node:module';
import type { Config } from '@jest/types';
import { pathsToModuleNameMapper } from 'ts-jest';

const config: Config.InitialOptions = {
  setupFiles: ['jest-webextension-mock'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  moduleDirectories: ['node_modules', '<rootDir>/src/', '<rootDir>/tests/unit/'],
  moduleNameMapper: { '@/(.*)$': '<rootDir>/src/$1' },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': ['ts-jest', { isolatedModules: true, useESM: true }],
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: { jsx: 'react-jsx' } }],
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
};

export default config;
