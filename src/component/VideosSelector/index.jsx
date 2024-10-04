import BackupIcon from "@mui/icons-material/Backup";
import { Typography } from "@mui/material";
import React from "react";
import VideoSelected from "../Admin/AddCourse/VideoSelected";
import styles from "./styles.module.css";

const Input = ({ accept, id, multiple, type, onChange }) => {
  return (
    <input
      accept={accept}
      id={id}
      multiple={multiple}
      type={type}
      onChange={onChange}
      style={{ display: "none" }}
    />
  );
};

const VideosSelector = ({
  MultipleVideoChange,
  uploadProgressVideos,
  setMultipleVideosSelected,
  multipleVideosSelected,
}) => {
  return (
    <div className={styles.FileSelector}>
      <label className={styles.selectFiles} htmlFor="contained-button-file">
        <Input
          accept="video/*"
          id="contained-button-file"
          multiple
          type="file"
          onChange={(e) => MultipleVideoChange(e)}
        />
        <div
          style={{
            fontSize: "20px",
            color: "#6990F2",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <BackupIcon
            sx={{
              color: "#6990F2",
              fontSize: 120,
              marginBottom: "3px",
            }}
          />
          <p style={{ marginTop: "-17px" }}>select videos</p>
          {parseInt(uploadProgressVideos) > 0 && (
            <Typography variant="body2">
              {`Time remaining for video upload : ${uploadProgressVideos}`}
            </Typography>
          )}
        </div>
      </label>

      <div
        style={{
          width: "80%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          margin: "auto",
        }}
      >
        {multipleVideosSelected?.map((item, index) => (
          <VideoSelected
            key={index}
            setMultipleVideosSelected={setMultipleVideosSelected}
            multipleFilesSelected={multipleVideosSelected}
            element={item}
          />
        ))}
      </div>
    </div>
  );
};

export default VideosSelector;
