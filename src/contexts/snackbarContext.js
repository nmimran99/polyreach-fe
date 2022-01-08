import { createContext, useEffect, useState } from "react";

export const SnackbarContext = createContext();

export const SnackbarContextProvider = (props) => {
	const [snackbar, setSnackbar] = useState({
		result: null,
		text: null,
	});

	useEffect(() => {
		if (snackbar.result) {
			setTimeout(() => setSnackbar({ result: null, text: null }), 5000);
		}
	}, [snackbar]);

	return (
		<SnackbarContext.Provider value={{ snackbar, setSnackbar }}>
			{props.children}
		</SnackbarContext.Provider>
	);
};
