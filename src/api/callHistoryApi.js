import axios from "./axiosInstance";

export const getCallHisory = async (userId, page) => {
	try {
		const res = await axios.get(`/ch?userId=${userId}&page=${page}`);
		if (res) {
			return res.data;
		}
		return [];
	} catch (e) {
		console.log(e.message);
		return [];
	}
};

export const createCallHisotryRow = async ({ from, to }) => {
	try {
		const res = await axios.post("/ch", { from, to });
		if (res.status === 200) {
			return res.data.call;
		}
		return null;
	} catch (e) {
		console.log(e.message);
		return null;
	}
};

export const readAllCalls = async (userId) => {
	try {
		const res = await axios.post("/ch/readAll", { userId });
		if (res.status === 200) {
			return true;
		}
		return false;
	} catch (e) {
		console.log(e.message);
		return false;
	}
};
