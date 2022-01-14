import { useContext, useRef } from "react/cjs/react.development";
import Modal from "../components/misc/Modal";
import { DialogContext } from "../contexts/dialogContext";

export default function useDialog() {
	const { dialog, setDialog } = useContext(DialogContext);

	const dialogRef = useRef();

	const DialogComponent = ({}) => {
		if (!dialog) return null;
		return (
			<Modal hideControls>
				<div
					className="w-5/6 border border-light h-min absolute top-1/2 trasform -translate-y-1/2 rounded-xl bg-primary
					md:w-96
					"
					ref={dialogRef}
				>
					<div className="px-4 pt-4 pb-2 text-primary text-lg border-b border-light ">
						{dialog.header}
					</div>
					<div className="px-4 text-primary text-sm py-6 flex items-center">
						{dialog.text}
					</div>
					<div className="flex w-full mt-6">
						<button
							className="text-black flex justify-center items-center h-12 w-1/2 bg-secondary rounded-bl-xl"
							onClick={dialog.handleSubmit}
						>
							{dialog.submitText}
						</button>
						<button
							className="text-primary flex justify-center items-center h-12 w-1/2 rounded-br-xl border-t border-light"
							onClick={dialog.handleClose}
						>
							{dialog.closeText}
						</button>
					</div>
				</div>
			</Modal>
		);
	};

	return { DialogComponent, dialog, setDialog, dialogRef };
}
