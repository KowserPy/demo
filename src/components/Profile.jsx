import React from "react";
import woofImg from "../assets/woof.png";
import { useSelector } from "react-redux";

const Profile = () => {
	const { profile, loading, error } = useSelector((state) => state.user);
	console.log(Profile);
	return (
		<div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-5 rounded-lg shadow-lg w-full max-w-md">
			<div className="flex flex-col items-center mb-6">
				<img src={woofImg} alt="woofImg" className="w-2/5" />
				<span className="text-3xl font-bold">7,809 WOOF</span>
			</div>
			<div className="space-y-4">
				<div className="flex items-center justify-between bg-gray-50 p-4 rounded-lg shadow-sm">
					<span className="font-semibold">Points</span>
					<div className="flex items-center gap-2">
						<span>{profile.points}</span>
						<img src={woofImg} alt="Reward Icon" className="w-6 h-6" />
					</div>
				</div>
			</div>
		</div>
	);
};

export default Profile;
