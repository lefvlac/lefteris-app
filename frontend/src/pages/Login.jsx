import React, { useState, useContext } from "react";
import { GlobalContext } from "../store/GlobalState";
import { makeStyles } from "@mui/styles";
import { Container, Typography, TextField, Button } from "@mui/material";
import { useNavigate, Link } from "react-router-dom";
import UserFinder from "../apis/UserFinder";

const useStyles = makeStyles(() => ({
  container: {
    paddingTop: "100px",
  },
  title: {
    display: "flex",
    justifyContent: "center",
  },
  item: {
    paddingTop: "10px",
  },
  button: {
    marginTop: "10px",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    marginTop: "10px",
  },
}));
const Login = () => {
  const classes = useStyles();
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const ctx = useContext(GlobalContext);
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await UserFinder.post(
        "/login",
        {
          email: userEmail,
          password: userPassword,
        },
        {
          withCredentials: true,
        }
      );
      // console.log(response.data.accessToken);
      // console.log(ctx.token);
      ctx.onLogin(response.data.accessToken);
      // localStorage.setItem("token", response.data.accessToken);
    } catch (err) {
      console.log(err);
    }
    navigate("/home");
  };
  return (
    <Container className={classes.container}>
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <div className={classes.title}>
          <Typography variant="h4" gutterBottom>
            Login to App
          </Typography>
        </div>
        <div className={classes.item}>
          <TextField
            id="standard-basic"
            label="Email"
            size="small"
            style={{ width: "100%" }}
            value={userEmail}
            onChange={(e) => setUserEmail(e.target.value)}
          />
        </div>
        <div className={classes.item}>
          <TextField
            id="standard-basic"
            type="password"
            label="Password"
            size="small"
            style={{ width: "100%" }}
            value={userPassword}
            onChange={(e) => {
              setUserPassword(e.target.value);
            }}
          />
        </div>
        <div className={classes.button}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
        <div className={classes.text}>
          <Typography variant="h6" paragraph={true} gutterBottom>
            If you have no account <Link to="/register"> Register here</Link>
          </Typography>
        </div>
      </form>
    </Container>
  );
};

export default Login;
