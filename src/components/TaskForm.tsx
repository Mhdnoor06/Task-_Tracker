import React, { useEffect, useState } from "react";
import {
  Grid,
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
} from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { Task, editTask, addTask } from "../Redux/Features/tasks";
import { useAppDispatch } from "../Redux/store";
import dayjs from "dayjs";

interface TaskFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  task?: Task | undefined;
}

const TaskForm: React.FC<TaskFormProps> = ({ setOpen, task }) => {
  const [taskName, setTaskName] = useState("");
  const [description, setDescription] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(new Date());

  useEffect(() => {
    // Populate form fields if task is provided (for editing)
    if (task) {
      setTaskName(task.name);
      setDescription(task.description);
      // setDueDate() // Set due date if necessary
    }
  }, [task]);

  const dispatch = useAppDispatch();

  const handleAddTask = () => {
    // Create a new task and dispatch to add to Redux store
    const newTask: Task = {
      id: Math.floor(Math.random() * 1000),
      name: taskName,
      dueDate: dueDate ? dueDate.toISOString() : null,
      description,
      status: "Not Started",
    };

    dispatch(addTask(newTask));
    setOpen(false);
  };

  const handleEditTask = () => {
    // Edit existing task and dispatch to update in Redux store
    if (!task) {
      return;
    }

    dispatch(
      editTask({
        id: task.id,
        name: taskName,
        dueDate: dueDate ? dueDate.toISOString() : null,
        description: description,
        status: "Not Started",
      })
    );
    setOpen(false);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    // Determine if adding a new task or editing an existing one
    if (task) {
      handleEditTask();
    } else {
      handleAddTask();
    }
    // Reset form fields after submission
    setTaskName("");
    setDescription("");
    setDueDate(new Date());
  };

  const handleFieldClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.stopPropagation(); // Prevent closing the backdrop on click
  };

  return (
    <div className="App">
      <Grid onClick={handleFieldClick}>
        <Card style={{ maxWidth: 450, padding: "20px 5px", margin: "0 auto" }}>
          <CardContent>
            <Typography gutterBottom variant="h5">
              New Task
            </Typography>

            <form onSubmit={handleSubmit}>
              <Grid container spacing={1}>
                <Grid xs={12} item>
                  <TextField
                    value={taskName}
                    onChange={(e) => setTaskName(e.target.value)}
                    placeholder="Enter task name"
                    label="Task Name"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>

                <Grid xs={12} item>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker
                      label="Due Date"
                      value={dayjs(dueDate)}
                      onChange={(newValue) =>
                        setDueDate(newValue ? newValue.toDate() : null)
                      }
                      slotProps={{
                        textField: { size: "small", margin: "dense" },
                      }}
                    />
                  </LocalizationProvider>
                </Grid>

                <Grid item xs={12}>
                  <TextField
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    label="Description"
                    multiline
                    rows={4}
                    placeholder="Type here"
                    variant="outlined"
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                  >
                    Submit
                  </Button>
                </Grid>
              </Grid>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </div>
  );
};

export default TaskForm;
