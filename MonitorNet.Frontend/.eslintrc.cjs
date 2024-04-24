/* eslint-env node */
require("@rushstack/eslint-patch/modern-module-resolution")

module.exports = {
  root: true,
  extends: [
    "plugin:vue/vue3-essential",
    "eslint:recommended",
    "@vue/eslint-config-typescript"
  ],
  parserOptions: {
    ecmaVersion: "latest"
  },
  rules: {
    "comma-dangle": ["error", "never"],
    "max-len": ["error", { "code": 145 }],
    "indent": ["error", 2],
    "quotes": [2, "double", { "avoidEscape": true }],
    "semi": ["error", "never"]
  }
}
