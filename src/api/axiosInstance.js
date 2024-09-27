import axios from "axios";
import store from "../app/store";
import { clearAuth } from "../features/auth/authSlice";

const axiosInstance = axios.create({
	baseURL: "http://localhost:8000/api/v1",
	// baseURL: "https://woofdash-backend.onrender.com/api/v1",
	withCredentials: true,
});

// Add a request interceptor
axiosInstance.interceptors.request.use(
	(config) => {
		const state = store.getState();
		const token = state.auth.token; // Get the token from the Redux store
		if (token) {
			config.headers.Authorization = `Bearer ${token}`; // Attach token to headers
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	}
);

// Add a response interceptor
axiosInstance.interceptors.response.use(
	(response) => {
		return response;
	},
	(error) => {
		const originalRequest = error.config;
		if (error.response.status === 401) {
			store.dispatch(clearAuth());
		}
		return Promise.reject(error);
	}
);

export default axiosInstance;
