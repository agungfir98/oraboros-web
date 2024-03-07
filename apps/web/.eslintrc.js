/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["./postcss.config.js", "./tailwind.config.ts"],
  root: true,
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
};
