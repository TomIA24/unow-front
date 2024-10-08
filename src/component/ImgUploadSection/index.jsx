import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Avatar, Badge, IconButton } from "@mui/material";
import React from "react";
import styles from "./styles.module.css";

const ImgUploadSection = ({ SingleFileChange, img }) => {
  return (
    <div className={styles.ImgUploadSection}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        badgeContent={
          <Avatar
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
              <input
                accept="image/*"
                id="icon-button-file"
                type="file"
                style={{ display: "none" }}
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
          </Avatar>
        }
      >
        <Avatar
          alt="icon"
          src={img instanceof File ? URL.createObjectURL(img) : img}
          sx={{ width: 160, height: 160 }}
        />
      </Badge>
    </div>
  );
};

export default ImgUploadSection;
