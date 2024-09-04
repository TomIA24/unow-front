import { useState, useEffect } from "react";
import axios from "axios";
import { singleFileUpload } from "../../UploadFunctions/data/api";
import { getBase64 } from "../../../shared/image.service";

const useProfile = () => {
  const [data, setData] = useState(null);
 

  const [loading, setLoading] = useState(true);

  const [prev, setPrev] = useState(null);
  const [profileState, setProfileState] = useState(0);

  const [singleFile, setSingleFile] = useState("");

  const token = localStorage.getItem("token");

  const fetchUserData = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const urlUserData = `${process.env.REACT_APP_API}api/userData`;
      const response = await axios.get(urlUserData, config);

      localStorage.setItem("user", JSON.stringify(response.data.data));
      console.log("data: ", data);
      setData(response.data.data);
      setLoading(false);
    } catch (err) {
      console.error("Failed to fetch user data", err);
      setLoading(false);
    }
  };

  const SingleFileChange = (e) => {
    setSingleFile(e.target.files[0]);
    getBase64(e.target.files[0]).then((data) => {
      setPrev(data);
    });
  };

  const handleBtn = (btn) => {
    setProfileState(btn);
  };

  const uploadSingleFile = async () => {
    const formData = new FormData();
    if (singleFile !== "" && singleFile !== null && singleFile !== undefined) {
      formData.append("file", singleFile);
      await singleFileUpload(formData, data._id);

      window.location.reload(true);
    }
  };

  useEffect(() => {
    uploadSingleFile();
  }, [singleFile]);

  useEffect(() => {
    fetchUserData();
  }, []);

  return {
    prev,
    singleFile,
    handleBtn,
    profileState,
    data,
    loading,
    SingleFileChange,
  };
};

export default useProfile;
