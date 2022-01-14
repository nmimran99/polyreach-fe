import React, { createContext, useState } from "react";

const AuthContext = createContext();

export default AuthContext;

export const AuthContextProvider = ({ children }) => {
	const [auth, setAuth] = useState({
		user: null,
		status: null,
		token: {
			token: null,
			refreshToken: null,
		},
	});

	return (
		<AuthContext.Provider value={{ auth, setAuth }}>
			{children}
		</AuthContext.Provider>
	);
};
