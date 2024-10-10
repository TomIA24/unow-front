import ArrowLeftIcon from "@mui/icons-material/ArrowLeft";
import { format } from "date-fns";
import React from "react";
import Button from "../../../../shared/components/button";
import useTrainerConfirmation from "./hooks/useTrainerConfirmation";
import styles from "./styles.module.css";

const TrainerConfirmation = ({
  onClose,
  selectedDay,
  trainingTitle,
  setCalendarEvents,
}) => {
  const {
    openPropose,
    setOpenPropose,
    loading,
    formData,
    handleChange,
    handleSubmit,
  } = useTrainerConfirmation(selectedDay, onClose, setCalendarEvents);

  return (
    <form className={styles.content} onSubmit={handleSubmit}>
      <div className={styles.group} style={{ gap: "18px" }}>
        <div className={styles.group} style={{ gap: "18px" }}>
          <div className={styles.group} style={{ gap: "11px" }}>
            <p className={styles.parg2}>
              Are you unable or unwilling to take on this assignment
            </p>
            <p className={styles.parg2}>
              {format(selectedDay, "d MMMM yyyy")} - {trainingTitle}
            </p>
          </div>

          <p className={styles.parg1}>
            Please provide us with some details so we can better manage the
            proposals we may offer you for this time slot.
          </p>
        </div>

        <div className={styles.group} style={{ gap: "11px" }}>
          <div className={styles.radio}>
            <input
              type="radio"
              name="unavailableDays"
              checked={formData.unavailableDays}
              onChange={() => {}}
            />
            <label>I am unavailable on the following days.</label>
          </div>

          <div className={styles.checkbox}>
            <input
              type="checkbox"
              name="unavailableDate"
              checked={formData.unavailableDate}
              onChange={() => {}}
            />
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
              <input
                type="date"
                name="alternativeDate"
                value={formData.alternativeDate}
                onChange={handleChange}
              />
            </div>
          )}
        </div>

        <div className={styles.group} style={{ gap: "7px" }}>
          <div className={styles.radio}>
            <input
              type="radio"
              name="unsuitableElements"
              checked={formData.unsuitableElements}
              onChange={handleChange}
            />
            <label>One or more of the following elements do not suit me</label>
          </div>
          <div className={styles.radio}>
            <input
              type="radio"
              name="notInterested"
              checked={formData.notInterested}
              onChange={handleChange}
            />
            <label>
              I do not wish to take on this assignment. However, I remain open
              to other proposals on these dates
            </label>
          </div>
        </div>
      </div>

      <div className={styles.comments}>
        <label>Add a comment:</label>
        <textarea
          name="comment"
          value={formData.comment}
          onChange={handleChange}
        />

        <div className={styles.checkbox}>
          <input
            type="checkbox"
            name="updateAvailability"
            checked={formData.updateAvailability}
            onChange={handleChange}
          />
          <label>
            Update my training availability with the dates indicated above.
          </label>
        </div>
      </div>
      <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
        <Button onClick={onClose} varaint="outline" text="Cancel" />
        <Button type="submit" text="Save" loading={loading} />
      </div>
    </form>
  );
};
export default TrainerConfirmation;
