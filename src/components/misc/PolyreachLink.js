import { useContext } from "react";
import { Link } from "react-router-dom";
import { ThemeContext } from "../../contexts/themeContext";

export default function PolyreachLink({}) {
	const { theme } = useContext(ThemeContext);
	return (
		<Link to="/">
			<img
				src={`/icons/Polyreach_${theme}.svg`}
				alt="Polyreach"
				className="absolute top-4 left-4 w-42"
			/>
		</Link>
	);
}
