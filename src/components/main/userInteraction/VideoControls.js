import { useState } from "react/cjs/react.development";
import useSocket from "../../../hooks/useSocket";

export default function VideoControls() {
	const { stream, leaveCall } = useSocket();
	const [options, setOptions] = useState({ paused: false, muted: false });

	const togglePaused = () => {
		stream.getTracks().forEach((t) => {
			if (t.kind === "video") {
				t.enabled = !t.enabled;
			}
		});
		setOptions({
			...options,
			paused: !options.paused,
		});
	};

	const toggleMute = () => {
		stream.getTracks().forEach((t) => {
			if (t.kind === "audio") {
				t.enabled = !t.enabled;
			}
		});
		setOptions({
			...options,
			muted: !options.muted,
		});
	};

	return (
		<div className="absolute bottom-6 right-1/2 transform translate-x-1/2 bg-black border border-primary rounded-full h-11 w-max px-2 flex items-center">
			<div className="flex mx-4">
				<button className="text-primary px-4" onClick={togglePaused}>
					<img
						src={`/icons/VideoCamera${options.paused ? "_off" : ""}.svg`}
						className="w-6"
					/>
				</button>
				<button className="text-primary px-4" onClick={toggleMute}>
					<img
						src={`/icons/Microphone${options.muted ? "_off" : ""}.svg`}
						className="w-6"
					/>
				</button>
			</div>

			<button
				className="text-white bg-red-600 h-7 px-4 rounded-full text-xs ml-auto"
				onClick={leaveCall}
			>
				End call
			</button>
		</div>
	);
}
