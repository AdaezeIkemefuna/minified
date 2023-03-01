import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";
import { AiOutlineCloseCircle } from "react-icons/ai";

const ReceivedOrder = ({
  order,
  supplier,
  closeModal,
  setReceive,
  getAllReceivedOrders,
  getAllPlacedOrders,
  customer,
}) => {
  const { toastOptions } = useContext(AuthContext);
  // const { displayImsItems } = useContext(TableContext);
  const receiveItem = async () => {
    try {
      fetch(
        "https://pos-server-cxqi.onrender.com/supply/receive-supply-order",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            supplier,
            item: order.item,
          }),
        }
      ).then((res) => {
        if (res.ok) {
          toast.success("Item has been received", toastOptions);
          getAllPlacedOrders(customer);
          getAllReceivedOrders(customer);
          // displayImsItems();
        } else toast.error("Failed to receive item", toastOptions);
      });
    } catch (error) {}
  };

  console.log(supplier, order.item);
  return (
    <div className="ims__modalCenter" style={{ textAlign: "center" }}>
      <div
        className="close__modal"
        id="bg"
        onClick={() => setReceive((prevValue) => !prevValue)}
      >
        <AiOutlineCloseCircle size={25} />
      </div>
      <h4 style={{ padding: "0", margin: "0" }}>
        Are you sure this order has been received
      </h4>
      <div className="ims__btns">
        <button
          id="bg"
          onClick={() => {
            receiveItem();
          }}
          style={{ fontSize: "1rem", padding: "1rem" }}
        >
          yes
        </button>
        <button
          onClick={() => setReceive((prevValue) => !prevValue)}
          id="bg"
          style={{ fontSize: "1rem", padding: "1rem" }}
        >
          no
        </button>
      </div>
    </div>
  );
};

export default ReceivedOrder;
