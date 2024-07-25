import styles from "./styles.module.css";
import React, { useRef, useEffect, useState } from "react";
import { ThemeProvider, useTheme } from "@mui/material/styles";
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
import Skeleton from "@mui/material/Skeleton";
import Avatar from "@mui/material/Avatar";
import AvatarGroup from "@mui/material/AvatarGroup";
import avatar1 from "../../../assets/avatar1.jpg";
import avatar2 from "../../../assets/avatar2.jpg";
import avatar3 from "../../../assets/avatar3.jpg";
import { motion } from "framer-motion";
import StarIcon from "@mui/icons-material/Star";
import CardMedia from "@mui/material/CardMedia";
import { Link } from "react-router-dom";

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
function ProductsSlider({ products, categoryData, loading, productType }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));

  const [maxSteps, setMaxSteps] = React.useState(
    splitListIntoSublists(products, 2).length
  );
  console.log("products: ", products);
  console.log(splitListIntoSublists(products, 2));
  const productsOrganized = splitListIntoSublists(products, 2);

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

  const TextRating = (value, avis) => {
    return (
      <ThemeProvider theme={theme}>
        <Box
          sx={{
            width: 200,
            display: "flex",
            alignItems: "center",
          }}
        >
          <StarIcon
            color="ochre"
            style={{ opacity: 0.55 }}
            fontSize="inherit"
          />

          <div className={styles.rating_text}>
            <p>({value > 0 ? value : 0})</p>
            <p>({avis})</p>
          </div>
        </Box>
      </ThemeProvider>
    );
  };

  return (
    <React.Fragment>
      {productsOrganized.length > 0 ? (
        <div className={styles.slide_container}>
          {" "}
          {!loading ? (
            <React.Fragment>
              <AutoPlaySwipeableViews
                interval={10000}
                axis={theme.direction === "rtl" ? "x-reverse" : "x"}
                index={activeStep}
                onChangeIndex={handleStepChange}
                enableMouseEvents
              >
                {productsOrganized.map((step, index) => (
                  <Box key={index + Math.random()}>
                    <div className={styles.step_cats_container}>
                      {step.map((element) => {
                        return (
                          <Link
                            to={
                              productType == "trainings"
                                ? { pathname: `/Training/${element._id}` }
                                : { pathname: `/Course/${element._id}` }
                            }
                            onClick={() => {
                              user &&
                                (user.lastSeen = [
                                  ...user.lastSeen,
                                  element._id,
                                ]);
                              localStorage.setItem(
                                "user",
                                JSON.stringify(user)
                              );
                              window.scrollTo(0, 0);
                            }}
                          >
                            <motion.div className={styles.topTrainingElement}>
                              {element.Thumbnail ? (
                                <CardMedia
                                  component="img"
                                  src={`${process.env.REACT_APP_API}/${element.Thumbnail.filePath}`}
                                  alt=""
                                  className={styles.imgTop}
                                />
                              ) : (
                                <CardMedia
                                  component="img"
                                  src={`${process.env.REACT_APP_API}/uploads/courseImg.png`}
                                  alt=""
                                  className={styles.imgTop}
                                />
                              )}

                              <div className={styles.infoCourse}>
                                <div className={styles.card_header}>
                                  <div
                                    style={{
                                      backgroundColor: categoryData.color,

                                      // category.color,
                                    }}
                                    className={styles.category_tag}
                                  >
                                    <p className={styles.category}>
                                      {element.Category}
                                    </p>
                                  </div>
                                  <Typography className={styles.card_price}>
                                    {element.Price} $
                                  </Typography>
                                </div>
                                <Typography className={styles.cardLevel}>
                                  {element.Level}
                                </Typography>
                                <Typography
                                  onClick={() => {
                                    window.location = `/Course/${element._id}`;
                                  }}
                                  className={styles.cardTitle}
                                  noWrap
                                >
                                  {element.Title}
                                </Typography>

                                <div className={styles.card_footer}>
                                  {TextRating(
                                    element.rating,
                                    element.evaluate.length
                                  )}

                                  <div
                                    className={styles.card_footer_subscribers}
                                  >
                                    <AvatarGroup>
                                      <Avatar
                                        alt="user1"
                                        src={avatar1}
                                        sx={{ width: 10, height: 10 }}
                                      />
                                      <Avatar
                                        alt="user2"
                                        src={avatar2}
                                        sx={{ width: 10, height: 10 }}
                                      />
                                      <Avatar
                                        alt="user3"
                                        src={avatar3}
                                        sx={{ width: 10, height: 10 }}
                                      />
                                    </AvatarGroup>
                                    <p className={styles.subscribers_text}>
                                      3k+
                                    </p>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          </Link>
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
            <Skeleton variant="rectangular" width={210} height={118} />
          )}
        </div>
      ) : (
        <p>No {productType} available in this category</p>
      )}
    </React.Fragment>
  );
}

export default ProductsSlider;
