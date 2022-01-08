import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useRef } from "react/cjs/react.development";
import { resetPassword } from "../../api/userApi";
import PolyreachLink from "../../components/misc/PolyreachLink";
import Password from "../../components/register/Password";
import { ThemeContext } from "../../contexts/themeContext";
import useErrors from "../../hooks/useErrors";
import useSnackbar from "../../hooks/useSnackbar";

export default function ResetPassword({}) {
	const params = useParams();
	const passwordRef = useRef();
	const confPasswordRef = useRef();
	const navigate = useNavigate();
	const { setSnackbar } = useSnackbar();
	const { theme } = useContext(ThemeContext);
	const [visible, setVisible] = useState(false);
	const [password, setPassword] = useState("");
	const [confPassword, setConfPassword] = useState("");
	const [passReqs, setPassReqs] = useState([false, false, false]);
	const { errors, setErrors, Error } = useErrors();

	useEffect(() => {
		checkPassReqs();
	}, [password]);

	const handleChangePass = (e) => {
		setPassword(e.target.value);
		setErrors(errors.filter((e) => e.field !== "password"));
	};

	const handleChangeConfPass = (e) => {
		setConfPassword(e.target.value);
		setErrors(errors.filter((e) => e.field !== "confPassword"));
	};

	const checkPassReqs = () => {
		let tempReqs = [false, false, false];
		tempReqs[0] = password.length >= 8;
		tempReqs[1] = /(?=.*[A-Z])/.test(password);
		tempReqs[2] = /(?=.*\d)/.test(password);
		setPassReqs(tempReqs);
	};

	const handleSubmit = async () => {
		const isValid = await validateFields();
		if (!isValid) {
			return;
		}

		const res = await resetPassword(params.vCode, password);
		if (res) {
			setSnackbar({
				result: "success",
				text: "Password was reset successfully",
			});
		} else {
			setSnackbar({
				result: "error",
				text: "There was an issue reseting your password. Please try generating a new link.",
			});
		}
		navigate("/auth/login");
	};

	const validateFields = async () => {
		let tempErrors = [];

		if (!password) {
			tempErrors.push({ field: "password", text: "Field cannot be empty" });
		} else {
			if (!(passReqs[0] && passReqs[1] && passReqs[2])) {
				tempErrors.push({
					field: "password",
					text: "Password does not meet the requirements",
				});
			} else if (password !== confPassword) {
				tempErrors.push({
					field: "confPassword",
					text: "Passwords do not match",
				});
			}
		}

		setErrors(tempErrors);
		return !tempErrors.length;
	};

	return (
		<div className="flex h-screen">
			<PolyreachLink />
			<div
				className="h-full w-full  text-primary mx-4
                md:w-2/5 md:mx-10
                xl:w-1/4 xl:mx-20"
			>
				<div
					className="text-primary font-medium text-md mt-32
				
				"
				>
					Please choose a password for your account.
				</div>
				<div className="my-4">
					<div className="my-2" onClick={() => passwordRef.current.focus()}>
						<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
							<div className="text-secondary text-xs pt-2 px-4">Password</div>
							<input
								type={visible ? `text` : `password`}
								className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none w-52"
								value={password}
								onChange={handleChangePass}
								ref={passwordRef}
							/>
							<button onClick={() => setVisible(!visible)}>
								<img
									alt="Show Pass"
									src={
										visible
											? `/icons/EyeSlash_${theme}.svg`
											: `/icons/Eye_${theme}.svg`
									}
									className="w-6  mx-2"
								/>
							</button>
						</div>
						<Error field={"password"} />
					</div>
					<div className="my-2" onClick={() => confPasswordRef.current.focus()}>
						<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
							<div className="text-secondary text-xs pt-2 px-4">
								Confirm Password
							</div>
							<input
								type={visible ? `text` : `password`}
								className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none w-52"
								value={confPassword}
								onChange={handleChangeConfPass}
								ref={confPasswordRef}
							/>
							<button onClick={() => setVisible(!visible)}>
								<img
									alt="Show Pass"
									src={
										visible
											? `/icons/EyeSlash_${theme}.svg`
											: `/icons/Eye_${theme}.svg`
									}
									className="w-6  mx-2"
								/>
							</button>
						</div>
						<Error field={"confPassword"} />
					</div>
				</div>
				<div className="text-sm text-primary my-8 rounded-md">
					<div className=" my-1 font-semibold">
						Make sure that that password is:
					</div>
					<div className="flex items-center my-1">
						<div
							className={`w-2 h-2 rounded-full mx-2 ${
								passReqs[0] ? "bg-green-600" : "bg-red-600"
							}`}
						/>{" "}
						At least 8 characters long
					</div>
					<div className="flex items-center my-1">
						<div
							className={`w-2 h-2 rounded-full mx-2 ${
								passReqs[1] ? "bg-green-600" : "bg-red-600"
							}`}
						/>{" "}
						Contains at least 1 capital letter
					</div>
					<div className="flex items-center my-1">
						<div
							className={`w-2 h-2 rounded-full mx-2 ${
								passReqs[2] ? "bg-green-600" : "bg-red-600"
							}`}
						/>
						Contains at least 1 number
					</div>
				</div>
				<button
					className={`border border-primary  py-2 px-8 rounded-full
                                w-max text-sm shadow-xl  font-semibold ${
																	errors.length
																		? "opacity-50"
																		: "bg-secondary text-black"
																}`}
					onClick={handleSubmit}
					disabled={errors.length}
				>
					Reset password
				</button>
			</div>
			<div
				className="hidden h-full justify-center items-center md:flex md:bg-secondary
                    md:w-3/5
                    xl:w-3/4
            "
			>
				<img src="/svg/resetpassword.svg" className="md:w-3/5 xl:w-1/2" />
			</div>
		</div>
	);
}
