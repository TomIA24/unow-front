import PaymentIcon from "@mui/icons-material/Payment";
import StarIcon from "@mui/icons-material/Star";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { BsArrowDownRightCircleFill } from "react-icons/bs";
import { FaOpencart } from "react-icons/fa";
import { RiSecurePaymentLine } from "react-icons/ri";
import { useParams } from "react-router-dom";
import Nav from "../../Nav";
import Footer from "../../footer";
import styles from "./styles.module.css";

const StandardCourse = () => {
  let { id } = useParams();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [error, setError] = useState("");
  const [openEvaluate, setOpenEvaluate] = useState(false);
  const [Evaluations, setEvaluations] = useState([]);
  const [EvaluationsCompleated, setEvaluationsCompleated] = useState([]);
  const [usersLimited, setUsersLimited] = useState([]);
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
    enrolledPaid: [],
    state: "",
    certificate: "",
    evaluate: [],
  });
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  /*///////////////////////////////////*/

  const [scrollPosition, setScrollPosition] = useState(0);
  const handleScroll = () => {
    const position = window.pageYOffset;
    setScrollPosition(position);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    if (scrollPosition >= 300) {
      window.document.getElementsByClassName(
        styles.scndInfos
      )[0].style.marginTop = -320 + "px";
    } else {
      window.document.getElementsByClassName(
        styles.scndInfos
      )[0].style.marginTop = 0 + "px";
    }
  }, [scrollPosition]);
  /*///////////////////////////////////*/
  useEffect(() => {
    handleCourse();
  }, []);

  const handleCourse = () => {
    const config = {
      headers: {},

      params: { id: id },
    };
    axios
      .get(`${process.env.REACT_APP_API}/api/courses/specific`, config)
      .then((res) => {
        setData(res.data.data);
        setEvaluations(res.data.data.evaluate);
      });
  };

  const duration = 3;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/login";
  };

  const [enrollementButtonState, setEnrollementButtonState] = useState(true);

  useEffect(() => {
    if (!enrollementButtonState) {
      handleDisabled();
    }
  }, [enrollementButtonState]);

  useEffect(() => {
    if (token) {
      if (user.cartCourses) {
        if (user.cartCourses.includes(Data._id)) {
          setEnrollementButtonState(false);
        }
      }
    }
  }, [Data]);

  // const [buyButtonState,setBuyButtonState] = useState(true)

  // useEffect(()=>{
  //     if(!buyButtonState){
  //         handleDisabled()
  //     }

  // },[buyButtonState])
  // useEffect(()=>{
  //     if(user.cart){
  //         if(user.cart.includes(Data._id)){
  //             setBuyButtonState(false)
  //         }
  //     }
  // },[Data])

  const handleDisabled = () => {
    document.getElementById(styles.CourseButtonsInfoPageB1).disabled = true;
    // document.getElementById(styles.CourseButtonsInfoPageB1).style.backgroundColor = 'grey'
    // document.getElementById(styles.CourseButtonsInfoPageB1).style.cursor= 'not-allowed'
  };

  const handleDisabled2 = () => {
    document.getElementById(styles.CourseButtonsInfoPageB2).disabled = true;
    // document.getElementById(styles.CourseButtonsInfoPageB2).style.backgroundColor = 'grey'
    // document.getElementById(styles.CourseButtonsInfoPageB2).style.cursor= 'not-allowed'
  };

  const GetUsers = (ids) => {
    const config = {
      headers: {},
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

  const [Enrolled, setEnrolled] = useState(false);
  const [Paid, setPaid] = useState(false);
  const [PaidBtn, setPaidBtn] = useState(false);

  const Pay = () => {
    setPaidBtn(true);
  };
  // useEffect(()=>{
  //     if(token){
  //         if(Enrolled){

  //         }
  //     }
  // },[Enrolled])

  useEffect(() => {
    if (token) {
      if (PaidBtn) {
        handleBuySTRIPE();
      }
    }
  }, [PaidBtn]);

  const handleCloseEnrolled = () => {
    setEnrolled(false);
    window.location.reload(true);
  };

  const handleClosePaid = () => {
    setPaid(false);
    window.location.reload(true);
  };

  // const [courseState,setCourseState] = useState({
  //     inCart:false,
  //     paid: false
  // })

  // useEffect(()=>{
  //     if(token){
  //         if(user.cartCourses){
  //             user.cartCourses.map(course=>{
  //                 if(course.course===Data._id  && course.state==="unpaid"){
  //                     setCourseState({...courseState, inCart:true})

  //                 }
  //                 if(course.course===Data._id && course.state==="paid"){
  //                     setCourseState({inCart:true, paid:true})
  //                 }
  //             })
  //         }
  //     }
  // })

  //var list = []
  const handleOpenEnrolled = () => {
    setData({ ...Data, enrolled: [...Data.enrolled, user._id] });
    setEnrolled(true);
  };

  const handleOpenPaid = () => {
    setPaid(true);
  };

  useEffect(() => {
    if (token) {
      handleLastSeen();
    }
  }, []);

  const handleLastSeen = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `${process.env.REACT_APP_API}/api/Candidat/lastSeen`;

      axios.post(url, { lastSeen: user.lastSeen }, config).then(async (res) => {
        const url = `${process.env.REACT_APP_API}/api/userData`;
        try {
          axios.post(url, {}, config).then((response) => {
            localStorage.setItem("user", JSON.stringify(response.data.data));
          });
        } catch (err) {}
      });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
        // setError(error.response.data.message);
      }
    }
  };

  const handleCart = async () => {
    if (token) {
      const config = {
        headers: {
          authorization: `Bearer ${token}`,
        },
      };
      try {
        const url = `${process.env.REACT_APP_API}/api/Candidat/cart`;
        axios
          .post(
            url,
            { type: "course", enrolled: Data.enrolled, courseId: Data._id },
            config
          )
          .then(async (res) => {
            const url = `${process.env.REACT_APP_API}/api/userData`;
            try {
              axios.post(url).then((response) => {
                localStorage.setItem(
                  "user",
                  JSON.stringify(response.data.data)
                );
              });
            } catch (err) {}
          });
      } catch (error) {
        if (
          error.response &&
          error.response.status >= 400 &&
          error.response.status <= 500
        ) {
          // setError(error.response.data.message);
        }
      }
    } else {
      window.location = "/login";
    }
  };

  const handleBuySTRIPE = async () => {
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    try {
      const url = `${process.env.REACT_APP_API}/api/payment/course`;
      await axios.post(url, { courseId: Data._id }, config).then((res) => {
        window.location = res.data.url;
      });
    } catch (error) {
      // console.error(error)
    }
  };

  // useEffect(()=>{

  // },[Data])

  const handleEnroll = async () => {
    if (token) {
      handleOpenEnrolled();
    } else {
      window.location = "/login";
    }
  };

  const handlePay = async () => {
    if (token) {
      handleOpenPaid();
    } else {
      window.location = "/login";
    }
  };

  const [tool, setTool] = useState(false);
  const toolClose = () => {
    setTool(false);
  };

  const toolOpen = () => {
    setTool(true);
  };

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
    if (WindowWidth <= 756) {
      setMobileView(true);
    } else {
      setMobileView(false);
    }
  }, []);
  useEffect(() => {
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
                {Data.rating
                  ? TextRating(Data.rating, Data.evaluate.length)
                  : TextRating(0, 0)}
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
                            {user ? (
                              <React.Fragment>
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
                              </React.Fragment>
                            ) : (
                              <React.Fragment>
                                <Avatar
                                  alt="Remy Sharp"
                                  src={`${process.env.REACT_APP_API}/uploads/2022-03-25T09-59-55.836Z-avatar.png`}
                                  sx={{ width: 24, height: 24 }}
                                />
                              </React.Fragment>
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
          <div className={styles.rightSectionCourse}>
            <div className={styles.scndInfos}>
              <div className={styles.InfosRefDur}>
                <p>
                  Reference: <span>{Data.Reference}</span>
                </p>
                <p>
                  Duration: <span> {duration} days (Data.Hours)</span>
                </p>
              </div>

              <div className={styles.CoursePriceInfoPage}>
                <p>{Data.Price} TTC</p>
              </div>
              <br />
              <div className={styles.CourseButtonsInfoPage}>
                {user ? (
                  <React.Fragment>
                    {!Data.enrolled.includes(user._id) ? (
                      <button
                        onClick={() => {
                          handleEnroll();
                          handleCart();
                        }}
                        id={styles.CourseButtonsInfoPageB1}
                      >
                        <p>Add To Cart</p>
                        <FaOpencart size={20} />
                      </button>
                    ) : (
                      <Tooltip
                        title="You don't have permission to do this"
                        followCursor
                      >
                        <button
                          onClick={handleDisabled}
                          id={styles.CourseButtonsInfoPageB1Disabled}
                          disabled
                        >
                          <p>Add To Cart</p>
                          <FaOpencart size={20} />
                        </button>
                      </Tooltip>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button
                      onClick={() => {
                        handleEnroll();
                        handleCart();
                      }}
                      id={styles.CourseButtonsInfoPageB1}
                    >
                      <p>Add To Cart</p>
                      <FaOpencart size={20} />
                    </button>
                  </React.Fragment>
                )}
                <Modal
                  sx={{ p: 1 }}
                  open={Enrolled}
                  onClose={handleCloseEnrolled}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box
                    sx={{
                      ...style,
                      width: 450,
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "auto",
                      overflowX: "hidden",
                      maxHeight: "85vh",
                      alignItems: "center",
                    }}
                  >
                    <div className={styles.ModalComponent}>
                      <h3 id="parent-modal-title" className={styles.ModalTitle}>
                        Course added to the cart successfully
                      </h3>
                      <p
                        sx={{ textAlign: "center" }}
                        id="parent-modal-description"
                      >
                        Your registration request for this course is being
                        processed.{" "}
                      </p>

                      <Divider
                        variant="inset"
                        sx={{ width: "100%", height: "3px", margin: 0 }}
                      />

                      <p
                        sx={{ textAlign: "center" }}
                        id="parent-modal-description"
                      >
                        you can track your registration status through your
                        profile, <a href="/profile">quick access to profile</a>
                      </p>
                    </div>
                  </Box>
                </Modal>

                {user ? (
                  <React.Fragment>
                    {!Data.enrolledPaid.includes(user._id) ? (
                      <button
                        onClick={handlePay}
                        id={styles.CourseButtonsInfoPageB2}
                      >
                        <p>Subscribe Now</p>
                        <RiSecurePaymentLine size={20} />
                      </button>
                    ) : (
                      <button
                        onClick={handleDisabled2}
                        id={styles.CourseButtonsInfoPageB2Disabled}
                      >
                        <p>Subscribe Now</p>
                        <RiSecurePaymentLine size={20} />
                      </button>
                    )}
                  </React.Fragment>
                ) : (
                  <React.Fragment>
                    <button
                      onClick={handlePay}
                      id={styles.CourseButtonsInfoPageB2}
                    >
                      <p>Subscribe Now</p>
                      <RiSecurePaymentLine size={20} />
                    </button>
                  </React.Fragment>
                )}

                <Modal
                  sx={{ p: 1 }}
                  open={Paid}
                  onClose={handleClosePaid}
                  aria-labelledby="parent-modal-title"
                  aria-describedby="parent-modal-description"
                >
                  <Box
                    sx={{
                      ...style,
                      width: 450,
                      display: "flex",
                      flexDirection: "column",
                      overflowY: "auto",
                      overflowX: "hidden",
                      maxHeight: "85vh",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      variant="contained"
                      endIcon={<PaymentIcon />}
                      onClick={Pay}
                    >
                      Pay
                    </Button>
                  </Box>
                </Modal>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </React.Fragment>
  );
};

export default StandardCourse;
