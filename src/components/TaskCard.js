import React from "react";
import { useTasks } from "../context/TaskContext";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import DeleteIcon from '@mui/icons-material/Delete';

function TaskCard({ task }) {
  const { deleteTask, updateTask } = useTasks();

  const handleDelete = () => {
    deleteTask(task.id);
  };

  const handleToggleDone = () => {
    updateTask(task.id, { done: !task.done });
  };

  return (
    <div>
      <Box component="span" sx={{ p: 0.4, border: "0.7px", mt:1, textcolor: "black"  }}>
      <Card sx={{ minWidth: 40, backgroundColor: "lightgrey"}}>
        <CardContent>
          <Typography sx={{ fontSize: 16}} color="white" gutterBottom>
            {task.id}.{task.name}
            <br/>
            {task.done ? "State:Done 👍 !Great Job!" : "State: Uncompleted 👷 we are working on that task"}
          </Typography>
  
          <Box component="span" sx={{ p: 0.4, border: "0.4px" }}>
            <Button
              onClick={() => handleDelete()}
              endIcon={<DeleteIcon/>}
              variant="contained"
              color="error"
            >
              Delete
            </Button>
          </Box>
          <Box component="span" sx={{ p: 0.5, border: "0.5px" }}>
            <Button
              onClick={() => handleToggleDone()}
              variant="contained"
              color="success"
            >
              Done
            </Button>
          </Box>
        </CardContent>
      </Card>
      </Box>
    </div>
  );
}

export default TaskCard;
