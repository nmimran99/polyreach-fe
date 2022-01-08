import { useContext, useRef, useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { ThemeContext } from "../../contexts/themeContext";
import useErrors from "../../hooks/useErrors";

export default function Password({
	details,
	handleChange,
	handleNextPage,
	handlePreviousPage,
}) {
	const passwordRef = useRef();
	const confPasswordRef = useRef();
	const { theme } = useContext(ThemeContext);

	const [confPass, setConfPass] = useState(details.password);
	const [passReqs, setPassReqs] = useState([false, false, false]);
	const [visible, setVisible] = useState(false);
	const { Error, errors, setErrors } = useErrors();

	useEffect(() => {
		checkPassReqs(details.password);
	}, []);

	const validateFields = async () => {
		let tempErrors = [];

		if (!details.password) {
			tempErrors.push({ field: "password", text: "Field cannot be empty" });
		} else {
			if (!(passReqs[0] && passReqs[1] && passReqs[2])) {
				tempErrors.push({
					field: "password",
					text: "Password does not meet the requirements",
				});
			} else if (details.password !== confPass) {
				tempErrors.push({ field: "confPass", text: "Passwords do not match" });
			}
		}

		setErrors(tempErrors);
		return !tempErrors.length;
	};

	const handleSubmit = async () => {
		const isValid = await validateFields();
		if (!isValid) {
			return;
		}
		handleNextPage("password");
	};

	const checkPassReqs = (val) => {
		let tempReqs = [false, false, false];
		tempReqs[0] = val.length >= 8;
		tempReqs[1] = /(?=.*[A-Z])/.test(val);
		tempReqs[2] = /(?=.*\d)/.test(val);
		setPassReqs(tempReqs);
	};

	const handleChangeField = (field) => (event) => {
		handleChange(field, event.target.value);
		checkPassReqs(event.target.value);
		setErrors(errors.filter((e) => e.field !== field));
	};

	const handleConfPassChange = (e) => {
		setConfPass(e.target.value);
		setErrors(errors.filter((e) => e.field !== "confPass"));
	};

	return (
		<div className="md:mx-20">
			<div
				className="text-primary font-medium text-xl mt-16
				md:mt-36 md:text-2xl
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
							value={details.password}
							onChange={handleChangeField("password")}
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
							value={confPass}
							onChange={handleConfPassChange}
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
					<Error field={"confPass"} />
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

			<div className="flex justify-between w-72">
				<button
					className="border border-primary text-primary py-1.5 w-32 rounded-md"
					onClick={handlePreviousPage("password")}
				>
					Previous
				</button>
				<button
					className="bg-secondary py-1.5 w-32 rounded-md"
					onClick={handleSubmit}
				>
					Next
				</button>
			</div>
		</div>
	);
}
