import React, { useState } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Backdrop, IconButton, Toolbar } from "@mui/material";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import Typography from "@mui/material/Typography";
import EditNoteIcon from "@mui/icons-material/EditNote";
import { Stack } from "@mui/material";
import PlayArrowRoundedIcon from "@mui/icons-material/PlayArrowRounded";
import CheckIcon from "@mui/icons-material/Check";
import PauseIcon from "@mui/icons-material/Pause";

import { useAppDispatch, useAppSelector } from "../Redux/store";
import { startTask, deleteTask, completedTask } from "../Redux/Features/tasks";

import TaskForm from "./TaskForm";

export default function TaskCard() {
  const [editTaskId, setEditTaskId] = useState<number | null>(null);
  const [open, setOpen] = useState(false);

  // Functions to open and close the TaskForm backdrop

  const EditForm = (taskId: number) => {
    setEditTaskId(taskId);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  // Retrieve tasks and selected status from Redux store
  const tasks = useAppSelector((state) => state.tasks.tasks);
  const selectedStatus = useAppSelector((state) => state.tasks.selectedStatus);
  const dispatch = useAppDispatch();

  const today = new Date();

  // Function to set the time to end of day
  const setEndOfDay = (date: Date | null) => {
    if (!date) {
      return null;
    }
    return new Date(date.setHours(23, 59, 59, 999));
  };

  // Filter tasks based on selected status and due date
  const filteredTasks = tasks.filter((task) => {
    const taskDueDate = setEndOfDay(
      task.dueDate ? new Date(task.dueDate) : null
    );

    if (selectedStatus === "All") {
      return task;
    } else if (selectedStatus === "InProgress") {
      return (
        task.status === "Started" && (!taskDueDate || taskDueDate >= today)
      );
    } else if (selectedStatus === "Completed") {
      return task.status === "Completed";
    } else {
      return !taskDueDate || taskDueDate <= today;
    }
  });

  // Functions to handle task operations
  const handleStartTask = (taskId: number) => {
    dispatch(startTask(taskId));
  };
  const handleCompletedTask = (taskId: number) => {
    dispatch(completedTask(taskId));
  };
  const handleDeleteTask = (taskId: number) => {
    dispatch(deleteTask(taskId));
  };

  return (
    <Toolbar>
      <Box
        sx={{
          flexGrow: "1",
          display: "flex",
          marginTop: "10px",
        }}
      >
        <Grid
          container
          spacing={{ xs: 2, md: 3 }}
          columns={{ xs: 4, sm: 8, md: 12 }}
          justifyContent={"center"}
        >
          {filteredTasks.map((task, index) => (
            <Grid item xs={3} sm={4} md={3} key={index}>
              <Card
                sx={{
                  maxWidth: 345,
                  boxShadow: "1px 3px 6px #00000029",
                  transition: "box-shadow 0.3s ease-in-out",
                  "&:hover": {
                    boxShadow: "0px 10px 12px #00000029",
                  },
                }}
              >
                <CardContent>
                  <Stack spacing={2}>
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        width: "100%",
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="h5"
                        m={0}
                        sx={{ textAlign: "start" }}
                      >
                        {task.name}
                        <Typography
                          variant="body2"
                          color="text.secondary"
                          sx={{ textAlign: "justify" }}
                        >
                          Due Date:{" "}
                          {task.dueDate
                            ? new Date(task.dueDate).toLocaleDateString(
                                "en-GB",
                                {
                                  day: "2-digit",
                                  month: "2-digit",
                                  year: "2-digit",
                                }
                              )
                            : "No due date"}
                        </Typography>
                      </Typography>

                      <IconButton onClick={() => handleCompletedTask(task.id)}>
                        <CheckIcon />
                      </IconButton>
                    </Box>

                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{ textAlign: "justify" }}
                    >
                      {task.description}
                    </Typography>

                    <Typography
                      variant="body2"
                      m={0}
                      color="text.secondary"
                      sx={{ textAlign: "start" }}
                    >
                      {task.status}
                    </Typography>
                  </Stack>

                  <Stack
                    direction="row"
                    spacing={2}
                    justifyContent="center"
                    pt={2}
                  >
                    <IconButton onClick={() => handleStartTask(task.id)}>
                      {task.status === "Started" ? (
                        <PauseIcon />
                      ) : (
                        <PlayArrowRoundedIcon />
                      )}
                    </IconButton>

                    <IconButton onClick={() => EditForm(task.id)}>
                      <EditNoteIcon />
                    </IconButton>

                    <IconButton onClick={() => handleDeleteTask(task.id)}>
                      <DeleteForeverIcon fontSize="small" />
                    </IconButton>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
          ``
        </Grid>
      </Box>

      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={open}
        onClick={handleClose}
      >
        <TaskForm
          setOpen={setOpen}
          task={tasks.find((task) => task.id === editTaskId)}
        />
      </Backdrop>
    </Toolbar>
  );
}
