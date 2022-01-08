export default function ProfileSkeleton({ details }) {
	return (
		<div className="bg-primary opacity-90 rounded-3xl w-96 h-max min-60 mx-auto hidden p-4 md:block xl:my-6 2xl:my-12 z-10 relative">
			<div className=" w-full flex m-4">
				<div className="w-24 h-24 border border-primary rounded-full ">
					{details.avatar && (
						<img
							src={URL.createObjectURL(details.avatar)}
							className="w-24 h-24 border border-primary rounded-full border-2 border-secondary ring ring-secondary object-cover"
						/>
					)}
				</div>

				<div className="">
					<div className="text-primary w-60 px-4 p-1 ">
						<div className="text-sm">
							{details.firstName || details.lastName ? (
								`${details.firstName} ${details.lastName}`
							) : (
								<div className="w-40 h-3 bg-gray-400 rounded-full animate-pulse my-1 duration-1000"></div>
							)}
						</div>
						<div className="text-xs">
							{details.email ? (
								`${details.email}`
							) : (
								<div className="w-32 h-3 bg-gray-300 rounded-full animate-pulse my-1 duration-1000"></div>
							)}
						</div>
					</div>
					<div className="text-primary w-60 px-4 p-1">
						<div className="text-xs">
							{details.occupation ? (
								`${details.occupation}`
							) : (
								<div className="w-40 h-3 bg-gray-400 rounded-full animate-pulse my-1 duration-1000"></div>
							)}
						</div>
						<div className="text-xs">
							{details.company ? (
								`${details.company}`
							) : (
								<div className="w-32 h-3 bg-gray-300 rounded-full animate-pulse my-1 duration-1000"></div>
							)}
						</div>
						<div className="text-primary">
							<div className="text-xs">
								{details.location ? (
									`${details.location}`
								) : (
									<div className="w-24 h-3 bg-gray-400 rounded-full animate-pulse my-1 duration-1000"></div>
								)}
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="text-primary w-full px-4 p-2">
				<div className="text-xs flex flex-wrap">
					{details.interests.length ? (
						details.interests.map((interest, i) => (
							<div
								key={i}
								className={`text-xs p-1 px-4 rounded-full m-0.5 w-max border border-secondary bg-secondary text-black `}
							>
								{interest}
							</div>
						))
					) : (
						<div className=" flex">
							<div className="text-xs p-1 h-6 rounded-full m-1 w-24 border-2 border-secondary animate-pulse duration-1000"></div>
							<div className="text-xs p-1 h-6 rounded-full m-1 w-24 border-2 border-secondary animate-pulse duration-1000"></div>
							<div className="text-xs p-1 h-6 rounded-full m-1 w-24 border-2 border-secondary animate-pulse duration-1000"></div>
						</div>
					)}
				</div>
			</div>
			<div className="text-primary w-full px-4 py-1">
				<div className="text-xs break-words">
					{details.introduction ? (
						`${details.introduction}`
					) : (
						<div className="">
							<div className="w-72 h-2 bg-gray-400 rounded-full animate-pulse my-1 duration-1000"></div>
							<div className="w-72 h-2 bg-gray-400 rounded-full animate-pulse my-1 duration-1000"></div>
							<div className="w-72 h-2 bg-gray-400 rounded-full animate-pulse my-1 duration-1000"></div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}
