import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { fetchTasksFromApi, completeTaskApi } from "../../api/tasksApi";

// Thunk to fetch tasks
export const fetchTasks = createAsyncThunk("tasks/fetchTasks", async () => {
	const tasks = await fetchTasksFromApi();
	return tasks;
});

// Thunk to complete a task
export const completeTask = createAsyncThunk("tasks/completeTask", async (taskId, { rejectWithValue }) => {
	try {
		const response = await completeTaskApi(taskId);
		return response.data;
	} catch (error) {
		return rejectWithValue(error.response.data);
	}
});

const taskSlice = createSlice({
	name: "tasks",
	initialState: {
		incompleteTasks: [],
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
				state.incompleteTasks = action.payload.data;
			})
			.addCase(fetchTasks.rejected, (state, action) => {
				state.loading = false;
				state.error = action.error.message;
			})
			// Handle task completion
			.addCase(completeTask.pending, (state) => {
				state.loading = true;
				state.error = null;
			})
			.addCase(completeTask.fulfilled, (state, action) => {
				state.loading = false;
				// Optionally remove completed task from the list
				state.incompleteTasks = state.incompleteTasks.filter((task) => task._id !== action.meta.arg);
			})
			.addCase(completeTask.rejected, (state, action) => {
				state.loading = false;
				state.error = action.payload || "Failed to complete task";
			});
	},
});

export default taskSlice.reducer;
