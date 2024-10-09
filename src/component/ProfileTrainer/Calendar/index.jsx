import { format, getDay, isEqual, isSameMonth, isToday } from "date-fns";
import { useState } from "react";
import {
  getMeetingClasses,
  getMeetingColor,
  getMettingTitleCurrentDay,
  relevantMeetings,
} from "../../../shared/calendarUtils";
import Loading from "../../Loading/index";
import DayDetailsModal from "../components/DayDetailsModal";
import OnNavigate from "../components/OnNavigate";
import "./styles.css";
import { useCalendar } from "./useCalendar";

const buttons = [
  { label: "Confirmed", color: "#D9EAD0" },
  { label: "Unconfirmed", color: "#ffecf1" },
  { label: "Holidays", color: "#DAF1FC" },
  { label: "Unavailability", color: "#E2E0F6" },
];

export default function Calendar() {
  const {
    selectedDay,
    setSelectedDay,
    firstDayCurrentMonth,
    days,
    previousMonth,
    nextMonth,
    previousYear,
    nextYear,
    calendarEvents,
    setCalendarEvents,
    loading,
  } = useCalendar();
  const [open, setOpen] = useState({ isOpen: false, isFreeDay: true });
  const [trainingTitle, setTrainingTitle] = useState("");

  const onClose = () => {
    setOpen({ isOpen: false, isFreeDay: true });
  };

  const handleModalOpen = (calendarEvents, day) => {
    setOpen({
      isOpen: true,
      isFreeDay: relevantMeetings(calendarEvents, day),
    });
    setTrainingTitle(getMettingTitleCurrentDay(day, calendarEvents));
    setSelectedDay(day);
  };

  if (loading) return <Loading h="55vh" />;

  return (
    <div className="example-container">
      <div className="calendar">
        <div className="header">
          <div className="header-container">
            <OnNavigate
              onPrevious={previousMonth}
              onNext={nextMonth}
              currentDate={format(firstDayCurrentMonth, "MMMM")}
            />
            <OnNavigate
              onPrevious={previousYear}
              onNext={nextYear}
              currentDate={format(firstDayCurrentMonth, "yyyy")}
            />
          </div>

          <div className="header-buttons">
            {buttons.map((button, index) => (
              <button key={index} style={{ "--button-color": button.color }}>
                <span>{button.label}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="days">
          {days?.map((day) => (
            <div
              key={day.toString()}
              style={{
                background: getMeetingColor(day, calendarEvents),
              }}
              className={`day day-${getDay(day)} ${getMeetingClasses(
                day,
                calendarEvents
              )}`}
            >
              <button
                type="button"
                onClick={() => handleModalOpen(calendarEvents, day)}
                className={`day-button ${
                  isEqual(day, selectedDay) && "selected"
                }  ${isToday(day) ? "today" : ""} ${
                  !isEqual(day, selectedDay) &&
                  !isToday(day) &&
                  !isSameMonth(day, firstDayCurrentMonth) &&
                  "not-in-month"
                }`}
              >
                <time dateTime={format(day, "yyyy-MM-dd")}>
                  {format(day, "d")}
                </time>
              </button>
              <div className="dot-container">
                {!isSameMonth(day, firstDayCurrentMonth) && (
                  <div className="dot"></div>
                )}
              </div>
              <p className="day-title">
                {getMettingTitleCurrentDay(day, calendarEvents)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <DayDetailsModal
        open={open}
        onClose={onClose}
        selectedDay={selectedDay}
        trainingTitle={trainingTitle}
        setCalendarEvents={setCalendarEvents}
      />
    </div>
  );
}
