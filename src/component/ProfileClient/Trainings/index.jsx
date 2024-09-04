import React from "react";
import styles from "./styles.module.css";

import Loading from "../../Loading";
import Empty from "../../assets/empty.png";
import CourseElement from "../components/CourseElement";
import useTrainings from "../hooks/use-trainings";
const Trainings = () => {
  const { trainings, isTrainingsLoading } = useTrainings();

  if (isTrainingsLoading) {
    return <Loading />;
  } else {
    return (
      <div className={styles.coursesContainer}>
        <div className={styles.coursesContainerInner}>
          <div className={styles.titleContainer}>
            <h1>Trainings</h1>
            <div className={styles.underline} />
          </div>
          {trainings.length > 0 ? (
            <div className={styles.coursesInner}>
              {trainings.map((course) => (
                <CourseElement course={course} type="Training" />
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

export default Trainings;

 