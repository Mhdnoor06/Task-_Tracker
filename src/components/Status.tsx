import React from "react";
import {
  Select,
  MenuItem,
  Grid,
  Stack,
  FormControl,
  InputLabel,
  useMediaQuery,
  useTheme,
  Button,
  Toolbar,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";

import TaskForm from "./TaskForm";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { setSelectedStatus } from "../Redux/Features/tasks";

const Status = () => {
  // Options for filtering tasks
  const filterOptions = ["List", "InProgress", "Completed", "Overdue"];

  // Media query and theme setup
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down("md"));

  // State and dispatch setup from Redux
  const [open, setOpen] = React.useState(false);
  const status = useAppSelector((state) => state.tasks.selectedStatus);
  const dispatch = useAppDispatch();

  // Function to handle status change
  const handleStatusChange = (selectedOption: string) => {
    dispatch(setSelectedStatus(selectedOption));
  };

  // Close and open backdrop for task creation form
  const handleClose = () => {
    setOpen(false);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  // Render options as a dropdown for small devices
  const renderDropdown = () => (
    <FormControl fullWidth>
      <InputLabel id="filter-label">Filter</InputLabel>
      <Select
        labelId="filter-label"
        id="filter-select"
        value={status}
        label="Filter"
        onChange={(event) => handleStatusChange(event.target.value as string)}
      >
        {/* Mapping over filter options to generate dropdown items */}
        {filterOptions.map((option, index) => (
          <MenuItem key={index} value={option}>
            {option}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  // Render options as a column for larger devices
  const renderColumn = () => (
    <Stack direction="row" spacing={1}>
      {filterOptions.map((option, index) => (
        <MenuItem
          key={index}
          value={option}
          onClick={() => handleStatusChange(option)}
          sx={{
            textDecoration: status === option ? "underline" : "none",
            textDecorationColor:
              status === option ? theme.palette.primary.main : "inherit",
            textDecorationThickness: status === option ? "2px" : "auto",
            "&:hover": {
              textDecoration: "underline",
              textDecorationColor: theme.palette.primary.main,
              textDecorationThickness: "2px",
            },
          }}
        >
          {option}
        </MenuItem>
      ))}
    </Stack>
  );

  return (
    <>
      <Grid
        sx={{
          margin: "5px 0",
          padding: "10px",
          backgroundColor: "#f0f0f0",
        }}
      >
        <Grid item xs={12} lg={3} hidden={!isSmallScreen}>
          {renderDropdown()}
        </Grid>
        <Grid item xs={12} lg={9} hidden={isSmallScreen}>
          {renderColumn()}
        </Grid>
      </Grid>
      <Toolbar>
        <div>
          <Button onClick={handleOpen} variant="contained">
            Create Task
          </Button>

          <Backdrop
            sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
            open={open}
            onClick={handleClose}
          >
            <TaskForm setOpen={setOpen} />
          </Backdrop>
        </div>
      </Toolbar>
    </>
  );
};

export default Status;
