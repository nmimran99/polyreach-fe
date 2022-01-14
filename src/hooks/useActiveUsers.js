import { useContext, useEffect } from "react";
import ActiveUsersContext from "../contexts/activeUsersContext";

export default function useActiveUsers() {
	const { activeUsers, setActiveUsers } = useContext(ActiveUsersContext);

	return { activeUsers, setActiveUsers };
}
