import { useRef, useState } from "react";
import useErrors from "../../hooks/useErrors";

export default function Avatar({
	details,
	handleChange,
	handleNextPage,
	handlePreviousPage,
}) {
	const handleAvatarUpload = (event) => {
		handleChange("avatar", event.target.files[0]);
	};

	const handleRemoveAvatar = () => {
		handleChange("avatar", null);
	};

	const handleSubmit = async () => {
		handleNextPage("avatar");
	};

	return (
		<div className="md:mx-20">
			<div className="mt-16 mb-8 mr-3 w-80">
				<div className="text-xl text-primary py-1">Upload Avatar</div>
				<div className="text-xs text-primary py-1">
					Please make sure that file size is up to 10MB
				</div>
				{details.avatar ? (
					<div className="w-full">
						<div className="relative my-4 flex w-max mx-auto">
							<img
								src={URL.createObjectURL(details.avatar)}
								className="object-cover w-40 h-40 rounded-full border-2 border-secondary ring ring-secondary"
							/>
							<button
								className="w-7 h-7 bg-black bg-opacity-90 border-2 border-accent absolute bottom-1 right-1 rounded-full p-1 ring-2 ring-primary bottom-2 right-2"
								onClick={handleRemoveAvatar}
							>
								<img src="/icons/close.svg" className="" />
							</button>
						</div>
					</div>
				) : (
					<label className="flex py-4 w-min">
						<div className="rounded-full px-8 py-1.5 text-sm cursor-pointer bg-secondary w-max">
							Upload Avatar
						</div>
						<input
							accepts="image/*"
							type="file"
							onChange={handleAvatarUpload}
							hidden
							id="upload"
						/>
					</label>
				)}
			</div>
			<div className="flex justify-between w-80">
				<button
					className="border border-primary text-primary py-1.5 w-32 rounded-md"
					onClick={handlePreviousPage("avatar")}
				>
					Previous
				</button>
				<button
					className="bg-secondary py-1.5 w-32 rounded-md"
					onClick={handleSubmit}
				>
					Next
				</button>
			</div>
		</div>
	);
}
