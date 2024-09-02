import React from "react";
import styles from "./styles.module.css";

const CourseCard = ({ course }) => {
  return (
    <div className={styles.courseCard}>
      <img
        src={course.image}
        alt={course.title}
        className={styles.courseImage}
      />
      <div className={styles.courseContent}>
        <div
          className={styles.courseTag}
          style={{ backgroundColor: course.tagColor }}
        >
          {course.tag}
        </div>
        <div className={styles.coursePrice}>{course.price} $</div>
        <p className={styles.courseLevel}>{course.level}</p>
        <h3 className={styles.courseTitle}>{course.title}</h3>
        <div className={styles.courseFooter}>
          <div className={styles.rating}>
            <span>⭐</span> {course.rating} ({course.reviews})
          </div>
          <div className={styles.info}>
            <span>👤 {course.students}</span>
            <span>⏱️ {course.hours}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CourseCard;
