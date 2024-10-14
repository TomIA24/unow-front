import { CircularProgress } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";

const Button = ({
  type = "button",
  name,
  onClick,
  text,
  varaint,
  className,
  loading,
  style = {},
  disabled,
}) => {
  return (
    <button
      style={style}
      name={name}
      className={`${styles.btn} ${styles[varaint]} ${className}`}
      type={type}
      onClick={onClick}
      disabled={disabled || loading}
    >
      {loading ? (
        <CircularProgress
          size={20}
          sx={{
            color:
              varaint === "outline"
                ? "var(--secondary-color)"
                : "var(--text-color)",
          }}
        />
      ) : (
        <span>{text}</span>
      )}
    </button>
  );
};

export default Button;
