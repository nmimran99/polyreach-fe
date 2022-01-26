import { useContext } from "react/cjs/react.development";
import { ThemeContext } from "../../contexts/themeContext";
import useUser from "../../hooks/useUser";
import { getFullName } from "../../api/helper";
import { Link } from "react-router-dom";
import useToggle from "../../hooks/useToggle";
import EditProfile from "./editProfile/EditProfile";

export default function MyProfile({}) {
	const { user } = useUser();
	const { theme } = useContext(ThemeContext);
	const [edit, toggle] = useToggle();

	return (
		<>
			<div className="w-screen text-primary relative">
				<div className="w-full flex p-4 justify-center border-b border-light bg-mid fixed top-0 left-0">
					<Link to="/">
						<div className="absolute left-4">
							<img src={`/icons/ArrowLeft_${theme}.svg`} className="w-7" />
						</div>
					</Link>
					<div className="text-lg">{getFullName(user.info)}</div>
					<button className="absolute right-4" onClick={toggle}>
						<img src={`/icons/Pencil_${theme}.svg`} className="w-7" />
					</button>
				</div>
				<div className="w-full py-24">
					<div className="w-full flex justify-center py-4">
						<img
							src={user.avatar}
							className="w-52 h-52 object-cover rounded-full ring-4 ring-secondary"
						/>
					</div>
					<div className="text-2xl text-center font-semibold py-2">
						{getFullName(user.info)}
					</div>
					<div className="py-4 px-2">
						<div className="py-2 px-4">
							<div className="text-xs text-secondary">Email Address</div>
							<div className="text-md">{user.email}</div>
						</div>
						<div className="py-2 px-4">
							<div className="text-xs text-secondary">Occupation</div>
							<div className="text-md">{user.data.occupation}</div>
						</div>
						<div className="py-2 px-4">
							<div className="text-xs text-secondary">Company</div>
							<div className="text-md">{user.data.company}</div>
						</div>
						<div className="py-2 px-4">
							<div className="text-xs text-secondary">Introdcution</div>
							<div className="text-md">{user.data.introduction}</div>
						</div>
						<div className="py-2 px-4">
							<div className="text-xs text-secondary">Interests</div>
							<div className="flex flex-wrap">
								{user.data.interests.map((interest, i) => (
									<div
										key={i}
										className=" py-1.5 px-4 bg-secondary text-black rounded-full m-1 w-max whitespace-nowrap text-xs font-bold "
									>
										{interest}
									</div>
								))}
							</div>
						</div>
					</div>
				</div>
			</div>
			{edit && <EditProfile handleClose={toggle} />}
		</>
	);
}
