/**@type {import('jest').Config}*/
const config = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/$1',
    '\\.(css|scss|sass)$': 'identity-obj-proxy',
  },
  transform: {
    '^.+.tsx?$': ['ts-jest', {
      tsconfig: 'tsconfig.jest.json',
    },]
  }
};

module.exports = config;