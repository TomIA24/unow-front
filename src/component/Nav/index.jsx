import React, { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import SliderNav from "./slider";
import styles from "./styles.module.css";
import img from "../assets/profileImgNoUp.svg";
import imgicon from "../assets/profileuser.png";
import Avatar from "@mui/material/Avatar";
import { CiUser } from "react-icons/ci";
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const [WindowWidth, setWindowWidth] = useState(0);
  const navState = localStorage.getItem('navState')

  const navigate = useNavigate();

  const handleWidthChange = () => {
    const currentWidth = window.innerWidth;
    setWindowWidth(currentWidth);
  };
  const dialogRef = useRef(null);
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
    navigate(`/login`);

    
  };
  const [opnpopup, setpopupopen] = useState(false);

  const handlepopup = () => {
    setpopupopen(true);
  };
  const closepopup = () => {
    navigate('/profileClient');
    setpopupopen(false);
  };
  const location = useLocation();

  const [Data, setData] = useState({
    _id: "",
    Title: "",
    Trainer: "",
    Description: "",
    Goals: "",
    WhoShouldAttend: "",
    CourseContent: "",
    PracticalWork: "",
    Category: "",
    Price: "",
    Thumbnail: {},
    Video: [],
    Level: "",
    Reference: "",
    Date: [],
    enrolled: [],
    state: "",
    certificate: "",
    evaluate: [],
    DurationQuiz: "",
  });

  const handlpersonalized = (candiddId) => {
    console.log("id candat from nev", candiddId);
    // navigate('/profile');
    navigate(`/personalize`, { state: { candiddId } });
    setpopupopen(!opnpopup);
    console.log(opnpopup);
  };

  const [completedPercentage, setCompletedPercentage] = useState("0%");

  const [progressGradient, setProgressGradient] = useState('');
  const [mainColorRgb, setMainColorRgb] = useState('');
  useEffect(() => {
    if (user?.profilecomplited != null) {
      const percentage = user.profilecomplited;
      setCompletedPercentage(`${percentage}%`);
  
      if (percentage <= 20) {
        setProgressGradient(`#E74C3C`);
        setMainColorRgb('255, 152, 0');
      } else if (20 < percentage <= 80) {
        setProgressGradient(`#F39D6E`);
        setMainColorRgb('76, 175, 80');
      } 
       if (percentage >= 100){
        setProgressGradient(`#49C382`);
      }
    } else {
      setCompletedPercentage('0%');
      setProgressGradient('conic-gradient(#ff9800 0%, #ffffff00 0%)');
      setMainColorRgb('255, 152, 0');
    }
  }, [user?.profilecomplited]);
  
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
            </Link>
            <div className={styles.middle_nav}>
              <Link
                onClick={() => {
                    localStorage.setItem('navState', 1);
                }}
                to="/"
              >
                <a
                  type="button"
                  className={styles.nav_btn}
                  style={{ color: "white" }}
                >
                  Home
                </a>
                {navState === 1 && <p className={styles.underline}></p>}
              </Link>
              <Link
                onClick={() => {
                    localStorage.setItem('navState', 2);
                }}
                to="/about"
              >
                <a type="button" className={styles.nav_btn}>
                  About
                </a>
                {navState === 2 && <p className={styles.underline}></p>}
              </Link>
              <Link
                onClick={() => {
                    localStorage.setItem('navState', 3);
                }}
                to="/contact"
              >
                <a type="button" className={styles.nav_btn}>
                  Contact
                </a>
                {navState === 3 && <p className={styles.underline}></p>}
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
                  <div>
                    {user.profilecomplited >=100 ? (
                      <Link
                        to="/profileClient"
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          src="/svg/coins.svg"
                          style={{ height: 30 }}
                          alt=""
                        />
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
                          {user.image ? (
                            <div
                              className={styles.progressCircle}
                              style={{ 
                                '--completed-percentage': completedPercentage, 
                                '--progress-gradient': progressGradient,
                                '--main-color-rgb': mainColorRgb}}
                            >
                              <div className={styles.progressInnerGap}>
                                <div className={styles.progressInner}>
                                  <Avatar
                                    alt="icon"
                                    src={`${process.env.REACT_APP_API}${user.image.filePath}`}
                                    sx={{ width: 30, height: 30 }}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                            className={styles.progressCircle}
                            style={{ 
                              '--completed-percentage': completedPercentage, 
                              '--progress-gradient': progressGradient,
                              '--main-color-rgb': mainColorRgb}}
                          >
                                   <div className={styles.progressInnerGap}>
                                   <div className={styles.progressInner}>
                            <Avatar
                              alt="icon"
                              src={imgicon}
                              sx={{ width: 30, height: 30 }}
                            />
                              </div>
                              </div>
                              </div>
                          )}
                          Welcome, {user.name}
                        </a>
                      </Link>
                    ) : (
                      <button
                        onClick={handlepopup}
                        style={{ display: "flex", alignItems: "center" }}
                      >
                        <img
                          src="/svg/coins.svg"
                          style={{ height: 30 }}
                          alt=""
                        />
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
                          {user.image ? (
                            <div
                              className={styles.progressCircle}
                              style={{ 
                                '--completed-percentage': completedPercentage, 
                                '--progress-gradient': progressGradient,
                                '--main-color-rgb': mainColorRgb}}
                            >
                              <div className={styles.progressInnerGap}>
                                <div className={styles.progressInner}>
                                  <Avatar
                                    alt="icon"
                                    src={`${process.env.REACT_APP_API}${user.image.filePath}`}
                                    sx={{ width: 30, height: 30 }}
                                  />
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div
                            className={styles.progressCircle}
                            style={{ 
                              '--completed-percentage': completedPercentage, 
                              '--progress-gradient': progressGradient,
                              '--main-color-rgb': mainColorRgb}}
                          >
                            <Avatar
                              alt="icon"
                              src={imgicon}
                              sx={{ width: 30, height: 30 }}
                            />
                              </div>
                          )}
                          Welcome, {user.name}
                        </a>
                      </button>
                    )}
                  </div>
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
      {opnpopup && (
        <>
          <div className={styles.overlayStyles}>
            <div ref={dialogRef} className={styles.dialogStyles}>
              <div className={styles.closbutton}>
                {" "}
                <button onClick={closepopup}>
                  {" "}
                  <img src="/images/personalize/close.png" alt="bronze" />
                </button>
              </div>

              <div className={styles.iamgedialog}>
                <img
                  src="/images/personalize/wannaknowmoreabouyou.png"
                  alt="bronze"
                />
                <div className={styles.continuebutton}>
                  {" "}
                  <button onClick={() => handlpersonalized(user._id)}>
                    Proceed
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </React.Fragment>
  );
};

export default Nav;