import axiosInstance from "./axiosInstance";

export const getprofile = async () => {
	const response = await axiosInstance.get("/auth/my-profile");
	return response.data;
};
