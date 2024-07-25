import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Update from "./update";
import Details from "./details2";
import avatar from "../../assets/avatar.svg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import axios from "axios";
import img from "../../assets/profileImgNoUp.svg";
import { Typography } from "@mui/material";

const ShowCourses = () => {
  const token = localStorage.getItem("token");
  const [data, setData] = useState([]);

  const [openChange, setOpenChange] = React.useState(false);
  const [courseUpdated, setCourseUpdated] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const openMenu = Boolean(anchorEl);
  const [courseDetails, setCourseDetails] = useState();
  const [openDetails, setOpenDetails] = useState(false);

  useEffect(() => {
    handleData();
  }, [, openChange]);

  const handleData = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/courses`;
    axios.post(url,config).then((res) => {
      setData(res.data.data);
    });
  };

  const handleDelete = async (id) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/courses/deleteCourse`;
    console.log(id);
    axios.post(url, { idCourse: id },config).then((res) => {
      handleData();
    });
  };

  const handleDetails = (course) => {
    setCourseDetails(course);
    setOpenDetails(true);
    setAnchorEl(null);
  };

  const handleUpdate = (course) => {
    setCourseUpdated(course);
    setOpenChange(true);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const courses = data.map((course) => {
    return (
      <div className={styles.CardCourse} key={course._id}>
        <div className={styles.avatar}>
          {course.Thumbnail ? (
            <img
              src={`${process.env.REACT_APP_API}/${course.Thumbnail.filePath}`}
              alt=""
              style={{ width: 180, height: 180 }}
              className={styles.imgTHMB}
            />
          ) : (
            <img src={img} alt="" style={{ width: 180, height: 180 }} />
          )}

          {/* <h2>{course.description}</h2> */}
        </div>
        <div className={styles.CardBody}>
          <div className={styles.Config}>
            <div className={styles.ConfigLeft}>
              <DeleteOutlineIcon
                className={styles.icons}
                onClick={() => {
                  handleDelete(course._id);
                }}
              />
              <EditIcon
                className={styles.icons}
                onClick={() => handleUpdate(course)}
              />
            </div>
            <div className={styles.ConfigRight}>
              <MoreVertIcon className={styles.icons} />

              {/*	 id="basic-button"
								 aria-controls={openMenu ? 'basic-menu' : undefined}
								 aria-haspopup="true"
								 aria-expanded={openMenu ? 'true' : undefined}
								 
							 onClick={handleClick} <Menu
								id="basic-menu"
								anchorEl={anchorEl}
								open={openMenu}
								onClose={handleClose}
								MenuListProps={{
								'aria-labelledby': 'basic-button',
								}}
							>
								<MenuItem onClick={()=>{handleDetails(course._id)}}>{course.Title}</MenuItem>
							</Menu> */}
            </div>
          </div>
          <div className={styles.Details}>
            {/* <h2>Reference: <span>{course.Reference}</span></h2> */}
            <h2>
              Category: <span>{course.Category}</span>
            </h2>
            <h2>
              Title: <span>{course.Title}</span>
            </h2>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-around",
                alignItems: "center",
              }}
            >
              <Typography className={styles.level} noWrap>
                <h2>
                  Level: <span>{course.Level}</span>
                </h2>
              </Typography>
              <h2>
                Price: <span>{course.Price} TTC</span>
              </h2>
            </Box>
          </div>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      {courseUpdated ? (
        <Update
          Course={courseUpdated}
          openChange={openChange}
          setOpenChange={setOpenChange}
        />
      ) : (
        ""
      )}
      {/* {courseDetails? <Details Course={courseDetails} openChange={openDetails} setOpenChange={setOpenDetails} />: ""} */}
      <div className={styles.ShowCourses}>
        <h1>Courses</h1>
        <div className={styles.Cards}>{courses}</div>
      </div>
    </React.Fragment>
  );
};

export default ShowCourses;
