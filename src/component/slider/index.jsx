import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import MenuIcon from "@mui/icons-material/Menu";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import SwipeableDrawer from "@mui/material/SwipeableDrawer";
import * as React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

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
        SkilzIt
        <ArrowLeftIcon
          onClick={() => {
            toggleDrawer(false);
          }}
          sx={{ width: "50px", fontSize: 40, cursor: "pointer" }}
        />
      </div>
      <div className={styles.Links}>
        <Link to="/">
          <button type="button" className={styles.nav_btn}>
            Home
          </button>
        </Link>
        <Link to="/aboutus">
          <button type="button" className={styles.nav_btn}>
            AboutUs
          </button>
        </Link>
        {!user ? (
          <React.Fragment>
            <Link to="/login">
              <button type="button" className={styles.nav_btn}>
                Login
              </button>
            </Link>
            <Link to="/signup">
              <button type="button" className={styles.nav_btn_special}>
                SignUp
              </button>
            </Link>
          </React.Fragment>
        ) : (
          <React.Fragment>
            {user.userType === "Admin" ? (
              <Link to="/admin">
                <button type="button" className={styles.nav_btn}>
                  {/* {user.userType} */}
                  Profile
                </button>
              </Link>
            ) : (
              <Link to="/profile">
                <button type="button" className={styles.nav_btn}>
                  {/* {user.userType} */}
                  Profile
                </button>
              </Link>
            )}
            <Link to="/">
              <button
                type="button"
                onClick={handleLogout}
                className={styles.nav_btn_special}
              >
                Logout
              </button>
            </Link>
          </React.Fragment>
        )}
      </div>
    </Box>
  );

  return (
    <React.Fragment>
      <Button onClick={toggleDrawer(true)}>
        <MenuIcon sx={{ color: "#1C4B82" }} />
      </Button>
      <SwipeableDrawer
        open={toggle}
        onClose={toggleDrawer(false)}
        onOpen={toggleDrawer(true)}
      >
        {list()}
      </SwipeableDrawer>
    </React.Fragment>
  );
}
