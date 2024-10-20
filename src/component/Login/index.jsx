import { Alert, Box, LinearProgress } from "@mui/material";
import axios from "axios";
import React, { useState } from "react";
import { IoMdArrowDropright } from "react-icons/io";
import { Link, useLocation, useNavigate } from "react-router-dom";
import image from "./dhfg.png";
import unow from "./logoblanc.png";
import styles from "./styles.module.css";

const Login = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { signup } = location.state || {};
  const [signupState, setSignupState] = useState(signup);
  const [data, setData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const isPasswordFilled = data.password.length > 0;
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = `${process.env.REACT_APP_API}api/auth`;
      await axios.post(url, data).then(async (res) => {
        localStorage.setItem("token", res.data.data);

        const config = {
          headers: {
            authorization: `Bearer ${res.data.data}`
          }
        };
        const url = `${process.env.REACT_APP_API}api/userData`;
        await axios.get(url, config).then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem("login", true);
          const redirectPath = localStorage.getItem("redirectPath");

          if (redirectPath) {
            navigate(redirectPath);
            localStorage.removeItem("redirectPath");
          } else {
            if (response.data.data.firstConnection) {
              window.location = "/profile/edit";
            } else {
              window.location = "/profile";
            }
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
      <div className={styles.container}>
        <div className={styles.leftSection}>
          <img src={unow} className={styles.logo} alt="Unow Logo" />
          <div className={styles.loginContainer}>
            <div className={styles.Title}>
              <p>Login</p>
              <Link className={styles.Close} to="/">
                Home
                <IoMdArrowDropright />
              </Link>
            </div>

            <form className={styles.form_container} onSubmit={handleSubmit}>
              <p className={styles.text}>Email address or user name</p>
              <input
                type="email"
                name="email"
                onChange={handleChange}
                value={data.email}
                required
                className={styles.input}
              />

              <p className={styles.text}>Password</p>

              <input
                type="password"
                name="password"
                onChange={handleChange}
                value={data.password}
                required
                className={styles.input}
              />
              <div className={styles.options}>
                <div className={styles.checkBox}>
                  <input type="checkbox" name="remember" />
                </div>
                <label htmlFor="remember">Remember me</label>
              </div>
              <p className={styles.by}>
                {" "}
                By continuing, you agree to the <u>Terms of use</u> and{" "}
                <u> Privacy Policy.</u>{" "}
              </p>
              {error && <div className={styles.error_msg}>{error}</div>}
              <button
                type="submit"
                className={`${styles.Login_btn} ${
                  isPasswordFilled ? styles.btnActive : ""
                }`}
              >
                Log in
              </button>
              <a href="/reset-password" className={styles.forgetpsw}>
                <u>Forget your password</u>
              </a>

              <p className={styles.nvaccount}>
                Don’t have an account ?{" "}
                <a href="/signup" className={styles.signupLink}>
                  Sign up
                </a>
                <img
                  src="/svg/signup.svg"
                  style={{ height: 20, margin: "8px 2px 2px 2px" }}
                  alt=""
                />
              </p>
            </form>
          </div>
        </div>
        <div className={styles.rightSection}>
          <img src={image} className={styles.loginImage} alt="Login" />
          <div className={styles.textcontainer}>
            <div className={styles.textsearchtitle}>
              Let's build the future together
            </div>
            <div className={styles.textsearch}>
              “Coming together is a beginning, keeping together is progress,
              working together is success.”
              <div className={styles.textsearch2}> Henry Ford</div>
              <br />
            </div>
          </div>
        </div>
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
