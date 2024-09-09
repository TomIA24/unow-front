import React, { useState, useRef } from "react";
import styles from "./styles.module.css";
import useCategories from "../../hooks/use-categories";
import useProfile from "../../hooks/use-profile";
import pay from "../../../assets/pay.png";
import { CourseRating } from "../../../../shared/rating";
import { Link, useNavigate } from "react-router-dom";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import x from "./+.png";
import axios from "axios";

export default function CourseElement({ course, type }) {
  const { category } = useCategories(course.Category);
  const { data } = useProfile();
  const [openPopup, setOpenPopup] = useState(false);
  const dialogRef = useRef();
  const token = localStorage.getItem("token");
  const handleBuySTRIPE = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `${process.env.REACT_APP_API}api/payment/course`;
      await axios.post(url, { courseId: course._id }, config).then((res) => {
        window.location = res.data.url;
      });
    } catch (error) {
      // console.error(error)
    }
  };
  const togglePopup = () => {
    setOpenPopup(!openPopup);
  };
  const navigate = useNavigate();

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
          {/* <Link
            key={course._id}
            to={{ pathname: `/${type}/${course._id}` }}
            onClick={() => {
          >
            
              <p className={styles.price}>{course?.Price}DT</p>
              <div className={styles.underline}/>
              {data?.CoursesPaid.includes(course._id)?
            <div className={styles.statePrimary}>
              <FiberManualRecordIcon sx={{ fontSize: 10 }} />
              <p >paid</p>
            </div>:
            <div className={styles.stateSecondary}>
            <FiberManualRecordIcon sx={{ fontSize: 10 }} />
            <p>unpaid</p>
          </div>
            
            } 
            <button className={styles.textCourseFooterBtn}>
            <img src={pay} alt="send" />
              <p>Pay now</p>
             
            </button>
            </div>
          </Link>
        </div>
      </div>
 
          > */}
          <div className={styles.buttonsContainer}>
            <p className={styles.price}>{course?.Price}DT</p>
            <div className={styles.underline} />
            {data?.CoursesPaid?.includes(course._id) ? (
              <div className={styles.statePrimary}>
                <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                <p>paid</p>
              </div>
            ) : (
              <div className={styles.stateSecondary}>
                <FiberManualRecordIcon sx={{ fontSize: 10 }} />
                <p>unpaid</p>
              </div>
            )}

            {data?.CoursesPaid?.includes(course._id) ? (
              <Link
                to={{
                  pathname: `/${type}/${course._id}`,
                }}
                className={styles.textCourseFooterBtn}
              >
                <img src={pay} alt="send" />
                <p>Go Course</p>
              </Link>
            ) : (
              <button
                className={styles.textCourseFooterBtn}
                onClick={course.Price === "0" ? handleBuySTRIPE : togglePopup}
              >
                <img src={pay} alt="send" />
                <p>Pay now</p>
              </button>
            )}
          </div>
          {/* </Link> */}
        </div>
      </div>

      {/* Overlay Popup */}
      {openPopup && (
        <div className={styles.overlayStyles}>
          <div ref={dialogRef} className={styles.dialogStyles}>
            <div className={styles.iamgedialog}>
              <a href="/profile">
                <img src={x} alt="" className={styles.back} />
              </a>
              <p>
                To proceed to payment Please{" "}
                <a href="/contact">
                  <button>Contact us</button>
                </a>
                And will be get to you ASAP
              </p>
              <div className={styles.continuebutton}></div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
