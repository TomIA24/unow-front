import React from "react";
import { Link } from "react-router-dom";
import styles from "./styles.module.css";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import cover from "../assets/WelcomeCover.png";
import { IoIosArrowDown } from "react-icons/io";

const Welcome = () => {
  return (
    <div className={styles.Welcome}>
      <div className={styles.wave}>
        <img src="/svg/wave.svg" alt="Wave" />
      </div>
      <div className={styles.logo}>
        <img src="/svg/logo.svg" alt="Logo" />
      </div>
      <div className={styles.description}>
        <p className={styles.title}>an innovative holistic</p>
        <p className={styles.title}>
          <span className={styles.highlight}>e-learning</span> platform
        </p>
        <p className={styles.text}>
          U!NOW is not just an e-learning platform, but a revolution in the
          field of education. Our ambition is to make learning accessible,
          flexible, engaging, and effective for everyone, from students and
          retraining professionals to companies and training organizations.
        </p>
        <ul className={styles.featuresList}>
          <li>Varied, tailored content</li>
          <li>Flexible learning formats</li>
          <li>Cutting-edge technologies for an immersive experience</li>
          <li>Modular and customizable solution</li>
          <li>Easy, universal access</li>
          <li>Attractive, flexible pricing</li>
        </ul>
        <div className={styles.buttons}>
          <a href="/signup" className={styles.signupButton}>
            Personalize your journey
          </a>
          <a href="/home" className={styles.continueButton}>
            continue
          </a>
        </div>
      </div>
      <div className={styles.coverImage}></div>
    </div>
  );
};

export default Welcome;


{
  /* <div className={styles.body}>
<img className={styles.cover} src={cover} alt="" />

<div className={styles.content_container}>
  <div className={styles.logo}>
    <Link to="/welcome">
      <a className={styles.logo_txt}>U!NOW</a>
    </Link>
  </div>
  <div className={styles.description_container}>
    <h1>
      an innovative <br /> holistic e-learning platform
    </h1>
    <div className={styles.description_content}>
      <p className={styles.content_main_text}>
        U!NOW is not just an e-learning platform, but a revolution in the
        field of education. <br />
        Our ambition is to make learning accessible, flexible, engaging
        and effective for everyone, <br />
        from students and retraining professionals to companies and
        training organizations
      </p>
      <p className={styles.content_dots}>
        {" "}
        &#x2022; Varied, tailored content
      </p>
      <p className={styles.content_dots}>
        {" "}
        &#x2022; Flexible learning formats
      </p>
      <p className={styles.content_dots}>
        {" "}
        &#x2022; Cutting-edge technologies for an immersive experience
      </p>
      <p className={styles.content_dots}>
        {" "}
        &#x2022; Modular and customizable solution
      </p>
      <p className={styles.content_dots}>
        {" "}
        &#x2022; Easy, universal access
      </p>
      <p className={styles.content_dots}>
        {" "}
        &#x2022; Attractive, flexible pricing
      </p>
    </div>
  </div>
  <div className={styles.buttons}>
    <Link to="/signup">
      <a type="button" className={styles.nav_btn_special_dark}>
        Personalize Your journey
        <IoIosArrowDown size={15} color="white" />
      </a>
    </Link>

    <Link to="/home">
      <a type="button" className={styles.nav_btn_special_light}>
        continu
      </a>
    </Link>
  </div>
</div>
</div> */
}
