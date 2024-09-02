import { useState, useEffect } from "react";
import axios from "axios";
import { singleFileUpload } from "../../UploadFunctions/data/api";
import { getBase64 } from "../../../shared/image.service";

const useProfile = () => {
  const [data, setData] = useState(null);
  const [card, setCard] = useState([]);
  const [courses, setCourses] = useState([]);
  const [trainings, setTrainings] = useState([]);

  const [loading, setLoading] = useState(true);
  const [isCoursesLoading, setCoursesLoading] = useState(true);
  const [isTrainingsLoading, setTrainingsLoading] = useState(true);

  const [prev, setPrev] = useState(null);
  const [profileState, setProfileState] = useState(0);

  const [singleFile, setSingleFile] = useState("");
  const [singleProgress, setSingleProgress] = useState(0);

  const token = localStorage.getItem("token");

  const handleCardCourses = async (coursesPaid) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      const url = `${process.env.REACT_APP_API}api/courses/specificGroupe`;
      await axios
        .post(url, { cardIds: coursesPaid }, config)
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

  const handleCardTrainings = async (trainingsPaid) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      const url = `${process.env.REACT_APP_API}api/trainings/specificGroupe`;
      await axios
        .post(url, { cardIds: trainingsPaid }, config)
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

  const handleCardContent = async (cardTrainings, cardCourses) => {
    const coursesIds = [...new Set(cardCourses)];
    const trainingsIds = [...new Set(cardTrainings)];
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      const url = `${process.env.REACT_APP_API}api/trainings/specificGroupe`;
      await axios.post(url, { cardIds: trainingsIds }, config).then((res) => {
        setCard({ ...card, trainings: res.data.data });
        setTrainingsLoading(false);
      });
      const urlCourses = `${process.env.REACT_APP_API}api/courses/specificGroupe`;
      await axios
        .post(urlCourses, { cardIds: coursesIds }, config)
        .then((res) => {
          setCard({ ...card, courses: res.data.data });
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
      handleCardCourses(response.data.data.CoursesPaid);
      handleCardTrainings(response.data.data.TrainingsPaid);
      handleCardContent(
        response.data.data.cardTrainings,
        response.data.data.cardCourses
      );
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setLoading(false);
    }
  };

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
    getBase64(e.target.files[0]).then((data) => {
      setPrev(data);
    });
  };

  const handleBtn = (btn) => {
    setProfileState(btn);
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    if (singleFile !== "" && singleFile !== null && singleFile !== undefined) {
      formData.append("file", singleFile);
      await singleFileUpload(formData, data._id);

      window.location.reload(true);
    }
  };

  useEffect(() => {
    uploadSingleFile();
  }, [singleFile]);

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    prev,
    singleFile,
    singleProgress,
    handleBtn,
    profileState,
    data,
    card,
    courses,
    trainings,
    loading,
    isCoursesLoading,
    isTrainingsLoading,
    SingleFileChange,
  };
};

export default useProfile;
