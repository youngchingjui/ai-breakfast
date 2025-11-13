export default [
  {
    files: ['**/*.{js,jsx}'],
    ignores: ['node_modules/**', '.next/**', 'dist/**'],
    languageOptions: {
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
        ecmaFeatures: { jsx: true },
      },
    },
    rules: {},
  },
]

