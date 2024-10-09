import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { request } from "../../../core/api/request";

const useCourses = () => {
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

  return {
    navigate,
    courses,
    loading,
    handleDelete,
  };
};

export default useCourses;
