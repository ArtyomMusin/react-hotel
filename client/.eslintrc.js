module.exports = {
    env: {
        browser: true,
        es2021: true
    },
    extends: ['plugin:react/recommended', 'standard'],
    parserOptions: {
        ecmaFeatures: {
            jsx: true
        },
        ecmaVersion: 'latest',
        sourceType: 'module'
    },
    plugins: ['react'],
    rules: {
        indent: ['error', 4],
        'space-before-function-paren': ['error', 'never'],
        'multiline-ternary': ['off'],
        'no-multi-spaces': ['error', { ignoreEOLComments: true }]
    }
}
