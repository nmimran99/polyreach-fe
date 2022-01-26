import { useEffect } from "react/cjs/react.development";
import Conversation from "./Conversation";

export default function Conversations({ conversations }) {
	return conversations.map((convo, i) => <Conversation key={i} data={convo} />);
}
