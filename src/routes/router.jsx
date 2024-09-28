import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Task from "../pages/Task";
import LeaderBoard from "../pages/LeaderBoard";
import Friends from "../pages/Friends";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import App from "../App";
import GetStarted from "../components/GetStarted";

const router = createBrowserRouter([
	{
		path: "/",
		element: <App />,
		children: [
			{
				path: "/",
				element: <Home />,
			},
			{
				path: "/tasks",
				element: <Task />,
			},
			{
				path: "/leaderboards",
				element: <LeaderBoard />,
			},
			{
				path: "/friends",
				element: <Friends />,
			},
			{
				path: "/get",
				element: <GetStarted />,
			},
		],
	},
	{
		path: "/startapp",
		element: <Login />,
	},
	{ path: "*", element: <NotFound /> },
]);

export default router;
