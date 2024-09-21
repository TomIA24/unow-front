import React, { memo } from "react";
import { Link } from "react-router-dom";
import { CourseRatingSimpleView } from "../../shared/rating";
import markIcon from "../assets/markIcon.png";
import plusIcon from "../assets/plusIcon.png";
import styles from "./styles.module.css";

const ResourceCard = memo(({ training }) => {
  const {
    _id,
    type,
    Thumbnail,
    Title,
    Category,
    Price,
    Level,
    rating = 0,
    evaluate = [],
  } = training;

  const getImageSrc = () => {
    return (
      Thumbnail &&
      Thumbnail.filePath &&
      `${process.env.REACT_APP_API}${Thumbnail.filePath}`
    );
  };
  return (
    <Link to={`/${type === "course" ? "Course" : "Training"}/${_id}`} key={_id}>
      <div className={styles.inner_carousel}>
        <div className={styles.image}>
          <img
            src={getImageSrc()}
            alt={Title || "Default Image"}
            className={styles.imagefeatures}
          />
        </div>
        <div className={styles.containernote}>
          <div className={styles.categorie}>
            <div className={styles.categorietype}>{Category}</div>
            <div className={styles.categoriprice}>{Price} $</div>
          </div>
          <p className={styles.niveau}>{Level}</p>
          <p className={styles.descr}>{Title}</p>
          <div className={styles.ravi}>
            <div className={styles.notes}>
              {CourseRatingSimpleView(_id, rating, evaluate.length)}
            </div>
            <div className={styles.markes}>
              <img src={markIcon} alt="mark icon" className={styles.mark} />
              <p className={styles.numnote2}>3k</p>
            </div>
          </div>
        </div>
        <div className={styles.pluses}>
          <img src={plusIcon} alt="plus icon" className={styles.plus} />
        </div>
      </div>
    </Link>
  );
});

export default ResourceCard;
