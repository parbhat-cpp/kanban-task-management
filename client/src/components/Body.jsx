import {
  Box,
  Button,
  Dialog,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import Task from "./Task";
import DoingTask from "./DoingTask";
import DoneTask from "./DoneTask";
import CloseIcon from "@mui/icons-material/Close";
import axios from "axios";

const BoxContainer = {
  margin: "10px 15px",
  background: "#ececec",
  padding: "14px",
  borderRadius: "15px",
  height: {
    lg: "80vh",
    md: "80vh",
    sm: "auto",
    xs: "auto",
  },
  display: {
    lg: "flex",
    md: "flex",
    sm: "block",
    xs: "block",
  },
  justifyContent: "center",
  "& > div": {
    padding: "12px",
    margin: "5px 5px",
    borderRadius: "15px",
    flex: {
      lg: "0.4",
      md: "0.4",
      sm: "1",
      xs: "1",
    },
  },
};

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

function Body() {
  const [counter, setCounter] = useState(0);
  const [dataList, setDataList] = useState([]);
  const [open, setOpen] = useState(false);
  const [status, setStatus] = useState("");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    try {
      fetch(`https://kanban-task-server.onrender.com/get-data`)
        .then((res) => res.json())
        .then((data) => {
          if (data === null) {
            console.log("null data");
          }
          setCounter(data.length + 1);
          setDataList(data);
        })
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    if (done === true) {
      (async () => {
        await axios.post("https://kanban-task-server.onrender.com/upload-data", dataList, {
          headers: { "Content-Type": "application/json" },
        });
      })();
    }
    setDone(false);
  }, [dataList]);

  const addNewTask = (status) => {
    setOpen(true);
    setStatus(status);
  };

  const onTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const onDescChange = (e) => {
    setDesc(e.target.value);
  };

  const onDoneClicked = async () => {
    setCounter(counter + 1);
    setDataList([
      ...dataList,
      {
        Id: counter,
        status: status,
        title: title,
        description: desc,
      },
    ]);
    setOpen(false);
    setDone(true);
  };

  return (
    <>
      <Box sx={BoxContainer}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "#83f0cc",
            "&>button": {
              border: "none",
              background: "blue",
              padding: "7px",
              borderRadius: 2,
            },
          }}
        >
          <Typography
            variant="h5"
            style={{ fontWeight: 500, background: "#83f0cc" }}
          >
            To Do
          </Typography>
          <hr />
          <Box
            sx={{
              flex: "1",
              background: "#83f0cc",
              padding: "5px",
              overflowY: "inherit",
              overflow: "scroll",
            }}
          >
            {dataList &&
              dataList.map((e) =>
                e.status === "TODO" ? (
                  <Task
                    key={e.Id}
                    count={e.Id}
                    status={e.status}
                    title={e.title}
                    desc={e.description}
                  />
                ) : (
                  ""
                )
              )}
          </Box>
          <button onClick={() => addNewTask("TODO")} style={{ color: "#fff" }}>
            Add
          </button>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            background: "#858e9b",
            "&>button": {
              border: "none",
              background: "blue",
              padding: "7px",
              borderRadius: 2,
            },
          }}
        >
          <Typography
            variant="h5"
            style={{ fontWeight: 500, background: "#858e9b" }}
          >
            Doing
          </Typography>
          <hr />
          <Box
            sx={{
              flex: "1",
              background: "#858e9b",
              padding: "5px",
              overflowY: "inherit",
              overflow: "scroll",
            }}
          >
            {dataList &&
              dataList.map((e) =>
                e.status === "DOING" ? (
                  <DoingTask
                    key={e.Id}
                    count={e.Id}
                    status={e.status}
                    title={e.title}
                    desc={e.description}
                  />
                ) : (
                  ""
                )
              )}
          </Box>
          <button onClick={() => addNewTask("DOING")} style={{ color: "#fff" }}>
            Add
          </button>
        </Box>
        <Box
          sx={{
            background: "#cc84ec",
            display: "flex",
            flexDirection: "column",
            "&>button": {
              border: "none",
              background: "blue",
              padding: "7px",
              borderRadius: 2,
            },
          }}
        >
          <Typography
            variant="h5"
            style={{ fontWeight: 500, background: "#cc84ec" }}
          >
            Done
          </Typography>
          <hr />
          <Box
            sx={{
              flex: "1",
              background: "#cc84ec",
              padding: "5px",
              overflowY: "inherit",
              overflow: "scroll",
            }}
          >
            {dataList &&
              dataList.map((e) =>
                e.status === "DONE" ? (
                  <DoneTask
                    key={e.Id}
                    count={e.Id}
                    status={e.status}
                    title={e.title}
                    desc={e.description}
                  />
                ) : (
                  ""
                )
              )}
          </Box>
          <button
            onClick={() => addNewTask("DONE")}
            style={{
              color: "#fff",
            }}
          >
            Add
          </button>
        </Box>
      </Box>
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        PaperProps={{
          sx: { ...DialogStyle, height: "auto" },
        }}
      >
        <Box style={{ background: "#f4f4f4" }}>
          <IconButton style={{ display: "flex", float: "right" }}>
            <CloseIcon onClick={() => setOpen(false)} />
          </IconButton>
        </Box>
        <TextField
          className="task-title"
          id="outlined-basic"
          label="Task Title"
          variant="outlined"
          onChange={(e) => onTitleChange(e)}
          style={{ margin: 10 }}
        />
        <TextField
          className="task-desc"
          id="outlined-basic"
          label="Task Description"
          variant="outlined"
          onChange={(e) => onDescChange(e)}
          style={{ margin: 10 }}
        />
        <Button
          onClick={() => onDoneClicked()}
          style={{
            border: "none",
            background: "blue",
            padding: "7px",
            borderRadius: 2,
            color: "#fff",
          }}
        >
          Done
        </Button>
      </Dialog>
    </>
  );
}

export default Body;
