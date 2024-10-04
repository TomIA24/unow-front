import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";

const Input = ({ accept, id, type, onChange }) => (
  <input
    accept={accept}
    id={id}
    type={type}
    style={{ display: "none" }}
    onChange={onChange}
  />
);

const SmallAvatar = ({ children, alt, sx }) => (
  <Avatar alt={alt} sx={sx}>
    {children}
  </Avatar>
);

const ImgUploadSection = ({ SingleFileChange, img }) => {
  return (
    <div className={styles.ImgUploadSection}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <SmallAvatar
            alt="icon"
            sx={{
              boxShadow:
                "0 0 4px 2px rgba(0,0,0,0.26),-1px -1px 4px 2px rgba(255,255,255,0.26)",
              backgroundColor: "white",
              width: 50,
              height: 50,
            }}
          >
            <label htmlFor="icon-button-file">
              <Input
                accept="image/*"
                id="icon-button-file"
                type="file"
                onChange={(e) => SingleFileChange(e)}
              />
              <IconButton
                color="primary"
                aria-label="upload picture"
                component="span"
              >
                <PhotoCamera sx={{ width: 35, height: 35 }} />
              </IconButton>
            </label>
          </SmallAvatar>
        }
      >
        <Avatar alt="icon" src={img} sx={{ width: 160, height: 160 }} />
      </Badge>
    </div>
  );
};

export default ImgUploadSection;
