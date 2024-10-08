import { format, getDay, isEqual, isSameMonth, isToday } from "date-fns";
import { useState } from "react";
import {
  getMeetingClasses,
  getMeetingColor,
  getMettingTitleCurrentDay,
} from "../../../shared/calendarUtils";
import DayDetailsModal from "../components/DayDetailsModal";
import OnNavigate from "../components/OnNavigate";
import "./styles.css"; // Import the CSS file
import { useCalendar } from "./useCalendar";

const meetings = [
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-09-27T09:48",
    endDatetime: "2024-09-28T11:48",
    title: "Call with community members",
    color: "#ffecf1",
  },
  {
    id: 1,
    name: "Leslie Alexander",
    imageUrl:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-09-22T09:48",
    endDatetime: "2024-09-24T11:48",
    title: "Call with community members",
    color: "#E2E0F6",
  },
  {
    id: 2,
    name: "Michael Foster",
    imageUrl:
      "https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    startDatetime: "2024-09-29T09:48",
    endDatetime: "2024-09-29T11:48",
    title: "Meeting with design team",
    color: "#D9EAD0",
  },
];

const buttons = [
  { label: "Confirmed", color: "#D9EAD0" },
  { label: "Unconfirmed", color: "#ffecf1" },
  { label: "Holidays", color: "#DAF1FC" },
  { label: "Availability", color: "#E2E0F6" },
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
  } = useCalendar(meetings);
  const [open, setOpen] = useState(false);

  const onClose = () => {
    setOpen(false);
  };

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
                background: getMeetingColor(day, meetings),
              }}
              className={`day day-${getDay(day)} ${getMeetingClasses(
                day,
                meetings
              )}`}
              onClick={() => setOpen(true)}
            >
              <button
                type="button"
                onClick={() => setSelectedDay(day)}
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
                {getMettingTitleCurrentDay(day, meetings)}
              </p>
            </div>
          ))}
        </div>
      </div>
      <DayDetailsModal open={open} onClose={onClose} dayType="confirmation" />
    </div>
  );
}
