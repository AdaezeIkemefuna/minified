import React from "react";
import "./Inventory.css";
import { useContext } from "react";
import TableContext from "../../context/TableContext";
import { useState } from "react";
import ReceiveOrder from "./modals/ReceiveOrder";
import CancelOrder from "./modals/CancelOrder";
import { FaCaretDown } from "react-icons/fa";
import { BsPencilSquare } from "react-icons/bs";
import { AiFillEdit } from "react-icons/ai";
import ImsDashboards from "./ImsDashboards";
import AuthContext from "../../context/AuthContext";
import UpdateQty from "./modals/UpdateQty";

const Inventory = () => {
  const { transformOrders, imsOrders, activeCategory, transactions } =
    useContext(TableContext);
  return (
    <div className="form__wrapper">
      <ImsDashboards />
      <table className="ims__table">
        <thead className="ims__thead">
          <tr className="table__header__ims">
            <th>No</th>
            <th>Item Names</th>
            <th>Quantity</th>
            {activeCategory !== "TRANSACTIONS" && <th>Size</th>}
            {activeCategory === "TRANSACTIONS" ? (
              <>
                <th>Department</th>
                <th>Date</th>
              </>
            ) : (
              <>
                {activeCategory === "ALL ITEMS" ? (
                  <>
                    <th>Reorder Level</th>
                    <th>Status</th>
                  </>
                ) : (
                  <>
                    <th>Unit Price</th>
                    <th>Total Price</th>
                    <th>Date</th>
                    <th>Status</th>
                  </>
                )}
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {!transactions.length ? (
            <>
              {transformOrders(imsOrders).map((order, index) => (
                <tr key={index} className="ims__body">
                  <TableRow order={order} index={index} />
                </tr>
              ))}
            </>
          ) : (
            <tr>{"hi"}</tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Inventory;

const TableRow = ({ order, index }) => {
  const [receive, setReceive] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [action, setAction] = useState(false);
  const [updateQty, setUpdateQty] = useState(false);

  const { activeCategory, transactions } = useContext(TableContext);
  const { user } = useContext(AuthContext);

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setReceive(false);
      setCancel(false);
      setUpdateQty(false);
    }
  };
  const {
    item,
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
      {receive && (
        <div
          className={receive ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <ReceiveOrder order={order} closeModal={closeModal} />
          </div>
        </div>
      )}

      {cancel && (
        <div
          className={cancel ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <CancelOrder order={order} closeModal={closeModal} />
          </div>
        </div>
      )}

      {updateQty && (
        <div
          className={updateQty ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <UpdateQty order={order} closeModal={closeModal} />
          </div>
        </div>
      )}

      {activeCategory === "TRANSACTIONS" ? (
        <>
          <td>0{index + 1}</td>
          <td>{product}</td>
          <td>{quantity}</td>

          <td>{department}</td>
          <td>{formattedDate}</td>
        </>
      ) : (
        <>
          {activeCategory === "ALL ITEMS" ? (
            <>
              <td>0{index + 1}</td>
              <td>{product}</td>
              <td>{quantity}</td>
              <td>
                {size}
                {metric}
              </td>
              <td>{reorder}</td>
              <td>
                {quantity === 0 && (
                  <span className="ims--outOfStock">Out of stock</span>
                )}
                {quantity < reorder && quantity !== 0 && (
                  <span className="ims--lowStock">low stock</span>
                )}
                {quantity > reorder && (
                  <span className="ims--inStock">In stock</span>
                )}
              </td>
            </>
          ) : (
            <>
              <td>0{index + 1}</td>
              <td>{item}</td>
              {activeCategory === "RECEIVED" &&
              user.role === "Store Manager" ? (
                <td>
                  {qty}
                  <AiFillEdit
                    color="var(--success)"
                    size={15}
                    className="edit__qty"
                    onClick={() => {
                      setUpdateQty(true);
                    }}
                  />
                </td>
              ) : (
                <td>{qty}</td>
              )}

              <td>
                {size}
                {metric}
              </td>
              <td>₦{unitprice?.toLocaleString("en-US")}</td>
              <td>₦{(qty * unitprice)?.toLocaleString("en-US")}</td>
              <td>{formattedDate}</td>
              {status === "PENDING" && (
                <>
                  {user.role === "Store Manager" ? (
                    <td className="ims--action">
                      <span className="ims__action">
                        Action
                        <FaCaretDown onClick={() => setAction(!action)} />
                        <span className={action ? "actions" : "no-display"}>
                          <span
                            style={{ marginBottom: "-0.5rem" }}
                            onClick={() => {
                              setReceive(true);
                              setAction(!action);
                            }}
                          >
                            Receive Order
                          </span>
                          <br />
                          <span
                            onClick={() => {
                              setCancel(true);
                              setAction(!action);
                            }}
                          >
                            Cancel Order
                          </span>
                        </span>
                      </span>
                    </td>
                  ) : (
                    <td>
                      <span className="ims--pending">pending</span>
                    </td>
                  )}
                </>
              )}

              {status === "RECEIVED" && (
                <td>
                  <span className="ims--received">received</span>
                </td>
              )}
              {status === "CANCELLED" && (
                <td>
                  <span className="ims--cancelled">cancelled</span>
                </td>
              )}
            </>
          )}
        </>
      )}
    </>
  );
};
