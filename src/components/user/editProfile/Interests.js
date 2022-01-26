import { useEffect, useState } from "react";

export default function Interests({ handleChange, details, tags }) {
	const [tagList, setTagList] = useState([]);
	const [chosen, setChosen] = useState(details.interests || []);

	useEffect(() => {
		handleChange("interests", chosen);
	}, [chosen]);

	useEffect(() => {
		if (!tags) return;
		setTagList(tags);
	}, [tags]);

	const handleClick = (tagName) => (event) => {
		if (chosen.includes(tagName)) {
			setChosen(chosen.filter((tg) => tg !== tagName));
			return;
		}
		setChosen([...chosen, tagName]);
	};

	return (
		<div className="w-auto h-max px-4 pb-16">
			<div className="text-secondary text-xs pb-1">Interests</div>
			<div className="flex flex-wrap">
				{tagList.length &&
					tagList.map((tag, i) => (
						<button
							key={i}
							className={`text-xs p-1 px-4 rounded-full m-1 w-max border border-secondary ${
								chosen.find((t) => t === tag)
									? "bg-secondary text-black "
									: "text-primary "
							}`}
							onClick={handleClick(tag)}
						>
							{tag}
						</button>
					))}
			</div>
		</div>
	);
}
