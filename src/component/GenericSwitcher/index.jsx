import { AddPhotoAlternate } from "@mui/icons-material";
import { useState } from "react";
import imageCourse from "../assets/icon_course.png";
import imageTraining from "../assets/icon_training.png";

import styles from "./styles.module.css";
const GenericSwitcher = (props) => {

  return (
    <div className={styles.container}>
      {props?.items.map((item, i) => {
        return (
          <button
            className={
              props.selectedItem !== item.title
                ? styles.btnstyle
                : styles.btnselectedstyle
            }
            onClick={() => props.setSelectedItem(item.title)}
          >
            <img className={styles.image} src={item.icon} />

            <h2 className={styles.textstyle}>{item.title}</h2>
          </button>
        );
      })}
    </div>
  );
};
export default GenericSwitcher;
