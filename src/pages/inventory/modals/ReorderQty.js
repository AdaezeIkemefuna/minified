import { useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";

const ReorderQty = ({ order, closeAll }) => {
  const [quantity, setQuantity] = useState(order.reorder);
  const { user, toastOptions } = useContext(AuthContext);
  const { displayImsItems } = useContext(TableContext);

  const activeUser = user.username;
  const activePasscode = user.passcode;

  const _updateQuantity = async () => {
    try {
      fetch("https://uppist-server.onrender.com/update-reorder-level", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUser: activeUser,
          activePasscode: activePasscode,
          product: order.product,
          reorder: +quantity,
        }),
      }).then((res) => {
        if (res.ok) {
          displayImsItems();
          toast.success("Reorder level Updated", toastOptions);
          closeAll();
        } else toast.error("Failed to update reorder level", toastOptions);
      });
    } catch (error) {}
  };
  return (
    <div id="payments">
      <p>New Reorder Level:</p>
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

export default ReorderQty;
