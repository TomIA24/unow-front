import { useState, useEffect } from "react";
import axios from "axios";

const useCard = () => {
  const [data, setData] = useState(null);
  const [card, setCard] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isCoursesLoading, setCoursesLoading] = useState(true);
  const [isTrainingsLoading, setTrainingsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const handleCardContent = async (cardTrainings, cardCourses) => {
    const coursesIds = [...new Set(cardCourses)];
    const trainingsIds = [...new Set(cardTrainings)];
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      const urlTrainings = `${process.env.REACT_APP_API}api/trainings/specificGroupe`;
      await axios
        .post(urlTrainings, { cardIds: trainingsIds }, config)
        .then((res) => {
          setCard({ ...card, trainings: res.data.data });
          setTrainingsLoading(false);
        });
      const urlCourses = `${process.env.REACT_APP_API}api/courses/specificGroupe`;
      await axios
        .post(urlCourses, { cardIds: coursesIds }, config)
        .then((res) => {
          setCard({ ...card, courses: res.data.data });
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
      handleCardContent(
        response.data.data.cardTrainings,
        response.data.data.cardCourses
      );
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
    card,
    loading,
    isCoursesLoading,
    isTrainingsLoading,
  };
};

export default useCard;
