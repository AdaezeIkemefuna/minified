import React from "react";
import { useContext } from "react";
import AuthContext from "../../context/AuthContext";
import "./Category.css";

const SingleProduct = ({ items }) => {
  const {
    state: { cart },
    dispatch,
  } = useContext(AuthContext);
  return (
    <div className="menu-item">
      <div style={{textAlign:"center",position:"relative",}}>
      {(items.category === "Beers" || items.category === "Soft Drinks" || items.category === "Wines" || items.category === "Energy drink")&& <p style={{ fontSize: "1rem", fontWeight:"bold", position:"absolute", left:"0",top:"50%", transform:"translateY(-50%)"}}>{items.quantity}</p>}
      <p style={{fontSize: "1rem", padding:"0 50px"}}>{items.department}</p>
      </div>

      <img
        src={items.image}
        alt={items.product}
        style={{ margin: "0.5rem 0rem" }}
        width={"50px"}
        height={"75px"}
      />
      <div className="item-info">
        <header>
          <h3>{items.product}</h3>
          <h4 className="price">₦{items.price}</h4>
        </header>
      </div>
      {cart.some((c) => c.product === items.product) ? (
        <button
          style={{
            backgroundColor: "transparent",
            border: "1px solid goldenrod",
            color: "black",
          }}
          onClick={() =>
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: items,
            })
          }
        >
          Remove
        </button>
      ) : (
        <button
        disabled={items.quantity === 0}
          onClick={() =>
            dispatch({
              type: "ADD_TO_CART",
              payload: items,
            })
          }
        >
          + Add
        </button>
      )}
    </div>
  );
};

export default SingleProduct;
