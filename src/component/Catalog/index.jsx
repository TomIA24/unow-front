import React from "react";
import "./styles.module.css";
import styles from "../Contact/styles.module.css";

import Nav from "../Nav";
import Footer from "../footer";

const Catalog = () => {
  window.addEventListener("DOMContentLoaded", function () {
    const iframe = document.querySelector("iframe");

    if (iframe) {
      iframe.onload = function () {
        try {
          const iframeDocument = iframe.contentWindow.document;

          const logo = iframeDocument.querySelector(".logoBar");
          if (logo) {
            logo.style.display = "none";
          }
        } catch (error) {
          console.error("Erreur en accédant à l'iframe:", error);
        }
      };
    } else {
      console.error("Iframe non trouvée");
    }
  });

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
          width: "1100px",
          height: "600px",
        }}
      >
        <iframe
          style={{
            position: "absolute",
            border: "none",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          }}
          src="https://online.fliphtml5.com/hxpoo/ywlj/"
          seamless="seamless"
          scrolling="no"
          frameborder="0"
          allowtransparency="true"
          allowfullscreen="true"
        ></iframe>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default Catalog;
