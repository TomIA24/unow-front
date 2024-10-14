import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { request } from "../../../core/api/request";
import countryList from "../../res/countries";
import { singleFileUpload } from "../../UploadFunctions/data/api";

const useForm = () => {
  const navigate = useNavigate();
  const [img, setImg] = useState("svg/default-img.svg");
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    subname: "",
    userName: "",
    phone: "",
    address: "",
    description: "",
    animationLanguage: [""],
    country: "",
    connectingMetropolis: [""],
    monthlyBandwidth: "",
    RCS: "",
    SIRET: "",
    socialReason: ""
  });

  useEffect(() => {
    request.read("userData").then((data) => {
      setFormData({
        _id: data.data._id,
        image: data.data.image,
        name: data.data.name,
        subname: data.data.subname,
        userName: data.data.userName,
        phone: data.data.phone,
        address: data.data.address,
        description: data.data.description,
        programs: data.data.programs,
        animationLanguage: data.data.animationLanguage || [],
        country: data.data.country,
        connectingMetropolis: data.data.connectingMetropolis,
        monthlyBandwidth: data.data.monthlyBandwidth,
        RCS: data.data.RCS,
        SIRET: data.data.SIRET,
        socialReason: data.data.socialReason
      });

      if (data?.data?.image?.filePath) {
        setImg(`${process.env.REACT_APP_API}${data.data.image.filePath}`);
      }
    });
  }, []);

  const countryListValue = useMemo(() => {
    return countryList.map((country) => country.name);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.programs.length === 0) {
      toast.error("Please add at least one program");
      return;
    }

    request.update("Trainer/complete", "", {
      ...formData,
      firstConnection: false
    });

    const formDataProfilePicture = new FormData();
    formDataProfilePicture.append("file", img);

    try {
      await singleFileUpload(formDataProfilePicture, formData._id);
    } catch (error) {
      toast.error("Error uploading profile picture");
    } finally {
      navigate("/profile");
    }
  };
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleAnimationLanguageChange = (newValues) => {
    setFormData((prevData) => ({
      ...prevData,
      animationLanguage: newValues
    }));
  };

  const handleConnectingMetropolisChange = (newValues) => {
    setFormData((prevData) => ({
      ...prevData,
      connectingMetropolis: newValues
    }));
  };

  const handleSingleFileChange = (e) => setImg(e.target.files[0]);

  return {
    formData,
    setFormData,
    countryListValue,
    img,
    handleSubmit,
    handleChange,
    handleAnimationLanguageChange,
    handleConnectingMetropolisChange,
    handleSingleFileChange
  };
};

export default useForm;
