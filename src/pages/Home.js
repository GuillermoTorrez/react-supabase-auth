import { useEffect } from "react";
import { useTasks } from "../context/TaskContext";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";
import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";

import AppBar from "@mui/material/AppBar";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";
import AccountCircle from '@mui/icons-material/AccountCircle';
import HomeRounded from '@mui/icons-material/HomeRounded';
import Tooltip from '@mui/material/Tooltip';

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

export default function Home() {
  const { showTaskDone, UpdateShowTaskDone } = useTasks();
  const navigate = useNavigate();
  const mycurrentUser = supabase.auth.user();
  let mycurrentEmail = ""
  if (mycurrentUser !== null) {
    mycurrentEmail = JSON.stringify(mycurrentUser.email)
  } else {
    mycurrentEmail = "Undefine"
  }  
  
  useEffect(() => {
    if (!supabase.auth.user()) {
      navigate("/login");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Box>
      <AppBar position="static">
        <Grid container spacing={1} maxWidth="xl">
          <Grid item xs={4}>
            <Typography
              variant="h6"
              noWrap
              component="a"
              href="/"
              sx={{
                display: "center",
                marginTop: "10px",
                marginLeft: 1,
                fontFamily: "monospace",
                fontWeight: 100,
                letterSpacing: ".1rem",
                color: "inherit",
                textDecoration: "none",
              }}
            >
              <HomeRounded/>
              <Grid item xs={4}>
              <div> Task Application</div>
              </Grid> 
            </Typography>
          </Grid>
          <Grid item xs={4}>
            <Tooltip title={mycurrentEmail}>
            <Button 
              endIcon={<AccountCircle/>}
              sx={{
                marginRight: 1,
                marginTop: 1,
                MarginBottom: 4,
                float: "Right",
                fontFamily: "monospace",
                fontWeight: 700,
                letterSpacing: ".2rem",
                backgroundColor: "inherit",
                color: "inherit",
                textDecoration: "none",
                border: "1px",
                borderRadius: "3px",
              }}
              onClick={() => supabase.auth.signOut()}
            >
              LOGOUT
            </Button>
            </Tooltip>
          </Grid>
        </Grid>
      </AppBar>

      <div>
        <Container
          maxWidth="sm"
          sx={{
            mt: 3,
            float: "center",
            fontFamily: "monospace",
            fontWeight: 500,
            letterSpacing: ".1rem",
            color: "white",
            border: "2px solid",
            backgroundColor: "white",
            borderRadius: "4px",
          }}
        >
          <TaskForm/>
          <div >
            <FormControlLabel
              control={
                <Switch
                  color="info"
                  checked={showTaskDone}
                  onChange={() => UpdateShowTaskDone(!showTaskDone)}/>}
                  label={
                    <Typography sx={{ fontSize: 14, color: "gray", fontFamily: "monospace"}}>
                      SHOW TASK DONE
                    </Typography>}
              value="showTaskDone"
              labelPlacement="end"
            />
          </div>  
          <TaskList done={showTaskDone} />
        </Container>
      </div>
    </Box>
  );
}
