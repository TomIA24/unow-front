import FolderIcon from "@mui/icons-material/Folder";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import QuizIcon from "@mui/icons-material/Quiz";
import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Rating from "@mui/material/Rating";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { Link, useParams } from "react-router-dom";
import Nav from "../../Nav";
import Footer from "../../footer";
import Evaluate from "./Evaluate";
import Ressources from "./Ressources";
import Tests from "./Tests";
import styles from "./styles.module.css";

const ConfirmedTraining = () => {
  let { id } = useParams();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  var [urlRoom, setUrlRoom] = useState("");

  const handleRoom = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
      params: { id: id },
    };
    await axios
      .post(
        `${process.env.REACT_APP_API}/api/trainings/getRoom`,
        { courseId: id },
        config
      )
      .then((res) => {
        console.log(res);
        setUrlRoom(res.data.data);
      });
  };

  const [error, setError] = useState("");
  const [openEvaluate, setOpenEvaluate] = useState(false);
  const [openRessources, setOpenRessources] = useState(false);
  const [Evaluations, setEvaluations] = useState([]);
  const [EvaluationsCompleated, setEvaluationsCompleated] = useState([]);
  const [usersLimited, setUsersLimited] = useState([]);
  const [showTests, setShowTests] = useState(false);

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
    testState: "",
  });

  useEffect(async () => {
    await handleCourse();
    await handleRoom();
  }, []);

  const HandleTest = () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    axios
      .post(
        `${process.env.REACT_APP_API}/api/Trainer/AllowTests`,
        { courseId: Data._id, state: "allowed" },
        config
      )
      .then((res) => {
        window.location.reload(true);
        setShowTests(true);
      });
  };

  const handleCourse = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },

      params: { id: id },
    };
    axios
      .get(`${process.env.REACT_APP_API}/api/trainings/specific`, config)
      .then((res) => {
        setData(res.data.data);
        setEvaluations(res.data.data.evaluate);
        console.log(Data);
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/login";
  };

  useEffect(async () => {
    const ids = Evaluations.map((e) => {
      return e.id;
    });
    GetUsers(ids);
  }, [Evaluations]);

  useEffect(async () => {
    var list = [];
    await Evaluations.map((e) => {
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
  const [Enrolled, setEnrolled] = useState(false);
  const [Paid, setPaid] = useState(false);
  const [PaidBtn, setPaidBtn] = useState(false);
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
                {/* <Button
                  sx={{ width: "200px" }}
                  onClick={() =>
                    window.open(
                      `${process.env.REACT_APP_DOMAIN}/room/${urlRoom}`,
                      "_blank"
                    )
                  }
                  variant="outlined"
                  endIcon={<PlayArrowIcon />}
                >
                  Start Training &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                </Button> */}
                <Link to={{ pathname: `/room/${urlRoom}` }}>
                  <Button
                    sx={{ width: "200px" }}
                    variant="outlined"
                    endIcon={<PlayArrowIcon />}
                  >
                    Start Training &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                </Link>
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

                {Data.testState === "closed" ? (
                  <Button
                    sx={{ width: "200px" }}
                    onClick={HandleTest}
                    variant="outlined"
                    endIcon={<QuizIcon />}
                  >
                    Allow Tests
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                ) : (
                  <Button
                    sx={{ width: "200px" }}
                    onClick={() => setShowTests(true)}
                    variant="outlined"
                    endIcon={<QuizIcon />}
                  >
                    Show Tests
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  </Button>
                )}
              </div>
            </div>
            <div className={styles.ScndSectionInfoCourse}>
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
          <Tests
            setShowTests={setShowTests}
            showTests={showTests}
            coursId={id}
          />
        </React.Fragment>
      ) : (
        ""
      )}
    </React.Fragment>
  );
};

export default ConfirmedTraining;
