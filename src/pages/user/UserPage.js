import { useParams } from "react-router-dom";
import MyProfile from "../../components/user/MyProfile";
import UserProfile from "../../components/user/UserProfile";
import useUser from "../../hooks/useUser";

export default function UserPage({}) {
	const { user } = useUser();
	const params = useParams();

	if (user._id === params.userId) {
		return <MyProfile />;
	}
	return <UserProfile />;
}
