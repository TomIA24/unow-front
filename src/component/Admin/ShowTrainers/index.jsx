import styles from "./styles.module.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from "react";
import Update from "./update";
import avatar from "../../assets/avatar.svg";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import EditIcon from "@mui/icons-material/Edit";
import axios from "axios";
import Avatar from "@mui/material/Avatar";

const ShowTrainers = () => {
  const token = localStorage.getItem("token");

  const [data, setData] = useState([]);
  const [openChange, setOpenChange] = React.useState(false);

  useEffect(() => {
    handleData();
  }, [, openChange]);

  const handleData = async () => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/Trainer/showTrainers`;
    axios.post(url, {}, config).then((res) => {
      setData(res.data.trainers);
    });
  };

  const handleDelete = async (id) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    const url = `${process.env.REACT_APP_API}/api/Trainer/deleteTrainers`;
    console.log(id);
    axios.post(url, { idTrainer: id }, config).then((res) => {
      handleData();
    });
  };

  const handleUpdate = (user) => {
    setuserUpdated(user);
    setOpenChange(true);
  };

  const [userUpdated, setuserUpdated] = useState();

  const trainers = data.map((user) => {
    return (
      <div className={styles.CardUser} key={user._id}>
        <div className={styles.avatar}>
          {user.image ? (
            <Avatar
              alt="icon"
              src={`${process.env.REACT_APP_API}/${user.image.filePath}`}
              sx={{ width: 170, height: 170 }}
            />
          ) : (
            <Avatar alt="icon" src={avatar} sx={{ width: 170, height: 170 }} />
          )}
          <h2>{user.description}</h2>
        </div>
        <div className={styles.CardBody}>
          <div className={styles.Config}>
            <div className={styles.ConfigLeft}>
              <DeleteOutlineIcon
                className={styles.icons}
                onClick={() => {
                  handleDelete(user._id);
                }}
              />
              <EditIcon
                className={styles.icons}
                onClick={() => handleUpdate(user)}
              />
            </div>
            <div className={styles.ConfigRight}>
              <MoreVertIcon className={styles.icons} />
            </div>
          </div>
          <div className={styles.Details}>
            <h2>
              Name:{" "}
              <span>
                {user.name} {user.surname}
              </span>
            </h2>
            <h2>
              E-mail: <span>{user.email}</span>
            </h2>
            <h2>
              Phone: <span>{user.phone}</span>
            </h2>
          </div>
        </div>
      </div>
    );
  });
  return (
    <React.Fragment>
      {userUpdated ? (
        <Update
          User={userUpdated}
          openChange={openChange}
          setOpenChange={setOpenChange}
        />
      ) : (
        ""
      )}
      <div className={styles.ShowTrainers}>
        <h1>Trainers</h1>
        <div className={styles.Cards}>{trainers}</div>
      </div>
    </React.Fragment>
  );
};

export default ShowTrainers;
