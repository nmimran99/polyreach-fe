import { useContext } from "react";
import { VideoSocketContext } from "../contexts/videoSocketContext";

export default function useSocket() {
	return useContext(VideoSocketContext);
}
