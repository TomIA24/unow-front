import React from "react";
import { Link } from "react-router-dom";
import useCurrency from "../../hooks/useCurrency.js";
import styles from "./styles.module.css";

const CourseTrainingCard = ({
  id,
  thumbnail,
  title,
  category,
  price,
  level,
  rating,
  type
}) => {
  const { currency, error } = useCurrency();
  console.log("currency", currency?.code);
  return (
    <Link to={`/${type}/${id}`} key={id}>
      <div key={id} className={styles.container}>
        <img
          src={`${process.env.REACT_APP_API}${thumbnail}`}
          className={styles.image}
          alt=""
        />

        <div className={styles.content}>
          <div className={styles.text}>
            <p>{category}</p>

            <p>
              {price} {currency?.code}
            </p>
          </div>

          <div className={styles.title}>
            <p>{level}</p>
            <p>{title}</p>
          </div>

          {/* <div className={styles.rating}>
            <span>⭐ {rating} (750)</span>
            <div className={styles.stars}>
              <div className={styles.avatarGroup}>
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt=""
                />
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt=""
                />
                <img
                  src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png"
                  alt=""
                />
              </div>
              <span>3k+</span>
            </div>
          </div> */}

          <div className={styles.type}>
            <img
              src={`${
                type === "training"
                  ? "./images/trainingsIcon.png"
                  : "./images/coursesIcon.png"
              }`}
              alt=""
            />
          </div>
          <button>+</button>
        </div>
      </div>
    </Link>
  );
};

export default CourseTrainingCard;
