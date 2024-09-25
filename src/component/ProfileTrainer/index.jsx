import React, { useEffect, useState } from "react";
import styles from "./styles.module.css";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import { Container } from "@mui/material";
import classNames from "classnames";
import { request } from "../../core/api/request";
import Nav from "../Nav";
import Footer from "../footer";
import Actu from "./Actu";
import Calendar from "./Calendar";
import InfoUser from "./InfoUser";
import Trainings from "./Trainings";

const ProfileTrainer = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    request.read("userData").then((data) => {
      setUserInfo(data.data);
    });
  }, []);

  const renderContent = () => {
    switch (activeSection) {
      case "actu":
        return <Actu setActu={setActiveSection} userInfo={userInfo} />;
      case "calendar":
        return <Calendar userInfo={userInfo} />;
      case "trainings":
        return <Trainings userInfo={userInfo} />;
      case "profile":
      default:
        return <InfoUser userInfo={userInfo} />;
    }
  };

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  const ProfileInfo = () => (
    <div className={styles.info}>
      <div>
        <p>{userInfo?.name}</p>
        <p>Trainer</p>
      </div>
      <div>
        <p> {userInfo?.phoneNumber || "--"}</p>
        <p> {userInfo?.email || "--"}</p>
        <p> {userInfo?.address || "--"}</p>
      </div>
    </div>
  );

  const SideBarButton = ({ icon: Icon, label, section }) => (
    <button
      className={classNames({ [styles.active]: activeSection === section })}
      onClick={() => handleSectionChange(section)}
    >
      <Icon sx={{ color: "white" }} />
      <span>{label}</span>
    </button>
  );

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
                  src={
                    userInfo?.image?.filePath
                      ? `${process.env.REACT_APP_API}${userInfo.image.filePath}`
                      : "/default-profile.png"
                  }
                  alt="Profile"
                />
              </div>
            </div>
            {activeSection === "profile" && <ProfileInfo />}
          </div>
        </Container>
      </div>

      <Container maxWidth="xl">
        <main className={styles.main}>
          <div className={styles.mainContainer}>{renderContent()}</div>
          <div className={styles.sideBar}>
            <p className={styles.cardTitle}>{userInfo?.name}</p>
            <div className={styles.sideBarContainer}>
              <SideBarButton
                icon={AccountCircleIcon}
                label="Personal Information"
                section="profile"
              />
              <SideBarButton
                icon={FormatListBulletedIcon}
                label="Actu mangdats"
                section="actu"
              />
              <SideBarButton
                icon={LocalLibraryIcon}
                label="Trainings"
                section="trainings"
              />
              <SideBarButton
                icon={DateRangeIcon}
                label="Calendar"
                section="calendar"
              />
            </div>
          </div>
        </main>
      </Container>

      <Footer />
    </React.Fragment>
  );
};

export default ProfileTrainer;
