import axios from "../../api/axiosInstance";
import { useEffect, useRef, useState } from "react";

export default function Interests({
	details,
	handleChange,
	handleSubmit,
	handlePreviousPage,
	tags,
}) {
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
		<div className="md:mx-20">
			<div
				className="text-primary font-medium text-xl mt-16
				md:mt-36 md:text-2xl
				"
			>
				What interests you?
			</div>
			<div className="my-2 text-xs text-primary">
				Let us know what you&apos;re interested in. These interests will help
				other users find you and connect with you.
			</div>
			<div className="my-2 text-xs text-primary">
				It is recommended to choose as many as possible to make yourself
				available to the widest variety of users.
			</div>
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
			<div className="my-8">
				<div className="text-sm text-primary my-1">
					Can&apos;t find what you&apos;re looking for?
				</div>
				<div className="text-xs text-primary">
					Don&apos;t worry. We are adding more and more tags everyday. You can
					also submit a request to add your interest through the user page once
					you finish registration and we will add it to our database.
				</div>
			</div>
			<div className="flex justify-between w-80">
				<button
					className="border border-primary text-primary py-1.5 w-32 rounded-md"
					onClick={handlePreviousPage("interests")}
				>
					Previous
				</button>
				<button
					className="bg-secondary py-1.5 w-32 rounded-md"
					onClick={handleSubmit}
				>
					Finish
				</button>
			</div>
		</div>
	);
}
