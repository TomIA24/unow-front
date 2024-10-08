import React, { useState } from "react";
import Input from "../../../../shared/components/Inputs/Input";
import styles from "./styles.module.css";

const Unavailability = () => {
  const [formData, setFormData] = useState({
    isUnavailable: false,
    startDate: "",
    endDate: "",
    reason: "",
    isFirmUnavailable: false,
    comment: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();

    if (!formData.reason) {
      alert("Please provide a reason for your unavailability.");
      return;
    }

    console.log("Form data submitted: ", formData);
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
              onChange={handleChange}
            />
            <label>I am unavailable on the following days.</label>
          </div>

          <div className={styles.dates}>
            <input
              type="date"
              name="startDate"
              value={formData.startDate}
              onChange={handleChange}
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

      <button type="submit">Submit</button>
    </form>
  );
};

export default Unavailability;
