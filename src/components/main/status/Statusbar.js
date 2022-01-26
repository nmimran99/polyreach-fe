import useUser from "../../../hooks/useUser";
import ChangeStatus from "./ChangeStatus";
import useToggle from "../../../hooks/useToggle";

export default function StatusBar({}) {
	const { user } = useUser();
	const [state, toggle] = useToggle(false);

	return (
		<>
			<button
				className="absolute bottom-28 right-1/2 transform translate-x-1/2 flex items-center z-10 
							h-10 whitespace-nowrap border border-primary rounded-full px-2 
							bg-black bg-opacity-10 backdrop-filter backdrop-blur-lg text-white md:bottom-16
        "
				onClick={toggle}
			>
				<div className="flex items-center px-2 w-max">
					<div className="hidden text-xs px-2 md:block">My status:</div>
					<div className="flex items-center">
						<div
							className={`w-3 h-3 rounded-full ${
								user.status.status === "Active"
									? "bg-active"
									: user.status.status === "Busy"
									? "bg-busy"
									: "bg-inactive"
							} `}
						></div>
						<div className=" text-xs px-1">{user.status.status}</div>
					</div>
				</div>
				<div className="flex items-center px-2 w-max">
					<div className="hidden text-xs px-1 md:block">Call timer:</div>
					<div className="flex items-center">
						<div className=" text-xs px-1 flex items-center">
							<img src={"/icons/Timer.svg"} className="w-4" />
							<div className="px-1">
								{`${user.status.maxConversationLength} Minutes` || "No Limit"}
							</div>
						</div>
					</div>
				</div>
			</button>
			{state && <ChangeStatus handleClose={toggle} state={state} />}
		</>
	);
}
