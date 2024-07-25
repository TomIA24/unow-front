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

const Update = ({ Course, setOpenChange, openChange }) => {
  const [course, setCourse] = useState(Course);

  useEffect(() => {
    setCourse(Course);
  }, [Course]);

  useEffect(() => {
    setDatesPicked(course.Date);
  }, [course]);

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
    const url = `${process.env.REACT_APP_API}/api/trainings/updateTraining`;
    axios.post(url, course, config).then((res) => {
      handleCloseChange();
    });
  };

  const handleChange = (e) => {
    console.log(e.target);
    setCourse({ ...course, [e.target.name]: e.target.value });
  };

  const LevelsList = [
    "Beginner",
    "Elementary",
    "Intermediate",
    "Upper Intermediate",
    "Advanced",
    "Proficiency",
  ];

  const Levels = LevelsList.map((category) => {
    return (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    );
  });

  const categoriesList = [
    "Web Development",
    "Project Management",
    "IT Service Management",
  ];

  const categories = categoriesList.map((category) => {
    return (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    );
  });

  const TrainersList = ["1", "2", "3"];

  const Trainers = TrainersList.map((Trainer) => {
    return (
      <MenuItem key={Trainer} value={Trainer}>
        {Trainer}
      </MenuItem>
    );
  });

  const [DatesPicked, setDatesPicked] = useState(course.Date);
  const [value, setValue] = useState([null, null]);

  const SaveDate = () => {
    setDatesPicked([...DatesPicked, value]);
    setValue([null, null]);
  };

  const Dates = DatesPicked.map((Date, i) => {
    return (
      <p key={i}>
        from {JSON.stringify(Date[0]).slice(1, 11)} To{" "}
        {JSON.stringify(Date[1]).slice(1, 11)}{" "}
        <AiOutlineCloseCircle
          size={20}
          onClick={() => {
            setDatesPicked((DatesPicked) =>
              DatesPicked.filter((_, idx) => idx !== i)
            );
          }}
        />
      </p>
    );
  });

  //const [saved, setSaved] = useState(false)
  useEffect(() => {
    setCourse({ ...course, Date: DatesPicked });
  }, [DatesPicked]);
  const [mobile, setMobile] = useState(false);

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
            Update Course
          </h2>
          <hr />
          <Box
            sx={{
              width: "82%",
              display: "grid",
              gridTemplateColumns: "repeat(2,1fr)",
            }}
          >
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
                  name="Reference"
                  id="outlined-basic"
                  label="Reference"
                  value={course.Reference}
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
                  name="Price"
                  id="outlined-basic"
                  label="Price"
                  value={course.Price}
                  onChange={(e) => handleChange(e)}
                  variant="outlined"
                />
              </Box>
            </FormControl>
          </Box>
          <div className={styles.DatePicker}>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <Stack spacing={2}>
                {mobile && (
                  <MobileDateRangePicker
                    startText="Mobile start"
                    value={value}
                    onChange={(newValue) => {
                      setValue(newValue);
                    }}
                    renderInput={(startProps, endProps) => (
                      <React.Fragment>
                        <TextField {...startProps} />
                        <Box sx={{ mx: 1 }}> to </Box>
                        <TextField {...endProps} />
                      </React.Fragment>
                    )}
                  />
                )}
                <DesktopDateRangePicker
                  startText="Desktop start"
                  value={value}
                  onChange={(newValue) => {
                    setValue(newValue);
                  }}
                  renderInput={(startProps, endProps) => (
                    <React.Fragment>
                      <TextField {...startProps} sx={{ width: "280px" }} />
                      <Box sx={{ mx: 1 }}> to </Box>
                      <TextField {...endProps} sx={{ width: "280px" }} />
                    </React.Fragment>
                  )}
                />
              </Stack>
            </LocalizationProvider>
            <GrValidate
              onClick={SaveDate}
              className={styles.ValidateIcon}
              size={30}
            />
          </div>
          <div className={styles.DatePickedDiplay}>{DatesPicked && Dates}</div>
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
                name="Title"
                id="outlined-basic"
                label="Title"
                value={course.Title}
                onChange={(e) => handleChange(e)}
                variant="outlined"
              />
            </Box>
          </FormControl>

          <FormControl sx={{ m: 1, minWidth: "80%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={course.Category}
              onChange={(e) => handleChange(e)}
              name="Category"
              label="Category"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {categories}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: "80%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Trainer
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={course.Trainer}
              onChange={(e) => handleChange(e)}
              name="Trainer"
              label="Trainer"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Trainers}
            </Select>
          </FormControl>
          <FormControl sx={{ m: 1, minWidth: "80%" }}>
            <InputLabel id="demo-simple-select-autowidth-label">
              Level
            </InputLabel>
            <Select
              labelId="demo-simple-select-autowidth-label"
              id="demo-simple-select-autowidth"
              value={course.Level}
              onChange={(e) => handleChange(e)}
              name="Level"
              label="Level"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {Levels}
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
                name="Description"
                id="outlined-basic"
                label="Description"
                value={course.Description}
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
                name="Goals"
                id="outlined-basic"
                label="Goals"
                value={course.Goals}
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
                name="WhoShouldAttend"
                id="outlined-basic"
                label="Who Should Attend"
                value={course.WhoShouldAttend}
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
                name="CourseContent"
                id="outlined-basic"
                label="Course Content"
                value={course.CourseContent}
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
                name="PracticalWork"
                id="outlined-basic"
                label="Practical Work"
                value={course.PracticalWork}
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
