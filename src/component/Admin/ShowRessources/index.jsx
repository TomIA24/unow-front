import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Update from "./update";
import avatar from "../../assets/avatar.svg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import Button from "@mui/material/Button";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

const ShowRessources = () => {
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
    const url = `${process.env.REACT_APP_API}/api/trainings`;
    axios.post(url, {}, config).then((res) => {
      setData(res.data.data);
    });
  };

  const handleDelete = async (id) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/trainings/deleteTraining`;
    console.log(id);
    axios.post(url, { idCourse: id }, config).then((res) => {
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
          <img src={avatar} alt="" />
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
              <MoreVertIcon
                className={styles.icons}
                onClick={() => {
                  handleDetails(course);
                }}
              />

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
            <h2>
              Reference: <span>{course.Reference}</span>
            </h2>
            <h2>
              Category: <span>{course.Category}</span>
            </h2>
            <h2>
              Title: <span>{course.Title}</span>
            </h2>
            <h2>
              Level: <span>{course.Level}</span>
            </h2>
            <h2>
              Price: <span>{course.Price} $ HT</span>
            </h2>
          </div>
        </div>
      </div>
    );
  });

  return (
    <React.Fragment>
      <div className={styles.ShowCourses}>
        <h1>Courses</h1>
        <div className={styles.Cards}>{courses}</div>
      </div>
    </React.Fragment>
  );
};

export default ShowRessources;
