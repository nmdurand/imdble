export default {
  preset: 'ts-jest',
  transform: {
    "^.+\\.svelte$": [
      "svelte-jester",
      {
        "preprocess": true
      }
    ],
    "^.+\\.ts$": "ts-jest",
    "^.+\\.svg$": "<rootDir>/jest/svgTransform.ts"
  },
  testEnvironment: "jsdom",
  setupFilesAfterEnv: [
    "@testing-library/jest-dom/extend-expect"
  ],
  transformIgnorePatterns: ['<rootDir>/node_modules/'],
};