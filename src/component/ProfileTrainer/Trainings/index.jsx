import SendIcon from "@mui/icons-material/Send";
import { format } from "date-fns";
import React, { useEffect, useState } from "react";
import Loading from "../../../component/Loading/index";
import { request } from "../../../core/api/request";
import styles from "./styles.module.css";

const Trainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request
      .list("trainings/TrainerTrainings")
      .then((data) => {
        setTrainings(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loading h="55vh" />;

  return (
    <div className={styles.container}>
      {trainings.map((training) => (
        <div className={styles.trainingsCard} key={training._id}>
          <div className={styles.imgContainer}>
            <img
              src={process.env.REACT_APP_API + training?.Thumbnail.filePath}
              alt=""
              className={styles.img}
            />
          </div>

          <div className={styles.info}>
            <p className={styles.title}>{training?.Category}</p>
            <div className={styles.textContainer}>
              <p>{training.Title}</p>
              <p>{format(new Date(training?.TimePerDay), "dd/MM/yyyy")}</p>
              <p>{format(new Date(training?.TimePerDay), "HH:mm")}</p>
            </div>
            <button>
              <span>Go To Training</span>
              <SendIcon sx={{ color: "white", fontSize: "16px" }} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Trainings;
