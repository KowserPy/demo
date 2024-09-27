import axiosInstance from "./axiosInstance";

export const fetchTasksFromApi = async () => {
	const response = await axiosInstance.get("/tasks/incomplete-tasks");
	return response.data;
};

export const completeTaskApi = async (taskId) => {
	const response = await axiosInstance.post("/tasks/completed", { taskId });
	return response.data;
};
