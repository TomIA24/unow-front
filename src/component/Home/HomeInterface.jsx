import React from "react";
import Categories from "./Categories";
import Featured from "./Featured Trainers";
import About from "./AboutUs";
import UpSkill from "./UpSkill";
import Footer from "./Footer";
import Main from "../Main";
import styles from "./styles.module.css";
import Join from "./Join";
import Collab from "./Collab";
import Chatbot from "./chatbot/chatbot";

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
