import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Icon1 from "../../assets/icon1.png";
import Icon2 from "../../assets/icon2.png";
import Icon3 from "../../assets/icon3.png";
import Icon4 from "../../assets/icon4.png";
import Icon5 from "../../assets/icon5.png";
import Icon6 from "../../assets/icon6.png";
import Icon7 from "../../assets/icon7.png";
import Icon8 from "../../assets/icon8.png";
import Modal from "./Categoriemodal";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Prev from "../../assets/prev.png";
import Next from "../../assets/next.png";

const Categories = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  console.log(screenWidth);
  const [showModal, setShowModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [categories, setCategories] = useState([]);

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
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${process.env.REACT_APP_API}api/Category/getCategories`
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        setCategories(result.data.slice(0, 8)); // Only take the first 8 categories
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  const handleCardClick = (category) => {
    setSelectedCategory(category);
    setShowModal(true);
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

  const images = [Icon1, Icon2, Icon3, Icon4, Icon5, Icon6, Icon7, Icon8];

  return (
    <div className={styles.categorieTitle}>
      CATEGORIES
      <p className={styles.underline}></p>
      <div className={styles.categorieContainer}></div>
      {screenWidth >= 700 ? (
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
      ) : (
        <Slider {...settings} className={styles.slider}>
          {categories.map((category, index) => (
            <div key={category._id} className={styles.cardWrapper}>
              <div
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
            </div>
          ))}
        </Slider>
      )}
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        category={selectedCategory}
      />
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
