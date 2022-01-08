export default function Progress({ currentPage }) {
	const getPageNumber = () => {
		switch (currentPage) {
			case "details":
				return 0;
			case "password":
				return 1;
			case "avatar":
				return 2;
			case "occupation":
				return 3;
			case "interests":
				return 4;
		}
	};

	return (
		<div className="flex w-full justify-center my-8">
			{[
				"Personal Details",
				"Password",
				"Avatar",
				"Occupation",
				"Interests",
			].map((t, i) => (
				<div
					key={i}
					className={`py-1.5 w-32 text-center rounded-md mx-2 text-xs ${
						getPageNumber() < i
							? "border border-black text-black"
							: "bg-primary text-white"
					}`}
				>
					{t}
				</div>
			))}
		</div>
	);
}
