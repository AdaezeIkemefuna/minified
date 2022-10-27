import { useContext, useState, useEffect } from "react";
import { MdRestaurantMenu, MdDeleteOutline } from "react-icons/md";
import { Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import Company from "../company/Company";
import OrdertableModal from "../modal/OrdertableModal";
import { FaMinus, FaPlus, FaTimes } from "react-icons/fa";
import "./Cart.css";

const Cart = () => {
  const [showModal, setShowModal] = useState(false);
  const {
    state: { cart },
    dispatch,
    showCartMenu,
    toggleCartMenu,
    toggleSideBar,
  } = useContext(AuthContext);
  const [total, setTotal] = useState();

  useEffect(() => {
    setTotal(
      cart.reduce((acc, curr) => acc + Number(curr.price) * curr.quantity, 0)
    );
  }, [cart]);
  const menuAction = () => {
    toggleSideBar(false);
    toggleCartMenu(false);
  };

  return (
    <>
      {showModal && (
        <OrdertableModal
          span={
            <FaTimes
              className="close__order"
              size={25}
              onClick={() => setShowModal(!showModal)}
            />
          }
          paragraph="Choose where to place order"
          text={<Link to="/orders/newtable">New Table</Link>}
          options={<Link to="/updateorder">Old Table</Link>}
        />
      )}
      <div className="cart__wrapper">
        <div
          className="cart__header"
          style={{ display: "flex", justifyContent: "space-between" }}
        >
          <h3>New Order Bill</h3>
          <div className={showCartMenu ? "position" : "no-display"}>
            <FaTimes size={25} onClick={menuAction} />
          </div>
        </div>

        <Company />
        {cart.length === 0 && <p>No Orders Yet.</p>}

        {cart.length > 0 && (
          <>
            <table className="table">
              <thead>
                <tr className="table__header__row">
                  <th className="th">Description</th>
                  <th className="th">Price</th>
                  <th className="th">Quantity</th>
                  <th className="th">Subtotal</th>
                  <th className="th"></th>
                </tr>
              </thead>
              {cart.map((item, index) => (
                <tr key={index}>
                  <td className="td">
                    {item.product} ({item.department})
                  </td>
                  <td className="td">₦{item.price}</td>
                  <td className="td minus__plus__button">
                    <FaMinus
                      onClick={() => {
                        dispatch({
                          type: "DECREMENT_QTY",
                          payload: item,
                        });
                      }}
                      size={18}
                      color="blue"
                      className="minus__order"
                    />

                    <span style={{ margin: "0 0.5rem", fontSize: "1.5rem" }}>
                      {item.quantity}
                    </span>
                    <FaPlus
                      onClick={() => {
                        dispatch({
                          type: "INCREMENT_QTY",
                          payload: item,
                        });
                      }}
                      size={18}
                      color="white"
                      className={
                        item.qty === item.quantity
                          ? "plus__order null"
                          : "plus__order"
                      }
                    />
                  </td>
                  <td className="td">
                    ₦{item.quantity * Math.round(item.price)}
                  </td>
                  <td className="td">
                    <MdDeleteOutline
                      size={20}
                      color="red"
                      style={{ marginTop: "2px" }}
                      onClick={() => {
                        dispatch({
                          type: "REMOVE_FROM_CART",
                          payload: item,
                        });
                      }}
                    />
                  </td>
                </tr>
              ))}
            </table>
            <div className="place__order">
              <strong className="grand__total">
                <span>Grand Total:</span>

                <span className="grand__totalnumber">₦{Math.round(total)}</span>
              </strong>
              <div onClick={() => setShowModal(!showModal)} className="order">
                <span className="filter__bar">
                  <MdRestaurantMenu
                    className="filter__icons"
                    style={{ backgroundColor: "transparent", color: "inherit" }}
                    size={25}
                  />
                  Place Order
                </span>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Cart;
