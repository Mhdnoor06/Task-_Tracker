import { PayloadAction, createSlice } from "@reduxjs/toolkit";

// Define the structure of a task
export interface Task {
  id: number;
  name: string;
  dueDate: string | null;
  description: string;
  status: string;
}

// Define the structure of the state
interface TaskState {
  tasks: Task[]; // List of tasks
  selectedStatus: string; // Status selected by the user for filtering tasks
}

// Initial state for the tasks slice
const initialState: TaskState = {
  tasks: [],
  selectedStatus: "All",
};

// Create a slice for managing tasks state using Redux Toolkit
export const TaskSlice = createSlice({
  name: "tasks",
  initialState,
  reducers: {
    // Reducer function to add a new task to the list
    addTask: (state, action: PayloadAction<Task>) => {
      state.tasks = [...state.tasks, action.payload];
    },
    // Reducer function to update the status of a task to "Started"
    startTask: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId
          ? {
              ...task,
              status: task.status === "Started" ? "Not Started" : "Started",
            }
          : task
      );
    },
    // Reducer function to update the status of a task to "Completed"
    completedTask: (state, action: PayloadAction<number>) => {
      const taskId = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === taskId ? { ...task, status: "Completed" } : task
      );
    },
    // Reducer function to edit a task's details
    editTask: (
      state,
      action: PayloadAction<{
        id: number;
        name?: string;
        dueDate: string | null;
        description?: string;
        status?: string;
      }>
    ) => {
      const { id, name, dueDate, description, status } = action.payload;
      state.tasks = state.tasks.map((task) =>
        task.id === id
          ? {
              ...task,
              name: name ?? task.name,
              dueDate: dueDate ?? task.dueDate,
              description: description ?? task.description,
              status: status ?? task.status,
            }
          : task
      );
    },
    // Reducer function to delete a task from the list
    deleteTask: (state, action: PayloadAction<number>) => {
      state.tasks = state.tasks.filter((task) => task.id !== action.payload);
    },
    // Reducer function to set the selected status for filtering tasks
    setSelectedStatus: (state, action: PayloadAction<string>) => {
      state.selectedStatus = action.payload;
    },
  },
});

// Extract action creators and reducer from the slice
export const {
  addTask,
  startTask,
  completedTask,
  editTask,
  deleteTask,
  setSelectedStatus,
} = TaskSlice.actions;

export default TaskSlice.reducer;
