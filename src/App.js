import "./App.css";
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";

import useSnackbar from "./hooks/useSnackbar";
import VerificationNeeded from "./pages/auth/VerificationNeeded";
import VerifyUser from "./pages/auth/VerifyUser";
import RecoverPassword from "./pages/auth/RecoverPassword";
import ResetPassword from "./pages/auth/ResetPassword";
import InitialRoute from "./pages/InitialRoute";
import useDialog from "./hooks/useDialog";

function App() {
	const { SnackbarComponent } = useSnackbar();
	const { DialogComponent } = useDialog();

	return (
		<div className="h-screen w-screen">
			<Router>
				<Routes>
					<Route path="/auth" element={<Outlet />}>
						<Route path="login" element={<Login />} />
						<Route path="register" element={<Register />} />
						<Route path="recover" element={<RecoverPassword />} />
						<Route path="resetpass/:vCode" element={<ResetPassword />} />
						<Route path="verify" element={<VerificationNeeded />} />
						<Route path=":vCode" element={<VerifyUser />} />
					</Route>
					<Route path="/*" element={<InitialRoute />} />
				</Routes>
			</Router>
			<SnackbarComponent />
			<DialogComponent />
		</div>
	);
}

export default App;
