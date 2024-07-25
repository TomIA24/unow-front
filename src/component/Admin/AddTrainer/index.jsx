import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";

const AddTrainer = () => {
  const currentDate = new Date();
  const initialData = {
    name: "",
    surname: "",
    adresse: "",
    phone: "",
    email: "",
    password: "",
    connectingMetropolis: "",
    monthlyBandwidth: "",
    animationLanguage: [""],
    description: "",
    programs: [""],
    dateOfCreation: "",
    chargeTVA: false,
    RCS: "",
    SIRET: "",
    socialReason: "",
    image: "",
    firstConnection: true,
  };
  const [data, setData] = useState({
    name: "",
    surname: "",
    adresse: "",
    phone: "",
    email: "",
    password: "",
    connectingMetropolis: "",
    monthlyBandwidth: "",
    animationLanguage: [""],
    description: "",
    programs: [""],
    dateOfCreation: "",
    chargeTVA: false,
    RCS: "",
    SIRET: "",
    socialReason: "",
    image: "",
    userType: "Trainer",
    firstConnection: true,
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const dateChanger = () => {
    const currentDateformated =
      currentDate.getFullYear() +
      "-" +
      (currentDate.getMonth() + 1) +
      "-" +
      currentDate.getDate();
    setData({ ...data, dateOfCreation: currentDateformated });
  };

  useEffect(() => {
    setError("");
  }, []);
  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    setError("");
    setData({ ...initialData });
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API}/api/Trainer`;
      const { data: res } = await axios.post(url, data, { headers: {} });
      // window.location.reload();
      setData({ ...initialData });
      setSaved(true);
      await new Promise((r) => {
        setTimeout(r, 20000);
      });
      setSaved(false);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };
  return (
    <div className={styles.backSignup}>
      <div className={styles.SignupContainer}>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <div className={styles.Title}>
            <h4>Add Trainer</h4>
          </div>
          <input
            type="email"
            placeholder="Email..."
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className={styles.input}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className={styles.input}
          />

          {error && <div className={styles.error_msg}>{error}</div>}
          {saved && (
            <div className={styles.valid_msg}>
              Trainer created successfully — check it out!
            </div>
          )}
          <button
            type="submit"
            onClick={dateChanger}
            className={styles.Signup_btn}
          >
            Add Trainer
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddTrainer;
