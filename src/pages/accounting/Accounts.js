import { useContext, useState } from "react";
import TableContext from "../../context/TableContext";
import { FaArrowRight } from "react-icons/fa";
import "./Accounts.css";
import { useNavigate } from "react-router";

const Accounts = () => {
  const current = new Date();
  const date = `${current.toLocaleString("en-US", {
    weekday: "long",
  })}, ${current.toLocaleString("en-US", {
    month: "long",
  })} ${current.getDate()}, ${current.getFullYear()}`;

  const [activeTime, setActiveTime] = useState("today");
  const { toDate, fromDate, setFromDate, setToDate } = useContext(TableContext);
  const navigate = useNavigate();

  // dummy data
  const today = {
    income: 200,
    expenses: 500,
    debts: 600000,
    report: 1000000,
  };

  const thisWeek = {
    income: 400,
    expenses: 1700,
    debts: 400000,
    report: 200000,
  };

  const thisMonth = {
    income: 500,
    expenses: 700,
    debts: 8000,
    report: 1000,
  };

  const thisYear = {
    income: 600,
    expenses: 500,
    debts: 1000,
    report: 30000,
  };
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
            <button className="apply">Apply</button>
            <button className="clear__filter">Clear Filters</button>
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

      {/* cards */}
      <section className="cards__accounts">
        <aside className="left__cards">
          {/* INCOME */}
          <div className="account__card">
            <h1>Income</h1>
            <div className="center__info">
              <span className="naira__sign">₦</span>

              {/* dynamic data render */}
              {activeTime === "today" && (
                <span className="amount__card">{today.income}</span>
              )}
              {activeTime === "week" && (
                <span className="amount__card">{thisWeek.income}</span>
              )}
              {activeTime === "month" && (
                <span className="amount__card">{thisMonth.income}</span>
              )}
              {activeTime === "year" && (
                <span className="amount__card">{thisYear.income}</span>
              )}

              <span className="account__type">Total Income</span>
            </div>
            <div className="view__more" onClick={() => navigate("/income")}>
              <span>See all income</span>
              <span>
                <FaArrowRight />
              </span>
            </div>
          </div>

          {/* DEBTS */}
          <div className="account__card">
            <h1>Debts</h1>
            <div className="center__info">
              {/* <span className="naira__sign">₦</span> */}

              {/* dynamic data render */}
              {activeTime === "today" && (
                <span className="amount__card">{today.debts}</span>
              )}
              {activeTime === "week" && (
                <span className="amount__card">{thisWeek.debts}</span>
              )}
              {activeTime === "month" && (
                <span className="amount__card">{thisMonth.debts}</span>
              )}
              {activeTime === "year" && (
                <span className="amount__card">{thisYear.debts}</span>
              )}
              <span className="account__type">Total number of debtors</span>
            </div>
            <div className="view__more" onClick={() => navigate("/debt")}>
              <span>See all debts - credit</span>
              <span>
                {" "}
                <FaArrowRight />{" "}
              </span>
            </div>
          </div>
        </aside>

        <aside className="right__cards">
          {/* EXPENSES */}
          <div className="account__card">
            <h1>expenses</h1>
            <div className="center__info">
              <span className="naira__sign">₦</span>

              {/* dynamic data render */}
              {activeTime === "today" && (
                <span className="amount__card">{today.expenses}</span>
              )}
              {activeTime === "week" && (
                <span className="amount__card">{thisWeek.expenses}</span>
              )}
              {activeTime === "month" && (
                <span className="amount__card">{thisMonth.expenses}</span>
              )}
              {activeTime === "year" && (
                <span className="amount__card">{thisYear.expenses}</span>
              )}

              <span className="account__type">Total expenses</span>
            </div>
            <div className="view__more" onClick={() => navigate("/expenses")}>
              <span>See all expenses</span>
              <span>
                {" "}
                <FaArrowRight />{" "}
              </span>
            </div>
          </div>

          {/* REPORT */}
          <div className="account__card">
            <h1>Reports</h1>
            <div className="center__info">
              {/* <span className="naira__sign">₦</span> */}
              {/* dynamic data render */}
              {activeTime === "today" && (
                <span className="amount__card">{today.report}</span>
              )}
              {activeTime === "week" && (
                <span className="amount__card">{thisWeek.report}</span>
              )}
              {activeTime === "month" && (
                <span className="amount__card">{thisMonth.report}</span>
              )}
              {activeTime === "year" && (
                <span className="amount__card">{thisYear.report}</span>
              )}{" "}
              <span className="account__type">Total Reports</span>
            </div>
            <div className="view__more" onClick={() => navigate("/accreports")}>
              <span>See all reports</span>
              <span>
                <FaArrowRight />
              </span>
            </div>
          </div>
        </aside>
      </section>
    </div>
  );
};

export default Accounts;
