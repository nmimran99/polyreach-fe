import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import PolyreachLoading from "../components/misc/PolyreachLoading";
import { ActiveUsersContextProvider } from "../contexts/activeUsersContext";
import { CallHistoryContextProvider } from "../contexts/callHistoryContext";
import { ModalsContextProvider } from "../contexts/modalsContext";
import { NetworkContextProvider } from "../contexts/netowrkContext";
import { SocketContextProvider } from "../contexts/socketContext";
import useUser from "../hooks/useUser";
import Workspace from "./Workspace";

export default function InitialRoute() {
	const { user, refreshToken } = useUser();
	const [isLoading, setIsLoading] = useState(true);

	console.log("rendered");
	useEffect(() => {
		checkUserAuth();
	}, []);

	const checkUserAuth = async () => {
		await refreshToken();
		setIsLoading(false);
	};

	return isLoading ? (
		<PolyreachLoading />
	) : user ? (
		<NetworkContextProvider>
			<ActiveUsersContextProvider>
				<CallHistoryContextProvider>
					<ModalsContextProvider>
						<SocketContextProvider id={user._id}>
							<Workspace />
						</SocketContextProvider>
					</ModalsContextProvider>
				</CallHistoryContextProvider>
			</ActiveUsersContextProvider>
		</NetworkContextProvider>
	) : (
		<Navigate to="/auth/login" />
	);
}
