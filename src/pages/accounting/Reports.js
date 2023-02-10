import { useContext } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import { HiPrinter } from "react-icons/hi";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import { BiCaretDown } from "react-icons/bi";
import TableContext from "../../context/TableContext";

const AccountReports = () => {
  const navigate = useNavigate();
  const {
    toDate,
    fromDate,
    setFromDate,
    setToDate,
    searchResult,
    setSearchResult,
  } = useContext(TableContext);

  return (
    <div className="accounts__wrapper">
      <div className="">
        {/* BACKWARDS NAVIGATION */}
        <div
          className="transactions__backbutton__supply"
          style={{ marginBottom: "1.5rem", cursor: "pointer" }}
          onClick={() => navigate(-1)}
        >
          <BsArrow90DegLeft size={22} />
          <p style={{ fontSize: "1.2rem", margin: "0rem" }}>Go Back</p>
        </div>

        {/* TOPIC HEADER */}
        <section className="title__accounts">
          <h1>Report</h1>
          <div className="title__accounts--right">
            <div className="recordNew__accounts report__actions">
              <span>Print</span>
              <HiPrinter size={20} />
            </div>
            <div className="recordNew__accounts report__actions">
              <span>Send as email</span>
              <BiCaretDown size={20} />
            </div>
            <div className="recordNew__accounts report__actions">
              <span>export as PDF</span>
              <BiCaretDown size={20} />
            </div>
          </div>
        </section>

        {/* SEARCHBAR */}
        <div
          className="ims__search2 fade__animation"
          style={{ marginTop: "3rem" }}
        >
          <form>
            <FaSearch size={16} className="search__icon" color="#343f50" />
            <input
              type="text"
              placeholder="Search"
              value={searchResult}
              onChange={(e) => setSearchResult(e.target.value)}
            />
          </form>
        </div>

        {/* DATE FILTER */}
        <section className="accounts__filter sub__pages">
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
      </div>

      <div className="report__body">
        <section className="report__header">
          <h2>uppist demo</h2>
          <h1>Accounting Report</h1>
          <h3>From 25 Aug 2022 To 25 Sep 2022</h3>
        </section>

        <section className="report__quarter">
          <div className="report__quarter1 reportq2">
            <span>Bar: 178, 500</span>
            <span>Lounge: 268, 600</span>
            <span>Snooker: 120, 000</span>
            <span>Total Sales: 567, 100</span>
          </div>

          <div className="report__quarter1">
            <span>POS Payments: 148, 500</span>
            <span>Transfer Payments: 181, 600</span>
            <span>Cash Payments: 237, 000</span>
          </div>

          <div className="report__quarter1 reportq2">
            <span>Total Sales: 567, 100</span>
            <span>Balance Before: 63, 950</span>
            <span>Debt Recovered: 18, 400</span>
            <span>Grand Total: 649, 450</span>
          </div>

          <div className="report__quarter1 reportq2">
            <span>Grand Total: 649, 450</span>
            <span>Less Total Expenses: 574, 300</span>
            <span>Net Balance: 75, 150</span>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AccountReports;
