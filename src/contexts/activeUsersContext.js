import React, { createContext, useEffect, useState } from "react";
import { getActiveUsers } from "../api/userApi";
import useUser from "../hooks/useUser";

const ActiveUsersContext = createContext();

export default ActiveUsersContext;

export const ActiveUsersContextProvider = ({ children }) => {
	const { user } = useUser();
	const [activeUsers, setActiveUsers] = useState([]);
	const [page, setPage] = useState(0);

	useEffect(() => {
		getInitialData();
	}, [page]);

	const getInitialData = async () => {
		const res = await getActiveUsers(user._id, page);
		if (res.users) setActiveUsers([...activeUsers, ...res.users]);
	};

	const loadNextPage = () => {
		console.log("called");
		setPage(page + 1);
	};
	return (
		<ActiveUsersContext.Provider
			value={{ activeUsers, setActiveUsers, loadNextPage }}
		>
			{children}
		</ActiveUsersContext.Provider>
	);
};
