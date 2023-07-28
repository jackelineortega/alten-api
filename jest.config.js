module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    collectCoverage: true,
    collectCoverageFrom: [
        'src/**/*.{ts,tsx,js}',
        '!src/utiles.ts',
        '!src/entity.ts'
    ],
    coverageDirectory: 'test/coverage',
    moduleNameMapper:{
        '^~(.*)$': '<rootDir>$1',
        '^@config(.*)$': '<rootDir>/config$1',
        '^@models(.*)$': '<rootDir>/src/models$1',
        '^@modules(.*)$': '<rootDir>/src/modules$1',
        '^@core(.*)$': '<rootDir>/core$1',
        '^@bootstrap(.*)$': '<rootDir>/bootstrap$1',
        '^@base(.*)$': '<rootDir>/src$1',
    },
    coverageThreshold: {
        "global": {
          "branches": 75,
          "functions": 75,
          "lines": 75,
          "statements": 75
        }
    }
}