import { useContext } from "react";
import { CallHistoryContext } from "../contexts/callHistoryContext";

export default function useCallHistory() {
	return useContext(CallHistoryContext);
}
