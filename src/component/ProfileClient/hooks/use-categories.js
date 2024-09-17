import axios from "axios";
import { useEffect, useState } from "react";

const useCategories = (categoryTitle) => {
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const config = {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        };

        const urlUserData = `${process.env.REACT_APP_API}api/Category/getCategories`;
        const response = await axios.get(urlUserData, config);
        console.log(response.data.data);
        setCategories(response.data.data);
      } catch (err) {
        console.error("Failed to fetch categories", err);
      }
    };
    fetchCategories();
  }, [token]);

  useEffect(() => {
    if (categories?.length > 0)
      setCategory(categories.filter((obj) => obj.Title === categoryTitle)[0]);
  }, [categories, categoryTitle]);

  return {
    category,
  };
};

export default useCategories;
