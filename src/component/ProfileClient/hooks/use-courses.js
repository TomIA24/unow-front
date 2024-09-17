import { useState, useEffect } from "react";
import axios from "axios";

const useCourses = () => {
  const [data, setData] = useState(null);
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isCoursesLoading, setCoursesLoading] = useState(true);

  const token = localStorage.getItem("token");

  const handleCardCourses = async (coursesPaid) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      const url = `${process.env.REACT_APP_API}api/courses/specificGroupe`;
      await axios
        .post(url, { cartIds: coursesPaid }, config)
        .then(async (res) => {
          console.log("response: ", res.data.data);
          setCourses(res.data.data);
          setCoursesLoading(false);
        });
    } catch (error) {
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status <= 500
      ) {
      }
    }
  };
  const handleCourse = (id) => {
    window.location = `/course/${id}`;
  };

  const fetchUserData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };
      const urlUserData = `${process.env.REACT_APP_API}api/userData`;
      const response = await axios.get(urlUserData, config);
      localStorage.setItem("user", JSON.stringify(response.data.data));
      console.log("data: ", data);
      setData(response.data.data);
      setLoading(false);
      handleCardCourses(response.data.data.CoursesPaid);
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    data,
    courses,
    loading,
    isCoursesLoading,
    handleCourse,
  };
};

export default useCourses;
