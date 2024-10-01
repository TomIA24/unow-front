import Avatar from "@mui/material/Avatar";
import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import imgicon from "../assets/profileuser.png";
import SliderNav from "./slider";
import styles from "./styles.module.css";

import axios from "axios";

const Nav = () => {
  const [WindowWidth, setWindowWidth] = useState(0);
  const navState = localStorage.getItem("navState");

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
    if (WindowWidth <= 800) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, []);
  useEffect(() => {
    if (WindowWidth <= 800) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [WindowWidth]);

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [candidateData, setcandidateData] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      if (!user?._id) return;
      try {
        const candidateResponse = await axios.get(
          `${process.env.REACT_APP_API}api/candidat/candidates/${user._id}`
        );
        const candidateData = candidateResponse.data;

        setcandidateData(candidateResponse.data);
      } catch (error) {
        console.error("Error fetching candidate data:", error);
      }
    };

    fetchData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate(`/login`);
  };
  const [opnpopup, setPopupOpen] = useState(false);

  const handlepopup = () => {
    setPopupOpen(true);
  };

  const closepopup = () => {
    setTimeout(() => {
      navigate("/candidate/profile"); // Navigate after state update
    }, 100);
    setPopupOpen(false);
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
    navigate(`/personalize`, { state: { candiddId } });
    setPopupOpen(!opnpopup);
  };
  const [completedPercentage, setCompletedPercentage] = useState("0%");

  const [progressGradient, setProgressGradient] = useState("");
  const [mainColorRgb, setMainColorRgb] = useState("");
  useEffect(() => {
    if (candidateData?.profilecomplited != null) {
      const percentage = candidateData.profilecomplited;
      setCompletedPercentage(`${percentage}%`);

      if (percentage <= 20) {
        setProgressGradient(`#E74C3C`);
        setMainColorRgb("255, 152, 0");
      } else if (20 < percentage <= 80) {
        setProgressGradient(`#F39D6E`);
        setMainColorRgb("76, 175, 80");
      }
      if (percentage >= 100) {
        setProgressGradient(`#49C382`);
      }
    } else {
      setCompletedPercentage("0%");
      setProgressGradient("conic-gradient(#ff9800 0%, #ffffff00 0%)");
      setMainColorRgb("255, 152, 0");
    }
  }, [candidateData?.profilecomplited]);

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
                  localStorage.setItem("navState", 1);
                }}
                to="/"
              >
                <button
                  type="button"
                  className={styles.nav_btn}
                  style={{ color: "white" }}
                >
                  Home
                </button>
                {navState === 1 && <p className={styles.underline}></p>}
              </Link>
              <Link
                onClick={() => {
                  localStorage.setItem("navState", 2);
                }}
                to="/about"
              >
                <button type="button" className={styles.nav_btn}>
                  About
                </button>
                {navState === 2 && <p className={styles.underline}></p>}
              </Link>
              <Link
                onClick={() => {
                  localStorage.setItem("navState", 3);
                }}
                to="/contact"
              >
                <button type="button" className={styles.nav_btn}>
                  Contact
                </button>
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
                    <button type="button" className={styles.nav_btn_profile}>
                      {/* {user.userType} */}
                      Welcome, Admin
                    </button>
                  </Link>
                ) : (
                  <div>
                    {user.userType === "Student" && (
                      <>
                        {user.profilecomplited >= 100 ? (
                          <Link
                            to="/candidate/profile"
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

                            <button
                              type="button"
                              className={styles.nav_btn_profile}
                            >
                              <img
                                src="/svg/bronze.svg"
                                alt="bronze"
                                style={{ height: 30 }}
                              />
                              {user.image ? (
                                <div
                                  className={styles.progressCircle}
                                  style={{
                                    "--completed-percentage":
                                      completedPercentage,
                                    "--progress-gradient": progressGradient,
                                    "--main-color-rgb": mainColorRgb,
                                  }}
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
                                    "--completed-percentage":
                                      completedPercentage,
                                    "--progress-gradient": progressGradient,
                                    "--main-color-rgb": mainColorRgb,
                                  }}
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
                            </button>
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
                            <button
                              type="button"
                              className={styles.nav_btn_profile}
                            >
                              <img
                                src="/svg/bronze.svg"
                                alt="bronze"
                                style={{ height: 30 }}
                              />
                              {user.image ? (
                                <div
                                  className={styles.progressCircle}
                                  style={{
                                    "--completed-percentage":
                                      completedPercentage,
                                    "--progress-gradient": progressGradient,
                                    "--main-color-rgb": mainColorRgb,
                                  }}
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
                                    "--completed-percentage":
                                      completedPercentage,
                                    "--progress-gradient": progressGradient,
                                    "--main-color-rgb": mainColorRgb,
                                  }}
                                >
                                  <Avatar
                                    alt="icon"
                                    src={imgicon}
                                    sx={{ width: 30, height: 30 }}
                                  />
                                </div>
                              )}
                              Welcome, {user.name}
                            </button>
                          </button>
                        )}
                      </>
                    )}

                    {user.userType === "Trainer" && (
                      <>
                        <Link
                          to="/profile"
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

                          <button
                            type="button"
                            className={styles.nav_btn_profile}
                          >
                            <img
                              src="/svg/bronze.svg"
                              alt="bronze"
                              style={{ height: 30 }}
                            />
                            {user.image ? (
                              <div
                                className={styles.progressCircle}
                                style={{
                                  "--completed-percentage": completedPercentage,
                                  "--progress-gradient": progressGradient,
                                  "--main-color-rgb": mainColorRgb,
                                }}
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
                                  "--completed-percentage": completedPercentage,
                                  "--progress-gradient": progressGradient,
                                  "--main-color-rgb": mainColorRgb,
                                }}
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
                          </button>
                        </Link>
                      </>
                    )}
                  </div>
                )}
                <Link to="/">
                  <button
                    type="button"
                    onClick={handleLogout}
                    className={styles.nav_btn}
                  >
                    Logout
                  </button>
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
                <button onClick={closepopup}>
                  <img src="/images/personalize/close.png" alt="bronze" />
                </button>
              </div>

              <div className={styles.iamgedialog}>
                <img
                  src="/images/personalize/wannaknowmoreabouyou.png"
                  alt="bronze"
                />
                <div className={styles.continuebutton}>
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
