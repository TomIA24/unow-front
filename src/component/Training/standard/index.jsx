import SendIcon from "@mui/icons-material/Send";
import StarIcon from "@mui/icons-material/Star";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import DesktopDateRangePicker from "@mui/lab/DesktopDateRangePicker";
import DesktopTimePicker from "@mui/lab/DesktopTimePicker";
import LoadingButton from "@mui/lab/LoadingButton";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import MobileDateRangePicker from "@mui/lab/MobileDateRangePicker";
import MobileTimePicker from "@mui/lab/MobileTimePicker";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import FormControl from "@mui/material/FormControl";
import InputAdornment from "@mui/material/InputAdornment";
import Modal from "@mui/material/Modal";
import Rating from "@mui/material/Rating";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Tooltip from "@mui/material/Tooltip";
import axios from "axios";
import { format } from "date-fns";
import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { request } from "../../../core/api/request";
import Footer from "../../Home/Footer";
import Loading from "../../Loading";
import Nav from "../../Nav";
import styles from "./styles.module.css";

const StandardTraining = (props) => {
  const [user, SetUser] = useState();
  const [isLoading, setLoading] = useState(true);
  const [Evaluations, setEvaluations] = useState([]);
  const [EvaluationsCompleated, setEvaluationsCompleated] = useState([]);
  const [usersLimited, setUsersLimited] = useState([]);
  const [down, setDown] = useState(false);

  let { id } = useParams();
  const token = localStorage.getItem("token");
  const refHome = useRef(null);
  useEffect(() => {
    if (token) {
      const config = {
        headers: {
          authorization: `Bearer ${token}`
        }
      };
      const url2 = `${process.env.REACT_APP_API}api/userData`;
      try {
        axios.get(url2, config).then((response) => {
          localStorage.setItem("user", JSON.stringify(response.data.data));
          SetUser(response.data.data);
          if (response.data.data?.cartCourses?.includes(id)) {
            setEnrollementButtonState(false);
          }
          setLoading(false);
        });
      } catch (err) {}
    } else {
      setLoading(false);
    }
  }, []);

  const [error, setError] = useState("");

  const [Data, setData] = useState({
    _id: "",
    Title: "",
    Trainer: "",
    Description: "",
    Goals: "",
    WhoShouldAttend: "",
    TrainingContent: "",
    PracticalWork: "",
    Category: "",
    Price: "",
    Thumbnail: "",
    Level: "",
    Reference: "",
    Date: [],
    enrolled: [],
    enrolledPaid: [],
    state: "",
    certificate: "",
    evaluate: [],
    rating: 0
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
    pb: 3
  };

  useEffect(() => {
    setCustomizeNotif({ ...CustomizeNotif, user: user });
  }, [user]);

  const initialNotif = {
    user: user,
    training: Data,
    date: [null, null],
    time: new Date(""),
    duration: "",
    message: "",
    NotifType: "Customization"
  };

  const [openCustom, setOpenCustom] = React.useState(false);
  const handleOpenCustom = () => {
    if (token) {
      setOpenCustom(true);
    } else {
      window.location = "/login";
    }
  };
  const handleCloseCustom = () => {
    setOpenCustom(false);
    setSelectedOptions([]);
    setCustomizeNotif(initialNotif);
  };

  const Custom = [
    "Horaire",
    "Date",
    "format",
    "durée de la formation",
    "Autre..."
  ];

  const [selectedOptions, setSelectedOptions] = useState([]);

  useEffect(() => {}, [selectedOptions]);

  const handleChangeSelected = (e, newValue) => {
    setSelectedOptions([newValue]);
  };

  const [mobile, setMobile] = useState(false);

  // const [dateCust, setDateCust] = useState([null, null]);

  // const [Time, setTime] = useState(new Date(''));

  // const [durée, setDurée] = useState();

  // const [message, setMessage] = useState();

  const [CustomizeNotif, setCustomizeNotif] = useState({
    user: user,
    course: Data,
    date: [null, null],
    time: new Date(""),
    duration: "",
    message: "",
    NotifType: "Customization"
  });

  const handleSend = async (e) => {
    e.preventDefault();
    const config = {
      headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
    };
    const url = `${process.env.REACT_APP_API}api/notifications/saveNotifications`;
    axios.post(url, CustomizeNotif, config).then((res) => {
      handleCloseCustom();
    });
  };

  const handleChangeCustom = (e) => {
    setCustomizeNotif({ ...CustomizeNotif, [e.target.name]: e.target.value });
  };

  useEffect(() => {}, [CustomizeNotif]);

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

  // useEffect(()=>{
  // 	if(scrollPosition>=300){
  // 		window.document.getElementsByClassName(styles.scndInfos)[0].style.marginTop=-320 + "px"
  // 	}else{
  // 		window.document.getElementsByClassName(styles.scndInfos)[0].style.marginTop=0 + "px"
  // 	}
  // },[scrollPosition])
  /*///////////////////////////////////*/

  const GetUsers = async (ids) => {
    const config = {
      headers: {}
    };
    axios
      .post(
        `${process.env.REACT_APP_API}api/Candidat/returnCandidatForRatingInfo`,
        { ids: ids }
      )
      .then((res) => {
        setUsersLimited(res.data.usersLimited);
      });
  };

  useEffect(() => {
    const fetchData = async () => {
      const ids = Evaluations.map((e) => {
        return e.id;
      });
      await GetUsers(ids);
    };
    fetchData();
  }, [Evaluations]);

  useEffect(() => {
    const fetchData = async () => {
      var list = [];
      Evaluations.map((e) => {
        usersLimited.map((u) => {
          if (u._id === e.id) {
            list.push({
              id: e.id,
              message: e.message,
              rate: e.rate,
              name: u.userName,
              image: u.image
            });
          }
        });
      });
      setEvaluationsCompleated(list);
    };
    fetchData();
  }, [usersLimited]);

  /*********************************************** */
  useEffect(() => {
    handleCourse();
    if (token) {
      setCustomizeNotif({ ...CustomizeNotif, course: Data });
    }
  }, []);

  const handleCourse = () => {
    axios
      .get(
        `${process.env.REACT_APP_API}api/trainings/specific`,
        {
          params: { id: id },
          headers: { authorization: `Bearer ${localStorage.getItem("token")}` }
        },
        {}
      )
      .then((res) => {
        setData(res.data.data);
        setEvaluations(res.data.data.evaluate);
      });
  };

  const TimeperDay = new Date(Data?.TimePerDay);
  const time = `${
    TimeperDay.getHours() < 10
      ? "0" + TimeperDay.getHours()
      : TimeperDay.getHours()
  }:${
    TimeperDay.getMinutes() < 10
      ? "0" + TimeperDay.getMinutes()
      : TimeperDay.getMinutes()
  }`;
  const datesDisplay = Data?.Date?.map((date) => {
    return `Date: From ${format(new Date(date[0]), "MMM dd/yy")} To ${format(
      new Date(date[1]),
      "MMM dd/yy"
    )}`;
  });

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location = "/login";
  };

  const [enrollementButtonState, setEnrollementButtonState] = useState(true);

  // useEffect(()=>{
  //     if(!enrollementButtonState){
  //         handleDisabled()
  //     }
  // },[enrollementButtonState])

  useEffect(() => {
    if (user) {
      if (user.cartCourses) {
        if (user.cartCourses.includes(Data._id)) {
          setEnrollementButtonState(false);
        }
      }
    }
  }, [Data]);
  const [currency, setCurrency] = useState(null);
  const [errorLocation, setErrorLocation] = useState(null);
  const currencies = {
    Algeria: { currency: "Algerian dinar", code: "DZD" },
    Belgium: { currency: "Euro", code: "EUR" },
    Canada: { currency: "Canadian dollar", code: "CAD" },
    France: { currency: "Euro", code: "EUR" },
    Germany: { currency: "Euro", code: "EUR" },
    Morocco: { currency: "Moroccan dirham", code: "MAD" },
    Tunisia: { currency: "Tunisian dinar", code: "TND" },
    Egypt: { currency: "Egyptian pound", code: "EGP" },
    "United Kingdom": { currency: "Pound sterling", code: "GBP" },
    "United States": { currency: "United States dollar", code: "USD" }
  };

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const ipResponse = await axios.get("https://api.ipify.org?format=json");
        const ip = ipResponse.data.ip;
        const countryResponse = await axios.get(`https://ipapi.co/${ip}/json/`);
        const country = countryResponse.data.country_name;
        const currencyData = currencies[country];

        if (currencyData) {
          setCurrency(currencyData);
        } else {
          setErrorLocation("Monnaie non trouvée pour ce pays");
        }
      } catch (err) {
        setErrorLocation("Erreur lors de la récupération des données");
        console.error(err);
      }
    };

    fetchCurrency();
  }, []);
  const TextRating = (value, avis) => {
    return (
      <Box
        sx={{
          width: 200,
          display: "flex",
          alignItems: "center"
        }}
      >
        {/* <Rating
          name="text-feedback"
          value={value}
          readOnly
          precision={0.5}
          emptyIcon={<StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />}
        /> */}

        <Box sx={{ ml: 2 }}>({avis} avis)</Box>
        <StarIcon style={{ opacity: 0.55 }} fontSize="inherit" />
      </Box>
    );
  };
  const [Enrolled, setEnrolled] = useState(false);

  useEffect(() => {
    if (Enrolled) {
    }
  }, [Enrolled]);

  const handleCloseEnrolled = () => {
    setEnrolled(false);
  };
  //var list = []
  const handleOpenEnrolled = () => {
    setData({ ...Data, enrolled: [...Data.enrolled, user._id] });
    setEnrolled(true);
  };

  useEffect(() => {
    if (token) {
      handleLastSeen();
    }
  }, []);

  const handleLastSeen = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` }
    };
    try {
      const url = `${process.env.REACT_APP_API}api/Candidat/lastSeenTraining`;
      axios.post(url, { lastSeen: id }, config).then(async (res) => {
        //console.log(res)
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
    request.create("cart", {
      itemType: "training",
      itemId: Data._id
    });
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

  const [tool, setTool] = useState(false);
  const toolClose = () => {
    setTool(false);
  };

  const toolOpen = () => {
    setTool(true);
  };
  /************/ //////////////////////// */
  const [WindowWidth, setWindowWidth] = useState(0);

  useEffect(() => {
    if (WindowWidth <= 810) {
      setDown(true);
    } else {
      setDown(false);
    }
  }, []);

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
    if (WindowWidth <= 876) {
      setDown(true);
      setMobileView(true);
    } else {
      setDown(false);
      setMobileView(false);
    }
  }, [WindowWidth]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <React.Fragment>
      <div className={styles.backimage}>
        <div className={styles.maincontainernav}>
          <div className={styles.nav_container}>
            <Nav ref={refHome} />
          </div>
          <div className={styles.pdowncontainer}>
            <div className={styles.pdown}>
              TRAINING DETAILS
              <p className={styles.underline}></p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.maincontainer}>
        <main className={styles.MotherDivCourse}>
          <div className={styles.MainDivCourse}>
            <div className={styles.leftSectionCourse}>
              <div className={styles.course}>
                TRAINING
                <p className={styles.underline}></p>
              </div>

              <div className={styles.FirsSectionInfoCourse}>
                {Data.Thumbnail === "qqq" ||
                Data.Thumbnail == {} ||
                !Data.Thumbnail ? (
                  <div
                    className={styles.imgCourse}
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_API}uploads/courseImg.png) !important`
                    }}
                  >
                    {/* <img
                  src={`${process.env.REACT_APP_API}/uploads/courseImg.png`}
                  alt=""
                
                /> */}
                  </div>
                ) : (
                  // <img
                  //   src={`${process.env.REACT_APP_API}/${Data.Thumbnail.filePath}`}
                  //   alt=""
                  //   className={styles.imgCourse}
                  // />
                  <div
                    className={styles.imgCourse}
                    style={{
                      backgroundImage: `url(${process.env.REACT_APP_API}uploads/courseImg.png) !important`
                    }}
                  >
                    <img
                      src={`${process.env.REACT_APP_API}${Data.Thumbnail.filePath}`}
                      alt=""
                      className={styles.imgCourseImage}
                    />
                  </div>
                )}

                <div className={styles.FirsSectionInfoCourseTitle}>
                  {/* <h1>{Data.Title}</h1> */}
                  <h1>{Data.Title}</h1>
                </div>
                <div>
                  <div className={styles.courseInfo}>
                    <span>Amira BACHA</span>
                    <span>enrolled number</span>
                    <span>
                      {Data.rating
                        ? TextRating(Data.rating, Data.evaluate.length)
                        : TextRating(0, 0)}
                    </span>
                  </div>
                </div>
              </div>

              <div className={styles.ScndSectionInfoCourse}>
                <div className={styles.coursePart}>
                  <div className={styles.DescriptionInfoCourse}>
                    <div className={styles.DescriptionInfoCourseTitle}>
                      <span>
                        DESCRIPTION
                        <p className={styles.underline}></p>
                      </span>
                    </div>
                    <div className={styles.DescriptionInfoCourseText}>
                      <p>{Data.Description}</p>
                    </div>
                  </div>
                  <div className={styles.DescriptionInfoCourse}>
                    <div className={styles.DescriptionInfoCourseTitle}>
                      <span>
                        Goals
                        <p className={styles.underline}></p>
                      </span>
                    </div>
                    <div className={styles.DescriptionInfoCourseText}>
                      <p>{Data.Goals}</p>
                    </div>
                  </div>
                  <div className={styles.DescriptionInfoCourse}>
                    <div className={styles.DescriptionInfoCourseTitle}>
                      <span>
                        Who Should Attend
                        <p className={styles.underline}></p>
                      </span>
                    </div>
                    <div className={styles.DescriptionInfoCourseText}>
                      <p>{Data.WhoShouldAttend}</p>
                    </div>
                  </div>
                  <div className={styles.DescriptionInfoCourse}>
                    <div className={styles.DescriptionInfoCourseTitle}>
                      <span>
                        Course Content
                        <p className={styles.underline}></p>
                      </span>
                    </div>
                    <div className={styles.DescriptionInfoCourseText}>
                      <p>{Data.CourseContent}</p>
                    </div>
                  </div>
                  <div className={styles.DescriptionInfoCourse}>
                    <div className={styles.DescriptionInfoCourseTitle}>
                      <span>
                        PracticalWork
                        <p className={styles.underline}></p>
                      </span>
                    </div>
                    <div className={styles.DescriptionInfoCourseText}>
                      <p>{Data.PracticalWork}</p>
                    </div>
                  </div>
                  <div className={styles.DescriptionInfoCourse}>
                    <div className={styles.DescriptionInfoCourseTitle}>
                      <span>
                        Certificate
                        <p className={styles.underline}></p>
                      </span>
                    </div>
                    <div className={styles.DescriptionInfoCourseText}>
                      <p>{Data.certificate}</p>
                    </div>
                  </div>
                  {Data.evaluate.length > 0 ? (
                    <div className={styles.OpinionsCourse}>
                      <div className={styles.OpinionsCourseTitle}>
                        <h1>Users Opinion</h1>
                      </div>
                      {EvaluationsCompleated.map((e) => {
                        return (
                          <React.Fragment>
                            <div className={styles.opinion}>
                              <div className={styles.opinionHeader}>
                                {token ? (
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
                {down && (
                  <div className={styles.rightSectionCourse}>
                    <div className={styles.scndInfos}>
                      <div className={styles.CoursePriceInfoPage}>
                        <div className={styles.price}>
                          {Data.Price} {currency?.code}
                          <p className={styles.underline}></p>
                        </div>
                      </div>
                      <div className={styles.InfosRefDur}>
                        <div className={styles.InfosDates}>
                          <h1
                            className={styles.radioTitle}
                            id="demo-controlled-radio-buttons-group"
                          >
                            Date :
                          </h1>
                          {Data.state !== "expired" ? (
                            <p className={style.radioLable}>{}</p>
                          ) : (
                            <p>session concluded</p>
                          )}
                        </div>
                        {/* <p>
                  Reference: <span>{Data.Reference}</span>
                </p> */}
                        <ul>
                          <li>
                            Instructor: <span> 4 hours/Day</span>
                          </li>
                          <li>
                            Duration: <span> 2 hours/Day</span>
                          </li>
                          <li>
                            Lectures: <span> {Data.TimePerDay}</span>
                          </li>
                          <li>
                            Level: <span> {Data.Level}</span>
                          </li>
                          <li>
                            Category: <span> {Data.Category}</span>
                          </li>
                          <li>
                            Certificate:{" "}
                            <span>
                              {" "}
                              {Data.certificate !== null ? "yes" : "no"}
                            </span>
                          </li>
                        </ul>
                      </div>

                      <div className={styles.CourseButtonsInfoPage}>
                        {user ? (
                          <React.Fragment>
                            {Data.state !== "expired" ? (
                              <React.Fragment>
                                {!user.cartTrainings.includes(Data._id) ? (
                                  <button
                                    onClick={handleEnroll}
                                    id={styles.CourseButtonsInfoPageB1}
                                  >
                                    <p>Add To Cart</p>
                                    <img
                                      src="/images/course/addchat.png"
                                      alt=""
                                      className={styles.imagechart}
                                    />
                                  </button>
                                ) : (
                                  <Tooltip
                                    title="You don't have permission to do this"
                                    followCursor
                                  >
                                    <button
                                      disabled={false}
                                      id={styles.CourseButtonsInfoPageB1Mod}
                                    >
                                      {/*onClick={handleDisabled} */}
                                      <p>Added TO Cart</p>
                                      <img
                                        src="/images/course/addchat.png"
                                        alt=""
                                        className={styles.imagechart}
                                      />
                                    </button>
                                  </Tooltip>
                                )}
                              </React.Fragment>
                            ) : (
                              <button
                                disabled={true}
                                id={styles.CourseButtonsInfoPageB1Mod}
                                // onClick={handleEnroll}
                              >
                                <p>Add To Cart here </p>
                                <img
                                  src="/images/course/addchat.png"
                                  alt=""
                                  className={styles.imagechart}
                                />
                              </button>
                            )}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {Data.state !== "expired" ? (
                              <button
                                onClick={handleEnroll}
                                id={styles.CourseButtonsInfoPageB1}
                              >
                                <p>Add To Cart </p>
                                <img
                                  src="/images/course/addchat.png"
                                  alt=""
                                  className={styles.imagechart}
                                />
                              </button>
                            ) : (
                              <button
                                disabled={true}
                                id={styles.CourseButtonsInfoPageB1Mod}
                              >
                                {/*onClick={handleDisabled} */}
                                <p>Add To Cart</p>
                                <img
                                  src="/images/course/addchat.png"
                                  alt=""
                                  className={styles.imagechart}
                                />
                              </button>
                            )}
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
                              alignItems: "center"
                            }}
                          >
                            <div className={styles.ModalComponent}>
                              <h3
                                id="parent-modal-title"
                                className={styles.ModalTitle}
                              >
                                Course added to the cart successfully
                              </h3>
                              <p
                                sx={{ textAlign: "center" }}
                                id="parent-modal-description"
                              >
                                Your registration request for this course is
                                being processed.{" "}
                              </p>

                              <Divider
                                variant="inset"
                                sx={{ width: "100%", height: "3px", margin: 0 }}
                              />

                              <p
                                sx={{ textAlign: "center" }}
                                id="parent-modal-description"
                              >
                                you can track your registration status through
                                your profile,
                                <a href="/candidate/profile">
                                  {" "}
                                  quick access to profile{" "}
                                </a>
                              </p>
                            </div>
                            <br />
                            <Button onClick={handleCart} variant="contained">
                              Enroll Now
                            </Button>
                          </Box>
                        </Modal>
                        {user ? (
                          <React.Fragment>
                            {Data.state !== "expired" ? (
                              <React.Fragment>
                                {!user.cartTrainings.includes(Data._id) ? (
                                  <button
                                    onClick={handleOpenCustom}
                                    id={styles.CourseButtonsInfoPageB2}
                                  >
                                    <p>Customize</p>
                                    <img
                                      src="/images/course/customize.png"
                                      alt=""
                                      className={styles.imagechart}
                                    />
                                  </button>
                                ) : (
                                  <Tooltip
                                    title="You don't have permission to do this"
                                    followCursor
                                  >
                                    <button
                                      disabled={false}
                                      id={styles.CourseButtonsInfoPageB2Mod}
                                    >
                                      {/*onClick={handleDisabled} */}
                                      <p>Customize here</p>
                                      <img
                                        src="/images/course/customize.png"
                                        alt=""
                                        className={styles.imagechart}
                                      />
                                    </button>
                                  </Tooltip>
                                )}
                              </React.Fragment>
                            ) : (
                              <button
                                disabled={true}
                                id={styles.CourseButtonsInfoPageB2Mod}
                              >
                                {/*onClick={handleDisabled} */}
                                <p>Customize</p>
                                <img
                                  src="/images/course/customize.png"
                                  alt=""
                                  className={styles.imagechart}
                                />
                              </button>
                            )}
                          </React.Fragment>
                        ) : (
                          <React.Fragment>
                            {Data.state !== "expired" ? (
                              <button
                                onClick={handleOpenCustom}
                                id={styles.CourseButtonsInfoPageB2}
                              >
                                <p>Customize</p>
                                <img
                                  src="/images/course/customize.png"
                                  alt=""
                                  className={styles.imagechart}
                                />
                              </button>
                            ) : (
                              <button
                                disabled={true}
                                id={styles.CourseButtonsInfoPageB2Mod}
                              >
                                {/*onClick={handleDisabled} */}
                                <p>Customize</p>
                                <img
                                  src="/images/course/customize.png"
                                  alt=""
                                  className={styles.imagechart}
                                />
                              </button>
                            )}
                          </React.Fragment>
                        )}

                        <Modal
                          sx={{ p: 1 }}
                          open={openCustom}
                          onClose={handleCloseCustom}
                          aria-labelledby="parent-modal-title"
                          aria-describedby="parent-modal-description"
                        >
                          <Box
                            sx={{
                              ...style,
                              width: 400,
                              display: "flex",
                              flexDirection: "column",
                              overflowY: "auto",
                              overflowX: "hidden",
                              maxHeight: "85vh"
                            }}
                          >
                            <div className={styles.ModalComponent}>
                              <h2
                                id="parent-modal-title"
                                className={styles.ModalTitle}
                              >
                                Customize
                              </h2>
                              <p id="parent-modal-description">
                                What do you want to customize ?
                              </p>
                              <Autocomplete
                                sx={{ width: 400, m: 1 }}
                                multiple
                                id="tags-outlined"
                                options={Custom}
                                getOptionLabel={(option) => option}
                                filterSelectedOptions
                                onChange={handleChangeSelected}
                                renderInput={(params) => (
                                  <TextField
                                    {...params}
                                    label="Customize"
                                    placeholder="I want to customize..."
                                  />
                                )}
                              />

                              {selectedOptions[0] &&
                              selectedOptions[0].includes("Date") ? (
                                <div className={styles.Date}>
                                  <div className={styles.DatePicker}>
                                    <LocalizationProvider
                                      dateAdapter={AdapterDateFns}
                                    >
                                      <Stack spacing={2}>
                                        {mobile && (
                                          <MobileDateRangePicker
                                            name="date"
                                            startText="start"
                                            value={CustomizeNotif.date}
                                            onChange={(newDate) => {
                                              setCustomizeNotif({
                                                ...CustomizeNotif,
                                                date: newDate
                                              });
                                            }}
                                            renderInput={(
                                              startProps,
                                              endProps
                                            ) => (
                                              <React.Fragment>
                                                <TextField {...startProps} />
                                                <Box sx={{ mx: 1 }}> to </Box>
                                                <TextField {...endProps} />
                                              </React.Fragment>
                                            )}
                                          />
                                        )}
                                        <DesktopDateRangePicker
                                          name="date"
                                          startText="Select Start Date"
                                          endText="Select End Date"
                                          value={CustomizeNotif.date}
                                          onChange={(newDate) => {
                                            setCustomizeNotif({
                                              ...CustomizeNotif,
                                              date: newDate
                                            });
                                          }}
                                          renderInput={(
                                            startProps,
                                            endProps
                                          ) => (
                                            <React.Fragment>
                                              <TextField {...startProps} />
                                              <Box sx={{ mx: 1 }}> to </Box>
                                              <TextField {...endProps} />
                                            </React.Fragment>
                                          )}
                                        />
                                      </Stack>
                                    </LocalizationProvider>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              {selectedOptions[0] &&
                              selectedOptions[0].includes("Horaire") ? (
                                <div className={styles.Date}>
                                  <div className={styles.DatePicker}>
                                    <LocalizationProvider
                                      dateAdapter={AdapterDateFns}
                                    >
                                      <Stack spacing={2}>
                                        {mobile && (
                                          <MobileTimePicker
                                            name="time"
                                            label="Select Time"
                                            value={CustomizeNotif.time}
                                            onChange={(newTime) => {
                                              setCustomizeNotif({
                                                ...CustomizeNotif,
                                                time: newTime
                                              });
                                            }}
                                            renderInput={(params) => (
                                              <TextField {...params} />
                                            )}
                                          />
                                        )}
                                        <DesktopTimePicker
                                          name="time"
                                          label="Select Time"
                                          value={CustomizeNotif.time}
                                          onChange={(newTime) => {
                                            setCustomizeNotif({
                                              ...CustomizeNotif,
                                              time: newTime
                                            });
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      </Stack>
                                    </LocalizationProvider>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}

                              {selectedOptions[0] &&
                              selectedOptions[0].includes(
                                "durée de la formation"
                              ) ? (
                                <div className={styles.Date}>
                                  <div className={styles.DatePicker}>
                                    <TextField
                                      label="durée de la formation"
                                      id="outlined-start-adornment"
                                      sx={{ m: 1, width: "25ch" }}
                                      InputProps={{
                                        endAdornment: (
                                          <InputAdornment position="end">
                                            hrs
                                          </InputAdornment>
                                        )
                                      }}
                                      name="duration"
                                      value={CustomizeNotif.duration}
                                      onChange={handleChangeCustom}
                                    />
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              {selectedOptions[0] &&
                              selectedOptions[0].includes("Autre...") ? (
                                <div className={styles.Date}>
                                  <div className={styles.DatePicker}>
                                    <FormControl
                                      className={styles.FormControl}
                                      sx={{ m: 1, minWidth: "80%" }}
                                    >
                                      <Box
                                        component="form"
                                        sx={{
                                          "& > :not(style)": { width: "100%" }
                                        }}
                                        noValidate
                                        autoComplete="off"
                                      >
                                        <TextField
                                          multiline
                                          name="message"
                                          id="outlined-basic"
                                          label="Message"
                                          value={CustomizeNotif.message}
                                          onChange={handleChangeCustom}
                                          variant="outlined"
                                        />
                                      </Box>
                                    </FormControl>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <LoadingButton
                                sx={{ m: 1 }}
                                onClick={handleSend}
                                type="submit"
                                endIcon={<SendIcon />}
                                // loading={loading}
                                // loadingPosition="end"
                                variant="contained"
                              >
                                Send
                              </LoadingButton>
                            </div>
                          </Box>
                        </Modal>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
            <div></div>

            {!down && (
              <div className={styles.rightSectionContainer}>
                <div className={styles.rightSectionCourse}>
                  <div className={styles.scndInfos}>
                    <div className={styles.CoursePriceInfoPage}>
                      <div className={styles.price}>
                        {Data.Price} {currency?.code}
                        <p className={styles.underline}></p>
                      </div>
                    </div>
                    <div className={styles.InfosRefDur}>
                      <div className={styles.InfosDates}>
                        <h1
                          className={styles.radioTitle}
                          id="demo-controlled-radio-buttons-group"
                        >
                          Date :
                        </h1>
                        {Data.state !== "expired" ? (
                          <p>{datesDisplay}</p>
                        ) : (
                          <p>session concluded</p>
                        )}
                      </div>
                      {/* <p>
                  Reference: <span>{Data.Reference}</span>
                </p> */}
                      <ul>
                        <li>
                          Instructor: <span> {Data.Instructor || "-"}</span>
                        </li>
                        <li>
                          Duration: <span> {Data.Duration}</span>
                        </li>
                        <li>
                          Lectures: <span> {Data.TimePerDay}</span>
                        </li>
                        <li>
                          Level: <span> {Data.Level}</span>
                        </li>
                        <li>
                          Category: <span> {Data.Category}</span>
                        </li>
                        <li>
                          Certificate:{" "}
                          <span>
                            {" "}
                            {Data.certificate !== null ? "yes" : "no"}
                          </span>
                        </li>
                      </ul>
                    </div>

                    <div className={styles.CourseButtonsInfoPage}>
                      {user ? (
                        <React.Fragment>
                          {Data.state !== "expired" ? (
                            <React.Fragment>
                              <button
                                onClick={handleEnroll}
                                id={styles.CourseButtonsInfoPageB1}
                                className={`${
                                  user.cartTrainings.includes(Data._id) &&
                                  "disabled"
                                }`}
                                disabled={user.cartTrainings.includes(Data._id)}
                              >
                                <p>Add To Cart</p>
                                <img
                                  src="/images/course/addchat.png"
                                  alt=""
                                  className={styles.imagechart}
                                />
                              </button>
                            </React.Fragment>
                          ) : (
                            <button
                              disabled={true}
                              id={styles.CourseButtonsInfoPageB1Mod}
                              // onClick={handleEnroll}
                            >
                              <p>Add To Cart here </p>
                              <img
                                src="/images/course/addchat.png"
                                alt=""
                                className={styles.imagechart}
                              />
                            </button>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {Data.state !== "expired" ? (
                            <button
                              onClick={handleEnroll}
                              id={styles.CourseButtonsInfoPageB1}
                            >
                              <p>Add To Cart </p>
                              <img
                                src="/images/course/addchat.png"
                                alt=""
                                className={styles.imagechart}
                              />
                            </button>
                          ) : (
                            <button
                              disabled={true}
                              id={styles.CourseButtonsInfoPageB1Mod}
                            >
                              {/*onClick={handleDisabled} */}
                              <p>Add To Cart</p>
                              <img
                                src="/images/course/addchat.png"
                                alt=""
                                className={styles.imagechart}
                              />
                            </button>
                          )}
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
                            alignItems: "center"
                          }}
                        >
                          <div className={styles.ModalComponent}>
                            <h3
                              id="parent-modal-title"
                              className={styles.ModalTitle}
                            >
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
                              you can track your registration status through
                              your profile,
                              <a href="/candidate/profile">
                                {" "}
                                quick access to profile{" "}
                              </a>
                            </p>
                          </div>
                          <br />
                          <Button onClick={handleCart} variant="contained">
                            Enroll Now
                          </Button>
                        </Box>
                      </Modal>
                      {user ? (
                        <React.Fragment>
                          {Data.state !== "expired" ? (
                            <React.Fragment>
                              {!user.cartTrainings.includes(Data._id) ? (
                                <button
                                  onClick={handleOpenCustom}
                                  id={styles.CourseButtonsInfoPageB2}
                                >
                                  <p>Customize</p>
                                  <img
                                    src="/images/course/customize.png"
                                    alt=""
                                    className={styles.imagechart}
                                  />
                                </button>
                              ) : (
                                <Tooltip
                                  title="You don't have permission to do this"
                                  followCursor
                                >
                                  <button
                                    disabled={false}
                                    id={styles.CourseButtonsInfoPageB2Mod}
                                  >
                                    {/*onClick={handleDisabled} */}
                                    <p>Customize here</p>
                                    <img
                                      src="/images/course/customize.png"
                                      alt=""
                                      className={styles.imagechart}
                                    />
                                  </button>
                                </Tooltip>
                              )}
                            </React.Fragment>
                          ) : (
                            <button
                              disabled={true}
                              id={styles.CourseButtonsInfoPageB2Mod}
                            >
                              {/*onClick={handleDisabled} */}
                              <p>Customize</p>
                              <img
                                src="/images/course/customize.png"
                                alt=""
                                className={styles.imagechart}
                              />
                            </button>
                          )}
                        </React.Fragment>
                      ) : (
                        <React.Fragment>
                          {Data.state !== "expired" ? (
                            <button
                              onClick={handleOpenCustom}
                              id={styles.CourseButtonsInfoPageB2}
                            >
                              <p>Customize</p>
                              <img
                                src="/images/course/customize.png"
                                alt=""
                                className={styles.imagechart}
                              />
                            </button>
                          ) : (
                            <button
                              disabled={true}
                              id={styles.CourseButtonsInfoPageB2Mod}
                            >
                              {/*onClick={handleDisabled} */}
                              <p>Customize</p>
                              <img
                                src="/images/course/customize.png"
                                alt=""
                                className={styles.imagechart}
                              />
                            </button>
                          )}
                        </React.Fragment>
                      )}

                      <Modal
                        sx={{ p: 1 }}
                        open={openCustom}
                        onClose={handleCloseCustom}
                        aria-labelledby="parent-modal-title"
                        aria-describedby="parent-modal-description"
                      >
                        <Box
                          sx={{
                            ...style,
                            width: 400,
                            display: "flex",
                            flexDirection: "column",
                            overflowY: "auto",
                            overflowX: "hidden",
                            maxHeight: "85vh"
                          }}
                        >
                          <div className={styles.ModalComponent}>
                            <h2
                              id="parent-modal-title"
                              className={styles.ModalTitle}
                            >
                              Customize
                            </h2>
                            <p id="parent-modal-description">
                              What do you want to customize ?
                            </p>
                            <Autocomplete
                              sx={{ width: 400, m: 1 }}
                              multiple
                              id="tags-outlined"
                              options={Custom}
                              getOptionLabel={(option) => option}
                              filterSelectedOptions
                              onChange={handleChangeSelected}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  label="Customize"
                                  placeholder="I want to customize..."
                                />
                              )}
                            />

                            {selectedOptions[0] &&
                            selectedOptions[0].includes("Date") ? (
                              <div className={styles.Date}>
                                <div className={styles.DatePicker}>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                  >
                                    <Stack spacing={2}>
                                      {mobile && (
                                        <MobileDateRangePicker
                                          name="date"
                                          startText="start"
                                          value={CustomizeNotif.date}
                                          onChange={(newDate) => {
                                            setCustomizeNotif({
                                              ...CustomizeNotif,
                                              date: newDate
                                            });
                                          }}
                                          renderInput={(
                                            startProps,
                                            endProps
                                          ) => (
                                            <React.Fragment>
                                              <TextField {...startProps} />
                                              <Box sx={{ mx: 1 }}> to </Box>
                                              <TextField {...endProps} />
                                            </React.Fragment>
                                          )}
                                        />
                                      )}
                                      <DesktopDateRangePicker
                                        name="date"
                                        startText="Select Start Date"
                                        endText="Select End Date"
                                        value={CustomizeNotif.date}
                                        onChange={(newDate) => {
                                          setCustomizeNotif({
                                            ...CustomizeNotif,
                                            date: newDate
                                          });
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
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {selectedOptions[0] &&
                            selectedOptions[0].includes("Horaire") ? (
                              <div className={styles.Date}>
                                <div className={styles.DatePicker}>
                                  <LocalizationProvider
                                    dateAdapter={AdapterDateFns}
                                  >
                                    <Stack spacing={2}>
                                      {mobile && (
                                        <MobileTimePicker
                                          name="time"
                                          label="Select Time"
                                          value={CustomizeNotif.time}
                                          onChange={(newTime) => {
                                            setCustomizeNotif({
                                              ...CustomizeNotif,
                                              time: newTime
                                            });
                                          }}
                                          renderInput={(params) => (
                                            <TextField {...params} />
                                          )}
                                        />
                                      )}
                                      <DesktopTimePicker
                                        name="time"
                                        label="Select Time"
                                        value={CustomizeNotif.time}
                                        onChange={(newTime) => {
                                          setCustomizeNotif({
                                            ...CustomizeNotif,
                                            time: newTime
                                          });
                                        }}
                                        renderInput={(params) => (
                                          <TextField {...params} />
                                        )}
                                      />
                                    </Stack>
                                  </LocalizationProvider>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}

                            {selectedOptions[0] &&
                            selectedOptions[0].includes(
                              "durée de la formation"
                            ) ? (
                              <div className={styles.Date}>
                                <div className={styles.DatePicker}>
                                  <TextField
                                    label="durée de la formation"
                                    id="outlined-start-adornment"
                                    sx={{ m: 1, width: "25ch" }}
                                    InputProps={{
                                      endAdornment: (
                                        <InputAdornment position="end">
                                          hrs
                                        </InputAdornment>
                                      )
                                    }}
                                    name="duration"
                                    value={CustomizeNotif.duration}
                                    onChange={handleChangeCustom}
                                  />
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            {selectedOptions[0] &&
                            selectedOptions[0].includes("Autre...") ? (
                              <div className={styles.Date}>
                                <div className={styles.DatePicker}>
                                  <FormControl
                                    className={styles.FormControl}
                                    sx={{ m: 1, minWidth: "80%" }}
                                  >
                                    <Box
                                      component="form"
                                      sx={{
                                        "& > :not(style)": { width: "100%" }
                                      }}
                                      noValidate
                                      autoComplete="off"
                                    >
                                      <TextField
                                        multiline
                                        name="message"
                                        id="outlined-basic"
                                        label="Message"
                                        value={CustomizeNotif.message}
                                        onChange={handleChangeCustom}
                                        variant="outlined"
                                      />
                                    </Box>
                                  </FormControl>
                                </div>
                              </div>
                            ) : (
                              ""
                            )}
                            <LoadingButton
                              sx={{ m: 1 }}
                              onClick={handleSend}
                              type="submit"
                              endIcon={<SendIcon />}
                              // loading={loading}
                              // loadingPosition="end"
                              variant="contained"
                            >
                              Send
                            </LoadingButton>
                          </div>
                        </Box>
                      </Modal>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </main>
      </div>
      <Footer />
    </React.Fragment>
  );
};

export default StandardTraining;
