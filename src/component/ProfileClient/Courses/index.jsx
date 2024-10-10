import React from "react";
import styles from "./styles.module.css";

import Loading from "../../Loading";
import EmptyCourses from "../../assets/emptyCourses.png";
import CourseElement from "../components/CourseElement";
import useCourses from "../hooks/use-courses";
const Courses = () => {
  const { courses, isCoursesLoading } = useCourses();

  if (isCoursesLoading) {
    return <Loading />;
  } else {
    return (
      <div className={styles.coursesContainer}>
        <div className={styles.coursesContainerInner}>
          <div className={styles.titleContainer}>
            <h1>Courses</h1>
            <div className={styles.underline} />
          </div>
          {courses.length > 0 ? (
            <div className={styles.coursesInner}>
              {courses.map((course) => (
                <CourseElement course={course} type="Course" />
              ))}
            </div>
          ) : (
            <div className={styles.courses}>
              <img src={EmptyCourses} alt="" />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Courses; 