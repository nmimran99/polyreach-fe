import { useEffect, useRef } from "react";
import useCallHistory from "../../../hooks/useCallHistory";
import useUser from "../../../hooks/useUser";
import CallRow from "./CallRow";
import useModals from "../../../hooks/useModals";
import ClickAwayListener from "../../misc/ClickAwayListener";
import useSocket from "../../../hooks/useSocket";

export default function Calls({}) {
	const listRef = useRef();
	const { callUser } = useSocket();
	const { callHistory, loadNextPage } = useCallHistory();
	const { setModalType } = useModals();
	const { user } = useUser();

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

	const handleCallUser = (user) => (event) => {
		callUser(user);
		setModalType(null);
	};

	return (
		<ClickAwayListener
			onClickAway={() => setModalType(null)}
			nodeRef={null}
			className="h-full w-screen absolute top-0 right-0 z-30 bg-primary
				md:w-96 md:max-h-[60%] md:rounded-xl md:shadow-xl md:top-16 md:right-4 md:border md:border-light
			"
		>
			<div
				className="border-b border-light relative top-0 left-0 w-full h-20 bg-primary md:rounded-t-xl md:shadow-xl
			"
			>
				<div className=" text-primary text-2xl font-semibold pt-8 px-4 bg-primary rounded-t-xl">
					Call History
				</div>
			</div>
			<div
				ref={listRef}
				className="h-[calc(100%-11em)] overflow-auto relative
					md:h-[calc(100%-5em)] md:pb-2
					
			"
			>
				{callHistory &&
					callHistory.map((ch, i) => (
						<CallRow
							data={ch}
							key={i}
							userId={user._id}
							handleCallUser={handleCallUser}
						/>
					))}
			</div>
		</ClickAwayListener>
	);
}
