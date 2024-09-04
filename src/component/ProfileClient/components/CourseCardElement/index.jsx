import React from "react";
import styles from "./styles.module.css";
import useCategories from "../../hooks/use-categories";
import useProfile from "../../hooks/use-profile";
import useCourses from "../../hooks/use-courses";
import pay from "../../../assets/pay.png";
import { CourseRating } from "../../../../shared/rating";
import { Link } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";

export default function CourseElement({ course, type }) {
  const { category } = useCategories(course.Category);
  const {data} = useProfile()
  const {courses} = useCourses()
  
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
              {/* <div className={styles.buttonsContainer}>
                
              {data?.CoursesPaid.includes(course._id)?
            <div className={styles.statePrimary}>
              <FiberManualRecordIcon sx={{ fontSize: 10 }} />
              <p>paid</p>
            </div>:
            <div className={styles.stateSecondary}>
            <FiberManualRecordIcon sx={{ fontSize: 10 }} />
            <p>unpaid</p>
          </div>
            
            }  */}
            <button className={styles.textCourseFooterBtn}>
            <img src={pay} alt="send" />
              <p>Pay now</p>
             
            </button>
            {/* </div> */}
          </Link>
        </div>
      </div>
    </div>
  );
}
