import React, { useEffect, useMemo, useRef, useState } from "react";
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
import AddIcCallIcon from "@mui/icons-material/AddIcCall";
import HomeIcon from "@mui/icons-material/Home";
import InfoIcon from "@mui/icons-material/Info";
import { CiSearch } from "react-icons/ci";
import { useNavigate } from "react-router-dom";
import CourseTrainingCard from "../CourseTrainingCard";
import Nav from "../Nav";
import Spotlight from "../Spotlight";
import { Header } from "./Header/header";

const Main = () => {
  const [currentTrainings, setCurrentTrainings] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [courses, setCourses] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [WindowWidth, setWindowWidth] = useState(0);
  const [trainingsPerPage, settrainingsPerPage] = useState(3);
  const navigate = useNavigate();

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

  const [isOpen, setIsOpen] = useState(false);
  const openSpotlight = () => setIsOpen(true);
  const closeSpotlight = () => setIsOpen(false);

  const actions = useMemo(() => {
    return [
      {
        id: "home",
        label: "Home",
        description: "Go to home page",
        onClick: () => navigate("/home"),
        leftSection: <HomeIcon color="disabled" />,
      },
      {
        id: "about",
        label: "About",
        description: "View about",
        onClick: () => navigate("/about"),
        leftSection: <InfoIcon color="disabled" />,
      },
      {
        id: "contact",
        label: "Contact",
        description: "Go to contact page",
        onClick: () => navigate("/contact"),
        leftSection: <AddIcCallIcon color="disabled" />,
      },
    ];
  }, []);
  const [currency, setCurrency] = useState(null);
  const [error, setError] = useState(null);
  const currencies = {
  "Algeria": { currency: "Algerian dinar", code: "DZD" },
  "Belgium": { currency: "Euro", code: "EUR" },
  "Canada": { currency: "Canadian dollar", code: "CAD" },
  "France": { currency: "Euro", code: "EUR" },
  "Germany": { currency: "Euro", code: "EUR" },
  "Morocco": { currency: "Moroccan dirham", code: "MAD" }, 
  "Tunisia": { currency: "Tunisian dinar", code: "TND" },
  "Egypt": { currency: "Egyptian pound", code: "EGP" },
  "United Kingdom": { currency: "Pound sterling", code: "GBP" },
  "United States": { currency: "United States dollar", code: "USD" },
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
      
        const ipResponse = await axios.get('https://api.ipify.org?format=json');
        const ip = ipResponse.data.ip; 
        const countryResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
        const country = countryResponse.data.country_name;
        const currencyData = currencies[country];

        if (currencyData) {
          setCurrency(currencyData);
        } else {
          setError('Monnaie non trouvée pour ce pays');
        }
      } catch (err) {
        setError('Erreur lors de la récupération des données');
        console.error(err);
      }
    };

    fetchCurrency();
  }, []);
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

          <div className={styles.explore_container} onClick={openSpotlight}>
            <button className={styles.explore_btn} type="button">
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
                  alt="Description"
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
                  currency={currency?.code}
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
                  alt="Description"
                  className={styles.arrows}
                />
              </button>
            </div>
          </div>
        </div>
      </div>

      <Spotlight
        actions={actions}
        nothingFound="No results found"
        searchProps={{
          leftSection: <CiSearch />,
          placeholder: "Search...",
        }}
        isOpen={isOpen}
        onClose={closeSpotlight}
      />
    </div>
  );
};

export default Main;
