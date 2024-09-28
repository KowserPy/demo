import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import woofImg from "../assets/woof.png";
import { fetchTasks } from "../features/task/TaskSlice";
import { FaTelegramPlane } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaYoutube } from "react-icons/fa";

const Task = () => {
	const [selectedTask, setSelectedTask] = useState(null);
	const [isModalOpen, setIsModalOpen] = useState(false);
	const dispatch = useDispatch();
	const { tasks, loading, error } = useSelector((state) => state.task);

	useEffect(() => {
		console.log(tasks);
		dispatch(fetchTasks());
	}, [dispatch]);

	const openTask = (task) => {
		setSelectedTask(task);
		setIsModalOpen(true);
	};

	const closeModal = () => {
		setIsModalOpen(false);
		setSelectedTask(null);
	};

	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center p-5 gap-5 h-[calc(100vh-4rem)] hide-scrollbar overflow-y-scroll space-y-6 pb-20 relative">
			<div className="mb-6 flex flex-col items-center shadow-2xl p-5 rounded-xl max-w-md w-full mx-auto">
				<div className="flex items-center gap-2">
					<h1 className="text-2xl font-bold text-gray-800">Earn Woof</h1>
					<img src={woofImg} alt="Woof" className="w-12 h-12" />
				</div>
				<p className="text-gray-700 text-lg text-center">Simple steps to get more rating.</p>
			</div>

			<ul className="flex flex-col gap-2 space-y-4 max-w-md w-full mx-auto bg-gradient-to-r from-blue-200 to-cyan-200 p-5 rounded-lg">
				{tasks.map((task, index) => (
					<li key={index} className="flex items-center gap-2 cursor-pointer" onClick={() => openTask(task)}>
						<div className="w-14 h-14 text-xl flex justify-center items-center bg-gradient-to-r from-violet-200 to-pink-200 rounded-full">
							{task.taskCategory === "telegram" ? (
								<FaTelegramPlane />
							) : task.taskCategory === "twitter" ? (
								<FaTwitter />
							) : (
								<FaYoutube />
							)}
						</div>
						<div className="flex flex-col">
							<p className="text-gray-800 text-xl font-semibold">{task.title}</p>
							<span className="text-yellow-500 font-semibold">{task.points} WOOF</span>
						</div>
					</li>
				))}
			</ul>

			{/* Modal for Task Details */}
			<TaskModal task={selectedTask} isOpen={isModalOpen} onClose={closeModal} />
		</div>
	);
};

export default Task;
