import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import TableContext from "../../context/TableContext";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";

export default function DeleteItemModal({ item, closeModal, setDeleteMode }) {
  const { input } = useContext(TableContext);
  const { user, toastOptions, displayItems } = useContext(AuthContext);
  const product = item.product;
  const department = item.department;
  const activePasscode = user.passcode;
  const activeUser = user.username;

  const deleteItem = async (
    product,
    department,
    activeUser,
    activePasscode
  ) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/delete-item",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product,
            department,
            activeUser,
            activePasscode,
          }),
        }
      );
      if (response.ok) {
        setDeleteMode(false);
        displayItems(department);
        toast.success("Item deleted successfully", toastOptions);
      } else if (!response.ok) {
        toast.error("Failed to delete Item", toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleDeleteItem = () => {
    deleteItem(product, department, activeUser, activePasscode);
  };

  return (
    <div>
      <div className="modal__center2">
        <div className="admin__pad">
          <h2>Delete Item</h2>
          <button
            className="close__product"
            id="bg"
            onClick={() => setDeleteMode(false)}
          >
            <FaTimes size={25} />
          </button>

          <form onSubmit={(e) => e.preventDefault()} className="staff__modal">
            <button
              onClick={() => {
                handleDeleteItem();
                setDeleteMode(false);
              }}
              style={{
                marginTop: "0.5rem",
                color: "white",
                backgroundColor: "var(--primary-color)",
              }}
            >
              Confirm Delete
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
