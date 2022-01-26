import { useEffect, useRef } from "react";
import useModals from "../../../hooks/useModals";
import useNotifications from "../../../hooks/useNotificaitions";
import useSocket from "../../../hooks/useSocket";
import useUser from "../../../hooks/useUser";
import ClickAwayListener from "../../misc/ClickAwayListener";
import Notification from "./Notification";

export default function Notificaiotns({}) {
	const listRef = useRef();
	const { notifications, loadNextPage } = useNotifications();
	const { setModalType } = useModals();

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
					Notifications
				</div>
			</div>
			<div
				ref={listRef}
				className="h-[calc(100%-11em)] overflow-auto relative
					md:h-[calc(100%-5em)] md:pb-2
					
			"
			>
				{notifications.map((n, i) => (
					<Notification data={n} key={i} />
				))}
			</div>
		</ClickAwayListener>
	);
}
