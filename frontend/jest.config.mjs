/**
 * @type {import('@jest/types').Config.InitialOptions}
 */

const config = {
  setupFiles: ['jest-webextension-mock'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testRegex: ['^.+\\.test.tsx?$'],
  moduleDirectories: ['node_modules', '<rootDir>/src/', '<rootDir>/tests/unit/'],
  moduleNameMapper: { '@/(.*)$': '<rootDir>/src/$1', 'data-base64:~/../(.*)$': '<rootDir>/$1' },
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': ['ts-jest', { isolatedModules: true, useESM: true }],
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: { jsx: 'react-jsx' } }],
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
};

export default config;
