import axios from "./axiosInstance";

export const getNotifications = async (userId, page) => {
	try {
		const res = await axios.get(`/notification?userId=${userId}&page=${page}`);
		if (res.status === 200) {
			return res.data;
		}
		return [];
	} catch (e) {
		return [];
	}
};

export const readNotifications = async (userId) => {
	try {
		const res = await axios.post(`/notification/read`, { userId });
		if (res.status === 200) {
			return res.data;
		}
		return false;
	} catch (e) {
		return false;
	}
};
