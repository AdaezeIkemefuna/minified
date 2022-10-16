import { useContext, useEffect} from "react";
import TableContext from "../../context/TableContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";



const DeptTransactions = () => {
  const {
    activeDept,
    setActiveDept,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    transactions,
    imsTransactions,
    getTransactions,
    setTransactions,
    displayImsTransactions,
  } = useContext(TableContext);
  const clearFilters = () => {
    setTransactions("");
    setToDate("");
    setFromDate("");
  };

  
  const navigate = useNavigate();
 

  const transformTransactions = (trans) => {
    let sortedTrans = trans;

    if (activeDept === "Bar") {
      sortedTrans = trans.filter((item) => item.department === "Bar");
    }
    if (activeDept === "Lounge") {
      sortedTrans = trans.filter((item) => item.department === "Lounge");
    }
    // if (activeDept === "Kitchen") {
    //   sortedTrans = trans.filter((item) => item.department === "Kitchen");
    // }

    if (transactions) {
      sortedTrans = transactions.filters;
      if (activeDept === "Bar") {
        sortedTrans = transactions.filters.filter(
          (item) => item.department === "Bar"
        );
      }
      if (activeDept === "Lounge") {
        sortedTrans = transactions.filters.filter(
          (item) => item.department === "Lounge"
        );
      }
      // if (activeDept === "Kitchen") {
      //   sortedTrans = transactions.filters.filter(
      //     (item) => item.department === "Kitchen"
      //   );
      // }
    }
    return sortedTrans;
  };
  return (
   <div className="form__wrapper">
      <div className="ims__transactions">
      <div className="transactions__backbutton" onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={25} />
          <p className="goback__text">Go Back</p>
        </div>
        <div style={{display:"flex"}}>
        <h2
          className={`${activeDept === "" ? "ims--title" : ""}`}
          onClick={() => setActiveDept("")}
          style={{ cursor: "pointer" }}
        >
          All Items Distributed from the General Store
        </h2>
        <div>
          <span
            className={`${activeDept === "Bar" ? "ims--title" : "ims--dept"}`}
            style={{
              display: "inline",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => setActiveDept("Bar")}
          >
            Bar
          </span>
          <span
            className={`${
              activeDept === "Lounge" ? "ims--title" : "ims--dept"
            }`}
            style={{
              display: "inline",
              marginRight: "0.5rem",
              cursor: "pointer",
            }}
            onClick={() => setActiveDept("Lounge")}
          >
            Lounge
          </span>
        </div>
        </div>
      </div>

      <div className="ims__date">
        <span>From</span>
        <span className="ims--place__order">
          <input
            type="date"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </span>

        <span>To</span>
        <span className="ims--place__order">
          <input
            type="date"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </span>
        <button
          onClick={() => {
            setActiveDept("");
            getTransactions(fromDate, toDate);
          }}
          style={{
            padding: "0.9rem 1rem",
            borderRadius: "5px",
            marginTop: "3px",
            cursor: "pointer",
            color: "var(--yellow)",
            borderRadius: "8px",
            fontWeight: "500",
            border: "1px solid var(--blue-border)",
            cursor: "pointer",
            backgroundColor: "var(--primary-color)",
          }}
        >
          Get date
        </button>
        <button
          onClick={clearFilters}
          style={{
            padding: "0.9rem 1rem",
            borderRadius: "5px",
            marginTop: "3px",
            background: "transparent",
            cursor: "pointer",
            color: "var(--yellow)",
            borderRadius: "8px",
            fontWeight: "500",
            border: "1px solid var(--blue-border)",
            cursor: "pointer",
            backgroundColor: "var(--primary-color)",
          }}
        >
          clear filters
        </button>
      </div>

      <table className="ims__table">
        <thead className="ims__thead ims__transactions__thead">
          <tr className="table__header__ims">
            <th>No</th>
            <th>Item Names</th>
            <th>Quantity</th>
            <th>Department</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {transformTransactions(imsTransactions)?.map((order, index) => (
            <tr key={index} className="ims__body">
              <TableRow order={order} index={index} />
            </tr>
          ))}
        </tbody>
      </table>
      </div>
  );
};

export default DeptTransactions;

const TableRow = ({ order, index }) => {
  const {
    qty,
    unitprice,
    date,
    status,
    size,
    metric,
    department,
    product,
    quantity,
    category,
    reorder,
  } = order;

  const formattedDate = date?.substring(0, 10);

  return (
    <>
      <td>0{index + 1}</td>
      <td>{product}</td>
      <td>{quantity}</td>

      <td>{department}</td>
      <td>{formattedDate}</td>
    </>
  );
};
