import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import SliderNav from "./slider";
import styles from "./styles.module.css";
import img from "../assets/profileImgNoUp.svg";
import imgicon from "../assets/usericon.png";
import Avatar from "@mui/material/Avatar";
import { CiUser } from "react-icons/ci";
import { Typography } from "@mui/material";


const Nav = () => {
  const [WindowWidth, setWindowWidth] = useState(0);
  const handleWidthChange = () => {
    const currentWidth = window.innerWidth;
    setWindowWidth(currentWidth);
  };

  useEffect(() => {
    handleWidthChange();
    window.addEventListener("resize", handleWidthChange);
    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, []);
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    //console.log(WindowWidth)
    if (WindowWidth <= 800) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, []);
  useEffect(() => { 
    console.log(WindowWidth);
    if (WindowWidth <= 800) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [WindowWidth]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/login";
  };

  return (
    <React.Fragment>
      <nav className={styles.nav_container}>
        {!mobileView ? (
          <div className={styles.nav_web_container}>
            <Link to="/">
              <img
                src="/images/home/logoblanc.png"
                alt=""
                className={styles.logoimage}
               />

              {/* <img
                style={{ marginTop: "20px", width: "160px" }}
                className={styles.LogoImg}
                src={imgLogo}
              />{" "} */}
            </Link>
            <div className={styles.middle_nav}>
              <Link to="/">
                <a
                  type="button"
                  className={styles.nav_btn}
                  style={{ color: "white" }}
                >
                  Home
                </a>
                <p className={styles.underline}></p>
              </Link>
              <Link to="/about">
                <a type="button" className={styles.nav_btn}>
                  About
                </a>
              </Link>
              <Link to="/contact">
                <a type="button" className={styles.nav_btn}>
                  Contact
                </a>
              </Link>
              {/* <Link to="/blog">
                <a type="button" className={styles.nav_btn}>
                  Blog
                </a>
              </Link> */}
            </div>
            {!user ? (
              <div className={styles.end_nav}>
                <Link to="/login">
                  <button
                    type="button"
                    className={styles.nav_btn_special_light}
                  >
                    Login
                  </button>
                </Link>
                <Link to="/signup">
                  <button type="button" className={styles.nav_btn_special_dark}>
                    Sign up
                  </button>
                </Link>
                <div className={styles.language}>
                  <p>EN</p>
                </div>
              </div>
            ) : (
              <div className={styles.end_nav}>
                {user.userType === "Admin" ? (
                  <Link to="/admin">
                    <a type="button" className={styles.nav_btn_profile}>
                      {/* {user.userType} */}
                      Welcome, Admin
                    </a>
                  </Link>
                ) : (
                  <Link
                    to="/profile"
                    style={{ display: "flex", alignItems: "center" }}
                  >
                    <img src="/svg/coins.svg" style={{ height: 30 }} alt="" />
                    <strong
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      330
                    </strong>
                    <a type="button" className={styles.nav_btn_profile}>
                      <img
                        src="/svg/bronze.svg"
                        alt="bronze"
                        style={{ height: 30 }}
                      />
                      {/* {user.userType} */}
                      {user.image ? (
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
                      Welcome, {user.name}
                    </a>
                  </Link>
                )}
                <Link to="/">
                  <a
                    type="button"
                    onClick={handleLogout}
                    className={styles.nav_btn}
                  >
                    Logout
                  </a>
                </Link>
                <div className={styles.language}>
                  <p>EN</p>
                </div>
              </div>
            )}
          </div>
        ) : (
          <React.Fragment>
            <SliderNav user={user} handleLogout={handleLogout} />
          </React.Fragment>
        )}
      </nav>
    </React.Fragment>
  );
};

export default Nav;