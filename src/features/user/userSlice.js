import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getprofile } from "../../api/user";

const initialState = {
	user: JSON.parse(localStorage.getItem("user")) || null,
	isError: false,
	isLoading: false,
	isSuccess: false,
};

// createUser async thunk
export const getMyProfile = createAsyncThunk("profile/createUser", async () => {
	const response = await getprofile();
	return response;
});

const authSlice = createSlice({
	name: "profile",
	initialState,
	reducers: {
		clearUser: (state) => {
			state.user = null;
			state.isError = false;
			state.isLoading = false;
			state.isSuccess = false;
			localStorage.removeItem("user");
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(createUser.pending, (state) => {
				state.isLoading = true;
			})
			.addCase(createUser.fulfilled, (state, action) => {
				state.isLoading = false;
				state.isSuccess = true;
				state.user = action.payload;
				localStorage.setItem("user", action.payload);
			})
			.addCase(createUser.rejected, (state) => {
				state.isLoading = false;
				state.isError = true;
			});
	},
});

export const { clearUser } = authSlice.actions;
export default authSlice.reducer;
