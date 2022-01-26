import { useContext } from "react/cjs/react.development";
import { VideoSocketContext } from "../../../contexts/videoSocketContext";
import Modal from "../../misc/Modal";
import VideoControls from "./VideoControls";
import VideoPlayer from "./VideoPlayer";

export default function CallInterface({}) {
	return (
		<Modal hideControls>
			<div
				className="w-full h-full bg-primary relative animate-slideUp relative
               
            "
			>
				<VideoPlayer />
				<VideoControls />
			</div>
		</Modal>
	);
}
