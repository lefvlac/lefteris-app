import React, { useState } from "react";
import { makeStyles } from "@mui/styles";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

import { Link } from "react-router-dom";

const DrawerComponent = () => {
  const [openDrawer, setOpenDrawer] = useState(false);
  const classes = makeStyles((theme) => ({
    link: {
      textDecoration: "none",
      color: "blue",
      fontSize: "20px",
    },
    icon: {
      color: "white",
    },
  }));
  return (
    <>
      <Drawer open={openDrawer} onClose={() => setOpenDrawer(false)}>
        <List>
          <ListItem onClick={() => setOpenDrawer(false)}>
            <ListItemText>
              <Link to="/" className={classes.link}>
                Home
              </Link>
            </ListItemText>
          </ListItem>
        </List>
      </Drawer>
      <IconButton onClick={() => setOpenDrawer(!openDrawer)}>
        <MenuIcon />
      </IconButton>
    </>
  );
};

export default DrawerComponent;
