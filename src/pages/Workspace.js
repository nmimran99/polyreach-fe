import { Route, Routes } from "react-router-dom";
import ActiveUsers from "../components/main/activeUsers/ActiveUsers";
import Popups from "../components/main/Popups";
import StatusBar from "../components/main/status/Statusbar";
import CallInterface from "../components/main/userInteraction/CallInterface";
import IncomingCall from "../components/main/userInteraction/IncomingCall";
import InitiatingCall from "../components/main/userInteraction/InitiatingCall";
import Messenger from "../components/messenger/Messenger";
import Navbar from "../components/navbar/Navbar";
import useActiveUsers from "../hooks/useActiveUsers";
import useSocket from "../hooks/useSocket";
import UserPage from "./user/UserPage";

export default function Workspace({}) {
	const { stream, call, callAccepted, initiating } = useSocket();
	const { activeUsers } = useActiveUsers();

	return (
		<div className="w-screen h-screen flex jsutify-center overflow-auto">
			<Navbar />
			<Routes>
				<Route index element={<ActiveUsers data={activeUsers} />} />
				<Route path="user/:userId" element={<UserPage />} />
			</Routes>

			{call && !callAccepted && <IncomingCall />}
			{initiating && <InitiatingCall />}
			{!initiating && stream && <CallInterface />}
			<Popups />
			<Messenger />
		</div>
	);
}
