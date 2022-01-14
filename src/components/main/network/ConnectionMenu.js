import { useContext } from "react/cjs/react.development";
import { getFullName } from "../../../api/helper";
import { ThemeContext } from "../../../contexts/themeContext";
import useDialog from "../../../hooks/useDialog";
import useNetwork from "../../../hooks/useNetwork";
import useSnackbar from "../../../hooks/useSnackbar";
import useSocket from "../../../hooks/useSocket";

export default function ConnectionMenu({
	data,
	handleClose,
	handleRemoveUser,
}) {
	const { callUser } = useSocket();
	const { setDialog } = useDialog();
	const { theme } = useContext(ThemeContext);

	const handleCallUser = () => {
		callUser(data);
	};

	return (
		<div className="bg-primary border border-light rounded-md">
			{data.status.status === "Active" && (
				<button
					onClick={handleCallUser}
					className="flex px-4 items-center py-3 border-b border-light w-full hover:bg-black hover:bg-opacity-30"
				>
					<img src={`/icons/Reach_${theme}.svg`} className="w-6" />
					<div className="text-primary px-4 text-sm">{`Call`}</div>
				</button>
			)}
			<button
				onClick={() => {}}
				className="flex px-4 items-center py-3 border-b border-light w-full hover:bg-black hover:bg-opacity-30"
			>
				<img src={`/icons/PaperPlane_${theme}.svg`} className="w-6" />
				<div className="text-primary px-4 text-sm">{`Message`}</div>
			</button>

			<button
				onClick={handleRemoveUser}
				className="flex px-4 items-center py-3  w-full hover:bg-black hover:bg-opacity-30"
			>
				<img src={`/icons/Disconnect_${theme}.svg`} className="w-6" />
				<div className="text-primary px-4 text-sm">{`Disconnect`}</div>
			</button>
		</div>
	);
}
