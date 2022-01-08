import axios from "../api/axiosInstance";

export const getSuggestions = async (input) => {
	try {
		const res = await axios.get(`/services/address?input=${input}`);
		if (res.status === 200) {
			return res.data;
		}
		return false;
	} catch (e) {
		console.log(e.message);
		return false;
	}
};
