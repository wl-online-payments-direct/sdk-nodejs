export default {
  preset: "ts-jest/presets/default-esm",
  testEnvironment: "node",
  extensionsToTreatAsEsm: [".ts"],
  moduleNameMapper: {
    "^(\\.{1,2}/.*)\\.js$": "$1"
  },
  transform: {
    "^.+\\.ts$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.json" }]
  },
  // Add this to prevent projects from overriding ESM settings
  projects: [
    {
      displayName: "unit",
      testMatch: ["<rootDir>/__tests__/unit/**/*.test.ts"],
      // Re-declare ESM configs per project
      preset: "ts-jest/presets/default-esm",
      extensionsToTreatAsEsm: [".ts"],
      moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
      },
      transform: {
        "^.+\\.ts$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.json" }]
      }
    },
    {
      displayName: "integration",
      testMatch: ["<rootDir>/__tests__/integration/**/*.test.ts"],
      // Repeat the same for integration tests
      preset: "ts-jest/presets/default-esm",
      extensionsToTreatAsEsm: [".ts"],
      moduleNameMapper: {
        "^(\\.{1,2}/.*)\\.js$": "$1"
      },
      transform: {
        "^.+\\.ts$": ["ts-jest", { useESM: true, tsconfig: "tsconfig.json" }]
      },
      globalSetup: "./__tests__/integration/__setup__/serverInit.ts",
      globalTeardown: "./__tests__/integration/__setup__/teardown.ts"
    }
  ]
};
