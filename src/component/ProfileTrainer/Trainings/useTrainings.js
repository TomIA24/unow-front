import { useEffect, useState } from "react";
import { request } from "../../../core/api/request";

const useTrainings = () => {
  const [trainings, setTrainings] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    request
      .list("trainings/TrainerTrainings")
      .then((data) => {
        setTrainings(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  return {
    trainings,
    loading
  };
};

export default useTrainings;
