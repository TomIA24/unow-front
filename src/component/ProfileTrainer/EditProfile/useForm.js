import { useEffect, useMemo, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { request } from "../../../core/api/request";
import countryList from "../../res/countries";

const useForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    image: "",
    name: "",
    surname: "",
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
    socialReason: "",
  });

  useEffect(() => {
    request.read("userData").then((data) => {
      setFormData({
        image: data.data.image,
        name: data.data.name,
        surname: data.data.surname,
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
        socialReason: data.data.socialReason,
      });
    });
  }, []);

  const countryListValue = useMemo(() => {
    return countryList.map((country) => country.name);
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (formData.programs.length === 0) {
      toast.error("Please add at least one program");
      return;
    }

    request
      .update("Trainer/complete", "", {
        ...formData,
        firstConnection: false,
      })
      .then(() => navigate("/profile"));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAnimationLanguageChange = (newValues) => {
    setFormData((prevData) => ({
      ...prevData,
      animationLanguage: newValues,
    }));
  };

  const handleConnectingMetropolisChange = (newValues) => {
    setFormData((prevData) => ({
      ...prevData,
      connectingMetropolis: newValues,
    }));
  };

  return {
    formData,
    setFormData,
    countryListValue,
    handleSubmit,
    handleChange,
    handleAnimationLanguageChange,
    handleConnectingMetropolisChange,
  };
};

export default useForm;
