import { useState } from "react";
import useUser from "../../../hooks/useUser";
import Modal from "../../misc/Modal";
import Avatar from "./Avatar";
import useErrors from "../../../hooks/useErrors";
import Details from "./Details";
import { useContext } from "react/cjs/react.development";
import { ThemeContext } from "../../../contexts/themeContext";
import Location from "./Location";
import Interests from "./Interests";
import useSWR from "swr";
import axios from "../../../api/axiosInstance";

const fetcher = (url) => axios.get(url).then((res) => res.data);

export default function EditProfile({ handleClose }) {
	const { user } = useUser();
	const { errors, setErrors } = useErrors();
	const { theme } = useContext(ThemeContext);
	const { data: tags, error } = useSWR("/tag", fetcher);

	const [details, setDetails] = useState({
		email: user.email,
		avatar: user.avatar,
		...user.info,
		...user.data,
	});

	const handleChange = (field, value) => {
		setDetails({
			...details,
			[field]: value,
		});
	};

	const validateFields = async () => {
		let tempErrors = [];
		Object.entries({
			email: details.email,
			firstName: details.firstName,
			lastName: details.lastName,
		}).forEach((dt) => {
			let [field, value] = dt;

			if (!value || value === "") {
				tempErrors.push({ field: field, text: "Field can not be empty" });
				return;
			}

			if (field === "email") {
				const r = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
				if (!r.test(value)) {
					tempErrors.push({
						field: "email",
						text: "Please enter a valid email address",
					});
				}
				return;
			}
		});
		setErrors(tempErrors);
		return !tempErrors.length;
	};

	console.log(tags);
	return (
		<Modal hideControls>
			<div className="w-screen relative h-screen bg-primary overflow-auto pt-16">
				<div className="w-full text-primary text-lg text-center p-3 bg-mid fixed top-0 left-0 z-10 border-b border-light">
					<button className="absolute left-4" onClick={handleClose}>
						<img src={`/icons/ArrowLeft_${theme}.svg`} className="w-7" />
					</button>
					<div>Change account details</div>
				</div>

				<Avatar avatar={details.avatar} handleChange={handleChange} />
				<Details
					details={details}
					parentErrors={errors}
					handleChange={handleChange}
				/>
				<Location details={details} handleChange={handleChange} />
				<Interests
					details={details}
					handleChange={handleChange}
					tags={tags && tags.tags}
				/>
				<div className="w-full fixed bottom-0 left-0 shadow-lg ">
					<button className="w-1/2 bg-secondary text-black font-bold border-t border-light pt-2 pb-4">
						Submit
					</button>
					<button className="w-1/2 bg-primary text-primary  border-t border-light pt-2 pb-4">
						Cancel
					</button>
				</div>
			</div>
		</Modal>
	);
}
