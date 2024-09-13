import styles from "./styles.module.css";
import { Link, useLocation } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";
import { Alert, Box, LinearProgress } from "@mui/material";
import image from "./dhfg.png";
import unow from "./logoblanc.png";
import divider from "./Divider.png";
import facebook from "./imgMedia/Social media logo.png";
import apple from "./imgMedia/Social media logo (1).png";
import google from "./imgMedia/Social media logo (2).png";
import twitter from "./imgMedia/Social media logo (3).png";
import hide from "./icon.png";
import { useNavigate } from "react-router-dom";

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
        console.log("success");

        const config = {
          headers: {
            authorization: `Bearer ${res.data.data}`,
          },
        };
        const url = `${process.env.REACT_APP_API}api/userData`;
        await axios.get(url, config).then((response) => {
          console.log("user data", response.data.data);
          localStorage.setItem("user", JSON.stringify(response.data.data));
          localStorage.setItem("login", true);
          if (response.data.data.firstConnection) {
            navigate("/trainer/informations");
          } else {
            navigate("/profile");
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
                Don’t have an account?{" "}
                <a href="/signup" className={styles.signupLink}>
                  Sign up
                </a>
              </p>

              <div className={styles.divider}>
                <img
                  src={divider}
                  className={styles.dividerImage}
                  alt="Divider"
                />
                <p className={styles.or}>Or</p>
                <img
                  src={divider}
                  className={styles.dividerImage}
                  alt="Divider"
                />
              </div>
              <div className={styles.allsocialmedia}>
                <img
                  src={facebook}
                  alt="Facebook"
                  className={styles.socialmediaF}
                />
                <img src={apple} alt="Apple" className={styles.socialmedia} />
                <img src={google} alt="Google" className={styles.socialmedia} />
                <img
                  src={twitter}
                  alt="Twitter"
                  className={styles.socialmedia}
                />
              </div>
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
