import { useContext, useState, useEffect, useRef } from "react";
import { ConversationsContext } from "../contexts/conversationsContext";
import { MessagesSocketContext } from "../contexts/messageSocketContext";
import useUser from "./useUser";

export default function useConversations() {
	const { user } = useUser();
	const { conversations, setConversations, totalUnread, setTotalUnread } =
		useContext(ConversationsContext);
	const { socket } = useContext(MessagesSocketContext);

	useEffect(() => {
		calcTotalUnread();
	}, [conversations]);

	const readMessages = (data) => {
		socket.emit("read-messages", {
			conversationId: data._id,
			from: data.participant._id,
		});
		let newConvs = conversations;
		newConvs.forEach((convo) => {
			convo.messages.forEach((m) => {
				if (!m.read && m.from !== user._id) {
					m.read = true;
				}
			});
		});
		setConversations(newConvs);
		calcTotalUnread();
	};

	const calcTotalUnread = () => {
		let total = conversations.reduce((total, convo) => {
			let convoTotal = convo.messages.reduce(
				(t, m) => (!m.read && m.from !== user._id ? t + 1 : t),
				0
			);
			return total + convoTotal;
		}, 0);
		setTotalUnread(total);
	};

	return {
		conversations,
		setConversations,
		readMessages,
		totalUnread,
		calcTotalUnread,
	};
}
