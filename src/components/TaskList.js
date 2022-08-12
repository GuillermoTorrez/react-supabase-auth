/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import TaskCard from "./TaskCard";
import Box from '@mui/material/Box';
import LinearProgress from '@mui/material/LinearProgress';

function TaskList({ done = false }) {
  const { tasks, getTasks, loading } = useTasks();

  useEffect(() => {
    getTasks(done);
  }, [done]);

  function renderTasks() {
    if (loading) {
      return (
        <Box sx={{ width: "100%" }}>
          <LinearProgress />
          <p style={{color: "gray"}}>Loading</p>
        </Box>
      );
    } else if (tasks.length === 0) {
      return <p><h2 style={{color: "gray"}}>No task Found</h2></p>;
    } else {
      return (
        <div>
          {tasks.map((task) => (
            <TaskCard task={task} key={task.id} />
          ))}
        </div>
      );
    }
  }

  return <div>{renderTasks()}</div>;
}

export default TaskList;
