import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";
import PolyreachLoading from "../components/misc/PolyreachLoading";
import { ActiveConversationContextProvider } from "../contexts/activeConversationContext";
import { ActiveUsersContextProvider } from "../contexts/activeUsersContext";
import { CallHistoryContextProvider } from "../contexts/callHistoryContext";
import { ConversationsContextProvider } from "../contexts/conversationsContext";
import { MessagesSocketContextProvider } from "../contexts/messageSocketContext";
import { ModalsContextProvider } from "../contexts/modalsContext";
import { NetworkContextProvider } from "../contexts/netowrkContext";
import { NotificationsContextProvider } from "../contexts/notificationsContext";
import { VideoSocketContextProvider } from "../contexts/videoSocketContext";
import useUser from "../hooks/useUser";
import Workspace from "./Workspace";

export default function InitialRoute() {
	const { user, refreshToken } = useUser();
	const [isLoading, setIsLoading] = useState(true);

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
			<MessagesSocketContextProvider>
				<ConversationsContextProvider>
					<ActiveConversationContextProvider>
						<ActiveUsersContextProvider>
							<CallHistoryContextProvider>
								<ModalsContextProvider>
									<VideoSocketContextProvider id={user._id}>
										<NotificationsContextProvider>
											<Workspace />
										</NotificationsContextProvider>
									</VideoSocketContextProvider>
								</ModalsContextProvider>
							</CallHistoryContextProvider>
						</ActiveUsersContextProvider>
					</ActiveConversationContextProvider>
				</ConversationsContextProvider>
			</MessagesSocketContextProvider>
		</NetworkContextProvider>
	) : (
		<Navigate to="/auth/login" />
	);
}
