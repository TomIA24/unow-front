import React from "react";
import Button from "../../../../shared/components/button";
import Input from "../../../../shared/components/Inputs/Input";
import useUnavailability from "./hooks/useUnavailability";
import styles from "./styles.module.css";

const Unavailability = ({ onClose, selectedDay, setCalendarEvents }) => {
  const { formData, loading, handleChange, handleSubmit } = useUnavailability(
    selectedDay,
    onClose,
    setCalendarEvents
  );

  return (
    <form className={styles.content} onSubmit={handleSubmit}>
      <div className={styles.group} style={{ gap: "10px" }}>
        <div className={styles.group} style={{ gap: "11px" }}>
          <p className={styles.parg1}>Are you unavailable for this day?</p>
          <div className={styles.radio}>
            <input
              type="radio"
              name="isUnavailable"
              checked={formData.isUnavailable}
            />
            <label>I am unavailable on the following days.</label>
          </div>

          <div className={styles.dates}>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
              required
            />
            <input
              type="date"
              name="endDate"
              value={formData.endDate}
              onChange={handleChange}
            />
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
            value={formData.reason}
            onChange={handleChange}
            required
          />
        </div>

        <div className={styles.checkbox}>
          <input
            type="checkbox"
            name="isFirmUnavailable"
            checked={formData.isFirmUnavailable}
            onChange={handleChange}
          />
          <label>Firm unavailability</label>
        </div>

        <div className={styles.comments}>
          <label>Add a comment:</label>
          <input
            type="textarea"
            name="comment"
            value={formData.comment}
            onChange={handleChange}
          />
        </div>
      </div>

      <div style={{ display: "flex", gap: "10px", marginLeft: "auto" }}>
        <Button text="Cancel" varaint="outline" onClick={onClose} />
        <Button type="submit" text="Submit" loading={loading} />
      </div>
    </form>
  );
};

export default Unavailability;
