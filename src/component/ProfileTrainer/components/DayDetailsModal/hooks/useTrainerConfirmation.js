import { format } from "date-fns";
import { useState } from "react";
import { request } from "../../../../../core/api/request";

const useTrainerConfirmation = (selectedDay, onClose, setCalendarEvents) => {
  const [openPropose, setOpenPropose] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    unavailableDays: true,
    unavailableDate: true,
    alternativeDate: "",
    unsuitableElements: false,
    notInterested: false,
    comment: "",
    updateAvailability: false,
  });

  const handleChange = (e) => {
    const { name, type, value, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    let comment = [];
    if (formData.unavailableDate) {
      comment.push("One or more of the following elements do not suit me");
    }

    if (formData.notInterested) {
      comment.push(
        "I do not wish to take on this assignment. However, I remain open to other proposals on these dates"
      );
    }

    if (formData.comment) {
      comment.push(formData.comment);
    }

    const eventData = {
      type: "unavailability",
      title: "_",
      color: "#E2E0F6",
      startDate: format(selectedDay, "yyyy-MM-dd"),
      endDate: format(selectedDay, "yyyy-MM-dd"),
      reason: formData.reason,
      unavailabilityDetails: {
        comment: comment.join(", "),
        alternativeDates: formData.alternativeDate,
      },
      updateAvailability: formData.updateAvailability,
    };

    setLoading(true);
    request
      .create("calendarEvents", eventData)
      .then(() => {
        setFormData({
          unavailableDays: true,
          unavailableDate: true,
          alternativeDate: "",
          unsuitableElements: false,
          notInterested: false,
          comment: "",
          updateAvailability: false,
        });
        onClose();

        request
          .list("calendarEvents")
          .then((data) => setCalendarEvents(data.data));
      })
      .finally(() => setLoading(false));
  };

  return {
    openPropose,
    setOpenPropose,
    loading,
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useTrainerConfirmation;
