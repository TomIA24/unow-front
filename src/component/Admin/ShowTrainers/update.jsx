import React, { useState, useEffect } from "react";
import styles from "./styles.module.css";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Modal from "@mui/material/Modal";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import axios from "axios";

import img from "../../assets/profileImgNoUp.svg";
import { getBase64 } from "../../../shared/image.service";

import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import Alert from "@mui/material/Alert";
import UploadImg from "../../assets/imgUpload.png";

import countryList from "../../res/countries";
import Languages from "../../res/languages";
import Programs from "../../res/programs";
import Autocomplete from "@mui/material/Autocomplete";
import { singleFileUpload } from "../../UploadFunctions/data/api";
import { styled } from "@mui/material/styles";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";

import avatar from "../../assets/avatar.svg";

import { PhotoCamera } from "@material-ui/icons";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Input = styled("input")({
  display: "none",
});

const Update = ({ User, setOpenChange, openChange }) => {
  const [user, setUser] = useState(User);

  useEffect(() => {
    setUser(User);
    // setValueParams(User.programs);
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
    setPrev("");
    setUser({});
  };

  const [singleFile, setSingleFile] = useState("");
  const [prev, setPrev] = useState(null);

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
    getBase64(e.target.files[0]).then((data) => {
      setPrev(data);
    });
    // setCourse({ ...course, Thumbnail: e.target.value });
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    formData.append("file", singleFile);
    await singleFileUpload(formData, user._id);
    // window.location.reload(true);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/Trainer/updateTrainers`;
    axios.post(url, user, config).then(async (res) => {
      if (singleFile !== "") {
        await uploadSingleFile();
      }

      handleCloseChange();
    });
  };

  const [valueParams, setValueParams] = useState([]);
  // const [loading, setLoading] = React.useState(false);
  // function handleClick() {
  //   setLoading(true);
  // }

  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const countries = countryList.map((country) => {
    return (
      <MenuItem key={country.number} value={country.code}>
        {country.name}
      </MenuItem>
    );
  });

  const languages = Languages.map((language) => {
    return (
      <MenuItem key={language.code} value={language.code}>
        {language.name}
      </MenuItem>
    );
  });

  useEffect(() => {
    console.log("programs : ", user);
  }, [user]);

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
          <Badge
            overlap="circular"
            anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            badgeContent={
              <SmallAvatar
                alt="icon"
                sx={{
                  boxShadow:
                    "0 0 4px 2px rgba(0,0,0,0.26),-1px -1px 4px 2px rgba(255,255,255,0.26) ",
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
            {prev ? (
              <Avatar alt="icon2" src={prev} sx={{ width: 200, height: 200 }} />
            ) : (
              <>
                {user.image ? (
                  <Avatar
                    alt="icon"
                    src={`${process.env.REACT_APP_API}/${user.image.filePath}`}
                    sx={{ width: 200, height: 200 }}
                  />
                ) : (
                  <Avatar
                    alt="icon"
                    src={avatar}
                    sx={{ width: 200, height: 200 }}
                  />
                )}
              </>
            )}
          </Badge>
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
                name="userName"
                id="outlined-basic"
                label="userName"
                value={user.userName}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
            </Box>
          </FormControl>
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
                name="email"
                id="outlined-basic"
                label="email"
                value={user.email}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
            </Box>
          </FormControl>
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
                name="description"
                id="outlined-basic"
                label="description"
                value={user.description}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
            </Box>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: "80%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              animation Language
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={user.animationLanguage}
              onChange={(e) => handleChange(e)}
              name="animationLanguage"
              label="Animation Language"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {languages}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, maxWidth: "80%", minWidth: "80%" }}>
            <Autocomplete
              multiple
              id="tags-outlined"
              options={Programs.map((prog) => {
                return prog.title;
              })}
              value={user.programs}
              name="programs"
              getOptionLabel={(option) => option}
              onChange={(event, newValue) => {
                console.log("first: ", user.programs);
                console.log(
                  "second: ",
                  Programs.map((prog) => {
                    return prog.title;
                  })
                );
                setUser({
                  ...user,
                  programs: newValue,
                });
                setValueParams(newValue);
              }}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  name="programs"
                  label="programs"
                  placeholder="programs"
                />
              )}
            />
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: "80%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              connecting Metropolis
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={user.connectingMetropolis}
              onChange={(e) => handleChange(e)}
              name="connectingMetropolis"
              label="connecting Metropolis"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {countries}
            </Select>
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
                name="monthlyBandwidth"
                id="outlined-basic"
                label="Monthly Bandwidth"
                value={user.monthlyBandwidth}
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
                name="RCS"
                id="outlined-basic"
                label="RCS"
                value={user.RCS}
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
                name="SIRET"
                id="outlined-basic"
                label="SIRET"
                value={user.SIRET}
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
                name="socialReason"
                id="outlined-basic"
                label="Social Reason"
                value={user.socialReason}
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
