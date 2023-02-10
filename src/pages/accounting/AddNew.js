import { useContext } from "react";
import { BsArrow90DegLeft } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import TableContext from "../../context/TableContext";

const AddNew = () => {
  const navigate = useNavigate();
  const { activeAcc } = useContext(TableContext);

  return (
    <div className="accounts__wrapper">
      {/* BACKWARDS NAVIGATION */}
      <div
        className="transactions__backbutton__supply"
        style={{ marginBottom: "1.5rem", cursor: "pointer" }}
        onClick={() => navigate(-1)}
      >
        <BsArrow90DegLeft size={22} />
        <p style={{ fontSize: "1.2rem", margin: "0rem" }}>Go Back</p>
      </div>

      <section className="form__body">
        {/* TOPIC HEADER */}
        <section className="title__addNew">
          {activeAcc === "INCOME" && <h2>Record New Income</h2>}
          {activeAcc === "EXPENSES" && <h2>Record New Expense</h2>}
          {activeAcc === "DEBT" && <h2>Record New Debt</h2>}
        </section>

        <form>
          <input
            type="text"
            placeholder={
              (activeAcc === "INCOME" && "Income Source") ||
              (activeAcc === "EXPENSES" && "Expense Type") ||
              (activeAcc === "DEBT" && "Debtor’s Name")
            }
          />
          <input type="number" placeholder="Amount" />
          <textarea
            name=""
            id=""
            cols="30"
            rows="10"
            placeholder="Description"
          ></textarea>
        </form>
      </section>
    </div>
  );
};

export default AddNew;
