import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { ThemeContext } from "../../contexts/themeContext";
import useCallHistory from "../../hooks/useCallHistory";
import useModals from "../../hooks/useModals";
import Badge from "./Badge";

export default function DesktopNavbar({ user, handleClick }) {
	const { theme } = useContext(ThemeContext);
	const { modalType } = useModals();
	const [scrollIsZero, setScrollIsZero] = useState(true);
	const { unreadCH } = useCallHistory();

	useEffect(() => {
		scrollListener();
	}, []);

	const scrollListener = useCallback(() => {
		window.addEventListener("scroll", () => {
			if (window.scrollY !== 0 && scrollIsZero) {
				setScrollIsZero(false);
			} else {
				setScrollIsZero(true);
			}
		});
	});

	return (
		<div
			className={`fixed top-0 left-0 w-full h-16 items-center justify-between z-50 hidden md:flex
${
	!scrollIsZero &&
	"trasnsition-all duration-300 shadow-lg bg-primary border-bottom border-primary"
}
`}
		>
			<div className="px-4 flex w-max">
				<Link to="/">
					<img src={`/icons/Polyreach_${theme}.svg`} className="w-28 md:w-40" />
				</Link>
			</div>

			<div className="p-3 flex items-center justify-between w-max">
				<button
					className={`p-3 rounded-full ${
						modalType === "network" && "bg-black"
					}`}
					onClick={handleClick("network")}
				>
					<img src={`/icons/Reach.svg`} className="w-7" />
				</button>
				<button
					className={`p-3 rounded-full ${
						modalType === "messages" && "bg-black"
					}`}
					onClick={handleClick("messages")}
				>
					<img src={`/icons/Chats_${theme}.svg`} className="w-7" />
				</button>
				<Badge count={unreadCH}>
					<button
						className={`p-3 rounded-full ${
							modalType === "callHistory" && "bg-black"
						}`}
						onClick={handleClick("callHistory")}
					>
						<img src={`/icons/Notebook_${theme}.svg`} className="w-7" />
					</button>
				</Badge>
				<button
					className={`p-3 rounded-full ${
						modalType === "notifications" && "bg-black"
					}`}
					onClick={handleClick("notifications")}
				>
					<img src={`/icons/Bell_${theme}.svg`} className="w-7" />
				</button>
				<button
					className={`p-3 rounded-full ${modalType === "menu" && "bg-black"}`}
					onClick={handleClick("menu")}
				>
					<img src={`/icons/Menu_${theme}.svg`} className="w-7" />
				</button>
				<button className="px-4" onClick={handleClick("account")}>
					<img src={user && user.avatar} className="rounded-full w-8 sm:w-10" />
				</button>
			</div>
		</div>
	);
}
