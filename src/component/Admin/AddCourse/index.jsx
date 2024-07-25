import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import Alert from "@mui/material/Alert";
import Box from "@mui/material/Box";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import axios from "axios";
import React, { useEffect, useState } from "react";
import img from "../../assets/profileImgNoUp.svg";
import styles from "./styles.module.css";
// import FileUploadScreen from './screens/FileUploadScreen';
import BackupIcon from "@mui/icons-material/Backup";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { CircularProgress, Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Badge from "@mui/material/Badge";
import IconButton from "@mui/material/IconButton";
import { styled } from "@mui/material/styles";
import {
  multipleFilesUploadWithName,
  singleFileUploadWithName,
} from "../../UploadFunctions/data/api";
import Programs from "../../res/programs";
import VideoSelected from "./VideoSelected";
import "./styles.css";
import { getBase64 } from "../../../shared/image.service";

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Input = styled("input")({
  display: "none",
});
const AddCourse = () => {
  const [loading, setLoading] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));
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
  const initialData = {
    Title: "",
    Description: "",
    Goals: "",
    WhoShouldAttend: "",
    CourseContent: "",
    PracticalWork: "",
    Category: "",
    Price: "",
    Thumbnail: {},
    Videos: [],
    Level: "",
    Reference: "",
    enrolled: [],
    certificate: "",
    rating: 0,
    evaluate: [],
    QuestionsQCM: [],
    QuestionsQR: [],
    testState: "allowed",

    // repeatpassword:""
  };

  const [data, setData] = useState({
    Title: "",
    Description: "",
    Goals: "",
    WhoShouldAttend: "",
    CourseContent: "",
    PracticalWork: "",
    Category: "",
    Price: "",
    Thumbnail: {},
    Videos: [],
    Level: "",
    Reference: "",
    enrolled: [],
    certificate: "",
    rating: 0,
    evaluate: [],
    QuestionsQCM: [],
    QuestionsQR: [],
    testState: "allowed",
    // repeatpassword:""
  });

  const [singleFile, setSingleFile] = useState("");
  const [prev, setPrev] = useState(null);

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
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

  // useEffect(()=>{
  //     uploadSingleFile()
  // },[singleFile])

  const certificates = Programs.map((p, index) => {
    return (
      <MenuItem key={index} value={p.title}>
        {p.title}
      </MenuItem>
    );
  });

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

  const [error, setError] = useState("");

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const [saved, setSaved] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const config = {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` },
    };
    try {
      const url = `${process.env.REACT_APP_API}/api/courses/CreateCourse`;
      axios
        .post(url, data, config)
        .then(async (res) => {
          console.log("id---- :", res.data.id);
          await uploadSingleFile(res.data.id);
          await UploadMultipleFiles();
          await UploadMultipleFilesRessources();
          window.scrollTo(0, 0);
          setSaved(true);
          await new Promise((r) => {
            setTimeout(r, 2000);
          });
          setSaved(false);
          setData(initialData);
          setMultipleFilesSelected([]);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        setError(error.response.data.message);
      }
    }
  };

  ///////////////////////////////
  ///////////////////////////////
  ///////////////////////////////
  ///////////////////////////////
  ///////////////////////////////
  ///////////////////////////////

  // const [multipleFiles, setMultipleFiles] = useState([]);

  // const getMultipleFilesList = async () => {
  // 	try {
  // 		const fileslist = await getMultipleFiles();
  // 		setMultipleFiles(fileslist);
  // 	} catch (error) {
  // 	}
  // }

  //   useEffect(() => {
  // 	getMultipleFilesList();
  //   }, []);

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////

  const [multipleFilesSelectedRessources, setMultipleFilesSelectedRessources] =
    useState([]);

  let filesArrayRessources = [];

  const MultipleFileChangeRessources = (e) => {
    for (let i = 0; i < Object.values(e.target.files).length; i++) {
      setMultipleFilesSelectedRessources((oldSelected) => [
        ...oldSelected,
        Object.values(e.target.files)[i],
      ]);
    }

    //setMultipleFilesSelected([Object.values().concat(multipleFilesSelected)]);
  };

  useEffect(() => {
    if (multipleFilesSelectedRessources.length > 0) {
      multipleFilesSelectedRessources.forEach((element) => {
        const file = {
          fileName: element.name,
          // filePath: element.filePath,
          // fileType: element.mimetype,
          fileSize: fileSizeFormatter(element.size, 2),
        };
        filesArrayRessources.push(file);
      });
    }
  }, [multipleFilesSelectedRessources]);

  const [close, setClose] = useState(false);

  const handleDeleteSelected = (name) => {
    setMultipleFilesSelectedRessources(
      multipleFilesSelectedRessources.filter((item) => item.name !== name)
    );
  };

  const UploadMultipleFilesRessources = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFilesSelectedRessources.length; i++) {
      formData.append("files", multipleFilesSelectedRessources[i]);
    }
    await multipleFilesUploadWithName(
      formData,
      data.Title,
      user._id,
      "Ressources"
    );
    // getMultipleFilesList();
  };

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////

  const [multipleFilesSelected, setMultipleFilesSelected] = useState([]);

  let filesArray = [];

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

  const MultipleFileChange = (e) => {
    for (let i = 0; i < Object.values(e.target.files).length; i++) {
      setMultipleFilesSelected((oldSelected) => [
        ...oldSelected,
        Object.values(e.target.files)[i],
      ]);
    }

    //setMultipleFilesSelected([Object.values().concat(multipleFilesSelected)]);
  };

  useEffect(() => {
    if (multipleFilesSelected.length > 0) {
      multipleFilesSelected.forEach((element) => {
        const file = {
          fileName: element.name,
          // filePath: element.filePath,
          // fileType: element.mimetype,
          fileSize: fileSizeFormatter(element.size, 2),
        };
        filesArray.push(file);
      });
    }
  }, [multipleFilesSelected]);

  const UploadMultipleFiles = async () => {
    const formData = new FormData();
    for (let i = 0; i < multipleFilesSelected.length; i++) {
      formData.append("files", multipleFilesSelected[i]);
    }
    await multipleFilesUploadWithName(formData, data.Title, user._id, "Videos");
    // getMultipleFilesList();
  };

  var selected = multipleFilesSelected.map((element, index) => {
    return (
      <VideoSelected
        setMultipleFilesSelected={setMultipleFilesSelected}
        multipleFilesSelected={multipleFilesSelected}
        element={element}
      />
    );
  });

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

  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
  /////////////////////////////////////////////////
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
                Course created successfully — check it out!
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
              <div className={styles.FileSelector}>
                <label
                  className={styles.selectFiles}
                  htmlFor="contained-button-file"
                >
                  <Input
                    accept="*/*"
                    id="contained-button-file"
                    multiple
                    type="file"
                    onChange={(e) => MultipleFileChange(e)}
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
                  </div>
                </label>
              </div>

              <div
                className=""
                style={{
                  width: "80%",
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "center",
                  alignItems: "center",
                  margin: "auto",
                }}
              >
                {selected}
              </div>

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
              {/* <FormControl sx={{ m: 1, minWidth: "80%" }}>
								<InputLabel id="demo-simple-select-autowidth-label">Trainer</InputLabel>
								<Select
									labelId="demo-simple-select-autowidth-label"
									id="demo-simple-select-autowidth"
									value={data.Trainer}
									onChange={(e)=>handleChange(e)}
									name="Trainer"
									label="Trainer"
								>
								<MenuItem value="">
									<em>None</em>
								</MenuItem>
									{Trainers}
								</Select>
							</FormControl> */}
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
                  {multipleFilesSelectedRessources.length === 0 ? (
                    <p>No files selected</p>
                  ) : (
                    multipleFilesSelectedRessources.map((element, index) => {
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
                    className={styles.selectFiles2}
                    htmlFor="contained-button-file-Ressource"
                  >
                    <Input
                      accept="*/*"
                      id="contained-button-file-Ressource"
                      multiple
                      type="file"
                      onChange={(e) => MultipleFileChangeRessources(e)}
                    />
                    <IconButton
                      onClick={() => {
                        document
                          .getElementById("contained-button-file-Ressource")
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
              {/* <Box className={styles.VideosUpload}>

							</Box> */}

              <Box className={styles.Btn_save}>
                <LoadingButton
                  sx={{ margin: "auto" }}
                  color="success"
                  onClick={handleSubmit}
                  type="submit"
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
      </form>
    </>
  );
};

export default AddCourse;

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
