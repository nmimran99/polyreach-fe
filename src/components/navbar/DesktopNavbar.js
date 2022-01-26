import { useCallback } from "react";
import { Link } from "react-router-dom";
import { useContext, useEffect, useState } from "react/cjs/react.development";
import { ThemeContext } from "../../contexts/themeContext";
import useCallHistory from "../../hooks/useCallHistory";
import useConversations from "../../hooks/useConversations";
import useModals from "../../hooks/useModals";
import useNotifications from "../../hooks/useNotificaitions";
import Badge from "./Badge";

export default function DesktopNavbar({ user, handleClick }) {
	const { theme } = useContext(ThemeContext);
	const { modalType } = useModals();
	const { unreadCH } = useCallHistory();
	const { totalUnread } = useConversations();
	const { unreadNF } = useNotifications();

	return (
		<div
			className={`fixed top-0 left-0 w-full h-16 items-center justify-between z-50 bg-opacity-80 backdrop-filter backdrop-blur-md  hidden md:flex
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
						modalType === "network" && "bg-black bg-opacity-20"
					}`}
					onClick={handleClick("network")}
				>
					<img src={`/icons/Reach.svg`} className="w-7" />
				</button>
				<Badge count={totalUnread}>
					<button
						className={`p-3 rounded-full ${
							modalType === "messages" && "bg-black bg-opacity-20"
						}`}
						onClick={handleClick("messages")}
					>
						<img src={`/icons/Chats_${theme}.svg`} className="w-7" />
					</button>
				</Badge>

				<Badge count={unreadCH}>
					<button
						className={`p-3 rounded-full ${
							modalType === "callHistory" && "bg-black bg-opacity-20"
						}`}
						onClick={handleClick("callHistory")}
					>
						<img src={`/icons/Notebook_${theme}.svg`} className="w-7" />
					</button>
				</Badge>
				<Badge count={unreadNF}>
					<button
						className={`p-3 rounded-full ${
							modalType === "notifications" && "bg-black bg-opacity-20"
						}`}
						onClick={handleClick("notifications")}
					>
						<img src={`/icons/Bell_${theme}.svg`} className="w-7" />
					</button>
				</Badge>

				<button
					className={`p-3 rounded-full ${
						modalType === "menu" && "bg-black bg-opacity-20"
					}`}
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
