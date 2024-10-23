import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ConfirmedTraining from "./confirmedTraining";
import StandardTraining from "./standard";

const Training = () => {
  let { id } = useParams();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const [trainerConfirmed, setTrainerConfirmed] = useState(false);

  useEffect(() => {
    if (token) {
      if (user.userType === "Trainer") {
        if (user.Trainings.includes(id)) {
          setTrainerConfirmed(true);
        }
      }
    }
  }, [user]);

  return (
    <React.Fragment>
      <React.Fragment>
        {trainerConfirmed ? <ConfirmedTraining /> : <StandardTraining />}
      </React.Fragment>
    </React.Fragment>
  );
};

export default Training;
