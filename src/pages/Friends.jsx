import React, { useState } from "react";
import woofImg from "../../assets/woof.png";
import { FaCopy } from "react-icons/fa";
import { useSelector } from "react-redux";

const Friends = () => {
	const [notificationVisible, setNotificationVisible] = useState(false);
	const { profile, loading, error } = useSelector((state) => state.user);

	const handleInviteClick = () => {
		// Handle invite click logic here
		alert("Invite sent!");
	};

	const handleCopyLinkClick = () => {
		// Handle copy link logic here
		const myRefferCode = profile?.referralCode;

		const url = `http://t.me/WoofDash_bot/start?startapp="${myRefferCode}`;
		navigator.clipboard.writeText(url);
		setNotificationVisible(true);
		setTimeout(() => setNotificationVisible(false), 2000); // Hide after 2 seconds
	};

	// Generate 20 demo friends
	const demoFriends = Array.from({ length: 20 }, (_, index) => ({
		id: index + 1,
		username: `Friend${index + 1}`,
		woofAmount: `${Math.floor(Math.random() * 10000) + 1000} WOOF`,
	}));

	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center p-5 gap-5 h-[calc(100vh-4rem)] hide-scrollbar overflow-y-scroll space-y-6 pb-20 relative">
			<div className="flex justify-center items-center mb-6 max-w-md w-full mx-auto">
				<img src={woofImg} className="w-1/3" alt="WOOF" />
			</div>
			<p className="text-2xl text-center font-semibold">Invite frens</p>
			<p className="text-2xl text-center font-semibold">and get more WOOF</p>
			<div className="bg-white rounded-md shadow-md p-5 mt-6 max-w-md w-full mx-auto">
				<div className="flex items-center gap-2 mb-4">
					<img src={woofImg} className="w-1/6" alt="WOOF" />
					<div>
						<h4 className="font-semibold text-lg">Invite a friend</h4>
						<p className="text-sm text-gray-600">+750 to you and your friend</p>
					</div>
				</div>
				<div className="flex items-center gap-2 mb-6">
					<img src={woofImg} className="w-1/6" alt="WOOF" />
					<div>
						<h4 className="font-semibold text-lg">Invite a friend with Premium</h4>
						<p className="text-sm text-gray-600">+1000 to you and your friend</p>
					</div>
				</div>
				{/* Buttons */}
				<div className="flex justify-between gap-4">
					<button
						onClick={handleInviteClick}
						className="bg-blue-500 w-4/5 h-12 text-white py-2 px-4 rounded-md shadow hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
					>
						Invite
					</button>
					<button
						onClick={handleCopyLinkClick}
						className="bg-green-400 w-12 h-12 flex justify-center items-center text-white py-2 px-4 rounded-md shadow hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50"
					>
						<span className="text-xl font-bold">
							<FaCopy />
						</span>
					</button>
				</div>
			</div>
			{/* Notification Popup */}
			{notificationVisible && (
				<div className="absolute top-0 right-1/2 m-4 bg-green-500 text-white py-2 px-4 rounded-md shadow-lg">
					<p>Copied to clipboard!</p>
				</div>
			)}
			{/* Friends List */}
			<div className="mt-6 max-w-md w-full mx-auto">
				<p className="text-xl font-semibold mb-4">Top 20 Friends</p>
				<div className="bg-white rounded-md shadow-md p-5">
					{demoFriends.map((friend) => (
						<div
							key={friend.id}
							className="flex items-center justify-between mb-3 p-3 border-b border-gray-300"
						>
							<div className="flex items-center gap-2">
								<div className="w-12 h-12 bg-blue-500 flex justify-center items-center rounded-full text-white font-bold">
									{friend.username[0]}
								</div>
								<div>
									<p className="font-semibold">{friend.username}</p>
									<p className="text-sm text-gray-600">{friend.woofAmount}</p>
								</div>
							</div>
							<span className="text-gray-600">#{friend.id}</span>
						</div>
					))}
				</div>
			</div>
		</div>
	);
};

export default Friends;
