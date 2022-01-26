import { useContext, useState } from "react";
import { useEffect, useRef } from "react/cjs/react.development";
import { ActiveConversationContext } from "../../contexts/activeConversationContext";
import { ConversationsContext } from "../../contexts/conversationsContext";
import { MessagesSocketContext } from "../../contexts/messageSocketContext";
import { ThemeContext } from "../../contexts/themeContext";
import useModals from "../../hooks/useModals";
import useScreenSize from "../../hooks/useScreenSize";
import useUser from "../../hooks/useUser";
import ClickAwayListener from "../misc/ClickAwayListener";
import Conversations from "./conversations/Conversations";
import NewChat from "./NewChat";
import useConversations from "../../hooks/useConversations";
import { mAxios as axios } from "../../api/axiosInstance";
import useSWR from "swr";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Messenger({}) {
	const { modalType, setModalType } = useModals();
	const { isMobile } = useScreenSize();
	const { conversations, setConversations, convsRef } =
		useContext(ConversationsContext);
	const { theme } = useContext(ThemeContext);
	const { socket, setMyMessageSocketId } = useContext(MessagesSocketContext);
	const { user } = useUser();
	const { current, setCurrent } = useContext(ActiveConversationContext);
	const [newChat, setNewChat] = useState(false);

	useEffect(() => {
		if (!socket) return;

		socket.emit("userId");

		socket.on("socketid", ({ socketId }) => {
			setMyMessageSocketId(socketId);
			socket.emit("register-socket", { user: user._id });
		});

		socket.on("userConversations", (uc) => {
			let ucc = uc.map((c) => ({
				...c,
				participant: c.participants.find((p) => p._id !== user._id),
			}));
			setConversations(ucc);
		});

		socket.on("receive-message", handleReceive);

		socket.on("request-join", ({ conversation }) => {
			socket.emit("register-conversation", {
				conversationId: conversation._id,
			});
			setConversations([conversation, ...convsRef.current]);
		});
	}, [socket]);

	const handleReceive = (message) => {
		if (!message.conversation) return;
		let convs = convsRef.current;
		let conv = convs.find((c) => c._id == message.conversation._id);
		if (!conv) {
			conv = { ...message.conversation, messages: [message] };
			setConversations([conv, ...convs]);
			return;
		}

		let newConvs = convs.filter((c) => c._id !== message.conversation._id);
		conv.messages.unshift(message);
		setConversations([conv, ...newConvs]);
	};

	const toggleNewChat = () => {
		setNewChat(!newChat);
	};

	const handleNewChat = (withUser) => async (event) => {
		const res = await createNewChat(withUser);
		if (res) {
			setCurrent(res);
		}
		setNewChat(false);
	};

	const createNewChat = async (withUser) => {
		let exists = conversations.find((c) => c.participant._id == withUser._id);
		if (exists) {
			socket.emit("register-conversation", { conversationId: exists._id });
			return exists;
		}

		setCurrent({
			participants: [user._id, withUser._id],
			participant: withUser,
			messages: [],
		});
	};

	return (
		<>
			{modalType === "messages" && (
				<ClickAwayListener
					onClickAway={() => !isMobile() && setModalType(null)}
					nodeRef={null}
					className="h-full w-screen absolute top-0 right-0 z-30 bg-primary
				md:max-h-[60%] md:w-96 md:border md:border-light md:right-4 md:top-16 md:rounded-xl md:shadow-xl
    "
				>
					<div
						className="border-b border-light relative top-0 left-0 w-full h-20 bg-primary md:rounded-t-xl
    "
					>
						<div className=" text-primary text-2xl font-semibold pt-8 px-4 bg-primary rounded-t-xl">
							Messages
						</div>
					</div>
					{newChat && (
						<NewChat
							handleNewChat={handleNewChat}
							handleClose={() => setNewChat(null)}
						/>
					)}
					<div className="h-[calc(100%-10em)] w-full">
						<div className="w-full border-b border-light  h-10 flex px-2 items-center ">
							<button className="flex items-center" onClick={toggleNewChat}>
								<div className="">
									<img src={`/icons/Add_${theme}.svg`} className="w-3.5" />
								</div>
								<div className="text-secondary text-xs px-1">New Chat</div>
							</button>
						</div>
						<div className="w-full h-[calc(100%-3em)] overflow-auto relative">
							<Conversations conversations={conversations} />
						</div>
					</div>
				</ClickAwayListener>
			)}
		</>
	);
}
