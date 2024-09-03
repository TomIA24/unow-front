import React from "react";
import styles from "./styles.module.css";
import useCategories from "../../hooks/use-categories";
import send from "../../../assets/paper.png";
import { StarRounded } from "@mui/icons-material";
import { CourseRating } from "../../../../shared/rating";
import { Link } from "react-router-dom";
export default function CourseElement({ course, type }) {
  const { category } = useCategories(course.Category);

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
            {CourseRating(course?._id, course?.rating, course?.evaluate.length)}
          </div>
          <Link
            key={course._id}
            to={{ pathname: `/${type}/${course._id}` }}
            onClick={() => {
              window.scrollTo(0, 0);
            }}
          >
            <button className={styles.textCourseFooterBtn}>
              <p>Go Course</p>
              <img src={send} alt="send" />
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
