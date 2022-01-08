import "./App.css";
import {
	BrowserRouter as Router,
	Outlet,
	Route,
	Routes,
} from "react-router-dom";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Main from "./pages/Main";
import useSnackbar from "./hooks/useSnackbar";
import VerificationNeeded from "./pages/auth/VerificationNeeded";
import VerifyUser from "./pages/auth/VerifyUser";
import RecoverPassword from "./pages/auth/RecoverPassword";
import ResetPassword from "./pages/auth/ResetPassword";

function App() {
	const { SnackbarComponent } = useSnackbar();
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
					<Route path="/" element={<Main />} />
				</Routes>
			</Router>
			<SnackbarComponent />
		</div>
	);
}

export default App;
