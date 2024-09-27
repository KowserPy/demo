import axiosInstance from "./axiosInstance";

// login/creatUser
export const loginUser = async (initData) => {
	const response = await axiosInstance.post("/auth/createUser", { initData });
	return response.data;
};
