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
import img from "../../assets/profileImgNoUp.svg";
import { motion } from "framer-motion";
import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import {
  singleFileUpload,
  multipleFilesUpload,
} from "../../UploadFunctions/data/api";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import DoneIcon from "@mui/icons-material/Done";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import CloseIcon from "@mui/icons-material/Close";
import { Typography } from "@mui/material";
import { getBase64 } from "../../../shared/image.service";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Input = styled("input")({
  display: "none",
});

const Update = ({ Course, setOpenChange, openChange }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  const [course, setCourse] = useState(Course);
  const [QuestionsQCM, setQuestionsQCM] = useState([]);
  const [QuestionsQR, setQuestionsQR] = useState([]);
  const [QCMQuestionValues, setQCMQuestionValues] = useState(
    Course.QuestionsQCM
  );
  const [QRQuestionValues, setQRQuestionValues] = useState(Course.QuestionsQR);

  const [QCMQuestions, setQCMQuestions] = useState(true);
  const [QRQuestions, setQRQuestions] = useState(true);
  const [ShowAddQCMElement, setShowAddQCMElement] = useState(false);
  const [ShowAddQRElement, setShowAddQRElement] = useState(false);

  useEffect(() => {
    setCourse({
      ...course,
      QuestionsQCM: QuestionsQCM,
      QuestionsQR: QuestionsQR,
    });
  }, [QuestionsQCM, QuestionsQR]);
  useEffect(() => {
    setCourse(Course);
    setDatesPicked(course.Date);
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
    await singleFileUpload(formData, course._id);
    // window.location.reload(true);
  };

  const handleCloseChange = async () => {
    setOpenChange(false);
    setSelectedFiles(null);
    setPrev(null);
    setSingleFile(null);
  };

  const handleSave = async (e) => {
    e.preventDefault();
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/trainings/updateTraining`;
    axios.post(url, course, config).then(async (res) => {
      if (singleFile !== "") {
        await uploadSingleFile();
      }
      if (selectedFiles?.length > 0) {
        await UploadRessources();
        setSelectedFiles([]);
      }
      await handleCloseChange();
    });
  };

  const handleChange = (e) => {
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

  const [categoriesFromBd, setCategoriesFromBd] = useState([]);

  const HandleCategories = async () => {
    const config = {
      headers: {},
    };
    await axios
      .get(`${process.env.REACT_APP_API}/api/Category/getCategories`)
      .then(async (res) => {
        setCategoriesFromBd(res.data.data);
      });
  };

  const categoriesList = categoriesFromBd.map((c) => {
    return c.Title;
  });

  useEffect(() => {
    HandleCategories();
  }, []);

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

  const Dates = DatesPicked?.map((Date, i) => {
    return (
      <p key={i}>
        from {JSON.stringify(Date[0]).slice(1, 11)} To{" "}
        {JSON.stringify(Date[1]).slice(1, 11)}{" "}
        <AiOutlineCloseCircle
          size={20}
          onClick={() => {
            setDatesPicked((DatesPicked) =>
              DatesPicked?.filter((_, idx) => idx !== i)
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
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const AddQCMElement = () => {
    const OnAddQCM = () => {
      setQuestionsQCM([
        ...QuestionsQCM,
        {
          id: getRandomInt(10000000000, 99999999999),
          Question: QCMQuestionValues.Question,
          Responses: QCMQuestionValues.Responses.split(","),
        },
      ]);
      setQCMQuestions(true);
      setQCMQuestionValues({
        Question: "",
        Responses: [],
      });
    };
    const OnChangeQCM = (e) => {
      setQCMQuestionValues({
        ...QCMQuestionValues,
        [e.target.name]: e.target.value,
      });
    };
    return (
      <div className={styles.AddQCMForm}>
        <FormControl sx={{ m: 1, minWidth: "95%" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            Validate
            autoComplete="true"
          >
            <TextField
              name="Question"
              id="outlined-basic"
              label="Question"
              value={QCMQuestionValues.Question}
              onChange={(e) => OnChangeQCM(e)}
              variant="outlined"
            />
          </Box>
        </FormControl>
        <FormControl sx={{ m: 1, minWidth: "95%" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            Validate
            autoComplete="true"
          >
            <TextField
              name="Responses"
              id="outlined-basic"
              label="Responses"
              value={QCMQuestionValues.Responses}
              onChange={(e) => OnChangeQCM(e)}
              variant="outlined"
            />
          </Box>
        </FormControl>
        <Box className={styles.Btn_save} sx={{ "& > button": { m: 1 } }}>
          <LoadingButton
            color="success"
            onClick={OnAddQCM}
            type="button"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Add
          </LoadingButton>
        </Box>
      </div>
    );
  };
  const AddQRElement = () => {
    const OnAddQR = () => {
      setQuestionsQR([
        ...QuestionsQR,
        {
          id: getRandomInt(10000000000, 99999999999),
          Question: QRQuestionValues.Question,
        },
      ]);
      setQRQuestions(true);
      setQRQuestionValues({
        Question: "",
      });
    };
    const OnChangeQR = (e) => {
      setQRQuestionValues({
        ...QRQuestionValues,
        [e.target.name]: e.target.value,
      });
    };

    return (
      <div className={styles.AddQCMForm}>
        <FormControl sx={{ m: 1, minWidth: "95%" }}>
          <Box
            component="form"
            sx={{
              "& > :not(style)": { width: "100%" },
            }}
            Validate
            autoComplete="true"
          >
            <TextField
              name="Question"
              id="outlined-basic"
              label="Question"
              value={QRQuestionValues.Question}
              onChange={(e) => OnChangeQR(e)}
              variant="outlined"
            />
          </Box>
        </FormControl>

        <Box className={styles.Btn_save} sx={{ "& > button": { m: 1 } }}>
          <LoadingButton
            color="success"
            onClick={OnAddQR}
            type="button"
            loadingPosition="start"
            startIcon={<SaveIcon />}
            variant="contained"
          >
            Add
          </LoadingButton>
        </Box>
      </div>
    );
  };

  /************************************************** */

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [close, setClose] = useState(false);
  let filesArray = [];

  const handleDeleteSelected = (name) => {
    setSelectedFiles(selectedFiles?.filter((item) => item.name !== name));
  };

  const handleDeletefromCourse = async (name) => {
    setCourse({
      ...course,
      Ressources: course.Ressources.filter((item) => item.fileName !== name),
    });
  };

  const fileSizeFormatter = (bytes, decimal) => {
    if (bytes === 0) {
      return "0 Bytes";
    }
    const dm = decimal || 2;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "YB", "ZB"];
    const index = Math.floor(Math.log(bytes) / Math.log(1000));
    return (
      parseFloat((bytes / Math.pow(1000, index)).toFixed(dm)) +
      " " +
      sizes[index]
    );
  };

  const selectedFilesChange = (e) => {
    for (let i = 0; i < Object.values(e.target.files).length; i++) {
      setSelectedFiles((oldSelected) => [
        ...oldSelected,
        Object.values(e.target.files)[i],
      ]);
    }

    //setSelectedFiles([Object.values().concat(selectedFiles)]);
  };

  useEffect(() => {
    if (selectedFiles?.length > 0) {
      selectedFiles?.forEach((element) => {
        const file = {
          fileName: element.name,
          // filePath: element.filePath,
          // fileType: element.mimetype,
          fileSize: fileSizeFormatter(element.size, 2),
        };
        filesArray.push(file);
      });
    }
  }, [selectedFiles]);

  const UploadRessources = async () => {
    const formData = new FormData();
    for (let i = 0; i < selectedFiles?.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    await multipleFilesUpload(formData, course.Title, user._id, course._id);
    // getMultipleFilesList();
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
            Update Course
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
                {course.Thumbnail ? (
                  <Avatar
                    alt="icon"
                    src={`${process.env.REACT_APP_API}/${course.Thumbnail.filePath}`}
                    sx={{ width: 200, height: 200 }}
                  />
                ) : (
                  <Avatar
                    alt="icon"
                    src={img}
                    sx={{ width: 200, height: 200 }}
                  />
                )}
              </>
            )}
          </Badge>
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
          <div className={styles.AddTest}>
            <h3>Add Test</h3>
            <div className={styles.QCMdiv}>
              <h4>QCM</h4>
              <div
                style={QCMQuestions ? {} : { display: "none" }}
                className={styles.Questions}
              >
                {QuestionsQCM.map((e, index) => {
                  return (
                    <div className={styles.QCMShowLists} key={e.id}>
                      <p>
                        {index + 1}- {e.Question}
                      </p>
                      <div>
                        {e.Responses.map((element) => {
                          <p>{element}</p>;
                        })}
                      </div>
                    </div>
                  );
                })}
              </div>
              <div className={styles.AddQCM}>
                <h5>Add QCM</h5>
                <IconButton
                  onClick={() => {
                    setShowAddQCMElement(true);
                  }}
                  aria-label="Add"
                  color="primary"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
              {ShowAddQCMElement ? <AddQCMElement /> : ""}
            </div>
            <div className={styles.QRdiv}>
              <h4>QR</h4>
              <div
                style={QRQuestions ? {} : { display: "none" }}
                className={styles.Questions}
              >
                {QuestionsQR.map((e, index) => {
                  return (
                    <div>
                      <p>
                        {index + 1}- {e.Question}
                      </p>
                    </div>
                  );
                })}
              </div>
              <div className={styles.AddQR}>
                <h5>Add QR</h5>
                <IconButton
                  onClick={() => {
                    setShowAddQRElement(true);
                  }}
                  aria-label="Add"
                  color="primary"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </div>
              {ShowAddQRElement ? <AddQRElement /> : ""}
            </div>
          </div>

          <div className={styles.AddRessources}>
            <h3>Add Ressources</h3>

            <div className={styles.Ressources}>
              {selectedFiles?.length === 0 ? (
                <p>No New files selected</p>
              ) : (
                selectedFiles?.map((element, index) => {
                  return (
                    <div key={element.name} className={styles.fileUploaded}>
                      <UploadFileIcon className={styles.IconFile} />
                      <div className={styles.TitleFile}>
                        <Typography
                          noWrap
                          sx={{ color: "black", width: "80%" }}
                        >
                          {element.name}
                        </Typography>
                        <span className="">
                          {fileSizeFormatter(element.size, 2)}
                        </span>
                      </div>
                      <Box
                        onMouseOver={() => setClose(true)}
                        onMouseLeave={() => setClose(false)}
                      >
                        {close ? (
                          <CloseIcon
                            onClick={() => handleDeleteSelected(element.name)}
                            className={styles.IconFile}
                          />
                        ) : (
                          <DoneIcon className={styles.IconFile} />
                        )}
                      </Box>
                    </div>
                  );
                })
              )}

              {course.Ressources.length === 0
                ? ""
                : course.Ressources.map((element, index) => {
                    return (
                      <div
                        key={element.fileName}
                        className={styles.fileUploaded}
                      >
                        <UploadFileIcon className={styles.IconFile} />
                        <div className={styles.TitleFile}>
                          <Typography
                            noWrap
                            sx={{ color: "black", width: "80%" }}
                          >
                            {element.fileName}
                          </Typography>
                          <span className="">{element.fileSize}</span>
                        </div>
                        <Box
                          onMouseOver={() => setClose(true)}
                          onMouseLeave={() => setClose(false)}
                        >
                          {close ? (
                            <CloseIcon
                              onClick={() =>
                                handleDeletefromCourse(element.fileName)
                              }
                              className={styles.IconFile}
                            />
                          ) : (
                            <DoneIcon className={styles.IconFile} />
                          )}
                        </Box>
                      </div>
                    );
                  })}
            </div>
            <div className={styles.AddRessource}>
              <h5>Select Files</h5>
              <label
                className={styles.selectFiles}
                htmlFor="contained-button-file"
              >
                <Input
                  accept="*/*"
                  id="contained-button-file"
                  multiple
                  type="file"
                  onChange={(e) => selectedFilesChange(e)}
                />
                <IconButton
                  onClick={() => {
                    document.getElementById("contained-button-file").click();
                  }}
                  aria-label="Add"
                  color="primary"
                >
                  <AddCircleOutlineIcon />
                </IconButton>
              </label>
            </div>
          </div>

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
