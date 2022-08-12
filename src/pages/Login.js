/* eslint-disable react-hooks/exhaustive-deps */
import * as React from "react";
import { useState, useEffect } from "react";
import { supabase } from "../supabase/client";
import { useNavigate } from "react-router-dom";

import Box from "@mui/material/Box";
import Input from "@mui/material/Input";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import AccountCircle from "@mui/icons-material/AccountCircle";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Avatar from "@mui/material/Avatar";

import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Login() {
  const [email, setEmail] = useState("");
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const paperStyle = {
    padding: 30,
    height: "45vh",
    width: 400,
    margin: "100px auto",
  };

  const vertical = 'bottom'
  const horizontal = 'center'
  const avatarStyle = { backgroundColor: "#00b8ff" };
  
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await supabase.auth.signIn({
        email,
      });

      setEmail("");
      setOpen(true);
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
  };

  useEffect(() => {
    if (!supabase.auth.user()) {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <Grid>
      <Paper elevation={11} style={paperStyle}>
        <Grid align="center">
          <Avatar style={avatarStyle}></Avatar>
          <h2>Sign In</h2>
        </Grid>
        <Box component="div" sx={{ p: 1, m: 3 }}>
          <form onSubmit={handleSubmit}>
            <FormControl fullWidth variant="standard">
              <InputLabel htmlFor="input-with-icon-adornment">
                Write your email address here
              </InputLabel>
              <Input
                id="input-with-icon-adornment"
                placeholder="youremail@site.com"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                startAdornment={
                  <InputAdornment position="start">
                    <AccountCircle />
                  </InputAdornment>
                }
              />
              <Button
                type="submit"
                variant="contained"
                color="primary"
                sx={{ p: 1, m: 4 }}
              >
                Send Email
              </Button>
            </FormControl>
          </form>
          
          <Stack spacing={2} sx={{ width: '100%' }}>
          <Snackbar open={open} autoHideDuration={5000} onClose={handleClose}
           anchorOrigin={{vertical, horizontal}}
          >
            <Alert
              onClose={handleClose}
              severity="success"
              sx={{ width: "100%" }}
            >
              Please check out your email and click on the link to SignUp!
            </Alert>
          </Snackbar>
          </Stack>
        </Box>
      </Paper>
    </Grid>
  );
}

export default Login;
