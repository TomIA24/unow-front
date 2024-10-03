import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import React from "react";
import { useNavigate } from "react-router-dom";
import styles from "./styles.module.css";

const Courses = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.container}>
      <div className={styles.addCourse}>
        <p>Courses</p>
        <span onClick={() => navigate("/course/add")}>
          <AddIcon sx={{ fontSize: "24px" }} />
        </span>
      </div>
      <div className={styles.coursesCard}>
        <div className={styles.imgContainer}>
          <img src={"./images/courses.png"} alt="" className={styles.img} />
        </div>

        <div className={styles.info}>
          <div className={styles.group}>
            <p className={styles.title}>Web Development</p>
            <div className={styles.icons}>
              <div className={styles.icon}>
                <DeleteOutlineIcon
                  sx={{ color: "var(--primary-color)", fontSize: "16px" }}
                />
              </div>
              <di
                onClick={() => navigate(`/course/edit/${1}`)}
                className={styles.icon}
              >
                <EditIcon
                  sx={{ color: "var(--secondary-color)", fontSize: "16px" }}
                />
              </di>
            </div>
          </div>
          <div className={styles.textContainer}>
            <p>React: Developing a Web Development</p>
          </div>
          <p className={styles.status} style={{ "--status-color": "#34A853" }}>
            confirmed
          </p>
          <button>
            <span>Go To Course</span>
            <SendIcon sx={{ color: "white", fontSize: "16px" }} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Courses;
