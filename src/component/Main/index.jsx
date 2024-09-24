import React, { useEffect, useRef, useState } from "react";
import loupe from "../assets/loupe.png";
import styles from "./styles.module.css";
// import Google from "../assets/Google.png";
// import Oxford from "../assets/Oxford.png";
// import Microsoft from "../assets/Microsoft.png";
// import IBM from "../assets/IBM.png";
// import Cambridge from "../assets/Cambridge.png";

import axios from "axios";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
// import logo from "../assets/logo2.jpg"
import CourseTrainingCard from "../CourseTrainingCard";
import Nav from "../Nav";
import { Header } from "./Header/header";

const Main = () => {
  const [currentTrainings, setCurrentTrainings] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [WindowWidth, setWindowWidth] = useState(0);
  const [trainingsPerPage, settrainingsPerPage] = useState(3);

  const indexOfFirstTraining = (currentPage - 1) * trainingsPerPage;
  const indexOfLastTraining = currentPage * trainingsPerPage;

  const handleWidthChange = () => {
    const currentWidth = window.innerWidth;
    setWindowWidth(currentWidth);
  };

  useEffect(() => {
    handleWidthChange();
    window.addEventListener("resize", handleWidthChange);
    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, []);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [trainingsResponse, coursesResponse] = await Promise.all([
          axios.get(`${process.env.REACT_APP_API}api/trainings`),
          axios.get(`${process.env.REACT_APP_API}api/courses`),
        ]);

        const combinedData = [
          ...trainingsResponse.data.data.map((item) => ({
            ...item,
            type: "training",
          })),
          ...coursesResponse.data.data.map((item) => ({
            ...item,
            type: "course",
          })),
        ];

        setTrainings(combinedData);

        const currentData = combinedData.slice(
          indexOfFirstTraining,
          indexOfLastTraining
        );
        setCurrentTrainings(currentData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [currentPage, indexOfFirstTraining, indexOfLastTraining]);

  useEffect(() => {
    //console.log(WindowWidth)
    if (WindowWidth <= 817) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(2);
    }
  }, [WindowWidth]);

  const refHome = useRef(null);

  const carouselRef = useRef(null);

  useEffect(() => {
    //console.log(WindowWidth)
    if (WindowWidth <= 817) {
      settrainingsPerPage(2);
    } else {
      settrainingsPerPage(3);
    }
  }, [WindowWidth]);

  const nextPage = () => {
    if (currentPage < Math.ceil(trainings.length / trainingsPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
  return (
    <div className={styles.body}>
      <div>
        {/* <div className={styles.containerimage}><img src="./images/home/background.png" alt="" className={styles.imagebackground} /></div> */}
        <Nav />
        <div className={styles.motivationImg}>
          <div className={styles.textcontainer}>
            <div className={styles.textsearchtitle}>
              Let's build the future together
            </div>
            <div className={styles.textsearch}>
              “Coming together is a beginning, keeping together is progress,
              working together is success.”
              <div className={styles.textsearch2}> Henry Ford</div>
              <br />
            </div>
          </div>

          <div className={styles.explore_container}>
            <button
              className={styles.explore_btn}
              type="button"
              onClick={() => {}}
            >
              Explore
            </button>
            <div className={styles.explore_line} />
            <input
              type="text"
              placeholder="Type here..."
              className={styles.explore_input}
            />
            <div className={styles.explore_line} />
            <button
              className={styles.search_btn}
              type="button"
              onClick={() => {}}
            >
              <img src={loupe} alt="" className={styles.icon_search} />
            </button>
          </div>
        </div>
        <Header />

        <div className={styles.sectionThree}>
          <div className={styles.features}>
            FEATURED PRODUCTS
            <p className={styles.underline}></p>
          </div>
          <div className={styles.topTrainingElements}>
            <div>
              <button className={styles.arrowButton} onClick={prevPage}>
                <img
                  src="./images/home/left.png"
                  alt="Description of the image"
                  className={styles.arrows}
                />
              </button>
            </div>
            <div className={styles.carousel} ref={carouselRef}>
              {currentTrainings.map((training) => (
                <CourseTrainingCard
                  id={training._id}
                  key={training._id}
                  thumbnail={training.Thumbnail.filePath}
                  title={training.Title}
                  category={training.Category}
                  price={training.Price}
                  level={training.Level}
                  rating={training.rating || 0}
                  type={training.type}
                />
              ))}
            </div>
            <div>
              <button
                className={styles.arrowButton}
                onClick={nextPage}
                disabled={
                  currentPage === Math.ceil(trainings.length / trainingsPerPage)
                }
              >
                <img
                  src="./images/home/right.png"
                  alt="Description of the image"
                  className={styles.arrows}
                />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Main;
