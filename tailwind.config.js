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
				mid: "var(--color-bg-mid)",
				active: "var(--color-active)",
				busy: "var(--color-busy)",
				inactive: "var(--color-inactive)",
			},
			textColor: {
				accent: "var(--color-text-accent)",
				primary: "var(--color-text-primary)",
				secondary: "var(--color-text-secondary)",
			},
			borderColor: {
				primary: "var(--color-border-primary)",
				secondary: "var(--color-border-secondary)",
				light: "var(--color-border-light)",
				accent: "var(--color-bg-secondary)",
				active: "var(--color-active)",
				busy: "var(--color-busy)",
				inactive: "var(--color-inactive)",
			},
			ringColor: {
				primary: "var(--color-bg-primary)",
				secondary: "var(--color-bg-secondary)",
				active: "var(--color-active)",
				busy: "var(--color-busy)",
				inactive: "var(--color-inactive)",
			},
			keyframes: {
				fadeIn: {
					"0%": { opacity: "0" },
					"100%": { opacity: "100" },
				},
				slideUp: {
					"0%": { marginTop: "1000px" },
					"100%": { marginTop: "0" },
				},
				slideLeft: {
					"0%": { translateX: "1000px" },
					"100%": { translateX: "0" },
				},
				slideRight: {
					"0%": { marginRight: "1000px" },
					"100%": { marginRight: "0" },
				},
				lightpulse: {
					"0%": { borderColor: "rgba(255,255,255,0)" },
					"50%": { borderColor: "rgba(255,255,255,0.5)" },
					"100%": { borderColor: "rgba(255,255,255,0)" },
				},
				pulseblue: {
					"0%": { backgroundColor: "rgb(22,22,22)" },
					"50%": { backgroundColor: "rgb(37,99,235)" },
					"100%": { backgroundColor: "rgb(22,22,22)" },
				},
			},
			animation: {
				fadeIn: "fadeIn 0.3s ease-in-out",
				slideUp: "slideUp 0.3s ease-in-out",
				slideLeft: "slideLeft 0.3s linear",
				slideRight: "slideRight 0.3s linear",
				lightpulse: "lightpulse 2.5s infinite",
				pulseblue: "pulseblue 2.5s infinite",
			},
		},
	},
	plugins: [],
};
