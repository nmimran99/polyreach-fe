import { useEffect, useState } from "react";
import { getColor } from "../../../api/helper";

export default function ActivityRing({ children, status }) {
	return (
		<div
			className={`rounded-full border relative w-max ${
				status !== "Inactive"
					? status === "Active"
						? "border border-active bg-primary"
						: "border border-busy bg-primary"
					: null
			} p-0.5 `}
		>
			{children}
			{status !== "Inactive" && (
				<div
					className={`w-3.5 h-3.5 rounded-full ${
						status !== "Inactive"
							? status === "Active"
								? "bg-active"
								: "bg-busy"
							: null
					} absolute z-10 bottom-0 right-0.5 border border-black ring-1 ${
						status !== "Inactive"
							? status === "Active"
								? "ring-active"
								: "ring-busy"
							: null
					}`}
				></div>
			)}
		</div>
	);
}
