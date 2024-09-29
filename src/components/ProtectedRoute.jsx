import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
	const location = useLocation();
	console.log("location", location);

	// Extract the referral code from the query parameters (if present)
	console.log("Current URL:", location.search); // Log the current URL search part

	// Extract the referral code from the query parameter (search part)
	const queryParams = new URLSearchParams(location.search);
	const referralCode = queryParams.get("tgiWebAppStartParam"); // Extract referral code

	console.log("Referral Code:", referralCode); // Log the extracted referral code

	const { token } = useSelector((state) => state.auth);
	// If user is not logged in, redirect to /startapp
	// if (!token) {
	// 	// If referral code exists, append it to the redirect URL
	// 	const redirectURL = referralCode ? `/startapp?startapp=${referralCode}` : "/startapp";

	// 	return <Navigate to={redirectURL} />;
	// }
	return children;
};

export default ProtectedRoute;
