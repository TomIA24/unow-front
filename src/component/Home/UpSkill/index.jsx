import React, { useState } from "react";
import styles from "./styles.module.css";
import Group from "../../assets/Group.png";
import Up from "../../assets/upImage.png";

const UpSkill = () => {
  const [openGet, setOpenGet] = useState(false);
  const [openMore, setOpenMore] = useState(false);

  return (
    <div className={styles.allContainer}>
      <div className={styles.imageWrapper}>
        <img src={Group} alt="GroupImage" className={styles.image} />
      </div>
      <div className={styles.mainContainer}>
        <div className={styles.title}>UP-SKILL YOUR BUSINESS WITH U!NOW</div>
        <p className={styles.paragraph}>
          As part of our professional training activity, we are constantly
          looking for new consultant trainers.
        </p>
      </div>
      <div className={styles.buttonContainer}>
        <button
          onClick={() => setOpenGet((prev) => !prev)}
          className={styles.moreButton}
        >
          Get Started
        </button>
        <button
          onClick={() => setOpenMore((prev) => !prev)}
          className={styles.moreButton}
        >
          Learn More
        </button>
      </div>
      <div className={styles.finalWrapper}>
        <img src={Up} alt="UpImage" className={styles.image} />
      </div>
    </div>
  );
};

export default UpSkill;
