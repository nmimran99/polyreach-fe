import { useContext } from "react";
import ModalsContext from "../contexts/modalsContext";

export default function useActiveUsers() {
	return useContext(ModalsContext);
}
