import { useState, useEffect } from "react";
import axios from "axios";

const useCart = () => {
  const [data, setData] = useState(null);
  const [cart, setCart] = useState();

  const [loading, setLoading] = useState(true);
  const [isCoursesLoading, setCoursesLoading] = useState(true);
  const [isTrainingsLoading, setTrainingsLoading] = useState(true);

  const token = localStorage.getItem("token");

  const handleCartCourses = async (  cartCourses) => {
    try {
      const coursesIds = [...new Set(cartCourses)]; 
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

       
          const urlCourses = `${process.env.REACT_APP_API}api/courses/specificGroupe`;
          await axios
            .post(urlCourses, { cartIds: coursesIds }, config)
            .then(async (res) => {
              setCart({ ...cart, courses: res.data.data });
              setCoursesLoading(false);
              console.log("cart update courses: ", res.data.data);
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
  const handleCartTrainings = async (cartTrainings ) => {
    try { 
      const trainingsIds = [...new Set(cartTrainings)];
      const config = {
        headers: { authorization: `Bearer ${token}` },
      };

      const urlTrainings = `${process.env.REACT_APP_API}api/trainings/specificGroupe`;
      await axios
        .post(urlTrainings, { cartIds: trainingsIds }, config)
        .then(async (res) => {
          setCart({ ...cart, trainings: res.data.data });
          setTrainingsLoading(false);
          console.log("cart update trainings: ", res.data.data);
           
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

  const handleTraining = (id) => {
    window.location = `/training/${id}`;
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
      await handleCartCourses(response.data.data.cartCourses)
      await handleCartTrainings(response.data.data.cartTrainings)
        
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setLoading(false);
    }
  };
  const handleBuySTRIPE = async (courseId) => {
    const config = {
      headers: { authorization: `Bearer ${token}` },
    };
    try {
      const url = `${process.env.REACT_APP_API}api/payment/course`;
      await axios.post(url, { courseId: courseId }, config).then((res) => {
        window.location = res.data.url;
      });
    } catch (error) {
      throw new Error(error);
    }
  };
  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    data,
    cart,
    loading,
    isCoursesLoading,
    isTrainingsLoading,
    handleCourse,
    handleTraining,
    handleBuySTRIPE,
  };
};

export default useCart;
