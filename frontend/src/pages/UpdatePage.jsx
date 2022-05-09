import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import EmployerFinder from "../apis/EmployerFinder";
import { Container, Typography, TextField, Button, Stack } from "@mui/material";
import { makeStyles } from "@mui/styles";
const useStyles = makeStyles((theme) => ({
  container: {
    paddingTop: "100px",
  },
  title: {
    display: "flex",
    justifyContent: "center",
  },
  item: {
    paddingTop: "5px",
  },
  button: {
    marginTop: "5px",
    display: "flex",
    justifyContent: "center",
  },
}));
const UpdatePage = () => {
  const classes = useStyles();
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [birthDate, setBirthDate] = useState(new Date());
  const { id } = useParams();
  const navigate = useNavigate();
  useEffect(() => {
    const fetchData = async () => {
      const response = await EmployerFinder.get(`/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setFirstName(response.data.data.employer.first_name);
      setLastName(response.data.data.employer.last_name);
    };
    fetchData();
  }, [id]);
  const submitHandler = async (e) => {
    e.preventDefault();
    await EmployerFinder.put(
      `/${id}`,
      {
        first_name: firstName,
        last_name: lastName,
        date_of_birth: birthDate,
      },
      {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      }
    );

    navigate("/home");
  };
  return (
    <div>
      <Container className={classes.container}>
        <form className={classes.form} autoComplete="off">
          <div className={classes.title}>
            <Typography variant="h4" gutterBottom>
              Update Employer
            </Typography>
          </div>
          <div className={classes.item}>
            <TextField
              id="standard-basic"
              label="First Name"
              size="small"
              style={{ width: "100%" }}
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </div>
          <div className={classes.item}>
            <TextField
              id="standard-basic"
              label="Last Name"
              size="small"
              style={{ width: "100%" }}
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
                sx={{ width: 220 }}
                InputLabelProps={{
                  shrink: true,
                }}
                defaultValue={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
              />
            </Stack>
          </div>

          <div className={classes.button}>
            <Button type="submit" variant="contained" onClick={submitHandler}>
              Submit
            </Button>
          </div>
        </form>
      </Container>
    </div>
  );
};

export default UpdatePage;
