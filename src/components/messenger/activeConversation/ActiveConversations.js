import { useContext } from "react/cjs/react.development";
import { ActiveConversationContext } from "../../../contexts/activeConversationContext";
import ActiveConversation from "./ActiveConversation";

export default function ActiveConversations() {
	const { current } = useContext(ActiveConversationContext);
	return current ? <ActiveConversation /> : null;
}
