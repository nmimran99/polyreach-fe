module.exports = {
	content: ["./src/**/*.{js,jsx,ts,tsx}"],
	theme: {
		height: (theme) => ({
			auto: "auto",
			...theme("spacing"),
			full: "100%",
			screen: "calc(var(--vh) * 100)",
		}),
		minHeight: (theme) => ({
			0: "0",
			...theme("spacing"),
			full: "100%",
			screen: "calc(var(--vh) * 100)",
		}),
		screens: {
			sm: "640px",
			// => @media (min-width: 640px) { ... }

			md: "768px",
			// => @media (min-width: 768px) { ... }

			lg: "1024px",
			// => @media (min-width: 1024px) { ... }

			xl: "1280px",
			// => @media (min-width: 1280px) { ... }

			"2xl": "1536px",
			// => @media (min-width: 1536px) { ... }
		},
		fontFamily: {
			poppins: ["Poppins"],
		},
		extend: {
			backgroundColor: {
				primary: "var(--color-bg-primary)",
				secondary: "var(--color-bg-secondary)",
			},
			textColor: {
				accent: "var(--color-text-accent)",
				primary: "var(--color-text-primary)",
				secondary: "var(--color-text-secondary)",
			},
			borderColor: {
				primary: "var(--color-border-primary)",
				secondary: "var(--color-border-secondary)",
				accent: "var(--color-bg-secondary)",
			},
			ringColor: {
				primary: "var(--color-bg-primary)",
				secondary: "var(--color-bg-secondary)",
			},
		},
	},
	plugins: [],
};
