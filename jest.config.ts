import type { Config } from 'jest';
import { pathsToModuleNameMapper } from 'ts-jest';
import tsconfig from './tsconfig.json';

const config: Config = {
  preset: 'jest-preset-angular',
  setupFilesAfterEnv: ['<rootDir>/setup-jest.ts'],
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(ts|js|html)$': 'jest-preset-angular',
  },
  moduleNameMapper: pathsToModuleNameMapper(
    tsconfig.compilerOptions.paths || {},
    { prefix: '<rootDir>/' }
  ),
};

export default config;
