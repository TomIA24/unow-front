import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import React from "react";
import styles from "./styles.module.css";

const TrainerConfirmation = () => {
  const [openPropose, setOpenPropose] = React.useState(false);
  return (
    <div className={styles.content}>
      <div className={styles.group} style={{ gap: "18px" }}>
        <div className={styles.group} style={{ gap: "18px" }}>
          <div className={styles.group} style={{ gap: "11px" }}>
            <p className={styles.parg2}>
              Are you unable or unwilling to take on this assignment
            </p>
            <p className={styles.parg2}>1 June 2024 - Agile Scrum</p>
          </div>

          <p>
            Please provide us with some details so we can better manage the
            proposals we may offer you for this time slot.
          </p>
        </div>

        <div className={styles.group} style={{ gap: "11px" }}>
          <div className={styles.radio}>
            <input type="radio" />
            <label>I am unavailable on the following days.</label>
          </div>

          <div className={styles.checkbox}>
            <input type="checkbox" />
            <label>Fri 1 June</label>
          </div>
        </div>
      </div>

      <div className={styles.group} style={{ gap: "11px" }}>
        <div className={styles.box}>
          <div
            className={`${styles.propose} ${openPropose ? styles.clicked : ""}`}
            onClick={() => setOpenPropose(!openPropose)}
          >
            <ArrowLeftIcon sx={{ fontSize: "24px", color: "#2C2C2C" }} />
            <span>To propose alternative dates.</span>
          </div>
          {openPropose && (
            <div className={styles.dates}>
              <input type="date" />
            </div>
          )}
        </div>

        <div className={styles.group} style={{ gap: "7px" }}>
          <div className={styles.radio}>
            <input type="radio" />
            <label>One or more of the following elements do not suit me:</label>
          </div>
          <div className={styles.radio}>
            <input type="radio" />
            <label>
              I do not wish to take on this assignment. However, I remain open
              to other proposals on these dates:
            </label>
          </div>
        </div>
      </div>

      <div className={styles.comments}>
        <label>Add a comment:</label>
        <input type="textarea" />

        <div className={styles.checkbox}>
          <input type="checkbox" />
          <label>
            Update my training availability with the dates indicated above.
          </label>
        </div>
      </div>
    </div>
  );
};
export default TrainerConfirmation;
