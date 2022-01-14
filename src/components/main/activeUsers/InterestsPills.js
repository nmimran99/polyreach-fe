import { useState } from "react";

export default function InterestsPills({ interests, max }) {
	const [shown, setShown] = useState(max);

	const handleLoadMore = () => {
		setShown(interests.length);
	};

	const handleShowLess = () => {
		setShown(max);
	};

	return (
		<div className="p-1 flex-wrap flex w-full">
			{interests.slice(0, shown).map((interest, i) => (
				<div
					key={i}
					className="text-primary border border-primary m-1 text-xs py-1 px-4 rounded-full "
				>
					{interest}
				</div>
			))}
			{interests.length <= max ? null : interests.length > shown ? (
				<button
					className="text-primary m-1 text-xs py-1 px-2"
					onClick={handleLoadMore}
				>
					Show more...
				</button>
			) : (
				<button
					className="text-primary m-1 text-xs py-1 px-2"
					onClick={handleShowLess}
				>
					Show less...
				</button>
			)}
		</div>
	);
}
