export default {
  testEnvironment: "node",
  testTimeout: 60000,
  forceExit: true,
  detectOpenHandles: true,
  setupFilesAfterEnv: ["./tests/jest.setup.js"]
};
