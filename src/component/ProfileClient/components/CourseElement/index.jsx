import React from "react";
import styles from "./styles.module.css";
import useCategories from "../../hooks/use-categories";
import send from "../../../assets/paper.png";
import { StarRounded } from "@mui/icons-material";
export default function CourseElement({ course }) {
  console.log(course);
  const { category } = useCategories(course.Category);
  console.log(category);
  return (
    <div className={styles.courseContainerElement}>
      <div className={styles.imgCourseContainer}>
        <img
          src={`${process.env.REACT_APP_API}${course.Thumbnail.filePath}`}
          alt="course"
        />
      </div>
      <div className={styles.textCourseContainer}>
        <div
          className={styles.textCourseHeader}
          style={{ backgroundColor: category?.color }}
        >
          <p>{category?.Title}</p>
        </div>

        <div className={styles.textCourseBody}>
          <p>{course?.Level}</p>
          <h1>{course?.Title}</h1>
        </div>
        <div className={styles.textCourseFooter}>
          <div className={styles.ratingContainer}>
            <StarRounded style={{ color: "yellow", fontSize: 15 }} />

            <p className={styles.ratingText}>({course?.rating})</p>
          </div>
          <button className={styles.textCourseFooterBtn}>
            <p>Go Course</p>
            <img src={send} alt="send" />
          </button>
        </div>
      </div>
    </div>
  );
}