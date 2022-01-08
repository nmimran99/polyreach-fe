// First we need to import axios.js
import axios from "axios";
import { getCookie } from "../utils/cookies";
// Next we make an 'instance' of it
const instance = axios.create({
	// .. where we make our configurations
	baseURL: process.env.REACT_APP_BACKEND_URL,
});

instance.defaults.headers.common["token"] = getCookie("token");

export default instance;
