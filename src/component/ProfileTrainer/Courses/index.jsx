import AddIcon from "@mui/icons-material/Add";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";
import EditIcon from "@mui/icons-material/Edit";
import SendIcon from "@mui/icons-material/Send";
import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../../core/api/request";
import Loading from "../../Loading";
import styles from "./styles.module.css";

const Courses = () => {
  const navigate = useNavigate();
  const [courses, setCourses] = React.useState([]);
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    setLoading(true);
    request
      .list("/courses/trainerCourses")
      .then((data) => setCourses(data.data))
      .finally(() => setLoading(false));
  }, []);

  const handleDelete = (id) => {
    request.remove(`/courses`, id);
    setCourses(courses.filter((course) => course._id !== id));
  };
  return (
    <div className={styles.container}>
      <div className={styles.addCourse}>
        <p>Courses</p>
        <span onClick={() => navigate("/course/add")}>
          <AddIcon sx={{ fontSize: "24px" }} />
        </span>
      </div>
      {loading && <Loading h="30vh" />}

      {!loading &&
        courses.map((course) => (
          <div key={course._id} className={styles.coursesCard}>
            <div className={styles.imgContainer}>
              <img
                src={process.env.REACT_APP_API + course.Thumbnail?.filePath}
                alt=""
                className={styles.img}
              />
            </div>

            <div className={styles.info}>
              <div className={styles.group}>
                <p className={styles.title}>{course.Category}</p>
                <div className={styles.icons}>
                  <div
                    onClick={() => handleDelete(course._id)}
                    className={styles.icon}
                  >
                    <DeleteOutlineIcon
                      sx={{ color: "var(--primary-color)", fontSize: "16px" }}
                    />
                  </div>
                  <div
                    onClick={() => navigate(`/course/edit/${course._id}`)}
                    aria-disabled={course.Status !== "proccessing"}
                    className={styles.icon}
                  >
                    <EditIcon
                      sx={{ color: "var(--secondary-color)", fontSize: "16px" }}
                    />
                  </div>
                </div>
              </div>
              <div className={styles.textContainer}>
                <p>{course.Title}</p>
              </div>
              <p
                className={styles.status}
                style={{ "--status-color": "#34A853" }}
              >
                {course.Status}
              </p>
              <button onClick={() => navigate(`/course/${course._id}`)}>
                <span>Go To Course</span>
                <SendIcon sx={{ color: "white", fontSize: "16px" }} />
              </button>
            </div>
          </div>
        ))}
    </div>
  );
};

export default Courses;
