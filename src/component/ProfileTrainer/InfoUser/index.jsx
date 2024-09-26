import React, { useState } from "react";
import ProgramsModal from "./ProgramsModal";
import styles from "./styles.module.css";

const InfoUser = ({ userInfo, setUserInfo }) => {
  const [openModal, setOpenModal] = useState(false);

  const handleOpenModal = () => {
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    setOpenModal(false);
  };

  return (
    <div className={styles.container}>
      <ul>
        <li>
          Connecting Metropolis:
          <span>{userInfo.connectingMetropolis}</span>
        </li>
        <li>
          Monthly Bandwidth:
          <span>{userInfo.monthlyBandwidth}</span>
        </li>
        <li>
          Animation Language:
          <span>
            {userInfo.animationLanguage
              ?.map(
                (word) =>
                  word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
              )
              .join(" ")}
          </span>
        </li>
        <li>
          <div className={styles.programs}>
            Programs:
            <div>
              {userInfo.programs?.slice(0, 6).map((program, index) => (
                <p key={index}>
                  <span>{program.title}</span>
                </p>
              ))}
              {userInfo.programs?.length > 6 && (
                <p className={styles.seeMore} onClick={handleOpenModal}>
                  See more...
                </p>
              )}
            </div>
          </div>
        </li>
        <li>
          Charge TVA:
          <span>{userInfo.chargeTVA}</span>
        </li>
        <li>
          RCS:
          <span>{userInfo.RCS}</span>
        </li>
        <li>
          SIRET:
          <span>{userInfo.SIRET}</span>
        </li>
        <li>
          IBAN:
          <span>{userInfo.socialReason}</span>
        </li>
      </ul>

      <ProgramsModal
        open={openModal}
        handleClose={handleCloseModal}
        setUserInfo={setUserInfo}
        programs={userInfo.programs}
      />
    </div>
  );
};

export default InfoUser;
