import { useContext } from "react/cjs/react.development";
import { NetworkContext } from "../contexts/netowrkContext";

export default function useNetwork() {
	return useContext(NetworkContext);
}
