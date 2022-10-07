import React from "react";
import "./Inventory.css";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { MdOutlineArrowBackIos } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import TableContext from "../../context/TableContext";

const PlaceOrder = () => {
  const { toastOptions } = useContext(AuthContext);
  const { activeCategory, displayImsOrders } = useContext(TableContext);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const currentDate = new Date();
  const date = `${currentDate.toLocaleString("en-US", {
    weekday: "long",
  })}, ${currentDate.toLocaleString("en-US", {
    month: "long",
  })} ${currentDate.getDate()}, ${currentDate.getFullYear()}`;

  const [item, setItem] = useState();
  const [qty, setQty] = useState();
  const [size, setSize] = useState();
  const [metric, setMetric] = useState();
  const [unitPrice, setUnitPrice] = useState();
  const [department, setDepartment] = useState();

  const placeOrder = async () => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/ims/place-order",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item,
            qty: +qty,
            size: +size,
            metric,
            unitPrice: +unitPrice,
          }),
        }
      );
      if (response.ok) {
        toast.success(`Order placed successfully`, toastOptions);
        setLoading(false);
        setItem("");
        setQty("");
        setSize("");
        setMetric("");
        setUnitPrice("");
        displayImsOrders();
      } else {
        toast.error(`Failed to place order`, toastOptions);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  // SEND ITEMS TO DEPARTMENTS
  const sendItems = async () => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/ims/send-items",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            item,
            quantity: +qty,
            size: +size,
            metric,
            department,
          }),
        }
      );
      if (response.ok) {
        toast.success(`Item sent successfully`, toastOptions);
        setLoading(false);
        setItem("");
        setQty("");
        setSize("");
        setMetric("");
        setUnitPrice("");
        setDepartment("");
        displayImsOrders();
      } else {
        toast.error(`Failed to send item`, toastOptions);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="placeorder__wrapper">
      <div className="ims__date">{date}</div>
      <div className="ims__back">
        <MdOutlineArrowBackIos size={28} onClick={() => navigate(-1)} />
        {activeCategory === "PENDING" && <span>Place Order</span>}
        {activeCategory === "RECEIVED" && <span>Receive Order</span>}
        {activeCategory === "CANCELLED" && <span>Cancel Order</span>}
        {activeCategory === "TRANSACTIONS" && <span>Send Item</span>}
      </div>
      <div className="placeoorder_form">
        <form
          className="ims__form"
          onSubmit={(e) => {
            e.preventDefault();
            setLoading(true);
          }}
        >
          <h1 className="ims__title">
            {activeCategory === "PENDING" && (
              <span>Add Item to placed orders</span>
            )}
            {activeCategory === "RECEIVED" && (
              <span>Add Item to received orders</span>
            )}
            {activeCategory === "CANCELLED" && (
              <span>Add Item to Cancelled orders</span>
            )}
            {activeCategory === "TRANSACTIONS" && (
              <span>Send Item to Department</span>
            )}
          </h1>

          <div className="ims__inputContainer">
            <input
              type="text"
              className="ims__input"
              placeholder="a"
              value={item}
              onChange={(e) => setItem(e.target.value)}
            />
            <label htmlFor="" className="ims__label">
              Enter Item Name
            </label>
          </div>

          <div className="ims__inputContainer">
            <input
              type="number"
              className="ims__input"
              placeholder="a"
              value={qty}
              onChange={(e) => setQty(e.target.value)}
            />
            <label htmlFor="" className="ims__label">
              Quantity
            </label>
          </div>

          <div className="ims__inputContainer">
            <input
              type="number"
              className="ims__input"
              placeholder="a"
              value={size}
              onChange={(e) => setSize(e.target.value)}
            />
            <label htmlFor="" className="ims__label">
              Size
            </label>
          </div>

          <div className="ims__inputContainer">
            <input
              type="text"
              className="ims__input"
              placeholder="a"
              value={metric}
              onChange={(e) => setMetric(e.target.value)}
            />
            <label htmlFor="" className="ims__label">
              Unit Of Measurement (e.g ml, gram, litre, etc)
            </label>
          </div>

          {activeCategory === "TRANSACTIONS" ? (
            <>
              <div className="ims__inputContainer">
                <select
                  className="ims__input"
                  onChange={(e) => setDepartment(e.target.value)}
                >
                  <option value="" default hidden>
                    Department
                  </option>
                  <option value="Bar">Bar</option>
                  <option value="Lounge">Lounge</option>
                  <option value="Kitchen">Kitchen</option>
                </select>
                <label htmlFor="" className="ims__label"></label>
              </div>
            </>
          ) : (
            <>
              <div className="ims__inputContainer">
                <input
                  type="text"
                  className="ims__input"
                  placeholder="a"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
                <label htmlFor="" className="ims__label">
                  Unit Price
                </label>
              </div>
            </>
          )}

          {activeCategory === "PENDING" && (
            <button className="ims__submitBtn" onClick={placeOrder}>
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          )}

          {activeCategory === "RECEIVED" && (
            <button className="ims__submitBtn">
              {loading ? "Receiving Order..." : "Receive Order"}
            </button>
          )}

          {activeCategory === "CANCELLED" && (
            <button className="ims__submitBtn">
              {loading ? "Cancelling Order..." : "Cancel Order"}
            </button>
          )}

          {activeCategory === "TRANSACTIONS" && (
            <button className="ims__submitBtn" onClick={sendItems}>
              {loading ? "Sending Item..." : "Send Item"}
            </button>
          )}
        </form>
      </div>
    </div>
  );
};

export default PlaceOrder;
