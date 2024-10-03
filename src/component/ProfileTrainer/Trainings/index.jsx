import SendIcon from "@mui/icons-material/Send";
import React from "react";
import styles from "./styles.module.css";

const Trainings = ({ userInfo }) => {
  return (
    <div className={styles.container}>
      <div className={styles.trainingsCard}>
        <div className={styles.imgContainer}>
          <img src={"./images/trainings.png"} alt="" className={styles.img} />
        </div>

        <div className={styles.info}>
          <p className={styles.title}>Web Development</p>
          <div className={styles.textContainer}>
            <p>React: Developing a Web Development</p>
            <p>October 27, 2024</p>
            <p>12:00 AM - 12:00 PM</p>
          </div>
          <button>
            <span>Go To Training</span>
            <SendIcon sx={{ color: "white", fontSize: "16px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Trainings;
