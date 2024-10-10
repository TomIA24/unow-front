import { isAfter, isBefore, isToday, parseISO } from "date-fns";
import { useState } from "react";
import { toast } from "react-hot-toast";
import { request } from "../../../../../core/api/request";

const useUnavailability = (selectedDay, onClose, setCalendarEvents) => {
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    isUnavailable: true,
    startDate: selectedDay || "",
    endDate: "",
    reason: "",
    isFirmUnavailable: false,
    comment: "",
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const currentDate = new Date();
    const startDate = parseISO(formData.startDate);
    const endDate = parseISO(formData.endDate);

    if (isBefore(startDate, currentDate) && !isToday(startDate)) {
      toast.error("Start date cannot be in the past.");
      return;
    }

    if (isAfter(startDate, endDate)) {
      toast.error("Start date cannot be after the end date.");
      return;
    }

    if (!formData.reason) {
      toast.error("Please provide a reason for your unavailability.");
      return;
    }

    const eventData = {
      type: "unavailability",
      title: "_",
      color: "#E2E0F6",
      startDate: formData.startDate,
      endDate: formData.endDate ? formData.endDate : formData.startDate,
      reason: formData.reason,
      unavailabilityDetails: {
        isFirmUnavailable: formData.isFirmUnavailable,
        comment: formData.comment,
      },
    };

    setLoading(true);
    request
      .create("calendarEvents", eventData)
      .then((data) => {
        setFormData({
          isUnavailable: true,
          startDate: selectedDay || "",
          endDate: "",
          reason: "",
          isFirmUnavailable: false,
          comment: "",
        });
        onClose();
        setCalendarEvents((prevEvents) => [...prevEvents, data.calendarEvent]);
      })
      .finally(() => setLoading(false));
  };

  return {
    formData,
    loading,
    handleChange,
    handleSubmit,
  };
};

export default useUnavailability;
