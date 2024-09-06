import React from "react";

import styles from "./styles.module.css";

import Loading from "../../Loading";
import useCart from "../hooks/use-cart";
import Empty from "../../assets/empty.png";
import CourseElement from "../components/CourseCardElement";

const Cart = ({ user }) => {
  const {
    data,
    cart,
    loading,
    isCoursesLoading,
    isTrainingsLoading,
    handleCourse,
    handleTraining,
    handleBuySTRIPE,
  } = useCart();

  

  return (
    <div className={styles.leftSectionProfile}>
      <div className={styles.CartDiv}>
        <div className={styles.titleContainer}>
          <h1>Courses</h1>
          <div className={styles.underline} />
        </div>
        <div className={styles.carouselDivContainer}>
          <div className={styles.carouselDiv}>
            {isCoursesLoading ? (
              <Loading />
            ) : (
              <>
                {cart?.courses?.length > 0 ? (
                  <div className={styles.coursesInner}>
                    {cart?.courses?.map((course) => (
                      <CourseElement course={course} type="Course" />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyBox}>
                    <img src={Empty} alt="" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      <div className={styles.CartDiv}>
        <div className={styles.titleContainer}>
          <h1>Trainings</h1>
          <div className={styles.underline} />
        </div>
        <div className={styles.carouselDivContainer}>
          <div className={styles.carouselDiv}>
            {isTrainingsLoading ? (
              <Loading />
            ) : (
              <>
                {cart?.trainings?.length > 0 ? (
                  <div className={styles.coursesInner}>
                    {cart?.trainings?.map((course) => (
                      <CourseElement course={course} type="Training" />
                    ))}
                  </div>
                ) : (
                  <div className={styles.emptyBox}>
                    <img src={Empty} alt="" />
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
