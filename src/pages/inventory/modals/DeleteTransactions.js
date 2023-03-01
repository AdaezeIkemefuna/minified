import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";

const DeleteTransaction = ({ order, closeModal }) => {
  const { toastOptions } = useContext(AuthContext);
  const { displayImsTransactions } = useContext(TableContext);
  const deleteTransaction = async () => {
    try {
      fetch("https://pos-server-cxqi.onrender.com/ims/delete-transactions", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          product: order.product,
          price: order.price,
          quantity: order.quantity,
          id: order.id,
          department: order.department,
        }),
      }).then((res) => {
        if (res.ok) {
          toast.success("Transaction has been deleted", toastOptions);
          displayImsTransactions();
        } else toast.error("Failed to delete transaction", toastOptions);
      });
    } catch (error) {}
  };
  return (
    <div
      className="ims__modalCenter"
      style={{ padding: "1.5rem", textAlign: "center" }}
    >
      <h4>This action will delete "{order.product}" transaction record.</h4>
      <h4 style={{ padding: "0", margin: "0" }}>Do you wish to proceed?</h4>
      <div className="ims__btns">
        <button
          onClick={deleteTransaction}
          style={{ fontSize: "1rem", padding: "1rem" }}
        >
          yes
        </button>
        <button
          onClick={closeModal}
          id="bg"
          style={{ fontSize: "1rem", padding: "1rem" }}
        >
          no
        </button>
      </div>
    </div>
  );
};

export default DeleteTransaction;
