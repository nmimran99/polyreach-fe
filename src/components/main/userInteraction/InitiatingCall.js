import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import { getShortName } from "../../../api/helper";
import useSocket from "../../../hooks/useSocket";
import Modal from "../../misc/Modal";

export default function InitiatingCall({}) {
	const [dots, setDots] = useState("");
	const { initiating } = useSocket();

	useEffect(() => {
		setTimeout(() => {
			if (dots.length < 3) {
				setDots(dots + ".");
				return;
			}
			setDots("");
		}, 800);
	}, [dots]);

	return (
		<Modal hideControls>
			<div className="border border-light rounded-xl text-primary bg-primary text-xl w-80 h-24 flex items-center justify-center text-left">{`Initiating call with ${getShortName(
				initiating.info
			)}${dots}`}</div>
		</Modal>
	);
}
