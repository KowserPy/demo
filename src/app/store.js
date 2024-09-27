import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import userReducer from "../features/user/userSlice";
import taskReducer from "../features/task/TaskSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		user: userReducer,
		task: taskReducer,
	},
});

export default store;
