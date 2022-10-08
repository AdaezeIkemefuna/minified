import { useState, createContext, useEffect, useReducer } from "react";
import { useNavigate } from "react-router-dom";
import { cartReducer } from "./Reducer";

const AuthContext = createContext();

export default AuthContext;

export const AuthProvider = ({ children }) => {
  // AUTHENTICATICATION
  const [user, setUser] = useState(() =>
    localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : null
  );
  const [loading, setLoading] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const navigate = useNavigate();
  const loginUser = (username, password) => {
    fetch("https://pos-server1.herokuapp.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    })
      .then((res) => {
        setLoading(false);
        if (!res.ok) {
          setErrMsg("Invalid login details");
        }
        return res.json();
      })
      .then((data) => {
        setUser(data);
        localStorage.setItem("user", JSON.stringify(data));
        navigate("/orders");
      });
  };

  const initialCartState = {
    items: [],
    cart: [],
  };

  const displayItems = async (department) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/items/department",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            department,
          }),
        }
      );
      const data = await response.json();
      dispatch({
        type: "INITIALIZE_CART",
        payload: {
          ...initialCartState,
          items: data,
        },
      });
    } catch (err) {}
  };

  useEffect(() => {
    displayItems("Bar");
  }, []);

  const [state, dispatch] = useReducer(cartReducer, initialCartState);

  const [searchQuery, setSearchQuery] = useState("");

  const [activeCategory, setActiveCategory] = useState("All Menu");

  // PRODUCTS FILTER
  const transformItems = (items) => {
    let sortedProducts = items;

    if (activeCategory === "All Menu") {
      sortedProducts = items;
    }

    if (activeCategory === "Beers") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Beers"
      );
    }

    if (activeCategory === "Meals") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Meals"
      );
    }

    if (activeCategory === "Soft Drinks") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Soft Drinks"
      );
    }

    if (activeCategory === "Energy Drink") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Energy Drink"
      );
    }

    if (activeCategory === "Wines") {
      sortedProducts = sortedProducts.filter(
        (item) => item.category === "Wines"
      );
    }

    if (searchQuery !== "") {
      sortedProducts = items.filter((prod) =>
        prod.product.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    return sortedProducts;
  };

  useEffect(() => {
    if (user) {
      setUser(user);
    }
    setLoading(false);
  }, []);

  const logoutUser = () => {
    setUser(null);
    localStorage.clear();
    navigate("/");
    setAdminTables([]);
    toggleSideBar(false);
    toggleCartMenu(false);
    setActiveCategory("All Menu");
  };

  // SIDEBAR DISPLAY
  const [showSideBar, toggleSideBar] = useState(false);

  // CART DISPLAY
  const [showCartMenu, toggleCartMenu] = useState(false);

  // GET WAITER
  const [waiter, setWaiter] = useState("");

  // CLOSE TABLE
  const [tableOpen, setTableOpen] = useState(true);

  //DISPLAY ALL TABLES FOR ADMIN
  const [adminTables, setAdminTables] = useState([]);

  const displayAdminTables = async (activeUser, activePasscode) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/all-tables",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
          }),
        }
      );
      const data = await response.json();
      setAdminTables(data);
    } catch (err) {}
  };

  //DISPLAY WAITER'S TABLES
  const [tables, setTables] = useState([]);

  const displayTables = async (activeUser) => {
    try {
      const response = await fetch("https://pos-server1.herokuapp.com/tables", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          activeUser,
        }),
      });
      const data = await response.json();
      setTables(data);
    } catch (err) {
      console.log(err);
    }
  };

  //GET ORDERS FOR A TABLE
  const [orders, setOrders] = useState([]);

  const getDetails = async (activeUser, activePasscode, table_name) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/get-orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            table_name,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setOrders(data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  //GET ORDERS FOR A TABLE (ADMIN)
  const [adminOrders, setAdminOrders] = useState([]);

  const getAdminDetails = async (
    activeUser,
    activePasscode,
    role,
    table_name
  ) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/get-orders",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
            role,
            table_name,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setAdminOrders(data);
      }
    } catch (error) {}
  };

  //GET ORDER COUNT FOR USER
  const [orderCount, setOrderCount] = useState(0);

  const getOrderCount = async (activeUser, activePasscode) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/order-count",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            activeUser,
            activePasscode,
          }),
        }
      );
      const data = await response.json();
      setOrderCount(data.Waiter_count);
    } catch (error) {}
  };

  // TOAST OPTIONS
  const toastOptions = {
    pauseOnHover: true,
    position: "top-center",
    autoClose: 2000,
    theme: "dark",
  };
  console.log("i ran");
  //PAYMENTS SUMMATION
  const cashPayments = tables?.reduce((accumulator, obj) => {
    return accumulator + obj.cash;
  }, 0);

  const posPayments = tables?.reduce((accumulator, obj) => {
    return accumulator + obj.pos;
  }, 0);

  const transferPayments = tables?.reduce((accumulator, obj) => {
    return accumulator + obj.transfer;
  }, 0);

  const totalRevenue = cashPayments + posPayments + transferPayments;

  //Admin Tables
  const adminCashPayments = adminTables?.reduce((accumulator, obj) => {
    return accumulator + obj.cash;
  }, 0);

  const adminPosPayments = adminTables?.reduce((accumulator, obj) => {
    return accumulator + obj.pos;
  }, 0);

  const adminTransferPayments = adminTables?.reduce((accumulator, obj) => {
    return accumulator + obj.transfer;
  }, 0);

  const adminTotalRevenue =
    adminCashPayments + adminPosPayments + adminTransferPayments;

  //WAITER NOTIFICATIONS
  const [waiterNotifs, setWaiterNotifs] = useState([]);
  const getNotifs = async () => {
    try {
      const response = await fetch("https://pos-server1.herokuapp.com/waiters");
      const data = await response.json();
      if (response.status === 200) {
        setWaiterNotifs(data);
      } else if (response.status === 400) {
        setWaiterNotifs([]);
      }
    } catch (err) {
      setWaiterNotifs([]);
    }
  };

  //NOTIFICATION COUNT
  const [notifCount, setNotifCount] = useState(0);
  const getNotifCount = async () => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/notification-count"
      );
      const data = await response.json();
      setNotifCount(data.length);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    if (user?.role === "Bar Man") {
      getNotifCount();
    }
  }, []);

  const contextData = {
    searchQuery,
    setSearchQuery,
    displayItems,
    transformItems,
    user,
    tableOpen,
    setTableOpen,
    setUser,
    loading,
    setLoading,
    errMsg,
    setErrMsg,
    activeCategory,
    setActiveCategory,
    loginUser,
    logoutUser,
    state,
    dispatch,
    showSideBar,
    toggleSideBar,
    showCartMenu,
    toggleCartMenu,
    orders,
    setOrders,
    tables,
    displayTables,
    adminTables,
    setAdminOrders,
    displayAdminTables,
    getDetails,
    getAdminDetails,
    adminOrders,
    getOrderCount,
    toastOptions,
    waiter,
    setWaiter,
    cashPayments,
    posPayments,
    transferPayments,
    totalRevenue,
    orderCount,
    adminCashPayments,
    adminPosPayments,
    adminTransferPayments,
    adminTotalRevenue,
    waiterNotifs,
    notifCount,
    getNotifs,
  };

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
