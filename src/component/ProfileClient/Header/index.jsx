import React from "react";
import styles from "./styles.module.css";
import Nav from "../../Nav";
import useProfile from "../hooks/use-profile";
const Header = (props) => {
  const {  data } = useProfile();
  return (
    <div className={styles.headerContainer}>
      <Nav />
      <div className={styles.titleContainer}>
        <h1 className={styles.title}>Welcome {data?.name}</h1>
        <div className={styles.underline} />
      </div>
    </div>
  );
};

export default Header;
