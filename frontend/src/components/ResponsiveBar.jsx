import React, { useContext } from "react";
import { makeStyles } from "@mui/styles";
import {
  AppBar,
  Toolbar,
  CssBaseline,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { Link } from "react-router-dom";
import DrawerComponent from "./Drawer";
import { GlobalContext } from "../store/GlobalState";

const useStyles = makeStyles(() => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  navlinks: {
    marginLeft: "10px",
    display: "flex",
    justfyContent: "center",
  },
  logo: {
    flexGrow: "1",
    cursor: "pointer",
  },
  link: {
    textDecoration: "none",
    color: "white",
    fontSize: "20px",
    marginLeft: "40px",
    "&:hover": {
      color: "yellow",
      textDecoration: "none",
    },
  },
}));
const ResponsiveBar = () => {
  const classes = useStyles();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));
  const ctx = useContext(GlobalContext);

  return (
    <AppBar position="relative">
      <CssBaseline />
      <Toolbar className={classes.toolbar}>
        <Typography variant="h4" className={classes.logo}>
          Navbar
        </Typography>
        {isMobile ? (
          <DrawerComponent />
        ) : (
          <div className={classes.navlinks}>
            <Link to="/home" className={classes.link}>
              Home
            </Link>
            {!ctx.isLoggedIn && (
              <Link to="/" className={classes.link}>
                Login
              </Link>
            )}
            <Link to="/register" className={classes.link}>
              Register
            </Link>
            {ctx.isLoggedIn && (
              <Link to="/settings" className={classes.link}>
                Settings
              </Link>
            )}
            {ctx.isLoggedIn && (
              <Link onClick={ctx.onLogout} to="/" className={classes.link}>
                Logout
              </Link>
            )}
          </div>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default ResponsiveBar;
