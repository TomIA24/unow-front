import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import SaveIcon from "@mui/icons-material/Save";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";

import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import { Typography } from "@mui/material";
import Alert from "@mui/material/Alert";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import IconButton from "@mui/material/IconButton";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import CircularProgressWithLabel from "../../../Custom/CircularProgressWithLabel";
import { styled } from "@mui/material/styles";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { GrValidate } from "react-icons/gr";
import { useNavigate } from "react-router-dom";
import {
  multipleFilesUploadWithName,
  singleFileUploadWithName,
} from "../../UploadFunctions/data/api";
import img from "../../assets/profileImgNoUp.svg";
import Programs from "../../res/programs";
import styles from "./styles.module.css";
import { CircularProgress } from "@material-ui/core";
import { getBase64 } from "../../../shared/image.service";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Input = styled("input")({
  display: "none",
});

const AddTraining = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [DatesPicked, setDatesPicked] = useState([]);
  const [value, setValue] = useState([null, null]);
  const [count, setCount] = useState(0);
  const [QuestionsQCM, setQuestionsQCM] = useState([]);
  const [QuestionsQR, setQuestionsQR] = useState([]);
  const [QCMQuestionValues, setQCMQuestionValues] = useState({
    Question: "",
    Responses: "",
    ResAcceptable: "",
  });
  const [QRQuestionValues, setQRQuestionValues] = useState({
    Question: "",
  });

  const [QCMQuestions, setQCMQuestions] = useState(false);
  const [QRQuestions, setQRQuestions] = useState(false);
  const [ShowAddQCMElement, setShowAddQCMElement] = useState(false);
  const [ShowAddQRElement, setShowAddQRElement] = useState(false);

  useEffect(() => {
    setData({ ...data, QuestionsQCM: QuestionsQCM, QuestionsQR: QuestionsQR });
  }, [QuestionsQCM, QuestionsQR]);

  const SaveDate = () => {
    setDatesPicked([value]);
    // setDatesPicked([...DatesPicked , value])
    setValue([null, null]);
  };

  useEffect(() => {
    console.log(DatesPicked);
  }, [DatesPicked]);
  const Dates = DatesPicked.map((D, i) => {
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    // Parse ISO 8601 formatted strings into Date objects
    const startDate = new Date(D[0]);
    const endDate = new Date(D[1]);
   console.log(startDate.getUTCMonth() );
    return (
      <p key={i}>
        {`from ${months[startDate.getUTCMonth()]}, ${startDate.getUTCDate()} ${startDate.getUTCFullYear()} to ${months[endDate.getUTCMonth()]}, ${endDate.getUTCDate()} ${endDate.getUTCFullYear()}`}
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


  const initialData = {
    Title: "",
    Trainer: "",
    Description: "",
    Goals: "",
    WhoShouldAttend: "",
    CourseContent: "",
    PracticalWork: "",
    Category: "",
    Price: "",
    Thumbnail: {},
    Level: "",
    Reference: "",
    Date: DatesPicked,
    TimePerDay: null,
    enrolled: [],
    state: "none",
    certificate: "",
    QuestionsQCM: [],
    QuestionsQR: [],
    testState: "closed",
  };

  const [mobile, setMobile] = useState(false);
  const [data, setData] = useState({
    Title: "",
    Trainer: "",
    Description: "",
    Goals: "",
    WhoShouldAttend: "",
    CourseContent: "",
    PracticalWork: "",
    Category: "",
    Price: "",
    Thumbnail: {},
    Level: "",
    Reference: "",
    Date: DatesPicked,
    TimePerDay: {},
    enrolled: [],
    state: "none",
    certificate: "",
    QuestionsQCM: [],
    QuestionsQR: [],
    testState: "allowed", //closed
  });

  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

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

  const certificates = Programs.map((p, index) => {
    return (
      <MenuItem key={index} value={p.title}>
        {p.title}
      </MenuItem>
    );
  });

  const [singleFile, setSingleFile] = useState("");
  const [singleFilePath, setSingleFilePath] = useState("");
  const [prev, setPrev] = useState(null);

  const SingleFileChange = async (e) => {
    console.log(e.target.files[0]);
    setSingleFile(e.target.files[0]);
    const reader = new FileReader();
    reader.onload = () => {
      const imageUrl = reader.result;
      setSingleFilePath(imageUrl);
    };

    getBase64(e.target.files[0]).then((data) => {
      setPrev(data);
    });
  };

  const [uploadProgress, setUploadProgress] = useState(0);

  const uploadSingleFile = async (id) => {
    const formData = new FormData();
    formData.append("file", singleFile);
    await singleFileUploadWithName(
      formData,
      data.Title,
      user._id,
      id,
      setUploadProgress
    );
  };

  const [categoriesFromBd, setCategoriesFromBd] = useState([]);
  const [trainersFromBd, setTrainersFromBd] = useState([]);

  const HandleCategoriesAndTrainers = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    await axios
      .get(`${process.env.REACT_APP_API}/api/Category/getCategories`, config)
      .then(async (res) => {
        setCategoriesFromBd(res.data.data);
      });
    await axios
      .post(`${process.env.REACT_APP_API}/api/Trainer/showTrainers`, {}, config)
      .then(async (res) => {
        setTrainersFromBd(res.data.trainers);
      });
  };

  const categoriesList = categoriesFromBd.map((c) => {
    return c.Title;
  });

  useEffect(() => {
    HandleCategoriesAndTrainers();
  }, []);

  const categories = categoriesList.map((category) => {
    return (
      <MenuItem key={category} value={category}>
        {category}
      </MenuItem>
    );
  });

  const Trainers = categoriesFromBd.map((Trainer) => {
    return (
      <MenuItem key={Trainer._id} value={Trainer._id}>
        {Trainer.name}
      </MenuItem>
    );
  });

  const token = localStorage.getItem("token");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [saved, setSaved] = useState(false);
  useEffect(() => {
    setData({ ...data, Date: DatesPicked });
  }, [DatesPicked]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `${process.env.REACT_APP_API}/api/trainings/CreateTraining`;
      await axios
        .post(url, data, config)
        .then(async (res) => {
          await uploadSingleFile(res.data.id);
          if (selectedFiles.length > 0) {
            await UploadRessources();
          }
          setData(initialData);
          setDatesPicked([]);
          setValue([null, null]);
          window.scrollTo(0, 0);
          setSaved(true);
          await new Promise((r) => {
            setTimeout(r, 2000);
          });
          setSaved(false);
          setData(initialData);
          setUploadProgress(0);
        })
        .catch((err) => {});
    } catch (error) {
      setUploadProgress(0);

      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  const OnChangeQCM = (e) => {
    setQCMQuestionValues({
      ...QCMQuestionValues,
      [e.target.name]: e.target.value,
    });
  };

  const OnAddQCM = async () => {
    setQuestionsQCM([
      ...QuestionsQCM,
      {
        id: getRandomInt(10000000000, 99999999999),
        Question: QCMQuestionValues.Question,
        Responses: QCMQuestionValues.Responses,
        ResAcceptable: QCMQuestionValues.ResAcceptable,
      },
    ]);
    setQCMQuestions(true);
    setQCMQuestionValues({
      Question: "",
      Responses: "",
      ResAcceptable: "",
    });
  };

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
    setQRQuestionValues({ [e.target.name]: e.target.value });
  };

  /************************ */

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [close, setClose] = useState(false);
  let filesArray = [];

  const handleDeleteSelected = (name) => {
    setSelectedFiles(selectedFiles.filter((item) => item.name !== name));
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
    if (selectedFiles.length > 0) {
      selectedFiles.forEach((element) => {
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
    for (let i = 0; i < selectedFiles.length; i++) {
      formData.append("files", selectedFiles[i]);
    }
    await multipleFilesUploadWithName(
      formData,
      data.Title,
      user._id,
      "Ressources"
    );
  };

  return (
    <>
      <form className={styles.CourseForm} action="">
        <div className={styles.Success}>
          {saved && (
            <Stack sx={{ width: "100%" }} spacing={2}>
              <Alert
                severity="success"
                variant="filled"
                onClose={() => {
                  setSaved(false);
                }}
              >
                Training created successfully — check it out!
              </Alert>
            </Stack>
          )}
          {/*you can remove variant="filled" */}
        </div>

        <div className={styles.MainDiv}>
          <form action="" className={styles.leftSection}>
            <div className={styles.ImgUploadSection}>
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
                        onChange={(e) => {
                          SingleFileChange(e);
                        }}
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
                {/* {
								data.Thumbnail!==null ? 
									
									<React.Fragment>
										<Avatar alt="icon" src={`localhost:8080/uploads/${data.Thumbnail.fileName}`} sx={{ width: 200, height: 200 }}/>
									</React.Fragment>

								: */}
                {prev ? (
                  <Avatar
                    alt="icon2"
                    src={prev}
                    sx={{ width: 200, height: 200 }}
                  />
                ) : (
                  <Avatar
                    alt="icon"
                    src={img}
                    style={{ width: 200, height: 200 }}
                  />
                )}

                <Box
                  sx={{
                    position: "absolute",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    // backgroundColor: "red",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={uploadProgress}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: "absolute",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <Typography
                      variant="caption"
                      component="div"
                      color="text.secondary"
                    >
                      {`${Math.round(uploadProgress)}%`}
                    </Typography>
                  </Box>
                </Box>
              </Badge>
            </div>
            <div className={styles.InfosSuction}>
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
                    value={data.Title}
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
                  value={data.Category}
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
                  value={data.Trainer}
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
                  value={data.Level}
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
                    value={data.Description}
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
                    value={data.Goals}
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
                    value={data.WhoShouldAttend}
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
                    value={data.CourseContent}
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
                    value={data.PracticalWork}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                  />
                </Box>
              </FormControl>
              <FormControl sx={{ m: 1, minWidth: "80%" }}>
                <InputLabel id="demo-simple-select-autowidth-label">
                  certificate
                </InputLabel>
                <Select
                  labelId="demo-simple-select-autowidth-label"
                  id="demo-simple-select-autowidth"
                  value={data.certificate}
                  onChange={(e) => handleChange(e)}
                  name="certificate"
                  label="certificate"
                >
                  <MenuItem value="">
                    <em>None</em>
                  </MenuItem>
                  {certificates}
                </Select>
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
                            {index + 1}- {e.Question} :{" "}
                          </p>
                          <p>[{e.Responses}]</p>

                          {/* .split(",").map((element,index) => {
																				if(e.Responses.split(",")[index+1]!=='undefined'){
																					return(<p>{element}-</p>)
																				}
																				return(<p>{element}</p>)
																			}) */}
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
                  {ShowAddQCMElement ? (
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
                            name="ResAcceptable"
                            id="outlined-basic"
                            label="Acceptable Result"
                            value={QCMQuestionValues.ResAcceptable}
                            onChange={(e) => OnChangeQCM(e)}
                            variant="outlined"
                          />
                        </Box>
                      </FormControl>
                      <Box
                        className={styles.Btn_save}
                        sx={{ "& > button": { m: 1 } }}
                      >
                        <LoadingButton
                          color="success"
                          onClick={OnAddQCM}
                          type="button"
                          loading={loading}
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="contained"
                        >
                          Add
                        </LoadingButton>
                      </Box>
                    </div>
                  ) : (
                    ""
                  )}
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
                  {ShowAddQRElement ? (
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

                      <Box
                        className={styles.Btn_save}
                        sx={{ "& > button": { m: 1 } }}
                      >
                        <LoadingButton
                          color="success"
                          onClick={OnAddQR}
                          type="button"
                          loading={loading}
                          loadingPosition="start"
                          startIcon={<SaveIcon />}
                          variant="contained"
                        >
                          Add
                        </LoadingButton>
                      </Box>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
              </div>

              {/********************************************************************************************************** */}

              <div className={styles.AddRessources}>
                <h3>Add Ressources</h3>

                <div className={styles.Ressources}>
                  {selectedFiles.length === 0 ? (
                    <p>No files selected</p>
                  ) : (
                    selectedFiles.map((element, index) => {
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
                              {fileSizeFormatter(element.size, 2)} KB
                            </span>
                          </div>
                          <Box
                            onMouseOver={() => setClose(true)}
                            onMouseLeave={() => setClose(false)}
                          >
                            {close ? (
                              <CloseIcon
                                onClick={() =>
                                  handleDeleteSelected(element.name)
                                }
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
                        document
                          .getElementById("contained-button-file")
                          .click();
                      }}
                      aria-label="Add"
                      color="primary"
                    >
                      <AddCircleOutlineIcon />
                    </IconButton>
                  </label>
                </div>
              </div>
            </div>
          </form>
          <div className={styles.rightSection}>
            <div className={styles.scndInfos}>
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
                    value={data.Reference}
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
                    value={data.Price}
                    onChange={(e) => handleChange(e)}
                    variant="outlined"
                  />
                </Box>
              </FormControl>
              <div className={styles.Date}>
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
                            <TextField {...startProps} />
                            <Box sx={{ mx: 1 }}> to </Box>
                            <TextField {...endProps} />
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
                <div className={styles.DatePickedDiplayBlock}>
                  <div className={styles.DatePickedDiplay}>
                    {DatesPicked.length > 0 ? Dates : <p>No date picked</p>}
                  </div>
                </div>
                <div className={styles.TimePicker}>
                  <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <Stack sx={{ width: "90%" }}>
                      <DesktopTimePicker
                        name="time"
                        label="Select Time"
                        value={data.TimePerDay}
                        onChange={(newTime) => {
                          setData({ ...data, TimePerDay: newTime });
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </Stack>
                  </LocalizationProvider>
                </div>
                <Box
                  className={styles.Btn_save}
                  sx={{ "& > button": { m: 1 } }}
                >
                  <LoadingButton
                    color="success"
                    onClick={handleSubmit}
                    type="submit"
                    loading={loading}
                    loadingPosition="start"
                    startIcon={<SaveIcon />}
                    variant="contained"
                  >
                    Save
                  </LoadingButton>
                </Box>
              </div>
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default AddTraining;

// <div className={styles.FirstFormSection}>
// 						<div  className={styles.ImgSelector}>

// 						</div>
// 						<div  className={styles.PrimaryInfos}>
// 							<FormControl  sx={{ m: 1, minWidth: "80%" }}>
// 								<Box
// 									component="form"
// 									sx={{
// 										'& > :not(style)': {  width: '100%' },
// 									}}
// 									Validate
// 									autoComplete="off"
// 								>
// 									<TextField
// 										name="Title"
// 										id="outlined-basic"
// 										label="Title"
// 										value={data.Title}
// 										onChange={(e)=>handleChange(e)}
// 										variant="outlined"
// 									/>
// 								</Box>
// 							</FormControl>
// 							<FormControl sx={{ m: 1, minWidth: "80%" }}>
// 								<InputLabel id="demo-simple-select-autowidth-label">Category</InputLabel>
// 								<Select
// 								labelId="demo-simple-select-autowidth-label"
// 								id="demo-simple-select-autowidth"
// 								value={data.Category}
// 								onChange={(e)=>handleChange(e)}
// 								name="Category"
// 								label="Category"
// 								>
// 								<MenuItem value="">
// 									<em>None</em>
// 								</MenuItem>
// 									{categories}
// 								</Select>
// 							</FormControl>
// 							<FormControl sx={{ m: 1, minWidth: "80%" }}>
// 								<InputLabel id="demo-simple-select-autowidth-label">Trainer</InputLabel>
// 								<Select
// 								labelId="demo-simple-select-autowidth-label"
// 								id="demo-simple-select-autowidth"
// 								value={data.Trainer}
// 								onChange={(e)=>handleChange(e)}
// 								name="Trainer"
// 								label="Trainer"
// 								>
// 								<MenuItem value="">
// 									<em>None</em>
// 								</MenuItem>
// 									{Trainers}
// 								</Select>
// 							</FormControl>
// 						</div>
// 					</div>
// 					<div className={styles.SecondFormSection}>
// 						<FormControl className={styles.FormControl} sx={{ m: 1, minWidth: "89%" }}>
// 							<Box
// 								component="form"
// 								sx={{
// 									'& > :not(style)': {  width: '100%' },
// 								}}
// 								noValidate
// 								autoComplete="off"
// 							>
// 								<TextField
// 									multiline
// 									name="Description"
// 									id="outlined-basic"
// 									label="Description"
// 									value={data.Description}
// 									onChange={(e)=>handleChange(e)}
// 									variant="outlined"
// 								/>
// 							</Box>
// 						</FormControl>
// 						<FormControl className={styles.FormControl} sx={{ m: 1, minWidth: "89%" }}>
// 							<Box
// 								component="form"
// 								sx={{
// 									'& > :not(style)': {  width: '100%' },
// 								}}
// 								noValidate
// 								autoComplete="off"
// 							>
// 								<TextField
// 									multiline
// 									name="Goals"
// 									id="outlined-basic"
// 									label="Goals"
// 									value={data.Goals}
// 									onChange={(e)=>handleChange(e)}
// 									variant="outlined"
// 								/>
// 							</Box>
// 						</FormControl>
// 						<FormControl className={styles.FormControl} sx={{ m: 1, minWidth: "89%" }}>
// 							<Box
// 								component="form"
// 								sx={{
// 									'& > :not(style)': {  width: '100%' },
// 								}}
// 								noValidate
// 								autoComplete="off"
// 							>
// 								<TextField
// 									multiline
// 									name="WhoShouldAttend"
// 									id="outlined-basic"
// 									label="Who Should Attend"
// 									value={data.WhoShouldAttend}
// 									onChange={(e)=>handleChange(e)}
// 									variant="outlined"
// 								/>
// 							</Box>
// 						</FormControl>
// 						<FormControl className={styles.FormControl} sx={{ m: 1, minWidth: "89%" }}>
// 							<Box
// 								component="form"
// 								sx={{
// 									'& > :not(style)': {  width: '100%' },
// 								}}
// 								noValidate
// 								autoComplete="off"
// 							>
// 								<TextField
// 									multiline
// 									name="CourseContent"
// 									id="outlined-basic"
// 									label="Course Content"
// 									value={data.CourseContent}
// 									onChange={(e)=>handleChange(e)}
// 									variant="outlined"
// 								/>
// 							</Box>
// 						</FormControl>
// 						<FormControl className={styles.FormControl} sx={{ m: 1, minWidth: "89%" }}>
// 							<Box
// 								component="form"
// 								sx={{
// 									'& > :not(style)': {  width: '100%' },
// 								}}
// 								noValidate
// 								autoComplete="off"
// 							>
// 								<TextField
// 									multiline
// 									name="PracticalWork"
// 									id="outlined-basic"
// 									label="Practical Work"
// 									value={data.PracticalWork}
// 									onChange={(e)=>handleChange(e)}
// 									variant="outlined"
// 								/>
// 							</Box>
// 						</FormControl>
// 					</div>
// 					<Box sx={{ '& > button': { m: 1 } }}>

// 						<LoadingButton
// 							color="success"
// 							onClick={handleSubmit}
// 							loading={loading}
// 							loadingPosition="start"
// 							startIcon={<SaveIcon />}
// 							variant="contained"
// 						>
// 							Save
// 						</LoadingButton>
// 					</Box>
// 					{/* <button className={styles.FirstFormSection}>

// 					</button> */}
