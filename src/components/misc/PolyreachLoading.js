import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";

export default function PolyreachLoading({}) {
	const { theme } = useContext(ThemeContext);

	return (
		<div className="w-screen h-screen flex items-center justify-center">
			<img
				src={`/icons/Polyreach_${theme}.svg`}
				className="w-48 animate-pulse"
			/>
		</div>
	);
}
