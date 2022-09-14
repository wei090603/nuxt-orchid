module.exports = {
  // 设置我们的运行环境为浏览器 + es2021 + node ,否则eslint在遇到 Promise，window等全局对象时会报错
  "env": {
      "browser": true,
      "es2021": true,
      "node": true
  },
  // 继承eslint推荐的规则集，vue基本的规则集，typescript的规则集
  "extends": [
    "eslint:recommended",
    "plugin:vue/vue3-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:prettier/recommended"
  ],
  "parser": "vue-eslint-parser",
  "parserOptions": {
    "ecmaVersion": "latest",
    "parser": "@typescript-eslint/parser",
    "sourceType": "module"
  },
  // 添加vue和@typescript-eslint插件，增强eslint的能力
  "plugins": [
      "vue",
      "@typescript-eslint"
  ],
  "rules": {
  }
}

