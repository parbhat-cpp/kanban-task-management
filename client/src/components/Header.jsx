import { AppBar, Toolbar, Typography } from "@mui/material";

const StyledToolbar = {
  background: "#f4f4f4",
  "& > p": {
    fontWeight: 600,
    fontSize: {
      lg: 26,
      md: 26,
      sm: 24,
      xs: 16,
    },
    color: "#000",
    margin: "0 auto",
  },
};

function Header() {
  return (
    <>
      <AppBar position="static">
        <Toolbar sx={StyledToolbar}>
          <Typography>Kanban Board Task Management</Typography>
        </Toolbar>
      </AppBar>
    </>
  );
}

export default Header;
