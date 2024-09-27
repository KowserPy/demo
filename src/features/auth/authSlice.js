// src/store/authSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Async thunk for user login
export const createUser = createAsyncThunk("auth/login", async (loginData) => {
	const response = await axiosInstance.post("/auth/createUser", loginData);
	return response.data; // Assuming your backend returns token and user info
});

const authSlice = createSlice({
	name: "auth",
	initialState: {
		token: localStorage.getItem("token") || null,
		loading: false,
		error: null,
	},
	reducers: {
		clearAuth: (state) => {
			state.token = null;
			localStorage.removeItem("token");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(loginUser.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(loginUser.fulfilled, (state, action) => {
				state.loading = false;
				state.token = action.payload.token; // Store token
				localStorage.setItem("token", action.payload.token);
			})
			.addCase(loginUser.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			});
	},
});

export const { clearAuth } = authSlice.actions;

export default authSlice.reducer;
