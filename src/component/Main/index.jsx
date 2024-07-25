import styles from "./styles.module.css";
import { Link, Route, Routes, Navigate } from "react-router-dom";
import React, { useRef, useEffect, useState } from "react";
import { ImSearch } from "react-icons/im";
import Box from "@mui/material/Box";
import Rating from "@mui/material/Rating";
import StarIcon from "@mui/icons-material/Star";
import courseImg from "../assets/courseImg.svg";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import img from "../assets/courseImg.svg";
import loupe from "../assets/loupe.png";
import imgUK from "../assets/UK.svg";
import avatar1 from "../assets/avatar1.jpg";
import avatar2 from "../assets/avatar2.jpg";
import avatar3 from "../assets/avatar3.jpg";
import Typography from "@mui/material/Typography";
import { MdArrowForwardIos } from "react-icons/md";
// import Google from "../assets/Google.png";
// import Oxford from "../assets/Oxford.png";
// import Microsoft from "../assets/Microsoft.png";
// import IBM from "../assets/IBM.png";
// import Cambridge from "../assets/Cambridge.png";
import Scrum from "../assets/partners/scrum.png";
import Peoplecert from "../assets/partners/Peoplecert.svg";
import Axelos from "../assets/partners/axelos.png";
import DevOps from "../assets/partners/devOps Institute.png";
import Exin from "../assets/partners/exin.svg";
import PMI from "../assets/partners/pmi_new_logo.png";
import SAFe from "../assets/partners/SAFe.png";
import bill from "../assets/bill.png";

import { SiFacebook, SiTwitter, SiLinkedin } from "react-icons/si";
import axios from "axios";

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { motion } from "framer-motion";
import { Swipeable } from "react-swipeable";
// import logo from "../assets/logo2.jpg"
import Footer from "../footer";
import ApplyTrainer from "./ApplyTrainer";
import imgLogo from "../assets/logo.jpg";
import Tooltip from "@mui/material/Tooltip";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import Nav from "../Nav";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import CategorySlider from "./sliderPoints";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import { Header } from "./Header/header";
const Main = () => {


  const [WindowWidth, setWindowWidth] = useState(0);
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

  const [trainings, setTrainings] = useState([]);

  useEffect(() => {
    axios
      .post("http://localhost:5050/api/trainings")
      .then((response) => {
        setTrainings(response.data.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);


  useEffect(() => {
    //console.log(WindowWidth)
    if (WindowWidth <= 817) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(2);
    }
  }, [WindowWidth]);

  const refHome = useRef(null);
  const [currentPage, setCurrentPage] = useState(1);
  const carouselRef = useRef(null);
  const [trainingsPerPage, settrainingsPerPage] = useState(3);
  useEffect(() => {
    //console.log(WindowWidth)
    if (WindowWidth <= 817) {
      settrainingsPerPage(2);
    } else {
      settrainingsPerPage(3);
    }
  }, [WindowWidth]);

  const indexOfLastTraining = currentPage * trainingsPerPage;
  const indexOfFirstTraining = indexOfLastTraining - trainingsPerPage;
  const currentTrainings = trainings.slice(indexOfFirstTraining, indexOfLastTraining);

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
    <React.Fragment className={styles.body}>

      <div style={{ backgroundColor: 'background: #f9f9f9;' }}>
        {/* <div className={styles.containerimage}><img src="./images/home/background.png" alt="" className={styles.imagebackground} /></div> */}
        <Nav ref={refHome} />
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
          {/* <div className={styles.sectionTwo}> */}

          <div className={styles.explore_container}>

            <button
              className={styles.explore_btn}
              type="button"
              onClick={() => { }}
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
              onClick={() => { }}
            >
              <img src={loupe} alt=""  className={styles.icon_search} />
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
            <button
             className={styles.arrowButton} 
              onClick={prevPage}
            >
              <img src="./images/home/left.png" alt="Description of the image" className={styles.arrows}/>
            </button>
            </div>
            <div className={styles.carousel} ref={carouselRef}>
              {currentTrainings.map((training) => (
                <div className={styles.inner_carousel} key={training._id}>
                  {training.Thumbnail && training.Thumbnail.filePath ? (
                    <div className={styles.image}>
                      <img src={`http://localhost:5050/api/${training.Thumbnail.filePath}`} alt={training.Title} className={styles.imagefeatures} />

                    </div>
                  ) : (
                    <div className={styles.image}>
                      <img src="default-image.png" alt="Default" className={styles.imagefeatures} /></div>
                  )}
                  <div>
                    <div className={styles.categorie}>
                      <div className={styles.categorietype}>{training.Category}</div>
                      <div className={styles.categoriprice}>{training.Price} $</div>
                    </div>
                    <div className={styles.categoriniveau}>{training.Level}</div>
                    <div className={styles.categoridomain}>{training.Title}</div>
                  </div>
                </div>
              ))}
            </div>
            <div>
            <button
             className={styles.arrowButton}
              onClick={nextPage}
              disabled={currentPage === Math.ceil(trainings.length / trainingsPerPage)}
            >
              <img src="./images/home/right.png" alt="Description of the image" className={styles.arrows}/>
            </button>
            </div>
          </div>
        </div>

      </div>

    </React.Fragment>
  );
};

export default Main;
