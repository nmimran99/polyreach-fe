export default function Avatar({ avatar, handleChange }) {
	const handleAvatarUpload = (event) => {
		handleChange("avatar", event.target.files[0]);
	};

	return (
		<div className=" my-12 md:mx-20">
			<div className="mt-12 mb-2">
				<div className="w-full">
					<div className="relative my-4 flex w-max mx-auto">
						{avatar ? (
							<img
								src={
									typeof avatar === "string"
										? avatar
										: URL.createObjectURL(avatar)
								}
								className="object-cover w-40 h-40 rounded-full border-2 border-secondary ring ring-secondary"
							/>
						) : (
							<div className="object-cover w-40 h-40 rounded-full border-2 border-secondary ring ring-secondary bg-primary">
								<img src={"/icons/Reach_dark.svg"} />
							</div>
						)}

						<label className="flex items-center w-min absolute bottom-2 right-2 rounded-full">
							<div className="w-8 h-8 bg-black bg-opacity-90 border-2 border-accent rounded-full p-1 ring-2 ring-primary bottom-2 right-2">
								<img src="/icons/Pencil_dark.svg" className="w-6" />
							</div>
							<input
								accepts="image/*"
								type="file"
								onChange={handleAvatarUpload}
								hidden
								id="upload"
							/>
						</label>
					</div>
				</div>
			</div>
			<div className="text-xs text-primary py-1 px-4 text-center">
				Please make sure that file size is up to 10MB
			</div>
		</div>
	);
}
