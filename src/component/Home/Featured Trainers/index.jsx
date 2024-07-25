import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";


const Featured = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [trainers, setTrainers] = useState([]);
  const [windowWidth, setWindowWidth] = useState(0);
  const [itemsPerPage, setItemsPerPage] = useState(3);

  useEffect(() => {
    // Fetch data from the API
    fetch("http://localhost:5050/api/Trainer/trainers")
      .then((response) => response.json())
      .then((data) => {
        // Handle the case when image is missing
        const updatedData = data.trainers.map((trainer) => ({
          ...trainer,
          image:  `http://localhost:5050/api/${trainer.image.filePath}` 
        }));
        setTrainers(updatedData);
      })
      .catch((error) => console.error("Error fetching data:", error));
  }, []);

  useEffect(() => {
    const handleWidthChange = () => {
      const currentWidth = window.innerWidth;
      setWindowWidth(currentWidth);
    };

    handleWidthChange();
    window.addEventListener("resize", handleWidthChange);
    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, []);

  useEffect(() => {
    if (windowWidth <= 900) {
      setItemsPerPage(2);
    } else {
      setItemsPerPage(3);
    }
  }, [windowWidth]);

  const next = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex + itemsPerPage >= trainers.length ? 0 : prevIndex + itemsPerPage
    );
  };

  const prev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex - itemsPerPage < 0
        ? trainers.length - itemsPerPage
        : prevIndex - itemsPerPage
    );
  };

  const currentData = trainers.slice(currentIndex, currentIndex + itemsPerPage);

  return (
    <>
      <div className={styles.featuredTitle} >
        FEATURED TRAINERS
        <p className={styles.underline}></p>
      </div>
      <div className={styles.featuredContainer}>
        <div>
      <button onClick={prev}    className={styles.arrowButton}>
          <img src="./images/trainers/left.png" alt=""  className={styles.arrows}   />
         
          </button>
          </div>
        <div className={styles.cardsWrapper}>
      
          <div className={styles.cardsContainer}>
            {currentData.map((trainer) => (
              <div className={styles.card} key={trainer._id}>
                <div className={styles.imageWrapper}>
                  <img
                    src={trainer.image}
                    alt={trainer.name}
                    className={styles.cardImage}
                  />
                </div>
                <div className={styles.cardContent}>
                  <h3 className={styles.titleName}>{trainer.name}</h3>
                  <p className={styles.description}>{trainer.description}</p>
                </div>
              </div>
            ))}
          </div>
        
        </div>
        <div>
        <button onClick={next}    className={styles.arrowButton}>
          <img src="./images/trainers/right.png" alt=""   className={styles.arrows}  />
          </button>
          </div>
      </div>
    </>
  );
};

export default Featured;