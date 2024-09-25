import CloseIcon from "@mui/icons-material/Close";
import TuneIcon from "@mui/icons-material/Tune";
import { Box, Button, Modal } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  borderRadius: "30px",
  bgcolor: "background.paper",
  boxShadow: 24,
  pt: 2,
  px: 4,
  pb: 3,
};

const InfoUser = ({ userInfo }) => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
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
                  <span>{program}</span>
                </p>
              ))}
              {userInfo.programs?.length > 6 && (
                <p className={styles.seeMore} onClick={handleOpen}>
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

      <Modal open={open} onClose={handleClose}>
        <Box sx={{ ...style }}>
          <div className={styles.modalContent}>
            <div className={styles.header}>
              <p className={styles.title}>Programs</p>
              <div className={styles.input}>
                <div>
                  <TuneIcon sx={{ color: "#2C2C2C" }} />
                  <span>Filter</span>
                </div>
                <input type="text" placeholder="Type here..." />
              </div>
              <CloseIcon
                onClick={handleClose}
                sx={{ color: "#C0BCB7", cursor: "pointer" }}
              />
            </div>

            <div className={styles.programsDetails}>
              <div>
                <ul>
                  {userInfo.programs?.map((program, index) => (
                    <li key={index}>{program}</li>
                  ))}
                </ul>
              </div>
              <div>
                <ul>
                  {userInfo.programs?.map((program, index) => (
                    <li key={index}>{program}</li>
                  ))}
                </ul>
              </div>
              <div className={styles.editSection}>
                <Button>Ajouter un programme</Button>
                <Button>Confirmer</Button>
              </div>
            </div>
          </div>
        </Box>
      </Modal>
    </div>
  );
};

export default InfoUser;
