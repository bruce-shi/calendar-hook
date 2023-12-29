import "./App.css";
import { Day, useCalendar } from "../lib/use-calendar";
import { format } from "date-fns";
function App() {
  const calendar = useCalendar();
  const daysByWeek = calendar.days.reduce<Day[][]>((acc, day, i) => {
    const week = Math.floor(i / 7);
    acc[week] = acc[week] || [];
    acc[week].push(day);
    return acc;
  }, []);

  return (
    <div className="container mx-auto">
      <div className="flex justify-center">
        <div className="join">
          <button
            className="btn join-item btn-sm"
            onClick={() => {
              calendar.setView("week");
            }}
          >
            Week
          </button>
          <button
            className="btn join-item btn-sm"
            onClick={() => {
              calendar.setView("month");
            }}
          >
            Month
          </button>
        </div>
      </div>

      <div className="flex justify-between">
        <h2 className="text-2xl">{format(calendar.current, "MMMM yyyy")}</h2>
        <div className="join">
          <button
            className="btn join-item btn-sm"
            onClick={() => {
              calendar.prev();
            }}
          >
            Prev
          </button>
          <button
            className="btn join-item btn-sm"
            onClick={() => {
              calendar.setCurrent(new Date());
            }}
          >
            Today
          </button>
          <button
            className="btn join-item btn-sm"
            onClick={() => {
              calendar.next();
            }}
          >
            Next
          </button>
        </div>
      </div>

      <table className="table">
        <thead>
          {calendar.weekdays.map((day) => {
            return <th key={day}>{day}</th>;
          })}
        </thead>
        <tbody>
          {daysByWeek.map((days) => {
            return (
              <tr>
                {days.map((day) => {
                  return (
                    <td
                      key={day.format}
                      className={[
                        day.isSameMonth ? "" : "text-neutral-content",
                        day.isToday ? "bg-accent" : "",
                      ].join(" ")}
                    >
                      {day.format}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default App;
