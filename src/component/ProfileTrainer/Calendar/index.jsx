import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  getDay,
  isAfter,
  isBefore,
  isEqual,
  isSameDay,
  isSameMonth,
  isToday,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useState } from "react";
import "./styles.css"; // Import the CSS file

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

const getMeetingClasses = (day, meetings) => {
  const isPartOfMeeting = (meeting) => {
    const start = parseISO(meeting.startDatetime);
    const end = parseISO(meeting.endDatetime);
    return (
      isSameDay(start, day) ||
      isSameDay(end, day) ||
      (isAfter(day, start) && isBefore(day, end))
    );
  };

  const relevantMeetings = meetings.filter((meeting) =>
    isPartOfMeeting(meeting)
  );

  if (relevantMeetings.length === 0) {
    return "";
  }

  const firstMeeting = relevantMeetings[0];
  const startDay = parseISO(firstMeeting.startDatetime);
  const endDay = parseISO(firstMeeting.endDatetime);

  if (isSameDay(startDay, endDay)) {
    return "isSelected";
  }

  const classes = [];
  if (isSameDay(day, startDay)) {
    classes.push("isSelectedStart");
  } else if (isSameDay(day, endDay)) {
    classes.push("isSelectedEnd");
  } else if (isAfter(day, startDay) && isBefore(day, endDay)) {
    classes.push("isSelectedMiddle");
  }

  return classes.join(" ");
};

export default function Calendar() {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const firstDayCurrentMonth = parse(currentMonth, "MMM-yyyy", new Date());

  const days = eachDayOfInterval({
    start: startOfWeek(firstDayCurrentMonth),
    end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
  });

  function previousMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function nextMonth() {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  }

  function previousYear() {
    const firstDayPreviousYear = add(firstDayCurrentMonth, { years: -1 });
    setCurrentMonth(format(firstDayPreviousYear, "MMM-yyyy"));
  }

  function nextYear() {
    const firstDayNextYear = add(firstDayCurrentMonth, { years: 1 });
    setCurrentMonth(format(firstDayNextYear, "MMM-yyyy"));
  }

  const selectedDayMeetings = meetings.filter((meeting) =>
    isSameDay(parseISO(meeting.startDatetime), selectedDay)
  );

  const getMeetingColor = (day) => {
    const isPartOfMeeting = (meeting) => {
      const start = parseISO(meeting.startDatetime);
      const end = parseISO(meeting.endDatetime);
      return (
        isSameDay(start, day) ||
        isSameDay(end, day) ||
        (isAfter(day, start) && isBefore(day, end))
      );
    };

    const relevantMeetings = meetings.filter((meeting) =>
      isPartOfMeeting(meeting)
    );

    if (relevantMeetings.length === 0) {
      return "";
    }

    const firstMeeting = relevantMeetings[0];
    return firstMeeting.color;
  };
  return (
    <div className="example-container">
      <div className="calendar">
        <div className="header">
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
        <div className="weekdays">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
            <div key={day} className="weekday">
              {day}
            </div>
          ))}
        </div>
        <div className="days">
          {days.map((day) => (
            <div
              key={day.toString()}
              style={{ background: getMeetingColor(day, selectedDayMeetings) }}
              className={`day day-${getDay(day)} ${getMeetingClasses(
                day,
                meetings
              )}`}
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
              {/* <p className="day-title">{getMettingTitleCurrentDay(day)}</p> */}
              <div className="dot-container">
                {meetings.some((meeting) =>
                  isSameDay(parseISO(meeting.startDatetime), day)
                ) && <div className="dot"></div>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

const OnNavigate = ({ onPrevious, onNext, currentDate }) => {
  return (
    <div className="navigation">
      <button type="button" onClick={onPrevious} className="nav-button">
        <svg
          className="nav-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>
      <p className="nav-date">{currentDate}</p>
      <button onClick={onNext} type="button" className="nav-button">
        <svg
          className="nav-icon"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
        </svg>
      </button>
    </div>
  );
};
