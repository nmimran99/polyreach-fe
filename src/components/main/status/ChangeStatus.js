import { useState } from "react";
import { updateStatus } from "../../../api/userApi";
import useSnackbar from "../../../hooks/useSnackbar";
import useUser from "../../../hooks/useUser";
import Modal from "../../misc/Modal";
import useSocket from "../../../hooks/useSocket";

const convoTimes = [
	{ value: 0, label: "No Limit" },
	{ value: 5, label: "5 Minutes" },
	{ value: 10, label: "10 Minutes" },
	{ value: 30, label: "30 Minutes" },
	{ value: 60, label: "60 Minutes" },
];

export default function ChangeStatus({ handleClose }) {
	const { user, setAuth, token } = useUser();
	const { updateUserStatus } = useSocket();
	const { success, error } = useSnackbar();
	const { broadcastUserStatus } = useSocket();
	const [details, setDetails] = useState(user.status);
	const [isLoading, setIsLoading] = useState(false);

	const handleChange = (field, value) => (event) => {
		setDetails({
			...details,
			[field]: value,
		});
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		const res = await updateUserStatus(details);
		if (res) {
			success("Status updated successfully");
			handleClose();
			return;
		}
		error("There was an issue in the process. Please try again");
		setIsLoading(false);
	};

	return (
		<Modal hideControls handleClose={handleClose}>
			<div
				className="w-full h-full bg-primary py-16 px-2 relative animate-slideUp
                md:w-1/2 md:h-96 md:py-6 md:rounded-xl md:border md:border-primary md:px-4
                lg:w-2/5
            "
			>
				<div className="">
					<div className="text-primary p-2">My status:</div>
					<div className="flex justify-start w-full p-2">
						{["Active", "Busy", "Inactive"].map((st, i) => (
							<button
								key={i}
								className={`w-max w-24 text-sm text-center rounded-full py-1 px-4 m-1 ${
									details.status === st
										? "bg-secondary text-black"
										: "border border-primary text-primary"
								}`}
								onClick={handleChange("status", st)}
							>
								{st}
							</button>
						))}
					</div>
				</div>
				<div className="whitespace-nowrap">
					<div className="text-primary p-2">Call Timer:</div>
					<div className="flex justify-start w-full flex-wrap p-2">
						{convoTimes.map((ct, i) => (
							<button
								key={i}
								className={`w-max w-max text-sm text-center rounded-full py-1 px-6 m-1 ${
									details.maxConversationLength === ct.value
										? "bg-secondary text-black"
										: "border border-primary text-primary"
								}`}
								onClick={handleChange("maxConversationLength", ct.value)}
							>
								{ct.label}
							</button>
						))}
					</div>
				</div>
				<div className="flex absolute bottom-0 text-sm w-full left-0 h-12">
					<button
						className="text-primary py-1.5 px-8 text-black bg-secondary w-1/2 md:rounded-bl-xl"
						onClick={handleSubmit}
						disabled={isLoading}
					>
						{isLoading ? (
							<div className="animate-pulse duration-300">Applying...</div>
						) : (
							"Apply"
						)}
					</button>
					<button
						className="text-primary py-1.5 px-8 border-t border-primary w-1/2 md:rounded-br-xl"
						onClick={handleClose}
					>
						Close
					</button>
				</div>
			</div>
		</Modal>
	);
}
