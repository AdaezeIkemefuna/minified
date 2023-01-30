import { useState, useContext } from "react";
import { toast } from "react-toastify";
import AuthContext from "../../context/AuthContext";
import TableContext from "../../context/TableContext";

const Transactions = ({ order, closeAll }) => {
  const { toastOptions } = useContext(AuthContext);
  const { displayImsItems, displayImsTransactions } = useContext(TableContext);
  const [quantity, setQuantity] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [portion, setPortion] = useState("");
  const [size, setSize] = useState("");

  const sendItems = async () => {
    try {
      const response = await fetch(
        "https://uppist-server.onrender.com/ims/send-items",
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
            description,
            portion,
            size,
          }),
        }
      );
      if (response.ok) {
        toast.success(`Item sent successfully`, toastOptions);
        displayImsItems();
        displayImsTransactions();
        closeAll();
      } else {
        toast.error(`Failed to send item`, toastOptions);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const sendItemsCall = () => {
    if (quantity > order.quantity) {
      toast.warn("Insufficient quantity available", toastOptions);
    } else if (
      department === "" ||
      category === "" ||
      quantity === "" ||
      price === ""
    ) {
      toast.warn("All fields are required", toastOptions);
    } else {
      sendItems();
    }
  };

  return (
    <div id="payments">
      {/* <p>Enter Update Quantity:</p> */}
      <input type="text" defaultValue={order.product} />
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
      {department === "Kitchen" && (
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      )}
      <select value={category} onChange={(e) => setCategory(e.target.value)}>
        <option value="" hidden>
          Select Category
        </option>
        <option value="Wines">Wines/Whisky</option>
        <option value="Energy drink">Energy drink</option>
        <option value="Beers">Beers</option>
        <option value="Soft Drinks">Soft drinks</option>
        <option value="Meals">Meals</option>
        <option value="Cigarettes">Cigarettes</option>
        <option value="Soups/Swallow">Soups/Swallow</option>
        <option value="Ingredients">Ingredients</option>
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
      />

      <input
        type="number"
        placeholder="Enter Price"
        value={price}
        onChange={(e) => setPrice(e.target.value)}
      />
      <button onClick={sendItemsCall}>Send</button>
    </div>
  );
};

export default Transactions;
