import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "../../api/axiosInstance";

// Thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
	const response = await axiosInstance.get("/tasks");
	console.log(response);
	return response.data;
});

// Async thunk to complete a task
export const completeATask = createAsyncThunk("tasks/completeTask", async (taskId, { rejectWithValue }) => {
	try {
		const response = await axiosInstance.post("/tasks/complete", { taskId });
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
				state.error = action.error.message;
			})

			// Complete a task
			.addCase(completeATask.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(completeATask.fulfilled, (state, action) => {
				state.loading = false;
				state.completedTasks.push(action.payload); // Add the completed task
			})
			.addCase(completeATask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload;
			});
	},
});

export default taskSlice.reducer;
