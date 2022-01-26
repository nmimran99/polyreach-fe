import { getDate, getShortName } from "../../../api/helper";

export default function Notification({ data }) {
	const NotificationText = () => {
		const types = {
			startedFollowing: "started following you",
		};

		return (
			<div className={`${data.read && "opacity-60"} w-2/3`}>
				<div className="flex text-primary text-sm py-1">
					<div className="font-bold">{getShortName(data.actionBy.info)}</div>
					<div className="px-1">{`${types[data.actionType]}.`}</div>
				</div>
				<div className="text-primary text-xs">{getDate(data.createdAt)}</div>
			</div>
		);
	};

	return (
		<div className="w-full border-b border-light py-4 relative">
			<div className={`flex items-center h-full`}>
				<div className="px-4">
					<img src={data.actionBy.avatar} className="w-14 h-14 rounded-full " />
				</div>
				<NotificationText />
			</div>
			{!data.read && (
				<div className="absolute w-3.5 h-3.5 bg-blue-600 rounded-full right-4 top-1/2 transform -translate-y-1/2"></div>
			)}
		</div>
	);
}
