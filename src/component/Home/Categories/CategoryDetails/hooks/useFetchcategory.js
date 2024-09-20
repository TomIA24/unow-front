import axios from "axios";
import { useEffect, useState } from "react";

const useFetchCategory = (id) => {
  const [category, setCategory] = useState({});

  useEffect(() => {
    const fetchCategory = async () => {
      try {
        const url = `${process.env.REACT_APP_API}api/Category/specific/${id}`;
        const response = await axios.get(url);
        setCategory(response.data.data);
      } catch (err) {
        console.error("Failed to fetch category", err);
      }
    };
    fetchCategory();
  }, [id]);

  return { category };
};

export default useFetchCategory;
