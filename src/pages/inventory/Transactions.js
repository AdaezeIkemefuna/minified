import { useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import TableContext from "../../context/TableContext";

const Transactions = ({ order, closeModal }) => {
  const { user, toastOptions } = useContext(AuthContext);
  const { displayImsItems } = useContext(TableContext);
  const [quantity, setQuantity] = useState();
  const [department, setDepartment] = useState();
  const [category, setCategory] = useState();
  const [price, setPrice] = useState();

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
            product: order.product,
            quantity: +quantity,
            department,
            category,
            price: +price,
          }),
        }
      );
      if (response.ok) {
        toast.success(`Item sent successfully`, toastOptions);
        // setLoading(false);
        // setItem("");
        // setQty("");
        // setPrice("");
        // setDepartment("");
        // setCategory("");
        // displayItems(department);
      } else {
        toast.error(`Failed to send item`, toastOptions);
        // setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendItemsCall = () => {
    if (quantity < order.quantity) {
      toast.warn("Quantity is insufficient to send to department");
    } else {
      sendItems();
    }
  };

  return (
    <div id="payments">
      {/* <p>Enter Update Quantity:</p> */}
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
      >
        <option value="" hidden className="placeholderSelect">
          Select Department
        </option>
        <option value="Bar">Bar</option>
        <option value="Lounge">Lounge</option>
        <option value="Kitchen">Kitchen</option>
      </select>
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" hidden className="placeholderSelect">
          Select Category
        </option>
        <option value="Wines">Wines/Whisky</option>
        <option value="Energy drink">Energy drink</option>
        <option value="Beers">Beers</option>
        <option value="Soft Drinks">Soft drinks</option>
        <option value="Meals">Meals</option>
        <option value="Cigarettes">Cigarettes</option>
        <option value="Soups/Swallow">Soups/Swallow</option>
        <option value="Grills">Grills</option>
        <option value="Noodles">Noodles</option>
        <option value="Rice">Rice</option>
        <option value="Chips">Chips</option>
      </select>
      <input
        type="number"
        placeholder="Enter Quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
        autoFocus
      />

      <input
        type="number"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
        autoFocus
      />
      <button id="bg" onClick={sendItemsCall}>
        Enter
      </button>
    </div>
  );
};

export default Transactions;
