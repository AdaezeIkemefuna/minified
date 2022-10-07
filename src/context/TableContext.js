import { useState } from "react";
import { useEffect } from "react";
import { createContext, useReducer } from "react";
import { toast } from "react-toastify";
import { orderReducer } from "./Reducer";

let pendingOrders = "...";
let receivedOrders = "...";
let cancelledOrders = "...";
let totalCancelled;
let totalPlaced;
let totalReceived;

const TableContext = createContext();

export default TableContext;

export const TableProvider = ({ children }) => {
  const initialOrderState = {
    barmanOrders: [],
    changedOrders: [],
  };

  const [barmanOrder, setBarmanOrders] = useState([]);

  const getBarman = async (activeUser, activePasscode, table_name) => {
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
        setBarmanOrders(data);
        dispatch({
          type: "INITIALIZE_ORDER",
          payload: {
            ...initialOrderState,
            barmanOrders: data,
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

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
        dispatch({
          type: "INITIALIZE_ORDER",
          payload: {
            ...initialOrderState,
            changedOrders: data,
          },
        });
      }
    } catch (error) {}
  };

  //FILTERING TRANSACTIONS
  const [transactions, setTransactions] = useState([]);
  const getTransactions = async (from, to) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/ims/transactions",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setTransactions(data);
      } else {
        toast("Couldn't fetch transactions for this date");
      }
    } catch (error) {}
  };

  //FILTERING PLACED ORDERS
  const [placedOrdersFilter, setPlacedOrdersFilter] = useState([]);
  const getplacedOrdersFilter = async (from, to) => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/ims/order-transaction-date",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from,
            to,
          }),
        }
      );
      const data = await response.json();
      if (response.ok) {
        setPlacedOrdersFilter(data);
      } else {
        toast("Couldn't fetch transactions for this date");
      }
    } catch (error) {}
  };

  const [state, dispatch] = useReducer(orderReducer, initialOrderState);

  //INPUT(BAR/LOUNGE) STATE
  const [input, setInput] = useState("Lounge");

  //GET IMS ORDERS
  const [imsOrders, setImsOrders] = useState([]);

  const displayImsOrders = async () => {
    try {
      const response = await fetch(
        "https://pos-server1.herokuapp.com/ims/all-orders"
      );
      const data = await response.json();
      setImsOrders(data);
    } catch (err) {}
  };

  useEffect(() => {
    displayImsOrders();
  }, []);

  const [activeCategory, setActiveCategory] = useState("PENDING");
  const [activeDept, setActiveDept] = useState("Bar");

  const [searchQuery, setSearchQuery] = useState("");

  //DUMMY DATA
  const dummyAllItems = [];

  //TRANSFORM ORDERS

  const transformOrders = (items) => {
    let sortedOrders = items;

    if (searchQuery !== "") {
      const searchProduct = sortedOrders.filter((prod) =>
        prod.item.toLowerCase().includes(searchQuery.toLowerCase())
      );
      if (!searchProduct) return <div>Couldn't find that item</div>;
      else return searchProduct;
    }

    if (activeCategory === "ALL ITEMS") {
      sortedOrders = items;
    }

    if (activeCategory === "PENDING") {
      if (!placedOrdersFilter.length) {
        pendingOrders = sortedOrders;
      } else {
        pendingOrders = placedOrdersFilter;
      }
      totalPlaced = pendingOrders?.reduce(
        (acc, curr) => acc + curr.qty * curr.unitprice,
        0
      );

      return pendingOrders;
    }

    if (activeCategory === "RECEIVED") {
      receivedOrders = sortedOrders.filter(
        (item) => item.status === "RECEIVED"
      );

      totalReceived = receivedOrders?.reduce(
        (acc, curr) => acc + curr.qty * curr.unitprice,
        0
      );
      return receivedOrders;
    }

    if (activeCategory === "CANCELLED") {
      cancelledOrders = sortedOrders.filter(
        (item) => item.status === "CANCELLED"
      );
      totalCancelled = cancelledOrders?.reduce(
        (acc, curr) => acc + curr.qty * curr.unitprice,
        0
      );
      return cancelledOrders;
    }

    if (activeCategory === "TRANSACTIONS") {
      sortedOrders = transactions;
      if (activeDept === "Bar") {
        sortedOrders = sortedOrders.filter((item) => item.department === "Bar");
        return sortedOrders;
      }
      if (activeDept === "Lounge") {
        sortedOrders = sortedOrders.filter(
          (item) => item.department === "Lounge"
        );
        return sortedOrders;
      }
      if (activeDept === "Kitchen") {
        sortedOrders = sortedOrders.filter(
          (item) => item.department === "Kitchen"
        );
        return sortedOrders;
      }
    }
  };

  //Filtering States
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  //Total of placed Orders
  const [totalPlacedOrders, setTotalPlaced] = useState();
  const [totalReceivedOrders, setTotalReceived] = useState();

  useEffect(() => {
    if (totalPlaced && totalCancelled && totalReceived) {
      setTotalPlaced(totalPlaced - totalCancelled);
      setTotalReceived(totalReceived);
    }
  }, [displayImsOrders]);

  const contextData = {
    state,
    dispatch,
    adminOrders,
    setAdminOrders,
    getAdminDetails,
    imsOrders,
    displayImsOrders,
    input,
    setInput,
    setActiveCategory,
    setSearchQuery,
    searchQuery,
    activeCategory,
    transformOrders,
    pendingOrders,
    receivedOrders,
    cancelledOrders,
    getTransactions,
    fromDate,
    toDate,
    setFromDate,
    setToDate,
    activeDept,
    setActiveDept,
    barmanOrder,
    setBarmanOrders,
    getBarman,
    getplacedOrdersFilter,
    totalPlacedOrders,
    totalReceivedOrders,
  };

  return (
    <TableContext.Provider value={contextData}>
      {children}
    </TableContext.Provider>
  );
};
