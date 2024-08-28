import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import FolderIcon from "@mui/icons-material/Folder";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import StarIcon from "@mui/icons-material/Star";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
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
import { green, red } from "@mui/material/colors";
import axios from "axios";
import React, { useRef, useEffect, useState } from "react";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Nav from "../../Nav";
import Footer from "../../Home/Footer";
import Evaluate from "./Evaluate";
import Ressources from "./RessourcesFiles";
import { useNavigate } from 'react-router-dom'; 
import styles from "./styles.module.css";

const PaidCourse = () => {
  let { id } = useParams();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [openEvaluate, setOpenEvaluate] = useState(false);
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
    DurationQuiz:""
  });
  // const [Videos, setVideos] = useState([])
  const [Datavideo, setDatavideo] = useState({
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
    Videos: [],
    Level: "",
    Reference: "",
    Date: [],
    enrolled: [],
    state: "",
    certificate: ""
  });





  const [VideoDisplay, setVideoDisplay] = useState("")
  const [isPlaying, setIsPlaying] = useState(false); // Track video play state

  const handleDisplay = (vid) => {
    setVideoDisplay(vid.filePath);
    setIsPlaying(true); // Set to playing when a video is selected
    console.log(vid.filePath);
  };

  const handlePlayPause = () => {
    setIsPlaying(!isPlaying); // Toggle play/pause state
  };
  // const handleDisplay = (vid) =>{
  //   setVideoDisplay(vid.filePath)
  //   console.log(vid.filePath)
  // }



  useEffect(async () => {
    console.log("test")
    await handleCourse();
  }, []);

  useEffect(() => {
    getEvaluations();
  }, []);

  const handleCourse = () => {
    console.log("test")

    const config = {
      headers: {},
      params: { id: id },
    };
    axios
      .get(`${process.env.REACT_APP_API}api/courses/specific`, config)
      .then((res) => {
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
      headers: {
        authorization: `Bearer ${token}`,
      },

      params: { id: id },
    };
    await axios
      .post(
        `${process.env.REACT_APP_API}api/evaluations/getEvaluations`,
        { courseId: id, student: user._id },
        config
      )
      .then((res) => {
        console.log(res.data.Evaluations);
        setEvaluationsFormBase(res.data.Evaluations);
      });
  };

  const GetUsers = (ids) => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios
      .post(
        `${process.env.REACT_APP_API}api/Candidat/returnCandidatForRatingInfo`,
        { ids: ids },
        config
      )
      .then((res) => {
        setUsersLimited(res.data.usersLimited);
      });
  };

  // const handleLogout = () => {
  //   localStorage.removeItem("token");
  //   localStorage.removeItem("user");
  //   window.location = "/login";
  // };

  useEffect(() => {
    const ids = Evaluations.map((e) => {
      return e.id;
    });
    GetUsers(ids);
  }, [Evaluations]);
  // 
  useEffect(() => {
    var list = [];
    Evaluations.forEach((e) => {
      usersLimited.forEach((u) => {
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
  }, []);
  // , [usersLimited]
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
  // const [Enrolled, setEnrolled] = useState(false);
  // const [Paid, setPaid] = useState(false);
  // const [PaidBtn, setPaidBtn] = useState(false);
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
  console.log("mobileview", mobileView);
  useEffect(() => {
    //console.log(WindowWidth)
    if (WindowWidth <= 756) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, [WindowWidth]);
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
    trainer: "Course",
    course: Data._id,
    student: user._id,
    Evaluation: {},
  });

  useEffect(() => {
    setEvaluation({
      ...evaluation,
      trainer: "Course",
      course: Data._id,
    });
  }, [Data]);

  const [changingResultEvaluations, setChangingResultEvaluations] = useState(
    []
  );
  const handleResponseQCM = async (e, id) => {
    console.log(e.target.value);

    console.log("evaluationResult :", evaluationResult.QCM);
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
    console.log("changingResultEvaluations:", changingResultEvaluations);
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
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    console.log("data to save: ", evaluation.Evaluation);
    await axios
      .post(
        `${process.env.REACT_APP_API}api/evaluations/setEvaluation`,
        { Data: evaluation },
        config
      )
      .then((res) => {
        alert(res.data.message);
        window.location.reload(true);
      });
  };
  const [openRessources, setOpenRessources] = useState(false);
  const refHome = useRef(null);

  //activeButton
  const [preCourseData, setPreCourseData] = useState([]);
  const [quizData, setQuizData] = useState([]);

  // const handleButtonClick = (index) => {

  //   setActiveButton(index);
  //   console.log("herrrrrrrrrree",activeButton);

  //   if (index === 0) {
  //     handleCourseVideo(); 
  //   }
  // };
  const [videos, setVideos] = useState([])
  const handleCourseVideo = () => {
    const config = {
      params: { id: id }, // Make sure `id` is defined
    };
    axios
      .get(`${process.env.REACT_APP_API}api/courses/specific`, config)
      .then((res) => {
        setDatavideo(res.data.data);
        setVideos(res.data.data.Videos); // Store the list of videos
        console.log(res.data.data);
        console.log(res.data.data.Videos);
      })
      .catch((error) => {
        console.error("Error fetching course data:", error);
      });
  }
  const handlePreCourseData = () => {
    // Implement API call to fetch Pre-Course data
    axios
      .get(`${process.env.REACT_APP_API}api/courses/pre-course`, {
        params: { id: id },
      })
      .then((res) => {
        setPreCourseData(res.data.data);
      })
      .catch((error) => {
        console.error("Error fetching pre-course data:", error);
      });
  };

 
  // const [activeButton, setActiveButton] = useState(null);
  const [isOpenCourse, setOpenCourse] = useState(false);
  const [isOpenprcourse, setOpenprcourse] = useState(false);
  const [isOpenPDF, setOpenPDF] = useState(false);

  const [isOpenQuiz, setOpenQuiz] = useState(false);
  // const[isOpen,setOpen]=useState(false);

  const handleButtonClickcourse = () => {
    handleCourseVideo()
    setOpenCourse(!isOpenCourse)
    setOpenprcourse(false)
    setOpenPDF(false)
    setOpenQuiz(false)
    console.log('course open', isOpenCourse);


  };
  const handleButtonClickprcourse = () => {
    setOpenCourse(false)
    setOpenprcourse(!isOpenprcourse)
    setOpenPDF(false)
    setOpenQuiz(false)

  };
  const handleButtonClickPDF = () => {
    setOpenCourse(false)
    setOpenprcourse(false)
    setOpenPDF(!isOpenPDF)
    setOpenQuiz(false)

  };
  const handleQuizData = async (courseID) => {
    setOpenCourse(false)
    setOpenprcourse(false)
    setOpenPDF(false)
    setOpenQuiz(!isOpenQuiz)
    // Implement API call to fetch Quiz data
    if (!isOpenQuiz) {
      try {
        // Fetch quizzes associated with the course
        const response = await axios.get(`${process.env.REACT_APP_API}api/courses/${courseID}`);
        setQuizData(response.data);
        console.log('Quiz Data:', quizData);
        // console.log('Quiz Data:',response.data);

      } catch (error) {
        console.error('Error fetching quizzes:', error);
      }
    }
  };
  // const handleButtonClickQuiz = () => {
  //   setOpenQuiz(!isOpenQuiz)

  // };

  // const handleButtonClick = (index) => {
  //   setActiveButton(index);
  //   if (index === 0) {
  //     console.log('course Video');
  //     setOpen(true)
  //     handleCourseVideo();
  //   } else if (index === 1) {
  //     handlePreCourseData();
  //     setOpenPDF(true)
  //   } else if (index === 2) {
  //     handleQuizData();
  //     setOpenQuiz(true)
  //   }
  // };
  // toggle for the showing the content of a section 
  const [isSectionOpen, setIsSectionOpen] = useState(false);

  const toggleSection = () => {
    setIsSectionOpen((prev) => !prev);
    // Toggle the section visibility
    console.log('section', isSectionOpen);
  };
  const navigate = useNavigate();
  const handleQuizClick = (quizId) => {
    navigate(`/quiz`, { state: { quizId, durationQuiz: Data.DurationQuiz } });
  };
  return (
    <React.Fragment>

      <div className={styles.backimage}>
        <div className={styles.maincontainernav}>
          <div className={styles.nav_container}>
            <Nav ref={refHome} />

          </div>
          <div className={styles.pdowncontainer}>
            <div className={styles.pdown} >COURS
              <p className={styles.underline}></p>
            </div>
          </div>
        </div>
      </div>
      <main className={styles.MotherDivCourse}>
        <div className={styles.MainDivCourse}>
          <div className={styles.leftSectionCourse}>
            <div className={styles.FirsSectionInfoCourse}>
              {VideoDisplay ? (
                <div className={styles.videoPlayer}>
                  <video controls className={styles.videoElement}>
                    <source src={`${process.env.REACT_APP_API}${VideoDisplay}`} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <button onClick={handlePlayPause} className={`${styles.startButton} ${isPlaying ? styles.playing : ''}`}>
                    {isPlaying ? (
                      <>
                        <img src="/images/course/paid/startvideo.png" alt="Pause Icon" className={styles.startIcon} />
                        Pause
                      </>
                    ) : (
                      <>
                        <img src="/images/course/paid/startvideo.png" alt="Play Icon" className={styles.startIcon} />

                      </>
                    )}
                  </button>
                </div>
              ) : (
                (Data.Thumbnail === "qqq" || Data.Thumbnail === null || !Data.Thumbnail) ? (
                  <div className={styles.imgCourse}>
                    <img
                      src={`${process.env.REACT_APP_API}uploads/courseImg.png`}
                      alt=""
                      className={styles.imgCourseImage}
                    />
                  </div>
                ) : (
                  <div className={styles.imgCourse}>
                    <img
                      src={`${process.env.REACT_APP_API}${Data.Thumbnail.filePath}`}
                      alt=""
                      className={styles.imgCourseImage}
                    />
                  </div>
                )
              )}
              <div className={styles.FirsSectionInfoCourseTitle}>
                <div className={styles.courtitle}>{Data.Title}</div >

              </div>
              <div className={styles.FirsSectionInfoCourseTitle}>   <h4>{Data.Category}</h4>
                {Data.rating
                  ? TextRating(Data.rating, Data.evaluate.length)
                  : TextRating(0, 0)}</div>

              <div className={styles.Btn_Div}>
                <div className={styles.containerBt1}>

                  <div className={styles.allbutton}>
                    <button
                      style={{
                        backgroundColor: isOpenCourse ? '#CD6214' : '#3E4678'
                      }}
                      className={styles.btncourse}
                      onClick={handleButtonClickcourse}
                    >
                      <img
                        src={`/images/course/paid/startc.png`}
                        alt=''
                        className={styles.imagefeatures}
                      />
                      {isOpenCourse ? ("yes") : ("no")}
                      Course Content

                    </button>
                    <button className={styles.btncour}>

                    </button>
                    <button className={styles.btncour}>
                      <img
                        src={`/images/course/paid/${isOpenCourse ? 'showsection' : 'hiddensection'}.png`}
                        alt=''
                      />
                    </button>
                  </div>

                  <div className={styles.allbutton}>
                    <button
                      style={{
                        backgroundColor: isOpenprcourse ? '#CD6214' : '#3E4678'
                      }}
                      className={styles.btncourse}
                      onClick={() => handleButtonClickprcourse()}
                    >
                      <img
                        src={`/images/course/paid/prcours.png`}
                        alt=''
                        className={styles.imagefeatures}
                      />
                      {isOpenprcourse ? ("yes") : ("no")}
                      Pré-cours

                    </button>
                    <button className={styles.btncour}>

                    </button>
                    <button className={styles.btncour}>
                      <img
                        src={`/images/course/paid/${isOpenprcourse ? 'showsection' : 'hiddensection'}.png`}
                        alt=''
                      />
                    </button>
                  </div>

                  <div className={styles.allbutton}>
                    <button
                      style={{
                        backgroundColor: isOpenPDF ? '#CD6214' : '#3E4678'
                      }}
                      className={styles.btncourse}
                      onClick={() => handleButtonClickPDF()}
                    >
                      <img
                        src={`/images/course/paid/PDF.png`}
                        alt=''
                        className={styles.imagefeatures}
                      />
                      {isOpenPDF ? ("yes") : ("no")}
                      PDF

                    </button>
                    <button className={styles.btncour}>

                    </button>
                    <button className={styles.btncour}>
                      <img
                        src={`/images/course/paid/${isOpenPDF ? 'showsection' : 'hiddensection'}.png`}
                        alt=''
                      />
                    </button>
                  </div>

                  <div className={styles.allbutton}>
                    <button
                      style={{
                        backgroundColor: isOpenQuiz ? '#CD6214' : '#3E4678'
                      }}
                      className={styles.btncourse}
                      onClick={() => handleQuizData(Data._id)}
                    >
                      <img
                        src={`/images/course/paid/Quiz.png`}
                        alt=''
                        className={styles.imagefeatures}
                      />
                      {isOpenQuiz ? ("yes") : ("no")}
                      Quiz

                    </button>
                    <button className={styles.btncour}>

                    </button>
                    <button className={styles.btncour}>
                      <img
                        src={`/images/course/paid/${isOpenQuiz ? 'showsection' : 'hiddensection'}.png`}
                        alt=''
                      />
                    </button>
                  </div>

                </div>
                {isOpenCourse && videos.length > 0 ? (
                  <div className={styles.containerBt2}>
                    {videos.map((video, index) => (
                      <div className={styles.videoList} key={video.id}>
                        <div className={styles.sectionbutton}>
                          <div className={styles.sectionindex}>Section {index}</div>
                          <button
                            onClick={toggleSection}
                            className={styles.sectionToggle}
                          >
                            <img
                              src={`/images/course/paid/${isSectionOpen ? 'downsection' : 'upsection'}.png`}
                              alt=''
                              className={styles.imagdown}
                            />
                          </button>
                        </div>
                        {!isSectionOpen && (
                          <div>
                            <button onClick={() => handleDisplay(video)} className={styles.videoItem}>
                              {video.fileName}
                            </button>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (isOpenCourse && (<div className={styles.containerBt2}>
                  <div  className={styles.videoList}>
                    no content yet
                  </div>
                  </div>))}

                {isOpenprcourse && preCourseData.length > 0 && (
                  <div className={styles.preCourseDataContainer}>
                    précours
                  </div>
                )}
                {isOpenPDF && preCourseData.length > 0 && (
                  <div className={styles.preCourseDataContainer}>
                    précours
                  </div>
                )}
                {isOpenQuiz && quizData.length > 0 ? (
                  <div className={styles.containerBt2}>
                    {quizData.map((quiz,index) => (
        <div
          key={quiz._id}
          className={styles.videoList}
          onClick={() => handleQuizClick(quiz._id)} // Handle click
        >
          Quiz {index} {/* Adjust the display as needed */}
        </div>
      ))}
                  </div>
                ) : (isOpenQuiz && (
                  <div className={styles.containerBt2}>
                <div  className={styles.videoList}>
                  noquiz added
                </div>
                </div>))}


              </div>

              <div>



              </div>
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
};

export default PaidCourse;
