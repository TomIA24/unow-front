import React, { useEffect, useRef } from "react";
import "./styles.module.css";
import styles from "../Contact/styles.module.css";

import Nav from "../Nav";
import Footer from "../footer";

const Catalog = () => {
  const iframeRef = useRef(null);

  useEffect(() => {
    const handleIframeLoad = () => {
      const iframeDocument =
        iframeRef.current.contentDocument ||
        iframeRef.current.contentWindow.document;
      const style = document.createElement("style");
      style.innerHTML = `
        #logoBar {
          display: none !important;
        }
      `;
      iframeDocument.head.appendChild(style);
    };

    if (iframeRef.current) {
      iframeRef.current.onload = handleIframeLoad;
    }
  }, []);

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
          width: "100%",
          height: "500px",
        }}
      >
        <iframe
          ref={iframeRef}
          style={{
            position: "absolute",
            border: "none",
            width: "100%",
            height: "100%",
            left: 0,
            top: 0,
          }}
          src="/fliphtml5/hxpoo/ywlj/"
          seamless="seamless"
          scrolling="no"
          frameBorder="0"
          allowTransparency="true"
          allowFullScreen="true"
        ></iframe>
      </div>

      <Footer />
    </React.Fragment>
  );
};

export default Catalog;
