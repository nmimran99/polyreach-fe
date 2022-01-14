import React, { createContext, useEffect, useState } from "react";
import { getActiveUsers } from "../api/userApi";
import useUser from "../hooks/useUser";

const ActiveUsersContext = createContext();

export default ActiveUsersContext;

export const ActiveUsersContextProvider = ({ children }) => {
	const { user } = useUser();
	const [activeUsers, setActiveUsers] = useState([]);

	useEffect(() => {
		getInitialData();
	}, []);

	const getInitialData = async () => {
		const res = await getActiveUsers(user._id);
		if (res.users) setActiveUsers(res.users);
	};

	return (
		<ActiveUsersContext.Provider value={{ activeUsers, setActiveUsers }}>
			{children}
		</ActiveUsersContext.Provider>
	);
};
