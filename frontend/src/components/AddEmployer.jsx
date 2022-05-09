import React, { useState, useContext } from "react";
import { GlobalContext } from "../store/GlobalState";
import EmployerFinder from "../apis/EmployerFinder";
import { Container, Typography, TextField, Stack, Button } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  container: {
    marginTop: "100px",
  },
  title: {
    marginRight: "10px",
  },
  form: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    "@media (max-width: 900px)": {
      display: "flex",
      flexDirection: "column",
    },
  },
  input: {
    "@media (max-width: 900px)": {
      style: { width: "100%" },
    },
  },
  button: {
    marginLeft: "10px",
  },
}));

const AddEmployer = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const { addEmployer } = useContext(GlobalContext);
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      const response = await EmployerFinder.post("/", {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: birthDate,
      });
      console.log(response.data);
      addEmployer(response.data.data.employer);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Container className={classes.container}>
      <form
        className={classes.form}
        autoComplete="off"
        onSubmit={submitHandler}
      >
        <div className={classes.title}>
          <Typography variant="h6" gutterBottom>
            Add Employer
          </Typography>
        </div>
        <div className={classes.item}>
          <TextField
            className={classes.input}
            id="standard-basic"
            label="First Name"
            size="small"
            style={{ width: "50%" }}
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
        </div>
        <div className={classes.item}>
          <TextField
            id="standard-basic"
            label="Last Name"
            size="small"
            style={{ width: "50%" }}
            value={lastName}
            onChange={(e) => {
              setLastName(e.target.value);
            }}
          />
        </div>
        <div className={classes.item}>
          <Stack noValidate spacing={3}>
            <TextField
              id="date"
              label="Birthday"
              type="date"
              sx={{ width: 150, height: 50 }}
              InputLabelProps={{
                shrink: true,
              }}
              value={birthDate}
              onChange={(e) => setBirthDate(e.target.value)}
            />
          </Stack>
        </div>

        <div className={classes.button}>
          <Button type="submit" variant="contained">
            Submit
          </Button>
        </div>
      </form>
    </Container>
  );
};

export default AddEmployer;
