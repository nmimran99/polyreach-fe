import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { reAuthUser } from "../api/userApi";
import AuthContext from "../contexts/authContext";
import {
	eraseCookie,
	getCookie,
	getCookies,
	setCookies,
} from "../utils/cookies";

export default function useUser() {
	const { auth, setAuth } = useContext(AuthContext);
	const navigate = useNavigate();

	useEffect(() => {
		setCookies(auth.token);
	}, [auth]);

	const refreshToken = async () => {
		let token = getCookies(["token", "refreshToken"]) || auth.token;
		console.log(token);
		const res = await reAuthUser(token);
		if (res.auth) {
			setAuth({ user: res.user, token: res.token });
			return;
		}
		clearAuth();
		navigate("/auth/login");
	};

	const logout = () => {
		clearAuth();
		navigate("/login");
	};

	const clearAuth = () => {
		setAuth({
			user: null,
			token: {
				token: null,
				refreshToken: null,
			},
		});
		eraseCookie("token");
		eraseCookie("refreshToken");
	};

	return { ...auth, setAuth, refreshToken, logout, clearAuth };
}
