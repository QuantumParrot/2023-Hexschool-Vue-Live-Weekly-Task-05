/* eslint-env node */

require('@rushstack/eslint-patch/modern-module-resolution')

module.exports = {
  root: true,
  'extends': [
  'plugin:vue/vue3-essential',
  'eslint:recommended',
  '@vue/eslint-config-prettier/skip-formatting'
  ],
  parserOptions: {
  ecmaVersion: 'latest'
  }
}

/* airbnb code style */

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     es2021: true,
//   },
//   extends: [
//     'plugin:vue/vue3-essential',
//     'eslint:recommended',
//     'airbnb-base',
//   ],
//   overrides: [
//   ],
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module',
//   },
//   settings: {
//     'import/resolver': {
//       alias: {
//         map: [
//           ['@', './src'],
//         ],
//         extensions: ['.js', '.vue'],
//       },
//     },
//     'import/core-modules': [
//       'vite',
//       '@vitejs/plugin-vue',
//     ],
//   },
//   plugins: [
//     'vue',
//   ],
//   rules: {
//   },
// };

/* standard code style */

// module.exports = {
//   root: true,
//   env: {
//     browser: true,
//     es2021: true
//   },
//   extends: [
//     'plugin:vue/vue3-essential',
//     'standard'
//   ],
//   overrides: [
//   ],
//   parserOptions: {
//     ecmaVersion: 'latest',
//     sourceType: 'module'
//   },
//   settings: {
//     'import/resolver': {
//       alias: {
//         map: [
//           ['@', './src']
//         ],
//         extensions: ['.js', '.vue']
//       }
//     }
//   },
//   plugins: [
//     'vue'
//   ],
//   rules: {
//   }
// }
