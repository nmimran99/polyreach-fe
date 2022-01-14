import { useContext, useState } from "react/cjs/react.development";
import { getShortName } from "../../../api/helper";
import { parseISO, format, differenceInDays, isToday } from "date-fns";
import { ThemeContext } from "../../../contexts/themeContext";

export default function CallRow({ data, userId, handleCallUser }) {
	const { theme } = useContext(ThemeContext);

	const [details, setDetails] = useState({
		userData: data.from._id == userId ? data.to : data.from,
		status:
			data.from._id == userId
				? data.status
					? data.status
					: "No response"
				: data.status
				? data.status
				: "missed",
		isIncoming: data.from._id !== userId,
	});

	const getDate = () => {
		let parsed = parseISO(data.createdAt);
		if (isToday(parsed)) {
			return format(parsed, "hh:mm a");
		} else if (differenceInDays(new Date(), parsed) > 4) {
			return format(parsed, "YYYY-MM-DD");
		}
		return format(parsed, "cccc");
	};

	return (
		<button
			className="flex justify-between border-b border-light py-1 relative w-full text-left hover:bg-black hover:bg-opacity-30
        "
			onClick={handleCallUser(details.userData)}
		>
			<div className="flex">
				<div className="text-xs text-primary my-auto mx-1 w-5">
					{details.isIncoming && (
						<div className="">
							<img
								src={`/icons/PhoneIncoming_${theme}.svg`}
								className="w-full"
							/>
						</div>
					)}
				</div>
				<div className="">
					<img
						src={details.userData.avatar}
						className="rounded-full w-12 m-2"
					/>
				</div>
				<div className="my-auto px-2">
					<div className="text-primary text-sm font-semibold">
						{getShortName(details.userData.info)}
					</div>
					<div
						className={`text-sm ${
							details.status === "missed"
								? "text-red-800 text-semibold"
								: "text-secondary"
						}`}
					>
						{details.status}
					</div>
				</div>
			</div>

			<div className="my-auto mx-4">
				<div className="text-primary text-sm">{getDate()}</div>
			</div>
		</button>
	);
}
