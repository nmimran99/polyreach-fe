import useModals from "../../hooks/useModals";
import useUser from "../../hooks/useUser";
import ClickAwayListener from "../misc/ClickAwayListener";
import { getFullName } from "../../api/helper";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import { ThemeContext } from "../../contexts/themeContext";

export default function UserMenu({}) {
	const { user, logout } = useUser();
	const navigate = useNavigate();
	const { theme } = useContext(ThemeContext);
	const { setModalType } = useModals();

	const handleClick = (to) => (event) => {
		setModalType(null);
		navigate(to);
	};

	return (
		<ClickAwayListener
			onClickAway={() => setModalType(null)}
			nodeRef={null}
			className="h-full w-screen absolute top-0 right-0 z-30 bg-primary
				md:w-80 md:h-auto md:rounded-xl md:shadow-xl md:top-16 md:right-4 md:border md:border-light
			"
		>
			<div className="flex items-center px-2 py-6 border-b border-light">
				<div className="px-2">
					<img
						src={user.avatar}
						className="w-16 h-16 object-cover rounded-full"
					/>
				</div>
				<div className="text-primary text-xs px-2">
					<div className="text-sm">{getFullName(user.info)}</div>
					<div className="">{user.data.occupation}</div>
					<div className="">{user.data.company}</div>
				</div>
			</div>
			<div className="">
				<button
					className="flex text-primary items-center py-3 px-4 w-full border-b border-light hover:bg-mid"
					onClick={handleClick(`/user/${user._id}`)}
				>
					<img src={`/icons/Profile_${theme}.svg`} className="w-7" />
					<div className="px-4">My Profile</div>
				</button>

				<button
					className="flex text-primary items-center py-3 px-4 w-full border-b border-light hover:bg-mid"
					onClick={handleClick(`/feedback`)}
				>
					<img src={`/icons/Idea_${theme}.svg`} className="w-7" />
					<div className="px-4">Give us feedback</div>
				</button>

				<button
					className="flex text-primary items-center py-3 px-4 w-full rounded-b-xl hover:bg-mid"
					onClick={logout}
				>
					<img src={`/icons/SignOut_${theme}.svg`} className="w-7" />
					<div className="px-4">Log out</div>
				</button>
			</div>
		</ClickAwayListener>
	);
}
