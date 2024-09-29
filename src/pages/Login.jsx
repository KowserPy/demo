import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import GetStarted from "../components/GetStarted";
import { useLocation, useNavigate } from "react-router-dom";
import { createUser } from "../features/auth/authSlice";

const Login = () => {
	const location = useLocation();
	const [isLoggedInTg, setLoggedInTg] = useState(false);
	const [userData, setUserData] = useState({});
	const dispatch = useDispatch();
	const navigate = useNavigate();
	const { token, isError, isLoading, isSuccess } = useSelector((state) => state.auth);

	// Redirect to home if already authenticated
	useEffect(() => {
		if (isSuccess || token) {
			navigate("/");
		}
	}, [isSuccess, token, navigate]);

	// Initialize Telegram WebApp data
	useEffect(() => {
		if (window.Telegram.WebApp.initData !== "") {
			setLoggedInTg(true);
			setUserData({
				initData: window.Telegram.WebApp.initData,
			});
		} else {
			setLoggedInTg(false);
		}
	}, []);

	// Handle sending data with the referral code
	const handleSendData = async () => {
		const queryParams = new URLSearchParams(location.search);
		const referralCode = queryParams.get("startapp");

		// Merge referralCode into userData
		const updatedUserData = {
			...userData,
			referralCode: referralCode || null,
		};

		// Update the state with the new data
		setUserData(updatedUserData);

		// Use the updatedUserData for logging and dispatching
		console.log("Updated userData with referralCode:", updatedUserData);

		if (isLoggedInTg && userData) {
			try {
				// Dispatch the updated user data to the backend
				await dispatch(createUser(updatedUserData));
			} catch (error) {
				console.error("Error logging in:", error);
			}
		}
	};

	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center h-screen">
			{isLoggedInTg ? (
				<GetStarted handleStart={handleSendData} isLoading={isLoading} />
			) : (
				<div className="flex flex-col items-center justify-center h-screen">
					<p className="text-xl">Please Login to Telegram.</p>
					<a
						href="https://web.telegram.org/a/"
						target="_blank"
						rel="noopener noreferrer"
						className="bg-blue-500 text-white px-4 py-2 rounded inline-block mt-4"
					>
						Login
					</a>
				</div>
			)}
		</div>
	);
};

export default Login;
