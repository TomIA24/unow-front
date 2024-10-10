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
  startOfWeek
} from "date-fns";
import { useEffect, useMemo, useState } from "react";
import { request } from "../../../core/api/request";
import {
  getMettingTitleCurrentDay,
  relevantMeetings
} from "../../../shared/calendarUtils";

export const useCalendar = () => {
  const today = startOfToday();
  const [selectedDay, setSelectedDay] = useState(today);
  const [currentMonth, setCurrentMonth] = useState(format(today, "MMM-yyyy"));
  const [laoding, setLoading] = useState(false);

  const [calendarEvents, setCalendarEvents] = useState([]);
  useEffect(() => {
    setLoading(true);
    request
      .list("calendarEvents")
      .then((data) => {
        setCalendarEvents(data.data);
      })
      .finally(() => setLoading(false));
  }, []);

  const firstDayCurrentMonth = useMemo(() => {
    return parse(currentMonth, "MMM-yyyy", new Date());
  }, [currentMonth]);

  const days = useMemo(() => {
    return eachDayOfInterval({
      start: startOfWeek(firstDayCurrentMonth),
      end: endOfWeek(endOfMonth(firstDayCurrentMonth))
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
    return calendarEvents?.filter((meeting) =>
      isSameDay(parseISO(meeting.startDate), selectedDay)
    );
  }, [calendarEvents, selectedDay]);

  const [open, setOpen] = useState({ isOpen: false, isFreeDay: true });
  const [trainingTitle, setTrainingTitle] = useState("");

  const onClose = () => {
    setOpen({ isOpen: false, isFreeDay: true });
  };

  const handleModalOpen = (calendarEvents, day) => {
    setOpen({
      isOpen: true,
      isFreeDay: relevantMeetings(calendarEvents, day)
    });
    setTrainingTitle(getMettingTitleCurrentDay(day, calendarEvents));
    setSelectedDay(day);
  };

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
    laoding,
    calendarEvents,
    selectedDayMeetings,
    setCalendarEvents,
    open,
    trainingTitle,
    onClose,
    handleModalOpen
  };
};
