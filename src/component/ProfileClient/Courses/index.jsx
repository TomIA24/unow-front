import React from "react";
import styles from "./styles.module.css";

import Loading from "../../Loading";
import useProfile from "../hooks/use-profile";
import Empty from "../../assets/empty.png";
import CourseElement from "../components/CourseElement";
const Courses = () => {
  const { courses, isCoursesLoading } = useProfile();

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
              <img src={Empty} alt="" />
            </div>
          )}
        </div>
      </div>
    );
  }
};

export default Courses; 