import React from "react";

const GetStarted = ({ handleStart, isLoading }) => {
	return (
		<div className=" w-full mx-auto h-screen bg-gradient-to-r from-blue-200 to-cyan-200 flex items-center justify-center flex-col">
			<div className="text-center  mb-6">
				<h1 className="text-5xl py-2 font-bold italic">Woof Dash</h1>
				<p>Play more earn more</p>
			</div>
			<button
				onClick={handleStart}
				disabled={isLoading}
				className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-6 py-3 rounded"
			>
				{isLoading ? "Loading..." : "Get Started"}
			</button>
		</div>
	);
};

export default GetStarted;
