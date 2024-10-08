import styles from "./styles.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";
import { signupState } from "../../recoil/signup.atom";
import { useRecoilState } from "recoil";
import { signup } from "./signup.utils";
import unow from "./unow.png";
import image from "./image.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
const SignUp = () => {
  const [data, setData] = useRecoilState(signupState);
  const [showPassword, setShowPassword] = useState(false);
  const location = useLocation();
  const { errorState } = location.state || {};
  // const [data, setData] = useState({
  //   name: "",
  //   userName: "",
  //   phone: "",
  //   email: "",
  //   password: "",
  //   userType: "Student",
  //   lastSeen: [],
  // });
  const [error, setError] = useState(errorState);
  const [phoneError, setPhoneError] = useState("");

  const [isValidEmail, setIsValidEmail] = useState(true);
  const [isConfPswrd, setIsConfPswrd] =useState(true);
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    if (input.name === "phone") {
      handleVerifPhone(input.value);
    }
    if (input.name === "email") {
      console.log("email", input.value, input.name);

      setIsValidEmail(handleVerifEmail(input.value));
    }
  };
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  
    if (name === "confirmPassword" || name === "password") {
      if (data.password !== value && name === "confirmPassword") {
        setIsConfPswrd(false);
        setPasswordError("Passwords do not match");
      } else {
        setPasswordError("");
      }
    }
  };
  const handleVerifEmail = (email) => {
    // Expression régulière pour valider l'email
    const regex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    return regex.test(email);
  };

  const handleVerifPhone = (phone) => {
    const phoneList = phone.split("").filter((n) => (n !== " " ? n : ""));
    if (isNaN(phone)) {
      setPhoneError("Phone Number Invalid");
    }
    if (phoneList.length === 8) {
      if (
        isNaN(phone) &&
        !(
          phoneList[0] === "5" ||
          phoneList[0] === "9" ||
          phoneList[0] === "2" ||
          phoneList[0] === "4"
        )
      ) {
        setPhoneError("Phone Number Invalid");
      } else {
        setPhoneError("");
      }
    }
    if (phoneList.length === 12) {
      if (
        isNaN(phoneList.slice(1, phoneList.length).join("")) &&
        !(
          phoneList[4] === "5" ||
          phoneList[4] === "9" ||
          phoneList[4] === "2" ||
          phoneList[4] === "4"
        ) &&
        !(phoneList.slice(0, 4) == ["+", "2", "1", "6"])
      ) {
        setPhoneError("Phone Number Invalid");
      } else {
        setPhoneError("");
      }
    }
    if (phoneList.length === 13) {
      if (
        isNaN(phone) &&
        !(
          phoneList[5] === "5" ||
          phoneList[5] === "9" ||
          phoneList[5] === "2" ||
          phoneList[5] === "4"
        ) &&
        !(phoneList.slice(0, 5) == ["0", "0", "2", "1", "6"])
      ) {
        setPhoneError("Phone Number Invalid");
      } else {
        setPhoneError("");
      }
    }
  };
  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.password !== data.confirmPassword) {
      setPasswordError("Passwords do not match");
      return;
    }
    if (phoneError !== "") {
      console.log("Error: Phone number");
      return;
    }
    const { confirmPassword, ...dataToSend } = data;
    try {
      const res = await signup({ ...dataToSend, profilecomplited: 20 });

      navigate("/login", { state: { signup: true } });
      console.log(res.message);
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      } else {
        console.error("An unexpected error occurred:", error);
      }
    }
  };


  const [passwordError, setPasswordError] = useState("");
  return (
    <div className={styles.backsignup}>
      <div className={styles.container}>
      <div className={styles.leftSection}>
  <img src={unow} className={styles.logo} alt="Unow Logo" />
  <div className={styles.loginContainer}>
    <div className={styles.Title}>
      <p>Sign up</p>
      <Link className={styles.Close} to="/">
        Home
        <IoMdArrowDropright />
      </Link>
    </div>
    <form className={styles.form_container} onSubmit={handleSubmit}>
      <p className={styles.text}>Name</p>
      <input
        type="text"
        id="Name"
        name="name"
        onChange={handleChange}
        value={data.name}
        required
        className={styles.input}
      />

      <p className={styles.text}>Username</p>
      <input
        type="text"
        id="UserName"
        name="userName"
        onChange={handleChange}
        value={data.userName}
        required
        className={styles.input}
      />

      <p className={styles.text}>Phone</p>
      <input
        type="text"
        id="Phone"
        name="phone"
        onChange={handleChange}
        value={data.phone}
        required
        className={styles.input}
      />
      {phoneError && <div className={styles.error_msg_Phone}>{phoneError}</div>}

      <p className={styles.text}>E-mail</p>
      <input
        type="text"
        id="Email"
        name="email"
        onChange={handleChange}
        value={data.email}
        required
        className={styles.input}
      />
      {!isValidEmail && <div className={styles.error_msg_Phone}>Invalid email</div>}

      <p className={styles.text}>Password</p>
      <div className={styles.inputPasswordContainer}>
        <input
          type={showPassword ? "text" : "password"}
          id="Password"
          name="password"
          onChange={handleChange}
          value={data.password}
          required
          className={styles.input}
        />
        <div onClick={handleClickShowPassword}>
          {showPassword ? (
            <Visibility className={styles.password_visibility} />
          ) : (
            <VisibilityOff className={styles.password_visibility} />
          )}
        </div>
      </div>

      {/* Confirm Password */}
      <p className={styles.text}>Confirm Password</p>
      <div className={styles.inputPasswordContainer}>
        <input
          type={showPassword ? "text" : "password"}
          id="ConfirmPassword"
          name="confirmPassword"
          onChange={handlePasswordChange}
          value={data.confirmPassword}
          required
          className={styles.input}
        />
    
      </div>
      {!isConfPswrd && <div className={styles.error_msg_Phone}>Password not matched </div>}
      <div className={styles.options}>
        <div className={styles.checkBox}>
          <input type="checkbox" name="remember" />
        </div>
        <label htmlFor="remember">
          <p className={styles.by}>
            {" "}
            By continuing, you agree to the <u>Terms of use</u> and{" "}
            <u> Privacy Policy.</u>{" "}
          </p>
        </label>
      </div>

      {error && <div className={styles.error_msg}>{error}</div>}
      <div className={styles.sign}>
        <button type="submit" className={styles.Signup_btn}>
          Sign Up
        </button>
        
        {/* <Link className={styles.login} to="/login">
          <p className={styles.forgetpsw}>
            <u>
              You have already one ?<IoMdArrowDropright />
            </u>{" "}
          </p>
        </Link> */}
      </div>

      <p className={styles.nvaccount}>
          You have already one ?{" "}
                <a href="/login" className={styles.loginLink}>
                  Login
                </a>
                <img 
                    src="/svg/login.svg"
                    style={{ height: 20 ,margin :"8px 2px 2px 2px"}}
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
    </div>
  );
};

export default SignUp;

// import styles from "./styles.module.css";
// import { Link, useLocation, useNavigate } from "react-router-dom";
// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import { IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";

// const SignUp = () => {
//   const location = useLocation();
//   const { errorState } = location.state || {};
//   const [data, setData] = useState({
//     name: "",
//     userName: "",
//     phone: "",
//     email: "",
//     password: "",
//     userType: "Student",
//     lastSeen: [],
//   });
//   const [error, setError] = useState(errorState);
//   const [phoneError, setPhoneError] = useState("");
//   const navigate = useNavigate();

//   const handleChange = ({ currentTarget: input }) => {
//     setData({ ...data, [input.name]: input.value });
//     if (input.name === "phone") {
//       handleVerifPhone(input.value);
//     }
//   };

//   const handleVerifPhone = (phone) => {
//     const phoneList = phone.split("").filter((n) => (n !== " " ? n : ""));
//     if (isNaN(phone)) {
//       setPhoneError("Phone Number Invalid");
//     }
//     if (phoneList.length === 8) {
//       if (
//         isNaN(phone) &&
//         !(
//           phoneList[0] === "5" ||
//           phoneList[0] === "9" ||
//           phoneList[0] === "2" ||
//           phoneList[0] === "4"
//         )
//       ) {
//         setPhoneError("Phone Number Invalid");
//       } else {
//         setPhoneError("");
//       }
//     }
//     if (phoneList.length === 12) {
//       if (
//         isNaN(phoneList.slice(1, phoneList.length).join("")) &&
//         !(
//           phoneList[4] === "5" ||
//           phoneList[4] === "9" ||
//           phoneList[4] === "2" ||
//           phoneList[4] === "4"
//         ) &&
//         !(phoneList.slice(0, 4) == ["+", "2", "1", "6"])
//       ) {
//         setPhoneError("Phone Number Invalid");
//       } else {
//         setPhoneError("");
//       }
//     }
//     if (phoneList.length === 13) {
//       if (
//         isNaN(phone) &&
//         !(
//           phoneList[5] === "5" ||
//           phoneList[5] === "9" ||
//           phoneList[5] === "2" ||
//           phoneList[5] === "4"
//         ) &&
//         !(phoneList.slice(0, 5) == ["0", "0", "2", "1", "6"])
//       ) {
//         setPhoneError("Phone Number Invalid");
//       } else {
//         setPhoneError("");
//       }
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     if (phoneError === "") {
//       navigate("/personalize", { state: { data: data } });
//     } else {
//       console.log("error Phone number");
//     }
//   };
//   return (
//     <div className={styles.backSignup}>
//       <div className={styles.SignupContainer}>
//         <Link className={styles.Close} to="/">
//           Home
//           <IoIosArrowForward size={30} />
//         </Link>
//         <div className={styles.Title}>
//           <p>Sign Up</p>
//         </div>
//         <form className={styles.form_container} onSubmit={handleSubmit}>
//           <input
//             type="text"
//             placeholder="Name..."
//             name="name"
//             onChange={handleChange}
//             value={data.name}
//             required
//             className={styles.input}
//           />

//           <input
//             type="text"
//             placeholder="Phone..."
//             name="phone"
//             onChange={handleChange}
//             value={data.phone}
//             required
//             className={styles.input}
//           />
//           {phoneError && (
//             <div className={styles.error_msg_Phone}>{phoneError}</div>
//           )}
//           <input
//             type="text"
//             placeholder="UserName..."
//             name="userName"
//             onChange={handleChange}
//             value={data.userName}
//             required
//             className={styles.input}
//           />
//           <input
//             type="email"
//             placeholder="Email..."
//             name="email"
//             onChange={handleChange}
//             value={data.email}
//             required
//             className={styles.input}
//           />

//           <input
//             type="password"
//             placeholder="Password..."
//             name="password"
//             onChange={handleChange}
//             value={data.password}
//             required
//             className={styles.input}
//           />

//           {error && <div className={styles.error_msg}>{error}</div>}
//           <button type="submit" className={styles.Signup_btn}>
//             Sign Up
//           </button>
//           <Link className={styles.login} to="/login">
//             You have already one ? <IoMdArrowDropright />
//           </Link>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default SignUp;