import { mAxios as axios } from "./axiosInstance";

export const createNewChatDB = async (participants) => {
	try {
		const res = await axios.post("/conversation", { participants });
		if (res.status === 200) {
			return res.data;
		}
		return null;
	} catch (e) {
		console.log(e.message);
		return null;
	}
};

export const getConversations = async (userId) => {
	try {
		const res = await axios.get(`/conversation?userId=${userId}`);
		if (res.status === 200) {
			return res.data;
		}
		return [];
	} catch (e) {
		console.log(e.message);
		return [];
	}
};

export const countUnreadMessages = (messages, sender) => {
	return messages.reduce((total, m) => {
		if (!m.read && m.from !== sender) {
			return total + 1;
		}
		return total;
	}, 0);
};
