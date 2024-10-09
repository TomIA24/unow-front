import { isAfter, isBefore, isToday, parseISO } from "date-fns";
import React, { useState } from "react";
import toast from "react-hot-toast";
import { request } from "../../../../core/api/request";
import Button from "../../../../shared/components/button";
import Input from "../../../../shared/components/Inputs/Input";
import styles from "./styles.module.css";

const Unavailability = ({ onClose, selectedDay, setCalendarEvents }) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    isUnavailable: true,
    startDate: selectedDay || "",
    endDate: "",
    reason: "",
    isFirmUnavailable: false,
    comment: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const startDate = parseISO(formData.startDate);
    const endDate = parseISO(formData.endDate);

    if (isBefore(startDate, currentDate) && !isToday(startDate)) {
      toast.error("Start date cannot be in the past.");
      return;
    }

    if (isAfter(startDate, endDate)) {
      toast.error("Start date cannot be after the end date.");
      return;
    }

    if (!formData.reason) {
      toast.error("Please provide a reason for your unavailability.");
      return;
    }

    const eventData = {
      type: "unavailability",
      title: "_",
      color: "#E2E0F6",
      startDate: formData.startDate,
      endDate: formData.endDate ? formData.endDate : formData.startDate,
      reason: formData.reason,
      unavailabilityDetails: {
        isFirmUnavailable: formData.isFirmUnavailable,
        comment: formData.comment,
      },
    };

    setLoading(true);
    request
      .create("calendarEvents", eventData)
      .then((data) => {
        setFormData({});
        onClose();
        setCalendarEvents((prevEvents) => [...prevEvents, data.calendarEvent]);
      })
      .finally(() => setLoading(false));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

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
