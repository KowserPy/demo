import React from "react";

const demoData = Array.from({ length: 20 }, (_, index) => ({
	id: index + 1,
	initials: [
		"KH",
		"JS",
		"AL",
		"RB",
		"MP",
		"LC",
		"ND",
		"SR",
		"TG",
		"UW",
		"XV",
		"YB",
		"ZW",
		"AO",
		"CB",
		"DQ",
		"ER",
		"FT",
		"GJ",
		"HK",
	][index % 20],
	username: `User${index + 1}`,
	points: `${7800 - index * 10} WOOF`,
	rank: index + 1,
}));

const LeaderBoard = () => {
	return (
		<div className="bg-gradient-to-r from-cyan-500 to-blue-500 flex flex-col items-center p-5 h-[calc(100vh-4rem)] hide-scrollbar overflow-y-scroll space-y-6 pb-20 relative">
			<div className=" bg-gradient-to-r from-violet-200 to-pink-200 max-w-md w-full mx-auto shadow-lg rounded-lg">
				<div className="flex flex-col items-center py-10 text-center ">
					<h3 className="font-bold text-gray-800 text-3xl py-2">WOOF DASH HALL OF FAME</h3>
				</div>
				<div className=" p-5 rounded-md flex items-center justify-between mb-5 max-w-md w-full mx-auto">
					<div className="flex items-center gap-3">
						<div className="w-12 h-12 bg-green-600 flex justify-center items-center rounded-full text-white">
							<span className="font-bold text-xl">KH</span>
						</div>
						<div className="flex flex-col">
							<span className="font-bold text-lg text-gray-800">Kowserpy</span>
							<span className="text-sm text-gray-600">7809 WOOF</span>
						</div>
					</div>
					<div className="text-gray-700">
						<span className=" font-semibold">#615588</span>
					</div>
				</div>
			</div>

			{/* Heading */}
			<div className="flex items-center justify-between max-w-md w-full mx-auto pt-10">
				<span className="font-bold text-lg text-gray-800">34,362,786 holders</span>
				<span className="text-gray-800 font-semibold text-lg">(Top 20)</span>
			</div>
			{/* Leaderboard Entries */}
			<div className="space-y-2 max-w-md w-full mx-auto">
				{demoData.map((entry) => (
					<div
						key={entry.id}
						className="bg-gradient-to-r from-blue-200 to-cyan-200 border border-gray-300 rounded-lg shadow-md p-4 flex justify-between items-center"
					>
						<div className="flex items-center gap-4">
							<div className="w-12 h-12 bg-blue-500 text-white flex items-center justify-center rounded-full text-xl font-bold">
								{entry.initials}
							</div>
							<div className="flex flex-col">
								<span className="font-bold text-xl text-gray-800">{entry.username}</span>
								<span className=" font-semibold  text-[14px] text-gray-600">{entry.points}</span>
							</div>
						</div>
						<div className="text-gray-700 font-semibold text-xl">{entry.rank}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default LeaderBoard;
