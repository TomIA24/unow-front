import React, { useState, useRef } from 'react';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import styles from "./styles.module.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 1,
    slidesToSlide: 1,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 1,
    slidesToSlide: 1,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
    slidesToSlide: 1,
  },
};

export const Header = () => {
  const images = [
    // "/images/home/unw.jpeg",
    "/images/home/explore-banner.jpg",
    "/images/home/build-banner.png",
    //"/images/home/webinar.png",
    // "/images/home/header.png",
    // "/images/home/background-image.png",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef(); // Création d'une référence

  const goToSlide = (index) => {
    setCurrentIndex(index);
    if (carouselRef.current) {
      carouselRef.current.goToSlide(index); // Utilisation de la référence pour changer la diapositive
    }
  };

  const CustomDotGroup = () => {
    return (
      <div className={styles.customDotContainer}>
        {images.map((_, index) => (
          <div
            key={index}
            className={`${styles.customDot} ${index === currentIndex ? styles.active : ''}`}
            onClick={() => goToSlide(index)} // Lier le point à la diapositive correspondante
          ></div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <Carousel
        ref={carouselRef} // Ajout de la référence ici
        swipeable={true}
        draggable={true}
        responsive={responsive}
        ssr={false}
        arrows={false}
        infinite={true}
        autoPlay={true}
        autoPlaySpeed={5000}
        keyBoardControl={true}
        customTransition="all 0.5"
        transitionDuration={500}
        containerClass="carousel-container"
        removeArrowOnDeviceType={["tablet", "mobile"]}
        dotListClass="custom-dot-list-style"
        itemClass="carousel-item-padding-40-px"
        customButtonGroup={<CustomDotGroup />}
        beforeChange={(nextSlide) => setCurrentIndex(nextSlide)} // Met à jour l'index avant le changement
      >
        {images.map((i, index) => (
          <div key={index}>
            <img src={i} alt={`Slide ${index + 1}`} className={styles.header} />
          </div>
        ))}
      </Carousel>
    </div>
  );
};
