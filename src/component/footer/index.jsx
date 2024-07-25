import styles from "./styles.module.css";
import axios from "axios";
import React, { useState } from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
const Footer = ({ refHome }) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  const [saved, setSaved] = useState(false);
  const [email, setEmail] = useState({ email: "" });

  const handleChange = async (e) => {
    setEmail({ email: e.target.value });
  };

  const handleNewsletter = async () => {
    const config = {
      headers: {},
    };
    try {
      const url = `${process.env.REACT_APP_API}/api/newsletter/`;
      await axios.post(url, { email: email }).then(async (res) => {
        setSaved(true);
        setEmail({ email: "" });
        await new Promise((r) => {
          setTimeout(r, 2000);
        });
        setSaved(false);
      });
    } catch (error) {}
  };

  return (
    <footer className={styles.footer}>
      <div className={[styles.container, styles.row].join(" ")}>
        <div className={styles.footercol}>
          <h4>company</h4>
          <ul>
            <li>
              <a href="#">about us</a>
            </li>
            <li>
              <a href="#">our services</a>
            </li>
            <li>
              <a href="#">privacy policy</a>
            </li>
            <li>
              <a href="#">visit website</a>
            </li>
          </ul>
        </div>
        <div className={styles.footercol}>
          <h4>get help</h4>
          <ul>
            <li>
              <a href="#">FAQ</a>
            </li>
            <li>
              <a href="#">learning</a>
            </li>
            <li>
              <a href="#">courses</a>
            </li>
            <li>
              <a href="#">status</a>
            </li>
            <li>
              <a href="#">payment options</a>
            </li>
          </ul>
        </div>
        <div className={styles.footercol}>
          <h4>online classrooms</h4>
          <ul>
            <li>
              <a href="#">download</a>
            </li>
            <li>
              <a href="#">changelog</a>
            </li>
            <li>
              <a href="#">rooms</a>
            </li>
            <li>
              <a href="#">all version</a>
            </li>
          </ul>
        </div>
        <div className={styles.footercol}>
          <h4>follow us</h4>
          <div className={styles.sociallinks} style={{ display: "flex" }}>
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <FacebookIcon />
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <InstagramIcon />
            </a>
            <a
              href="#"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <LinkedInIcon />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
