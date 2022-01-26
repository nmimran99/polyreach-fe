import axios from "axios";
import { getCookie } from "../utils/cookies";

const instance = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_URL,
});

export const mAxios = axios.create({
	baseURL: process.env.REACT_APP_BACKEND_CHAT_URL,
});

mAxios.defaults.headers.common["token"] = getCookie("token");
instance.defaults.headers.common["token"] = getCookie("token");

export default instance;
