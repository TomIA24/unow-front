import React, { useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Scrum from "../../assets/partners/scrum.png";
import Peoplecert from "../../assets/partners/Peoplecert.svg";
import Axelos from "../../assets/partners/axelos.png";
import DevOps from "../../assets/partners/devOps Institute.png";
import Exin from "../../assets/partners/exin.svg";
import PMI from "../../assets/partners/pmi_new_logo.png";
import SAFe from "../../assets/partners/SAFe.png";

const partners = [
  Scrum,
  Peoplecert,
  Axelos,
  DevOps,
  Exin,
  PMI,
  SAFe,
];


const Collab = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;

    const scroll = () => {
      container.scrollLeft += 1; // Vitesse de défilement
      if (container.scrollLeft >= container.scrollWidth / 2) {
        container.scrollLeft = 0; // Remettre à zéro
      }
    };

    const interval = setInterval(scroll, 30); // Délai pour l'animation

    return () => clearInterval(interval); // Nettoyage de l'intervalle
  }, []);

  return (
    <section>
      <div className={styles.aboutContainercollab}>
        <div className={styles.ourPartners}>
          <div className={styles.ourPartners_container} ref={containerRef}>
            {/* Liste des partenaires */}
            {partners.concat(partners).map((partner, index) => (
              <div key={index}>
                <img src={partner} alt={`partner ${index}`} />
               
              </div>
           
            ))}
            {/* Liste des partenaires */}
            {partners.concat(partners).map((partner, index) => (
              <div key={index}>
                <img src={partner} alt={`partner ${index}`} />
               
              </div>
              
           
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Collab;