import { configureStore } from "@reduxjs/toolkit";
import { Task, TaskSlice } from "./Features/tasks";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

// Load tasks from local storage on store initialization
const loadTasksFromLocalStorage = (): Task[] => {
  const tasksFromLocalStorage = localStorage.getItem("tasks");
  if (tasksFromLocalStorage) {
    return JSON.parse(tasksFromLocalStorage) as Task[];
  }
  return [];
};

// Create Redux store using configureStore from Redux Toolkit
export const store = configureStore({
  reducer: {
    tasks: TaskSlice.reducer,
  },
  preloadedState: {
    tasks: {
      tasks: loadTasksFromLocalStorage(), // Load tasks from local storage
      selectedStatus: "All",
    },
  },
});

// Save tasks to local storage whenever the store updates
store.subscribe(() => {
  const state = store.getState();
  localStorage.setItem("tasks", JSON.stringify(state.tasks.tasks));
});

// Define the type for the entire Redux store state
export type RootState = ReturnType<typeof store.getState>;

// Typed hooks for dispatching actions and accessing the Redux store state
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
