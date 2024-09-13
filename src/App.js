import React, { useState } from "react";

import Personalize from "./component/Personalize";
import Login from "./component/Login";
import ResetPassword from "./component/ResetPassword";
import SignUp from "./component/SignUp";
import Room from "./component/Room";
import Course from "./component/Course";
import Contact from "./component/Contact";
import Training from "./component/Training";
import CompleteInfo from "./component/CompleteInfo";
import ProfileClient from "./component/ProfileClient";
import ProfileTrainer from "./component/ProfileTrainer";
import Admin from "./component/Admin";
import Videos from "./component/Course/paid/Ressources/Videos";
import { Accept, Refuse } from "./component/Payment";

import { Route, Routes } from "react-router-dom";
import MissingRoute from "./secure/MissingRoute";

import { LanguageProvider } from "./hooks/LanguageContext";
import HomeInterface from "./component/Home/HomeInterface";
import MainQuiz from "./component/Quiz";

import Quiz from "./component/Quiz/Questions";
import CategoryDetails from "./component/Home/Categories/CategoryDetails";
import CoursesSection from "./component/CoursesSection";

import Timeout from "./component/Quiz/Questions/timeout";
import { QuizProvider } from "./hooks/QuizContext";

function App() {
  const [startDate, setStartDate] = useState(null);
    localStorage.setItem("navState", 1);

  const handleStartQuiz = () => {
    const now = new Date();
    setStartDate(now.toLocaleString());
    console.log("start time", startDate);
  };

  var user = "";
  if (localStorage.getItem("user") != null) {
    user = JSON.parse(localStorage.getItem("user"));
  }

  return (
    <LanguageProvider>
      <QuizProvider>
        <div className="App">
          <Routes>
            {!user && (
              <React.Fragment>
                <Route exact path="/" element={<HomeInterface />} />
              </React.Fragment>
            )}
            <Route exact path="/personalize" element={<Personalize />} />
            <Route path="*" element={<MissingRoute />} />
            <Route exact path="/home" element={<HomeInterface />} />

            <Route
              exact
              path="/question"
              element={<Quiz startDate={startDate} />}
            />
            <Route
              exact
              path="/quiz"
              element={<MainQuiz onStartQuiz={handleStartQuiz} />}
            />
            <Route exact path="/timeout" element={<Timeout />} />

            <Route exact path="/login" element={<Login />} />
            <Route exact path="/ResetPassword" element={<ResetPassword />} />
            <Route exact path="/signup" element={<SignUp />} />
            <Route exact path="/Contact" element={<Contact />} />
            <Route exact path="/successPayment/:id" element={<Accept />} />
            <Route exact path="/cancelPayment" element={<Refuse />} />

            <Route exact path="/Course/:id" element={<Course />} />
            <Route exact path="/Course/:id/Videos" element={<Videos />} />
            <Route exact path="/Training/:id" element={<Training />} />
            {/* <Route exact path="/Course/Ressources/:id" element={<CourseRessources/>} /> */}
            <Route
              exact
              path="/Training/Ressources/:id"
              element={<Training />}
            />
            <Route exact path="/completeInfo" element={<CompleteInfo />} />
            <Route exact path="/room/:url" element={<Room />} />
            <Route
              exact
              path="/categoryCourses/:id"
              element={<CategoryDetails />}
            />

            {user.userType === "Admin" && (
              <Route exact path="/admin" element={<Admin />} />
            )}

            {user.userType === "Trainer" && (
              <Route exact path="/profile" element={<ProfileTrainer />} />
            )}
            {user.userType === "Student" && (
              <Route
                exact
                path="/candidate/profile"
                element={<ProfileClient />}
              />
            )}
          </Routes>
        </div>
      </QuizProvider>
    </LanguageProvider>
  );
}

export default App;
