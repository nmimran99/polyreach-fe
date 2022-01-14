import { useState } from "react";
import { useEffect } from "react";

export default function useScreenSize() {
	const [screenSize, setScreenSize] = useState(window.innerWidth);

	const screens = {
		sm: 640,
		md: 768,
		lg: 1024,
		xl: 1280,
		"2xl": 1536,
	};

	const isMobile = () => {
		return screenSize < screens.md;
	};

	return { isMobile };
}
