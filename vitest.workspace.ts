import { defineWorkspace } from "vitest/config";

export default defineWorkspace([
  {
    test: {
      name: "ivr-tester",
      root: "packages/ivr-tester",
      include: ["src/**/*.spec.ts"],
      globals: false,
      environment: "node",
    },
  },
  {
    test: {
      name: "cli",
      root: "packages/cli",
      include: ["src/**/*.spec.ts"],
      globals: false,
      environment: "node",
    },
  },
  {
    test: {
      name: "cli-integration",
      root: "packages/cli",
      include: ["integration-tests/**/*.spec.ts"],
      globals: false,
      environment: "node",
    },
  },
  {
    test: {
      name: "transcriber-amazon",
      root: "packages/transcriber-amazon-transcribe",
      include: ["__tests__/**/*.spec.ts"],
      globals: false,
      environment: "node",
      testTimeout: 60000,
    },
  },
  {
    test: {
      name: "transcriber-google",
      root: "packages/transcriber-google-speech-to-text",
      include: ["__tests__/**/*.spec.ts"],
      globals: false,
      environment: "node",
      testTimeout: 60000,
    },
  },
]);
