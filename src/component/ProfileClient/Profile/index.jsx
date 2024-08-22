import React from "react";
import styles from "./styles.module.css";
import useProfile from "./use-profile";
import Loading from "../../Loading";

import img from "../../assets/profileImgNoUp.svg";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Input, SmallAvatar } from "../../../shared";

const Profile = (props) => {
  const { prev, singleFile, singleProgress, data, loading, SingleFileChange } =
    useProfile();
  console.log(data);
  if (loading) {
    return <Loading />;
  } else {
    return (
      <div className={styles.profileContainer}>
        <div className={styles.profileCapsule}>
          <div className={styles.profileInfoContainer}>
            <Badge
              overlap="circular"
              anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
              badgeContent={
                <SmallAvatar alt="icon" sx={styleBox}>
                  <label htmlFor="icon-button-file">
                    <Input
                      accept="image/*"
                      id="icon-button-file"
                      type="file"
                      onChange={SingleFileChange}
                    />
                    <IconButton
                      color="primary"
                      aria-label="upload picture"
                      component="span"
                    >
                      <PhotoCamera sx={{ width: 15, height: 15 }} />
                    </IconButton>
                  </label>
                </SmallAvatar>
              }
            >
              {prev ? (
                <Avatar
                  alt="icon"
                  src={prev}
                  sx={{ width: 150, height: 150 }}
                />
              ) : (
                <div className={styles.progressCircle}>
                  <div className={styles.progressInnerGap}>
                    <div className={styles.progressInner}>
                      {data.image ? (
                        <Avatar
                          alt="icon"
                          src={`${process.env.REACT_APP_API}${data.image.filePath}`}
                          sx={{ width: 150, height: 150 }}
                        />
                      ) : (
                        <Avatar
                          alt="icon"
                          src={img}
                          sx={{ width: 150, height: 150 }}
                        />
                      )}
                    </div>
                  </div>
                </div>
              )}
            </Badge>
            <div className={styles.FirsSectionInfoProfileName}>
              <h1>{data.name} </h1>
            </div>
          </div>
        </div>
        <div className={styles.profileCapsule}></div>
        <div className={styles.profileCapsule}></div>
      </div>
    );
  }
};

const styleBox = {
  boxShadow:
    "0 0 4px 2px rgba(0,0,0,0.26),-1px -1px 4px 2px rgba(255,255,255,0.26) ",
  backgroundColor: "white",
  width: 30,
  height: 30,
};

export default Profile;
