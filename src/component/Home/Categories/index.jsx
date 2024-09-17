import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
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
import styles from "./styles.module.css";

const Categories = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  console.log(screenWidth);
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
    const fetchCategories = async () => {
      try {
        const config = {
          headers: {
            "X-Requested-With": "XMLHttpRequest",
            "Access-Control-Allow-Origin": `${process.env.REACT_APP_API}`,
            "Access-control-request-methods":
              "POST, GET, DELETE, PUT, PATCH, COPY, HEAD, OPTIONS",
          },
          withCredentials: true,
        };
        const response = await fetch(
          `${process.env.REACT_APP_API}api/Category/getCategories`,
          config
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
    // setSelectedCategory(category);
    navigate(
      `/categoryCourses/${category._id}/${category.Title.split(" ")
        .join("_")
        .toLowerCase()}`
    );
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
  const [opnpopup, setpopupopen] = useState(false);
  const handlepopup = () => {
    setpopupopen(!opnpopup);
    console.log(opnpopup);
  };
  const closepopup = () => {
    setpopupopen(!opnpopup);
    console.log(opnpopup);
  };
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
                // onClick={() => handlepopup()}
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
              {/* <div
                className={styles.card}
                style={{ backgroundColor: category.color }}
                onClick={() => handlepopup()}
              >
                <img
                  src={images[index % images.length]}
                  alt={category.Title}
                  className={styles.cardImage}
                />
                <p className={styles.titleName}>{category.Title}</p>
              </div> */}
            </div>
          ))}
        </Slider>
      )}
      {opnpopup && (
        <>
          <div className={styles.overlayStyles}>
            <div ref={dialogRef} className={styles.dialogStyles}>
              {/* <div className={styles.closbutton}>       <button  onClick={closepopup}>     <img
        src="/images/personalize/close.png"
        alt="bronze"

      /></button></div> */}

              <div className={styles.iamgedialog}>
                <img src="/images/home/comingSoon.png" alt="bronze" />
                <div className={styles.continuebutton}>
                  <button onClick={closepopup}>Ok</button>{" "}
                </div>
              </div>
            </div>
          </div>
        </>
      )}
      {/*       
      <Modal
        show={showModal}
        onClose={handleCloseModal}
        category={selectedCategory}
      /> */}
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
