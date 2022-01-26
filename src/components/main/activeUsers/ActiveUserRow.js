import { useContext, useEffect } from "react/cjs/react.development";
import { getShortName } from "../../../api/helper";
import ActivityRing from "./ActivityRing";
import InterestsPills from "./InterestsPills";
import { ThemeContext } from "../../../contexts/themeContext";
import { VideoSocketContext } from "../../../contexts/videoSocketContext";
import useNetwork from "../../../hooks/useNetwork";
import { useState } from "react";
import useDialog from "../../../hooks/useDialog";
import useSocket from "../../../hooks/useSocket";

export default function ActiveUserRow({ data }) {
	const { theme } = useContext(ThemeContext);
	const { setDialog } = useDialog();
	const { addConnection, deleteConnection, network } = useNetwork();
	const { callUser } = useContext(VideoSocketContext);
	const [isConn, setIsConn] = useState(false);
	const { socket } = useSocket();

	useEffect(() => {
		if (network.find((n) => n._id == data._id)) {
			setIsConn(true);
			return;
		}
		setIsConn(false);
	}, [network]);

	const handleCallUser = () => {
		callUser(data);
	};

	const handleAddConnection = async () => {
		const res = await addConnection(data);
		if (res) {
			socket.emit("notify-following", { userId: data._id });
		}
		setIsConn(true);
	};

	const handleRemoveConnection = async () => {
		setDialog({
			header: "Delete Connection",
			text: `Are you sure you want to delete ${data.info.firstName} from your network?`,
			submitText: "Confirm",
			closeText: "Cancel",
			handleClose: () => setDialog(null),
			handleSubmit: async () => {
				const res = await deleteConnection(data);
				setIsConn(false);
				setDialog(null);
			},
		});
	};

	return (
		<div
			className="py-4 flex flex-col items-center border-b border-t border-light w-full whitespace-nowrap my-4 bg-black bg-opacity-10 
			md:border md:rounded-xl md:px-2
        "
		>
			<div
				className="flex jutify-start w-full items-center 
            lg:justify-start"
			>
				<div className="m-2 flex items-center sm:pr-4 md:w-2/5 lg:w-1/3">
					<ActivityRing status={data.status.status}>
						<img
							src={data.avatar}
							className="w-14 h-14 object-cover rounded-full"
						/>
					</ActivityRing>

					<div className="px-4 ">
						<div className="flex items-center">
							<div className="text-lg">{getShortName(data.info)}</div>
							{isConn ? (
								<button
									className="text-primary h-6 flex justify-center items-center rounded-full px-1 ml-1.5"
									onClick={handleRemoveConnection}
								>
									<img src={`/icons/Plugs_${theme}.svg`} className=" w-4" />
								</button>
							) : (
								<button
									className="text-[10px] text-primary border border-light  h-6 flex justify-center items-center rounded-full px-1 ml-2"
									onClick={handleAddConnection}
								>
									<img src="/icons/Add_white.svg" className="p-1 w-5" />
									<div className="pr-2">Add</div>
								</button>
							)}
						</div>
						<div className="text-xs">{data.data.occupation}</div>
						<div className="text-xs">{data.data.company}</div>
					</div>
				</div>

				<div className="hidden md:flex md:w-1/3 lg:w-2/5 mx-6">
					<InterestsPills max={5} interests={data.data.interests} />
				</div>
				{data.status.status === "Active" ? (
					<button
						className="bg-secondary text-black text-sm rounded-full ml-auto mr-2 flex p-2 font-md mb-auto mt-2
                        sm:text-md sm:mb-0 sm:mt-0
                        lg:mr-4
                    "
						onClick={handleCallUser}
					>
						<img src={"/icons/connect.svg"} className="w-5 lg:ml-1" />
						<div className="hidden sm:block text-xs px-2 sm:pr-4 sm:text-sm sm:leading-5">
							Reach out
						</div>
					</button>
				) : (
					<button
						className="border border-primary text-primary text-sm rounded-full ml-auto mr-2 flex p-2 font-md
                        sm:text-md
                        lg:mr-4
                    "
					>
						<img
							src={`/icons/PaperPlane_${theme}.svg`}
							className="w-5 my-auto sm:mx-2"
						/>
						<div className="hidden sm:block sm:pr-4 sm:leading-6">Message</div>
					</button>
				)}
			</div>
			<div className="flex justify-start w-full md:hidden">
				<InterestsPills max={3} interests={data.data.interests} />
			</div>
		</div>
	);
}
