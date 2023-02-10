import { useContext } from "react";
import { BsArrow90DegLeft, BsPlusCircle } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { FaSearch } from "react-icons/fa";
import TableContext from "../../context/TableContext";

const Expenses = () => {
  const navigate = useNavigate();
  const {
    toDate,
    fromDate,
    setFromDate,
    setToDate,
    searchResult,
    setSearchResult,
    setActiveAcc,
  } = useContext(TableContext);

  const handleRecord = () => {
    setActiveAcc("EXPENSES");
    navigate("/newrecord");
  };

  return (
    <div className="accounts__wrapper">
      <div className="accounts__header">
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
          <h1>Expenses</h1>
          <div className="recordNew__accounts" onClick={handleRecord}>
            <BsPlusCircle size={20} />
            <span>record new expenses</span>
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

      {/* TABLE SECTION */}
      <table className="accounts__table debts_exp">
        <thead>
          <tr>
            <th>no</th>
            <th>expenses type</th>
            <th>amount</th>
            <th>payment method</th>
            <th>description</th>
            <th>date</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>01</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>02</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>03</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>04</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>05</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>06</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>06</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>06</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>06</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>06</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>

          <tr>
            <td>06</td>
            <td>pos</td>
            <td>300</td>
            <td>cash</td>
            <td>food</td>
            <td>27-5-23</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default Expenses;
