module.exports = {
    rootDir: '.',

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
        '~/(.*)$': '<rootDir>/src/$1',
        '@/(.*)$': '<rootDir>/src/.vuepress/$1',
        '\\.s?css$': '<rootDir>/tests/unit/mocks/dummyMock.js',
        '\\.svg$': '<rootDir>/tests/unit/mocks/dummyMock.js',
    },

    setupFiles: [
        'jest-canvas-mock',
    ],

    globals: {
        UNIT_TEST_MODE: true,
    },

    preset: '@vue/cli-plugin-unit-jest/presets/no-babel',
};
