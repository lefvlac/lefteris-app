import React, { useState } from "react";
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
    marginTop: "5px",
  },
}));
const Register = () => {
  const classes = useStyles();
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [userPassword, setUserPassword] = useState("");
  const navigate = useNavigate();
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      await UserFinder.post("/register", {
        name: userName,
        email: userEmail,
        password: userPassword,
      });
    } catch (err) {
      console.log(err);
    }
    navigate("/");
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
            Sign Up to App
          </Typography>
        </div>
        <div className={classes.item}>
          <TextField
            id="standard-basic"
            label="Userame"
            size="small"
            style={{ width: "100%" }}
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
          />
        </div>
        <div className={classes.item}>
          <TextField
            id="standard-basic"
            label="Email"
            size="small"
            style={{ width: "100%" }}
            value={userEmail}
            onChange={(e) => {
              setUserEmail(e.target.value);
            }}
          />
        </div>
        <div className={classes.item}>
          <TextField
            id="outlined-password-input"
            label="Password"
            type="password"
            autoComplete="current-password"
            value={userPassword}
            onChange={(e) => setUserPassword(e.target.value)}
          />
        </div>

        <div className={classes.button}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
        <div className={classes.text}>
          <Typography variant="h6" paragraph={true} gutterBottom>
            If you have already account <Link to="/login"> Login here</Link>
          </Typography>
        </div>
      </form>
    </Container>
  );
};

export default Register;
