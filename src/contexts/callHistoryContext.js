import { createContext, useEffect, useState } from "react";
import { getCallHisory, readAllCalls } from "../api/callHistoryApi";
import useUser from "../hooks/useUser";

export const CallHistoryContext = createContext();

export const CallHistoryContextProvider = (props) => {
	const { user } = useUser();
	const [callHistory, setCallHistory] = useState([]);
	const [unreadCH, setUnreadCH] = useState(0);
	const [page, setPage] = useState(0);

	useEffect(() => {
		getData();
	}, [page]);

	const getData = async () => {
		const res = await getCallHisory(user._id, page);
		if (res) {
			setCallHistory([...callHistory, ...res.calls]);
			let urc = [...callHistory, ...res.calls].reduce((total, call) => {
				if (call.to._id === user._id && !call.status) {
					return total + (call.read ? 0 : 1);
				}
				return total;
			}, 0);
			setUnreadCH(urc);
			return;
		}
		setCallHistory([]);
	};

	const loadNextPage = () => {
		setPage((p) => p + 1);
	};

	const handleReadCH = async () => {
		const res = await readAllCalls(user._id);
		setUnreadCH(0);
	};

	const refreshCH = () => {
		getData();
	};

	return (
		<CallHistoryContext.Provider
			value={{
				callHistory,
				setCallHistory,
				loadNextPage,
				unreadCH,
				handleReadCH,
				refreshCH,
			}}
		>
			{props.children}
		</CallHistoryContext.Provider>
	);
};
