import axios from "./axiosInstance";

export const loginUser = async ({ email, password }) => {
	try {
		const res = await axios.post("/user/authenticate", { email, password });
		if (res.status === 200) {
			return { auth: true, user: res.data.user, token: res.data.token };
		}
	} catch (error) {
		const { status, message } = error.response;

		return {
			auth: false,
			message: "Invalid username or password",
			status,
		};
	}
};

export const reAuthUser = async (token) => {
	try {
		const res = await axios.post("/user/reauth", token);

		if (res.status === 200) {
			return { auth: true, ...res.data };
		}

		if (res.status === 400) {
			return { auth: false, message: res.message };
		}

		if ([401, 500].includes(res.status)) {
			return { auth: false, message: res.message };
		}
		return;
	} catch (error) {
		const { status, message } = error.response;

		return {
			error: true,
			message: "Invalid username or password",
			status,
		};
	}
};

export const createUser = async (details) => {
	let formData = new FormData();

	Object.entries(details).forEach((entry) => {
		let [field, value] = entry;
		formData.append(
			field,
			Array.isArray(value) ? JSON.stringify(value) : value
		);
	});

	try {
		const res = await axios.post("/user", formData);
		if (res.status === 201) {
			return res.data;
		}
		return { res: false, message: res.data.message };
	} catch (e) {
		console.log(e.message);
		return { res: false, message: e.message };
	}
};

export const checkEmailExists = async (email) => {
	try {
		const res = await axios.get(`/user/emailExists?email=${email}`);
		if (res.status === 200) {
			return true;
		}
		return false;
	} catch (e) {
		console.log(e.message);
		return false;
	}
};

export const sendEmailConfirmation = async (userId) => {
	try {
		const res = await axios.post(`/user/sendEmailVerification`, {
			userId,
		});
		if (res.status === 200) {
			return true;
		}
		return false;
	} catch (e) {
		console.log(e.message);
		return false;
	}
};

export const attempVerifyUser = async (vCode) => {
	try {
		const res = await axios.post("/user/verifyUser", { vCode });

		if (res.status === 200) {
			return true;
		}
		return false;
	} catch (e) {
		console.log(e.message);
		return false;
	}
};

export const sendPasswordRecoveryEmail = async (email) => {
	try {
		const res = await axios.post("/user/sendPasswordRecoveryEmail", { email });
		return res.data;
	} catch (e) {
		console.log(e.message);
		return false;
	}
};

export const resetPassword = async (vCode, password) => {
	try {
		const res = await axios.post("/user/resetPassword", { vCode, password });
		return res.data;
	} catch (e) {
		console.log(e.message);
		return false;
	}
};

export const getActiveUsers = async (userId) => {
	try {
		const res = await axios.get(`/user/activeUsers?userId=${userId}`);
		if (res.status === 200) {
			return res.data;
		}
		return [];
	} catch (e) {
		console.log(e.message);
		return null;
	}
};

export const updateStatus = async (status) => {
	try {
		const res = await axios.post("/user/updateStatus", status);
		if (res.status === 200) {
			return res.data;
		}
		return false;
	} catch (e) {
		console.log(e.message);
		return null;
	}
};

export const getSocketId = async (userId) => {
	try {
		const res = await axios.get(`/user/getSocketId?userId=${userId}`);
		if (res.status === 200) {
			return res.data;
		}
		return false;
	} catch (e) {
		console.log(e.message);
		return null;
	}
};
