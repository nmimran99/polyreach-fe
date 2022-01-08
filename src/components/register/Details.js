import { useRef } from "react";
import { checkEmailExists } from "../../api/userApi";
import useErrors from "../../hooks/useErrors";
import Location from "./Location";

export default function Details({ details, handleChange, handleNextPage }) {
	const emailRef = useRef();
	const firstRef = useRef();
	const lastRef = useRef();
	const { Error, errors, setErrors } = useErrors();

	const validateFields = async () => {
		let tempErrors = [];
		Object.entries({
			email: details.email,
			firstName: details.firstName,
			lastName: details.lastName,
		}).forEach((dt) => {
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
		const isValid = await validateFields();
		if (!isValid || errors.length) {
			return;
		}
		handleNextPage("details");
	};

	const handleChangeField = (field) => (event) => {
		handleChange(field, event.target.value);
		setErrors(errors.filter((e) => e.field !== field));
	};

	const handleCheckEmail = async () => {
		const res = await checkEmailExists(details.email);
		if (!res) {
			setErrors([
				...errors,
				{ field: "email", text: "User with this email already exists" },
			]);
			return;
		}
	};

	return (
		<div className="md:mx-20">
			<div
				className="text-primary font-medium text-xl mt-16
				md:mt-36 md:text-2xl
				xl:mt-48
				"
			>
				Let&apos;s get you started with Polyreach!
			</div>
			<div className="my-4">
				<div className="my-2" onClick={() => firstRef.current.focus()}>
					<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
						<div className="text-secondary text-xs pt-2 px-4">First Name</div>
						<input
							type="text"
							className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
							value={details.firstName}
							onChange={handleChangeField("firstName")}
							ref={firstRef}
						/>
					</div>
					<Error field={"firstName"} />
				</div>
				<div className="my-2" onClick={() => lastRef.current.focus()}>
					<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
						<div className="text-secondary text-xs pt-2 px-4">Last Name</div>
						<input
							type="text"
							className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
							value={details.lastName}
							onChange={handleChangeField("lastName")}
							ref={lastRef}
						/>
					</div>
					<Error field={"lastName"} />
				</div>
				<div className="my-2" onClick={() => emailRef.current.focus()}>
					<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
						<div className="text-secondary text-xs pt-2 px-4">
							Email Address
						</div>
						<input
							type="email"
							className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
							value={details.email}
							onChange={handleChangeField("email")}
							ref={emailRef}
							onBlur={handleCheckEmail}
						/>
					</div>
					<Error field={"email"} />
				</div>
				<Location handleChange={handleChange} details={details} />
				<div className="text-primary text-xs w-60">
					Location is optional. Fill it in if you want to have the option to
					connect localy.
				</div>
			</div>
			<div className="flex justify-end w-72">
				<button
					className="bg-secondary py-1.5 w-32 rounded-md disabled:opacity-30 disabled:cursor-not-allowed"
					onClick={handleSubmit}
					disabled={errors.length}
				>
					Next
				</button>
			</div>
		</div>
	);
}
