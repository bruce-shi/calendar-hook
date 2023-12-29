import { useCallback, useMemo, useState } from "react";

import {
  format,
  eachDayOfInterval,
  isSameMonth,
  startOfWeek,
  startOfMonth,
  isSameDay,
  addDays,
  endOfWeek,
  addWeeks,
  addMonths,
  subMonths,
  subWeeks,
} from "date-fns";
import { enUS } from "date-fns/locale";
import _ from "lodash";
/**
 * Represents an event.
 */
export interface Event {
  date: Date;
}
/**
 * Represents a day in the calendar.
 */
export interface Day {
  date: Date;
  format: string;
  isSameMonth: boolean;
  isToday: boolean;
  events: Event[];
}
interface UseCalendarReturnType {
  days: Day[];
  weekdays: string[];
  next: () => void;
  prev: () => void;
  setView: React.Dispatch<React.SetStateAction<"month" | "week">>;
  current: Date;
  setCurrent: React.Dispatch<React.SetStateAction<Date>>;
}

/**
 * Custom hook for managing a calendar.
 * @template E The type of events in the calendar.
 * @param events An array of events to initialize the calendar with.
 * @returns An object with calendar-related functions and data.
 */
export function useCalendar<E extends Event>(
  events: E[] = []
): UseCalendarReturnType {
  const [current, setCurrent] = useState(new Date());
  const [view, setView] = useState<"month" | "week">("month");

  const weekdays = useMemo(() => {
    const daysOfWeek = eachDayOfInterval({
      start: startOfWeek(current),
      end: endOfWeek(current),
    });

    return daysOfWeek.map((day) => format(day, "EEE", { locale: enUS }));
  }, [current]);

  const eventsByDate = useMemo(() => {
    return _.groupBy(events, (event) => format(event.date, "yyyy-MM-dd"));
  }, [events]);

  const days = useMemo(() => {
    const start = startOfWeek(
      view == "month" ? startOfMonth(current) : current
    );
    const daysOfView = eachDayOfInterval({
      start,
      end: view == "month" ? addDays(start, 41) : addDays(start, 6),
    });
    const today = new Date();
    return daysOfView.map((day) => {
      return {
        date: day,
        format: format(day, "d", { locale: enUS }),
        isSameMonth: isSameMonth(day, current),
        isToday: isSameDay(day, today),
        events: eventsByDate[format(day, "yyyy-MM-dd")] || [],
      } as Day;
    });
  }, [current, view]);

  const next = useCallback(() => {
    setCurrent((cur) => {
      if (view === "month") {
        return addMonths(cur, 1);
      } else {
        return addWeeks(cur, 1);
      }
    });
  }, [current, view]);

  const prev = useCallback(() => {
    setCurrent((cur) => {
      if (view === "month") {
        return subMonths(cur, 1);
      } else {
        return subWeeks(cur, 1);
      }
    });
  }, [current, view]);

  return { days, weekdays, next, prev, setView, current, setCurrent };
}
