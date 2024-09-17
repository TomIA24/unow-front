import { useState, useEffect } from "react";
import axios from "axios";

const useTrainings = () => {
  const [data, setData] = useState(null);
  const [trainings, setTrainings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isTrainingsLoading, setTrainingsLoading] = useState(true);

  const token = localStorage.getItem("token");
  const handleTraining = (id) => {
    window.location = `/training/${id}`;
  };
  const handleCardTrainings = async (trainingsPaid) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      const url = `${process.env.REACT_APP_API}api/trainings/specificGroupe`;
      await axios
        .post(url, { cartIds: trainingsPaid }, config)
        .then(async (res) => {
          console.log("response: ", res.data.data);
          setTrainings(res.data.data);
          setTrainingsLoading(false);
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
      handleCardTrainings(response.data.data.TrainingsPaid);
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
    trainings,
    loading,
    isTrainingsLoading,
    handleTraining,
  };
};

export default useTrainings;
