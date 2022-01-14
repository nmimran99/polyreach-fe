import useModals from "../../hooks/useModals";
import Calls from "./callHistory/Calls";
import MyNetwork from "./network/MyNetwork";

export default function Popups({}) {
	const { modalType } = useModals();

	const modals = {
		callHistory: <Calls />,
		network: <MyNetwork />,
	};

	return <>{modals[modalType]}</>;
}
