module.exports = {
    // ... 나머지 설정
    testEnvironment: "jsdom",
    testEnvironmentOptions: {
        resources: "usable"
    },
    setupFilesAfterEnv: ['./jest.setup.js'],
    testURL: "http://localhost:8000"
};