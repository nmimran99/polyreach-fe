import { useEffect } from "react";
import useUser from "../hooks/useUser";

export default function Main() {
	const { user, refreshToken } = useUser();

	useEffect(() => {
		refreshToken();
	}, [refreshToken]);

	return <div className="text-primary">{user?.info.firstName}</div>;
}
