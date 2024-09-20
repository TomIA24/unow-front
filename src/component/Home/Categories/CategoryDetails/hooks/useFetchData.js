import axios from "axios";
import { useEffect, useState } from "react";

const useFetchData = (type, id, currentPage) => {
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      const url = `${process.env.REACT_APP_API}api/Category/specificGroupeFromCategory/${id}?type=${type}&page=${currentPage}&limit=10`;
      try {
        const response = await axios.get(url);
        setData(response.data.data);
        setTotalPages(response.data.total);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [type, id, currentPage]);

  return { data, totalPages, loading };
};

export default useFetchData;
