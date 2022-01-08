import { useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginUser } from "../../api/userApi";
import PolyreachLink from "../../components/misc/PolyreachLink";
import { ThemeContext } from "../../contexts/themeContext";
import useErrors from "../../hooks/useErrors";
import useSnackbar from "../../hooks/useSnackbar";
import useUser from "../../hooks/useUser";
import { setCookies } from "../../utils/cookies";

export default function Login() {
	const emailRef = useRef();
	const passwordRef = useRef();
	const { setSnackbar } = useSnackbar();
	const { theme } = useContext(ThemeContext);
	const { setAuth, clearAuth } = useUser();
	const navigate = useNavigate();
	const [isLoading, setIsLoading] = useState(false);
	const [visible, setVisible] = useState(false);
	const [details, setDetails] = useState({
		email: "",
		password: "",
	});

	const { Error, errors, setErrors } = useErrors();

	const handleChange = (field) => (event) => {
		setDetails({
			...details,
			[field]: event.target.value,
		});
		setErrors(errors.filter((e) => e.field !== field && e.field !== "generic"));
	};

	const validateFields = async () => {
		let tempErrors = [];
		Object.entries(details).forEach((dt) => {
			let [field, value] = dt;

			if (!value || value === "") {
				tempErrors.push({ field: field, text: "Field can not be empty" });
				return;
			}

			if (field === "email") {
				const r = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				if (!r.test(value)) {
					tempErrors.push({
						field: "email",
						text: "Please enter a valid email address",
					});
				}
				return;
			}
		});

		setErrors(tempErrors);
		return !tempErrors.length;
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		const isValid = await validateFields();
		if (!isValid) {
			setIsLoading(false);
			return;
		}

		const { auth, message, user, token } = await loginUser(details);

		if (!auth) {
			setErrors([...errors, { field: "generic", text: message }]);
			clearAuth();
			setSnackbar({
				result: "error",
				text: "Could not log in at the moment. Please try again later.",
			});
			setIsLoading(false);
			return;
		}

		if (!user.flags.isVerified) {
			navigate(`/auth/verify?userId=${user._id}`);
			return;
		}

		setAuth({ user, token });
		setCookies(token, 1);
		setIsLoading(false);
		navigate("/");
	};

	return (
		<div className="h-screen w-screen">
			<PolyreachLink />
			<div className="flex flex-col items-center">
				<div
					className="text-primary font-medium text-3xl mt-36
				md:mt-48
				xl:mt-72
				"
				>
					Welcome Back!
				</div>
				<div className="text-primary font-medium text-sm text-center my-3">
					Please log into your account
				</div>
				<div className="" onClick={() => emailRef.current.focus()}>
					<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
						<div className="text-secondary text-xs pt-2 px-4">
							Email Address
						</div>
						<input
							type="email"
							className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
							value={details.email}
							onChange={handleChange("email")}
							ref={emailRef}
						/>
					</div>
					<Error field="email" />
				</div>

				<div
					className="w-max flex flex-col"
					onClick={() => passwordRef.current.focus()}
				>
					<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1 flex items-center justify-between">
						<div className="">
							<div className="text-secondary text-xs pt-2 px-4">Password</div>
							<input
								type={visible ? `text` : `password`}
								className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none w-52"
								value={details.password}
								onChange={handleChange("password")}
								onKeyUp={(e) => {
									if (e.key === "Enter") handleSubmit();
								}}
								ref={passwordRef}
							/>
						</div>
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
					<div className="flex justify-between relative">
						<Error field="password" />
						<Link to="/auth/recover">
							<div className="text-primary text-xs px-1 absolute right-0">
								Forgot password
							</div>
						</Link>
					</div>
				</div>
				<div className="w-full flex justify-center my-4">
					<Error field={"generic"} />
				</div>

				<button
					className="text-black font-bold bg-secondary py-2 w-72 rounded-md text-sm"
					onClick={handleSubmit}
				>
					{isLoading ? "Authenticating..." : "Login"}
				</button>
				<div className="relative w-72 flex flex-col items-center  justify-center my-4">
					<div className="text-primary w-max bg-primary z-10 px-2 text-xs">
						OR
					</div>
					<div className="border-t border-primary w-72 absolute top-2"></div>
				</div>
				<Link to="/auth/register">
					<div className="text-primary font-semibolds border border-primary py-2 w-72 rounded-md text-sm text-center bg-black">
						Sign up
					</div>
				</Link>
			</div>
		</div>
	);
}
