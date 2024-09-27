import React from "react";
import tonImg from "../assets/tonLogo.png";

const DailyTask = () => {
	return (
		<div className=" bg-gradient-to-r from-blue-200 to-cyan-200 p-5 rounded-lg shadow-lg w-full max-w-md">
			<span className="text-lg font-bold block mb-4">Daily Task</span>
			<div className="flex justify-between items-center bg-slate-100 p-4 rounded-lg">
				<div>
					<span className="text-sm font-semibold block">Make TON Great Again</span>
					<span className="text-green-500 text-sm font-bold">+2000 WOOF</span>
				</div>
				<div>
					<img src={tonImg} alt="TON Logo" className="w-12 h-12 cursor-pointer" />
				</div>
			</div>
		</div>
	);
};

export default DailyTask;
