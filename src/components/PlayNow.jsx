import React from "react";
import { FaTicketAlt } from "react-icons/fa";
import woofImg from "../assets/woof.png";

const PlayNow = () => {
	return (
		<div className="bg-gradient-to-r from-blue-200 to-cyan-200 p-5 rounded-lg shadow-lg w-full max-w-md flex items-center justify-between">
			<div className=" flex flex-col">
				<span className="text-3xl text-black font-semibold py-2">Woof Dash</span>
				<div>
					<button className="bg-gradient-to-r from-indigo-400 to-cyan-400 text-black font-semibold py-3 px-10 rounded-full shadow hover:bg-blue-600 hover:text-white transition duration-200">
						Play
					</button>
				</div>
			</div>
			<div>
				<img src={woofImg} alt="" className=" w-36 ml-2" />
			</div>
		</div>
	);
};

export default PlayNow;
