import useUser from "../../hooks/useUser";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import useModals from "../../hooks/useModals";
import useCallHistory from "../../hooks/useCallHistory";
import useConversations from "../../hooks/useConversations";
import useNotifications from "../../hooks/useNotificaitions";

export default function Navbar() {
	const { user } = useUser();
	const { setModalType } = useModals();
	const { handleReadCH, unreadCH } = useCallHistory();
	const { handleReadNF, unreadNF } = useNotifications();

	const handleClick = (type) => async (event) => {
		setModalType(type);
		if (type === "callHistory") {
			if (unreadCH > 0) {
				await handleReadCH();
			}
		} else if (type === "notifications") {
			if (unreadNF > 0) {
				await handleReadNF();
			}
		}
	};

	return (
		<>
			<DesktopNavbar user={user} handleClick={handleClick} />
			<MobileNavbar user={user} handleClick={handleClick} />
		</>
	);
}
