import * as React from "react";
import Box from "@mui/material/Box";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import Avatar from "@mui/material/Avatar";

import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import MailIcon from "@mui/icons-material/Mail";
import MenuIcon from "@mui/icons-material/Menu";
import styles from "./styles.module.css";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import imgicon from "../../assets/usericon.png";

export default function SliderNav({ user, handleLogout }) {
  const [toggle, setToggle] = React.useState(false);

  const toggleDrawer = (open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setToggle(open);
  };
  const list = () => (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
      onKeyDown={toggleDrawer(false)}
      className={styles.slide}
    >
      <div className={styles.logo}>
        U!NOW
        <ArrowLeftIcon
          onClick={() => {
            toggleDrawer(false);
          }}
          sx={{ width: "50px", fontSize: 40, cursor: "pointer" }}
        />
      </div>
      <div className={styles.Links}>
        <Link to="/">
          <a type="button" className={styles.nav_btn}>
            Home
          </a>
        </Link>
        <Link to="/aboutus">
          <a type="button" className={styles.nav_btn}>
            AboutUs
          </a>
        </Link>
        <Link to="/contact">
          <a type="button" className={styles.nav_btn}>
            Contact Us
          </a>
        </Link>
        {!user ? (
          <React.Fragment>
            <Link to="/login">
              <button type="button" className={styles.nav_btn_special_light}>
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button type="button" className={styles.nav_btn_special_dark}>
                Sign up
              </button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
          
            {user.userType === "Admin" ? (
              <Link to="/admin">
                <a type="button" className={styles.nav_btn}>
                  {/* {user.userType} */}
                  Profile
                </a>
              </Link>
            ) : (
              <Link to="/profile">
                <a type="button" className={styles.nav_btn}>
                  {/* {user.userType} */}
                  Profile
                </a>
              </Link>
            )}
            <Link to="/">
              <a
                type="button"
                onClick={handleLogout}
                className={styles.nav_btn_special}
              >
                Logout
              </a>
            </Link>
          </React.Fragment>
        )}
      </div>
    </Box>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer(true)}>
      <MenuIcon className={styles.menuIcon} />
      
      </Button>
      
      <SwipeableDrawer
        open={toggle}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
      <div className={styles.logo}>
            <Link to="/" >
            <img src="/images/home/logoblanc.png" alt=""   className={styles.logoimage}  />
              {/* <img
                style={{ marginTop: "20px", width: "160px" }}
                className={styles.LogoImg}
                src={imgLogo}
              />{" "} */}
            </Link>
            </div>

      {!user ? (
        <Link to="/login">
          <button type="button" className={styles.nav_btn_special_light}>
            Login
          </button>
        </Link>
      ) : (
        <Link to="/profile" style={{ display: "flex", alignItems: "center" }}>
          <img src="/svg/coins.svg" style={{ height: 30 }} alt="" />
          <strong variant="caption" component="div" color="text.secondary">
            330
          </strong>
          <a type="button" className={styles.nav_btn_profile}>
            <img src="/svg/bronze.svg" alt="bronze" style={{ height: 30 }} />
            {/* {user.userType} */}
            {user?.image ? (
              <Avatar
                alt="icon"
                src={`${process.env.REACT_APP_API}${user.image.filePath}`}
                sx={{ width: 30, height: 30 }}
              />
            ) : (
              <Avatar
                alt="icon"
                src={imgicon}
                // src={<CiUser size={10} />}
                sx={{ width: 30, height: 30 }}
              />
            )}
            {/* Welcome, {user.name} */}
          </a>
        </Link>
      )}
    </React.Fragment>
  );
}