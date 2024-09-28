import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
	const response = await axiosInstance.get("/tasks");
	return response.data;
});

// Async thunk to complete a task
export const completeATask = createAsyncThunk("tasks/completeTask", async (taskId, { dispatch, rejectWithValue }) => {
	try {
		const response = await axiosInstance.post("/tasks/complete", { taskId });
		// Return the response data to handle it in the extraReducers
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

const taskSlice = createSlice({
	name: "task",
	initialState: {
		tasks: [],
		completedTasks: [],
		loading: false,
		error: null,
	},
	reducers: {},
	extraReducers: (builder) => {
		builder
			// Handle task fetching
			.addCase(fetchTasks.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(fetchTasks.fulfilled, (state, action) => {
				state.loading = false;
				state.tasks = action.payload.data;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload.message;
			})
			// Handle task completion
			.addCase(completeATask.fulfilled, (state, action) => {
				// Find the completed task using the returned data
				const completedTaskId = action.payload._id;
				state.completedTasks.push(action.payload);
				state.tasks = state.tasks.filter((task) => task._id !== completedTaskId);
			})
			.addCase(completeATask.rejected, (state, action) => {
				state.error = action.payload.message;
			});
	},
});

export default taskSlice.reducer;
