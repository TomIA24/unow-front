import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import ComputerIcon from "@mui/icons-material/Computer";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import React, { useCallback, useEffect, useState } from "react";
import { request } from "../../core/api/request";
import Nav from "../Nav";
import Footer from "../footer";
import Actu from "./Actu";
import Calendar from "./Calendar";
import Courses from "./Courses";
import InfoUser from "./InfoUser";
import Trainings from "./Trainings";
import MobileDevice from "./components/MobileDeiveTopBar";
import SideBarButton from "./components/SideBarButton";
import styles from "./styles.module.css";

const ProfileTrainer = () => {
  const [activeSection, setActiveSection] = useState("profile");
  const [userInfo, setUserInfo] = useState({});

  useEffect(() => {
    request.read("userData").then((data) => {
      setUserInfo(data?.data || {});
    });
  }, []);

  const renderContent = useCallback(() => {
    switch (activeSection) {
      case "actu":
        return <Actu />;
      case "calendar":
        return <Calendar />;
      case "trainings":
        return <Trainings userInfo={userInfo} />;
      case "courses":
        return <Courses />;
      case "profile":
      default:
        return <InfoUser setUserInfo={setUserInfo} userInfo={userInfo} />;
    }
  }, [activeSection, userInfo]);

  const handleSectionChange = (section) => {
    setActiveSection(section);
  };

  return (
    <React.Fragment>
      <div className={styles.background_container}>
        <div className="appWrapper" style={{ height: "100%" }}>
          <Nav />
          <div className={styles.container}>
            <p className={styles.title}>{userInfo?.name}</p>
          </div>
        </div>
      </div>

      <MobileDevice
        activeSection={activeSection}
        handleSectionChange={(section) => handleSectionChange(section)}
      />
      <div className="appWrapper">
        <main className={styles.main}>
          <div className={styles.mainContainer}>{renderContent()}</div>
          <div className={styles.sideBar}>
            <p className={styles.cardTitle}>Welcome</p>
            <div className={styles.sideBarContainer}>
              <SideBarButton
                icon={AccountCircleIcon}
                activeSection={activeSection}
                handleSectionChange={(section) => handleSectionChange(section)}
                label="Personal Information"
                section="profile"
              />
              <SideBarButton
                icon={FormatListBulletedIcon}
                activeSection={activeSection}
                handleSectionChange={(section) => handleSectionChange(section)}
                label="Actu mandats"
                section="actu"
              />
              <SideBarButton
                icon={LocalLibraryIcon}
                activeSection={activeSection}
                handleSectionChange={(section) => handleSectionChange(section)}
                label="Trainings"
                section="trainings"
              />
              <SideBarButton
                icon={DateRangeIcon}
                activeSection={activeSection}
                handleSectionChange={(section) => handleSectionChange(section)}
                label="Calendar"
                section="calendar"
              />
              <SideBarButton
                icon={ComputerIcon}
                activeSection={activeSection}
                handleSectionChange={(section) => handleSectionChange(section)}
                label="Courses"
                section="courses"
              />
            </div>
          </div>
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default ProfileTrainer;
