import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getShortName } from "../../../api/helper";
import useSocket from "../../../hooks/useSocket";
import Modal from "../../misc/Modal";

export default function InitiatingCall({}) {
	const [dots, setDots] = useState("");
	const { initiating } = useSocket();

	useEffect(() => {
		load();
	}, [dots]);

	const load = () => {
		setTimeout(() => {
			if (dots.length < 3) {
				setDots(dots + ".");
				return;
			}
			setDots("");
		}, 800);
	};

	return (
		<Modal hideControls>
			<div className="absolute top-1/2 transform -translate-y-1/2 border border-light rounded-xl text-primary bg-white bg-opacity-10 backdrop-filter backdrop-blur-xl text-xl w-80 flex flex-col items-center justify-center text-left p-4 h-80">
				<div className="p-4">
					<img src="/svg/calling.svg" className="w-48 animate-pulse" />
				</div>
				<div className="text-md my-6">{`Initiating call with ${getShortName(
					initiating.info
				)}${dots}`}</div>
			</div>
		</Modal>
	);
}
