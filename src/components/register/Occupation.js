import { useRef, useState } from "react";

export default function Occupation({
	details,
	handleChange,
	handleNextPage,
	handlePreviousPage,
}) {
	const occupationRef = useRef();
	const companyRef = useRef();
	const introRef = useRef();

	const [charsLeft, setCharsLeft] = useState(1000);

	const handleSubmit = async () => {
		handleNextPage("occupation");
	};

	const handleChangeField = (field) => (event) => {
		if (field === "introduction") {
			setCharsLeft(1000 - event.target.value.length);
		}
		handleChange(field, event.target.value);
	};

	return (
		<div className="md:mx-20">
			<div
				className="text-primary font-medium text-xl mt-16
				md:mt-36 md:text-2xl
				"
			>
				Tell us about yourself
			</div>
			<div className="my-2 text-xs text-primary">
				This step is not mandatory, but will help other users to get a grasp on
				your current status and potentially create a more suitable connection
				between you.
			</div>
			<div className="my-4">
				<div className="my-2" onClick={() => occupationRef.current.focus()}>
					<div className="bg-primary text-primary border border-primary rounded-md w-80 my-1">
						<div className="text-secondary text-xs pt-2 px-4">Occupation</div>
						<input
							type="text"
							className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
							value={details.occupation}
							onChange={handleChangeField("occupation")}
							ref={occupationRef}
						/>
					</div>
				</div>
				<div className="my-2" onClick={() => companyRef.current.focus()}>
					<div className="bg-primary text-primary border border-primary rounded-md w-80 my-1">
						<div className="text-secondary text-xs pt-2 px-4">Company</div>
						<input
							type="text"
							className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
							value={details.company}
							onChange={handleChangeField("company")}
							ref={companyRef}
						/>
					</div>
				</div>

				<div className="my-2" onClick={() => introRef.current.focus()}>
					<div className="bg-primary text-primary border border-primary rounded-md w-80 my-1 md:w-80">
						<div className="text-secondary text-xs pt-2 px-4 flex justify-between">
							<div className="">Introduction</div>
							<div className="">{charsLeft} Characters left</div>
						</div>
						<textarea
							type="text"
							className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none w-5/6 resize-none"
							value={details.introduction}
							onChange={handleChangeField("introduction")}
							ref={introRef}
							rows="6"
							maxLength={1000}
							placeholder="Write a short description about your backgournd and interests..."
						/>
					</div>
				</div>
			</div>
			<div className="flex justify-between w-80">
				<button
					className="border border-primary text-primary py-1.5 w-32 rounded-md"
					onClick={handlePreviousPage("occupation")}
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
