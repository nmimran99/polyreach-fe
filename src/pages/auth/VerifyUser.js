import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect } from "react/cjs/react.development";
import { attempVerifyUser } from "../../api/userApi";
import useSnackbar from "../../hooks/useSnackbar";

export default function VerifyUser({}) {
	console.log("here");
	const navigate = useNavigate();
	const { setSnackbar } = useSnackbar();
	const params = useParams();

	useEffect(() => {
		handleVerify();
	}, []);

	const handleVerify = async () => {
		console.log(params.vCode);
		const res = await attempVerifyUser(params.vCode);
		if (res) {
			setSnackbar({
				result: "success",
				text: "Email verified successfully. Please log into your account.",
			});
		} else {
			setSnackbar({
				result: "error",
				text: "Verification link expired. Please log in again and request to resend verification email.",
			});
		}
		navigate("/auth/login");
		return;
	};

	return <div className=""></div>;
}
