import { useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";

const UpdateAllItemsQty = ({ order, closeModal }) => {
  const [quantity, setQuantity] = useState(order.qty);
  const {user, toastOptions } = useContext(AuthContext);
  const { displayImsItems, displayImsOrders } = useContext(TableContext);

  const activeUser = user.username;
  const activePasscode = user.passcode;

  const _updateQuantity = async () => {
    try {
      fetch("https://pos-server1.herokuapp.com/update-quantity", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUser : activeUser,
          activePasscode: activePasscode,
          product: order.product,
          quantity,
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
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        autoFocus
      />
      <button id="bg" onClick={_updateQuantity}>
        Enter
      </button>
    </div>
  );
};

export default UpdateAllItemsQty;

