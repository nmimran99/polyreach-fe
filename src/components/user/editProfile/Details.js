import { useEffect, useRef, useState } from "react";
import useErrors from "../../../hooks/useErrors";

export default function Details({ details, handleChange, parentErrors }) {
	const firstRef = useRef();
	const lastRef = useRef();
	const occupationRef = useRef();
	const companyRef = useRef();
	const introRef = useRef();

	const { Error } = useErrors();
	const [charsLeft, setCharsLeft] = useState(
		1000 - details.introduction.length
	);

	const handleChangeIntro = (event) => {
		setCharsLeft(1000 - event.target.value.length);
		handleChange("introduction", event.target.value);
	};

	return (
		<div className="px-4">
			<div className="my-2" onClick={() => firstRef.current.focus()}>
				<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
					<div className="text-secondary text-xs pt-2 px-4">First Name</div>
					<input
						type="text"
						className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
						value={details.firstName}
						onChange={(e) => handleChange("firstName", e.target.value)}
						ref={firstRef}
					/>
				</div>
				<Error field={"firstName"} data={parentErrors} />
			</div>
			<div className="my-2" onClick={() => lastRef.current.focus()}>
				<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
					<div className="text-secondary text-xs pt-2 px-4">Last Name</div>
					<input
						type="text"
						className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
						value={details.lastName}
						onChange={(e) => handleChange("lastName", e.target.value)}
						ref={lastRef}
					/>
				</div>
				<Error field={"lastName"} data={parentErrors} />
			</div>
			<div className="my-2" onClick={() => occupationRef.current.focus()}>
				<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
					<div className="text-secondary text-xs pt-2 px-4">Occupation</div>
					<input
						type="text"
						className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
						value={details.occupation}
						onChange={(e) => handleChange("occupation", e.target.value)}
						ref={occupationRef}
					/>
				</div>
				<Error field={"occupation"} data={parentErrors} />
			</div>
			<div className="my-2" onClick={() => companyRef.current.focus()}>
				<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
					<div className="text-secondary text-xs pt-2 px-4">Company</div>
					<input
						type="text"
						className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
						value={details.company}
						onChange={(e) => handleChange("company", e.target.value)}
						ref={companyRef}
					/>
				</div>
				<Error field={"company"} data={parentErrors} />
			</div>
			<div className="bg-primary text-primary border border-primary rounded-md w-80 my-1 md:w-80">
				<div className="text-secondary text-xs pt-2 px-4 flex justify-between">
					<div className="">Introduction</div>
					<div className="">{charsLeft} Characters left</div>
				</div>
				<textarea
					type="text"
					className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none w-5/6 resize-none"
					value={details.introduction}
					onChange={handleChangeIntro}
					ref={introRef}
					rows="6"
					maxLength={1000}
					placeholder="Write a short description about your backgournd and interests..."
				/>
			</div>
		</div>
	);
}
