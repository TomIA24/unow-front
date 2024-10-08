import React from "react";
import styles from "./styles.module.css";

const Button = ({
  type = "button",
  onClick,
  text,
  varaint,
  loading,
  style = {},
}) => {
  return (
    <button
      style={style}
      className={`${styles.btn} ${styles[varaint]}`}
      type={type}
      onClick={onClick}
    >
      {loading ? "Loading..." : <span>{text}</span>}
    </button>
  );
};

export default Button;
