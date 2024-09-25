import React, { useState } from "react";
import styles from "./styles.module.css";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import HistoryEduIcon from "@mui/icons-material/HistoryEdu";
import VoiceChatIcon from "@mui/icons-material/VoiceChat";
import { Container } from "@mui/material";
import Button from "@mui/material/Button";
import Nav from "../Nav";
import Footer from "../footer";
import Actu from "./Actu";
import Calendar from "./Calendar";
import InfoUser from "./InfoUser";
import Trainings from "./Trainings";
import Rooms from "./rooms";

const ProfileTrainer = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [actu, setActu] = useState(false);
  const [profile, setProfile] = useState(true);
  const [calendar, setCalendar] = useState(false);
  const [rooms, setRooms] = useState(false);
  const [trainings, setTrainings] = useState(false);

  const handleActu = () => {
    setActu(true);
    setProfile(false);
    setCalendar(false);
  };
  const handleCalendar = () => {
    setActu(false);
    setProfile(false);
    setCalendar(true);
  };

  const handleRooms = () => {
    setActu(false);
    setProfile(false);
    setRooms(true);
    setCalendar(false);
  };
  const handleProfile = () => {
    if (!profile) {
      setProfile(true);
      setActu(false);
      setCalendar(false);
    }
  };

  const handleTrainings = () => {
    setActu(false);
    setProfile(false);
    setRooms(false);
    setCalendar(false);
    setTrainings(true);
  };

  return (
    <React.Fragment>
      <div className="background_container">
        <Container maxWidth="xl" sx={{ height: "calc(100% - 70px)" }}>
          <Nav />
          <div className={styles.container}>
            <p className={styles.title}>Welcome Trainer</p>
            <div className={styles.imgProfile}>
              <div className={styles.imgContainer}>
                <img
                  className={styles.profile_border}
                  src="./svg/profile_border.svg"
                  alt="11"
                />
                <img
                  src={`${process.env.REACT_APP_API}${user?.image?.filePath}`}
                  alt="Profile"
                />
              </div>
            </div>
          </div>
        </Container>
      </div>
      <Container maxWidth="xl">
        <main className={styles.MotherDivProfile}>
          <div className={styles.MainDivProfile}>
            {profile ? (
              <InfoUser user={user} />
            ) : actu ? (
              <Actu setActu={setActu} user={user} />
            ) : calendar ? (
              <Calendar user={user} />
            ) : rooms ? (
              <Rooms user={user} />
            ) : trainings ? (
              <Trainings user={user} />
            ) : null}

            <div className={styles.rightSectionProfile}>
              <div className={styles.scndInfos}>
                <h5 className={styles.titleWelcome}>welcome {user.name}</h5>
                <Button
                  onClick={handleProfile}
                  className={styles.Button}
                  variant="outlined"
                  startIcon={<AccountCircleIcon />}
                >
                  Personnal Informations
                </Button>

                <Button
                  onClick={handleActu}
                  className={styles.Button}
                  variant="outlined"
                  startIcon={<FormatListBulletedIcon />}
                >
                  Actu Mandats
                </Button>

                <Button
                  onClick={handleTrainings}
                  className={styles.Button}
                  variant="outlined"
                  startIcon={<HistoryEduIcon />}
                >
                  Trainings
                </Button>

                <Button
                  onClick={handleCalendar}
                  className={styles.Button}
                  variant="outlined"
                  startIcon={<CalendarTodayIcon />}
                >
                  Calendar
                </Button>

                <Button
                  onClick={handleRooms}
                  className={styles.Button}
                  variant="outlined"
                  startIcon={<VoiceChatIcon />}
                >
                  Rooms
                </Button>
              </div>
            </div>
          </div>
        </main>
      </Container>

      <Footer />
    </React.Fragment>
  );
};

export default ProfileTrainer;
