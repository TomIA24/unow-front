import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import OndemandVideoIcon from "@mui/icons-material/OndemandVideo";
import ShoppingBasketIcon from "@mui/icons-material/ShoppingBasket";
import React from "react";
import Loading from "../../Loading";
import Courses from "../Courses";
import Trainings from "../Trainings";
import UserInfo from "../UserInfo";
import Cart from "../cart";
import useProfile from "../hooks/use-profile";
import styles from "./styles.module.css";

const Profile = (props) => {
  const { handleBtn, profileState, data, loading } = useProfile();

  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className={styles.profileContainer}>
        {profileState === 0 && <UserInfo />}
        {profileState === 1 && <Courses />}
        {profileState === 2 && <Trainings />}
        {profileState === 3 && <Cart />}

        <div
          className={
            profileState === 1 || profileState === 2 || profileState === 3
              ? styles.profileCapsule3Special
              : styles.profileCapsule3
          }
        >
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
