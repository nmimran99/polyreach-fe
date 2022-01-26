import { createContext, useEffect, useRef, useState } from "react";
import { getNotifications } from "../api/notificationsApi";
import useUser from "../hooks/useUser";

export const NotificationsContext = createContext();

export const NotificationsContextProvider = (props) => {
	const { user } = useUser();
	const [notifications, setNotifications] = useState([]);
	const [page, setPage] = useState(0);
	const [unreadNF, setUnreadNF] = useState(0);
	const notificationsRef = useRef();

	useEffect(() => {
		notificationsRef.current = notifications;
	}, [notifications]);

	useEffect(() => {
		getData();
	}, [page]);

	const getData = async () => {
		const res = await getNotifications(user._id, page);
		if (res) {
			setNotifications([...notificationsRef.current, ...res.notifications]);
			return;
		}
		setNotifications([]);
	};

	return (
		<NotificationsContext.Provider
			value={{
				notifications,
				setNotifications,
				unreadNF,
				setUnreadNF,
				page,
				setPage,
				notificationsRef,
			}}
		>
			{props.children}
		</NotificationsContext.Provider>
	);
};
