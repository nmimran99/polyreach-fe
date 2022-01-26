import { createContext, useEffect, useState } from "react";
import {
	createConnection,
	getConections,
	removeConnection,
} from "../api/connectionApi";
import { getFullName, getShortName } from "../api/helper";
import useSnackbar from "../hooks/useSnackbar";
import useUser from "../hooks/useUser";

export const NetworkContext = createContext();

export const NetworkContextProvider = (props) => {
	const { success, error } = useSnackbar();
	const [network, setNetwork] = useState([]);
	const { user } = useUser();

	useEffect(() => {
		getData();
	}, []);

	const getData = async () => {
		const res = await getConections(user._id);
		if (res) {
			setNetwork(res);
			return;
		}
		setNetwork([]);
	};

	const addConnection = async (to) => {
		const res = await createConnection({ from: user._id, to: to._id });
		if (res) {
			setNetwork(res);
			success(
				`${getShortName(to.info)} was added to your netowrk successfully.`
			);
			return true;
		}
		return res;
	};

	const deleteConnection = async (to) => {
		const res = await removeConnection({ from: user._id, to: to._id });
		if (res) {
			setNetwork(network.filter((u) => u._id !== to._id));
			return true;
		}
		return false;
	};

	const searchConnection = async (searchText) => {
		const results = [];
		network.forEach((entry) => {
			if (
				getFullName(entry.info)
					.toLowerCase()
					.indexOf(searchText.toLowerCase()) !== -1
			) {
				results.push(entry);
			}
		});
		return Promise.resolve(results);
	};

	return (
		<NetworkContext.Provider
			value={{
				addConnection,
				deleteConnection,
				searchConnection,
				network,
				setNetwork,
			}}
		>
			{props.children}
		</NetworkContext.Provider>
	);
};
