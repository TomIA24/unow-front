import React, { useState } from "react";
import styles from "./styles.module.css";
import Scrum from "../../assets/partners/scrum.png";
import Peoplecert from "../../assets/partners/Peoplecert.svg";
import Axelos from "../../assets/partners/axelos.png";
import DevOps from "../../assets/partners/devOps Institute.png";
import Exin from "../../assets/partners/exin.svg";
import PMI from "../../assets/partners/pmi_new_logo.png";
import SAFe from "../../assets/partners/SAFe.png";
import Consultant from "../../assets/Consultant.png";
import Team from "../../assets/team.png";
import Ellipse from "../../assets/Ellipse.png";

const About = () => {
  const [openApply, setOpenApply] = useState(false);
  return (
    <>
      <div className={styles.dernierSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutTitle}>ABOUT US

          <p className={styles.underline}></p>
          </div>
          <div className={styles.container}>
            <h1 className={styles.title}>U!NOW</h1>

            <div className={styles.subtitleContainer}>
              <p className={styles.subtitle}><b>an innovative, holistic e-learning platform</b></p>
            </div>
            <div className={styles.imageWrapper}  > <img src={Team} alt="" className={styles.imageAboutUs} /> </div>
            <div className={styles.description}>
              <div className={styles.descriptionpar}>
            <p>U!NOW is not just an e-learning platform, but a revolution in the field of education.</p>
            <p>Our ambition is to make learning accessible, flexible, engaging and effective for everyone, from students and retraining professionals to companies and training organizations.</p>
            <p>Pedagogical innovation at the heart of U!NOW</p>
            <p>U!NOW stands out for its innovative pedagogical approach, which draws on the latest technologies and best practices in learning.</p>
            
            <button
                onClick={() => {    
                  setOpenApply(true);
                }}
                className={styles.readButton}
              >
                Read More
              </button>
              
            </div>
            
           
            </div>

            
          </div>
          
        </div>
      
        
      </div>
      
    </>
  );
};
export default About;