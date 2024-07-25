import React, { useState, useEffect, useRef } from "react";
import styles from "./styles.module.css";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import axios from "axios";
import ProductsSlider from "./ProductsSlider";

const ShowCategory = ({ openCategory, setOpenCategory, categoryData }) => {
  const [courses, setCourses] = useState([]);
  const [trainings, setTrainings] = useState([]);
  const [loadingCourses, setLoadingCourses] = useState(true);
  const [loadingTrainings, setLoadingTrainings] = useState(true);

  useEffect(async () => {
    await handleData();
  }, [openCategory]);

  const handleData = async () => {
    // e.preventDefault();
    const urlTrainings = `${process.env.REACT_APP_API}/api/trainings/specificGroupeFromCategory`;
    axios
      .post(urlTrainings, categoryData.trainings)
      .then(async (res) => {
        setTrainings(res.data.data);
        setLoadingTrainings(false);
      });
    const urlCourses = `${process.env.REACT_APP_API}/api/courses/specificGroupeFromCategory`;
    axios.post(urlCourses, categoryData.courses).then(async (res) => {
      setCourses(res.data.data);
      setLoadingCourses(false);
    });
  };

  // const handleSend = async (e) => {
  //   e.preventDefault();
  //   console.log(Data);
  //   const config = {
  //     headers: {
  //        
  //        
  //        
  //          
  //     },
  //     ,
  //   };
  //   const url = `${process.env.REACT_APP_API}/api/contact/SendRequestTrainer`;
  //   axios.post(url, Data ).then(async (res) => {
  //     setData({
  //       name: "",
  //       surname: "",
  //       email: "",
  //       message: "",
  //       subject: "",
  //     });
  //     setSuccess({ state: true, message: "request sent successfully" });
  //     await new Promise((r) => {
  //       setTimeout(r, 2000);
  //     });

  //     setSuccess({ state: false, message: "" });
  //   });
  // };

  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    borderRadius: 2,
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
  };

  return (
    <Modal
      sx={{ p: 1 }}
      open={openCategory}
      onClose={() => {
        setOpenCategory(false);
      }}
      aria-labelledby="parent-modal-title"
      aria-describedby="parent-modal-description"
    >
      <Box
        sx={{
          ...style,
          width: 1000,
          display: "flex",
          flexDirection: "column",
          overflowY: "auto",
          overflowX: "hidden",
          maxHeight: "85vh",
          alignItems: "center",
        }}
      >
        <h2 className={styles.TitleCategory}>{categoryData.title}</h2>
        <div className={styles.Products_container}>
          <div className={styles.Courses_container}>
            <h1>Trainings</h1>
            <ProductsSlider
              loading={loadingTrainings}
              categoryData={categoryData}
              products={trainings}
              productType="trainings"
            />
          </div>
          <div className={styles.Courses_container}>
            <h1>Courses</h1>
            <ProductsSlider
              loading={loadingCourses}
              categoryData={categoryData}
              products={courses}
              productType="courses"
            />
          </div>
        </div>
      </Box>
    </Modal>
  );
};

export default ShowCategory;
