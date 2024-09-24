import React from "react";
import Main from "../Main";
import About from "./AboutUs";
import Categories from "./Categories";
import Chatbot from "./chatbot/chatbot";
import Collab from "./Collab";
import Featured from "./Featured Trainers";
import Footer from "./Footer";
import Join from "./Join";
import styles from "./styles.module.css";
import UpSkill from "./UpSkill";

export const SectionTitle = ({ title }) => (
  <p className={styles.sectionTitle}>{title}</p>
);
const HomeInterface = () => {
  return (
    <>
      <div className={styles.container}>
        <div className={styles.background}>
          <img
            src="./images/home/backg.png"
            alt=""
            className={styles.imagebackground}
          />
        </div>
        <div className={styles.content}>
          <div className={styles.margin}>
            <Main />
          </div>
          <div className={styles.Collab}>
            <Collab />
          </div>

          <div className={styles.margin}>
            <Categories />
            <div className={styles.Featured}>
              <Featured />
            </div>

            <About />
            <UpSkill />
            <Join />
          </div>
        </div>
        <Footer />
        <Chatbot />
      </div>
    </>
  );
};

export default HomeInterface;
