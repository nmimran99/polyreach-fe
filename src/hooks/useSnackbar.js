import { useContext } from "react";
import { SnackbarContext } from "../contexts/snackbarContext";

export default function useSnackbar() {
	const { snackbar, setSnackbar } = useContext(SnackbarContext);

	const close = () => {
		setSnackbar({ result: null, text: null });
	};

	const getAccent = () => {
		const accents = {
			success: "bg-green-500",
			error: "bg-red-600",
			info: "bg-blue-600",
			neutral: "bg-black",
		};

		return accents[snackbar.result];
	};

	const success = (successText) => {
		setSnackbar({ result: "success", text: successText });
	};

	const error = (errorText) => {
		setSnackbar({ result: "error", text: errorText });
	};

	const info = (infoText) => {
		setSnackbar({ result: "info", text: infoText });
	};

	const SnackbarComponent = () => {
		if (!snackbar.result) return null;

		return (
			<div
				className={`w-full h-20 absolute bottom-0 text-center text-white ${getAccent()} shadow-md z-50
                    md:w-1/2 md:rounded-md md:bottom-8 md:right-8 md:h-20
                    lg:w-1/4
                `}
			>
				<div
					className="w-5/6 mx-auto text-sm 
                    md:w-3/4 md:flex md:items-center md:h-full
                "
				>
					<button
						className="rounded-full bg-black bg-opacity-30 absolute top-1 right-1 p-1
                    "
						onClick={close}
					>
						<img src="/icons/close.svg" className="w-5 h-5" />
					</button>
					<div
						className="mt-4 text-center mx-auto
                        md:mt-0 
                    "
					>
						{snackbar.text}
					</div>
				</div>
			</div>
		);
	};

	return { SnackbarComponent, setSnackbar, success, error, info };
}
