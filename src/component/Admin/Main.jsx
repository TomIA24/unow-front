//import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import AddCourse from "./AddCourse"
import AddTraining from "./AddTraining";
import AddTrainer from "./AddTrainer";
import ShowCourses from "./ShowCourses";
import ShowTrainings from "./ShowTrainings";
import ShowTrainers from "./ShowTrainers";
import ShowCandidats from "./ShowClients";
import Category from "./Category";
import Dashboard from "./Dashboard";

import { Link, Route, Routes, Navigate, BrowserRouter } from "react-router-dom";
import axios from "axios";

const Main = ({
  dashboard,
  addTrainer,
  addCourse,
  showCandidats,
  showTrainers,
  showCourses,
  setShowCandidats,
  addTraining,
  showTrainings,
  showCategories,
}) => {
  return (
    <>
      {dashboard ? <Dashboard /> : null}
      {addCourse ? <AddCourse /> : null}
      {showCourses ? <ShowCourses /> : null}
      {addTraining ? <AddTraining /> : null}
      {showTrainings ? <ShowTrainings /> : null}
      {addTrainer ? <AddTrainer /> : null}
      {showTrainers ? <ShowTrainers /> : null}
      {showCategories ? <Category /> : null}

      {showCandidats ? (
        <ShowCandidats setShowCandidats={setShowCandidats} />
      ) : null}
    </>
  );
};

export default Main;