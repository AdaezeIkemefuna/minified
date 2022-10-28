import { useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";

const UpdateQty = ({ order, closeModal }) => {
  const [qty, setQty] = useState(order.qty);
  const { toastOptions } = useContext(AuthContext);
  const { displayImsItems, displayImsOrders } = useContext(TableContext);

  const _updateQty = async () => {
    try {
      fetch("https://rainforest-pos.herokuapp.com/ims/update-order-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: order.product,
          qty,
        }),
      }).then((res) => {
        if (res.ok) {
          displayImsItems();
          displayImsOrders();
          toast.success("Quantity Updated", toastOptions);
        } else toast.error("Failed to update quantity", toastOptions);
      });
    } catch (error) {}
  };
  return (
    <div id="payments">
      <p>Enter Update Quantity:</p>
      <input
        type="number"
        value={qty}
        onChange={(e) => setQty(e.target.value)}
        autoFocus
      />
      <button id="bg" onClick={_updateQty}>
        Enter
      </button>
    </div>
  );
};

export default UpdateQty;
