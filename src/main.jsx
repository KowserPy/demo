import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Provider } from "react-redux";
import store from "./app/store.js";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

createRoot(document.getElementById("root")).render(
	<StrictMode>
		<Provider store={store}>
			<RouterProvider router={router} />
			<ToastContainer
				position="top-right" // You can change position (top-left, bottom-right, etc.)
				autoClose={5000} // Set auto close in milliseconds
				hideProgressBar={false} // Show or hide progress bar
				newestOnTop={false} // Show the newest toast on top
				closeOnClick // Close toast when user clicks
				pauseOnHover // Pause toast timer when hovered
				draggable // Allow dragging the toast
				theme="colored" // Optional: "colored", "light", or "dark"
			/>
		</Provider>
	</StrictMode>
);
