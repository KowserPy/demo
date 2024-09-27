import React, { useEffect } from "react";
import woofImg from "../assets/woof.png";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../features/user/userSlice";

const Profile = () => {
	const dispatch = useDispatch();
	const { profile, loading, error } = useSelector((state) => state.user);

	useEffect(() => {
		dispatch(fetchUserProfile());
	}, [dispatch]);

	if (loading) {
		return <p className="text-center">Loading profile...</p>;
	}

	if (error) {
		return <p className="text-red-500 text-center">Error: {error}</p>;
	}

	// Safely access profile data
	const totalPoints = profile?.points?.totalPoints || 0;
	const taskPoints = profile?.points?.taskPoints || 0;
	const referralPoints = profile?.points?.referralPoints || 0;

	return (
		<div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-5 rounded-lg shadow-lg w-full max-w-md">
			<div className="flex flex-col items-center mb-6">
				<img src={woofImg} alt="woofImg" className="w-2/5" />
				<span className="text-3xl font-bold">{totalPoints}</span>
			</div>
			<div className="space-y-4">
				<div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
					<span className="font-semibold">Task</span>
					<div className="flex items-center gap-2">
						<span>{taskPoints}</span>
						<img src={woofImg} alt="Task Icon" className="w-6 h-6" />
					</div>
				</div>
				<div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
					<span className="font-semibold">Invites</span>
					<div className="flex items-center gap-2">
						<span>{referralPoints}</span>
						<img src={woofImg} alt="Invite Icon" className="w-6 h-6" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
