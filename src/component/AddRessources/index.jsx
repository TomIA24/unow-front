import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { Box, IconButton, Input, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles.module.css";

const fileSizeFormatter = (bytes, decimal = 2) => {
  if (bytes === 0) return "0 Bytes";

  const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
  const index = Math.floor(Math.log(bytes) / Math.log(1000));

  return `${parseFloat((bytes / Math.pow(1000, index)).toFixed(decimal))} ${
    sizes[index]
  }`;
};

const FileItem = ({ file, onDelete }) => {
  const [isHovering, setIsHovering] = useState(false);

  return (
    <div
      className={styles.fileUploaded}
      onMouseOver={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <UploadFileIcon className={styles.IconFile} />
      <div className={styles.TitleFile}>
        <Typography noWrap sx={{ color: "black", width: "80%" }}>
          {file.name}
        </Typography>
        <span>{fileSizeFormatter(file.size, 2)}</span>
      </div>
      <Box>
        {isHovering && (
          <CloseIcon
            onClick={() => onDelete(file.name)}
            className={styles.IconFile}
          />
        )}
        {!isHovering && <DoneIcon className={styles.IconFile} />}
      </Box>
    </div>
  );
};

const AddRessources = ({
  multipleFilesSelectedRessources,
  uploadProgressRessources,
  MultipleRessourcesChange,
  handleDeleteSelected,
}) => {
  return (
    <div className={styles.AddRessources}>
      <h3>Add Resources</h3>
      <div className={styles.Ressources}>
        {multipleFilesSelectedRessources.length === 0 && (
          <p>No files selected</p>
        )}
        {multipleFilesSelectedRessources.map((file) => (
          <FileItem
            key={file.name}
            file={file}
            onDelete={handleDeleteSelected}
          />
        ))}
        {parseInt(uploadProgressRessources) > 0 && (
          <Typography variant="body2">
            {`Time remaining for resource upload: ${uploadProgressRessources}`}
          </Typography>
        )}
      </div>
      <div className={styles.AddRessource}>
        <h5>Select Files</h5>
        <label
          className={styles.selectFiles2}
          htmlFor="contained-button-file-Ressource"
        >
          <Input
            accept=".pdf,.doc,.docx,.ppt,.pptx"
            id="contained-button-file-Ressource"
            multiple
            type="file"
            style={{ display: "none" }}
            onChange={MultipleRessourcesChange}
          />
          <IconButton
            onClick={() =>
              document.getElementById("contained-button-file-Ressource").click()
            }
            aria-label="Add"
            color="primary"
          >
            <AddCircleOutlineIcon />
          </IconButton>
        </label>
      </div>
    </div>
  );
};

export default AddRessources;
