import { parseISO } from "date-fns";
import format from "date-fns/format";
import { useContext, useState } from "react";
import { getShortName } from "../../../api/helper";
import { ActiveConversationContext } from "../../../contexts/activeConversationContext";
import { ConversationsContext } from "../../../contexts/conversationsContext";
import { MessagesSocketContext } from "../../../contexts/messageSocketContext";
import ModalsContext from "../../../contexts/modalsContext";
import useScreenSize from "../../../hooks/useScreenSize";
import useUser from "../../../hooks/useUser";
import ActivityRing from "../../main/activeUsers/ActivityRing";

export default function Conversation({ data }) {
	const { user } = useUser();
	const { setCurrent, toggleMinimize, minimized } = useContext(
		ActiveConversationContext
	);
	const { conversations, setConversations } = useContext(ConversationsContext);
	const { setModalType } = useContext(ModalsContext);
	const { isMobile } = useScreenSize();
	const { socket } = useContext(MessagesSocketContext);

	const [unreadMessages, setUnreadMessage] = useState(
		data.messages
			? data.messages.reduce(
					(t, m) => (!m.read && m.from !== user._id ? t + 1 : t),
					0
			  )
			: 0
	);

	const handleClick = () => {
		if (!isMobile()) {
			if (minimized) {
				toggleMinimize();
			}
			setModalType(null);
		}
		setCurrent(data);
	};

	return (
		<button className="flex items-center relative w-full" onClick={handleClick}>
			<div className="px-2 w-1/5 flex items-center justify-center sm:w-1/6 md:w-1/5">
				<ActivityRing status={data.participant.status.status}>
					<img
						src={data.participant.avatar}
						className="w-12 object-cover h-12 rounded-full"
					/>
				</ActivityRing>
			</div>
			<div className="border-b border-light flex items-center w-4/5 px- h-20 sm:w-5/6 md:w-4/5">
				<div className="">
					<div className="text-primary text-left">
						{getShortName(data.participant.info)}
					</div>
					{!!data.messages.length && (
						<>
							<div
								className={`text-xs pt-0.5 w-48 truncate overflow-hidden text-left ${
									!unreadMessages ? "text-secondary " : "text-primary font-bold"
								}`}
							>
								{data.messages[0].data.text}
							</div>
							<div className="absolute top-1.5 right-2 text-secondary text-xs">
								{format(parseISO(data.messages[0].createdAt), "h:mm a")}
							</div>
						</>
					)}
				</div>
			</div>

			{!!unreadMessages && (
				<div className="absolute bottom-6 right-2 text-secondary w-6 h-6 rounded-full bg-blue-600 text-white flex justify-center items-center font-bold text-xs">
					{unreadMessages}
				</div>
			)}
		</button>
	);
}
