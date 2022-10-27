import { useContext, useState } from "react";
import TableContext from "../../context/TableContext";
import { useNavigate } from "react-router-dom";
import { MdOutlineArrowBackIos } from "react-icons/md";
import AdminModal from "./modals/AdminModal";
import DeleteTransaction from "./modals/DeleteTransactions";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";

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
  } = useContext(TableContext);

  const { toastOptions } = useContext(AuthContext);
  const clearFilters = () => {
    setTransactions("");
    setToDate("");
    setFromDate("");
  };
  const transactionsCall = () => {
    if (fromDate === "" || toDate === "") {
      toast.warn(`Both dates are required`, toastOptions);
    } else {
      getTransactions(fromDate, toDate);
    }
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

    if (activeDept === "Kitchen") {
      sortedTrans = trans.filter((item) => item.department === "Kitchen");
    }

    if (transactions) {
      sortedTrans = transactions;
      if (activeDept === "Bar") {
        sortedTrans = transactions.filter((item) => item.department === "Bar");
      }
      if (activeDept === "Lounge") {
        sortedTrans = transactions.filter(
          (item) => item.department === "Lounge"
        );
      }

      if (activeDept === "Kitchen") {
        sortedTrans = transactions.filter(
          (item) => item.department === "Kitchen"
        );
      }
    }
    return sortedTrans;
  };
  return (
    <>
      <div className="ims__transactions">
        <div className="transactions__backbutton" onClick={() => navigate(-1)}>
          <MdOutlineArrowBackIos size={22} />
          <p style={{ fontSize: "1.2rem", margin: "0rem" }}>Go Back</p>
        </div>
        <div style={{ display: "flex", gap: "1rem", alignItems: "flex-end" }}>
          <span
            className={`${activeDept === "" ? "ims--title" : "ims--dept"}`}
            onClick={() => setActiveDept("")}
            style={{
              cursor: "pointer",
              marginRight: "5rem",
              padding: "0.4rem 0.1rem",
            }}
          >
            All Items
          </span>
          <div style={{ display: "flex", gap: "0.5rem", marginTop: "1rem" }}>
            <span
              className={`${activeDept === "Bar" ? "ims--title" : "ims--dept"}`}
              style={{
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
                marginRight: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => setActiveDept("Lounge")}
            >
              Lounge
            </span>
            <span
              className={`${
                activeDept === "Kitchen" ? "ims--title" : "ims--dept"
              }`}
              style={{
                marginRight: "0.5rem",
                cursor: "pointer",
              }}
              onClick={() => setActiveDept("Kitchen")}
            >
              Kitchen
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
          className="date__btn"
          onClick={() => {
            setActiveDept("");
            transactionsCall();
          }}
          style={{
            padding: "0.9rem 1rem",
            marginTop: "3px",
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
          className="date__btn"
          onClick={clearFilters}
          style={{
            padding: "0.9rem 1rem",
            marginTop: "3px",
            background: "transparent",
            color: "var(--yellow)",
            borderRadius: "8px",
            fontWeight: "500",
            border: "1px solid var(--blue-border)",
            cursor: "pointer",
            backgroundColor: "var(--primary-color)",
          }}
        >
          Clear filters
        </button>
      </div>

      <table className="ims__table">
        <thead className="ims__thead ims__transactions__thead">
          <tr className="table__header__ims">
            <th>No</th>
            <th>Item Names</th>
            {activeDept === "Kitchen" && <th>Description</th>}
            <th>Quantity</th>
            <th>Department</th>
            <th>Date</th>
            <th>Delete</th>
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
    </>
  );
};

export default DeptTransactions;

const TableRow = ({ order, index }) => {
  const { date, department, product, quantity, description } = order;
  const { activeDept } = useContext(TableContext);
  const formattedDate = date?.substring(0, 10);
  const [adminModal, showAdminModal] = useState(false);
  const [deleteItem, setDelete] = useState(false);

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setDelete(false);
    }
  };

  const closeAdminModal = (e) => {
    if (e.target.id === "bg") {
      showAdminModal(false);
      setDelete(false);
    }
  };

  const closeOneModal = () => {
    showAdminModal(false);
  };

  const closeAll = () => {
    showAdminModal(false);
    setDelete(false);
  };

  return (
    <>
      <td>0{index + 1}</td>
      <td>{product}</td>
      {activeDept === "Kitchen" && <td>{description}</td>}
      <td>{quantity}</td>
      <td>{department}</td>
      <td>{formattedDate}</td>
      <td
        className="ims__delete"
        onClick={() => {
          showAdminModal(true);
          setDelete(true);
        }}
      >
        Delete Item
      </td>

      {/* delete transaction */}
      {deleteItem && (
        <div
          className={deleteItem ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <DeleteTransaction order={order} closeModal={closeModal} />
          </div>
        </div>
      )}

      {/* admin modal */}
      {adminModal && (
        <div
          className={adminModal ? "backdrop__container" : "close"}
          id="bg"
          onClick={(e) => {
            closeAdminModal(e);
          }}
        >
          <div>
            <AdminModal
              order={order}
              closeModal={closeModal}
              closeAdminModal={closeOneModal}
              closeAll={closeAll}
            />
          </div>
        </div>
      )}
    </>
  );
};
