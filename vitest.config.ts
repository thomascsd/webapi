import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      exclude: ['index.ts', '**/node_modules/**', 'dist/**'],
      thresholds: {
        branches: 70,
        functions: 70,
        lines: 70,
        statements: 70,
      },
    },
    include: [
      '**/src/**/__tests__/**/*.[jt]s?(x)',
      '**/src/**/?(*.)+(spec|test).[tj]s?(x)',
      '**/src/**/?(*.)+(spec|test).m[tj]s?(x)',
    ],
  },
});
