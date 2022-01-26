import { useState } from "react";
import { useContext, useEffect, useRef } from "react/cjs/react.development";
import { getShortName } from "../../api/helper";
import { ThemeContext } from "../../contexts/themeContext";
import useNetwork from "../../hooks/useNetwork";
import ActivityRing from "../main/activeUsers/ActivityRing";

export default function NewChat({ handleNewChat, handleClose }) {
	const { network, searchConnection } = useNetwork();
	const { theme } = useContext(ThemeContext);
	const [presented, setPresented] = useState(network);
	const [page, setPage] = useState(0);
	const [searchText, setSearchText] = useState("");
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

	const resetPresented = () => {
		setPresented((pr) => {
			return [...network.slice(page * 9, page * 9 + 9)];
		});
	};

	const handleSearch = async () => {
		const res = await searchConnection(searchText);
		setPresented(res);
	};

	const handleSearchText = (e) => {
		setSearchText(e.target.value);
	};

	return (
		<div className="h-[calc(100%-11em)] w-full animate-slideUp absolute bg-primary z-20 md:animate-none">
			<div className=" p-4">
				<div className="flex items-center">
					<button className="" onClick={handleClose}>
						<img src={`/icons/ArrowLeft_${theme}.svg`} className="w-6" />
					</button>
					<div className="text-primary font-semibold text-xl px-2 ">
						New Chat
					</div>
				</div>
			</div>
			<div className="pb-2 px-2 border-b border-light">
				<input
					type="text"
					className="h-9 rounded-full bg-primary px-4 border border-light w-full text-xs text-primary"
					placeholder="Serach by name..."
					value={searchText}
					onChange={handleSearchText}
				/>
			</div>
			<div ref={listRef} className="py-2">
				{presented.map((p, i) => (
					<button
						className="flex items-center py-2 w-full px-4"
						onClick={handleNewChat(p)}
						key={i}
					>
						<div className="flex items-center justify-center">
							<img
								src={p.avatar}
								className="w-14 h-14 object-cover  rounded-full"
							/>
						</div>
						<div className="text-left">
							<div className="text-primary px-4">{getShortName(p.info)}</div>
							<div className="text-primary px-4 text-xs">
								{p.data.occupation}
							</div>
							<div className="text-primary px-4 text-xs">{p.data.company}</div>
						</div>
					</button>
				))}
			</div>
		</div>
	);
}
