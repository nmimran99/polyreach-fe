import useModals from "../../hooks/useModals";
import ActiveConversations from "../messenger/activeConversation/ActiveConversations";
import UserMenu from "../user/UserMenu";
import Calls from "./callHistory/Calls";
import MyNetwork from "./network/MyNetwork";
import Notifications from "./notifications/Notifications";

export default function Popups({}) {
	const { modalType } = useModals();

	const modals = {
		callHistory: <Calls />,
		network: <MyNetwork />,
		notifications: <Notifications />,
		menu: <UserMenu />,
	};

	return (
		<>
			{modals[modalType]}
			<ActiveConversations />
		</>
	);
}
