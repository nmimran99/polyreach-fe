import { useContext, useEffect } from "react";
import { readNotifications } from "../api/notificationsApi";
import { NotificationsContext } from "../contexts/notificationsContext";
import useSocket from "./useSocket";
import useUser from "./useUser";

export default function useNotifications() {
	const { user } = useUser();
	const { socket } = useSocket();
	const {
		notifications,
		setNotifications,
		unreadNF,
		setUnreadNF,
		page,
		setPage,
		notificationsRef,
	} = useContext(NotificationsContext);

	useEffect(() => {
		if (!socket) return;
		socket.on("started-following", ({ notification }) => {
			setNotifications([notification, ...notificationsRef.current]);
		});
	}, [socket]);

	useEffect(() => {
		if (!notifications) {
			setUnreadNF(0);
			return;
		}
		let totalUnread = notifications.reduce((total, nf) => {
			if (!nf.read) {
				return total + 1;
			}
			return total;
		}, 0);

		setUnreadNF(totalUnread);
	}, [notifications]);

	const loadNextPage = () => {
		setPage(page + 1);
	};

	const handleReadNF = async () => {
		const res = await readNotifications(user._id);
		if (res) {
			setUnreadNF(0);
		}
	};

	return {
		notifications,
		setNotifications,
		loadNextPage,
		unreadNF,
		handleReadNF,
	};
}
