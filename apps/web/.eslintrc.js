/** @type {import("eslint").Linter.Config} */
module.exports = {
	ignorePatterns: ["./postcss.config.js", "./tailwind.config.js"],
	root: true,
	extends: ["@repo/eslint-config/next.js"],
	parser: "@typescript-eslint/parser",
	parserOptions: {
		project: true,
	},
};
