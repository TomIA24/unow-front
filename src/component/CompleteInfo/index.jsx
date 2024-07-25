import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import LoadingButton from '@mui/lab/LoadingButton';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import SaveIcon from '@mui/icons-material/Save';
import Alert from '@mui/material/Alert';
import Stack from '@mui/material/Stack';
import UploadImg from '../assets/ProfileImg.svg'
import {FiSend, FiPhone} from 'react-icons/fi'
import {HiOutlineLocationMarker} from 'react-icons/hi'
import {GrValidate} from 'react-icons/gr'
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import MobileDateRangePicker from '@mui/lab/MobileDateRangePicker';
import DesktopDateRangePicker from '@mui/lab/DesktopDateRangePicker';
import countryList from '../res/countries'
import Languages from '../res/languages'
import Programs from '../res/programs'
import Autocomplete from '@mui/material/Autocomplete';
import SliderNav from '../slider'
import imgUK from "../assets/UK.svg"
import imgLogo from '../assets/logo.jpg'
import Nav from "../Nav"
import img from "../assets/profileImgNoUp.svg";
// import imgcard from "../../assets/courseImg.svg";
import Badge from "@mui/material/Badge";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { getBase64 } from "../../shared/image.service";
import { singleFileUpload } from "../UploadFunctions/data/api";
import { styled } from "@mui/material/styles";

const handleLogout = () => {
  localStorage.removeItem("token");
  localStorage.removeItem("user");
  window.location = "/login";
};

const SmallAvatar = styled(Avatar)(({ theme }) => ({
  width: 22,
  height: 22,
  border: `2px solid ${theme.palette.background.paper}`,
}));

const Input = styled("input")({
  display: "none",
});
const CompleteInfo = () => {
  const [prev, setPrev] = useState(null);

  const [singleFile, setSingleFile] = useState("");

  const [DatesPicked, setDatesPicked] = useState([]);
  const [count, setcount] = useState([]);
  const [value, setValue] = useState([null, null]);

  const token = localStorage.getItem("token");

  const SaveDate = () => {
    setDatesPicked(DatesPicked + "," + value);
    setcount(count + 1);
  };
  const [valueParams, setValueParams] = useState([]);
  const user = JSON.parse(localStorage.getItem("user"));
  const [mobile, setMobile] = useState(false);
  const [data, setData] = useState({
    _id: user._id,
    name: "",
    surname: "",
    userName: "",
    adresse: "",
    phone: "",
    // email: "",
    // password: "",
    connectingMetropolis: "",
    monthlyBandwidth: "",
    animationLanguage: [""],
    description: "",
    programs: [],
    // dateOfCreation: "",
    // chargeTVA: false,
    RCS: "",
    SIRET: "",
    socialReason: "",
    image: user.image,
    // userType: "Trainer",
    firstConnection: false,
  });

  useEffect(() => {
    const url = `${process.env.REACT_APP_API}/api/userData`;
    const config = {
      headers: {
        authorization: `Bearer ${token}`,
      },
    };
    axios.post(url, {}, config).then((response) => {
      localStorage.setItem("user", JSON.stringify(response.data.data));
      // setData(response.data.data);
    });
  }, []);

  const [loading, setLoading] = React.useState(false);
  function handleClick() {
    setLoading(true);
  }

  const languages = Languages.map((language) => {
    return (
      <MenuItem key={language.code} value={language.code}>
        {language.name}
      </MenuItem>
    );
  });

  // const programs = Programs.map((Program) =>{
  // 	return(
  // 		<MenuItem key={Program} value={Program}>{Program}</MenuItem>
  // 	)
  // })

  const countries = countryList.map((country) => {
    return (
      <MenuItem key={country.number} value={country.code}>
        {country.name}
      </MenuItem>
    );
  });

  const [error, setError] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const navigate = useNavigate();

  const handleChange = async (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    if (e.target.name === "phone") {
      await handleVerifPhone(e.target.value);
    }
  };

  const handleVerifPhone = async (phone) => {
    const phoneList = phone.split("").filter((n) => (n !== " " ? n : ""));
    if (isNaN(phone)) {
      setPhoneError("Phone Number Invalid");
    } else {
      if (phoneList.length === 8) {
        if (
          isNaN(phone) &&
          !(
            phoneList[0] === "5" ||
            phoneList[0] === "9" ||
            phoneList[0] === "2" ||
            phoneList[0] === "4"
          )
        ) {
          setPhoneError("Phone Number Invalid");
        } else {
          setPhoneError("");
        }
      }
      if (phoneList.length === 12) {
        if (
          isNaN(phoneList.slice(1, phoneList.length).join("")) &&
          !(
            phoneList[4] === "5" ||
            phoneList[4] === "9" ||
            phoneList[4] === "2" ||
            phoneList[4] === "4"
          ) &&
          !(phoneList.slice(0, 4) == ["+", "2", "1", "6"])
        ) {
          setPhoneError("Phone Number Invalid");
        } else {
          setPhoneError("");
        }
      }
      if (phoneList.length === 13) {
        if (
          isNaN(phone) &&
          !(
            phoneList[5] === "5" ||
            phoneList[5] === "9" ||
            phoneList[5] === "2" ||
            phoneList[5] === "4"
          ) &&
          !(phoneList.slice(0, 5) == ["0", "0", "2", "1", "6"])
        ) {
          setPhoneError("Phone Number Invalid");
        } else {
          setPhoneError("");
        }
      }
    }
  };

  useEffect(() => {
    const listProgs = [];
    valueParams.map((pr) => {
      listProgs.push(pr.title);
    });
    setData({ ...data, programs: listProgs });
  }, [valueParams]);

  // const [saved, setSaved] = useState(true)

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
    getBase64(e.target.files[0]).then((data) => {
      setPrev(data);
    });
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    console.log("first sigle file : ", singleFile);
    if (singleFile != "" && singleFile != null && singleFile != undefined) {
      formData.append("file", singleFile);
      await singleFileUpload(formData, user._id);

      window.location.reload(true);
    }
  };

  const [changeImage, setChangeImage] = useState(false);
  useEffect(async() => {
    await uploadSingleFile();
  }, [singleFile]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(localStorage.getItem("token"));
    const config = {
      headers: {
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    };
    console.log("///////////");
    if (phoneError === "") {
      try {
        const url = `${process.env.REACT_APP_API}/api/Trainer/complete`;
        axios
          .post(url, data, config)
          .then(async (res) => {
            console.log(res);
            const config = {
              headers: {
                authorization: `Bearer ${localStorage.getItem("token")}`,
              },
            };
            const url = `${process.env.REACT_APP_API}/api/userData`;
            axios.post(url, {}, config).then((response) => {
              console.log(response);
              localStorage.removeItem("user");
              localStorage.setItem("user", JSON.stringify(response.data.data));
              window.location = "/profile";
            });
            // 		window.scrollTo(0, 0)
            // 		setSaved(true);
            // 		await new Promise(r => {
            // 			setTimeout(r, 20000)
            //		});
            // 		setSaved(false);
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
          console.log("test error");
          setError(error.response.data.message);
        }
      }
    }
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
      <main>
        <form className={styles.CourseForm} onSubmit={handleSubmit} action="">
          <div className={styles.MainDiv}>
            <form action="" className={styles.leftSection}>
              <div className={styles.ImgUploadSuction}>
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
                    <Avatar
                      alt="icon"
                      src={prev}
                      sx={{ width: 200, height: 200 }}
                    />
                  ) : (
                    <>
                      {data.image ? (
                        <Avatar
                          alt="icon"
                          src={`${process.env.REACT_APP_API}/${data.image.filePath}`}
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
                      name="userName"
                      id="outlined-basic"
                      label="userName"
                      value={data.userName}
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
                      value={data.description}
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
                    value={data.animationLanguage}
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
                    options={Programs}
                    value={valueParams}
                    name="programs"
                    getOptionLabel={(option) => option.title}
                    onChange={(event, newValue) => {
                      console.log(newValue);
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
                    value={data.connectingMetropolis}
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
                      value={data.monthlyBandwidth}
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
                      value={data.RCS}
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
                      value={data.SIRET}
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
                      value={data.socialReason}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                    />
                  </Box>
                </FormControl>
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
                      name="name"
                      id="outlined-basic"
                      label="name"
                      value={data.name}
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
                      name="surname"
                      id="outlined-basic"
                      label="surname"
                      value={data.surname}
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
                      name="phone"
                      id="outlined-basic"
                      label="phone"
                      value={data.phone}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                    />
                    {phoneError && (
                      <div className={styles.error_msg_Phone}>{phoneError}</div>
                    )}
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
                      maxRows={3}
                      name="adresse"
                      id="outlined-basic"
                      label="adresse"
                      value={data.adresse}
                      onChange={(e) => handleChange(e)}
                      variant="outlined"
                    />
                  </Box>
                </FormControl>
                <FormControl
                  className={styles.FormControl}
                  sx={{ m: 1, minWidth: "80%" }}
                >
                  <Box sx={{ "& > button": { ml: 1 } }}>
                    <LoadingButton
                      color="secondary"
                      type="submit"
                      loading={loading}
                      loadingPosition="start"
                      startIcon={<SaveIcon />}
                      variant="contained"
                    >
                      Save
                    </LoadingButton>
                  </Box>
                </FormControl>
              </div>
            </div>
          </div>
        </form>
      </main>
      <footer className={styles.footerOptimised}>
        <div className={styles.footerOptimisedLeft}>
          <h1>U!NOW</h1>
          <p>© Copyright U!NOW 2024</p>
        </div>
        <div className={styles.footerOptimisedRight}>
          <div>
            <FiSend size={25} />
            <p>support@u!now.tn</p>
          </div>
        </div>
      </footer>
    </React.Fragment>
  );
};

export default CompleteInfo;



