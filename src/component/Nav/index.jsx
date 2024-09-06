import React, { useEffect, useState,useRef } from "react";
import { Link } from "react-router-dom";
import SliderNav from "./slider";
import styles from "./styles.module.css";
import img from "../assets/profileImgNoUp.svg";
import imgicon from "../assets/usericon.png";
import Avatar from "@mui/material/Avatar";
import { CiUser } from "react-icons/ci";
import { Typography } from "@mui/material";
import { useNavigate } from 'react-router-dom'; 
import { useLocation } from 'react-router-dom';

const Nav = () => {
  const [WindowWidth, setWindowWidth] = useState(0);
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
    window.location = "/login";
  };
  const navigate = useNavigate();
  const [opnpopup, setpopupopen] = useState(false);
 const handlepopup= ()=> {

  setpopupopen(!opnpopup)
  console.log(opnpopup);
  
  };
  const closepopup= ()=> {
    navigate("/profile")
    setpopupopen(!opnpopup)
    console.log(opnpopup);
    
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
    DurationQuiz:""
  });

  const handlpersonalized =(candiddId)=> {
    console.log("id candat from nev",candiddId);
    
    navigate(`/personalize`, { state: {candiddId}} )
    setpopupopen(!opnpopup)
    console.log(opnpopup);
    
    };

    const [completedPercentage, setCompletedPercentage] = useState('0%');

    useEffect(() => {
      if (user?.profilecomplited != null) {
        setCompletedPercentage(`${user.profilecomplited}%`);
      } else {
        setCompletedPercentage('0%');
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
                  
                  <div>
                 
                 {user.profilecomplited === 100 ?  (
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
      {user.image ? (
            <div className={styles.progressCircle}
            style={{ '--completed-percentage': completedPercentage }}
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
        <Avatar
          alt="icon"
          src={imgicon}
          sx={{ width: 30, height: 30 }}
        />
      )}
      Welcome, {user.name}
    </a>
    
  </Link>

):(
  <button
    onClick={handlepopup}
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
      {user.image ? (
            <div className={styles.progressCircle}
            style={{ '--completed-percentage': completedPercentage }}
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
        <Avatar
          alt="icon"
          src={imgicon}
          sx={{ width: 30, height: 30 }}
        />
      )}
      Welcome, {user.name}
    </a>
  </button>
) }
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
     
        <div  ref={dialogRef} className={styles.dialogStyles}>
          <div className={styles.closbutton}>       <button  onClick={closepopup}>     <img
        src="/images/personalize/close.png"
        alt="bronze"

      /></button></div>
  
        <div className={styles.iamgedialog}>
        <img
        src="/images/personalize/wannaknowmoreabouyou.png"
        alt="bronze"

      />
      <div className={styles.continuebutton}> <button onClick={()=>handlpersonalized(user._id)}>Continue</button></div>
         
        </div>
      
        </div >
        </div>
      </>
      )}
    </React.Fragment>
  );
};

export default Nav;