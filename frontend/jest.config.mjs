import { createRequire } from 'node:module';
import { pathsToModuleNameMapper } from 'ts-jest';

const require = createRequire(import.meta.url);
const tsconfig = require('./tsconfig.json');

/**
 * @type {import('@jest/types').Config.InitialOptions}
 */

const config = {
  setupFiles: ['jest-webextension-mock'],
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  testRegex: ['^.+\\.test.tsx?$'],
  moduleNameMapper: pathsToModuleNameMapper(tsconfig.compilerOptions.paths, {
    prefix: '<rootDir>/',
  }),
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.ts?$': ['ts-jest', { isolatedModules: true, useESM: true }],
    '^.+\\.tsx?$': ['ts-jest', { useESM: true, tsconfig: { jsx: 'react-jsx' } }],
    '^.+\\.(css|styl|less|sass|scss|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
};

export default config;
