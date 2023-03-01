import React from "react";
import { useNavigate } from "react-router-dom";
import { BsPlusCircle } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useContext } from "react";
import TableContext from "../../context/TableContext";
import ReceivedOrder from "./modals/ReceivedOrder";
import CancelOrder from "./modals/CancelOrder";
import { FaCaretDown } from "react-icons/fa";
import { useParams } from "react-router-dom";
import axios from "axios";

function SupplyTransaction() {
  const navigate = useNavigate();
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const { activePage, setActivePage } = useContext(TableContext);
  const { customer } = useParams();
  const [placedOrders, setPlacedOrders] = useState([]);
  const [totalPlacedOrders, setTotalPlacedOrders] = useState([]);
  const [receivedOrders, setReceivedOrders] = useState([]);

  const convertDate = (date) => {
    return date.substring(0, 10);
  };

  const usedAxios = () => {
    axios
      .post(`https://pos-server-cxqi.onrender.com/supply/get-total`, {
        supplier: customer,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  useEffect(() => {
    usedAxios();
  }, []);

  // FUNCTION TO GET TOTAL PLACED ORDERS OF A SUPPLIER
  const getTotalPlaceOrders = async (customer) => {
    try {
      const response = await fetch(
        `https://pos-server-cxqi.onrender.com/supply/get-total`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supplier: customer,
          }),
        }
      );
      const data = await response.json();
      setTotalPlacedOrders(data.data[0].sum);
    } catch (err) {
      console.log(err);
    }
  };

  console.log(totalPlacedOrders);

  // FUNCTION TO GET SUPPLIER DETAILS
  const getAllPlacedOrders = async (customer) => {
    try {
      const response = await fetch(
        `https://pos-server-cxqi.onrender.com/supply/placed-orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supplier: customer,
          }),
        }
      );
      const data = await response.json();
      const sorted = data.data.sort((a, b) => a.item.localeCompare(b.item));
      setPlacedOrders(sorted);
    } catch (err) {
      console.log(err);
    }
  };

  // FUNCTION TO GET SUPPLIER DETAILS
  const getAllReceivedOrders = async (customer) => {
    try {
      const response = await fetch(
        `https://pos-server-cxqi.onrender.com/supply/received-orders`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supplier: customer,
          }),
        }
      );
      const data = await response.json();
      console.log(data.data);
      const sorted = data.data.sort((a, b) => a.item.localeCompare(b.item));
      setReceivedOrders(sorted);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllPlacedOrders(customer);
    getAllReceivedOrders(customer);
    getTotalPlaceOrders(customer);
  }, [customer, activePage]);

  const products = [
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
    {
      no: "1",
      name: "Wine",
      quantity: "10",
      size: "1L",
      unit: "10000",
      total: "100000",
      date: "12/12/2021",
    },
  ];

  return (
    <>
      <div className="user__details">
        <div className="user__dashboard__header">
          {activePage === "PLACED ORDERS" ? (
            <div
              className="user__details__order"
              onClick={() => {
                navigate(`/supplier/${customer}/supplyorder`);
              }}
            >
              <div className="order__badge3">
                <span>
                  <BsPlusCircle size={20} />
                </span>
                <span>Place Orders</span>
              </div>
            </div>
          ) : activePage === "RECEIVED ORDERS" ? (
            <div
              className="user__details__order"
              onClick={() => {
                navigate(`/supplier/${customer}/receivesupply`);
              }}
            >
              <div className="order__badge3">
                <span>
                  <BsPlusCircle size={20} />
                </span>
                <span>Receive Orders</span>
              </div>
            </div>
          ) : activePage === "CANCELED ORDERS" ? (
            <div
              className="user__details__order"
              onClick={() => {
                navigate(`/supplier/${customer}/cancelsupply`);
              }}
            >
              <div className="order__badge3">
                <span>
                  <BsPlusCircle size={20} />
                </span>
                <span>Cancel Orders</span>
              </div>
            </div>
          ) : activePage === "DAMAGED ORDERS" ? (
            <div
              className="user__details__order"
              onClick={() => {
                navigate(`/supplier/${customer}/damagedsupply`);
              }}
            >
              <div className="order__badge3">
                <span>
                  <BsPlusCircle size={20} />
                </span>
                <span>Damaged Orders</span>
              </div>
            </div>
          ) : (
            <div
              className="user__details__order"
              onClick={() => {
                navigate(`/supplier/${customer}/returnsupply`);
              }}
            >
              <div className="order__badge3">
                <span>
                  <BsPlusCircle size={20} />
                </span>
                <span>Return Orders</span>
              </div>
            </div>
          )}
          <div className="user__details__header">
            <p
              style={{ width: "6ch" }}
              className={`${
                activePage === "PLACED ORDERS"
                  ? "supply-active supply-inactive"
                  : "supply-inactive"
              }`}
              onClick={() => setActivePage("PLACED ORDERS")}
            >
              Placed Orders
            </p>
            <p
              className={`${
                activePage === "RECEIVED ORDERS"
                  ? "supply-active supply-inactive"
                  : "supply-inactive"
              }`}
              onClick={() => setActivePage("RECEIVED ORDERS")}
            >
              Received Orders
            </p>
            <p
              className={`${
                activePage === "CANCELED ORDERS"
                  ? "supply-active supply-inactive"
                  : "supply-inactive"
              }`}
              onClick={() => setActivePage("CANCELED ORDERS")}
            >
              Canceled Orders
            </p>
            <p
              className={`${
                activePage === "DAMAGED ORDERS"
                  ? "supply-active supply-inactive"
                  : "supply-inactive"
              }`}
              onClick={() => setActivePage("DAMAGED ORDERS")}
            >
              Damaged Orders
            </p>
            <p
              className={`${
                activePage === "RETURNED ORDERS"
                  ? "supply-active supply-inactive"
                  : "supply-inactive"
              }`}
              onClick={() => setActivePage("RETURNED ORDERS")}
            >
              Returned Orders
            </p>
          </div>

          <div className="user__details__total">
            <p>
              <span className="total__title">Total : </span>
              {activePage === "PLACED ORDERS"
                ? `₦${totalPlacedOrders}`
                : "₦65,000"}
            </p>

            <div className="date__hidden">
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
            </div>
          </div>
        </div>

        <table className="ims__table">
          <thead className="ims__thead supply__head2">
            <tr className="table__header__ims">
              <th>No</th>
              <th>Item Names</th>
              <th>Quantity</th>
              <th>Size</th>
              <th>Unit Price</th>
              <th>Total Price</th>
              <th>Date</th>
              {activePage !== "PLACED ORDERS" ? <th>Status</th> : <th></th>}
            </tr>
          </thead>
          {activePage === "PLACED ORDERS" ? (
            <tbody className=" row__supplier supply__table">
              {placedOrders?.map((order, index) => (
                <tr key={index} className="ims__body">
                  <TableRow
                    order={order}
                    index={index}
                    getAllReceivedOrders={getAllReceivedOrders}
                    getAllPlacedOrders={getAllPlacedOrders}
                    supplier={customer}
                    customer={customer}
                  />
                </tr>
              ))}
            </tbody>
          ) : activePage === "RECEIVED ORDERS" ? (
            <tbody className=" row__supplier supply__table">
              {receivedOrders?.map((item, index) => (
                <tr key={index} className="ims__body">
                  <td>{index + 1}</td>
                  <td>{item.item}</td>
                  <td>{item.quantity}</td>
                  <td>{item.size}</td>
                  <td>{item.unitprice}</td>
                  <td>{item.total_price}</td>
                  <td>{convertDate(item.date)}</td>

                  <td>
                    <span className="ims--received">received</span>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody className=" row__supplier supply__table">
              {products?.map((item, index) => (
                <tr key={index} className="ims__body">
                  <td>{item.no}</td>
                  <td>{item.name}</td>
                  <td>{item.quantity}</td>
                  <td>{item.size}</td>
                  <td>{item.unit}</td>
                  <td>{item.total}</td>
                  <td>{item.date}</td>
                  <td>
                    <span className="ims--cancelled">cancelled</span>
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </>
  );
}

export default SupplyTransaction;

const TableRow = ({
  order,
  index,
  customer,
  getAllReceivedOrders,
  getAllPlacedOrders,
  supplier,
}) => {
  const [receive, setReceive] = useState(false);
  const [cancel, setCancel] = useState(false);
  const [action, setAction] = useState(false);

  const closeModal = (e) => {
    if (e.target.id === "bg") {
      setReceive(false);
      setCancel(false);
    }
  };

  const closeAll = () => {
    setReceive(false);
    setCancel(false);
  };

  const { item, quantity, size, unitprice, total_price, date } = order;

  const convertDate = (date) => {
    return date.substring(0, 10);
  };

  return (
    <>
      {receive && (
        <div
          className={receive ? "backdrop__container" : "close"}
          id="bg"
          onClick={closeModal}
        >
          <div>
            <ReceivedOrder
              customer={customer}
              getAllReceivedOrders={getAllReceivedOrders}
              getAllPlacedOrders={getAllPlacedOrders}
              order={order}
              supplier={supplier}
              setReceive={setReceive}
              closeModal={closeModal}
            />
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
            <CancelOrder
              order={order}
              cancel={cancel}
              supplier={supplier}
              closeModal={closeModal}
            />
          </div>
        </div>
      )}

      <>
        <td>{index + 1}</td>
        <td>{item}</td>
        <td>{quantity}</td>
        <td>{size}</td>
        <td>{unitprice}</td>
        <td>{total_price}</td>
        <td>{convertDate(date)}</td>
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
      </>
    </>
  );
};
