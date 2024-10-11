import SendIcon from "@mui/icons-material/Send";
import { format } from "date-fns";
import React from "react";
import Loading from "../../../component/Loading/index";
import EmptyBox from "../../../shared/components/EmptyBox";
import styles from "./styles.module.css";
import useTrainings from "./useTrainings";

const Trainings = () => {
  const { trainings, loading } = useTrainings();

  if (loading) return <Loading h="55vh" />;

  return (
    <div className={styles.container}>
      {trainings.length !== 0 && (
        <EmptyBox h="55vh" text="You don't have any trainings yet" />
      )}
      {trainings.length < 0 &&
        trainings.map((training) => (
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
