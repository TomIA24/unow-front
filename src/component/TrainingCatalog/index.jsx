import React from "react";
import HTMLFlipBook from "react-pageflip";
import styles from "../Contact/styles.module.css";

import Nav from "../Nav";
import Footer from "../footer";

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
          position: "relative",
          paddingTop: 0,
          width: "80%",
          height: "600px",
          marginTop: "80px",
          display: "flex", // Utilisation de flexbox
          justifyContent: "center", // Centrage horizontal
          alignItems: "center", // Centrage vertical
        }}
      >
        <HTMLFlipBook
          style={{
            position: "absolute",
            border: "none",
            width: "80%",
            height: "80%",
            left: 0,
            top: 0,
          }}
          width={600}
          height={450}
          size="fixed"
          showCover={true}
        >
          {images.map((image, index) => (
            <div key={index} className="demoPage">
              <img
                src={image}
                alt={`Page ${index + 1}`}
                style={{ width: "100%", height: "100%" }}
              />
            </div>
          ))}
        </HTMLFlipBook>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default TrainingCatalog;
