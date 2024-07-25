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
import ApplyTrainer from "./ApplyTrainer";

const Join = () => {
  const [openApply, setOpenApply] = useState(false);
  return (
    <>
      <section className={styles.consultantSection}>
        <div
        // style={{ backgroundColor: "red" }}
        >
          <img src={Consultant} alt="" className={styles.imageConsultant} />
        </div>
        <div className={styles.allParaghraphe}>
          <div className={styles.consultantsTitle}>CONSULTANTS - TRAINERS</div>
  
            <h3
              className={styles.title}
              // style={{ textAlign: "center", marginBottom: 20 }}
            >
              JOIN US!
            </h3>

            <p className={styles.descriptionParagh}>
              As part of our professional training activity, we
              are constantly looking for new consultant  
              trainers.
            </p>
      
          <div className={styles.button}>
            <button
              onClick={() => {
                setOpenApply(true);
              }}
              className={styles.applyButton}
            >
              Apply Now !
            </button>
          </div>
        </div>
      </section>
      <ApplyTrainer openApply={openApply} setOpenApply={setOpenApply}/>
    </>
  );
};
export default Join;