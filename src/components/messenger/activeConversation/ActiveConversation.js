import { useState } from "react";
import { useContext, useEffect } from "react/cjs/react.development";
import { addParticipantData, getShortName } from "../../../api/helper";
import { createNewChatDB } from "../../../api/messengerApi";
import { ActiveConversationContext } from "../../../contexts/activeConversationContext";
import { MessagesSocketContext } from "../../../contexts/messageSocketContext";
import { ThemeContext } from "../../../contexts/themeContext";
import { VideoSocketContext } from "../../../contexts/videoSocketContext";
import useConversations from "../../../hooks/useConversations";
import useToggle from "../../../hooks/useToggle";
import useUser from "../../../hooks/useUser";
import ActivityRing from "../../main/activeUsers/ActivityRing";
import Message from "../Message";

export default function ActiveConversation() {
	const { user } = useUser();
	const { socket } = useContext(MessagesSocketContext);
	const { readMessages } = useConversations();
	const {
		current,
		setCurrent,
		unread,
		setUnread,
		minimized,
		toggleMinimize,
		setPStatus,
		pstatus,
	} = useContext(ActiveConversationContext);
	const { callUser } = useContext(VideoSocketContext);
	const { theme } = useContext(ThemeContext);
	const [text, setText] = useState("");
	const [messages, setMessages] = useState(current.messages);

	useEffect(() => {
		if (!current.participant) return;
		setMessages(current.messages);
		setPStatus(current.participant.status.status);
		if (minimized) {
			if (!current.messages[0].read) setUnread(true);
		} else {
			readMessages(current);
			setUnread(false);
		}
	}, [current, minimized]);

	const handleChange = (e) => {
		setText(e.target.value);
	};

	const sendMessage = (text, conv) => {
		socket.emit("send-message", {
			text,
			from: user._id,
			to: current.participant._id,
			conversation: conv || current,
		});
	};

	const handleSend = async () => {
		if (!text) return;
		if (!current._id) {
			const res = await createNewChatDB(current.participants);
			if (res.conversation) {
				const newCurr = addParticipantData(res.conversation, user._id);
				console.log(newCurr.participant);
				socket.emit("add-user", {
					conversation: newCurr,
					userToJoin: newCurr.participant,
				});
				console.log(newCurr);
				setCurrent(newCurr);
				sendMessage(text, newCurr);
			}
			setText("");
			return;
		}
		sendMessage(text);
		setText("");
	};

	const handleOnKeyPress = (e) => {
		if (e.key === "Enter") {
			handleSend();
			return;
		}
	};

	const haneleCall = () => {
		setCurrent(null);
		callUser(current.participant);
	};

	return !current.participant ? null : (
		<div
			className={`w-screen h-screen absolute top-0 right-0 animate-slideUp z-50 bg-mid flex flex-col 
			md:w-80 ${
				minimized
					? `md:h-[3em] ${unread && "md:animate-pulseblue"}`
					: "md:h-[28em]"
			} md:top-auto md:bottom-0 md:right-4 md:border-t md:border-r md:border-l md:rounded-t-xl md:border-light
		`}
		>
			<div
				className={`flex items-center justify-between relative w-full ${
					!minimized ? "border-b" : ""
				} border-light h-24 px-2
				 md:h-14
			`}
			>
				<div className="flex items-center justify-center md:w-full px-4 md:justify-start md:px-2">
					<div className="">
						<ActivityRing status={pstatus}>
							<img
								src={current.participant.avatar}
								className="w-14 object-cover h-14 rounded-full md:w-8 md:h-8"
							/>
						</ActivityRing>
					</div>
					<div className=" flex items-center px-4 h-20 md:px-2 md:h-auto">
						<div className="">
							<div className="text-primary md:text-sm">
								{getShortName(current.participant.info)}
							</div>
							<div className="md:hidden">
								<div className="text-xs text-secondary md:text-[10px]">
									{current.participant.data.occupation}
								</div>
								<div className="text-xs text-secondary md:text-[10px]">
									{current.participant.data.company}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div className="flex">
					{pstatus === "Active" && (
						<button
							className="p-2 rounded-full md:hover:bg-black  md:hover:bg-opacity-50 "
							onClick={haneleCall}
						>
							<img src={`/icons/Phone_${theme}.svg`} className="w-6 md:w-10" />
						</button>
					)}
					<div className="hidden md:block">
						{minimized ? (
							<button
								className="p-2 rounded-full md:hover:bg-black  md:hover:bg-opacity-50 "
								onClick={toggleMinimize}
							>
								<img
									src={`/icons/Plus_${theme}.svg`}
									className="transform rotate-180 w-6 md:w-10"
								/>
							</button>
						) : (
							<button
								className="p-2 rounded-full md:hover:bg-black  md:hover:bg-opacity-50 "
								onClick={toggleMinimize}
							>
								<img
									src={`/icons/Minus_${theme}.svg`}
									className="transform rotate-180 w-6 md:w-10"
								/>
							</button>
						)}
					</div>

					<button
						className="p-3 rounded-full md:hover:bg-black  md:hover:bg-opacity-50  md:hidden "
						onClick={() => setCurrent(null)}
					>
						<img
							src={`/icons/ArrowLeft_${theme}.svg`}
							className="transform rotate-180 w-6 h-6 md:w-7"
						/>
					</button>
					<button
						className="p-3 rounded-full md:hover:bg-black  md:hover:bg-opacity-50  hidden md:block"
						onClick={() => setCurrent(null)}
					>
						<img
							src={`/icons/Close_${theme}.svg`}
							className="transform rotate-180 w-6 md:w-10"
						/>
					</button>
				</div>
			</div>
			{!minimized && (
				<>
					<div
						className="w-screen h-[calc(100%-11em)] flex flex-col-reverse bg-mid py-2 overflow-auto
			md:w-full md:h-[calc(100%-6em)]
			"
					>
						{messages.map((m, i) => (
							<Message data={m} key={i} own={m.from === user._id} />
						))}
					</div>
					<div className="h-20 flex items-start border-t border-light p-2 bg-mid md:h-12">
						<input
							className="border border-light h-8 bg-primary text-primary rounded-full px-4 w-[89%] text-sm"
							onChange={handleChange}
							value={text}
							type="text"
							onKeyPress={handleOnKeyPress}
						/>
						<button
							className="bg-secondary rounded-full p-1.5 my-0.5 ml-auto md:p-1"
							onClick={handleSend}
							disabled={!text}
						>
							<img src={`/icons/PaperPlane_light.svg`} className={"w-5"} />
						</button>
					</div>
				</>
			)}
		</div>
	);
}
