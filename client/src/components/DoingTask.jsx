import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Box,
  IconButton,
  Menu,
  MenuItem,
  Typography,
  Dialog,
  TextField,
  Button,
} from "@mui/material";
import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const DialogStyle = {
  height: "35%",
  width: {
    lg: "35%",
    md: "38%",
    sm: "80%",
    xs: "80%",
  },
  boxShadow: "none",
  borderRadius: "10px 10px 10px 10px",
};

function DoingTask({ status, count, title, desc }) {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const [openDialog, setOpenDialog] = useState(false);
  const [t, setT] = useState("");
  const [d, setD] = useState("");
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const onTodoClicked = async (id) => {
    await fetch(`http://localhost:5000/update-to-todo/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    handleClose();
  };

  const onDoneClicked = async (id) => {
    await fetch(`http://localhost:5000/update-to-done/${id}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
      })
      .catch((err) => console.log(err));
    handleClose();
  };

  const onUpdateClicked = () => {
    setOpenDialog(true);
  };

  const onUpdateSubmit = async (id) => {
    await axios.post(
      `http://localhost:5000/update-title-desc/${id}`,
      {
        title: t,
        desc: d,
      },
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    setOpenDialog(false);
  };

  const onTitleChange = (e) => {
    setT(e.target.value);
    console.log(t);
  };

  const onDescriptionChange = (e) => {
    setD(e.target.value);
    console.log(d);
  };

  const onDeleteClicked = async (id) => {
    await fetch(`http://localhost:5000/delete/${id}`)
      .then((res) => res.json())
      .then((data) => console.log(data))
      .catch((err) => console.log(err));
  };

  return (
    <Box
      id={`${count}`}
      sx={{
        display: "flex",
        padding: "10px",
        margin: "5px",
        "&:hover": {
          background: "#7a838e",
        },
        borderRadius: "15px",
      }}
    >
      <Box style={{ flex: 1 }}>
        <Typography variant="h5">{title}</Typography>
        <Typography>{desc}</Typography>
      </Box>
      <Box>
        <IconButton>
          <MoreHorizIcon onClick={(e) => handleClick(e)} />
        </IconButton>
        <Menu
          id="long-menu"
          MenuListProps={{
            "aria-labelledby": "long-button",
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            style: {
              width: "20ch",
            },
          }}
        >
          <MenuItem onClick={() => onTodoClicked(count)}>To Do</MenuItem>
          <MenuItem onClick={() => onDoneClicked(count)}>Done</MenuItem>
          <MenuItem onClick={() => onUpdateClicked()}>Update</MenuItem>
          <MenuItem onClick={() => onDeleteClicked(count)}>
            <Typography style={{ color: "red", fontWeight: 500 }}>
              Delete
            </Typography>
          </MenuItem>
        </Menu>
      </Box>
      <Dialog
        open={openDialog}
        onClose={() => setOpenDialog(false)}
        PaperProps={{
          sx: { ...DialogStyle, height: "auto" },
        }}
      >
        <Box style={{ background: "#f4f4f4" }}>
          <IconButton style={{ display: "flex", float: "right" }}>
            <CloseIcon onClick={() => setOpenDialog(false)} />
          </IconButton>
        </Box>
        <TextField
          className="task-title"
          id="outlined-basic"
          label="Update Title"
          variant="outlined"
          onChange={(e) => onTitleChange(e)}
          style={{ margin: 10 }}
        />
        <TextField
          className="task-desc"
          id="outlined-basic"
          label="Update Description"
          variant="outlined"
          onChange={(e) => onDescriptionChange(e)}
          style={{ margin: 10 }}
        />
        <Button
          onClick={() => onUpdateSubmit(count)}
          style={{ 
            border: "none",
            background: "blue",
            padding: "7px",
            borderRadius: 2,
            color: "#fff", }}
        >
          Done
        </Button>
      </Dialog>
    </Box>
  );
}

export default DoingTask;
