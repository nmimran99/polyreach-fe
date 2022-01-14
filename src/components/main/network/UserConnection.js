import { useContext } from "react/cjs/react.development";
import { getFullName } from "../../../api/helper";
import { ThemeContext } from "../../../contexts/themeContext";
import useModals from "../../../hooks/useModals";
import useSocket from "../../../hooks/useSocket";
import useToggle from "../../../hooks/useToggle";
import ClickAwayListener from "../../misc/ClickAwayListener";
import ActivityRing from "../activeUsers/ActivityRing";
import ConnectionMenu from "./ConnectionMenu";
import InterestsPills from "../../../components/main/activeUsers/InterestsPills";

export default function UserConnection({ data, handleRemove }) {
	const { callUser } = useSocket();
	const { setModalType } = useModals();

	const { theme } = useContext(ThemeContext);
	const [state, toggle] = useToggle(false);

	const handleCallUser = () => {
		callUser(data);
		setModalType(null);
	};

	const handleRemoveUser = () => {
		toggle();
		handleRemove(data);
	};

	return (
		<div
			className=" relative 
			md:w-96 md:h-52
		"
		>
			<div className="w-full h-full relative md:border md:border-light md:rounded-md md:items-start">
				<div className="flex p-4 items-center">
					<div className="">
						<ActivityRing status={data.status.status}>
							<img
								src={data.avatar}
								className="w-16 object-cover h-16 rounded-full"
							/>
						</ActivityRing>
					</div>
					<div className="px-4">
						<div className="text-primary">{getFullName(data.info)}</div>
						<div className="text-primary text-xs">{data.data.occupation}</div>
						<div className="text-primary text-xs">{data.data.company}</div>
					</div>
				</div>

				<div className="hidden md:block">
					<div className="py-2">
						<InterestsPills max={5} interests={data.data.interests} />
					</div>
				</div>

				{state ? (
					<ClickAwayListener
						onClickAway={toggle}
						nodeRef={null}
						className="absolute top-1/3 right-4 z-10 md:top-8"
					>
						<ConnectionMenu
							data={data}
							handleClose={toggle}
							handleRemoveUser={handleRemoveUser}
						/>
					</ClickAwayListener>
				) : (
					<div
						className="flex items-center absolute right-4 top-1/3 
						md:top-8
					"
					>
						<button onClick={toggle}>
							<img src={`/icons/ThreeDots_${theme}.svg`} className="w-9" />
						</button>
					</div>
				)}
			</div>
		</div>
	);
}
