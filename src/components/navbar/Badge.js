import { useState } from "react";

export default function Badge({ count, children }) {
	return (
		<div className="relative">
			{!!count && (
				<div className="absolute w-5 h-5 flex items-center justify-center rounded-full bg-red-600 text-white text-[10px] top-1 right-1">
					{count}
				</div>
			)}

			{children}
		</div>
	);
}
