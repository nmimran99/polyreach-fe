import useUser from "../../hooks/useUser";
import DesktopNavbar from "./DesktopNavbar";
import MobileNavbar from "./MobileNavbar";
import useModals from "../../hooks/useModals";
import useCallHistory from "../../hooks/useCallHistory";

export default function Navbar() {
	const { user } = useUser();
	const { setModalType } = useModals();
	const { handleReadCH } = useCallHistory();

	const handleClick = (type) => async (event) => {
		setModalType(type);
		if (type === "callHistory") {
			await handleReadCH();
		}
	};

	return (
		<>
			<DesktopNavbar user={user} handleClick={handleClick} />
			<MobileNavbar user={user} handleClick={handleClick} />
		</>
	);
}
