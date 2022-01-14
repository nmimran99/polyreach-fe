import { createContext, useEffect, useState } from "react";
import Modal from "../components/misc/Modal";

export const DialogContext = createContext();

export const DialogContextProvider = (props) => {
	const [dialog, setDialog] = useState(null);

	return (
		<DialogContext.Provider value={{ dialog, setDialog }}>
			{props.children}
		</DialogContext.Provider>
	);
};
