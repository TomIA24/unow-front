import React from "react";
import CourseCard from "../CourseCard";
import styles from "./styles.module.css";

const CourseGrid = ({ courses }) => {
  return (
    <div className={styles.courseGrid}>
      {courses.map((course, index) => (
        <CourseCard key={index} course={course} />
      ))}
    </div>
  );
};

export default CourseGrid;
