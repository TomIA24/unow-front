import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import DateRangeIcon from "@mui/icons-material/DateRange";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import LocalLibraryIcon from "@mui/icons-material/LocalLibrary";
import classNames from "classnames";
import React, { useEffect, useRef, useState } from "react";
import styles from "./styles.module.css";

const MobileDevice = ({ userInfo, activeSection, handleSectionChange }) => {
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

  const TopBarButton = ({ icon: Icon, label, section }) => (
    <div
      className={classNames({ [styles.active]: activeSection === section })}
      onClick={() => handleSectionChange(section)}
    >
      <Icon sx={{ color: "white" }} />
      {activeSection === section && <p>{label}</p>}
    </div>
  );

  return (
    <>
      <div
        ref={ref}
        className={`${styles.topBar} ${isFixed ? styles.fixed : ""}`}
      >
        <TopBarButton
          icon={AccountCircleIcon}
          label="Personal Information"
          section="profile"
        />
        <TopBarButton
          icon={FormatListBulletedIcon}
          label="Actu mangdats"
          section="actu"
        />
        <TopBarButton
          icon={LocalLibraryIcon}
          label="Trainings"
          section="trainings"
        />
        <TopBarButton
          icon={DateRangeIcon}
          label="Calendar"
          section="calendar"
        />
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

export default MobileDevice;
