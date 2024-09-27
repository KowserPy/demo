import React from "react";
import { Outlet } from "react-router-dom";
import Slider from "./components/Slider";
import ProtectedRoute from "./components/ProtectedRoute";

const App = () => {
	return (
		<ProtectedRoute>
			<Outlet />
			<Slider />
		</ProtectedRoute>
	);
};

export default App;
