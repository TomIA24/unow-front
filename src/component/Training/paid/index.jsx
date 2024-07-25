import FolderIcon from "@mui/icons-material/Folder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormControl from "@mui/material/FormControl";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormLabel from "@mui/material/FormLabel";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Rating from "@mui/material/Rating";
import Typography from "@mui/material/Typography";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Footer from "../../footer";
import Evaluate from "./Evaluate";
import Ressources from "./Ressources";
import styles from "./styles.module.css";
// import Evaluation from "./Evaluation"
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import { green, red } from "@mui/material/colors";
import Loading from "../../Loading";
import Nav from "../../Nav";

const PaidTraining = () => {
  let { id } = useParams();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [loading, setLoading] = useState(true);
  const [urlRoom, setUrlRoom] = useState("");

  const handleRoom = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
      params: { id: id },
    };
    await axios
      .post(
        `${process.env.REACT_APP_API}/api/trainings/getRoom`,
        {
          courseId: id,
        },
        config
      )
      .then(async (res) => {
        setUrlRoom(res.data.data);
        console.log(res.data.data);
        setLoading(false);
      });
  };

  const [error, setError] = useState("");
  const [openEvaluate, setOpenEvaluate] = useState(false);
  const [openRessources, setOpenRessources] = useState(false);
  const [Evaluations, setEvaluations] = useState([]);
  const [EvaluationsCompleated, setEvaluationsCompleated] = useState([]);
  const [usersLimited, setUsersLimited] = useState([]);
  const [evaluationResult, setEvaluationResult] = useState({
    QCM: [],
    QR: [],
  });
  const [Data, setData] = useState({
    _id: "",
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
    Video: [],
    Level: "",
    Reference: "",
    Date: [],
    enrolled: [],
    state: "",
    certificate: "",
    evaluate: [],
  });

  useEffect(async () => {
    await handleCourse();
    await getEvaluations();
    await handleRoom();
  }, []);

  useEffect(() => {
    getEvaluations();
  }, [Data]);

  const handleCourse = async () => {
    const config = {
      headers: {},

      params: { id: id },
    };
    await axios
      .get(`${process.env.REACT_APP_API}/api/trainings/specific`, config)
      .then(async (res) => {
        console.log("Data : -- ", res.data.data);
        setData(res.data.data);
        setEvaluations(res.data.data.evaluate);
        setEvaluationResult({
          QCM: res.data.data.QuestionsQCM.map((qcm) => {
            return {
              id: qcm.id,
              Question: qcm.Question,
              Response: "",
              ResAcceptable: qcm.ResAcceptable,
            };
          }),
          QR: res.data.data.QuestionsQR.map((qr) => {
            return { id: qr.id, Question: qr.Question, Response: "" };
          }),
        });
        console.log(Data);
      });
  };
  const [evaluationsFromBase, setEvaluationsFormBase] = useState([]);

  const getEvaluations = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },

      params: { id: id },
    };
    await axios
      .post(
        `${process.env.REACT_APP_API}/api/evaluations/getEvaluations`,
        {
          courseId: id,
          student: user._id,
        },
        config
      )
      .then((res) => {
        console.log(res.data.Evaluations);
        setEvaluationsFormBase(res.data.Evaluations);
      });
  };

  const GetUsers = (ids) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    axios
      .post(
        `${process.env.REACT_APP_API}/api/Candidat/returnCandidatForRatingInfo`,
        { ids: ids },
        config
      )
      .then((res) => {
        setUsersLimited(res.data.usersLimited);
      });
  };

  useEffect(async () => {
    const ids = Evaluations.map((e) => {
      return e.id;
    });
    GetUsers(ids);
  }, [Evaluations]);

  useEffect(async () => {
    var list = [];
    Evaluations.map((e) => {
      usersLimited.map((u) => {
        if (u._id === e.id) {
          list.push({
            id: e.id,
            message: e.message,
            rate: e.rate,
            name: u.userName,
            image: u.image,
          });
        }
      });
    });
    setEvaluationsCompleated(list);
  }, [usersLimited]);

  const TextRating = (value, avis) => {
    return (
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center",
        }}
      >
        <Rating
          name="text-feedback"
          value={value}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        />
        <Box sx={{ ml: 2 }}>({avis} avis)</Box>
      </Box>
    );
  };
  // const [Enrolled, setEnrolled] =useState(false)
  // const [Paid, setPaid] =useState(false)
  // const [PaidBtn,setPaidBtn]=useState(false)
  /************/ //////////////////////// */
  const [WindowWidth, setWindowWidth] = useState(0);
  const handleWidthChange = () => {
    const currentWidth = window.innerWidth;
    setWindowWidth(currentWidth);
  };

  useEffect(() => {
    handleWidthChange();
    window.addEventListener("resize", handleWidthChange);
    return () => {
      window.removeEventListener("resize", handleWidthChange);
    };
  }, []);
  const [mobileView, setMobileView] = useState(false);
  useEffect(() => {
    //console.log(WindowWidth)
    if (WindowWidth <= 756) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, []);
  useEffect(() => {
    console.log(WindowWidth);
    if (WindowWidth <= 756) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [WindowWidth]);
  const [TestState, setTestState] = useState("");
  /*********************************************************** */
  useEffect(() => {
    console.log("evaluationsFromBase: ", evaluationsFromBase);
    if (Data.testState) {
      if (evaluationsFromBase.length > 0) {
        setTestState(true);
      } else {
        if (Data.testState === "closed") {
          setTestState(true);
        } else if (Data.testState === "allowed") {
          setTestState(false);
        }
      }
    }
  }, [Data, evaluationsFromBase]);

  useEffect(() => {
    console.log("evaluationsFromBase: ", evaluationsFromBase);
  }, [evaluationsFromBase]);

  const [evaluation, setEvaluation] = useState({
    trainer: Data.Trainer,
    course: Data._id,
    student: user._id,
    Evaluation: {},
  });

  useEffect(() => {
    setEvaluation({
      ...evaluation,
      trainer: Data.Trainer,
      course: Data._id,
    });
  }, [Data]);

  const [changingResultEvaluations, setChangingResultEvaluations] = useState(
    []
  );
  const handleResponseQCM = async (e, id) => {
    console.log(e.target.value);

    console.log("test:", evaluationResult.QCM);
    setChangingResultEvaluations(
      evaluationResult.QCM.map((ev) => {
        if (ev.id === id) {
          return {
            ...ev,
            Response: e.target.value,
            Result: e.target.value === ev.ResAcceptable,
          };
        }

        return ev;
      })
    );
  };

  useEffect(() => {
    console.log("changes:", changingResultEvaluations);
    setEvaluationResult({
      ...evaluationResult,
      QCM: changingResultEvaluations,
    });
  }, [changingResultEvaluations]);

  useEffect(() => {
    console.log("Evaluation result:", evaluationResult);
    setEvaluation({ ...evaluation, Evaluation: evaluationResult });
  }, [evaluationResult]);

  const handleEvaluation = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    console.log("data to save: ", evaluation.Evaluation);
    await axios
      .post(
        `${process.env.REACT_APP_API}/api/evaluations/setEvaluation`,
        {
          Data: evaluation,
        },
        config
      )
      .then((res) => {
        alert(res.data.message);
        window.location.reload(true);
      });
  };

  // const handleResponseQR = (e,id) =>{
  //     console.log(evaluationResult.QR)
  //     const list = evaluationResult.QR.map(ev=>{
  //         if(ev.id === id){
  //             return {
  //                 ...ev,
  //                 Response: e.target.value
  //             }
  //         }

  //         return ev
  //     })

  //     setEvaluationResult({...evaluationResult,
  //         QR:  list
  //     })
  // }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <React.Fragment>
        <Nav />

        <main className={styles.MotherDivCourse}>
          <div className={styles.MainDivCourse}>
            <div className={styles.leftSectionCourse}>
              <div className={styles.FirsSectionInfoCourse}>
                {Data.Thumbnail === "qqq" ||
                Data.Thumbnail == {} ||
                !Data.Thumbnail ? (
                  <img
                    src={`${process.env.REACT_APP_API}/uploads/courseImg.png`}
                    alt=""
                    className={styles.imgCourse}
                  />
                ) : (
                  <img
                    src={`${process.env.REACT_APP_API}/${Data.Thumbnail.filePath}`}
                    alt=""
                    className={styles.imgCourse}
                  />
                )}
                <div className={styles.FirsSectionInfoCourseTitle}>
                  <h1>{Data.Title}</h1>
                  <h4>{Data.Category}</h4>
                  {Data.rating
                    ? TextRating(Data.rating, Data.evaluate.length)
                    : TextRating(0, 0)}
                </div>
                <div className={styles.Btn_Div}>
                  {Data.state === "expired" ? (
                    <Button
                      disabled
                      sx={{ width: "200px" }}
                      variant="outlined"
                      endIcon={<PlayArrowIcon />}
                    >
                      Start Training &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                    </Button>
                  ) : (
                    <Link to={{ pathname: `/room/${urlRoom}` }}>
                      <Button
                        sx={{ width: "200px" }}
                        variant="outlined"
                        endIcon={<PlayArrowIcon />}
                      >
                        Start Training &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      </Button>
                    </Link>
                  )}

                  <Button
                    sx={{ width: "200px" }}
                    onClick={() => {
                      setOpenEvaluate(true);
                    }}
                    variant="outlined"
                    endIcon={<StarIcon />}
                  >
                    Evaluate Training
                  </Button>

                  <Button
                    sx={{ width: "200px" }}
                    onClick={() => {
                      setOpenRessources(true);
                    }}
                    variant="outlined"
                    endIcon={<FolderIcon />}
                  >
                    Ressources
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                </div>
              </div>
              <div className={styles.ScndSectionInfoCourse}>
                <div className={styles.DescriptionInfoCourse}>
                  <div className={styles.Accordion}>
                    <Accordion disabled={TestState}>
                      {/*  */}
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                      >
                        <Typography>Evaluation</Typography>
                      </AccordionSummary>
                      <AccordionDetails>
                        <Accordion>
                          {/* disabled */}
                          <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                          >
                            <Typography>QCM</Typography>
                          </AccordionSummary>
                          <AccordionDetails>
                            {Data.QuestionsQCM
                              ? Data.QuestionsQCM.map((qcm, index) => {
                                  return (
                                    <Accordion key={qcm.id}>
                                      {/* disabled */}
                                      <AccordionSummary
                                        expandIcon={<ExpandMoreIcon />}
                                        aria-controls="panel1a-content"
                                        id="panel1a-header"
                                      >
                                        <Typography>
                                          Question {index + 1}{" "}
                                        </Typography>
                                      </AccordionSummary>
                                      <AccordionDetails>
                                        <FormControl>
                                          <FormLabel id="demo-radio-buttons-group-label">
                                            <Typography>
                                              {qcm.Question}{" "}
                                            </Typography>
                                          </FormLabel>
                                          <RadioGroup
                                            aria-labelledby="demo-radio-buttons-group-label"
                                            defaultValue="No response"
                                            name="radio-buttons-group"
                                            onChange={async (e) =>
                                              await handleResponseQCM(e, qcm.id)
                                            }
                                          >
                                            {qcm.Responses
                                              ? qcm.Responses.split(",").map(
                                                  (r, index) => {
                                                    return (
                                                      <FormControlLabel
                                                        key={index}
                                                        value={r}
                                                        control={<Radio />}
                                                        label={r}
                                                      />
                                                    );
                                                  }
                                                )
                                              : ""}
                                          </RadioGroup>
                                        </FormControl>
                                      </AccordionDetails>
                                    </Accordion>
                                  );
                                })
                              : ""}
                          </AccordionDetails>
                        </Accordion>
                        {/* <Accordion >
                                                <AccordionSummary
                                                    expandIcon={<ExpandMoreIcon />}
                                                    aria-controls="panel1a-content"
                                                    id="panel1a-header"
                                                    >
                                                    <Typography>QR</Typography>
                                                </AccordionSummary>
                                                <AccordionDetails>
                                                    {
                                                        Data.QuestionsQR?
                                                            Data.QuestionsQR.map((qr,index)=>{
                                                                return(
                                                                    <Accordion >
                                                                        <AccordionSummary
                                                                            expandIcon={<ExpandMoreIcon />}
                                                                            aria-controls="panel1a-content"
                                                                            id="panel1a-header"
                                                                            >
                                                                            <Typography>Question {index+1} </Typography>
                                                                        </AccordionSummary>
                                                                        <AccordionDetails>
                                                                        
                                                                        <FormControl>
                                                                            <FormLabel id="demo-buttons-group-label">
                                                                                <Typography>{qr.Question} </Typography>
                                                                            </FormLabel>
                                                                            <Box
                                                                                component="form"
                                                                                sx={{
                                                                                    '& > :not(style)': {  width: '100%' },
                                                                                }}
                                                                                noValidate
                                                                                autoComplete="off"
                                                                            >
                                                                                <TextField 
                                                                                    multiline
                                                                                    name="Response"
                                                                                    id="outlined-basic" 
                                                                                    label="Response" 
                                                                                    value={evaluationResult.QR.map(qr=>{
                                                                                        if(id === qr.id){
                                                                                            if(qr.Response){
                                                                                                return qr.Response
                                                                                            }
                                                                                            return " "
                                                                                        }
                                                                                    })} 
                                                                                    onChange={(e)=>handleResponseQR(e,qr.id)}
                                                                                    variant="outlined" 
                                                                                />
                                                                            </Box>
                                                                        </FormControl>
                                                                        </AccordionDetails>
                                                                    </Accordion>
                                                                )
                                                            })

                                                        :

                                                            ""


                                                    }

                                                    
                                                </AccordionDetails>
                                            </Accordion> */}
                        <Button
                          sx={{ margin: "10px", float: "right" }}
                          onClick={handleEvaluation}
                          variant="contained"
                        >
                          Submit
                        </Button>
                      </AccordionDetails>
                    </Accordion>
                  </div>
                  {evaluationsFromBase.length > 0 ? (
                    <div className={styles.AlertOfResult}>
                      <div>
                        <h2>Result:</h2>
                        {evaluationsFromBase.map((ev) => {
                          return (
                            <React.Fragment>
                              {ev.Evaluation.QCM.map((q, index) => {
                                return (
                                  <div>
                                    {q.Result === false ||
                                    q.Result === "" ||
                                    !q.Result ? (
                                      <h3 className={styles.Danger}>
                                        Question {index + 1}
                                      </h3>
                                    ) : (
                                      <h3 className={styles.Success}>
                                        Question {index + 1}
                                      </h3>
                                    )}

                                    <h5>{q.Question}</h5>
                                    <div className={styles.Reponse}>
                                      <h5>Response:</h5>
                                      <p>
                                        {q.Response
                                          ? q.Response
                                          : "no response"}{" "}
                                        -&#x3E;{" "}
                                      </p>{" "}
                                      {q.Result === false ||
                                      q.Result === "" ||
                                      !q.Result ? (
                                        <p className={styles.Danger}>false</p>
                                      ) : (
                                        <p className={styles.Success}>true</p>
                                      )}
                                    </div>
                                  </div>
                                );
                              })}
                            </React.Fragment>
                          );
                        })}
                      </div>
                      <div className={styles.note}>
                        {evaluationsFromBase.map((ev) => {
                          const result = ev.Evaluation.QCM.filter(
                            (q) => q.Result === true
                          ).length;
                          const all = ev.Evaluation.QCM.length;
                          const percent = (result / all) * 100;
                          return (
                            <React.Fragment>
                              {percent > 60 ? (
                                <div className={styles.percentSuccess}>
                                  <h1>{percent}%</h1>

                                  <CheckCircleOutlineIcon
                                    fontSize="large"
                                    sx={{ color: green[700] }}
                                  />
                                </div>
                              ) : (
                                <div className={styles.percentDanger}>
                                  <h1>{percent}%</h1>
                                  <HighlightOffIcon
                                    fontSize="large"
                                    sx={{ color: red[900] }}
                                  />
                                </div>
                              )}
                            </React.Fragment>
                          );
                        })}
                      </div>
                    </div>
                  ) : (
                    ""
                  )}
                </div>
                <div className={styles.DescriptionInfoCourse}>
                  <div className={styles.DescriptionInfoCourseTitle}>
                    <BsArrowDownRightCircleFill color="#1C4B82" size={30} />
                    <h1>Description</h1>
                  </div>
                  <div className={styles.DescriptionInfoCourseText}>
                    <p>{Data.Description}</p>
                  </div>
                </div>
                <div className={styles.DescriptionInfoCourse}>
                  <div className={styles.DescriptionInfoCourseTitle}>
                    <BsArrowDownRightCircleFill color="#1C4B82" size={30} />
                    <h1>Goals</h1>
                  </div>
                  <div className={styles.DescriptionInfoCourseText}>
                    <p>{Data.Goals}</p>
                  </div>
                </div>
                <div className={styles.DescriptionInfoCourse}>
                  <div className={styles.DescriptionInfoCourseTitle}>
                    <BsArrowDownRightCircleFill color="#1C4B82" size={30} />
                    <h1>Who Should Attend</h1>
                  </div>
                  <div className={styles.DescriptionInfoCourseText}>
                    <p>{Data.WhoShouldAttend}</p>
                  </div>
                </div>
                <div className={styles.DescriptionInfoCourse}>
                  <div className={styles.DescriptionInfoCourseTitle}>
                    <BsArrowDownRightCircleFill color="#1C4B82" size={30} />
                    <h1>Course Content</h1>
                  </div>
                  <div className={styles.DescriptionInfoCourseText}>
                    <p>{Data.CourseContent}</p>
                  </div>
                </div>
                <div className={styles.DescriptionInfoCourse}>
                  <div className={styles.DescriptionInfoCourseTitle}>
                    <BsArrowDownRightCircleFill color="#1C4B82" size={30} />
                    <h1>PracticalWork</h1>
                  </div>
                  <div className={styles.DescriptionInfoCourseText}>
                    <p>{Data.PracticalWork}</p>
                  </div>
                </div>
                <div className={styles.DescriptionInfoCourse}>
                  <div className={styles.DescriptionInfoCourseTitle}>
                    <BsArrowDownRightCircleFill color="#1C4B82" size={30} />
                    <h1>Certificate</h1>
                  </div>
                  <div className={styles.DescriptionInfoCourseText}>
                    <p>{Data.certificate}</p>
                  </div>
                </div>
                {Data.evaluate.length > 0 ? (
                  <div className={styles.OpinionsCourse}>
                    <div className={styles.OpinionsCourseTitle}>
                      <BsArrowDownRightCircleFill color="#1C4B82" size={30} />
                      <h1>Users Opinion</h1>
                    </div>
                    {EvaluationsCompleated.map((e) => {
                      return (
                        <React.Fragment>
                          <div className={styles.opinion}>
                            <div className={styles.opinionHeader}>
                              {e.image ? (
                                <Avatar
                                  alt="Remy Sharp"
                                  src={`${process.env.REACT_APP_API}/${e.image.filePath}`}
                                  sx={{ width: 24, height: 24 }}
                                />
                              ) : (
                                <Avatar
                                  alt="Remy Sharp"
                                  src={`${process.env.REACT_APP_API}/uploads/2022-03-25T09-59-55.836Z-avatar.png`}
                                  sx={{ width: 24, height: 24 }}
                                />
                              )}
                              <h5>{e.name}</h5>
                            </div>
                            <div className={styles.opinionBody}>
                              <p>{e.message}</p>
                              <Rating
                                name="read-only"
                                value={e.rate}
                                readOnly
                                precision={0.5}
                              />
                            </div>
                          </div>
                          <hr className={styles.opinionHr} />
                        </React.Fragment>
                      );
                    })}
                  </div>
                ) : (
                  ""
                )}
              </div>
            </div>
          </div>
        </main>
        <Footer />
        {Data._id ? (
          <React.Fragment>
            <Evaluate
              openEvaluate={openEvaluate}
              setOpenEvaluate={setOpenEvaluate}
              courseId={Data._id}
            />
            {Data.Ressources ? (
              <Ressources
                openRessources={openRessources}
                setOpenRessources={setOpenRessources}
                Ressources={Data.Ressources}
                Id={Data._id}
              />
            ) : (
              <Ressources
                openRessources={openRessources}
                setOpenRessources={setOpenRessources}
                Ressources={null}
                Id={Data._id}
              />
            )}
          </React.Fragment>
        ) : (
          ""
        )}
      </React.Fragment>
    );
  }
};

export default PaidTraining;
