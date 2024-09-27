import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/authSlice";
import taskReducer from "../features/task/TaskSlice";

const store = configureStore({
	reducer: {
		auth: authReducer,
		tasks: taskReducer,
	},
});

export default store;
