import React, { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GlobalContext } from "../store/GlobalState";
import EmployerFinder from "../apis/EmployerFinder";
import { Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = () =>
  makeStyles({
    text: {
      paddingTop: "50px",
    },
  });

const EmployerDetailPage = () => {
  const classes = useStyles();
  const { id } = useParams();
  const { selectedEmployer, setSelectedEmployer } = useContext(GlobalContext);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await EmployerFinder.get(`/${id}`, {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        });
        setSelectedEmployer(response.data.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, [id, selectedEmployer, setSelectedEmployer]);
  return (
    <div>
      {selectedEmployer && (
        <>
          <Typography variant="h4" className={classes.text}>
            This is{" "}
            {selectedEmployer.employer.first_name +
              " " +
              selectedEmployer.employer.last_name +
              " and he is borned at " +
              selectedEmployer.employer.date_of_birth}
          </Typography>
        </>
      )}
    </div>
  );
};

export default EmployerDetailPage;
