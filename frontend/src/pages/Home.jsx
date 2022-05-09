import React, { useContext, useEffect, useCallback } from "react";
import EmployerFinder from "../apis/EmployerFinder";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import { GlobalContext } from "../store/GlobalState";
import { makeStyles } from "@mui/styles";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";
import AddEmployer from "../components/AddEmployer";
import Login from "./Login";
const useStyles = makeStyles({
  title: {
    alignItems: "center",
  },
});
const Home = () => {
  const ctx = useContext(GlobalContext);
  const classes = useStyles();
  const { employers, setEmployers } = useContext(GlobalContext);
  const navigate = useNavigate();
  const fetchData = useCallback(async () => {
    const response = await EmployerFinder.get("/", {
      headers: {
        "x-access-token": localStorage.getItem("token"),
      },
    });
    setEmployers(response.data.data.employers);
  }, [setEmployers]);
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const user = jwt_decode(token);
      if (!user) {
        localStorage.removeItem("token");
        navigate("/login");
      } else {
        fetchData();
      }
    }
  }, [fetchData, navigate]);
  const handleDelete = async (e, id) => {
    e.stopPropagation();
    try {
      await EmployerFinder.delete(`/${id}`, {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      });
      setEmployers(
        employers.filter((employer) => {
          return employer.employer_id !== id;
        })
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleEdit = (e, id) => {
    e.stopPropagation();
    navigate(`/employer/${id}/edit`);
  };
  const handleEmployerSelect = (id) => {
    navigate(`/employer/${id}`);
  };

  return (
    <>
      {!ctx.isLoggedIn && <Login />}
      {ctx.isLoggedIn && (
        <>
          <AddEmployer />
          <h3 className={classes.title}>List of Employers</h3>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} size="small">
              <TableHead>
                <TableRow>
                  <TableCell>Id</TableCell>
                  <TableCell>First Name</TableCell>
                  <TableCell>Last Name</TableCell>
                  <TableCell>Birthdate</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {employers &&
                  employers.map((employer) => (
                    <TableRow
                      key={employer.employer_id}
                      onClick={() => handleEmployerSelect(employer.employer_id)}
                    >
                      <TableCell component="th" scope="row">
                        {employer.employer_id}
                      </TableCell>
                      <TableCell align="left">{employer.first_name}</TableCell>
                      <TableCell align="left">{employer.last_name}</TableCell>
                      <TableCell align="left">
                        {employer.date_of_birth}
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          color="secondary"
                          onClick={(e) => handleEdit(e, employer.employer_id)}
                        >
                          Edit
                        </Button>
                      </TableCell>
                      <TableCell align="left">
                        <Button
                          variant="contained"
                          color="error"
                          onClick={(e) => handleDelete(e, employer.employer_id)}
                        >
                          Delete
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
};

export default Home;
