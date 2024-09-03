import React from "react";
import styles from "./styles.module.css";
import img from "../../assets/profileImgNoUp.svg";
import badgeProfile from "../../assets/badgeProfile.png";

import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import { Input, SmallAvatar } from "../../../shared";
import Loading from "../../Loading";
import useProfile from "../hooks/use-profile";

export default function UserInfo() {
  const { prev, data, loading, SingleFileChange } = useProfile();
  if (loading) {
    return <Loading />;
  } else {
    return (
      <>
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
            <div className={styles.ProfileTitle}>
              <h1>{data.name} </h1>
              <h2>Candidat</h2>
              <div className={styles.badgesContainer}>
                <div className={styles.badgeContainer}>
                  <img src={badgeProfile} alt="badge profile" />
                </div>
                <div className={styles.badgeContainer}>
                  <img src={badgeProfile} alt="badge profile" />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.profileCapsule2}>
          <div className={styles.profileInfoHeader}>
            <h1>{data.name}</h1>
            <div className={styles.profileInfoHeaderUnderline} />
          </div>
          <div className={styles.profileInfoDescription}>
            <h5>{data.phone}</h5>
            <h5>{data.email}</h5>
            {/* <h5>{data.address}</h5> */}
            <h5>address</h5>
          </div>
        </div>
      </>
    );
  }
}
const styleBox = {
  boxShadow:
    "0 0 4px 2px rgba(0,0,0,0.26),-1px -1px 4px 2px rgba(255,255,255,0.26) ",
  backgroundColor: "white",
  width: 30,
  height: 30,
};
