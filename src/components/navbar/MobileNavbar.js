import useCallHistory from "../../hooks/useCallHistory";
import useModals from "../../hooks/useModals";
import Badge from "./Badge";

export default function MobileNavbar({ user, handleClick }) {
	const { modalType } = useModals();
	const { unreadCH } = useCallHistory();

	return (
		<div className="h-22 pb-6 flex items-center justify-between fixed bottom-0 w-screen border-t border-primary z-40 bg-mid md:hidden">
			<button
				className={`p-4  ${modalType == null && "border-t-4 border-accent"}`}
				onClick={handleClick(null)}
			>
				<img src={`/icons/Reach.svg`} className="w-7" />
			</button>
			<button
				className={`p-4  ${
					modalType == "network" && "border-t-4 border-accent"
				}`}
				onClick={handleClick("network")}
			>
				<img src={`/icons/AddressBook_dark.svg`} className="w-7" />
			</button>
			<button
				className={`p-4 ${
					modalType == "messages" && "border-t-4 border-accent"
				}`}
				onClick={handleClick("messages")}
			>
				<img src={`/icons/Chats_dark.svg`} className="w-7" />
			</button>
			<Badge count={unreadCH}>
				<button
					className={`p-4 ${
						modalType == "callHistory" && "border-t-4 border-accent"
					}`}
					onClick={handleClick("callHistory")}
				>
					<img src={`/icons/Notebook_dark.svg`} className="w-7" />
				</button>
			</Badge>

			<button
				className={`p-4 ${
					modalType == "notifications" && "border-t-4 border-accent"
				}`}
				onClick={handleClick("notifications")}
			>
				<img src={`/icons/Bell_dark.svg`} className="w-7" />
			</button>
			<button
				className={`p-4  ${modalType == "menu" && "border-t-4 border-accent"}`}
				onClick={handleClick("menu")}
			>
				<img src={`/icons/Menu_dark.svg`} className="w-7" />
			</button>
		</div>
	);
}
