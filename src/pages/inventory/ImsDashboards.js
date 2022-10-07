import React from "react";
import { useNavigate } from "react-router-dom";
import { BsArrowRightSquare, BsPlusCircle } from "react-icons/bs";
import { FaSearch, FaHome } from "react-icons/fa";
import "./Inventory.css";
import { useContext } from "react";
import TableContext from "../../context/TableContext";
import AuthContext from "../../context/AuthContext";

const ImsDashboards = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const {
    activeCategory,
    setActiveCategory,
    searchQuery,
    setSearchQuery,
    pendingOrders,
    receivedOrders,
    cancelledOrders,
    fromDate,
    setFromDate,
    toDate,
    setToDate,
    getTransactions,
    activeDept,
    setActiveDept,
    getplacedOrdersFilter,
    totalPlacedOrders,
    totalReceivedOrders,
  } = useContext(TableContext);

  return (
    <div>
      <div className="ims">
        <span
          className="ims__home"
          onClick={() => setActiveCategory("ALL ITEMS")}
        >
          <FaHome size={35} color="var(--primary-color)" />
        </span>
        <div className="ims__topDashBoard">
          <div
            className={`${
              activeCategory === "PENDING" ? "order-active" : "card"
            }`}
            onClick={() => setActiveCategory("PENDING")}
          >
            <span className="order__type">Placed Orders</span>
            <p className="order__count">
              <span>{pendingOrders?.length}</span>

              <BsArrowRightSquare size={25} />
            </p>
          </div>

          <div
            className={`${
              activeCategory === "RECEIVED" ? "order-active" : "card"
            }`}
            onClick={() => setActiveCategory("RECEIVED")}
          >
            <span className="order__type">Recieved Orders</span>
            <p className="order__count">
              <span>{receivedOrders?.length}</span>

              <BsArrowRightSquare size={25} />
            </p>
          </div>

          <div
            className={`${
              activeCategory === "CANCELLED" ? "order-active" : "card"
            }`}
            onClick={() => setActiveCategory("CANCELLED")}
          >
            <span className="order__type">Cancelled Orders</span>
            <p className="order__count">
              <span>{cancelledOrders?.length}</span>

              <BsArrowRightSquare size={25} />
            </p>
          </div>

          <div className="card">
            <span className="order__type">Total Cost of Placed Orders</span>
            <p className="order__count1">
              <span>₦{totalPlacedOrders?.toLocaleString("en-US")}</span>
            </p>
          </div>

          <div className="card">
            <span className="order__type">Total Cost of Received Orders</span>
            <p className="order__count1">
              <span>₦{totalReceivedOrders?.toLocaleString("en-US")}</span>
            </p>
          </div>

          <div
            className={`${
              activeCategory === "TRANSACTIONS" ? "order-active" : "card"
            }`}
            onClick={() => setActiveCategory("TRANSACTIONS")}
          >
            <span className="order__type">Transactions</span>
            <p className="order__count">
              <span>300</span>
              <BsArrowRightSquare size={25} />
            </p>
          </div>
        </div>

        <div className="ims__mid">
          <div className="ims__search">
            <form>
              <FaSearch size={15} className="search__icon" color="#343f50" />
              <input
                type="text"
                placeholder="search by item name"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </form>
          </div>
          <>
            {activeCategory === "TRANSACTIONS" &&
            user.role !== "Store Manager" ? (
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
                  onClick={() => getTransactions(fromDate, toDate)}
                  style={{
                    padding: "0.9rem 1rem",
                    borderRadius: "5px",
                    marginTop: "3px",
                  }}
                >
                  Get date
                </button>
              </div>
            ) : undefined}
          </>
        </div>

        <div className="ims__topLabel">
          {/* ORDER TITLE */}
          {activeCategory === "PENDING" && (
            <div className="ims--title">
              <span>Placed Orders</span>
              <span className="order__badge">520</span>
            </div>
          )}

          {activeCategory === "RECEIVED" && (
            <div className="ims--title">
              <span>Received Orders</span>
              <span className="order__badge">520</span>
            </div>
          )}

          {activeCategory === "CANCELLED" && (
            <div className="ims--title">
              <span>Cancel Order</span>
              <span className="order__badge">520</span>
            </div>
          )}

          {activeCategory === "TRANSACTIONS" && (
            <div className="ims__transactions">
              <h2>All Items Distributed from the General Store</h2>
              <div>
                <span
                  className={`${
                    activeDept === "Bar" ? "ims--title" : "ims--noDisplay"
                  }`}
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
                  className={`${activeDept === "Lounge" ? "ims--title" : ""}`}
                  style={{
                    display: "inline",
                    marginRight: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveDept("Lounge")}
                >
                  Lounge
                </span>
                <span
                  className={`${activeDept === "Kitchen" ? "ims--title" : ""}`}
                  style={{
                    display: "inline",
                    marginRight: "0.5rem",
                    cursor: "pointer",
                  }}
                  onClick={() => setActiveDept("Kitchen")}
                >
                  Kitchen
                </span>
              </div>
            </div>
          )}

          {/* ORDER BUTTON */}
          {user.role === "Store Manager" ? (
            <>
              {activeCategory === "PENDING" && (
                <div
                  className="ims--place__order"
                  onClick={() => navigate("/inventory/placeorder")}
                >
                  <span className="order__badge">
                    <BsPlusCircle size={20} />
                  </span>
                  <span>Place Order</span>
                </div>
              )}

              {activeCategory === "RECEIVED" && (
                <div
                  className="ims--place__order"
                  onClick={() => navigate("/inventory/placeorder")}
                >
                  <span className="order__badge">
                    <BsPlusCircle size={20} />
                  </span>
                  <span>Receive Order</span>
                </div>
              )}

              {activeCategory === "CANCELLED" && (
                <div
                  className="ims--place__order"
                  onClick={() => navigate("/inventory/placeorder")}
                >
                  <span className="order__badge">
                    <BsPlusCircle size={20} />
                  </span>
                  <span>Cancel Order</span>
                </div>
              )}

              {activeCategory === "TRANSACTIONS" && (
                <div
                  className="ims--place__order"
                  onClick={() => navigate("/inventory/placeorder")}
                >
                  <span className="order__badge">
                    <BsPlusCircle size={20} />
                  </span>
                  <span>Send Item</span>
                </div>
              )}
            </>
          ) : (
            <>
              {activeCategory !== "TRANSACTIONS" && (
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
                    onClick={() => getplacedOrdersFilter(fromDate, toDate)}
                    style={{
                      padding: "0.9rem 1rem",
                      borderRadius: "5px",
                      marginTop: "3px",
                    }}
                  >
                    Get date
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default ImsDashboards;
