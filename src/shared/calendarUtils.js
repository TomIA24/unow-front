import { isAfter, isBefore, isSameDay, parseISO } from "date-fns";

const isPartOfMeeting = (meeting, day) => {
  const start = parseISO(meeting.startDate);
  const end = parseISO(meeting.endDate);

  return (
    isSameDay(start, day) ||
    isSameDay(end, day) ||
    (isAfter(day, start) && isBefore(day, end))
  );
};

const relevantMeetings = (meetings, day) => {
  const relevantMeetings = meetings.filter(
    (meeting) => isPartOfMeeting(meeting, day) && meeting.type === "training"
  );

  return relevantMeetings.length === 0;
};

const getMeetingClasses = (day, meetings) => {
  const relevantMeetings = meetings.filter((meeting) =>
    isPartOfMeeting(meeting, day)
  );

  if (relevantMeetings.length === 0) {
    return "";
  }

  const firstMeeting = relevantMeetings[0];
  const startDay = parseISO(firstMeeting.startDate);
  const endDay = parseISO(firstMeeting.endDate);

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
  const relevantMeetings = meetings.filter((meeting) =>
    isPartOfMeeting(meeting, day)
  );

  if (relevantMeetings.length === 0) {
    return "";
  }

  const firstMeeting = relevantMeetings[0];
  return firstMeeting.color;
};

const getMettingTitleCurrentDay = (day, meetings) => {
  const isPartOfMeeting = (meeting) => {
    const start = parseISO(meeting.startDate);
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

export {
  getMeetingClasses,
  getMeetingColor,
  getMettingTitleCurrentDay,
  isPartOfMeeting,
  relevantMeetings
};
