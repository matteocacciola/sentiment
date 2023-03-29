import { configDefaults, defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'node',
    coverage: {
      exclude: [...configDefaults.exclude, '**/utils/*', '**/index.ts', '**/__tests__/*', './libraries/**'],
      provider: 'istanbul',
      reporter: ['text', 'json', 'html', 'lcov'],
      enabled: true,
      statements: 80,
      branches: 80,
      functions: 30,
      lines: 80,
      watermarks: {
        statements: [80, 95],
        branches: [80, 95],
        functions: [30, 85],
        lines: [80, 95],
      },
    },
    onConsoleLog () {
      return false;
    },
  },
});
