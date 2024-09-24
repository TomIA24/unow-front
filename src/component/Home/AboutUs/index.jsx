import React, { useState } from "react";
import Team from "../../assets/team.png";
import { SectionTitle } from "../HomeInterface";
import styles from "./styles.module.css";

const About = () => {
  const [openApply, setOpenApply] = useState(false);
  return (
    <>
      <div className={styles.dernierSection}>
        <div className={styles.aboutContainer}>
          <div className={styles.aboutTitle}>
            <SectionTitle title={"About Us"} />
          </div>
          <div className={styles.container}>
            <div className={styles.subtitleContainer}>
              <p className={styles.subtitle}>
                U!NOW an innovative, holistic e-learning platform
              </p>
            </div>
            <div className={styles.containeraboutus}>
              <div className={styles.imageWrapper}>
                {" "}
                <img src={Team} alt="" className={styles.imageAboutUs} />{" "}
              </div>
              <div className={styles.description}>
                <div className={styles.descriptionpar}>
                  <p>
                    U!NOW is not just an e-learning platform, but a revolution
                    in the field of education.
                  </p>
                  <p>
                    Our ambition is to make learning accessible, flexible,
                    engaging and effective for everyone, from students and
                    retraining professionals to companies and training
                    organizations.
                  </p>
                  <p>Pedagogical innovation at the heart of U!NOW</p>
                  <p>
                    U!NOW stands out for its innovative pedagogical approach,
                    which draws on the latest technologies and best practices in
                    learning.
                  </p>

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
      </div>
    </>
  );
};
export default About;
