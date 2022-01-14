import ActiveUserRow from "./ActiveUserRow";

export default function ActiveUsers({ data, handleContactUser }) {
	return (
		<div className="text-primary w-full mx-auto lg:w-3/4 2xl:w-1/2">
			<div
				className="h-full pb-18 md:py-16
			
			"
			>
				{data.map((au, i) => (
					<ActiveUserRow
						key={i}
						data={au}
						handleContactUser={handleContactUser}
					/>
				))}
			</div>
		</div>
	);
}
