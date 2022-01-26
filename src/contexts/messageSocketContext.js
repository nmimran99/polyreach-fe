import React, { createContext, useContext, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import io from "socket.io-client";
import useUser from "../hooks/useUser";
import { ConversationsContext } from "./conversationsContext";

export const MessagesSocketContext = createContext();

export const MessagesSocketContextProvider = ({ children }) => {
	const { user } = useUser();
	const [socket, setSocket] = useState(null);
	const [myMessageSocketId, setMyMessageSocketId] = useState(null);

	useEffect(() => {
		if (socket) return;
		const newSocket = io.connect(`${process.env.REACT_APP_BACKEND_CHAT_URL}`, {
			query: { id: user._id },
		});
		setSocket(newSocket);
		return () => newSocket.close();
	}, []);

	return (
		<MessagesSocketContext.Provider
			value={{
				socket,
				setSocket,
				myMessageSocketId,
				setMyMessageSocketId,
			}}
		>
			{children}
		</MessagesSocketContext.Provider>
	);
};
