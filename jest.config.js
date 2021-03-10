module.exports = {
    rootDir: 'src/',
    transform: {
        '^.+\\.js$': 'babel-jest',
        '^.+\\.vue$': 'vue-jest',
    },
    transformIgnorePatterns: [
        '/node_modules/(?!vue2-google-maps)',
    ],
    moduleFileExtensions: [
        'js',
        'json',
        'vue',
    ],
    moduleNameMapper: {
        '~/(.*)$': '<rootDir>/$1',
        '@/(.*)$': '<rootDir>/.vuepress/$1',
        '\\.s?css$': '<rootDir>/__mocks__/dummyMock.js',
        '\\.svg$': '<rootDir>/__mocks__/dummyMock.js',
    },
    setupFiles: [
        'jest-canvas-mock',
    ],
    globals: {
        UNIT_TEST_MODE: true,
    },
};
