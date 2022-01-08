import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { sendEmailConfirmation } from "../../api/userApi";
import PolyreachLink from "../../components/misc/PolyreachLink";
import useSnackbar from "../../hooks/useSnackbar";

export default function VerificationNeeded({}) {
	const [searchParams] = useSearchParams();
	const [sent, setSent] = useState(false);
	const { setSnackbar } = useSnackbar();

	const handleResend = async () => {
		const res = await sendEmailConfirmation(searchParams.get("userId"));
		if (res) {
			setSent(true);
			return;
		}
		setSnackbar({
			result: "error",
			text: "Failed resending verification code.\nPlease try again later",
		});
		return;
	};

	return (
		<div className="flex h-screen">
			<PolyreachLink />
			<div
				className="h-full w-full text-center text-primary flex flex-col items-center
                md:w-2/5
                xl:w:-1/4"
			>
				<div
					className="w-full
                sm:w-5/6
                "
				>
					<div
						className="text-2xl mt-32
                    lg:mt-60
                    "
					>
						Email requires verification
					</div>
					<div className="p-4 md:px-2 md:py-6">
						We pass our users through a simple email verification process to
						ensure the integrity of our community.
					</div>
					<div className="text-sm px-8">
						If you haven&apos;t received a verification email, please click on
						the button bellow.
					</div>
					<button
						className={`border border-primary  py-2 px-8 rounded-full
                my-4 w-max text-sm shadow-xl  font-semibold ${
									sent ? "bg-green-600 text-white" : "bg-secondary text-black"
								}`}
						onClick={handleResend}
						disabled={sent}
					>
						{sent ? "Verification email sent" : "Resend verification email"}
					</button>
				</div>
			</div>
			<div
				className="hidden h-full justify-center items-center md:flex md:bg-secondary
                    md:w-3/5
                    xl:w:-3/4
            "
			>
				<img src="/svg/authentication.svg" className="md:w-3/5 xl:w-1/2" />
			</div>
		</div>
	);
}
