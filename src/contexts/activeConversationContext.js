import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import useConversations from "../hooks/useConversations";
import useToggle from "../hooks/useToggle";
import { ConversationsContext } from "./conversationsContext";

export const ActiveConversationContext = createContext();

export const ActiveConversationContextProvider = ({ children }) => {
	const [current, setCurrent] = useState(null);
	const [unread, setUnread] = useState(false);
	const [minimized, toggleMinimize] = useToggle(false);
	const [pstatus, setPStatus] = useState(null);
	const { conversations, readMessages } = useConversations();

	useEffect(() => {
		if (!current) return;
		let curr = conversations.find((c) => c._id == current._id);
		setCurrent({ ...curr });
		setPStatus(curr.participant.status.status);
	}, [conversations]);

	return (
		<ActiveConversationContext.Provider
			value={{
				current,
				setCurrent,
				unread,
				setUnread,
				minimized,
				toggleMinimize,
				pstatus,
				setPStatus,
			}}
		>
			{children}
		</ActiveConversationContext.Provider>
	);
};
