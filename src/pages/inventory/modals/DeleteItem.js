import React from "react";
import { useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../../context/AuthContext";
import TableContext from "../../../context/TableContext";

const DeleteItem = ({ order, closeModal, closeAll }) => {
  const { toastOptions, user } = useContext(AuthContext);
  const activeUser = user.username;
  const activePasscode = user.passcode;
  const { displayImsItems } = useContext(TableContext);
  console.log(order);
  const deleteItem = async () => {
    try {
      fetch("https://pos-server1.herokuapp.com/ims/delete-item", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUser,
          activePasscode,
          product: order.product,
        }),
      }).then((res) => {
        if (res.ok) {
          toast.success("Item has been deleted", toastOptions);
          closeAll();
          displayImsItems();
        } else toast.error("Failed to delete Item", toastOptions);
      });
    } catch (error) {}
  };
  return (
    <div
      className="ims__modalCenter"
      style={{ padding: "1.5rem", textAlign: "center" }}
    >
      <h4>This action will delete "{order.product}" from all menu as well.</h4>
      <h4 style={{ padding: "0", margin: "0" }}>Do you wish to proceed?</h4>
      <div className="ims__btns">
        <button
          onClick={deleteItem}
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

export default DeleteItem;
