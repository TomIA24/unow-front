import React from "react";
import styles from "./styles.module.css";
import TrainerConfirmation from "./TrainerConfirmation";
import Unavailability from "./Unavailability";

const DayDetailsModal = ({
  open,
  onClose,
  selectedDay,
  trainingTitle,
  setCalendarEvents,
}) => {
  return (
    open.isOpen && (
      <div className={styles.modal}>
        <div
          className={styles.container}
          style={{ maxWidth: open?.isFreeDay ? "549px" : "656px" }}
        >
          <div className={styles.header}>
            <h2
              className={`${styles.title}`}
              style={{ margin: open.isFreeDay ? "0 0 34px 0" : "0 auto 54px" }}
            >
              {open.isFreeDay
                ? "Add an unavailability"
                : "Trainer Confirmation"}
            </h2>
            <button onClick={onClose} className={styles.closeButton}>
              X
            </button>
          </div>
          {open.isFreeDay && (
            <Unavailability
              onClose={onClose}
              selectedDay={selectedDay}
              setCalendarEvents={setCalendarEvents}
            />
          )}
          {!open.isFreeDay && (
            <TrainerConfirmation
              onClose={onClose}
              selectedDay={selectedDay}
              trainingTitle={trainingTitle}
              setCalendarEvents={setCalendarEvents}
            />
          )}
        </div>
      </div>
    )
  );
};

export default DayDetailsModal;
