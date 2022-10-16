import { useEffect } from "react";
import "./Inventory.css";
import { useContext } from "react";
import TableContext from "../../context/TableContext";
import { useState } from "react";
import ReceiveOrder from "./modals/ReceiveOrder";
import CancelOrder from "./modals/CancelOrder";
import { FaCaretDown, FaSearch } from "react-icons/fa";
import { AiFillEdit } from "react-icons/ai";
import AuthContext from "../../context/AuthContext";
import UpdateQty from "./modals/UpdateQty";
import UpdateAllItemsQty from "./modals/UpdateAllItemsQty";
import Transactions from "./Transactions";
import { useNavigate } from "react-router";
import {  BsPlusCircle } from "react-icons/bs";

const Inventory = () => {
  const {
    transformOrders,
    imsOrders,
    imsItems,
    activeCategory,
    transactions,
    searchQuery,
    setSearchQuery,
    placedOrdersFilter,
    displayImsItems,
  } = useContext(TableContext);

  const [receive, setReceive] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [action, setAction] = useState(false);
  const [updateQty, setUpdateQty] = useState(false);

  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setReceive(false);
      setCancel(false);
      setUpdateQty(false);
    }
  };

  useEffect(() => {
    displayImsItems();
  }, []);

  return (
    <div className="form__wrapper ims__wrapper">
      {/* <ImsDashboards /> */}

      <div className="ims__topPage">
        <div className="ims--title imsPage">
          <span>All Items</span>
          <span className="order__badge">{imsItems?.length}</span>
        </div>

        <div className="ims__search">
          <form>
            <FaSearch size={15} className="search__icon" color="#343f50" />
            <input
              type="text"
              placeholder="search by item name"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
            />
          </form>
        </div>


              <div
                className="ims--place__order"
                onClick={() => navigate("/inventory/placeorder")}
              >
                <span className="order__badge">
                  <BsPlusCircle size={20} />
                </span>
                <span>Add Item</span>
              </div>
        <div className="ims__transactions__page" onClick={() => {navigate("/transactions"); window.location.reload()}}>Transactions</div>
      </div>

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
                    <th></th>
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
          <>
            {transformOrders(imsItems).map((order, index) => (
              <tr key={index} className="ims__body">
                <TableRow order={order} index={index} />
              </tr>
            ))}
            {activeCategory === "ALL ITEMS" && (
              <>
                {/* {!allItemsFilter ? (
                  <> */}

                {/* </>
                ) : ( */}
                {/* <>
                    {allItemsFilter.filters.map((t, index) => (
                      <tr key={index} className="ims__body">
                        <td>0{index + 1}</td>
                        <td>{t.product}</td>
                        <td>{t.quantity}</td>
                        <td>
                          {t.size}
                          {t.metric}
                        </td>
                        <td>{t.reorder}</td>
                        <td>
                          {t.quantity === 0 && (
                            <span className="ims--outOfStock">
                              Out of stock
                            </span>
                          )}
                          {t.quantity < t.reorder && t.quantity !== 0 && (
                            <span className="ims--lowStock">low stock</span>
                          )}
                          {t.quantity > t.reorder && (
                            <span className="ims--inStock">In stock</span>
                          )}
                        </td>
                      </tr>
                    ))}
                  </>
                )} */}
              </>
            )}

            {activeCategory === "PENDING" && (
              <>
                {!placedOrdersFilter ? (
                  <>
                    {transformOrders(imsOrders).map((order, index) => (
                      <tr key={index} className="ims__body">
                        <TableRow order={order} index={index} />
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {placedOrdersFilter.filters.map((t, index) => (
                      <tr key={index} className="ims__body">
                        <td>0{index + 1}</td>
                        <td>{t.product}</td>
                        {activeCategory === "RECEIVED" &&
                        user.role === "Store Manager" ? (
                          <td>
                            {t.qty}
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
                          <td>{t.qty}</td>
                        )}

                        <td>
                          {t.size}
                          {t.metric}
                        </td>
                        <td>₦{t.unitprice?.toLocaleString("en-US")}</td>
                        <td>
                          ₦{(t.qty * t.unitprice)?.toLocaleString("en-US")}
                        </td>
                        <td>{t.date?.substring(0, 10)}</td>
                        {t.status === "PENDING" && (
                          <>
                            {user.role === "Store Manager" ? (
                              <td className="ims--action">
                                <span className="ims__action">
                                  Action
                                  <FaCaretDown
                                    onClick={() => setAction(!action)}
                                  />
                                  <span
                                    className={
                                      action ? "actions" : "no-display"
                                    }
                                  >
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

                        {t.status === "RECEIVED" && (
                          <td>
                            <span className="ims--received">received</span>
                          </td>
                        )}
                        {t.status === "CANCELLED" && (
                          <td>
                            <span className="ims--cancelled">cancelled</span>
                          </td>
                        )}

                        {receive && (
                          <div
                            className={
                              receive ? "backdrop__container" : "close"
                            }
                            id="bg"
                            onClick={closeModal}
                          >
                            <div>
                              <ReceiveOrder order={t} closeModal={closeModal} />
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
                              <CancelOrder order={t} closeModal={closeModal} />
                            </div>
                          </div>
                        )}

                        {updateQty && (
                          <div
                            className={
                              updateQty ? "backdrop__container" : "close"
                            }
                            id="bg"
                            onClick={closeModal}
                          >
                            <div>
                              <UpdateQty order={t} closeModal={closeModal} />
                            </div>
                          </div>
                        )}
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}

            {activeCategory === "TRANSACTIONS" && (
              <>
                {!transactions ? (
                  <>
                    {transformOrders(imsOrders).map((order, index) => (
                      <tr key={index} className="ims__body">
                        <TableRow order={order} index={index} />
                      </tr>
                    ))}
                  </>
                ) : (
                  <>
                    {transactions.filters.map((t, index) => (
                      <tr key={index} className="ims__body">
                        <td>0{index + 1}</td>
                        <td>{t.product}</td>
                        <td>{t.quantity}</td>
                        <td>{t.department}</td>
                        <td>{t.date?.substring(0, 10)}</td>
                      </tr>
                    ))}
                  </>
                )}
              </>
            )}
          </>
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
  const [updateQuantity, setUpdateQuantity] = useState(false);
  const [send, setSend] = useState(false);

  const { activeCategory } = useContext(TableContext);
  const { user } = useContext(AuthContext);

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setReceive(false);
      setCancel(false);
      setUpdateQty(false);
      setUpdateQuantity(false);
      setSend(false);
    }
  };

  const closeModal2 = (e) => {
    if (e.target.id === "bg") {
      setUpdateQuantity(false);
    }
  };
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

      {updateQuantity && (
        <div
          className={updateQuantity ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal2}
        >
          <div>
            <UpdateAllItemsQty order={order} closeModal={closeModal} />
          </div>
        </div>
      )}

      {send && (
        <div
          className={send ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <Transactions order={order} closeModal={closeModal} />
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
              <td>
                {quantity}{" "}
                <AiFillEdit
                  color="var(--success)"
                  size={15}
                  className="edit__qty"
                  onClick={() => {
                    setUpdateQuantity(true);
                  }}
                />
              </td>
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
              <td className="ims__send" onClick={() => setSend(true)}>
                Send
              </td>
            </>
          ) : (
            <>
              <td>0{index + 1}</td>
              <td>{product}</td>
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
