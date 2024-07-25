import styles from "./styles.module.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { IoIosArrowForward, IoMdArrowDropright } from "react-icons/io";
import { signupState } from "../../recoil/signup.atom";
import { useRecoilState } from "recoil";
import { signup } from "./signup.utils";

const SignUp = () => {
  const [data, setData] = useRecoilState(signupState);

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
  const navigate = useNavigate();

  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
    if (input.name === "phone") {
      handleVerifPhone(input.value);
    }
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

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (phoneError !== "") {
        console.log("Error: Phone number");
        return;
    }

    try {
        const res = await signup(data);

        navigate("/login", { state: { signup: true } });
        console.log(res.message);
    } catch (error) {
        if (error.response && error.response.status >= 400 && error.response.status <= 500) {
            setError(error.response.data.message);
        } else {
            console.error("An unexpected error occurred:", error);
        }
    }
};

  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        backgroundImage: `url("/images/signup/wallpaper.png")`,
        backgroundSize: "cover",
        backgroundPosition: "right",
        backgroundRepeat: "no-repeat",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "50%",
          height: "100vh",
        }}
      >
        <form
          style={{
             display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        height: "100%",
          }}
          onSubmit={handleSubmit}
        >
          <Link className={styles.Close} to="/">
            Home
            <IoIosArrowForward size={17} />
          </Link>
          <span
            style={{
              width: "80%",
              fontSize: "2rem",
              marginBottom: "1.5rem",
              fontWeight: "bold",
            }}
          >
            sign up
          </span>

          <label
            htmlFor="name"
            style={{
              width: "80%",
              fontSize: "1.5rem",
            }}
          >
            Name
          </label>
          <input
            type="text"
            id="Name"
            name="name"
            onChange={handleChange}
            value={data.name}
            required
            className={styles.input}
          />
          <label
            htmlFor="name"
            style={{
              width: "80%",
              fontSize: "1.5rem",
            }}
          >
            Phone
          </label>
          <input
            type="text"
            id="Phone"
            name="phone"
            onChange={handleChange}
            value={data.phone}
            required
            className={styles.input}
          />
          {phoneError && (
            <div className={styles.error_msg_Phone}>{phoneError}</div>
          )}
          <label
            htmlFor="name"
            style={{
              width: "80%",
              fontSize: "1.5rem",
            }}
          >
            Username
          </label>
          <input
            type="text"
            id="UserName"
            name="userName"
            onChange={handleChange}
            value={data.userName}
            required
            className={styles.input}
          />
          <label
            htmlFor="name"
            style={{
              width: "80%",
              fontSize: "1.5rem",
            }}
          >
            Email
          </label>
          <input
            type="email"
            id="Email"
            name="email"
            onChange={handleChange}
            value={data.email}
            required
            className={styles.input}
          />
          <label
            htmlFor="name"
            style={{
              width: "80%",
              fontSize: "1.5rem",
            }}
          >
            Password
          </label>
          <input
            type="password"
            id="Password"
            name="password"
            onChange={handleChange}
            value={data.password}
            required
            className={styles.input}
          />

          {error && <div className={styles.error_msg}>{error}</div>}
          <button type="submit" className={styles.Signup_btn}>
            Sign Up
          </button>
          <Link className={styles.login} to="/login">
            You have already one ? <IoMdArrowDropright />
          </Link>
        </form>
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
