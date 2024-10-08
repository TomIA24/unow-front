import React from "react";

import Input from "../../../../shared/components/Inputs/Input";
import styles from "./styles.module.css";

const DayDetailsModal = ({ open, onClose, dayType = "unavailable" }) => {
  return (
    open && (
      <div className={styles.modal}>
        <div className={styles.container}>
          <div className={styles.header}>
            <h2 className={styles.title}>
              {dayType === "unavailable"
                ? "Add an unavailability"
                : "Trainer Confirmation"}
            </h2>
            <button onClick={onClose} className={styles.closeButton}>
              X
            </button>
          </div>
          {dayType === "unavailable" && <Unavailability />}
          {dayType === "confirmation" && <TrainerConfirmation />}
        </div>
      </div>
    )
  );
};

const Unavailability = () => {
  return (
    <div className={styles.content}>
      <p className={styles.parg1}>Are you unavailable for this day?</p>
      <div className={styles.radio}>
        <input type="radio" />
        <label>I am unavailable on the following days.</label>
      </div>

      <div className={styles.dates}>
        <input type="date" />
        <input type="date" />
      </div>

      <Input
        style={{
          height: "fit-content",
          padding: "11px 27px",
          borderColor: "#818181",
        }}
        placeholder={"short description *"}
        name="reason"
        type="text"
      />

      <div className={styles.checkbox}>
        <input type="checkbox" />
        <label>Firm unavailability</label>
      </div>

      <div className={styles.comments}>
        <label>Add a comment:</label>
        <input type="textarea" />
      </div>
    </div>
  );
};

const TrainerConfirmation = () => {
  return (
    <div className={styles.content}>
      <p className={styles.parg2}>
        Are you unable or unwilling to take on this assignment
      </p>
      <p className={styles.parg2}>1 June 2024 - Agile Scrum</p>

      <p>
        Please provide us with some details so we can better manage the
        proposals we may offer you for this time slot.
      </p>

      <div className={styles.radio}>
        <input type="radio" />
        <label>I am unavailable on the following days.</label>
      </div>

      <div className={styles.checkbox}>
        <input type="checkbox" />
        <label>Fri 1 June</label>
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

export default DayDetailsModal;
