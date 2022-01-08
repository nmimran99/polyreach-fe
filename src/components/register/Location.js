import { useEffect, useState, useRef } from "react";
import { getSuggestions } from "../../api/suggestionApi";

export default function Location({ handleChange, details }) {
	const [value, setValue] = useState(details.location);
	const [searchText, setSearchText] = useState("");
	const [suggestions, setSuggestions] = useState([]);
	const locationRef = useRef();

	useEffect(() => {
		if (!searchText) {
			setSuggestions([]);
			return;
		}
		getData(searchText);
	}, [searchText]);

	useEffect(() => {
		handleChange("location", value);
	}, [value]);

	const handleUpdate = (e) => {
		setValue("");
		setSearchText(e.target.value);
	};

	const handleChoose = (sg) => (event) => {
		setValue(sg);
		setSearchText("");
	};

	const getData = async (value) => {
		const { predictions } = await getSuggestions(value);
		setSuggestions(
			predictions.map((p) => p.description.split(",").slice(0, 3).join(", "))
		);
	};

	return (
		<div className="relative my-2 w-60">
			<div className="my-2" onClick={() => locationRef.current.focus()}>
				<div className="bg-primary text-primary border border-primary rounded-md w-72 my-1">
					<div className="text-secondary text-xs pt-2 px-4">Location</div>
					<input
						type="text"
						className="bg-primary text-primary my-1 mx-4 text-sm mb-2 focus:outline-none"
						value={value || searchText}
						onChange={handleUpdate}
						ref={locationRef}
					/>
				</div>
			</div>

			{!!suggestions.length && (
				<div
					className={`h-auto w-72 bg-primary text-primary rounded-md my-1 py-4 absolute top-14 left-0 border-2 border-gray-300 z-10`}
				>
					{suggestions.map((sg, i) => (
						<button
							key={i}
							className="flex cursor-pointer py-1 h-8 w-full text-left"
							onClick={handleChoose(sg)}
						>
							<div className="text-xs my-auto truncate overflow-ellipsis px-4 py-2 hover:bg-secondary hover:text-black w-full">
								{sg}
							</div>
						</button>
					))}
				</div>
			)}
		</div>
	);
}
