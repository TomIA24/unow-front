import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
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
        return <InfoUser setUserInfo={setUserInfo} userInfo={userInfo} />;
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
        <div className="appWrapper" style={{ height: "100%" }}>
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
        </div>
      </div>

      <MobileDevice userInfo={userInfo} />
      <div className="appWrapper">
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
      </div>

      <Footer />
    </React.Fragment>
  );
};

const MobileDevice = ({ userInfo }) => {
  const ref = useRef();
  const [isFixed, setIsFixed] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const rect = ref.current.getBoundingClientRect();
      if (rect.top <= 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <div
        ref={ref}
        className={`${styles.topBar} ${isFixed ? styles.fixed : ""}`}
      >
        <div className={styles.active}>
          <AccountCircleIcon sx={{ color: "white" }} />
        </div>
        <div>
          <FormatListBulletedIcon sx={{ color: "white" }} />
        </div>
        <div>
          <DateRangeIcon sx={{ color: "white" }} />
        </div>

        <div>
          <LocalLibraryIcon sx={{ color: "white" }} />
        </div>
      </div>

      <div className={styles.personnelInfo}>
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
        <div className={styles.userInfo}>
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
      </div>
    </>
  );
};

export default ProfileTrainer;
