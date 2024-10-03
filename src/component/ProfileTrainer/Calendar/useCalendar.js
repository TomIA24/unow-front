import {
  add,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  parse,
  parseISO,
  startOfToday,
  startOfWeek,
} from "date-fns";
import { useMemo, useState } from "react";

export const useCalendar = (meetings) => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));

  const firstDayCurrentMonth = useMemo(() => {
    return parse(currentMonth, "MMM-yyyy", new Date());
  }, [currentMonth]);

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth)),
    });
  }, [firstDayCurrentMonth]);

  const previousMonth = () => {
    const firstDayPreviousMonth = add(firstDayCurrentMonth, { months: -1 });
    setCurrentMonth(format(firstDayPreviousMonth, "MMM-yyyy"));
  };

  const nextMonth = () => {
    const firstDayNextMonth = add(firstDayCurrentMonth, { months: 1 });
    setCurrentMonth(format(firstDayNextMonth, "MMM-yyyy"));
  };

  const previousYear = () => {
    const firstDayPreviousYear = add(firstDayCurrentMonth, { years: -1 });
    setCurrentMonth(format(firstDayPreviousYear, "MMM-yyyy"));
  };

  const nextYear = () => {
    const firstDayNextYear = add(firstDayCurrentMonth, { years: 1 });
    setCurrentMonth(format(firstDayNextYear, "MMM-yyyy"));
  };

  const selectedDayMeetings = useMemo(() => {
    return meetings.filter((meeting) =>
      isSameDay(parseISO(meeting.startDatetime), selectedDay)
    );
  }, [meetings, selectedDay]);

  return {
    selectedDay,
    setSelectedDay,
    firstDayCurrentMonth,
    setCurrentMonth,
    days,
    previousMonth,
    nextMonth,
    previousYear,
    nextYear,
    selectedDayMeetings,
  };
};
