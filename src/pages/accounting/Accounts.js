import { useContext, useState } from "react";
import TableContext from "../../context/TableContext";
import "./Accounts.css";

const Accounts = () => {
  const current = new Date();
  const date = `${current.toLocaleString("en-US", {
    weekday: "long",
  })}, ${current.toLocaleString("en-US", {
    month: "long",
  })} ${current.getDate()}, ${current.getFullYear()}`;

  const [activeTime, setActiveTime] = useState("today");
  const { toDate, fromDate, setFromDate, setToDate } = useContext(TableContext);
  return (
    <div className="accounts__wrapper">
      <section className="accounts__header">
        <section className="accounts__date">{date}</section>
        <section className="accounts__filter">
          <aside className="date__left">
            <span>From</span>
            <span className="">
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </span>

            <span>To</span>
            <span className="">
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </span>
          </aside>
          <aside className="date__right">
            <button id="apply">Apply</button>
            <button id="clear__filter">Clear Filters</button>
          </aside>
        </section>

        {/* TIME FILTERS */}

        <div className="time__filters">
          <div
            className={
              activeTime === "today"
                ? "time__filter--element active__filter"
                : "time__filter--element"
            }
            onClick={() => setActiveTime("today")}
          >
            today
          </div>
          <div
            className={
              activeTime === "week"
                ? "time__filter--element active__filter"
                : "time__filter--element"
            }
            onClick={() => setActiveTime("week")}
          >
            this week
          </div>
          <div
            className={
              activeTime === "month"
                ? "time__filter--element active__filter"
                : "time__filter--element"
            }
            onClick={() => setActiveTime("month")}
          >
            this month
          </div>
          <div
            className={
              activeTime === "year"
                ? "time__filter--element active__filter"
                : "time__filter--element"
            }
            onClick={() => setActiveTime("year")}
          >
            this year
          </div>
        </div>
      </section>
    </div>
  );
};

export default Accounts;
