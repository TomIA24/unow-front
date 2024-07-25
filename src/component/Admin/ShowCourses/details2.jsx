import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import axios from "axios";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import SendIcon from "@mui/icons-material/Send";
import { v4 as uuidv4 } from "uuid";
const Details = ({ Course, setOpenChange, openChange }) => {
  const steps = [
    "+3 candidats sont inscrit ",
    "+1 formateur accepte la formation",
    "Confirmation admin",
  ];
  const [activeStep, setActiveStep] = useState(0);
  const [course, setCourse] = useState(Course);
  const [notifs, setNotifs] = useState([]);

  const [countState, setCountState] = useState(0);

  useEffect(() => {
    setCourse(Course);
  }, [Course]);

  const token = localStorage.getItem("token");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
    border: "none",
  };

  const handleCloseChange = () => {
    setOpenChange(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/courses/updateCourse`;
    axios.post(url, course,config).then((res) => {
      handleCloseChange();
    });
  };

  useEffect(() => {
    getNotifTrainerByCourse(course._id);
  }, [course]);

  // useEffect(()=>{
  //     console.log(notifs)
  //     console.log("hello from api1")

  //     notifs.map(async notif=>{
  //         const config = {
  //             headers: { authorization: `Bearer ${token}` }
  //         };
  //         console.log(config)

  //           const url= "${process.env.REACT_APP_API}/api/Trainer/getTrainer"
  //           await axios.post(url,{trainerId: notif.trainer} )
  //           .then(res=>{
  //               console.log("hello from api")
  //               notif.trainer=res.data.trainer
  //           })
  //     })

  // },[notifs])

  const getNotifTrainerByCourse = async (id) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/Trainer/GetNotifTrainerByCourse`;
    await axios.post(url, { CourseId: id },config).then((res) => {
      console.log(res);
      setNotifs(res.data.data);
    });
  };

  var count = 0;
  // var Formateurs=[]
  // var Formateur=[]
  React.useEffect(() => {
    if (notifs.length > 0) {
      notifs.map((notif) => {
        if (notif.reponseFormateur === "confirmed") {
          count += 1;
        }
      });
      setCountState(count);
    }
  }, [notifs]);

  React.useEffect(() => {
    const urlId = uuidv4();
    console.log(urlId);
    console.log("count: ", countState);
    console.log(Course.enrolled.length);
    if (Course.enrolled.length >= 3) {
      if (countState >= 1) {
        if (Course.state === "confirmed") {
          setActiveStep(3);
        } else {
          setActiveStep(2);
        }
      }
      if (countState === 0) {
        setActiveStep(1);
      }
    }
  }, [countState]);

  const handleReset = () => {
    setActiveStep(0);
  };

  const Formateurs = notifs.map((notif) => {
    if (notif.StatusMandate == "closed")
      return (
        <li style={{ textDecoration: "line-through" }}>
          {notif.trainername}: {notif.reponseFormateur}
        </li>
      );
    if (
      notif.StatusMandate == "confirmed" ||
      notif.StatusMandate == "en attente"
    )
      return (
        <li>
          {notif.trainer}: {notif.reponseFormateur}
        </li>
      );
  });

  const Formateur = notifs.map((notif) => {
    return (
      <MenuItem
        sx={{ display: "flex", justifyContent: "space-between" }}
        value={notif._id}
      >
        {notif.trainer} <strong>{notif.prixFormateur}</strong>
      </MenuItem>
    );
  });

  const Candidats = course.enrolled.map((cnd) => {
    return <li>{cnd}</li>;
  });

  const [FRSelected, setFRSelected] = React.useState("");
  const [trainerSelected, setTrainerSelected] = React.useState("");

  const handleChange = (event) => {
    setFRSelected(event.target.value);
    notifs.map((notif) => {
      if (notif._id === event.target.value) {
        setTrainerSelected(notif.trainer);
      }
    });
  };

  const handleConfirme = () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };

    const urlId = uuidv4();
    const url = `${process.env.REACT_APP_API}/api/Trainer/ConfirmNotif`;
    axios
      .post(url, {
        FRSelected: { Notif: FRSelected, trainer: trainerSelected },
        Course: course,
        urlId: urlId,
      },config)
      .then((res) => {
        handleCloseChange();
      });
  };

  return (
    <Modal
      sx={{ p: 1 }}
      open={openChange}
      onClose={handleCloseChange}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: 800,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "85vh",
        }}
      >
        <div className={styles.ModalComponent}>
          <h2 id="parent-modal-title" className={styles.ModalTitle}>
            Deatils Course
          </h2>
          <h2 id="parent-modal-title" className={styles.ModalTitle}>
            {course._id}
          </h2>
          <br />
          <hr />
          <br />

          <Box sx={{ width: "100%", m: 2 }}>
            <Stepper activeStep={activeStep}>
              {steps.map((label, index) => {
                const stepProps = {};
                const labelProps = {};

                return (
                  <Step key={label} {...stepProps}>
                    <StepLabel {...labelProps}>{label}</StepLabel>
                  </Step>
                );
              })}
            </Stepper>
            {/* {activeStep === steps.length ? (
                            <React.Fragment>
                            <Typography sx={{ mt: 2, mb: 1 }}>
                                Session confirmée 
                            </Typography>
                            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
                                <Box sx={{ flex: '1 1 auto' }} />
                                <Button onClick={handleReset}>Reset</Button>
                            </Box>
                            </React.Fragment>
                        ) : ""} */}
          </Box>
          <div className={styles.table}>
            <div>
              <h2>Candidats</h2>

              <hr />
              <br />

              <ul>{Candidats}</ul>
            </div>
            <div>
              <h2>Formateurs</h2>

              <hr />
              <br />
              <ul>{Formateurs}</ul>
            </div>
            <div>
              <h2>Reponse Admin</h2>

              <hr />
              <br />
              <h4>{course.state}</h4>
            </div>
          </div>
          <Box className={styles.addComment} sx={{ width: "100%", mt: 2 }}>
            <FormControl
              disabled={course.state == "confirmed"}
              sx={
                course.state == "confirmed"
                  ? {
                      "&.Mui-disabled": {
                        pointerEvents: "auto",
                        cursor: "not-allowed",
                      },
                      width: "75%",
                      height: "56px",
                    }
                  : { width: "75%", height: "56px" }
              }
            >
              <InputLabel id="demo-simple-select-label">
                Choisir Un Formateur
              </InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={FRSelected}
                label="Choisir Un Formateur"
                onChange={handleChange}
              >
                {Formateur}
              </Select>
            </FormControl>
            <Button
              disabled={course.state == "confirmed"}
              sx={{ width: "22%", height: "56px", ml: 2 }}
              onClick={handleConfirme}
              variant="contained"
              endIcon={<SendIcon />}
            >
              Comfirm
            </Button>
          </Box>
        </div>
      </Box>
    </Modal>
  );
};

export default Details;
