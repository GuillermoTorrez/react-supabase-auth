import { useState } from "react";
import { useTasks } from "../context/TaskContext";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import SendIcon from '@mui/icons-material/Send';

function TaskForm() {
  const [ taskName, setTaskName] = useState("");
  const { createTask, adding} = useTasks("", false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(taskName !== "" || taskName.length > 2) {
      createTask(taskName);
      setTaskName("");
    }  
  };

  return (
    <div>
      <Box component="div" sx={{ p: 1, m: 1 }}>
        <TextField
          fullWidth
          id="taskName"
          label="Task Name"
          placeholder="Write a new Task Name"
          value={taskName}
          onChange={(e) => setTaskName(e.target.value)}
        />
        <Box
          component="div"
          sx={{ mt: 1, border: "1px grey", float: "left" }}
        >
          <Button
            disable={adding}
            endIcon={<SendIcon/>}
            variant="contained"
            color="info"
            onClick={handleSubmit}
          >
            {adding ? "Adding...." : "Add"}
          </Button>
        </Box>
      </Box>
    </div>
  );
}

export default TaskForm;
