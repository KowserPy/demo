import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import axios from "axios";
import { completeATask } from "../features/task/TaskSlice"; // Ensure you have this import

const botToken = import.meta.env.VITE_BOT_TOKEN;

const TaskModal = ({ task, isOpen, onClose }) => {
	const dispatch = useDispatch();
	const { profile } = useSelector((state) => state.user);
	const [isVerified, setIsVerified] = useState(false); // State to manage verification status

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isOpen]);

	const checkUserInGroup = async (task) => {
		// Logic to check if the user has joined the Telegram group
		let link = task?.completionURL;
		const telegramId = profile?.telegramId;
		const chat_idUsername = link.replace("https://t.me/", "@");
		console.log("chat_idUsername", chat_idUsername);
		try {
			const response = await axios.get(`https://api.telegram.org/bot${botToken}/getChatMember`, {
				params: {
					chat_id: chat_idUsername, // Replace with your group chat ID
					user_id: telegramId, // User's Telegram ID
				},
			});
			const isMember =
				response.data.result.status === "member" || response.data.result.status === "administrator";
			console.log("isMember", isMember);
			setIsVerified(isMember); // Set isVerified based on membership status
			return isMember;
		} catch (error) {
			console.error("Error checking user in group:", error);
			setIsVerified(false); // Assume user is not in the group if there's an error
			return false;
		}
	};

	const handleUrlOpen = async (task) => {
		if (task.taskCategory === "telegram") {
			// For Telegram tasks, allow the user to open the link
			window.Telegram.WebApp.openTelegramLink(task.completionURL);
		} else {
			// For other tasks, just open the link and mark as verified
			window.Telegram.WebApp.openLink(task.completionURL, { try_instant_view: true });
			setIsVerified(true); // Mark as verified when opening a non-Telegram task
		}
	};

	const completeTaskHandler = async (task) => {
		if (task.taskCategory === "telegram") {
			const isMember = await checkUserInGroup(task);
			if (!isMember) {
				toast.error("Please complete this task");
				return;
			}
		}
		if (isVerified) {
			// If we are here, we can dispatch the complete task action
			dispatch(completeATask(task._id));
			toast.success("Task completed successfully!");
			onClose(); // Close modal after completing
		} else {
			toast.error("Please complete this task");
		}
	};

	return (
		<div
			className={`fixed inset-0 flex justify-center items-end z-50 ${
				isOpen ? "pointer-events-auto" : "pointer-events-none"
			}`}
		>
			{/* Background overlay */}
			<div
				className={`fixed inset-0 bg-black transition-opacity duration-300 ${
					isOpen ? "opacity-50" : "opacity-0"
				}`}
				onClick={onClose}
			></div>

			{/* Modal content with height animation */}
			<div
				className={`relative bg-gray-100 rounded-t-3xl  w-full transition-all duration-500 ease-in-out overflow-x-auto ${
					isOpen ? "h-[70vh]" : "h-0"
				}`}
			>
				{/* Modal content */}
				{isOpen && (
					<div className="p-6">
						{/* Close button */}
						<button
							onClick={onClose}
							className="absolute top-5 right-5 text-white hover:text-gray-700 font-bold bg-gray-400 w-8 h-8 flex items-center justify-center rounded-full"
						>
							<IoClose className=" text-lg text-black" />
						</button>
						<div className="text-center mt-5">
							<img
								src="https://telegram.org/img/t_logo.png"
								alt="Telegram"
								className="w-16 h-16 mx-auto mb-2"
							/>
							<h2 className="text-2xl font-bold">{task.title}</h2>
							<p className="text-yellow-500 font-semibold my-4 text-lg">+{task.points} WOOF</p>
							<div className="mt-5 flex flex-col justify-center gap-3">
								<button
									className="w-full bg-blue-500 text-white rounded-lg py-2"
									onClick={() => handleUrlOpen(task)}
								>
									Subscribe
								</button>
								<button
									className="w-full bg-gray-300 text-gray-700 rounded-lg py-2"
									onClick={() => completeTaskHandler(task)}
								>
									Check subscription
								</button>
							</div>
						</div>
					</div>
				)}
			</div>
		</div>
	);
};

export default TaskModal;
