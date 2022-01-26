import { useEffect, useRef, useState } from "react";
import useCallHistory from "../../../hooks/useCallHistory";
import useModals from "../../../hooks/useModals";
import useSocket from "../../../hooks/useSocket";
import useUser from "../../../hooks/useUser";
import ClickAwayListener from "../../misc/ClickAwayListener";
import useNetwork from "../../../hooks/useNetwork";
import UserConnection from "./UserConnection";
import useDialog from "../../../hooks/useDialog";
import useScreenSize from "../../../hooks/useScreenSize";

export default function MyNetwork({}) {
	const listRef = useRef();
	const { callUser } = useSocket();
	const { setDialog, dialogRef } = useDialog();
	const { isMobile } = useScreenSize();
	const { network, deleteConnection, searchConnection } = useNetwork();
	const { setModalType } = useModals();
	const { user } = useUser();
	const [preseneted, setPresented] = useState([]);
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");

	useEffect(() => {
		listRef.current.addEventListener(
			"scroll",
			() => {
				var scrollTop = listRef.current.scrollTop;
				var scrollHeight = listRef.current.scrollHeight;
				var offsetHeight = listRef.current.offsetHeight;
				var contentHeight = scrollHeight - offsetHeight;
				if (contentHeight <= scrollTop) {
					setPage(page + 1);
				}
			},
			false
		);
	}, []);

	useEffect(() => {
		setPresented((pr) => {
			return [...pr, ...network.slice(page * 9, page * 9 + 9)];
		});
	}, [page]);

	useEffect(() => {
		if (!searchText) {
			resetPresented();
			return;
		}
		handleSearch();
	}, [searchText]);

	const handleSearch = async () => {
		const res = await searchConnection(searchText);
		setPresented(res);
	};

	const resetPresented = () => {
		setPresented((pr) => {
			return [...network.slice(page * 9, page * 9 + 9)];
		});
	};

	const handleCallUser = (user) => (event) => {
		callUser(user);
		setModalType(null);
	};

	const handleRemove = async (user) => {
		setDialog({
			header: "Delete Connection",
			text: `Are you sure you want to delete ${user.info.firstName} from your network?`,
			submitText: "Confirm",
			closeText: "Cancel",
			handleClose: () => setDialog(null),
			handleSubmit: async () => {
				const res = await deleteConnection(user);
				if (res) {
					setPresented(preseneted.filter((u) => u._id !== user._id));
				}
				setDialog(null);
			},
		});
	};

	const handleSearchText = (e) => {
		setSearchText(e.target.value);
	};

	return (
		<ClickAwayListener
			onClickAway={() => !isMobile() && setModalType(null)}
			nodeRef={null}
			className="h-full w-screen absolute top-0 right-0 z-30 bg-primary
			md:w-min md:max-h-[70%] md:h-max  md:border md:border-light md:rounded-xl md:top-16 md:right-4 md:shadow-xl 
			"
		>
			<div
				className="border-b border-light relative top-0 left-0 w-full h-20 bg-primary md:rounded-t-xl
			"
			>
				<div className=" text-primary text-2xl font-semibold pt-8 px-4 bg-primary rounded-t-xl">
					Network
				</div>
			</div>
			<div
				className="flex items-center px-2 border-b border-light relative top-0 left-0 w-full h-14 bg-primary md:rounded-t-xl md:shadow-md
			"
			>
				<input
					type="text"
					className="h-10 rounded-full bg-primary px-4 border border-light w-full text-xs text-primary lg:w-1/2 xl:w-1/3"
					placeholder="Serach by name..."
					value={searchText}
					onChange={handleSearchText}
				/>
			</div>
			<div
				ref={listRef}
				className="h-[calc(100%-16em)] w-full overflow-auto relative
				md:grid md:grid-cols-1 md:gap-2 md:h-[calc(100%-8.5em)] md:w-[25em] md:p-2.5 md:rounded-xl
				lg:grid-cols-2 lg:w-[50em]
				xl:grid-cols-3 xl:w-[75em]
			"
			>
				{preseneted.map((p, i) => (
					<UserConnection data={p} key={i} handleRemove={handleRemove} />
				))}
			</div>
		</ClickAwayListener>
	);
}
