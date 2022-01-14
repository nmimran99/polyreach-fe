import { getShortName } from "../../../api/helper";
import useSocket from "../../../hooks/useSocket";

export default function IncomingCall() {
	const { call, answerCall, refuseCall } = useSocket();

	return (
		<div className="absolute bottom-24 bg-white bg-opacity-10 bacdrop-filter backdrop-blur-xl w-11/12 h-24 right-1/2 transform translate-x-1/2  rounded-2xl flex items-center z-50 border animate-lightpulse sm:w-96">
			<div className="flex items-center px-2">
				<div className="px-2">
					<img src={call.from_user.avatar} className="w-16 rounded-full" />
				</div>
				<div className="text-primary flex flex-col justify-center px-2">
					<div className="text-sm">{getShortName(call.from_user.info)}</div>
					<div className="text-xs">{call.from_user.data.occupation}</div>
					<div className="text-xs">{call.from_user.data.company}</div>
				</div>
			</div>
			<div className="flex items-center ml-auto mr-2">
				<button
					className="bg-red-600 rounded-full p-2 mx-2"
					onClick={refuseCall}
				>
					<img src="/icons/PhoneDisconnect.svg" className="w-6" />
				</button>
				<button
					className="bg-green-500 rounded-full p-2 mx-2"
					onClick={answerCall}
				>
					<img src="/icons/PhoneCall.svg" className="w-6" />
				</button>
			</div>
		</div>
	);
}
