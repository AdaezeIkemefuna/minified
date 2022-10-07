import { useContext } from "react";
import { useState } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import TableContext from "../../context/TableContext";

export default function EditPriceModal({ item }) {
  const { input } = useContext(TableContext);
  const { user, toastOptions, displayItems } = useContext(AuthContext);
  const [newPrice, setNewPrice] = useState(item.price);
  const product = item.product;
  const department = item.department;
  const activePasscode = user.passcode;
  const activeUser = user.username;

  const changePrice = async (
    product,
    department,
    activeUser,
    newPrice,
    activePasscode
  ) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/update-item",
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product,
            department,
            activeUser,
            price: +newPrice,
            activePasscode,
          }),
        }
      );
      if (response.ok) {
        displayItems(department);
        toast.success("Price Updated successfully", toastOptions);
      } else if (!response.ok) {
        toast.error("Failed to update price", toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handlePriceChange = () => {
    changePrice(product, department, activeUser, newPrice, activePasscode);
  };

  return (
    <>
      <div>
        <div className="modal__center1">
          <div className="admin__pad">
            <h2>Enter New Price:</h2>
            <form onSubmit={(e) => e.preventDefault()}>
              <input
                type="number"
                placeholder="type here"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
              />

              <button
                onClick={handlePriceChange}
                style={{
                  marginTop: "0.5rem",
                  color: "white",
                  backgroundColor: "var(--primary-color)",
                }}
                id="bg"
                type="submit"
              >
                Enter
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
