import React from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "../Contact/styles.module.css";
import Nav from "../Nav";
import Footer from "../footer";
import style from "./styles.module.css";

const TrainingCatalog = () => {
  const importAll = (r) =>
    r
      .keys()
      .map(r)
      .sort((a, b) => {
        // Tri des images par ordre numérique
        const fileNameA = parseInt(a.match(/\d+/)[0], 10);
        const fileNameB = parseInt(b.match(/\d+/)[0], 10);
        return fileNameA - fileNameB;
      });
  const images = importAll(
    require.context("../assets/catalog image", false, /\.jpg$/)
  );
  const flipbookWidth = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--flipbook-width");
  const flipbookHeight = getComputedStyle(
    document.documentElement
  ).getPropertyValue("--flipbook-height");

  return (
    <React.Fragment>
      <div className={styles.nav}>
        <Nav />
        <div className={styles.containerimage}>
          <div className="catalog">
            <div className={styles.contactus}>
              <p className={styles.contact}>Training Catalog</p>
              <p className={styles.underline}></p>
            </div>
          </div>
        </div>
      </div>
      <div
        className="appWrapper"
        style={{
          height: "600px",
          marginTop: "30px",
        }}
      >
        <div className={style.test}>
          <HTMLFlipBook
            width={parseInt(flipbookWidth, 10)}
            height={parseInt(flipbookHeight, 10)}
            useSinglePage={true}
            showCover={true}
          >
            <div className="demoPage">
              <img
                src={images[0]}
                alt="Couverture"
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            {images.slice(1).map((image, index) => (
              <div key={index + 1} className="demoPage">
                <img
                  src={image}
                  alt={`Page ${index + 2}`}
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
            ))}
          </HTMLFlipBook>
        </div>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default TrainingCatalog;
