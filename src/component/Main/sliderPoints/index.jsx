import styles from "./styles.module.css";
import React, { useRef, useEffect, useState } from "react";
import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MobileStepper from "@mui/material/MobileStepper";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import KeyboardArrowLeft from "@mui/icons-material/KeyboardArrowLeft";
import KeyboardArrowRight from "@mui/icons-material/KeyboardArrowRight";
import SwipeableViews from "react-swipeable-views";
import { autoPlay } from "react-swipeable-views-utils";
import axios from "axios";
import { Skeleton } from "@mui/material";
import imgCat from "../../assets/catImg.jpg";
import ShowCategory from "../ShowCategory";

const AutoPlaySwipeableViews = autoPlay(SwipeableViews);

// const images = [
//   {
//     label: "San Francisco – Oakland Bay Bridge, United States",
//     imgPath:
//       "https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
//   },
//   {
//     label: "Bird",
//     imgPath:
//       "https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
//   },
//   {
//     label: "Bali, Indonesia",
//     imgPath:
//       "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
//   },
//   {
//     label: "Goč, Serbia",
//     imgPath:
//       "https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
//   },
// ];

function splitListIntoSublists(list, n) {
  const sublists = [];

  for (let i = 0; i < list.length; i += n) {
    sublists.push(list.slice(i, i + n));
  }

  return sublists;
}
function divideAndAddOneIfNeeded(x, y) {
  const result = x / y;
  if (result % 1 !== 0) {
    return Math.floor(result) + 1;
  } else {
    return result;
  }
}
function CategorySlider() {
  const token = localStorage.getItem("token");

  const [categoriesFromBd, setCategoriesFromBd] = useState([]);
  const [maxSteps, setMaxSteps] = React.useState(0);

  const HandleCategories = async () => {
    await axios
      .get(`${process.env.REACT_APP_API}/api/Category/getCategories`)
      .then(async (res) => {
        console.log(res.data.data);
        setCategoriesFromBd(res.data.data);
        setMaxSteps(divideAndAddOneIfNeeded(res.data.data.length, 6));
      });
  };
  useEffect(async () => {
    await HandleCategories();
  }, []);
  const categories = splitListIntoSublists(
    categoriesFromBd.map((c) => {
      return {
        id: c._id,
        title: c.Title,
        courses: c.Courses ? c.Courses.length : 0,
        trainings: c.Trainings ? c.Trainings.length : 0,
        coursesIds: c.Courses ? c.Courses : [],
        trainingsIds: c.Trainings ? c.Trainings : [],
        color: c.color,
      };
    }),
    6
  );

  const theme = useTheme();
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const [openCategory, setOpenCategory] = useState(false);
  const [categorySelected, setCategorySelected] = useState("");

  const handleCategory = (category) => {
    console.log(category.coursesIds);
    console.log(category.trainingsIds);
    setCategorySelected({
      id: category._id,
      title: category.title,
      courses: Array.from(category.coursesIds),
      trainings: Array.from(category.trainingsIds),
      color: category.color,
    });
    setOpenCategory(true);
  };
 

  return (
    <div className={styles.slide_container}>
      {" "}
      {categories.length > 0 ? (
        <React.Fragment>
          <AutoPlaySwipeableViews
            interval={10000}
            axis={theme.direction === "rtl" ? "x-reverse" : "x"}
            index={activeStep}
            onChangeIndex={handleStepChange}
            enableMouseEvents
          >
            {categories.map((step, index) => (
              <Box key={index + Math.random()}>
                <div className={styles.step_cats_container}>
                  {step.map((category) => {
                    return (
                      <div
                        onClick={() => handleCategory(category)}
                        className={styles.category_container}
                      >
                        <div className={styles.category_img}>
                          <img src={imgCat} alt="" />
                        </div>
                        <div className={styles.category_decription}>
                          <Typography
                            className={styles.category_decription_title}
                            noWrap
                          >
                            <p>
                              <Typography noWrap>{category.title}</Typography>
                            </p>
                            <div
                              style={{
                                // backgroundColor: category.color,
                                // height: "2px",
                                width: "80%",
                                borderStyle: "solid",
                                borderWidth: "1px",
                                borderColor: category.color,
                                borderRadius: "10px",
                              }}
                            />
                          </Typography>

                          <p
                            className={`${styles.category_decription_stats} ${styles.category_decription_txt_gen}`}
                          >
                            courses :{" "}
                            {category.courses == undefined
                              ? 0
                              : category.courses}{" "}
                          </p>
                          <p
                            className={`${styles.category_decription_stats} ${styles.category_decription_txt_gen}`}
                          >
                            trainings : {category.trainings}
                          </p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </Box>
            ))}
          </AutoPlaySwipeableViews>
          <MobileStepper
            className={styles.stepper_container}
            steps={maxSteps}
            position="static"
            activeStep={activeStep}
            sx={{
              backgroundColor: "#F0F6FD",
            }}
            nextButton={
              <Button
                size="small"
                onClick={handleNext}
                disabled={activeStep === maxSteps - 1}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowLeft />
                ) : (
                  <KeyboardArrowRight />
                )}
              </Button>
            }
            backButton={
              <Button
                size="small"
                onClick={handleBack}
                disabled={activeStep === 0}
              >
                {theme.direction === "rtl" ? (
                  <KeyboardArrowRight />
                ) : (
                  <KeyboardArrowLeft />
                )}
              </Button>
            }
          />
        </React.Fragment>
      ) : (
        <Skeleton variant="text" sx={{ fontSize: "1rem" }} />
      )}
      <ShowCategory
        openCategory={openCategory}
        setOpenCategory={setOpenCategory}
        categoryData={categorySelected}
      />
    </div>
  );
}
 
export default CategorySlider;
