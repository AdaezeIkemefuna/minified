import { useContext, useEffect } from "react";
import Cart from "../../components/cart/Cart";
import Category from "../../components/category/Category";
import "./Orders.css";
import AuthContext from "../../context/AuthContext";
import TopBar from "../../components/topbar/TopBar";
import MenuBarCategory from "../MenuBar/MenuBarCategory";
import AddMenuProduct from "../MenuBar/AddMenuProduct";
import { useNavigate } from "react-router";

const Orders = () => {
  const { user, showCartMenu } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    if (user.role === "Store Manager") navigate("/inventory");
  }, []);

  return (
    <>
      <TopBar />
      <div className="orders__wrapper">
        <div
          className={
            user.role === "Store Manager"
              ? "orders__left--inventory"
              : "orders__left"
          }
        >
          {user.role === "Super Admin" || user.role === "Administrator" ? (
            <MenuBarCategory />
          ) : (
            <Category />
          )}
        </div>
        <div className="orders__right">
          {user.role === "Super Admin" || user.role === "Administrator" ? (
            <AddMenuProduct />
          ) : (
            <Cart />
          )}
        </div>
        <div className={showCartMenu ? "orders__right mobile" : "no-display"}>
          {user.role === "Super Admin" || user.role === "Administrator" ? (
            <AddMenuProduct />
          ) : (
            <Cart />
          )}
        </div>
      </div>
    </>
  );
};

export default Orders;
