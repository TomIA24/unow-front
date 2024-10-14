import React from "react";

import styles from "./styles.module.css";

const EmptyBox = ({ text = "Nothing to see here", h, style }) => {
  return (
    <div style={{ minHeight: h, ...style }} className={styles.container}>
      <div className={styles.imageContainer}>
        <img src={"./svg/empty-box.svg"} alt="" />
      </div>

      <p className={styles.text}>{text}</p>
    </div>
  );
};

export default EmptyBox;
