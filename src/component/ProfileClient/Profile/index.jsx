import React from "react";
import styles from "./styles.module.css";
import useProfile from "../hooks/use-profile";
import Loading from "../../Loading";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import UserInfo from "../UserInfo";
import Trainings from "../Trainings";
import Courses from "../Courses";

const Profile = (props) => {
  const { handleBtn, profileState, data, loading } = useProfile();
  console.log(data);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className={styles.profileContainer}>
        {profileState===0 && <UserInfo />}
        {profileState===1 && <Courses />}
        {profileState===2 && <Trainings />}
        {profileState===3 && <UserInfo />}
  
        <div className={styles.profileCapsule3}>
          <button
            onClick={() => handleBtn(0)}
            className={profileState === 0 ? styles.btnActive : styles.btn}
          >
            <div className={styles.btnInner}>
              <AccountCircleIcon />
              <p>PERSONNAL INFORMATIONS</p>
            </div>
          </button>
          <button
            onClick={() => handleBtn(1)}
            className={profileState === 1 ? styles.btnActive : styles.btn}
          >
            <div className={styles.btnInner}>
              <OndemandVideoIcon />
              <p>COURSES</p>
            </div>
          </button>
          <button
            onClick={() => handleBtn(2)}
            className={profileState === 2 ? styles.btnActive : styles.btn}
          >
            <div className={styles.btnInner}>
              <HistoryEduIcon />
              <p>TRAININGS</p>
            </div>
          </button>
          <button
            onClick={() => handleBtn(3)}
            className={profileState === 3 ? styles.btnActive : styles.btn}
          >
            <div className={styles.btnInner}>
              <ShoppingBasketIcon />
              <p>CART</p>
            </div>
          </button>
        </div>
      </div>
    );
  }
};



export default Profile;
