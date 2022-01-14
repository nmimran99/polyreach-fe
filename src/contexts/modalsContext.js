import React, { createContext, useState } from "react";

const ModalsContext = createContext();

export default ModalsContext;

export const ModalsContextProvider = ({ children }) => {
	const [modalType, setModalType] = useState(null);

	return (
		<ModalsContext.Provider value={{ modalType, setModalType }}>
			{children}
		</ModalsContext.Provider>
	);
};
