import axios from "./axiosInstance";

export const getTags = async () => {
	try {
		const res = await axios.get("/tags");
		if (res.status === 200) {
			return { success: true, tags: res.data.map((t) => t.name) };
		}
		return { success: false, message: res.data.message };
	} catch (e) {
		return { res: false, message: "System error", status: 500 };
	}
};

export const createTag = async (name) => {
	try {
		const res = await axios.post("/tags", { name });
		if (res.status === 200) {
			return { success: true, tag: res.data.tag };
		}
		return { success: false, message: res.data.message };
	} catch (e) {
		return { res: false, message: "System error", status: 500 };
	}
};
