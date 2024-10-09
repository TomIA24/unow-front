import React from "react";
import styles from "./styles.module.css";
import TrainerConfirmation from "./TrainerConfirmation";
import Unavailability from "./Unavailability";

const DayDetailsModal = ({ open, onClose }) => {
  return (
    open.isOpen && (
      <div className={styles.modal}>
        <div
          className={styles.container}
          style={{ maxWidth: open?.isFreeDay ? "549px" : "656px" }}
        >
          <div className={styles.header}>
            <h2 className={`${styles.title} center`}>
              {open.isFreeDay
                ? "Add an unavailability"
                : "Trainer Confirmation"}
            </h2>
            <button onClick={onClose} className={styles.closeButton}>
              X
            </button>
          </div>
          {open.isFreeDay && <Unavailability onClose={onClose} />}
          {!open.isFreeDay && <TrainerConfirmation onClose={onClose} />}
        </div>
      </div>
    )
  );
};

export default DayDetailsModal;
