import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";
import { Alert, Box, LinearProgress } from "@mui/material";

const Login = () => {
  const location = useLocation();
  const { signup } = location.state || {};
  const [signupState, setSignupState] = useState(signup);
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const config = {
        headers: {},
      };
      const url = `${process.env.REACT_APP_API}/api/auth`;
      await axios.post(url, data).then(async (res) => {
        localStorage.setItem("token", res.data.data);
        console.log("success");

        const config = {
          headers: {
            authorization: `Bearer ${res.data.data}`,
          },
        };
        const url = `${process.env.REACT_APP_API}/api/userData`;
        await axios.post(url, {}, config).then((response) => {
          console.log("user data", response.data.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem("login", true);
          if (response.data.data.firstConnection) {
            window.location = "/completeInfo";
          } else {
            window.location = "/profile";
          }

          if (response.data.data.userType === "Admin") {
            window.location = "/admin";
          }
        });
      });
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
  const [progress, setProgress] = useState(0);

  React.useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === 100) {
          return setSignupState(false);
        }
        return Math.min(oldProgress + 1, 100);
      });
    }, 50);

    return () => {
      clearInterval(timer);
    };
  }, []);
  return (
    <div className={styles.backLogin}>
      <div className={styles.loginContainer}>
        <Link className={styles.Close} to="/">
          Home
          <IoIosArrowForward size={30} />
        </Link>
        <div className={styles.Title}>
          <p>Login</p>
        </div>
        <form className={styles.form_container} onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Email"
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
          <div className={styles.options}>
            <div className={styles.checkBox}>
              <input type="checkbox" name="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <Link to="/ResetPassword">Forgot Password ?</Link>
          </div>
          {error && <div className={styles.error_msg}>{error}</div>}
          <button type="submit" className={styles.Login_btn}>
            Login
          </button>
          <Link className={styles.signup} to="/signup">
            Create an account <IoMdArrowDropright />
          </Link>
        </form>
      </div>
      {signupState && (
        <Box sx={{ position: "absolute", top: 0, right: 0, margin: "10px 0" }}>
          <Alert
            severity="success"
            onClose={() => {
              setSignupState(false);
            }}
          >
            Account created successfully.
            <LinearProgress
              variant="determinate"
              color="success"
              value={progress}
            />
          </Alert>
        </Box>
      )}
    </div>
  );
};

export default Login;
