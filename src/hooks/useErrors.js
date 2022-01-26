import { useCallback, useState } from "react";

export default function useErrors() {
	const [errors, setErrors] = useState([]);

	const Error = ({ field, data }) => {
		return (data || errors) && getError(field, data) ? (
			<div className="text-xs text-red-600 rounded-full w-max pb-2 px-1">
				{getError(field).text}
			</div>
		) : null;
	};

	const getError = useCallback(
		(field, data) => {
			if (data) {
				return data.find((e) => e.field === field);
			}
			return errors.find((e) => e.field === field);
		},
		[errors]
	);

	return { Error, getError, errors, setErrors };
}
