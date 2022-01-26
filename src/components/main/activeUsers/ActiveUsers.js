import { useRef } from "react";
import { useEffect } from "react/cjs/react.development";
import useActiveUsers from "../../../hooks/useActiveUsers";
import StatusBar from "../status/Statusbar";
import ActiveUserRow from "./ActiveUserRow";

export default function ActiveUsers({ data, handleContactUser }) {
	const { loadNextPage } = useActiveUsers();
	const listRef = useRef();

	useEffect(() => {
		listRef.current.addEventListener(
			"scroll",
			() => {
				var scrollTop = listRef.current.scrollTop;
				var scrollHeight = listRef.current.scrollHeight;
				var offsetHeight = listRef.current.offsetHeight;
				var contentHeight = scrollHeight - offsetHeight;
				if (contentHeight <= scrollTop) {
					loadNextPage();
				}
			},
			false
		);
	}, []);

	return (
		<div className="text-primary w-full mx-auto lg:w-3/4 2xl:w-1/2">
			<div
				className="pb-48 md:pt-16
			
			"
				ref={listRef}
			>
				{data.map((au, i) => (
					<ActiveUserRow
						key={i}
						data={au}
						handleContactUser={handleContactUser}
					/>
				))}
			</div>
			<StatusBar />
		</div>
	);
}
