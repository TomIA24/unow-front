import { isAfter, isBefore, isSameDay, parseISO } from "date-fns";

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

const getMeetingColor = (day, meetings) => {
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

const getMettingTitleCurrentDay = (day, meetings) => {
  const isPartOfMeeting = (meeting) => {
    const start = parseISO(meeting.startDatetime);
    return isSameDay(start, day);
  };

  const relevantMeetings = meetings.filter((meeting) =>
    isPartOfMeeting(meeting)
  );

  if (relevantMeetings.length === 0) {
    return "";
  }

  const firstMeeting = relevantMeetings[0];

  return firstMeeting.title;
};

export { getMeetingClasses, getMeetingColor, getMettingTitleCurrentDay };
