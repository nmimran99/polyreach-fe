import axios from "./axiosInstance";

export const createConnection = async ({ from, to }) => {
	try {
		const res = await axios.post("/conn/add", { from, to });
		if (res.status === 200) {
			return res.data.following;
		}
		return null;
	} catch (e) {
		return null;
	}
};

export const removeConnection = async ({ from, to }) => {
	try {
		const res = await axios.post("/conn/remove", { from, to });
		if (res.status === 200) {
			return true;
		}
		return null;
	} catch (e) {
		return null;
	}
};

export const getConections = async (userId) => {
	try {
		const res = await axios.get(`/conn?userId=${userId}`);
		if (res.status === 200) {
			return res.data.following;
		}
		return [];
	} catch (e) {
		return false;
	}
};
