import { useEffect, useRef } from "react/cjs/react.development";
import { getShortName } from "../../../api/helper";
import useSocket from "../../../hooks/useSocket";

export default function VideoPlayer({}) {
	const { stream, userStream, oppositeUser, userLeft } = useSocket();

	const myVideo = useRef();
	const userVideo = useRef();

	useEffect(() => {
		if (stream) {
			myVideo.current.srcObject = stream;
		}
	}, [stream]);

	useEffect(() => {
		if (userStream) {
			userVideo.current.srcObject = userStream;
		}
	}, [userStream]);

	return (
		<div className="w-full h-full flex relative items-center md:justify-evenly">
			{userStream ? (
				<div
					className="w-full relative
                    md:w-1/2 md:shadow-md  md:mx-1
                "
				>
					<video
						ref={userVideo}
						autoPlay
						className="w-full 
                    md:rounded-md
                    
                    "
					/>
					<div className="absolute bottom-2 left-2 text-primary py-1 px-4 text-xs bg-black bg-opacity-50 rounded-full">
						{oppositeUser && getShortName(oppositeUser.info)}
					</div>
				</div>
			) : userLeft ? (
				<div className="text-primary text-center text-2xl w-full md:w-2/5">
					{`${
						oppositeUser && getShortName(oppositeUser.info)
					} has left the conversation`}
				</div>
			) : (
				<div className="text-primary text-center text-2xl w-full animate-pulse md:w-2/5">
					{`Waiting for ${oppositeUser && getShortName(oppositeUser.info)}`}
				</div>
			)}

			<div
				className="absolute bottom-24 right-4 
            md:relative md:w-1/2 md:top-0 md:mx-1 md:left-0"
			>
				<video
					ref={myVideo}
					autoPlay
					className="w-32 rounded-md shadow-md
                     md:w-full 
                "
				/>
			</div>
		</div>
	);
}
