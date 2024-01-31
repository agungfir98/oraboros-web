/** @type {import('tailwindcss').Config} */
module.exports = {
	content: [
		"./app/**/*.{js,jsx,ts,tsx,mdx}",
		"./pages/**/*.{js,jsx,ts,tsx,mdx}",
		"./components/**/*.{js,jsx,ts,tsx,mdx}",
	],
	theme: {
		extend: {
			boxShadow: {
				"solid-base": "0.5rem 1rem 0rem rgba(0,0,0,1)",
			},
		},
	},
	plugins: [],
};
