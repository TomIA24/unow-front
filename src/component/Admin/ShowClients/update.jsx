import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrValidate } from "react-icons/gr";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormControl from "@mui/material/FormControl";
import Switch from "@mui/material/Switch";
import Alert from "@mui/material/Alert";
import Stack from "@mui/material/Stack";
import UploadImg from "../../assets/imgUpload.png";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";

const Update = ({ User, setOpenChange, openChange }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    setUser(User);
  }, [User]);

  const token = localStorage.getItem("token");

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    p: 2,
    border: "none",
  };

  const handleCloseChange = () => {
    setOpenChange(false);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/Candidat/updateCandidat`;
    axios.post(url, user,config).then((res) => {
      handleCloseChange();
    });
  };

  const handleChange = (e) => {
    console.log(e.target);
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  return (
    <Modal
      sx={{ p: 1 }}
      open={openChange}
      onClose={handleCloseChange}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: 800,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "85vh",
        }}
      >
        <div className={styles.ModalComponent}>
          <h2 id="parent-modal-title" className={styles.ModalTitle}>
            Update User
          </h2>
          <hr />

          <FormControl sx={{ m: 1, minWidth: "80%" }}>
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              Validate
              autoComplete="off"
            >
              <TextField
                name="name"
                id="outlined-basic"
                label="name"
                value={user.name}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
            </Box>
          </FormControl>

          <FormControl
            className={styles.FormControl}
            sx={{ m: 1, minWidth: "80%" }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                multiline
                name="userName"
                id="outlined-basic"
                label="userName"
                value={user.userName}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
            </Box>
          </FormControl>
          <FormControl
            className={styles.FormControl}
            sx={{ m: 1, minWidth: "80%" }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                multiline
                name="phone"
                id="outlined-basic"
                label="phone"
                value={user.phone}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
            </Box>
          </FormControl>
          <FormControl
            className={styles.FormControl}
            sx={{ m: 1, minWidth: "80%" }}
          >
            <Box
              component="form"
              sx={{
                "& > :not(style)": { width: "100%" },
              }}
              noValidate
              autoComplete="off"
            >
              <TextField
                multiline
                name="email"
                id="outlined-basic"
                label="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
            </Box>
          </FormControl>

          <LoadingButton
            sx={{ m: 1 }}
            onClick={handleSave}
            type="submit"
            endIcon={<SaveIcon />}
            // loading={loading}
            // loadingPosition="end"
            variant="contained"
          >
            Save
          </LoadingButton>
        </div>
      </Box>
    </Modal>
  );
};

export default Update;
