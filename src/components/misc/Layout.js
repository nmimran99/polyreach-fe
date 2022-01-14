import { ThemeProvider } from "../../contexts/themeContext";
import { AuthContextProvider } from "../../contexts/authContext";
import { useEffect } from "react";
import { SnackbarContextProvider } from "../../contexts/snackbarContext";
import { DialogContextProvider } from "../../contexts/dialogContext";

export default function Layout({ children }) {
	useEffect(() => {
		// only execute all the code below in client side
		if (typeof window !== "undefined") {
			// Handler to call on window resize
			function handleResize() {
				let vh = window.innerHeight * 0.01;
				document.documentElement.style.setProperty("--vh", `${vh}px`);
			}

			// Add event listener
			window.addEventListener("resize", handleResize);

			// Call handler right away so state gets updated with initial window size
			handleResize();

			// Remove event listener on cleanup
			return () => window.removeEventListener("resize", handleResize);
		}
	}, []);

	return (
		<AuthContextProvider>
			<ThemeProvider>
				<DialogContextProvider>
					<SnackbarContextProvider>
						<div className="bg-primary w-screen h-screen p-0 m-0">
							{children}
						</div>
					</SnackbarContextProvider>
				</DialogContextProvider>
			</ThemeProvider>
		</AuthContextProvider>
	);
}
