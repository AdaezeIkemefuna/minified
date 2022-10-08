import { useNavigate } from "react-router-dom";
import { FaCamera } from "react-icons/fa";
import axios from "axios";
import { useState } from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { toast } from "react-toastify";
import { FaTimes } from "react-icons/fa";
import "./MenuBar.css";

const AddMenuProduct = () => {
  const { user, toastOptions, displayItems } = useContext(AuthContext);
  const [loading, setLoading] = useState(false);
  const [product, setProduct] = useState("");
  const [department, setDepartment] = useState("");
  const [category, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImageFile] = useState("");
  const activeUser = user.username;
  const activePasscode = +user.passcode;
  const {
    state: { cart },
    dispatch,
    showCartMenu,
    toggleCartMenu,
    toggleSideBar,
  } = useContext(AuthContext);

  const menuAction = () => {
    toggleSideBar(false);
    toggleCartMenu(false);
  };

  const navigate = useNavigate();

  const addProduct = (e) => {
    e.preventDefault();
    if (product !== "" || department !== "" || category !== "" || price !== 0) {
      setLoading(true);
      setTimeout(addProductCall(), 3000);
    } else {
      toast("All fields are required.", toastOptions);
    }

    setProduct("");
    setDepartment("");
    setCategory("");
    setImageFile("");
    setPrice("");
  };

  const addProductCall = async () => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/new-item",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            product,
            department,
            category,
            activeUser,
            price: +price,
            activePasscode,
            image,
          }),
        }
      );
      if (response.ok) {
        toast.success(`Product added successfully`, toastOptions);
        setLoading(false);
        displayItems(department);
      } else {
        toast.error(`Failed to add product`, toastOptions);
        setLoading(false);
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadFile = (e) => {
    const data = new FormData();
    data.append("image", e.target.files[0]);
    axios.post("https://pos-server1.herokuapp.com/upload", data).then((res) => {
      //print response status
      setImageFile(res.data.imgPath);
    });
  };
  return (
    <div className="form__wrapper menubar__wrapper">
      <div className="add__header menu__close">
        <div className={showCartMenu ? "position" : "no-display"}>
          <FaTimes size={25} onClick={menuAction} />
        </div>
        <h1 className="page__name">Add New Product</h1>
      </div>
      <hr />
      <p style={{ padding: "1rem 0", fontSize: "1rem" }}>
        Add a new item to the system
      </p>
      <form className="form" onSubmit={addProduct}>
        <div className="input-wrapper">
          <input
            type="text"
            id="input"
            value={product}
            onChange={(e) => setProduct(e.target.value)}
            className="form-control"
            placeholder="Enter Product Name"
          />
          <label htmlFor="input" className="control-label">
            Product Name
          </label>
        </div>

        <div className="input-wrapper">
          <select
            className="form-control"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="" hidden className="placeholderSelect">
              Select Category
            </option>
            <option value="Wines/whisky">Wines/Whisky</option>
            <option value="Energy drink">Energy drinks</option>
            <option value="Beers">Beers</option>
            <option value="Soft Drinks">Soft drinks</option>
            <option value="Meals">Meals</option>
          </select>
        </div>

        <div className="input-wrapper">
          <select
            placeholder=""
            className="form-control"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          >
            <option value="" hidden className="placeholderSelect">
              Select Department
            </option>
            <option value="Lounge">Lounge</option>
            <option value="Bar">Bar</option>
          </select>
        </div>

        <div className="input-wrapper">
          <input
            type="number"
            id="input"
            className="form-control"
            placeholder="Enter Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
          />
          <label htmlFor="input" className="control-label">
            Product Price
          </label>
        </div>

        <div className="file-input">
          <label htmlFor="file">
            <span>Upload Image</span>
            <FaCamera size={20} />
          </label>
          <input
            type="file"
            id="file"
            className="inputTag"
            onChange={uploadFile}
            required
          />
        </div>

        <button
          style={{
            borderRadius: "5px",
            padding: "2rem",
            color: "var(--yellow)",
          }}
        >
          {loading ? "Adding Product..." : "Add Product"}
        </button>
      </form>
    </div>
  );
};

export default AddMenuProduct;
