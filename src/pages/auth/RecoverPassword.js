import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useRef } from "react/cjs/react.development";
import {
	sendEmailConfirmation,
	sendPasswordRecoveryEmail,
} from "../../api/userApi";
import PolyreachLink from "../../components/misc/PolyreachLink";
import useErrors from "../../hooks/useErrors";
import useSnackbar from "../../hooks/useSnackbar";

export default function RecoverPassword({}) {
	const emailRef = useRef();
	const [sent, setSent] = useState(false);
	const [email, setEmail] = useState("");
	const { setSnackbar } = useSnackbar();
	const { errors, setErrors, Error } = useErrors();

	const handleChange = (e) => {
		setEmail(e.target.value);
		setErrors([]);
	};

	const handleSendEmail = async () => {
		const isValid = await validateFields();

		if (!isValid) {
			return;
		}

		const res = await sendPasswordRecoveryEmail(email);
		console.log(res);
		if (res) {
			setSnackbar({
				result: "success",
				text: "Password reset link has been sent to your mailbox successfully.",
			});
			setSent(true);
		}
	};

	const validateFields = async () => {
		let tempErrors = [];

		if (!email || email === "") {
			tempErrors.push({ field: "email", text: "Field can not be empty" });
		} else {
			const r = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
			if (!r.test(email)) {
				tempErrors.push({
					field: "email",
					text: "Please enter a valid email address",
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
				className="h-full w-full text-center text-primary flex flex-col items-center
                md:w-2/5
                xl:w:-1/4"
			>
				{sent ? (
					<div
						className="w-full
            sm:w-5/6
            "
					>
						<div
							className="text-2xl mt-32 py-2

                    lg:mt-60
                    "
						>
							Password Recovery
						</div>
						<div className="p-4 md:px-2 md:py-1 text-sm">
							Email has been sent successfully.
						</div>
						<div className="p-4 md:px-2 md:py-1 text-sm">
							Please check your mailbox for password recovery link.
						</div>
					</div>
				) : (
					<div
						className="w-full
                sm:w-5/6
                "
					>
						<div
							className="text-2xl mt-32 py-2

                    lg:mt-60
                    "
						>
							Password Recovery
						</div>
						<div className="p-4 md:px-2 md:py-1 text-sm">
							Cant remember your password? No worries!
						</div>
						<div className="text-sm px-8">
							Please enter the email address you registered with
						</div>
						<div
							className="mx-auto w-max my-4"
							onClick={() => emailRef.current.focus()}
						>
							<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1 text-left">
								<div className="text-secondary text-xs pt-2 px-4 ">
									Email Address
								</div>
								<input
									type="email"
									className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
									value={email}
									onChange={handleChange}
									ref={emailRef}
								/>
							</div>
							<Error field="email" />
						</div>
						<button
							className={`border border-primary  py-2 px-8 rounded-full
                                w-max text-sm shadow-xl  font-semibold ${
																	errors.length
																		? "opacity-50"
																		: "bg-secondary text-black"
																}`}
							onClick={handleSendEmail}
							disabled={errors.length}
						>
							Continue
						</button>
					</div>
				)}
			</div>
			<div
				className="hidden h-full justify-center items-center md:flex md:bg-secondary
                    md:w-3/5
                    xl:w:-3/4
            "
			>
				<img src="/svg/forgotpassword.svg" className="md:w-3/5 xl:w-1/2" />
			</div>
		</div>
	);
}
