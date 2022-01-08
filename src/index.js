import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import Layout from "./components/misc/Layout";

ReactDOM.render(
	<React.StrictMode>
		<Layout>
			<App />
		</Layout>
	</React.StrictMode>,
	document.getElementById("root")
);
