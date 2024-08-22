import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";
import Nav from "../../Nav";

const Header = (props) => {
  return (
    <div className={styles.headerContainer}>
      <Nav />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Welcome Candidat</h1>
        <div className={styles.underline} />
      </div>
    </div>
  );
};

export default Header;
