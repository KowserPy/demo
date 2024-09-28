import React, { useEffect, useState } from "react";
import { IoClose } from "react-icons/io5";
import { completeATask } from "../features/task/TaskSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const botToken = import.meta.env.VITE_BOT_TOKEN;

const TaskModal = ({ task, isOpen, onClose }) => {
	const [verified, setVerified] = useState(false);
	const dispatch = useDispatch();
	const { profile, loading, error } = useSelector((state) => state.user);

	useEffect(() => {
		if (isOpen) {
			document.body.style.overflow = "hidden";
		} else {
			document.body.style.overflow = "auto";
		}
	}, [isOpen]);

	const handleTaskVeriff = async (task) => {
		console.log("calleed onTaskVeriff");
		try {
			const response = await axios.get(`https://api.telegram.org/bot${botToken}/getChatMember`, {
				params: {
					chat_id: "@MyOWNPY",
					user_id: profile?.telegramId,
				},
			});
			console.log(response);
			setVerified(true);
		} catch (error) {
			// Handle error or retry
			setVerified(false);
			console.error("Error fetching user membership:", error);
		}

		return true;
	};

	const completeTaskHandler = (task) => {
		if (task) {
			if (verified) {
				dispatch(completeATask(task._id));
			} else {
				toast.error("Complte The task Please");
				return;
			}
		}
		onClose();
	};
	const handleJoin = (task) => {
		if (task.taskCategory === "telegram") {
			Telegram.WebApp.openTelegramLink(task.completionURL);
			handleTaskVeriff(task);
		} else {
			setVerified(true);
			Telegram.WebApp.openLink(task.completionURL, { try_instant_view: true });
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
							{/* <p className="text-gray-700">{task.description}</p> */}
							<div className="mt-5 flex flex-col justify-center gap-3">
								<button
									className=" w-full bg-blue-500 text-white rounded-lg py-2"
									onClick={() => handleJoin(task)}
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
