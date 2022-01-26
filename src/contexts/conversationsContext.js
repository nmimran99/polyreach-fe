import React, { createContext, useEffect, useState, useRef } from "react";

export const ConversationsContext = createContext();

export const ConversationsContextProvider = ({ children }) => {
	const [conversations, setConversations] = useState([]);
	const [totalUnread, setTotalUnread] = useState(0);
	const convsRef = useRef();

	useEffect(() => {
		convsRef.current = conversations;
	}, [conversations]);

	return (
		<ConversationsContext.Provider
			value={{
				conversations,
				setConversations,
				convsRef,
				totalUnread,
				setTotalUnread,
			}}
		>
			{children}
		</ConversationsContext.Provider>
	);
};
