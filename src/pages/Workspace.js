import ActiveUsers from "../components/main/activeUsers/ActiveUsers";
import useActiveUsers from "../hooks/useActiveUsers";
import StatusBar from "../components/main/status/Statusbar";
import Navbar from "../components/navbar/Navbar";
import useSocket from "../hooks/useSocket";
import CallInterface from "../components/main/userInteraction/CallInterface";
import IncomingCall from "../components/main/userInteraction/IncomingCall";
import Popups from "../components/main/Popups";
import InitiatingCall from "../components/main/userInteraction/InitiatingCall";

export default function Workspace({}) {
	const { stream, call, callAccepted, initiating } = useSocket();
	const { activeUsers } = useActiveUsers();

	return (
		<div className="w-screen h-screen flex jsutify-center">
			<Navbar />
			<ActiveUsers data={activeUsers} />
			<StatusBar />
			{call && !callAccepted && <IncomingCall />}
			{initiating && <InitiatingCall />}
			{!initiating && stream && <CallInterface />}
			<Popups />
		</div>
	);
}
