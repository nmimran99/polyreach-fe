import { format, parseISO } from "date-fns";

export default function Message({ data, own }) {
	return (
		<div className="w-full p-2">
			<div
				className={`max-w-[80%] w-fit rounded-xl p-1 flex items-end ${
					own ? "ml-auto bg-primary bg-primary" : " mr-auto bg-blue-600"
				} text-white text-xs whitespace-wrap`}
			>
				<div className="text-left leading-5 px-2 py-1">{data.data.text}</div>
				<div className="text-primary text-[10px] px-2 w-min whitespace-nowrap">
					{format(parseISO(data.createdAt), "h:mm a")}
				</div>
			</div>
		</div>
	);
}
