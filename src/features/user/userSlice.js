// src/store/userSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Async thunk to fetch the user profile
export const fetchUserProfile = createAsyncThunk("user/fetchProfile", async () => {
	const response = await axiosInstance.get("/auth/me"); // Assuming you have an endpoint for user profile
	return response.data; // Return the user profile data
});

// Async thunk to fetch friends
export const fetchFriends = createAsyncThunk("user/fetchFriends", async () => {
	const response = await axiosInstance.get("/user/friends"); // Assuming you have an endpoint for fetching friends
	return response.data; // Return the friends data
});

const userSlice = createSlice({
	name: "user",
	initialState: {
		profile: null, // Stores the user profile information
		friends: [], // Stores the user's friends
		loading: false, // Indicates whether the profile or friends are being fetched
		error: null, // Stores any error messages during the fetch
	},
	reducers: {
		clearProfile: (state) => {
			state.profile = null; // Action to clear the user profile, useful on logout
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(fetchUserProfile.pending, (state) => {
				state.loading = true;
				state.error = null; // Reset error state when starting a new request
			})
			.addCase(fetchUserProfile.fulfilled, (state, action) => {
				state.loading = false;
				state.profile = action.payload.user; // Store the fetched profile data
			})
			.addCase(fetchUserProfile.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message; // Store any error that occurred
			})
			.addCase(fetchFriends.pending, (state) => {
				state.loading = true;
				state.error = null; // Reset error state when starting a new request
			})
			.addCase(fetchFriends.fulfilled, (state, action) => {
				state.loading = false;
				state.friends = action.payload; // Store the fetched friends data
			})
			.addCase(fetchFriends.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message; // Store any error that occurred
			});
	},
});

export const { clearProfile } = userSlice.actions;

export default userSlice.reducer;
