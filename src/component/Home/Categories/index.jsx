import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import { request } from "../../../core/api/request";
import Icon1 from "../../assets/icon1.png";
import Icon2 from "../../assets/icon2.png";
import Icon3 from "../../assets/icon3.png";
import Icon4 from "../../assets/icon4.png";
import Icon5 from "../../assets/icon5.png";
import Icon6 from "../../assets/icon6.png";
import Icon7 from "../../assets/icon7.png";
import Icon8 from "../../assets/icon8.png";
import Next from "../../assets/next.png";
import Prev from "../../assets/prev.png";
import { SectionTitle } from "../HomeInterface";
import styles from "./styles.module.css";

const Categories = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    const handleWidthChange = () => {
      setScreenWidth(window.innerWidth);
    };

    const debouncedHandleWidthChange = debounce(handleWidthChange, 200);

    window.addEventListener("resize", debouncedHandleWidthChange);
    handleWidthChange(); // Initial call to set the width

    return () => {
      window.removeEventListener("resize", debouncedHandleWidthChange);
    };
  }, []);

  useEffect(() => {
    request
      .list("Category/getCategories")
      .then((data) => setCategories(data?.data.slice(0, 8) || []));
  }, []);

  const handleCardClick = (category) => {
    navigate(`/category/${category._id}/courses`);
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedCategory(null);
  };

  function SampleNextArrow(props) {
    const { onClick } = props;
    return (
      <div className={styles.rightArrow} onClick={onClick}>
        <img src={Next} alt="NextImage" className={styles.imageNext} />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { onClick } = props;
    return (
      <div className={styles.leftArrow} onClick={onClick}>
        <img src={Prev} alt="PrevImage" className={styles.imagePrev} />
      </div>
    );
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 2,
    slidesToScroll: 2,
    arrows: true,
    rows: 2,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const dialogRef = useRef(null);
  const images = [Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8];
 

  return (
    <div className={styles.categorieTitle}>
      <SectionTitle title="Categories" />

        <div className={styles.cardC}>
          <div className={styles.cardsContainer}>
            {categories.map((category, index) => (
              <div
                key={category._id}
                className={styles.card}
                style={{ backgroundColor: category.color }}
                onClick={() => handleCardClick(category)}
            
              >
                <img
                  src={images[index % images.length]}
                  alt={category.Title}
                  className={styles.cardImage}
                />
                <p className={styles.titleName}>{category.Title}</p>
              </div>
            ))}
          </div>
        </div>
 
    </div>
  );
};

const debounce = (func, delay) => {
  let inDebounce;
  return function () {
    const context = this;
    const args = arguments;
    clearTimeout(inDebounce);
    inDebounce = setTimeout(() => func.apply(context, args), delay);
  };
};

export default Categories;
