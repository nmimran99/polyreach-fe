import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import useSWR from "swr";
import axios from "../../api/axiosInstance";
import { createUser } from "../../api/userApi";
import PolyreachLink from "../../components/misc/PolyreachLink";
import Avatar from "../../components/register/Avatar";
import Details from "../../components/register/Details";
import Interests from "../../components/register/Interests";
import Occupation from "../../components/register/Occupation";
import Password from "../../components/register/Password";
import ProfileSkeleton from "../../components/register/ProfileSkeleton";
import Progress from "../../components/register/Progress";
import { ThemeContext } from "../../contexts/themeContext";
import useSnackbar from "../../hooks/useSnackbar";
import useUser from "../../hooks/useUser";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function Register() {
	const [isLoading, setIsLoading] = useState(false);
	const { setSnackbar } = useSnackbar();
	const navigate = useNavigate();
	const { clearAuth, user } = useUser();
	const { theme } = useContext(ThemeContext);
	const pages = ["details", "password", "avatar", "occupation", "interests"];
	const { data: tags, error } = useSWR("/tag", fetcher);
	const [page, setPage] = useState("details");
	const [details, setDetails] = useState({
		avatar: null,
		firstName: "",
		lastName: "",
		email: "",
		password: "",
		occupation: "",
		company: "",
		introduction: "",
		location: "",
		interests: [],
	});

	useEffect(() => {
		if (user) {
			clearAuth();
		}
	}, []);

	const handleChange = (field, value) => {
		setDetails({
			...details,
			[field]: value,
		});
	};

	const handleNextPage = (pageId) => {
		setPage(pages[pages.indexOf(pageId) + 1]);
	};

	const handlePreviousPage = (pageId) => (event) => {
		setPage(pages[pages.indexOf(pageId) - 1]);
	};

	const handleSubmit = async () => {
		setIsLoading(true);
		const res = await createUser(details);

		if (!res) {
			setSnackbar({
				result: "error",
				text: "We are facing a technical issue right now. \nPlease try to complete this process again later.",
			});
			return;
		}
		setSnackbar({
			result: "success",
			text: "You registered successfully! \n Please check your mailbox for a confirmation email.",
		});
		navigate("/auth/login");
	};

	return (
		<div className="h-screen w-screen">
			<PolyreachLink />
			<div className="flex w-full h-full">
				<div
					className="flex flex-col p-4
					lg:w-2/5 lg:p-4

				"
				>
					{page === "details" ? (
						<Details
							details={details}
							handleChange={handleChange}
							handleNextPage={handleNextPage}
						/>
					) : page === "password" ? (
						<Password
							details={details}
							handleChange={handleChange}
							handleNextPage={handleNextPage}
							handlePreviousPage={handlePreviousPage}
						/>
					) : page === "avatar" ? (
						<Avatar
							handleNextPage={handleNextPage}
							handlePreviousPage={handlePreviousPage}
							details={details}
							handleChange={handleChange}
						/>
					) : page === "occupation" ? (
						<Occupation
							details={details}
							handleChange={handleChange}
							handleNextPage={handleNextPage}
							handlePreviousPage={handlePreviousPage}
						/>
					) : page === "interests" ? (
						<Interests
							details={details}
							handleChange={handleChange}
							handleSubmit={handleSubmit}
							handlePreviousPage={handlePreviousPage}
							tags={tags.tags}
						/>
					) : null}
				</div>
				<div
					className="h-screen hidden bg-secondary 
				lg:flex lg:flex-col lg:w-3/5

				"
				>
					<div className="hidden lg:block">
						<Progress currentPage={page} />
					</div>
					<div className="relative">
						<div className="absolute right-16">
							<ProfileSkeleton details={details} />
						</div>
						<div className="absolute top-48 left-8 xl:top-72 xl:left-16">
							<img
								src="/svg/launch_dark.svg"
								className="lg:w-1/2 xl:w-3/4 2xl:w-5/6"
							/>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
