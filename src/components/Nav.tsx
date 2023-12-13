import { AppBar, Toolbar, Typography, Stack } from "@mui/material";

const Nav = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">Task Tracker</Typography>
        </Stack>
        <div style={{ flexGrow: 1 }} />
      </Toolbar>
    </AppBar>
  );
};

export default Nav;
